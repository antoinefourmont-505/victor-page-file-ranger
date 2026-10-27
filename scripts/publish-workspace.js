#!/usr/bin/env node
'use strict';

/**
 * Validate and publish a Persona composition workspace from a local clone.
 *
 * Usage (from the persona repository root):
 *   node scripts/publish-workspace.js status
 *   node scripts/publish-workspace.js validate
 *   node scripts/publish-workspace.js publish
 *
 * Child content must already be committed and pushed. This script only advances
 * the persona lock: gitlinks, references/workspace.json, and portable fingerprints.
 *
 * This clone has no database, so it cannot turn a local endpoint id or actionId into a
 * repository. Those edges are carried forward from the previously published
 * references/workspace.json, which records them without storing any local id. Anything
 * that cannot be matched is reported unresolved — never guessed.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawnSync } = require('child_process');
const { validatePortableBundle } = require('./validate-portable-bundle');

const FORBIDDEN = ['appId', 'endpointId', 'actionId', 'pageId', 'userId', 'pipelineId', 'listId', 'collectionId'];

const KIND_DIRECTORY = {
  workflow: 'workflows',
  pipeline: 'pipelines',
  list: 'lists',
  team_agent: 'team-agents',
  landing_page: 'landing-pages',
};

/** Primary asset per kind — the definition the registry pins and the manifest records. */
const PRIMARY_ASSET = {
  pipeline: 'assets/pipeline.json',
  list: 'assets/list.json',
  workflow: 'assets/workflow.json',
  team_agent: 'assets/team-agent.json',
  landing_page: 'assets/landing-page.json',
};

const VALIDATOR_MANIFEST = 'gabriel.workspace.json';
const VALIDATOR_MANIFEST_SCHEMA_VERSION = 1;
const VALIDATOR_RUNNERS = new Set(['node', 'tsx']);
const VALIDATOR_MODES = new Set(['required', 'if_asset_present']);
const SCAFFOLD_BY_KIND = {
  workflow: 'workflow-builder',
  pipeline: 'pipeline-builder',
  list: 'list-builder',
  team_agent: 'team-agents',
  landing_page: 'landing-page-builder',
};

/**
 * Every validator a child scaffold ships, run from the child's own directory.
 *
 * `if_asset_present` gates optional ones: a list only validates records when it actually
 * has data/records.json. A team agent has two validators, not one.
 */
const CHILD_VALIDATORS = {
  pipeline: [
    { runner: 'node', script: 'scripts/validate-pipeline.js', assetPath: 'assets/pipeline.json', mode: 'required' },
  ],
  list: [
    { runner: 'node', script: 'scripts/validate-list.js', assetPath: 'assets/list.json', mode: 'required' },
    { runner: 'node', script: 'scripts/validate-records.js', assetPath: 'data/records.json', mode: 'if_asset_present' },
  ],
  workflow: [
    { runner: 'tsx', script: 'scripts/validate-workflow.ts', assetPath: 'assets/workflow.json', mode: 'required' },
  ],
  team_agent: [
    { runner: 'tsx', script: 'scripts/validate-team-agent.ts', assetPath: 'assets/team-agent.json', mode: 'required' },
    // Task orchestration is opt-in: a plain team agent (build-basket,
    // submit-order, reserve-slot) ships only assets/team-agent.json, and this
    // validator exits non-zero when handed a path that does not exist.
    { runner: 'tsx', script: 'scripts/validate-task-orchestration.ts', assetPath: 'assets/task-orchestration.json', mode: 'if_asset_present' },
  ],
  landing_page: [
    { runner: 'node', script: 'scripts/validate-landing-page.js', assetPath: 'assets/landing-page.json', mode: 'required' },
  ],
};

function writeOut({ message }) {
  process.stdout.write(`${message}\n`);
}

function writeErr({ message }) {
  process.stderr.write(`${message}\n`);
}

function die({ message, code = 1 }) {
  writeErr({ message });
  process.exit(code);
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
    if (parent === current) {
      die({ message: 'Run this script from a cloned Persona repository (assets/chat-config.json + references/registry.json).' });
    }
    current = parent;
  }
}

function readJson({ filePath }) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

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

/** Supplemental package pin: never change legacy definitionFingerprint semantics. */
function committedPreviewPackagePin({ repoRoot, node, reference }) {
  if (!reference || Object.keys(reference).some(k => !['path', 'mode'].includes(k)) || !/^skills\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(reference.path) || !['legacy', 'shadow', 'skill'].includes(reference.mode)) throw new Error('Invalid workflowSkill reference');
  const cwd = path.join(repoRoot, node.path);
  const read = args => {
    const result = spawnSync('git', args, { cwd, encoding: 'utf8', maxBuffer: 1024 * 1024 });
    if (result.status !== 0) throw new Error('Unable to read committed workflow package');
    return result.stdout;
  };
  if (!/^[a-f0-9]{40}$/.test(node.revision)) throw new Error('Workflow package needs a commit SHA');
  const entries = read(['ls-tree', '-r', '-z', '-l', node.revision, '--', `${reference.path}/`]).split('\0').filter(Boolean);
  if (!entries.length || entries.length > 96) throw new Error('Invalid workflow package size');
  let total = 0;
  const files = entries.map(entry => {
    const [meta, name] = entry.split('\t');
    const [mode, type, blob, size] = meta.trim().split(/\s+/);
    if (mode !== '100644' || type !== 'blob' || !name.startsWith(`${reference.path}/`) || Number(size) > 65536 || (total += Number(size)) > 3145728) throw new Error('Unsafe package blob');
    return [name.slice(reference.path.length + 1), read(['cat-file', 'blob', blob])];
  }).sort(([a], [b]) => a.localeCompare(b));
  // Strict schema validation is performed by the maintained child validator below.
  return { path: reference.path, fingerprint: crypto.createHash('sha256').update(JSON.stringify(files)).digest('hex') };
}

function git({ args, cwd, allowFail = false }) {
  const result = spawnSync('git', args, { cwd, encoding: 'utf8' });
  if (result.status !== 0 && !allowFail) {
    die({ message: result.stderr.trim() || `git ${args.join(' ')} failed` });
  }
  return (result.stdout || '').trim();
}

/**
 * Same as `git`, but throws instead of exiting.
 *
 * The publish sequence must be able to unwind: `die()` terminates the process immediately,
 * which would strand written files, a staged index, and a rewritten `.gitmodules`.
 */
function gitOrThrow({ args, cwd, allowFail = false }) {
  const result = spawnSync('git', args, { cwd, encoding: 'utf8' });
  if (result.status !== 0 && !allowFail) {
    throw new Error((result.stderr || '').trim() || `git ${args.join(' ')} failed`);
  }
  return (result.stdout || '').trim();
}

function gitResult({ args, cwd }) {
  return spawnSync('git', args, {
    cwd,
    encoding: 'utf8',
    env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
  });
}

function normalizeRepoRelativePath({ value, label }) {
  const raw = String(value || '').trim().replace(/\\/g, '/');
  const normalized = path.posix.normalize(raw);
  if (
    !raw
    || path.posix.isAbsolute(raw)
    || normalized === '.'
    || normalized === '..'
    || normalized.startsWith('../')
    || normalized !== raw
  ) {
    throw new Error(`${label} must be a normalized repository-relative path without traversal.`);
  }
  return normalized;
}

function isBuiltin({ value }) {
  const endpoint = String(value || '').trim().toLowerCase();
  return endpoint.startsWith('schema-form:') || endpoint.startsWith('image-fill:') || [
    'grocery-inventory:review', 'grocery-inventory:dietary', 'grocery-inventory:restock-review',
    'scrap-operations:intake', 'scrap-operations:society-drive', 'scrap-operations:recurring-pickup',
    'scrap-operations:certificate', 'scrap-operations:quote', 'scrap-operations:dispatch-plan',
    'scrap-operations:reconcile', 'scrap-operations:payout-plan', 'scrap-operations:prepare-business',
  ].includes(endpoint);
}

