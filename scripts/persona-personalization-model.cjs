"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPersonaPersonalization = exports.matchesPresentationLanguage = exports.normalizePresentationLanguage = void 0;
exports.isPresentationCopyPath = isPresentationCopyPath;
exports.applyPresentationCopyOverrides = applyPresentationCopyOverrides;
exports.validatePersonaPersonalization = validatePersonaPersonalization;
exports.audienceMatches = audienceMatches;
exports.selectPresentationLayers = selectPresentationLayers;
exports.materializePresentation = materializePresentation;
exports.personalizationAssetRoot = personalizationAssetRoot;
const idPattern = /^[a-z][a-z0-9-]{0,63}$/;
const languagePattern = /^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/;
const unsafeKeys = new Set(['__proto__', 'constructor', 'prototype']);
const embedKeys = new Set(['theme', 'fontFamily', 'googleFontFamily', 'headingColor', 'headingMonochrome', 'chatBackground', 'pageBackground', 'chatBackgroundBlur', 'chatBackgroundOverlayOpacity', 'pageBackgroundBlur', 'pageBackgroundOverlayOpacity', 'heroTitle', 'heroSubtitle', 'openingStatements', 'themeMode', 'showThemeToggle', 'about']);
const contentKeys = new Set(['name', 'description', 'profilePicture', 'landingPage', 'chatEmbedConfig', 'chatApp', 'copyOverrides']);
const copyKeys = new Set(['headline', 'headlineAccent', 'headlineLine2', 'subheadline', 'badge', 'label', 'title', 'heading', 'headingLines', 'body', 'description', 'eyebrow', 'kicker', 'announcement', 'name', 'location', 'dateRange', 'placeholder', 'instruction', 'budgetHint', 'question', 'answer', 'value', 'tagline', 'disclaimer', 'proposalArea', 'forItems', 'notForItems', 'principles', 'openingStatements']);
const copyBlockedSegments = new Set(['design', 'localization', 'capabilityPreview', 'schema', 'dataPoints', 'workspace', 'scope', 'generation', 'translations', 'credentials', '__proto__', 'constructor', 'prototype']);
function isPresentationCopyPath(path) {
    const parts = path.split('.');
    if (!['landingPage', 'chatApp', 'chatEmbedConfig'].includes(parts[0]) || parts.length < 2 || parts.length > 20)
        return false;
    if (parts.some(part => !/^(?:[a-zA-Z][a-zA-Z0-9_-]*|0|[1-9][0-9]*)$/.test(part) || copyBlockedSegments.has(part)))
        return false;
    const leaf = [...parts].reverse().find(part => !/^\d+$/.test(part)) || '';
    return copyKeys.has(leaf) || /(?:Label|Copy|Message|Placeholder|Text|Note|Intro|Heading|Summary|Disclaimer)$/.test(leaf);
}
/** Fail closed: copy overlays cannot create paths, change URLs or alter command/resource bindings. */
function applyPresentationCopyOverrides(content, overrides) {
    if (!overrides)
        return content;
    const result = structuredClone(content);
    for (const [path, text] of Object.entries(overrides)) {
        if (!isPresentationCopyPath(path) || typeof text !== 'string' || !text.trim() || text.length > 4000)
            throw new Error('Invalid presentation copy override: ' + path);
        const parts = path.split('.');
        let parent = result;
        for (const part of parts.slice(0, -1))
            parent = parent?.[part];
        const key = parts[parts.length - 1];
        if (!parent || typeof parent[key] !== 'string' || /^(?:https?:\/\/|mailto:|tel:|\/|#)/i.test(parent[key]))
            throw new Error('Presentation copy path is not an existing copy field: ' + path);
        parent[key] = text;
    }
    return result;
}
const record = (v) => Boolean(v) && typeof v === 'object' && !Array.isArray(v);
const text = (v, max) => typeof v === 'string' && v.trim().length > 0 && v.length <= max;
const scalar = (v) => typeof v === 'string' || typeof v === 'boolean' || typeof v === 'number' && Number.isFinite(v);
const normalizePresentationLanguage = (value) => {
    if (!value || !languagePattern.test(value))
        return 'en';
    return value.split('-').map((part, i) => i === 0 ? part.toLowerCase() : part.length === 2 ? part.toUpperCase() : part.length === 4 ? part[0].toUpperCase() + part.slice(1).toLowerCase() : part).join('-');
};
exports.normalizePresentationLanguage = normalizePresentationLanguage;
const matchesPresentationLanguage = (scope, language) => (0, exports.normalizePresentationLanguage)(scope) === language || !scope.includes('-') && scope === language.split('-')[0];
exports.matchesPresentationLanguage = matchesPresentationLanguage;
function unsafe(value, depth = 0) {
    if (depth > 24)
        return true;
    if (Array.isArray(value))
        return value.some(v => unsafe(v, depth + 1));
    return record(value) && Object.entries(value).some(([key, v]) => unsafeKeys.has(key) || unsafe(v, depth + 1));
}
function validatePersonaPersonalization(value) {
    if (value == null)
        return [];
    const issues = [];
    const add = (path, message) => issues.push({ path: `personalization.${path}`, message });
    if (!record(value))
        return [{ path: 'personalization', message: 'Expected a presentation manifest.' }];
    if (unsafe(value) || JSON.stringify(value).length > 1000000)
        return [{ path: 'personalization', message: 'Presentation config contains unsafe keys, excessive nesting or too much content.' }];
    const keys = (v, allowed, path) => { for (const key of Object.keys(v))
        if (!allowed.includes(key))
            add(`${path ? path + '.' : ''}${key}`, 'Unknown presentation field.'); };
    keys(value, ['schemaVersion', 'enabled', 'sourceLanguage', 'defaultLanguage', 'global', 'variants'], '');
    if (value.schemaVersion !== 1)
        add('schemaVersion', 'Use schemaVersion 1.');
    if (typeof value.enabled !== 'boolean')
        add('enabled', 'Choose whether audience versions are enabled.');
    for (const key of ['sourceLanguage', 'defaultLanguage'])
        if (!languagePattern.test(String(value[key] || '')))
            add(key, 'Use a BCP-47 language tag.');
    if (!Array.isArray(value.variants) || value.variants.length > 300)
        add('variants', 'Declare at most 300 variants.');
    const ids = new Set();
    const content = (v, path) => {
        if (!record(v)) {
            add(path, 'Expected presentation content.');
            return;
        }
        for (const key of Object.keys(v))
            if (!contentKeys.has(key))
                add(`${path}.${key}`, 'Only identity, landing page, embed appearance and Chat App presentation may be overridden.');
        for (const key of ['name', 'description', 'profilePicture'])
            if (v[key] !== undefined && !text(v[key], key === 'description' ? 4000 : 2048))
                add(`${path}.${key}`, 'Use bounded, nonempty text.');
        if (v.profilePicture && !/^(https:\/\/|\/(?!\/))/.test(v.profilePicture))
            add(`${path}.profilePicture`, 'Use HTTPS or a managed local asset path.');
        if (record(v.chatEmbedConfig))
            for (const key of Object.keys(v.chatEmbedConfig))
                if (!embedKeys.has(key))
                    add(`${path}.chatEmbedConfig.${key}`, 'Only embed appearance may be overridden; access, translation providers and conversion policies stay in the base config.');
        for (const key of ['landingPage', 'chatEmbedConfig', 'chatApp'])
            if (v[key] !== undefined && !record(v[key]))
                add(`${path}.${key}`, 'Expected a complete configuration object.');
        if (v.copyOverrides !== undefined && (!record(v.copyOverrides) || Object.keys(v.copyOverrides).length > 250 || Object.entries(v.copyOverrides).some(([key, value]) => !isPresentationCopyPath(key) || !text(value, 4000))))
            add(`${path}.copyOverrides`, 'Use at most 250 bounded human-facing string overrides at existing copy paths.');
    };
    const variant = (v, path, global = false) => {
        if (!record(v)) {
            add(path, 'Expected a variant.');
            return;
        }
        keys(v, ['id', 'label', 'enabled', 'scope', 'audience', 'priority', 'sourceLanguage', 'defaultLanguage', 'content', 'translations', 'generation'], path);
        if (!text(v.id, 64) || !idPattern.test(v.id) || ids.has(v.id) || global && v.id !== 'global')
            add(`${path}.id`, 'Use a unique lowercase key; the global baseline key is global.');
        ids.add(v.id);
        if (!text(v.label, 120))
            add(`${path}.label`, 'Give this version an author-facing label.');
        if (v.enabled !== undefined && typeof v.enabled !== 'boolean')
            add(`${path}.enabled`, 'Expected true or false.');
        for (const key of ['sourceLanguage', 'defaultLanguage'])
            if (v[key] !== undefined && !languagePattern.test(v[key]))
                add(`${path}.${key}`, 'Use a BCP-47 language tag.');
        if (v.priority !== undefined && (!Number.isInteger(v.priority) || v.priority < 0 || v.priority > 1000))
            add(`${path}.priority`, 'Priority must be an integer from 0 to 1000.');
        if (global && (v.scope || v.audience))
            add(path, 'Global country covers every country, language and visitor.');
        if (!global) {
            if (v.scope !== undefined && !record(v.scope))
                add(`${path}.scope`, 'Expected country/language scope.');
            if (record(v.scope))
                keys(v.scope, ['countryCodes', 'languages'], `${path}.scope`);
            for (const [key, pattern] of [['countryCodes', /^[A-Z]{2}$/], ['languages', languagePattern]]) {
                const list = v.scope?.[key];
                if (list !== undefined && (!Array.isArray(list) || list.length > 250 || new Set(list).size !== list.length || list.some(x => typeof x !== 'string' || !pattern.test(x))))
                    add(`${path}.scope.${key}`, 'Use a unique list of country codes or language tags; an empty list means global.');
            }
            const a = v.audience;
            if (!record(a) || !['everyone', 'individual', 'icp', 'custom'].includes(a.type))
                add(`${path}.audience`, 'Choose everyone, individual accounts, profile (ICP), or a custom profile audience.');
            else if (a.type === 'individual') {
                if (!Array.isArray(a.userIds) || !a.userIds.length || a.userIds.length > 100 || a.userIds.some(x => !text(x, 128)))
                    add(`${path}.audience.userIds`, 'Declare bounded authenticated account IDs.');
            }
            else if (a.type !== 'everyone') {
                if (a.type === 'custom' && (!text(a.key, 64) || !idPattern.test(a.key)))
                    add(`${path}.audience.key`, 'Give the custom audience a portable type key.');
                if (!Array.isArray(a.all) || !a.all.length || a.all.length > 20 || a.all.some(r => !record(r) || !text(r.questionId, 100) || !Array.isArray(r.oneOf) || !r.oneOf.length || r.oneOf.length > 100 || r.oneOf.some(x => !scalar(x))))
                    add(`${path}.audience.all`, 'Match saved profile question IDs against scalar values; all rules must match.');
            }
        }
        if (record(v.audience))
            keys(v.audience, v.audience.type === 'everyone' ? ['type'] : v.audience.type === 'individual' ? ['type', 'userIds'] : v.audience.type === 'custom' ? ['type', 'key', 'all'] : ['type', 'all'], `${path}.audience`);
        if (Array.isArray(v.audience?.all))
            v.audience.all.forEach((rule, i) => { if (record(rule))
                keys(rule, ['questionId', 'oneOf'], `${path}.audience.all[${i}]`); });
        if (v.content !== undefined)
            content(v.content, `${path}.content`);
        if (v.translations !== undefined) {
            if (!record(v.translations) || Object.keys(v.translations).length > 100)
                add(`${path}.translations`, 'Declare language-specific presentation overrides.');
            else
                for (const [language, copy] of Object.entries(v.translations)) {
                    if (!languagePattern.test(language))
                        add(`${path}.translations.${language}`, 'Use a BCP-47 language tag.');
                    content(copy, `${path}.translations.${language}`);
                }
        }
        if (v.generation !== undefined) {
            const g = v.generation;
            if (!record(g) || typeof g.enabled !== 'boolean' || !text(g.prompt, 12000))
                add(`${path}.generation`, 'Provide an enabled flag and bounded author prompt.');
            else {
                keys(g, ['enabled', 'prompt', 'sections', 'regeneration', 'model'], `${path}.generation`);
                if (g.model !== undefined && !text(g.model, 200))
                    add(`${path}.generation.model`, 'Use a bounded model identifier.');
                if (g.regeneration !== undefined && !['auto', 'manual'].includes(g.regeneration))
                    add(`${path}.generation.regeneration`, 'Choose auto or manual regeneration.');
                if (g.sections !== undefined && (!Array.isArray(g.sections) || g.sections.length > 100 || g.sections.some(x => !text(x, 120) || !/^[a-zA-Z][\w.-]*$/.test(x))))
                    add(`${path}.generation.sections`, 'Use registered section IDs.');
            }
        }
    };
    variant(value.global, 'global', true);
    if (Array.isArray(value.variants))
        value.variants.forEach((v, i) => variant(v, `variants[${i}]`));
    return issues;
}
function audienceMatches(audience, visitor) {
    if (audience.type === 'everyone')
        return true;
    if (!visitor.userId)
        return false;
    if (audience.type === 'individual')
        return audience.userIds.includes(visitor.userId);
    return audience.all.every(rule => {
        const value = visitor.answers?.[rule.questionId];
        return Array.isArray(value) ? value.some(v => rule.oneOf.includes(v)) : rule.oneOf.includes(value);
    });
}
const scoped = (v, visitor, language) => v.enabled !== false && (!v.scope?.countryCodes?.length || Boolean(visitor.countryCode && v.scope.countryCodes.includes(visitor.countryCode))) && (!v.scope?.languages?.length || v.scope.languages.some(tag => (0, exports.matchesPresentationLanguage)(tag, language)));
const rank = (v, language) => [v.audience.type === 'individual' ? 2 : v.audience.type !== 'everyone' ? 1 : 0, Number(Boolean(v.scope?.countryCodes?.length)), Number(Boolean(v.scope?.languages?.includes(language))), Number(Boolean(v.scope?.languages?.length)), v.priority || 0];
function selectPresentationLayers(config, visitor) {
    const countryDefault = config.variants.filter(v => v.enabled !== false && v.audience.type === 'everyone' && v.defaultLanguage && v.scope?.countryCodes?.includes(visitor.countryCode || '')).sort((a, b) => (b.priority || 0) - (a.priority || 0) || a.id.localeCompare(b.id))[0]?.defaultLanguage;
    const language = (0, exports.normalizePresentationLanguage)(visitor.language || countryDefault || config.defaultLanguage);
    const candidates = config.variants.filter(v => scoped(v, visitor, language) && audienceMatches(v.audience, visitor));
    candidates.sort((a, b) => {
        const ar = rank(a, language), br = rank(b, language);
        for (let i = 0; i < ar.length; i++)
            if (br[i] !== ar[i])
                return br[i] - ar[i];
        return a.id.localeCompare(b.id);
    });
    const country = candidates.find(v => v.audience.type === 'everyone');
    const audience = candidates.find(v => v.audience.type !== 'everyone');
    return { language, layers: [{ ...config.global, audience: { type: 'everyone' } }, ...(country ? [country] : []), ...(audience ? [audience] : [])] };
}
function materializePresentation(layers, language, base = {}) {
    let content = { ...base };
    for (const layer of layers) {
        const translated = layer.translations?.[language] || layer.translations?.[language.split('-')[0]];
        const { copyOverrides: sourceOverrides, ...source } = layer.content || {};
        const { copyOverrides: translatedOverrides, ...translation } = translated || {};
        const next = { ...source, ...translation };
        content = { ...content, ...next, ...(next.chatEmbedConfig ? { chatEmbedConfig: { ...content.chatEmbedConfig, ...next.chatEmbedConfig } } : {}) };
        content = applyPresentationCopyOverrides(content, { ...sourceOverrides, ...translatedOverrides });
    }
    return content;
}
function personalizationAssetRoot(id) {
    if (!idPattern.test(id))
        throw new Error('Invalid personalization key.');
    return `assets/personalization/${id === 'global' ? 'global' : `variants/${id}`}`;
}
const createPersonaPersonalization = () => ({ schemaVersion: 1, enabled: false, sourceLanguage: 'en', defaultLanguage: 'en', global: { id: 'global', label: 'Global country', content: {} }, variants: [] });
exports.createPersonaPersonalization = createPersonaPersonalization;
