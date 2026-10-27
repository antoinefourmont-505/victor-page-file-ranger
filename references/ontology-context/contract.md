# Context-aware ontology v1

Keep one `assets/ontology.json` in the parent persona. Optional `localization` contains `sourceLanguage`, `regions`, `personalizations`, `translations`, and language `variants`. Regions have unique `key`, `label`, uppercase non-overlapping `countryCodes`, and `defaultLanguage`. Personalizations have `id`, `label`, optional `regionKey`, `language`, `priority` (0–1000), and either `{type:"individual",userIds:[...]}` or `{type:"icp",all:[{questionId,oneOf:[scalar,...]}]}`. All profile conditions must match; an array-valued answer matches any declared value. Runtime facts come from the authenticated runner, never caller-supplied identity claims.

Selection: Global → region → one audience. Individuals rank before ICPs, then region specificity, exact language, broader language scope, priority, and stable ID. Language comes from explicit locale, preferred language, region default, then source language. Copy/model language fallback is exact tag → primary language → scope default → source language.

A scope may include `definition`, a complete model snapshot with `name`, `status`, `entities`, `relationships`, optional `description` and `primitives`. `variants[tag].definition` can replace this model for a language. Snapshots omit `schemaVersion`, `resourceKey`, `version`, and `localization`; these belong to the parent. Preserve the root Source primitive and common concept IDs. Copies are separate `translations[tag]` objects with optional `name`, `description`, `glossary`, `entities[type]` (`label`, `description`, `attributes[key]` terms), and `relationships[type]` terms. Copy never renames keys or enum values. Unreturned inherited terms are pruned when a replacement removes a concept.

```json
{"sourceLanguage":"en","regions":[{"key":"benelux","label":"Benelux","countryCodes":["NL","BE"],"defaultLanguage":"nl","translations":{"nl":{"entities":{"Person":{"label":"Persoon","attributes":{"name":{"label":"Naam"}}}}}}}],"personalizations":[]}
```

## Portable validation and preview

```sh
node scripts/validate-ontology.cjs assets/ontology.json --json
node scripts/validate-ontology.cjs assets/ontology.json --preview --scope country:benelux --language nl
node scripts/validate-ontology.cjs assets/ontology.json assets/data-feeds/example.definition.json --context fixture-context.json --json
```

`fixture-context.json` is a local test fixture `{locale:{countryCode,language},audience:{userId,answers}}`; it is never accepted as runtime identity over REST/MCP. Test global, region, combined profile rules, competing groups, individuals, language fallback, model replacement, and output projection compatibility. Gateway validation checks the current feed catalog across reachable contexts; the selected-context CLI complements it.

## Agent APIs

Persona Playground author REST: `GET/PUT /api/gateway/pages/{pageId}/ontology`; `POST .../validate`, `POST .../preview`, `POST .../translate`; `GET .../view`. Author methods require ownership and the Persona Playground author token with `digital-twin:admin`; workspace keys cannot call them. View requires existing gateway access and persona visibility. Responses use the gateway `{success,data}` envelope.

MCP: get/validate/preview/translate/save/view tools have the same service behavior. Get returns `{definition,headSha,canEdit}`. Validate receives `{pageId,definition}` and returns `{valid,issues,checkedFeeds}`; issues may identify a feed. Preview receives `{pageId,definition?,scopeId?,language?}` and returns `{definition,copy,selection}`. Translate additionally requires `targetLanguage` and returns a draft `{language,copy}` without saving. Save receives `{pageId,definition,expectedHeadSha}` and returns `{headSha,branchName}`. Increase the parent semantic version; stale heads return 409. Keep the resource key.

View receives `{pageId,resourceType,view,resourceId?,executionId?,revision?,filters?}`. `filters.scopeId` identifies a feed scope; owner-only `filters.ontologyScopeId` previews an ontology scope. `filters.modelContextId` selects captured run models. Persona MCP `persona_get_ontology` has no pageId or author preview: the token binds the persona; it supports resource/view identifiers, language, countryCode, and modelContextId. Targeting definitions and sensitive fields stay private.

Feed revisions pin the parent Git contract. Runs capture scopes, language and a model fingerprint before execution; retries and downstream source mappings reuse them. Signals capture their own model. History displays recorded models, not today's profile. Missing historical contracts are unavailable, not silently replaced. Saving and translating never execute feeds, write List instances or activate a release.