function teamAgentOwnsEndpoint({ repoRoot, relPath, endpoint }) {
  const definition = readChildJson({ repoRoot, relPath, assetPath: 'assets/team-agent.json' });
  const candidates = [
    definition?.endpoint?.id,
    definition?.endpointId,
    definition?.actionId,
  ]
    .map((value) => String(value || '').trim())
    .filter(Boolean);
  return candidates.some((candidate) => (
    candidate === endpoint
    || (!endpoint.includes(':') && candidate.endsWith(`:${endpoint}`))
  ));
}

function toReferenceSlug({ value }) {
  const slug = String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
  return slug || 'unnamed';
}

function cleanRemoteUrl({ repositoryUrl }) {
  const trimmed = String(repositoryUrl || '').trim().replace(/\.git$/i, '');
  const sshMatch = trimmed.match(/^git@([^:]+):(.+)$/);
  if (sshMatch) return `https://${sshMatch[1]}/${sshMatch[2]}`.replace(/\/+$/, '');
  try {
    const parsed = new URL(trimmed);
    parsed.username = '';
    parsed.password = '';
    return parsed.toString().replace(/\/+$/, '');
  } catch {
    return trimmed;
  }
}

function sameRepositoryUrl({ left, right }) {
  return cleanRemoteUrl({ repositoryUrl: left }) === cleanRemoteUrl({ repositoryUrl: right });
}

function slugFromRemoteUrl({ repositoryUrl }) {
  const cleaned = cleanRemoteUrl({ repositoryUrl });
  try {
    const parsed = new URL(cleaned);
    const parts = parsed.pathname.split('/').filter(Boolean);
    return toReferenceSlug({ value: parts[parts.length - 1] || cleaned });
  } catch {
    return toReferenceSlug({ value: cleaned.split('/').filter(Boolean).pop() || 'unnamed' });
  }
}

/**
 * Mirrors createWorkspaceSlugAllocator on the server. The base slug is only the
 * repository's last path segment, so orgA/intake and orgB/intake collide and would
 * otherwise merge into one node. First remote to claim a slug keeps it — nothing already
 * published moves — and any other remote gets a short digest of its own URL appended.
 */
function createSlugAllocator({ previous } = {}) {
  const claimedBy = new Map();
  const seededSlug = new Map();

  // Seed from the prior manifest keyed on (kind, canonical URL). Without this the bare
  // slug goes to whichever remote discovery reaches first, so inserting a transition or
  // command could move an already-published path.
  for (const node of (previous && previous.nodes) || []) {
    if (!node.path || !node.repositoryUrl || node.portable) continue;
    const slug = node.path.split('/').pop();
    if (!slug) continue;
    const cleaned = cleanRemoteUrl({ repositoryUrl: node.repositoryUrl });
    claimedBy.set(`${node.kind}:${slug}`, cleaned);
    seededSlug.set(`${node.kind}:${cleaned}`, slug);
  }

  return {
    claim({ kind, repositoryUrl }) {
      const cleaned = cleanRemoteUrl({ repositoryUrl });
      const seeded = seededSlug.get(`${kind}:${cleaned}`);
      if (seeded) return seeded;

      const base = slugFromRemoteUrl({ repositoryUrl });
      const baseKey = `${kind}:${base}`;
      const holder = claimedBy.get(baseKey);
      if (!holder) {
        claimedBy.set(baseKey, cleaned);
        seededSlug.set(`${kind}:${cleaned}`, base);
        return base;
      }
      if (holder === cleaned) return base;
      const suffixed = `${base}-${crypto.createHash('sha256').update(cleaned).digest('hex').slice(0, 6)}`;
      claimedBy.set(`${kind}:${suffixed}`, cleaned);
      seededSlug.set(`${kind}:${cleaned}`, suffixed);
      return suffixed;
    },
  };
}

function walkForbidden({ value, pathLabel = '$' }) {
  if (Array.isArray(value)) {
    value.forEach((child, index) => walkForbidden({ value: child, pathLabel: `${pathLabel}[${index}]` }));
    return;
  }
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    if (FORBIDDEN.includes(key)) {
      throw new Error(`${pathLabel}.${key} is environment-local and cannot be stored in references/workspace.json.`);
    }
    walkForbidden({ value: child, pathLabel: `${pathLabel}.${key}` });
  }
}

function hasPortableRef({ value, key, kind, resourceKey }) {
  if (Array.isArray(value)) return value.some((child) => hasPortableRef({ value: child, key, kind, resourceKey }));
  if (!value || typeof value !== 'object') return false;
  for (const [childKey, child] of Object.entries(value)) {
    if (
      childKey === key
      && child
      && typeof child === 'object'
      && child.kind === kind
      && child.resourceKey === resourceKey
    ) return true;
    if (hasPortableRef({ value: child, key, kind, resourceKey })) return true;
  }
  return false;
}

function parseRegistry({ repoRoot }) {
  const registry = readJson({ filePath: path.join(repoRoot, 'references', 'registry.json') });
  if (registry.schemaVersion !== 2 || !Array.isArray(registry.repos)) {
    throw new Error('references/registry.json must be schema v2 with a repos array.');
  }
  // A persona binds one registry Workflow per distinct workflowRef; commands may share it.
  const workflowCount = registry.repos.filter((entry) => entry.kind === 'workflow').length;
  const pipelineCount = registry.repos.filter((entry) => entry.kind === 'pipeline').length;
  const listCount = registry.repos.filter((entry) => entry.kind === 'list').length;
  const kinds = new Set(registry.repos.map((entry) => entry.kind));
  if (!kinds.has('workflow') || !kinds.has('pipeline') || !kinds.has('list')) {
    throw new Error('references/registry.json must contain at least one workflow, pipeline, and list.');
  }
  if (registry.repos.some((entry) => entry.kind === 'team_agent')) {
    throw new Error('team_agent is not a portable registry kind. Preserve its declaration in workspace.json before publishing.');
  }
  if (registry.repos.length !== workflowCount + pipelineCount + listCount) {
    throw new Error(
      `references/registry.json must contain every Pipeline, every List, and one Workflow per distinct workflowRef — expected ${workflowCount + pipelineCount + listCount}, found ${registry.repos.length}.`,
    );
  }
  const identities = new Set();
  const paths = new Set();
  for (const [index, entry] of registry.repos.entries()) {
    if (!['workflow', 'pipeline', 'list'].includes(entry.kind)) {
      throw new Error(`references/registry.json repos[${index}] has invalid kind ${String(entry.kind)}.`);
    }
    const resourceKey = String(entry.resourceKey || '').trim();
    const identity = `${entry.kind}:${resourceKey}`;
    if (!resourceKey || identities.has(identity)) {
      throw new Error(`references/registry.json has a missing or duplicate dependency ${identity}.`);
    }
    identities.add(identity);
    const relPath = normalizeRepoRelativePath({ value: entry.path, label: `registry.repos[${index}].path` });
    const expectedPrefix = `references/${KIND_DIRECTORY[entry.kind]}/`;
    if (!relPath.startsWith(expectedPrefix) || relPath.split('/').length !== 3 || paths.has(relPath)) {
      throw new Error(`registry.repos[${index}].path must be a unique direct ${expectedPrefix}<slug> path.`);
    }
    paths.add(relPath);
    normalizeRepoRelativePath({ value: entry.assetPath, label: `registry.repos[${index}].assetPath` });
    if (!String(entry.repositoryUrl || '').trim() || !String(entry.branch || '').trim()) {
      throw new Error(`registry.repos[${index}] requires repositoryUrl and branch.`);
    }
  }
  return registry;
}

function submoduleHead({ repoRoot, relPath }) {
  const abs = path.join(repoRoot, relPath);
  if (!fs.existsSync(abs)) return null;
  const head = git({ args: ['rev-parse', 'HEAD'], cwd: abs, allowFail: true });
  return /^[0-9a-f]{40}$/i.test(head) ? head : null;
}

