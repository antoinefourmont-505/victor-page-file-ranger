#!/usr/bin/env node
'use strict';
/** Publish an already-bound landing child without migrating a legacy runtime export.
 * This is deliberately NOT a portable-workflow publication or validation bypass:
 * registry entries, non-landing nodes, command bindings, and local runtime IDs remain unchanged.
 */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');
const stable = value => Array.isArray(value) ? `[${value.map(stable).join(',')}]`
  : value && typeof value === 'object' ? `{${Object.entries(value).filter(([, v]) => v !== undefined).sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => `${JSON.stringify(k)}:${stable(v)}`).join(',')}}` : JSON.stringify(value);
const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const git = (cwd, args) => {
  const result = spawnSync('git', ['-c', 'core.fsmonitor=false', ...args], { cwd, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
  if (result.status) throw new Error(result.stderr.trim() || `Git command failed: ${args[0]}`);
  return result.stdout.trim();
};
const remoteKey = value => value.trim().replace(/^git@([^:]+):/, 'https://$1/').replace(/\.git$/, '').replace(/\/$/, '');
function plan(root, childPath, verifyRemote = true) {
  if (!/^references\/landing-pages\/[a-z0-9][a-z0-9-]*$/.test(childPath)) throw new Error('A direct landing-page submodule path is required.');
  const child = path.join(root, childPath);
  if (fs.realpathSync(child) !== child || git(child, ['rev-parse', '--show-toplevel']) !== child) throw new Error('Child must be its own non-symlink Git worktree.');
  if (git(child, ['status', '--porcelain'])) throw new Error('Commit and push the landing child first.');
  const config = read(path.join(root, 'assets/chat-config.json'));
  const definition = read(path.join(child, 'assets/landing-page.json'));
  const resourceKey = config.publishedConfig?.landingPageRef?.resourceKey;
  if (!resourceKey || definition.resourceKey !== resourceKey) throw new Error('Parent/child landing resource keys do not match.');
  if (stable(config.publishedConfig.landingPage) !== stable(definition.landingPage)) throw new Error('Parent landing copy differs from the child.');
  const result = spawnSync(process.execPath, ['scripts/validate-landing-page.js', 'assets/landing-page.json', path.join(root, 'assets/chat-config.json')], { cwd: child, encoding: 'utf8', maxBuffer: 4 * 1024 * 1024 });
  if (result.status) throw new Error(result.stderr || result.stdout || 'Landing validation failed.');
  for (const entry of definition.landingPage.localization?.translation?.generatedTranslations || []) {
    if (!entry.assetPath || !/^assets\/(?:markets\/[a-z0-9-]+\/)?landing-page\.[a-zA-Z0-9.-]+\.json$/.test(entry.assetPath)) throw new Error('Invalid split locale asset path.');
    if (!fs.readFileSync(path.join(child, entry.assetPath)).equals(fs.readFileSync(path.join(root, entry.assetPath)))) throw new Error(`Locale mirror differs: ${entry.assetPath}`);
  }
  const modules = git(root, ['config', '-f', '.gitmodules', '--get-regexp', '^submodule\\..*\\.path$']).split('\n');
  const binding = modules.filter(line => line.slice(line.indexOf(' ') + 1) === childPath);
  if (binding.length !== 1) throw new Error('Exactly one existing Git submodule binding is required.');
  const section = binding[0].slice(0, binding[0].indexOf(' ')).replace(/\.path$/, '');
  const declared = git(root, ['config', '-f', '.gitmodules', '--get', `${section}.url`]);
  const actual = git(child, ['remote', 'get-url', 'origin']);
  if (remoteKey(declared) !== remoteKey(actual)) throw new Error('Child origin differs from the established binding.');
  const file = path.join(root, 'references/workspace.json');
  const manifest = fs.existsSync(file) ? read(file) : { schemaVersion: 1, nodes: [], edges: [] };
  if (manifest.schemaVersion !== 1 || !Array.isArray(manifest.nodes) || !Array.isArray(manifest.edges)) throw new Error('Unsupported workspace manifest.');
  const matches = manifest.nodes.filter(n => n.id === `landing_page:${resourceKey}` || n.path === childPath);
  if (matches.length > 1) throw new Error('Ambiguous landing binding.');
  const prior = matches[0];
  if (prior && (prior.kind !== 'landing_page' || prior.path !== childPath || remoteKey(prior.repositoryUrl) !== remoteKey(actual))) throw new Error('Existing workspace binding differs from the child.');
  const branch = prior?.branch || git(child, ['branch', '--show-current']);
  if (!branch || !/^[A-Za-z0-9/_-]+$/.test(branch)) throw new Error('An explicit safe branch is required.');
  const revision = git(child, ['rev-parse', 'HEAD']);
  if (verifyRemote) {
    git(child, ['fetch', '-q', 'origin', `refs/heads/${branch}`]);
    git(child, ['merge-base', '--is-ancestor', revision, 'FETCH_HEAD']);
  }
  const node = { ...prior, id: `landing_page:${resourceKey}`, kind: 'landing_page', displayName: prior?.displayName || definition.displayName || 'Landing page', path: childPath,
    repositoryUrl: prior?.repositoryUrl || actual, branch, revision, assetPaths: ['assets/landing-page.json'],
    portable: { resourceKey, assetPath: 'assets/landing-page.json', definitionFingerprint: crypto.createHash('sha256').update(stable(definition)).digest('hex') } };
  const next = { ...manifest, updatedAt: Date.now(), nodes: prior ? manifest.nodes.map(n => n === prior ? node : n) : [...manifest.nodes, node] };
  return { file, next, revision, childPath, prior: fs.existsSync(file) ? fs.readFileSync(file) : null };
}
function main() {
  const [command, childPath] = process.argv.slice(2);
  if (!['validate', 'publish'].includes(command)) throw new Error('Usage: publish-landing-page.js <validate|publish> references/landing-pages/<child>');
  const root = git(process.cwd(), ['rev-parse', '--show-toplevel']);
  const proposed = plan(root, childPath);
  if (command === 'validate') { console.log('Landing child, exact commit, remote, schema and locale mirrors valid; other workflow bindings unchanged.'); return; }
  if (git(root, ['diff', '--cached', '--name-only'])) throw new Error('Parent index must be empty before publishing.');
  if (git(root, ['diff', '--name-only', '--ignore-submodules=all'])) throw new Error('Commit parent content changes before publishing.');
  // Do not stage or advance unrelated gitlinks, registry rows, commands, or workflow fingerprints.
  fs.writeFileSync(proposed.file, JSON.stringify(proposed.next, null, 2) + '\n');
  try {
    git(root, ['add', '--', 'references/workspace.json', childPath]);
    git(root, ['commit', '-m', 'Publish validated landing-page child pin']);
  } catch (error) {
    git(root, ['restore', '--staged', '--', 'references/workspace.json', childPath]);
    if (proposed.prior) fs.writeFileSync(proposed.file, proposed.prior);
    else fs.unlinkSync(proposed.file);
    throw error;
  }
  console.log(`Published landing child ${proposed.revision}; unrelated workspace bindings preserved.`);
}
module.exports = { plan, stable };
if (require.main === module) { try { main(); } catch (error) { console.error(error.message); process.exitCode = 1; } }
