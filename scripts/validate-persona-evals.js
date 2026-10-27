#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const root = process.cwd();
const target = path.resolve(root, process.argv[2] || 'assets/persona-evals.json');
if (!target.startsWith(`${root}${path.sep}`) && target !== root) {
  console.error('persona eval path must remain inside the repository');
  process.exit(1);
}
let value;
try {
  value = JSON.parse(fs.readFileSync(target, 'utf8'));
} catch (error) {
  console.error(`invalid persona eval JSON: ${error.message}`);
  process.exit(1);
}
const errors = [];
const warnings = [];
if (!value || typeof value !== 'object' || Array.isArray(value)) errors.push('root must be an object');
if (![1, 2].includes(value.schemaVersion)) errors.push('schemaVersion must be 1 or 2');
if (value.schemaVersion === 2) {
  if (!Array.isArray(value.skills)) errors.push('v2 skills must be an array');
  if (!value.persona || !Array.isArray(value.persona.requiredSkillIds)) errors.push('v2 persona must reference its required skills');
  if (!Array.isArray(value.references) || !value.evaluator) errors.push('v2 requires references and evaluator configuration');
  warnings.push('This checks document shape only. Use the authoritative server validation and owner approval actions before preparing a release.');
}
if (!Array.isArray(value.requirements)) errors.push('requirements must be an array');
if (!Array.isArray(value.suites)) errors.push('suites must be an array');
const requirementIds = new Set();
for (const [index, requirement] of (value.requirements || []).entries()) {
  if (!requirement || typeof requirement !== 'object') { errors.push(`requirements[${index}] must be an object`); continue; }
  if (typeof requirement.id !== 'string' || !requirement.id.trim()) errors.push(`requirements[${index}].id is required`);
  else if (requirementIds.has(requirement.id)) errors.push(`duplicate requirement id ${requirement.id}`);
  else requirementIds.add(requirement.id);
  if (typeof requirement.description !== 'string' || !requirement.description.trim()) errors.push(`requirements[${index}].description is required`);
  if (!Array.isArray(requirement.implementedBy)) errors.push(`requirements[${index}].implementedBy must be an array`);
  if (!Array.isArray(requirement.verifiedBy)) errors.push(`requirements[${index}].verifiedBy must be an array`);
  for (const [locatorIndex, locator] of (requirement.implementedBy || []).entries()) {
    if (!locator || typeof locator !== 'object' || typeof locator.kind !== 'string' || typeof locator.resourceRef !== 'string') {
      errors.push(`requirements[${index}].implementedBy[${locatorIndex}] requires kind and resourceRef`);
    }
  }
}
const caseIds = new Set();
for (const [suiteIndex, suite] of (value.suites || []).entries()) {
  if (!suite || typeof suite !== 'object') { errors.push(`suites[${suiteIndex}] must be an object`); continue; }
  if (typeof suite.id !== 'string' || !suite.id.trim()) errors.push(`suites[${suiteIndex}].id is required`);
  if (typeof suite.requiredForProduction !== 'boolean') errors.push(`suites[${suiteIndex}].requiredForProduction must be boolean`);
  if (!Array.isArray(suite.cases)) errors.push(`suites[${suiteIndex}].cases must be an array`);
  for (const [caseIndex, testCase] of (suite.cases || []).entries()) {
    if (!testCase || typeof testCase !== 'object') { errors.push(`suites[${suiteIndex}].cases[${caseIndex}] must be an object`); continue; }
    if (typeof testCase.id !== 'string' || !testCase.id.trim()) errors.push(`suites[${suiteIndex}].cases[${caseIndex}].id is required`);
    else if (caseIds.has(testCase.id)) errors.push(`duplicate case id ${testCase.id}`);
    else caseIds.add(testCase.id);
    if (testCase.runAs !== undefined && testCase.runAs !== 'subscriber' && testCase.runAs !== 'author') {
      errors.push(`case ${testCase.id || caseIndex} runAs must be subscriber or author`);
    } else if (testCase.runAs === undefined) {
      warnings.push(`case ${testCase.id || caseIndex} has no runAs and will use the legacy author identity`);
    }
    if (!Array.isArray(testCase.requirementIds)) errors.push(`case ${testCase.id || caseIndex} requirementIds must be an array`);
    if (!['golden', 'incomplete_input', 'edge', 'adversarial', 'approval', 'rejection', 'failure'].includes(testCase.category)) errors.push(`case ${testCase.id || caseIndex} category must match the runtime eval contract`);
    if (!Array.isArray(testCase.assertions)) errors.push(`case ${testCase.id || caseIndex} assertions must be an array`);
    for (const assertion of (testCase.assertions || [])) {
      if (assertion?.type === 'rubric' && assertion.blocking === true) errors.push(`case ${testCase.id}: advisory rubric assertions cannot authorize release`);
      if (value.schemaVersion === 2 && (!assertion?.id || !assertion?.requirementId)) errors.push(`case ${testCase.id}: v2 criteria require stable IDs and requirement references`);
    }
  }
}
try {
  const chatConfig = JSON.parse(fs.readFileSync(path.resolve(root, 'assets/chat-config.json'), 'utf8'));
  const quality = chatConfig?.publishedConfig?.qualityControlConfig;
  const subscriberEnabled = quality?.enabled === true && quality?.subscriberSimulationEnabled === true;
  const hasSubscriberCases = (value.suites || []).some((suite) =>
    (suite?.cases || []).some((testCase) => testCase?.runAs === 'subscriber'));
  if (hasSubscriberCases && !subscriberEnabled) {
    warnings.push('subscriber cases are stored but cannot run until both Quality control and subscriber simulation are enabled');
  }
} catch {
  warnings.push('assets/chat-config.json could not be read; subscriber feature compatibility was not checked');
}
if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}
if (warnings.length) console.warn(warnings.map((warning) => `warning: ${warning}`).join('\n'));
console.log(`persona eval contract valid: ${value.requirements.length} requirements, ${caseIds.size} cases`);