function declaredBranchHead({ repoRoot, relPath, branch }) {
  if (!branch) return null;
  const abs = path.join(repoRoot, relPath);
  const result = gitResult({ args: ['ls-remote', '--exit-code', 'origin', `refs/heads/${branch}`], cwd: abs });
  if (result.status !== 0) return null;
  const line = (result.stdout || '').trim();
  const sha = (line.split(/\s+/)[0] || '').trim();
  return /^[0-9a-f]{40}$/i.test(sha) ? sha : null;
}

/**
 * Is the checked-out commit present on origin?
 *
 * Deliberately not "does HEAD equal the remote head" — pinning an older commit is the
 * normal state of a submodule and must not block a publish. What must block is a commit
 * that exists only in this clone, because no one else could ever resolve that pin.
 */
function childCommitIsOnDeclaredBranch({ repoRoot, relPath, branch, head, remote }) {
  if (!head || !remote || !branch) return null;
  if (head === remote) return true;
  const abs = path.join(repoRoot, relPath);
  const fetched = gitResult({ args: ['fetch', '-q', 'origin', `refs/heads/${branch}`], cwd: abs });
  if (fetched.status !== 0) return null; // Cannot tell — reported separately.
  const ancestor = gitResult({ args: ['merge-base', '--is-ancestor', head, 'FETCH_HEAD'], cwd: abs });
  return ancestor.status === 0;
}

function remoteUrlFor({ repoRoot, relPath }) {
  return git({ args: ['config', '--get', 'remote.origin.url'], cwd: path.join(repoRoot, relPath), allowFail: true });
}

function currentBranchFor({ repoRoot, relPath }) {
  const branch = git({ args: ['rev-parse', '--abbrev-ref', 'HEAD'], cwd: path.join(repoRoot, relPath), allowFail: true });
  return branch && branch !== 'HEAD' ? branch : 'main';
}

function childIsOwnWorktree({ repoRoot, relPath }) {
  const cwd = path.join(repoRoot, relPath);
  if (!fs.existsSync(cwd)) return false;
  const topLevel = git({ args: ['rev-parse', '--show-toplevel'], cwd, allowFail: true });
  if (!topLevel) return false;
  try {
    return fs.realpathSync(topLevel) === fs.realpathSync(cwd);
  } catch {
    return false;
  }
}

function readChildJson({ repoRoot, relPath, assetPath }) {
  const filePath = path.join(repoRoot, relPath, assetPath);
  if (!fs.existsSync(filePath)) return null;
  try {
    return readJson({ filePath });
  } catch {
    return null;
  }
}

function listReferenceDirs({ repoRoot, kindDir }) {
  const root = path.join(repoRoot, 'references', kindDir);
  if (!fs.existsSync(root)) return [];
  return fs.readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.posix.join('references', kindDir, entry.name));
}

function readPreviousManifest({ repoRoot }) {
  const previousPath = path.join(repoRoot, 'references', 'workspace.json');
  if (!fs.existsSync(previousPath)) return { nodes: [], edges: [] };
  try {
    const parsed = readJson({ filePath: previousPath });
    return {
      nodes: Array.isArray(parsed.nodes) ? parsed.nodes : [],
      edges: Array.isArray(parsed.edges) ? parsed.edges : [],
    };
  } catch {
    return { nodes: [], edges: [] };
  }
}

/** Rebuild a node from a carried-forward path, re-reading its live head and remote. */
function nodeFromDir({ repoRoot, id, kind, displayName, relPath, allocator }) {
  const priorNode = readPreviousManifest({ repoRoot }).nodes.find((node) => node.path === relPath);
  const liveRepositoryUrl = remoteUrlFor({ repoRoot, relPath });
  // A carried node's prior generated URL is the canonical binding. Do not silently bless
  // a checkout whose origin was changed after the last server reconciliation.
  let repositoryUrl = priorNode?.repositoryUrl || liveRepositoryUrl;
  // Early local clones recorded their filesystem origin in portable authoring nodes.
  // Recover only when the checked-out origin agrees with the declared network URL.
  if (/^(?:\/|[a-z]:[\\/]|file:|\.{1,2}\/|~\/)/i.test(String(repositoryUrl || ''))) {
    const declared = gitmodulesEntries({ repoRoot }).filter(entry => entry.path === relPath);
    if (declared.length === 1 && /^(?:https?:\/\/|ssh:\/\/|git:\/\/|git@[^:]+:)/i.test(declared[0].url)
      && sameRepositoryUrl({ left: liveRepositoryUrl, right: declared[0].url })) {
      repositoryUrl = declared[0].url;
    }
  }
  const assetPath = PRIMARY_ASSET[kind];
  // The allocator is seeded from the prior manifest, so this returns the already-published
  // slug for a known remote and only allocates for a genuinely new one.
  if (repositoryUrl) allocator.claim({ kind, repositoryUrl });
  return {
    id,
    kind,
    displayName,
    path: relPath,
    repositoryUrl: repositoryUrl ? cleanRemoteUrl({ repositoryUrl }) : undefined,
    branch: priorNode && priorNode.branch ? priorNode.branch : currentBranchFor({ repoRoot, relPath }),
    revision: submoduleHead({ repoRoot, relPath }) || undefined,
    assetPaths: [assetPath],
  };
}

