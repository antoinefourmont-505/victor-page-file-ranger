#!/usr/bin/env node
'use strict';
const {validatePlaybookTeam}=require('./playbook-team.cjs');
const { validatePersonalizationAsset } = require('./validate-personalization.cjs');

/**
 * Validate the portable Persona bundle from a local clone.
 *
 * Usage (from the persona repository root):
 *   node scripts/validate-portable-bundle.js
 *
 * Checks the full Persona → Workflow → Pipeline → List relationship, not just each file's
 * header. A header-only check passes bundles whose refs point at the wrong resource, which
 * the server then rejects at import — this closes that gap so a local publish and a server
 * publish agree on what is portable.
 *
 * Mirrors server/src/services/portable-assets/portable-bundle-validator.ts. That module
 * imports server internals and cannot be reused from a persona clone.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { validateChatAppConfig } = require('./chat-app-model.cjs');

const FORBIDDEN_DEFINITION_FIELDS = [
  'pageId',
  'userId',
  'collectionId',
  'pipelineId',
  'listId',
  'actionId',
  'automationId',
  'recordId',
  'runId',
  'activeDataListId',
  'allowedSourceListIds',
  'checkoutInputListId',
  'pipelineListBindings',
  'pipelineTransitionListBindings',
  'outputTabViewerDefaultsByUserId',
];

function stableJson({ value }) {
  if (Array.isArray(value)) return `[${value.map((child) => stableJson({ value: child })).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.entries(value)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, child]) => `${JSON.stringify(key)}:${stableJson({ value: child })}`)
      .join(',')}}`;
  }
  return JSON.stringify(value);
}

function fingerprint({ value }) {
  return crypto.createHash('sha256').update(stableJson({ value })).digest('hex');
}

function readJson({ filePath }) {
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

/** Collect every value stored under `key`, at any depth. */
function collectRefs({ value, key, found = [] }) {
  if (Array.isArray(value)) {
    value.forEach((child) => collectRefs({ value: child, key, found }));
    return found;
  }
  if (!value || typeof value !== 'object') return found;
  for (const [childKey, child] of Object.entries(value)) {
    if (childKey === key) found.push(child);
    collectRefs({ value: child, key, found });
  }
  return found;
}

/** Mirrors the server validator: only a visible native stage view consumes its pipeline. */
function renderedStageListRefs(persona) {
  const app = persona.publishedConfig?.chatApp;
  if (!app || validateChatAppConfig(app).length || !app.enabled) return [];
  const refs = [];
  const seen = new Set();
  for (const page of app.pages || []) {
    if (!app.navigation.modules.some(module => module.enabled && module.id === `page:${page.id}`)) continue;
    for (const section of page.sections) {
      if (page.tabs?.length && !page.tabs.some(tab => tab.sectionIds.includes(section.id))) continue;
      for (const component of section.components) {
        if (section.tabs?.length && !section.tabs.some(tab => tab.componentIds.includes(component.id))) continue;
        if (!['table', 'inventory-list'].includes(component.type) || !component.columns?.some(column => column.field === '$stage')) continue;
        const point = app.dataPoints?.find(candidate => candidate.id === component.dataPoint);
        if (point?.source !== 'list' || point.operation !== 'rows' || !point.select?.includes('$stage') || seen.has(point.id)) continue;
        seen.add(point.id);
        refs.push({ value: point.listRef, path: `persona.publishedConfig.chatApp.dataPoints.${point.id}.listRef` });
      }
    }
  }
  return refs;
}

