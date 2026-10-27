const fs = require('fs');
const path = require('path');
const { validatePersonaPersonalization, personalizationAssetRoot } = require('./persona-personalization-model.cjs');
const { validateChatAppConfig, validateChatAppDependencies } = require('./chat-app-model.cjs');
const { validateLandingPageConfig } = require('./landing-presentation-validation.cjs');
const stable = value => JSON.stringify(value, (_, v) => v && typeof v === 'object' && !Array.isArray(v) ? Object.fromEntries(Object.entries(v).sort(([a], [b]) => a.localeCompare(b))) : v);
function validatePersonalizationAsset(value, { repoRoot, registry, persona, sources } = {}) {
  const issues = validatePersonaPersonalization(value).map(i => `${i.path}: ${i.message}`);
  if (!value || issues.length) return issues;
  let landingValidator;
  if (repoRoot) {
    const landing = registry?.repos?.find(v => v.kind === 'landing_page');
    const candidates = [path.join(repoRoot, 'scripts/validate-landing-page.js'), path.join(repoRoot, '.skills/landing-page-builder/scripts/validate-landing-page.js'), ...(landing ? [path.resolve(repoRoot, landing.path, '.skills/landing-page-builder/scripts/validate-landing-page.js')] : [])];
    const file = candidates.find(f => f.startsWith(path.resolve(repoRoot) + path.sep) && fs.existsSync(f));
    if (file) {
      // Updated SDK validators export functions; do not execute an old CLI on import.
      if (fs.readFileSync(file, 'utf8').includes('module.exports = { validateLandingPageModel')) landingValidator = require(file).validateLandingPageModel;
    }
    const mirror = path.join(repoRoot, 'assets/personalization.json');
    if (!fs.existsSync(mirror) || stable(JSON.parse(fs.readFileSync(mirror, 'utf8'))) !== stable(value)) issues.push('assets/personalization.json must mirror publishedConfig.personalization.');
  }
  for (const variant of [value.global, ...value.variants]) {
    for (const [language, content] of [['source', variant.content], ...Object.entries(variant.translations || {})]) {
      if (!content) continue;
      if (content.chatApp) {
        issues.push(...validateChatAppConfig(content.chatApp).map(i => `${variant.id}.${language}.${i.path}: ${i.message}`));
        if (sources) issues.push(...validateChatAppDependencies(content.chatApp, sources).map(i => `${variant.id}.${language}.${i.path}: ${i.message}`));
      }
      if (content.landingPage) issues.push(...validateLandingPageConfig(content.landingPage).map(i => `${variant.id}.${language}.${i.path}: ${i.message}`));
      if (content.landingPage && landingValidator) try { landingValidator(content.landingPage, repoRoot && path.join(repoRoot, 'assets/chat-config.json')); } catch (e) { issues.push(`${variant.id}.${language}: ${e.message}`); }
    }
    if (repoRoot) {
      const root = personalizationAssetRoot(variant.id);
      const expected = [[`${root}/source.json`, variant], ...(variant.generation ? [[`${root}/prompt.json`, variant.generation]] : []), ...Object.entries(variant.translations || {}).map(([lang, content]) => [`${root}/languages/${lang}/content.json`, content])];
      for (const [relative, expectedValue] of expected) {
        const file = path.join(repoRoot, relative);
        if (!fs.existsSync(file) || stable(JSON.parse(fs.readFileSync(file, 'utf8'))) !== stable(expectedValue)) issues.push(`${relative} must match the authored manifest.`);
      }
    }
  }
  return issues;
}
module.exports = { validatePersonalizationAsset };
if (require.main === module) {
  try {
    const repoRoot = path.resolve(process.argv[2] || '.');
    const persona = JSON.parse(fs.readFileSync(path.join(repoRoot, 'assets/chat-config.json'), 'utf8'));
    const registryPath = path.join(repoRoot, 'references/registry.json');
    const registry = fs.existsSync(registryPath) ? JSON.parse(fs.readFileSync(registryPath, 'utf8')) : undefined;
    const issues = validatePersonalizationAsset(persona.publishedConfig?.personalization, { repoRoot, registry, persona });
    if (issues.length) throw new Error(issues.join('\n'));
    console.log('Persona audience versions valid.');
  } catch (e) { console.error(e.message); process.exitCode = 1; }
}