function buildLocalManifest({ repoRoot, registry }) {
  const seedPrevious = readPreviousManifest({ repoRoot });
  const allocator = createSlugAllocator({ previous: seedPrevious });
  const chatConfig = readJson({ filePath: path.join(repoRoot, 'assets', 'chat-config.json') });
  const published = chatConfig.publishedConfig && typeof chatConfig.publishedConfig === 'object'
    ? chatConfig.publishedConfig
    : {};
  const topology = published.agentTopology && typeof published.agentTopology === 'object'
    ? published.agentTopology
    : {};
  const slashCommands = Array.isArray(topology.slashCommands) ? topology.slashCommands : [];
  const pipelineEntries = registry.repos.filter((entry) => entry.kind === 'pipeline');
  const workflowEntries = registry.repos.filter((entry) => entry.kind === 'workflow');
  const listEntries = registry.repos.filter((entry) => entry.kind === 'list');
  const pipelineContexts = pipelineEntries.map((entry) => {
    const definition = readChildJson({
      repoRoot,
      relPath: entry.path,
      assetPath: entry.assetPath || 'assets/pipeline.json',
    });
    const nested = definition && definition.pipeline && typeof definition.pipeline === 'object'
      ? definition.pipeline
      : definition || {};
    return { entry, definition, nested, pipelineId: `pipeline:${entry.resourceKey}` };
  });
  const transitions = pipelineContexts.flatMap((context) => (
    Array.isArray(context.nested.transitions)
      ? context.nested.transitions.map((transition) => ({ ...transition, __pipelineId: context.pipelineId }))
      : []
  ));

  const previous = readPreviousManifest({ repoRoot });
  const previousNodeById = new Map(previous.nodes.map((node) => [node.id, node]));

  const nodes = new Map();
  const edges = [];
  const addEdge = ({ from, to, relation, source }) => {
    if (edges.some((edge) => edge.from === from && edge.to === to && edge.relation === relation && edge.source === source)) return;
    edges.push({ from, to, relation, source });
  };
  const upsertNode = ({ node }) => {
    const existing = nodes.get(node.id);
    if (!existing) {
      nodes.set(node.id, node);
      return node.id;
    }
    if (!existing.repositoryUrl && node.repositoryUrl) {
      nodes.set(node.id, { ...existing, ...node, unresolved: undefined });
    }
    return node.id;
  };

  for (const entry of registry.repos) {
    const definition = readChildJson({ repoRoot, relPath: entry.path, assetPath: entry.assetPath });
    upsertNode({
      node: {
        id: `${entry.kind}:${entry.resourceKey}`,
        kind: entry.kind,
        displayName: entry.displayName,
        path: entry.path,
        repositoryUrl: entry.repositoryUrl,
        branch: entry.branch,
        revision: submoduleHead({ repoRoot, relPath: entry.path }) || entry.revision,
        assetPaths: [entry.assetPath],
        portable: {
          resourceKey: entry.resourceKey,
          assetPath: entry.assetPath,
          definitionFingerprint: definition ? fingerprint({ value: definition }) : entry.definitionFingerprint,
        },
      },
    });
  }

  // ---- Persona -> Landing Page ----
  const landingRef = published.landingPageRef && typeof published.landingPageRef === 'object'
    ? published.landingPageRef
    : {};
  const landingResourceKey = String(landingRef.resourceKey || '').trim();
  if (landingResourceKey) {
    const source = 'publishedConfig.landingPageRef';
    const id = `landing_page:${landingResourceKey}`;
    const matchDir = listReferenceDirs({ repoRoot, kindDir: 'landing-pages' }).find((relPath) => {
      const definition = readChildJson({ repoRoot, relPath, assetPath: PRIMARY_ASSET.landing_page });
      return definition && definition.resourceKey === landingResourceKey;
    });
    if (!matchDir) {
      upsertNode({
        node: {
          id,
          kind: 'landing_page',
          displayName: landingResourceKey,
          unresolved: { reason: 'missing_git_binding', source },
        },
      });
    } else {
      const definition = readChildJson({ repoRoot, relPath: matchDir, assetPath: PRIMARY_ASSET.landing_page });
      const node = nodeFromDir({
        repoRoot,
        id,
        kind: 'landing_page',
        displayName: previousNodeById.get(id)?.displayName || landingResourceKey,
        relPath: matchDir,
        allocator,
      });
      node.portable = {
        resourceKey: landingResourceKey,
        assetPath: PRIMARY_ASSET.landing_page,
        definitionFingerprint: fingerprint({ value: definition }),
      };
      upsertNode({ node });
    }
    addEdge({ from: 'persona', to: id, relation: 'landingPageRef', source });
  }

  // ---- Persona -> Chat App (root-owned portable definition) ----
  const chatAppPath = path.join(repoRoot, 'assets', 'chat-app.json');
  if (fs.existsSync(chatAppPath)) {
    const chatAppDefinition = readJson({ filePath: chatAppPath });
    const chatAppResourceKey = String(chatAppDefinition.resourceKey || '').trim();
    if (chatAppResourceKey) {
      const chatAppId = `chat_app:${chatAppResourceKey}`;
      for(const point of chatAppDefinition.chatApp?.dataPoints || []) {
        if(point.source!=='list')continue;
        const target=`list:${point.listRef.resourceKey}`;
        if(!nodes.has(target))throw new Error(`Undeclared Chat App list ${point.listRef.resourceKey}`);
        addEdge({from:chatAppId,to:target,relation:'dataPoint',source:`publishedConfig.chatApp.dataPoints.${point.id}`});
      }

      upsertNode({
        node: {
          id: chatAppId,
          kind: 'chat_app',
          displayName: previousNodeById.get(chatAppId)?.displayName || chatAppResourceKey,
          assetPaths: ['assets/chat-app.json'],
          portable: {
            resourceKey: chatAppResourceKey,
            assetPath: 'assets/chat-app.json',
            definitionFingerprint: fingerprint({ value: chatAppDefinition }),
          },
        },
      });
      addEdge({ from: 'persona', to: chatAppId, relation: 'chatAppRef', source: 'publishedConfig.chatAppRef' });
      const matchTarget = published.peopleMatchingConfig?.matchTarget?.listRef;
      const matchListKey = String(matchTarget?.resourceKey || '').trim();
      if (matchListKey && nodes.has(`list:${matchListKey}`)) {
        addEdge({
          from: chatAppId,
          to: `list:${matchListKey}`,
          relation: 'moduleDataRef',
          source: 'chatApp.navigation.matches',
        });
      }
    }
  }

  for (const workflowEntry of workflowEntries) {
    const workflowId = `workflow:${workflowEntry.resourceKey}`;
    // `to` already disambiguates these per workflow, so the source label stays
    // stable — existing published workspace.json files keep matching.
    addEdge({ from: 'persona', to: workflowId, relation: 'workflowRef', source: 'persona.workflowRef' });
    const workflowDefinition = readChildJson({
      repoRoot,
      relPath: workflowEntry.path,
      assetPath: workflowEntry.assetPath,
    });
    for (const pipelineEntry of pipelineEntries) {
      if (hasPortableRef({
        value: workflowDefinition,
        key: 'pipelineRef',
        kind: 'pipeline',
        resourceKey: pipelineEntry.resourceKey,
      })) {
        addEdge({ from: workflowId, to: `pipeline:${pipelineEntry.resourceKey}`, relation: 'pipelineRef', source: 'workflow.pipelineRef' });
      }
    }
  }
  for (const listEntry of listEntries) {
    const listDefinition = readChildJson({ repoRoot, relPath: listEntry.path, assetPath: listEntry.assetPath });
    const reciprocalKey = String(listDefinition?.list?.pipelineRef?.resourceKey || '').trim();
    const storageContext = pipelineContexts.find((context) => context.definition?.storage?.listRef?.resourceKey === listEntry.resourceKey);
    const pipelineKey = storageContext?.entry.resourceKey || reciprocalKey;
    if (pipelineKey && pipelineEntries.some((entry) => entry.resourceKey === pipelineKey)) {
      addEdge({
        from: `pipeline:${pipelineKey}`,
        to: `list:${listEntry.resourceKey}`,
        relation: 'listRef',
        source: storageContext ? 'pipeline.storage.listRef' : `list.${listEntry.resourceKey}.pipelineRef`,
      });
    }
  }

  // ---- Persona -> Workflow (slash commands) ----
  const extraWorkflowDirs = listReferenceDirs({ repoRoot, kindDir: 'workflows' });
  for (const command of slashCommands) {
    const trigger = String(command.trigger || '').trim();
    if (!trigger) continue;
    const execution = command.execution && typeof command.execution === 'object' ? command.execution : {};
    const workflowRef = execution.workflowRef && typeof execution.workflowRef === 'object'
      ? execution.workflowRef
      : (command.workflowRef && typeof command.workflowRef === 'object' ? command.workflowRef : {});
    const resourceKey = String(workflowRef.resourceKey || '').trim();
    const executionType = String(execution.type || '').trim();
    const actionId = String(execution.actionId || '').trim();
    // Inline Canvas commands and chat-only command declarations are part of the
    // Persona root itself; they do not own a Workflow repository or gitlink.
    // Only an Operator action or explicit workflowRef participates in the
    // composition graph.
    if (!resourceKey && executionType !== 'operator_action' && !actionId) continue;
    const source = `persona.slashCommand.${trigger}`;
    const displayName = String(command.label || trigger);

    // A command bound to a local Operator action rather than a portable workflowRef cannot
    // be resolved from a clone. If a prior publish already reconciled this trigger, carry
    // that edge forward — the product rewrites commands to actionId on every sync, so
    // failing here would permanently block publishing an otherwise healthy workspace.
    // Only a trigger never reconciled before is genuinely unresolved.
    if (!resourceKey) {
      const priorEdge = previous.edges.find((edge) => edge.source === source && edge.relation === 'slashCommand');
      const priorNode = priorEdge ? previousNodeById.get(priorEdge.to) : null;
      if (priorNode && priorNode.path && fs.existsSync(path.join(repoRoot, priorNode.path))) {
        upsertNode({
          node: nodeFromDir({
            repoRoot,
            id: priorNode.id,
            kind: 'workflow',
            displayName: priorNode.displayName || displayName,
            relPath: priorNode.path,
            allocator,
          }),
        });
        addEdge({ from: 'persona', to: priorNode.id, relation: 'slashCommand', source });
        continue;
      }
      const unresolvedId = `workflow:command:${toReferenceSlug({ value: trigger })}`;
      upsertNode({
        node: { id: unresolvedId, kind: 'workflow', displayName, unresolved: { reason: 'missing_git_binding', source } },
      });
      addEdge({ from: 'persona', to: unresolvedId, relation: 'slashCommand', source });
      continue;
    }

    const id = `workflow:${resourceKey}`;
    if (nodes.has(id)) {
      addEdge({ from: 'persona', to: id, relation: 'slashCommand', source });
      continue;
    }
    const matchDir = extraWorkflowDirs.find((relPath) => {
      const definition = readChildJson({ repoRoot, relPath, assetPath: 'assets/workflow.json' });
      return definition && definition.resourceKey === resourceKey;
    });
    if (!matchDir) {
      upsertNode({
        node: { id, kind: 'workflow', displayName, unresolved: { reason: 'missing_git_binding', source } },
      });
      addEdge({ from: 'persona', to: id, relation: 'slashCommand', source });
      continue;
    }
    upsertNode({
      node: nodeFromDir({ repoRoot, id, kind: 'workflow', displayName, relPath: matchDir, allocator }),
    });
    addEdge({ from: 'persona', to: id, relation: 'slashCommand', source });
  }

  // ---- Pipeline -> Team Agent, and Team Agent -> child Workflow ----
  const teamAgentDirs = new Set(listReferenceDirs({ repoRoot, kindDir: 'team-agents' }));
  for (const transition of transitions) {
    const pipelineId = transition.__pipelineId;
    const transitionId = String(transition.id || '').trim();
    const endpoint = String(transition.workflowEndpointId || '').trim();
    if (!transitionId || !endpoint || isBuiltin({ value: endpoint })) continue;
    const source = `pipeline.transition.${transitionId}.workflowEndpointId`;

    // `endpoint` is a runtime id with no local mapping to a repository. The only sound
    // resolution is the edge a previous server publish recorded for this exact transition.
    const previousEdge = previous.edges.find((edge) => edge.source === source && edge.relation === 'workflowEndpoint');
    const previousNode = previousEdge ? previousNodeById.get(previousEdge.to) : null;
    let matchDir = previousNode && previousNode.path && teamAgentDirs.has(previousNode.path)
      ? previousNode.path
      : null;

    // One Team Agent endpoint may intentionally power several transitions (for example,
    // draft + revise or send + save). A prior manifest records the binding per transition,
    // so a newly added sibling transition has no exact edge to carry forward. Resolve it
    // only when the checked-out Team Agent declares this exact endpoint and the match is
    // unique. This is deterministic ownership metadata, not the old unsafe "only folder"
    // guess that could bind an arbitrary agent to every endpoint.
    if (!matchDir) {
      const endpointMatches = [...teamAgentDirs].filter((relPath) => (
        teamAgentOwnsEndpoint({ repoRoot, relPath, endpoint })
      ));
      if (endpointMatches.length === 1) [matchDir] = endpointMatches;
    }

    if (!matchDir) {
      const unresolvedId = `team_agent:transition:${toReferenceSlug({ value: transitionId })}`;
      upsertNode({
        node: {
          id: unresolvedId,
          kind: 'team_agent',
          displayName: transitionId,
          unresolved: { reason: 'missing_git_binding', source },
        },
      });
      addEdge({ from: pipelineId, to: unresolvedId, relation: 'workflowEndpoint', source });
      continue;
    }

    const matchedDefinition = readChildJson({ repoRoot, relPath: matchDir, assetPath: 'assets/team-agent.json' });
    const agentId = previousNode?.id || `team_agent:${toReferenceSlug({ value: path.basename(matchDir) })}`;
    upsertNode({
      node: nodeFromDir({
        repoRoot,
        id: agentId,
        kind: 'team_agent',
        displayName: previousNode?.displayName || String(matchedDefinition?.endpoint?.name || path.basename(matchDir)),
        relPath: matchDir,
        allocator,
      }),
    });
    addEdge({ from: pipelineId, to: agentId, relation: 'workflowEndpoint', source });

    // Team Agent -> child Workflow. childSkills carry agentId/actionId, which a clone
    // cannot resolve, so these too are carried forward from the previous manifest.
    const orchestration = readChildJson({ repoRoot, relPath: matchDir, assetPath: 'assets/task-orchestration.json' });
    const childSkills = orchestration && Array.isArray(orchestration.childSkills) ? orchestration.childSkills : [];
    for (let index = 0; index < childSkills.length; index += 1) {
      const child = childSkills[index] || {};
      // Same stable key the server uses. Matching carried edges by array position instead
      // silently rebound workflows to the wrong children whenever a child skill was
      // reordered or inserted.
      const skillKey = String(child.id || child.workflowNodeId || `child-${index + 1}`).trim();
      const displayName = String(child.title || skillKey);
      const childSource = `team-agent.task-orchestration.childSkills.${skillKey}`;
      const carried = previous.edges.find(
        (edge) => edge.from === agentId && edge.relation === 'childSkill' && edge.source === childSource,
      );
      const carriedNode = carried ? previousNodeById.get(carried.to) : null;
      if (!carriedNode || !carriedNode.path || !fs.existsSync(path.join(repoRoot, carriedNode.path))) {
        const unresolvedId = `workflow:child:${toReferenceSlug({ value: `${agentId}-${skillKey}` })}`;
        upsertNode({
          node: { id: unresolvedId, kind: 'workflow', displayName, unresolved: { reason: 'missing_git_binding', source: childSource } },
        });
        addEdge({ from: agentId, to: unresolvedId, relation: 'childSkill', source: childSource });
        continue;
      }
      upsertNode({
        node: nodeFromDir({
          repoRoot,
          id: carriedNode.id,
          kind: 'workflow',
          displayName,
          relPath: carriedNode.path,
          allocator,
        }),
      });
      addEdge({ from: agentId, to: carriedNode.id, relation: 'childSkill', source: childSource });
    }
  }

  for (const command of slashCommands) {
    const journey = command.guidedJourney;
    const reference = journey?.enabled === true
      ? {
          path: journey.packagePath,
          mode: journey.rolloutMode === 'active' ? 'skill' : 'shadow',
        }
      : command.execution?.workflowSkill;
    if (!reference) continue;
    if (command.execution?.type !== 'operator_action') continue;
    const node = nodes.get(`workflow:${command.execution.workflowRef?.resourceKey}`);
    if (!node?.path || !node.revision) throw new Error('guided journey needs a pinned portable workflow');
    // Legacy workflowSkill remains cross-checked with the child declaration while
    // guidedJourney is canonical in the Persona command and needs no duplicate
    // child command metadata. Both routes pin the immutable committed package.
    if (journey?.enabled !== true) {
      const declared = readChildJson({ repoRoot, relPath: node.path, assetPath: 'assets/persona-command.json' });
      if (JSON.stringify(declared?.workflowSkill) !== JSON.stringify(reference)) throw new Error('Published workflowSkill must match its workflow command declaration');
    }
    node.workflowSkill = committedPreviewPackagePin({ repoRoot, node, reference });
  }
  const manifest = {
    schemaVersion: 1,
    updatedAt: Date.now(),
    nodes: [...nodes.values()].sort((left, right) => left.id.localeCompare(right.id)),
    edges: edges.sort((left, right) => `${left.from}:${left.to}:${left.source}`.localeCompare(`${right.from}:${right.to}:${right.source}`)),
  };
  walkForbidden({ value: manifest });
  return manifest;
}