function auditLocalIds({ value, kind, issues, pathLabel = '$', actionIds = new Set() }) {
  if(pathLabel==='$') {
    const app=value?.publishedConfig?.chatApp||value?.chatApp;
    actionIds=new Set((Array.isArray(app?.actions)?app.actions:[]).filter(a=>a.kind==='command').map(a=>a.id));
  }
  if (Array.isArray(value)) {
    value.forEach((child, index) => auditLocalIds({ value: child, kind, issues, pathLabel: `${pathLabel}[${index}]`, actionIds }));
    return;
  }
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    const appPageRef = key === 'pageId'
      && /(?:^|\.)chatApp\.navigation\.modules\[\d+\]$/.test(pathLabel)
      && value.kind === 'page' && value.id === `page:${child}`
      && typeof child === 'string' && /^[a-z][a-z0-9-]{0,63}$/.test(child);
    const presetActionRef=key==='actionId'&&/(?:^|\.)chatApp\.dataPoints\[\d+\]\.signalPresets\[\d+\]$/.test(pathLabel)
      &&typeof child==='string'&&/^[a-z][a-z0-9-]{0,63}$/.test(child)&&actionIds.has(child);
    if (FORBIDDEN_DEFINITION_FIELDS.includes(key) && !appPageRef && !presetActionRef) {
      issues.push(`${kind}: ${pathLabel}.${key} is environment-local and cannot be in a portable definition.`);
    }
    if (key === 'id' && /(?:^|\.)outputIntegration\.dataLists\[\d+\]$/.test(pathLabel)) {
      issues.push(`${kind}: ${pathLabel}.${key} requires a verified portable list reference.`);
    }
    auditLocalIds({ value: child, kind, issues, pathLabel: `${pathLabel}.${key}`, actionIds });
  }
}

/**
 * `expectedKeys` is a list because a persona may bind multiple distinct workflowRefs.
 * Multiple commands may share one key. Singular relationships pass one element.
 *
 * @returns {Set<string>} the expected keys that were actually referenced.
 */
function checkRef({ owner, refs, refKey, expectedKind, expectedKeys, issues }) {
  const matched = new Set();
  if (refs.length === 0) {
    issues.push(`${owner}: missing ${refKey} to ${expectedKeys.join(' | ')}.`);
    return matched;
  }
  refs.forEach((ref, index) => {
    if (!ref || typeof ref !== 'object' || Array.isArray(ref)) {
      issues.push(`${owner}.${refKey}[${index}]: reference must be an object.`);
      return;
    }
    if (ref.kind !== expectedKind) {
      issues.push(`${owner}.${refKey}[${index}]: expected kind ${expectedKind}, received ${String(ref.kind)}.`);
      return;
    }
    if (!expectedKeys.includes(ref.resourceKey)) {
      issues.push(`${owner}.${refKey}[${index}]: expected ${expectedKeys.join(' | ')}, received ${String(ref.resourceKey)}.`);
      return;
    }
    matched.add(ref.resourceKey);
  });
  return matched;
}

/**
 * @returns {string[]} issues; empty means the bundle is portable.
 */
