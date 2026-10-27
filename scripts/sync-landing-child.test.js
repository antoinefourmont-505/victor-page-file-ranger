const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { plan, apply } = require('./sync-landing-child');
test('mirrors the parent landing page and locale assets into a clean, matching child without committing', () => {
  const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'landing-child-sync-test-')));
  const rel = 'references/landing-pages/example', child = path.join(root, rel);
  const git = (cwd, ...args) => execFileSync('git', args, { cwd, stdio: 'pipe' });
  const write = (file, data) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, typeof data === 'string' ? data : JSON.stringify(data, null, 2)); };
  try {
    fs.mkdirSync(child, { recursive: true });
    git(child, 'init', '-b', 'main'); git(child, 'config', 'user.email', 'fixture@example.test'); git(child, 'config', 'user.name', 'Fixture'); git(child, 'config', 'commit.gpgsign', 'false');
    const manifest = { translation: { generatedTranslations: [{ language: 'nl', assetPath: 'assets/landing-page.nl.json' }] } };
    const saved = { headline: 'KAI', groceryTwin: { homeRoiCalculator: { heading: 'Saved in the app' } }, localization: manifest };
    write(path.join(root, 'assets/chat-config.json'), { schemaVersion: 2, publishedConfig: { landingPageRef: { resourceKey: 'landing_page.example' }, landingPage: saved } });
    write(path.join(root, 'assets/landing-page.nl.json'), { language: 'nl', text: 'nieuw' });
    const envelope = { schemaVersion: 2, resourceKey: 'landing_page.example', runtimeDataPolicy: 'definitions_only' };
    write(path.join(child, 'assets/landing-page.json'), { ...envelope, landingPage: { ...saved, groceryTwin: { homeRoiCalculator: { heading: 'Older child copy' } } } });
    write(path.join(child, 'assets/landing-page.nl.json'), { language: 'nl', text: 'oud' });
    git(child, 'add', '.'); git(child, 'commit', '-m', 'fixture');
    const head = git(child, 'rev-parse', 'HEAD').toString();

    const proposed = plan(root, rel);
    assert.deepEqual(proposed.changes.map(change => change.file), ['assets/landing-page.json', 'assets/landing-page.nl.json']);
    apply(proposed);
    const mirrored = JSON.parse(fs.readFileSync(path.join(child, 'assets/landing-page.json'), 'utf8'));
    assert.deepEqual(Object.keys(mirrored), ['schemaVersion', 'resourceKey', 'runtimeDataPolicy', 'landingPage']);
    assert.deepEqual(mirrored.landingPage, saved);
    assert.ok(fs.readFileSync(path.join(child, 'assets/landing-page.nl.json')).equals(fs.readFileSync(path.join(root, 'assets/landing-page.nl.json'))));
    assert.equal(git(child, 'rev-parse', 'HEAD').toString(), head);

    assert.throws(() => plan(root, rel), /Commit or stash/);
    git(child, 'add', '.'); git(child, 'commit', '-m', 'mirror');
    assert.deepEqual(plan(root, rel).changes, []);
    assert.throws(() => plan(root, '../escape'), /direct landing/);
    write(path.join(root, 'assets/chat-config.json'), { publishedConfig: { landingPageRef: { resourceKey: 'landing_page.other' }, landingPage: saved } });
    assert.throws(() => plan(root, rel), /resource keys/);
  } finally { fs.rmSync(root, { recursive: true }); }
});