function readValidatorManifest({ cwd, node }) {
  const manifestPath = path.join(cwd, VALIDATOR_MANIFEST);
  if (!fs.existsSync(manifestPath)) return null;
  let manifest;
  try {
    manifest = readJson({ filePath: manifestPath });
  } catch (error) {
    throw new Error(`${node.id}: ${VALIDATOR_MANIFEST} is not valid JSON — ${error instanceof Error ? error.message : String(error)}`);
  }
  if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest)) {
    throw new Error(`${node.id}: ${VALIDATOR_MANIFEST} must contain an object.`);
  }
  if (manifest.schemaVersion !== VALIDATOR_MANIFEST_SCHEMA_VERSION) {
    throw new Error(`${node.id}: ${VALIDATOR_MANIFEST}.schemaVersion must be ${VALIDATOR_MANIFEST_SCHEMA_VERSION}.`);
  }
  let selected = manifest;
  if (Array.isArray(manifest.resources)) {
    const matches = manifest.resources.filter((entry) => entry && entry.kind === node.kind);
    if (matches.length !== 1) {
      throw new Error(`${node.id}: ${VALIDATOR_MANIFEST}.resources must declare exactly one ${node.kind} validator group.`);
    }
    selected = matches[0];
  }
  if (selected.scaffold !== SCAFFOLD_BY_KIND[node.kind]) {
    throw new Error(`${node.id}: ${VALIDATOR_MANIFEST}.scaffold must be ${SCAFFOLD_BY_KIND[node.kind]}.`);
  }
  if (selected.kind !== node.kind) {
    throw new Error(`${node.id}: ${VALIDATOR_MANIFEST}.kind must be ${node.kind}.`);
  }
  if (!Array.isArray(selected.validators) || !selected.validators.length) {
    throw new Error(`${node.id}: ${VALIDATOR_MANIFEST}.validators must be a non-empty array.`);
  }
  const validators = selected.validators.map((entry, index) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
      throw new Error(`${node.id}: ${VALIDATOR_MANIFEST}.validators[${index}] must be an object.`);
    }
    if (!VALIDATOR_RUNNERS.has(entry.runner)) {
      throw new Error(`${node.id}: validator ${index} runner must be node or tsx.`);
    }
    if (!VALIDATOR_MODES.has(entry.mode)) {
      throw new Error(`${node.id}: validator ${index} mode must be required or if_asset_present.`);
    }
    return {
      runner: entry.runner,
      script: normalizeRepoRelativePath({ value: entry.script, label: `${VALIDATOR_MANIFEST}.validators[${index}].script` }),
      assetPath: normalizeRepoRelativePath({ value: entry.assetPath, label: `${VALIDATOR_MANIFEST}.validators[${index}].assetPath` }),
      mode: entry.mode,
    };
  });
  const primaryAsset = PRIMARY_ASSET[node.kind];
  if (!validators.some((entry) => entry.assetPath === primaryAsset && entry.mode === 'required')) {
    throw new Error(`${node.id}: ${VALIDATOR_MANIFEST} must declare ${primaryAsset} as required.`);
  }
  return validators;
}

