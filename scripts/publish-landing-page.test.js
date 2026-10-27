const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { plan, stable } = require('./publish-landing-page');
test('landing-only publication preserves unrelated pins and rejects dirty or mismatched input', () => {
  const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'landing-publish-test-')));
  const rel = 'references/landing-pages/example', child = path.join(root, rel);
  const git = (cwd, ...args) => execFileSync('git', args, { cwd, stdio: 'pipe' });
  const write = (file, data) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, typeof data === 'string' ? data : JSON.stringify(data)); };
  try {
    fs.mkdirSync(child, { recursive: true });
    for (const dir of [root, child]) { git(dir, 'init', '-b', 'main'); git(dir, 'config', 'user.email', 'fixture@example.test'); git(dir, 'config', 'user.name', 'Fixture'); git(dir, 'config', 'commit.gpgsign', 'false'); }
    const page = { localization: { translation: { generatedTranslations: [{ assetPath: 'assets/landing-page.ar.json' }] } } };
    write(path.join(root, 'assets/chat-config.json'), { schemaVersion: 1, publishedConfig: { landingPageRef: { resourceKey: 'landing_page.fixture' }, landingPage: page, runtimeId: 'preserve' } });
    write(path.join(child, 'assets/landing-page.json'), { resourceKey: 'landing_page.fixture', landingPage: page });
    for (const dir of [root, child]) write(path.join(dir, 'assets/landing-page.ar.json'), { text: 'اختبار' });
    write(path.join(child, 'scripts/validate-landing-page.js'), 'process.exit(0);');
    git(child, 'add', '.'); git(child, 'commit', '-m', 'fixture'); git(child, 'remote', 'add', 'origin', 'https://example.test/fixture.git');
    write(path.join(root, '.gitmodules'), '[submodule "example"]\npath = '+rel+'\nurl = https://example.test/fixture.git\n');
    const other = { id: 'workflow:existing', kind: 'workflow', revision: 'unchanged' };
    const edge = { from: 'persona', to: 'workflow:existing' };
    write(path.join(root, 'references/workspace.json'), { schemaVersion: 1, nodes: [other], edges: [edge] });
    const original = fs.readFileSync(path.join(root, 'assets/chat-config.json'), 'utf8');
    const result = plan(root, rel, false);
    assert.deepEqual(result.next.nodes[0], other); assert.deepEqual(result.next.edges, [edge]);
    assert.equal(fs.readFileSync(path.join(root, 'assets/chat-config.json'), 'utf8'), original);
    assert.match(result.next.nodes[1].portable.definitionFingerprint, /^[a-f0-9]{64}$/);
    assert.equal(result.revision, git(child, 'rev-parse', 'HEAD').toString().trim());
    assert.throws(() => plan(root, '../escape', false), /direct landing/);
    write(path.join(child, 'unexpected.txt'), 'dirty'); assert.throws(() => plan(root, rel, false), /Commit and push/); fs.unlinkSync(path.join(child, 'unexpected.txt'));
    write(path.join(root, 'assets/landing-page.ar.json'), { text: 'different' }); assert.throws(() => plan(root, rel, false), /Locale mirror/);
    assert.equal(stable({ z: 1, a: 2 }), stable({ a: 2, z: 1 }));
  } finally { fs.rmSync(root, { recursive: true }); }
});
