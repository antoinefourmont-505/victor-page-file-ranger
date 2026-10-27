#!/usr/bin/env node
'use strict';
/** Mirror a Persona parent's live landing page back into its bound landing-page child.
 * App saves (the publish modal's landing and calculator editors) update the parent's
 * assets/chat-config.json, never the child. publish-landing-page.js requires both to match,
 * so run this first. It never commits or pushes: review the child diff, commit and push the
 * child, then publish the parent pin.
 */
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const stable = value => Array.isArray(value) ? `[${value.map(stable).join(',')}]`
  : value && typeof value === 'object' ? `{${Object.entries(value).filter(([, v]) => v !== undefined).sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => `${JSON.stringify(k)}:${stable(v)}`).join(',')}}` : JSON.stringify(value);
const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const isRecord = value => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
const git = (cwd, args) => {
  const result = spawnSync('git', ['-c', 'core.fsmonitor=false', ...args], { cwd, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
  if (result.status) throw new Error(result.stderr.trim() || `Git command failed: ${args[0]}`);
  return result.stdout.trim();
};
function plan(root, childPath) {
  if (!/^references\/landing-pages\/[a-z0-9][a-z0-9-]*$/.test(childPath)) throw new Error('A direct landing-page submodule path is required.');
  const child = path.join(root, childPath);
  if (!fs.existsSync(path.join(child, 'assets/landing-page.json'))) throw new Error('The child has no assets/landing-page.json.');
  if (git(child, ['status', '--porcelain'])) throw new Error('Commit or stash child changes before syncing.');
  const config = read(path.join(root, 'assets/chat-config.json'));
  const definition = read(path.join(child, 'assets/landing-page.json'));
  const resourceKey = config.publishedConfig?.landingPageRef?.resourceKey;
  if (!resourceKey || definition.resourceKey !== resourceKey) throw new Error('Parent/child landing resource keys do not match.');
  const landingPage = config.publishedConfig.landingPage;
  if (!isRecord(landingPage)) throw new Error('The parent has no landing page to mirror.');
  const changes = [];
  if (stable(definition.landingPage) !== stable(landingPage)) {
    changes.push({ file: 'assets/landing-page.json', content: `${JSON.stringify({ ...definition, landingPage }, null, 2)}\n` });
  }
  for (const entry of landingPage.localization?.translation?.generatedTranslations || []) {
    if (!entry.assetPath) continue;
    if (!/^assets\/(?:markets\/[a-z0-9-]+\/)?landing-page\.[a-zA-Z0-9.-]+\.json$/.test(entry.assetPath)) throw new Error('Invalid split locale asset path.');
    const parentAsset = path.join(root, entry.assetPath);
    if (!fs.existsSync(parentAsset)) throw new Error(`Parent locale asset is missing: ${entry.assetPath}`);
    const bytes = fs.readFileSync(parentAsset);
    const childAsset = path.join(child, entry.assetPath);
    if (!fs.existsSync(childAsset) || !fs.readFileSync(childAsset).equals(bytes)) changes.push({ file: entry.assetPath, content: bytes });
  }
  return { child, childPath, changes };
}
function apply(proposed) {
  for (const change of proposed.changes) {
    const target = path.join(proposed.child, change.file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, change.content);
  }
}
function main() {
  const [command, childPath] = process.argv.slice(2);
  if (!['check', 'apply'].includes(command)) throw new Error('Usage: sync-landing-child.js <check|apply> references/landing-pages/<child>');
  const root = git(process.cwd(), ['rev-parse', '--show-toplevel']);
  const proposed = plan(root, childPath);
  if (!proposed.changes.length) { console.log('Child already matches the parent landing page and locale mirrors.'); return; }
  if (command === 'check') {
    console.log(`Child differs from the parent: ${proposed.changes.map(change => change.file).join(', ')}`);
    process.exitCode = 1;
    return;
  }
  apply(proposed);
  const result = spawnSync(process.execPath, ['scripts/validate-landing-page.js', 'assets/landing-page.json', path.join(root, 'assets/chat-config.json')], { cwd: proposed.child, encoding: 'utf8', maxBuffer: 4 * 1024 * 1024 });
  if (result.status) throw new Error(`Mirrored, but the child landing page failed validation:\n${result.stderr || result.stdout}`);
  console.log(`Mirrored ${proposed.changes.length} file(s) into ${childPath}. Review, commit and push the child, then run publish-landing-page.js.`);
}
module.exports = { plan, apply, stable };
if (require.main === module) { try { main(); } catch (error) { console.error(error.message); process.exitCode = 1; } }