function validatorCommand({ runner, script, assetPath }) {
  return runner === 'node'
    ? { command: 'node', args: [script, assetPath] }
    : { command: 'npx', args: ['tsx', script, assetPath] };
}

/** Run marked validators, or the explicit legacy compatibility fallback. */
function runChildValidators({ repoRoot, node }) {
  const conventional = CHILD_VALIDATORS[node.kind];
  if (!conventional || !node.path) return [];
  const cwd = path.join(repoRoot, node.path);
  const issues = [];
  let configs;
  let marked = false;

  try {
    configs = readValidatorManifest({ cwd, node });
    marked = Boolean(configs);
  } catch (error) {
    return [error instanceof Error ? error.message : String(error)];
  }
  if (!configs) configs = conventional;

  for (const config of configs) {
    const assetExists = fs.existsSync(path.join(cwd, config.assetPath));
    if (marked && !fs.existsSync(path.join(cwd, config.script))) {
      issues.push(`${node.id}: marked child is missing declared validator ${config.script}`);
      continue;
    }
    if (config.mode === 'if_asset_present' && !assetExists) continue;
    if (marked && !assetExists) {
      issues.push(`${node.id}: marked child is missing required asset ${config.assetPath}`);
      continue;
    }
    if (!fs.existsSync(path.join(cwd, config.script))) {
      writeErr({
        message: `WARNING legacy validation skipped for ${node.id}: no ${config.script}. Add ${VALIDATOR_MANIFEST} to opt into required validation.`,
      });
      continue;
    }
    const invocation = validatorCommand(config);
    const result = spawnSync(invocation.command, invocation.args, { cwd, encoding: 'utf8' });
    if (result.status === 0) continue;
    const detail = (result.stderr || result.stdout || '').trim().split('\n').slice(0, 3).join(' ');
    issues.push(`${node.id}: ${config.script} failed — ${detail}`);
  }
  return issues;
}

/** A child must be a clean, independent checkout with the declared origin and branch. */
function childWorktreeIssues({ repoRoot, node }) {
  const cwd = path.join(repoRoot, node.path);
  const issues = [];
  if (!fs.existsSync(cwd)) return [`${node.path}: submodule is not checked out. Run git submodule update --init.`];
  if (!childIsOwnWorktree({ repoRoot, relPath: node.path })) {
    return [`${node.path}: is not an initialized child Git worktree (Git resolves it to the Persona root). Run git submodule update --init.`];
  }

  const head = submoduleHead({ repoRoot, relPath: node.path });
  if (!head) return [`${node.path}: no resolvable commit HEAD.`];

  // Uncommitted work would be pinned out of existence — the lock would point at a commit
  // that does not contain what the author is actually looking at.
  const dirty = git({ args: ['status', '--porcelain'], cwd, allowFail: true });
  if (dirty) {
    issues.push(`${node.path}: has uncommitted changes. Commit and push the child first.`);
  }
  const origin = remoteUrlFor({ repoRoot, relPath: node.path });
  if (!origin) {
    issues.push(`${node.path}: has no origin remote.`);
  } else if (!node.repositoryUrl || !sameRepositoryUrl({ left: origin, right: node.repositoryUrl })) {
    issues.push(`${node.path}: origin ${origin} does not match declared repository ${node.repositoryUrl || '(missing)'}.`);
  }
  const branchCheck = gitResult({ args: ['check-ref-format', '--branch', String(node.branch || '')], cwd });
  if (branchCheck.status !== 0) {
    issues.push(`${node.path}: declared branch ${JSON.stringify(node.branch || '')} is invalid.`);
  }
  return issues;
}

function validateLocal({ repoRoot, manifest, registry }) {
  const issues = [];
  for (const node of manifest.nodes) {
    if (node.unresolved) {
      issues.push(`${node.id}: ${node.unresolved.reason} (${node.unresolved.source})`);
    }
  }

  // Full Persona -> Workflow -> Pipeline -> List relationship and fingerprints, not just
  // each file's header — otherwise a local publish passes where server import rejects.
  issues.push(...validatePortableBundle({ repoRoot, registry }));
  if(fs.existsSync(path.join(repoRoot,'assets/chat-app.json'))) {
    const result=spawnSync(process.execPath,[path.join(__dirname,'validate-chat-app.js'),'assets/chat-app.json','assets/chat-config.json'],{cwd:repoRoot,encoding:'utf8'});
    if(result.status!==0)issues.push(result.stderr || result.error?.message || 'Chat App validation failed.');
  }


  for (const node of manifest.nodes) {
    if (node.unresolved || !node.path) continue;
    const worktreeIssues = childWorktreeIssues({ repoRoot, node });
    issues.push(...worktreeIssues);
    if (worktreeIssues.length) continue;

    const head = submoduleHead({ repoRoot, relPath: node.path });
    const remote = declaredBranchHead({ repoRoot, relPath: node.path, branch: node.branch });
    if (!remote) {
      issues.push(`${node.path}: declared origin branch refs/heads/${node.branch} is missing or unreachable.`);
      continue;
    }
    const onOrigin = childCommitIsOnDeclaredBranch({
      repoRoot,
      relPath: node.path,
      branch: node.branch,
      head,
      remote,
    });
    if (onOrigin === false) {
      issues.push(`${node.path}: child commit ${head} is not reachable from origin/${node.branch}. Push the declared branch first.`);
    } else if (onOrigin === null) {
      issues.push(`${node.path}: could not fetch origin/${node.branch} to confirm child commit ${head} is published.`);
    }
    if (node.kind === 'team_agent') {
      const definition = readChildJson({ repoRoot, relPath: node.path, assetPath: 'assets/team-agent.json' });
      if (!definition || !definition.endpoint || typeof definition.endpoint !== 'object') {
        issues.push(`${node.id}: missing assets/team-agent.json endpoint`);
      }
    }
    issues.push(...runChildValidators({ repoRoot, node }));
  }
  return issues;
}