function validatePortableBundle({ repoRoot, registry: candidateRegistry }) {
  const issues = [];

  // Publishers may validate a complete proposed lock before writing it. Standalone
  // validation always reads the committed lock and still detects fingerprint drift.
  const registry = candidateRegistry || readJson({ filePath: path.join(repoRoot, 'references', 'registry.json') });
  if (!registry) return ['references/registry.json is missing or not valid JSON.'];
  if (registry.schemaVersion !== 2 || !Array.isArray(registry.repos)) {
    return ['references/registry.json must be schema v2 with a repos array.'];
  }
  const persona = readJson({ filePath: path.join(repoRoot, 'assets', 'chat-config.json') });
  if (!persona) return [...issues, 'assets/chat-config.json is missing or not valid JSON.'];
  if (persona.schemaVersion !== 2 || !persona.resourceKey) {
    issues.push('assets/chat-config.json must be schema v2 with a resourceKey.');
  }
  for(const command of persona.publishedConfig?.agentTopology?.slashCommands||[])if(command.team)issues.push(...validatePlaybookTeam(command.team).map(message=>`team:${command.id||command.trigger}: ${message}`));
  issues.push(...validatePersonalizationAsset(persona.publishedConfig?.personalization, { repoRoot, registry, persona }));
  auditLocalIds({ value: persona, kind: 'persona', issues });

  // One workflow per distinct workflowRef, one or more Pipelines, and one or
  // more domain Lists.
  const portableRepos = registry.repos.filter((entry) => (
    entry && (entry.kind === 'workflow' || entry.kind === 'pipeline' || entry.kind === 'list')
  ));
  const workflowEntries = [];
  const pipelineEntries = [];
  const listEntries = [];
  for (const entry of portableRepos) {
    if (!entry || !entry.kind) continue;
    if (entry.kind === 'workflow') {
      workflowEntries.push(entry);
      continue;
    }
    if (entry.kind === 'list') {
      listEntries.push(entry);
      continue;
    }
    if (entry.kind === 'pipeline') {
      pipelineEntries.push(entry);
      continue;
    }
  }
  if (workflowEntries.length === 0) {
    issues.push('references/registry.json is missing its workflow dependency.');
  }
  if (pipelineEntries.length === 0) issues.push('references/registry.json is missing its pipeline dependency.');
  if (listEntries.length === 0) issues.push('references/registry.json is missing its list dependency.');
  if (portableRepos.length !== workflowEntries.length + pipelineEntries.length + listEntries.length) {
    issues.push(
      `references/registry.json must contain every Pipeline, every List, and one Workflow per distinct workflowRef — expected ${workflowEntries.length + pipelineEntries.length + listEntries.length}, found ${portableRepos.length}.`,
    );
  }
  if (workflowEntries.length === 0 || pipelineEntries.length === 0 || listEntries.length === 0) return issues;

  // Each definition must exist at its declared path, carry a matching portable header, hold
  // no environment-local ids, and match the fingerprint the manifest pinned for it.
  const readDefinition = ({ kind, entry }) => {
    const definition = readJson({ filePath: path.join(repoRoot, entry.path, entry.assetPath) });
    if (!definition) {
      issues.push(`${kind}:${entry.resourceKey}: missing ${entry.path}/${entry.assetPath}.`);
      return null;
    }
    if (definition.schemaVersion !== 2) {
      issues.push(`${kind}:${entry.resourceKey}: ${entry.assetPath} is not schema v2.`);
    }
    if (definition.resourceKey !== entry.resourceKey) {
      issues.push(`${kind}:${entry.resourceKey}: declares resourceKey ${String(definition.resourceKey)}.`);
    }
    auditLocalIds({ value: definition, kind: `${kind}:${entry.resourceKey}`, issues });
    const actual = fingerprint({ value: definition });
    if (entry.definitionFingerprint && entry.definitionFingerprint !== actual) {
      issues.push(`${kind}:${entry.resourceKey}: definitionFingerprint does not match ${entry.assetPath}.`);
    }
    return definition;
  };
  const workflowDefinitions = workflowEntries.map((entry) => readDefinition({ kind: 'workflow', entry }));
  const definitions = {
    pipelines: pipelineEntries.map((entry) => readDefinition({ kind: 'pipeline', entry })),
    lists: listEntries.map((entry) => readDefinition({ kind: 'list', entry })),
  };
  if (workflowDefinitions.some((definition) => !definition) || definitions.pipelines.some((definition) => !definition) || definitions.lists.some((definition) => !definition)) {
    return issues;
  }

  // The relationship chain — the part a header-only check misses entirely.
  const workflowKeys = workflowEntries.map((entry) => entry.resourceKey);
  const referencedWorkflowKeys = checkRef({
    owner: 'persona',
    refs: collectRefs({ value: persona, key: 'workflowRef' }),
    refKey: 'workflowRef',
    expectedKind: 'workflow',
    expectedKeys: workflowKeys,
    issues,
  });
  for (const key of workflowKeys) {
    if (!referencedWorkflowKeys.has(key)) {
      issues.push(`persona: no slash command references workflow ${key}.`);
    }
  }
  const pipelineKeys = pipelineEntries.map((entry) => entry.resourceKey);
  const referencedPipelineKeys = new Set();
  workflowDefinitions.forEach((definition, index) => {
    const refs = collectRefs({ value: definition, key: 'pipelineRef' });
    if (refs.length === 0) return;
    const matched = checkRef({
      owner: `workflow:${workflowKeys[index]}`,
      refs,
      refKey: 'pipelineRef',
      expectedKind: 'pipeline',
      expectedKeys: pipelineKeys,
      issues,
    });
    matched.forEach((key) => referencedPipelineKeys.add(key));
  });
  const personaPipelineRefs = [
    ...collectRefs({ value: persona, key: 'privatePipelineRef' }),
    ...collectRefs({ value: persona, key: 'pipelineRef' }),
  ];
  if (personaPipelineRefs.length) {
    checkRef({
      owner: 'persona',
      refs: personaPipelineRefs,
      refKey: 'privatePipelineRef',
      expectedKind: 'pipeline',
      expectedKeys: pipelineKeys,
      issues,
    }).forEach((key) => referencedPipelineKeys.add(key));
  }
  const storagePipelineByList = new Map();
  const validPipelineByList = new Map();
  definitions.pipelines.forEach((definition, index) => {
    const matched = checkRef({
      owner: `pipeline:${pipelineKeys[index]}.storage`,
      refs: collectRefs({ value: definition.storage || {}, key: 'listRef' }),
      refKey: 'listRef',
      expectedKind: 'list',
      expectedKeys: listEntries.map((entry) => entry.resourceKey),
      issues,
    });
    matched.forEach((listKey) => {
      if (storagePipelineByList.has(listKey)) issues.push(`pipeline:${pipelineKeys[index]}: storage List ${listKey} is already claimed by ${storagePipelineByList.get(listKey)}.`);
      else storagePipelineByList.set(listKey, pipelineKeys[index]);
    });
  });
  definitions.lists.forEach((definition, index) => {
    const storagePipelineKey = storagePipelineByList.get(listEntries[index].resourceKey);
    if (definition.list && definition.list.pipelineRef === undefined
      && !storagePipelineKey) return;
    const matched = checkRef({
      owner: `list:${listEntries[index].resourceKey}.list`,
      refs: collectRefs({ value: definition.list || {}, key: 'pipelineRef' }),
      refKey: 'pipelineRef',
      expectedKind: 'pipeline',
      expectedKeys: storagePipelineKey ? [storagePipelineKey] : pipelineKeys,
      issues,
    });
    if (matched.has(definition.list?.pipelineRef?.resourceKey)) {
      validPipelineByList.set(listEntries[index].resourceKey, definition.list.pipelineRef.resourceKey);
    }
  });
  for (const { value, path: owner } of renderedStageListRefs(persona)) {
    const matched = checkRef({ owner, refs: [value], refKey: 'listRef', expectedKind: 'list', expectedKeys: listEntries.map(entry => entry.resourceKey), issues });
    matched.forEach(key => {
      const pipelineKey = validPipelineByList.get(key);
      if (pipelineKey) referencedPipelineKeys.add(pipelineKey);
    });
  }
  pipelineKeys.forEach(key => {
    if (!referencedPipelineKeys.has(key)) issues.push(`pipeline: no workflow, profile mode, or rendered ChatApp stage view references ${key}.`);
  });

  return issues;
}

function findRepoRoot({ startDir }) {
  let current = startDir;
  while (true) {
    if (
      fs.existsSync(path.join(current, 'assets', 'chat-config.json'))
      && fs.existsSync(path.join(current, 'references', 'registry.json'))
    ) {
      return current;
    }
    const parent = path.dirname(current);
    if (parent === current) return null;
    current = parent;
  }
}

module.exports = { validatePortableBundle, stableJson, fingerprint };

if (require.main === module) {
  const repoRoot = findRepoRoot({ startDir: process.cwd() });
  if (!repoRoot) {
    process.stderr.write('Run this from a cloned Persona repository (assets/chat-config.json + references/registry.json).\n');
    process.exit(1);
  }
  const issues = validatePortableBundle({ repoRoot });
  if (issues.length) {
    issues.forEach((issue) => process.stderr.write(`${issue}\n`));
    process.exit(1);
  }
  process.stdout.write('Portable bundle is valid.\n');
}