function pinRegistry({ repoRoot, registry }) {
  return {
    schemaVersion: 2,
    updatedAt: Date.now(),
    repos: registry.repos.map((entry) => {
      const definition = readChildJson({ repoRoot, relPath: entry.path, assetPath: entry.assetPath });
      const revision = submoduleHead({ repoRoot, relPath: entry.path }) || entry.revision;
      return {
        ...entry,
        revision,
        definitionFingerprint: definition ? fingerprint({ value: definition }) : entry.definitionFingerprint,
      };
    }),
  };
}

/**
 * Paths the previous manifest generated that this one no longer owns.
 *
 * Only ever previously generated paths — a gitlink this workspace never wrote is left
 * alone, so an unrelated submodule is never unlinked.
 */
function collectStalePaths({ previous, manifest }) {
  const next = new Set(manifest.nodes.map((node) => node.path).filter(Boolean));
  return [...new Set(
    previous.nodes
      .map((node) => node.path)
      .filter((relPath) => Boolean(relPath) && !next.has(relPath)),
  )];
}

function rootWorktreeIssues({ repoRoot, allowedTrackedPaths = [] }) {
  const issues = [];
  const allowed = new Set(allowedTrackedPaths);
  const staged = git({ args: ['diff', '--cached', '--name-only'], cwd: repoRoot, allowFail: true });
  const unstaged = git({ args: ['diff', '--name-only'], cwd: repoRoot, allowFail: true })
    .split('\n')
    .filter(Boolean)
    .filter((relPath) => !allowed.has(relPath))
    .join('\n');
  const untrackedGenerated = git({
    args: ['ls-files', '--others', '--exclude-standard', '--', ...GENERATED_FILES, '.gitmodules'],
    cwd: repoRoot,
    allowFail: true,
  });
  if (staged) issues.push(`the Persona root has staged changes:\n${staged}`);
  if (unstaged) issues.push(`the Persona root has tracked unstaged changes:\n${unstaged}`);
  if (untrackedGenerated) issues.push(`generated output paths already contain untracked files:\n${untrackedGenerated}`);
  return issues;
}

function gitmodulesEntries({ repoRoot }) {
  const gitmodulesPath = path.join(repoRoot, '.gitmodules');
  if (!fs.existsSync(gitmodulesPath)) return [];
  const result = gitResult({
    args: ['config', '-f', '.gitmodules', '--get-regexp', '^submodule\\..*\\.path$'],
    cwd: repoRoot,
  });
  if (result.status !== 0 && result.status !== 1) {
    throw new Error((result.stderr || '').trim() || 'Could not read .gitmodules.');
  }
  return (result.stdout || '').trim().split('\n').filter(Boolean).map((line) => {
    const separator = line.search(/\s/);
    const key = separator < 0 ? line : line.slice(0, separator);
    const modulePath = separator < 0 ? '' : line.slice(separator).trim();
    const section = key.replace(/\.path$/, '');
    const url = git({ args: ['config', '-f', '.gitmodules', '--get', `${section}.url`], cwd: repoRoot, allowFail: true });
    return { section, path: modulePath, url };
  });
}

function gitEntryMode({ repoRoot, source, relPath }) {
  const output = source === 'tree'
    ? git({ args: ['ls-tree', 'HEAD', '--', relPath], cwd: repoRoot, allowFail: true })
    : git({ args: ['ls-files', '--stage', '--', relPath], cwd: repoRoot, allowFail: true });
  const match = output.match(/^(\d{6})\s/);
  return match ? match[1] : null;
}

function validateStaleCandidates({ repoRoot, previous, manifest, registry }) {
  const nextPaths = new Set(manifest.nodes.map((node) => node.path).filter(Boolean));
  const portablePaths = new Set(registry.repos.map((entry) => entry.path));
  const moduleEntries = gitmodulesEntries({ repoRoot });
  const candidates = [];
  const issues = [];
  const seen = new Set();

  for (const node of previous.nodes) {
    if (!node || !node.path || nextPaths.has(node.path)) continue;
    if (seen.has(node.path)) {
      issues.push(`${node.path}: appears more than once in the prior generated workspace.`);
      continue;
    }
    seen.add(node.path);
    let relPath;
    try {
      relPath = normalizeRepoRelativePath({ value: node.path, label: `${node.id || 'stale node'}.path` });
    } catch (error) {
      issues.push(error instanceof Error ? error.message : String(error));
      continue;
    }
    const expectedPrefix = KIND_DIRECTORY[node.kind] ? `references/${KIND_DIRECTORY[node.kind]}/` : null;
    const pathParts = relPath.split('/');
    if (!expectedPrefix || !relPath.startsWith(expectedPrefix) || pathParts.length !== 3 || !pathParts[2]) {
      issues.push(`${relPath}: stale node kind/path does not match a direct references/<kind>/<slug> path.`);
      continue;
    }
    if (portablePaths.has(relPath) || nextPaths.has(relPath)) {
      issues.push(`${relPath}: is still owned by the current graph or portable registry.`);
      continue;
    }
    if (gitEntryMode({ repoRoot, source: 'tree', relPath }) !== '160000') {
      issues.push(`${relPath}: current Git tree entry is not a submodule gitlink (mode 160000).`);
      continue;
    }
    if (gitEntryMode({ repoRoot, source: 'index', relPath }) !== '160000') {
      issues.push(`${relPath}: current Git index entry is not a submodule gitlink (mode 160000).`);
      continue;
    }
    const matches = moduleEntries.filter((entry) => entry.path === relPath);
    if (matches.length !== 1) {
      issues.push(`${relPath}: expected exactly one .gitmodules entry found by path, found ${matches.length}.`);
      continue;
    }
    if (!node.repositoryUrl || !matches[0].url || !sameRepositoryUrl({ left: node.repositoryUrl, right: matches[0].url })) {
      issues.push(`${relPath}: .gitmodules URL does not match the prior generated workspace repository URL.`);
      continue;
    }
    candidates.push({ node, relPath, section: matches[0].section });
  }

  if (issues.length) {
    throw new Error(`Prune validation failed; no links were changed:\n${issues.join('\n')}`);
  }
  return candidates;
}

function buildReadme({ registry, manifest }) {
  const portableRows = registry.repos
    .map((entry) => `| ${entry.kind} *(portable)* | \`${entry.resourceKey}\` | ${entry.displayName} | \`${entry.path}\` | \`${entry.branch}\` |`)
    .join('\n');
  const extraRows = manifest.nodes
    .filter((node) => !node.portable || !registry.repos.some((entry) => entry.resourceKey === node.portable.resourceKey))
    .map((node) => `| ${node.kind} | ${node.displayName} | \`${node.path || '—'}\` | ${node.unresolved ? `**${node.unresolved.reason}**` : 'ok'} |`)
    .join('\n');
  return `# AI Persona References

This folder is a **depth-1 composition workspace**. Every linked repository is a git
submodule of this Persona — never a submodule of another submodule.

\`\`\`bash
git submodule update --init
\`\`\`

## Portable bundle (\`registry.json\`)

Import materializes one Workflow per distinct command workflowRef and every registered Pipeline and domain List.

| Kind | Resource key | Name | Path | Branch |
|---|---|---|---|---|
${portableRows}

## Authoring graph (\`workspace.json\`)

Generated. Extra workflows and team agents are same-environment authoring only.

| Kind | Name | Path | State |
|---|---|---|---|
${extraRows || '| — | _No extra repositories._ | | |'}

Commit children first, then publish.
`;
}

const GENERATED_FILES = ['references/registry.json', 'references/workspace.json', 'references/README.md'];

/**
 * Snapshot every file publish may write, plus `.gitmodules`, so a failure anywhere — most
 * importantly a rejected `git commit` — can restore the tree exactly.
 */
function snapshotGenerated({ repoRoot }) {
  const files = new Map();
  for (const relPath of [...GENERATED_FILES, '.gitmodules']) {
    const abs = path.join(repoRoot, relPath);
    files.set(relPath, fs.existsSync(abs) ? fs.readFileSync(abs, 'utf8') : null);
  }
  return { head: git({ args: ['rev-parse', 'HEAD'], cwd: repoRoot }), files };
}

function restoreGenerated({ repoRoot, snapshot }) {
  git({ args: ['reset', '-q', '--mixed', snapshot.head], cwd: repoRoot, allowFail: true });
  for (const [relPath, content] of snapshot.files) {
    const abs = path.join(repoRoot, relPath);
    if (content === null) {
      fs.rmSync(abs, { force: true });
    } else {
      fs.writeFileSync(abs, content);
    }
  }
}

/** Remove only validated Git metadata. Physical child checkouts are never deleted. */
function runPrune({ repoRoot, registry, previous, manifest }) {
  const dirtyIssues = rootWorktreeIssues({ repoRoot });
  if (dirtyIssues.length) {
    throw new Error(`Prune aborted because ${dirtyIssues.join('\nand ')}`);
  }
  const candidates = validateStaleCandidates({ repoRoot, previous, manifest, registry });
  if (!candidates.length) {
    writeOut({ message: 'Nothing to prune.' });
    return;
  }

  const snapshot = snapshotGenerated({ repoRoot });
  const readme = buildReadme({ registry, manifest });
  try {
    for (const candidate of candidates) {
      gitOrThrow({ args: ['update-index', '--force-remove', '--', candidate.relPath], cwd: repoRoot });
      gitOrThrow({ args: ['config', '-f', '.gitmodules', '--remove-section', candidate.section], cwd: repoRoot });
    }
    fs.writeFileSync(path.join(repoRoot, 'references', 'workspace.json'), `${JSON.stringify(manifest, null, 2)}\n`);
    fs.writeFileSync(path.join(repoRoot, 'references', 'README.md'), readme);
    gitOrThrow({ args: ['add', 'references/workspace.json', 'references/README.md', '.gitmodules'], cwd: repoRoot });
    gitOrThrow({ args: ['commit', '-m', 'Prune stale persona workspace links'], cwd: repoRoot });
  } catch (error) {
    restoreGenerated({ repoRoot, snapshot });
    throw new Error(`Prune failed: ${error instanceof Error ? error.message : String(error)}\nHEAD, index, and generated files were restored.`);
  }
  for (const candidate of candidates) {
    writeOut({ message: `pruned gitlink  ${candidate.relPath}  (physical checkout preserved)` });
  }
}

function main() {
  const command = (process.argv[2] || 'status').trim();
  if (!['status', 'validate', 'publish', 'prune'].includes(command)) {
    die({ message: 'Usage: node scripts/publish-workspace.js <status|validate|publish|prune>' });
  }
  const repoRoot = findRepoRoot({ startDir: process.cwd() });
  const registry = parseRegistry({ repoRoot });
  const previous = readPreviousManifest({ repoRoot });
  const manifest = buildLocalManifest({ repoRoot, registry });

  if (command === 'status') {
    writeOut({ message: `Workspace nodes: ${manifest.nodes.length}` });
    writeOut({ message: `Unresolved: ${manifest.nodes.filter((node) => node.unresolved).length}` });
    for (const node of manifest.nodes) {
      const head = node.path ? submoduleHead({ repoRoot, relPath: node.path }) : '';
      // Being behind origin is the normal state of a pin, so report it without implying
      // anything is wrong — the author decides whether to advance it.
      const remote = node.path ? declaredBranchHead({ repoRoot, relPath: node.path, branch: node.branch }) : null;
      const drift = head && remote && head !== remote ? `  (origin is at ${remote})` : '';
      writeOut({
        message: `${node.unresolved ? 'UNRESOLVED' : 'ok'}  ${node.id}  ${node.path || '—'}  ${head || (node.unresolved && node.unresolved.reason) || ''}${drift}`,
      });
    }
    for (const stale of collectStalePaths({ previous, manifest })) {
      writeOut({ message: `stale  ${stale}  (run prune to unlink Git metadata; checkout will be preserved)` });
    }
    return;
  }

  if (command === 'prune') {
    runPrune({ repoRoot, registry, previous, manifest });
    return;
  }

  const stalePaths = collectStalePaths({ previous, manifest });
  const staleIssues = stalePaths.map(
    (stale) => `${stale}: stale managed gitlink; run node scripts/publish-workspace.js prune before ${command}.`,
  );

  if (command === 'publish') {
    // Managed gitlinks are the intended publish inputs. Their child worktrees are checked
    // separately; all other tracked Persona-root edits remain forbidden.
    const dirtyIssues = rootWorktreeIssues({
      repoRoot,
      allowedTrackedPaths: manifest.nodes.map((node) => node.path).filter(Boolean),
    });
    if (dirtyIssues.length) {
      die({ message: `Publish aborted because ${dirtyIssues.join('\nand ')}` });
    }
  }

  // Validate the exact proposed lock, not yesterday's fingerprints against today's
  // committed child files. No repository state changes before all gates pass.
  const pinnedRegistry = command === 'publish' ? pinRegistry({ repoRoot, registry }) : undefined;
  const issues = [...staleIssues, ...validateLocal({ repoRoot, manifest, registry: pinnedRegistry })];

  if (command === 'validate') {
    if (issues.length) {
      issues.forEach((issue) => writeErr({ message: issue }));
      process.exit(1);
    }
    writeOut({ message: 'Workspace is valid. Child commits are on origin. Persona root is unchanged.' });
    return;
  }

  if (issues.length) {
    issues.forEach((issue) => writeErr({ message: issue }));
    die({ message: 'Publish aborted. The currently published persona root was not modified.' });
  }

  // Everything below is planned first, then written. Any failure restores the snapshot so
  // HEAD, the index, and the working tree are exactly as they were.
  const readme = buildReadme({ registry: pinnedRegistry, manifest });
  const snapshot = snapshotGenerated({ repoRoot });

  try {
    fs.writeFileSync(path.join(repoRoot, 'references', 'registry.json'), `${JSON.stringify(pinnedRegistry, null, 2)}\n`);
    fs.writeFileSync(path.join(repoRoot, 'references', 'workspace.json'), `${JSON.stringify(manifest, null, 2)}\n`);
    fs.writeFileSync(path.join(repoRoot, 'references', 'README.md'), readme);
    gitOrThrow({ args: ['add', ...GENERATED_FILES], cwd: repoRoot });

    for (const node of manifest.nodes) {
      if (!node.path || !node.revision) continue;
      gitOrThrow({ args: ['update-index', '--add', '--cacheinfo', `160000,${node.revision},${node.path}`], cwd: repoRoot });
    }

    gitOrThrow({ args: ['commit', '-m', 'Publish persona composition workspace'], cwd: repoRoot });
  } catch (error) {
    restoreGenerated({ repoRoot, snapshot });
    die({
      message: `Publish failed: ${error instanceof Error ? error.message : String(error)}\nThe persona root, index, and generated files were restored.`,
    });
  }

  writeOut({ message: `Published workspace lock ${git({ args: ['rev-parse', 'HEAD'], cwd: repoRoot })}` });
}

try {
  main();
} catch (error) {
  die({ message: error instanceof Error ? error.message : String(error) });
}
