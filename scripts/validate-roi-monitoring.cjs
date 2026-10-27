var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server/skills/chat-app-builder/scripts/roi-monitoring-validator.ts
var import_fs = __toESM(require("fs"));

// server/src/shared/context-selection.ts
function contextLanguage(value) {
  if (typeof value !== "string" || value.length > 40) throw new Error("Use a BCP 47 language tag.");
  return Intl.getCanonicalLocales(value)[0] || "en";
}

// server/src/shared/persona-ontology-validator.ts
var SOURCE_ONTOLOGY_ENTITY = {
  type: "Source",
  description: "A place where information can be obtained. Instances live in a persona/user-scoped source registry List.",
  attributes: {
    id: { type: "string", required: true },
    name: { type: "string", required: true },
    type: { type: "string" },
    provider: { type: "string" },
    url: { type: "string", required: true },
    supportedRegions: { type: "array" },
    supportedLanguages: { type: "array" },
    capabilities: { type: "array" },
    dataTypes: { type: "array" },
    accessMethod: { type: "string", enum: ["browser", "api", "mcp", "provider"] },
    connectorReference: { type: "string" },
    authenticationReference: { type: "string" },
    freshness: { type: "string", enum: ["fresh", "stale", "unknown"] },
    qualityScore: { type: "number" },
    reliabilityScore: { type: "number" },
    coverageScore: { type: "number" },
    lastCheckedAt: { type: "datetime" },
    status: { type: "string", enum: ["candidate", "active", "inactive"] },
    provenance: { type: "object" }
  }
};
function ontologyEntities(ontology2) {
  return [...ontology2.primitives?.includes("Source") ? [SOURCE_ONTOLOGY_ENTITY] : [], ...ontology2.entities];
}
var OntologyError = class extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.status = 422;
  }
};
var fail = (message) => {
  throw new OntologyError("INVALID_ONTOLOGY", message);
};
var identifier = (value) => typeof value === "string" && /^[A-Za-z][A-Za-z0-9_]{0,63}$/.test(value) && !["constructor", "prototype", "__proto__"].includes(value);
function object(value, label) {
  if (!value || Array.isArray(value) || typeof value !== "object" || Object.getPrototypeOf(value) !== Object.prototype) fail(`${label} must be an object.`);
  return value;
}
function keys(value, allowed, label) {
  if (Object.keys(value).some((key) => !allowed.includes(key))) fail(`${label} contains an unsupported field.`);
}
function text(value, label, max = 2e3) {
  if (value !== void 0 && (typeof value !== "string" || !value.trim() || value.length > max)) fail(`Invalid ${label}.`);
}
function ontologyAttributeAccepts(attribute, value) {
  if (value === null) return attribute.nullable === true;
  let valid = false;
  switch (attribute.type) {
    case "string":
      valid = typeof value === "string";
      break;
    case "number":
      valid = typeof value === "number" && Number.isFinite(value);
      break;
    case "integer":
      valid = Number.isSafeInteger(value);
      break;
    case "boolean":
      valid = typeof value === "boolean";
      break;
    case "array":
      valid = Array.isArray(value);
      break;
    case "object":
      valid = Boolean(value && typeof value === "object" && !Array.isArray(value) && Object.getPrototypeOf(value) === Object.prototype);
      break;
    case "date":
      valid = typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
      break;
    case "datetime":
      valid = typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value) && Number.isFinite(Date.parse(value));
      break;
  }
  return valid && (!attribute.enum || attribute.enum.includes(value));
}
function validatePersonaOntology(value) {
  const d = object(value, "Ontology");
  keys(d, ["schemaVersion", "resourceKey", "version", "name", "status", "description", "entities", "relationships", "primitives", "localization"], "Ontology");
  if (d.schemaVersion !== 1 || typeof d.resourceKey !== "string" || !/^ontology\.persona\.[a-z0-9][a-z0-9.-]{0,100}$/.test(d.resourceKey)) fail("Use schemaVersion 1 and an ontology.persona.* resourceKey.");
  if (typeof d.version !== "string" || !/^\d+\.\d+\.\d+$/.test(d.version)) fail("Use a semantic version, such as 0.1.0.");
  if (!["placeholder", "defined"].includes(d.status) || typeof d.name !== "string") fail("Name and definition status are required.");
  text(d.name, "name", 120);
  text(d.description, "description");
  if (!Array.isArray(d.entities) || d.entities.length > 200 || !Array.isArray(d.relationships) || d.relationships.length > 400) fail("Declare entities and relationships within the size limits.");
  if (d.primitives !== void 0 && (!Array.isArray(d.primitives) || d.primitives.length > 1 || d.primitives.some((value2) => value2 !== "Source"))) fail("Only declared shared ontology primitives are supported.");
  const entities = new Set(d.primitives?.includes("Source") ? ["Source"] : []);
  const relationships = /* @__PURE__ */ new Set();
  for (const raw of d.entities) {
    const entity = object(raw, "Entity");
    keys(entity, ["type", "description", "attributes"], "Entity");
    if (!identifier(entity.type) || entities.has(entity.type)) fail("Entity types must be unique stable identifiers.");
    entities.add(entity.type);
    text(entity.description, "entity description");
    const attributes = object(entity.attributes, "Attributes");
    if (Object.keys(attributes).length > 200) fail("Use at most 200 attributes per entity.");
    for (const [key, rawAttribute] of Object.entries(attributes)) {
      if (!identifier(key)) fail("Attribute names must be stable identifiers.");
      const a = object(rawAttribute, "Attribute");
      keys(a, ["type", "description", "required", "nullable", "enum"], "Attribute");
      if (!["string", "number", "integer", "boolean", "object", "array", "date", "datetime"].includes(a.type)) fail("Invalid attribute type.");
      text(a.description, "attribute description");
      for (const flag of ["required", "nullable"]) if (a[flag] !== void 0 && typeof a[flag] !== "boolean") fail(`Invalid ${flag} flag.`);
      if (a.enum !== void 0 && (!Array.isArray(a.enum) || !a.enum.length || a.enum.length > 100 || a.enum.some((entry) => !["string", "number", "boolean"].includes(typeof entry) || !ontologyAttributeAccepts({ type: a.type }, entry)))) fail("Enum values must match the attribute type.");
    }
  }
  for (const raw of d.relationships) {
    const r = object(raw, "Relationship");
    keys(r, ["type", "from", "to", "direction", "description", "cardinality"], "Relationship");
    if (!identifier(r.type) || relationships.has(r.type) || !entities.has(r.from) || !entities.has(r.to) || !["directed", "undirected"].includes(r.direction)) fail("Relationships need unique types, known endpoints, and a direction.");
    relationships.add(r.type);
    text(r.description, "relationship description");
    if (r.cardinality !== void 0) {
      const c = object(r.cardinality, "Cardinality");
      keys(c, ["from", "to", "minTargets", "maxTargets"], "Cardinality");
      if (!["one", "many"].includes(c.from) || !["one", "many"].includes(c.to)) fail("Cardinality uses one or many.");
      for (const key of ["minTargets", "maxTargets"]) if (c[key] !== void 0 && (!Number.isSafeInteger(c[key]) || c[key] < 0)) fail("Cardinality bounds must be nonnegative integers.");
      if (c.minTargets !== void 0 && c.maxTargets !== void 0 && c.minTargets > c.maxTargets || c.to === "one" && (c.minTargets > 1 || c.maxTargets > 1)) fail("Inconsistent cardinality bounds.");
    }
  }
  if (d.localization !== void 0) validateOntologyLocalization(d);
  return d;
}
function validateOntologyLocalization(ontology2) {
  const l = object(ontology2.localization, "Localization");
  if (JSON.stringify(l).length > 2e6) fail("Ontology localization exceeds the 2 MB limit.");
  keys(l, ["sourceLanguage", "definition", "translations", "variants", "regions", "personalizations"], "Localization");
  const lang = (value) => {
    try {
      if (typeof value !== "string" || contextLanguage(value) !== value) fail("Use canonical BCP 47 language tags.");
    } catch {
      fail("Use canonical BCP 47 language tags.");
    }
  };
  lang(l.sourceLanguage);
  if (!Array.isArray(l.regions) || l.regions.length > 100 || !Array.isArray(l.personalizations) || l.personalizations.length > 100) fail("Declare at most 100 regions and audiences.");
  const scopeKey = (value) => typeof value === "string" && /^[a-z0-9][a-z0-9_-]{0,63}$/.test(value) && !["constructor", "prototype", "__proto__"].includes(value);
  const model = (value) => {
    const m = object(value, "Model snapshot");
    keys(m, ["name", "status", "description", "entities", "relationships", "primitives"], "Model snapshot");
    validatePersonaOntology({ ...m, schemaVersion: 1, resourceKey: ontology2.resourceKey, version: ontology2.version });
    if (Boolean(m.primitives?.includes("Source")) !== Boolean(ontology2.primitives?.includes("Source"))) fail("Model variants must preserve the Source primitive.");
  };
  const term = (value, entity = false) => {
    const t = object(value, "Term");
    keys(t, entity ? ["label", "description", "attributes"] : ["label", "description"], "Term");
    text(t.label, "term label", 200);
    text(t.description, "term description");
    if (entity && t.attributes !== void 0) for (const [key, v] of Object.entries(object(t.attributes, "Attribute terms"))) {
      if (!identifier(key)) fail("Invalid attribute term key.");
      term(v);
    }
  };
  const copy = (value) => {
    const c = object(value, "Copy");
    keys(c, ["label", "name", "description", "glossary", "entities", "relationships"], "Copy");
    text(c.name, "localized name", 120);
    text(c.label, "label", 200);
    text(c.description, "localized description");
    if (c.glossary !== void 0 && (!Array.isArray(c.glossary) || c.glossary.length > 100 || c.glossary.some((v) => typeof v !== "string" || !v.trim() || v.length > 200))) fail("Use at most 100 short protected terms.");
    for (const field of ["entities", "relationships"]) if (c[field] !== void 0) {
      const entries = Object.entries(object(c[field], "Terms"));
      if (entries.length > 400) fail("Too many ontology terms.");
      for (const [key, v] of entries) {
        if (!identifier(key)) fail("Invalid term key.");
        term(v, field === "entities");
      }
    }
  };
  const content = (s) => {
    if (s.defaultLanguage !== void 0) lang(s.defaultLanguage);
    if (s.definition !== void 0) model(s.definition);
    for (const field of ["translations", "variants"]) if (s[field] !== void 0) {
      const entries = Object.entries(object(s[field], field));
      if (entries.length > 100) fail("Use at most 100 language variants.");
      for (const [tag, v] of entries) {
        lang(tag);
        if (field === "translations") copy(v);
        else {
          const variant = object(v, "Language variant");
          keys(variant, ["definition"], "Language variant");
          model(variant.definition);
        }
      }
    }
  };
  content(l);
  const regions = /* @__PURE__ */ new Set(), countries = /* @__PURE__ */ new Set(), audiences = /* @__PURE__ */ new Set();
  for (const raw of l.regions) {
    const r = object(raw, "Region");
    keys(r, ["key", "label", "countryCodes", "defaultLanguage", "definition", "translations", "variants"], "Region");
    if (!scopeKey(r.key) || regions.has(r.key)) fail("Use unique region keys.");
    regions.add(r.key);
    text(r.label, "region label", 120);
    if (!r.label) fail("Region label required.");
    lang(r.defaultLanguage);
    if (!Array.isArray(r.countryCodes) || !r.countryCodes.length || r.countryCodes.length > 250) fail("Declare country codes.");
    for (const code of r.countryCodes) {
      if (typeof code !== "string" || !/^[A-Z]{2}$/.test(code) || countries.has(code)) fail("Each uppercase country code belongs to one region.");
      countries.add(code);
    }
    content(r);
  }
  for (const raw of l.personalizations) {
    const p = object(raw, "Audience");
    keys(p, ["id", "label", "regionKey", "language", "priority", "audience", "defaultLanguage", "definition", "translations", "variants"], "Audience");
    if (!scopeKey(p.id) || audiences.has(p.id)) fail("Use unique audience IDs.");
    audiences.add(p.id);
    text(p.label, "audience label", 120);
    if (!p.label) fail("Audience label required.");
    if (p.regionKey !== void 0 && !regions.has(p.regionKey)) fail("Audience region must exist.");
    if (p.language !== void 0) lang(p.language);
    if (p.priority !== void 0 && (!Number.isInteger(p.priority) || p.priority < 0 || p.priority > 1e3)) fail("Priority must be 0 to 1000.");
    const a = object(p.audience, "Audience rules");
    if (a.type === "individual") {
      keys(a, ["type", "userIds"], "Audience rules");
      if (!Array.isArray(a.userIds) || !a.userIds.length || a.userIds.length > 100 || a.userIds.some((v) => typeof v !== "string" || !v || v.length > 128)) fail("Use authenticated account IDs.");
    } else if (a.type === "icp") {
      keys(a, ["type", "all"], "Audience rules");
      if (!Array.isArray(a.all) || !a.all.length || a.all.length > 20) fail("Declare 1 to 20 profile conditions.");
      for (const rawRule of a.all) {
        const rule = object(rawRule, "Profile condition");
        keys(rule, ["questionId", "oneOf"], "Profile condition");
        text(rule.questionId, "question ID", 100);
        if (!rule.questionId || !Array.isArray(rule.oneOf) || !rule.oneOf.length || rule.oneOf.length > 100 || rule.oneOf.some((v) => !["string", "number", "boolean"].includes(typeof v) || typeof v === "number" && !Number.isFinite(v))) fail("Profile rules require scalar answers.");
      }
    } else fail("Choose individual or icp audience.");
    content(p);
  }
  for (const selection of allOntologySelections(ontology2)) {
    const resolved = materializeOntology(ontology2, selection);
    const scope = selection.personalizationId ? l.personalizations.find((p) => p.id === selection.personalizationId) : selection.regionKey ? l.regions.find((r) => r.key === selection.regionKey) : l;
    const c = scope?.translations?.[selection.language];
    if (!c) continue;
    for (const [key, t] of Object.entries(c.entities || {})) {
      const e = ontologyEntities(resolved.definition).find((e2) => e2.type === key);
      if (!e || Object.keys(t.attributes || {}).some((k) => !Object.prototype.hasOwnProperty.call(e.attributes, k))) fail("Term refers to an unknown entity or attribute in its scope.");
    }
    if (Object.keys(c.relationships || {}).some((k) => !resolved.definition.relationships.some((r) => r.type === k))) fail("Term refers to an unknown relationship.");
  }
}
var cloneOntology = (value) => JSON.parse(JSON.stringify(value));
function materializeOntology(ontology2, selection) {
  const { localization: l, ...base } = ontology2;
  let definition = cloneOntology(base), copy = {};
  const region = l?.regions.find((r) => r.key === selection.regionKey), personal = l?.personalizations.find((p) => p.id === selection.personalizationId);
  const translated = (entries, fallback) => [selection.language, selection.language.split("-")[0], fallback, l?.sourceLanguage].filter(Boolean).map((tag) => entries?.[tag]).find((v) => v !== void 0);
  const apply = (scope, fallback) => {
    if (!scope) return;
    const model = translated(scope.variants, fallback)?.definition || scope.definition;
    if (model) definition = { ...cloneOntology(model), schemaVersion: 1, resourceKey: ontology2.resourceKey, version: ontology2.version };
    const next = translated(scope.translations, fallback);
    if (!next) return;
    const entities = { ...copy.entities };
    for (const [key, term] of Object.entries(next.entities || {})) entities[key] = { ...entities[key], ...term, attributes: { ...entities[key]?.attributes, ...term.attributes } };
    copy = { ...copy, ...cloneOntology(next), entities, relationships: { ...copy.relationships, ...next.relationships } };
  };
  apply(l, l?.sourceLanguage);
  apply(region, region?.defaultLanguage);
  apply(personal, personal?.defaultLanguage || personal?.language || l?.sourceLanguage);
  copy.entities = Object.fromEntries(Object.entries(copy.entities || {}).filter(([key]) => ontologyEntities(definition).some((e) => e.type === key)).map(([key, t]) => [key, { ...t, attributes: Object.fromEntries(Object.entries(t.attributes || {}).filter(([field]) => Object.prototype.hasOwnProperty.call(ontologyEntities(definition).find((e) => e.type === key).attributes, field))) }]));
  copy.relationships = Object.fromEntries(Object.entries(copy.relationships || {}).filter(([key]) => definition.relationships.some((r) => r.type === key)));
  return { definition, copy, selection };
}
function allOntologySelections(ontology2) {
  const l = ontology2.localization;
  const scopes = [{ language: l?.sourceLanguage || "en" }, ...(l?.regions || []).map((r) => ({ regionKey: r.key, countryCode: r.countryCodes[0], language: r.defaultLanguage })), ...(l?.personalizations || []).flatMap((p) => (p.regionKey ? [p.regionKey] : [void 0, ...(l?.regions || []).map((r) => r.key)]).map((regionKey) => ({ regionKey, personalizationId: p.id, language: p.defaultLanguage || p.language || l?.sourceLanguage || "en" })))];
  const tags = /* @__PURE__ */ new Set([l?.sourceLanguage || "en", ...Object.keys(l?.translations || {}), ...Object.keys(l?.variants || {}), ...(l?.regions || []).flatMap((r) => [r.defaultLanguage, ...Object.keys(r.translations || {}), ...Object.keys(r.variants || {})]), ...(l?.personalizations || []).flatMap((p) => [p.language || p.defaultLanguage || l?.sourceLanguage || "en", ...Object.keys(p.translations || {}), ...Object.keys(p.variants || {})])]);
  if (scopes.length * tags.size > 2e4) fail("Too many ontology contexts; simplify the candidate scopes.");
  return scopes.flatMap((scope) => [.../* @__PURE__ */ new Set([scope.language, ...tags])].map((language) => ({ ...scope, language })));
}
function validateOntologyReferenceShape(value) {
  const r = object(value, "Ontology reference");
  keys(r, ["entityType", "ontologyVersion", "recordsPath", "fields"], "Ontology reference");
  if (!identifier(r.entityType) || typeof r.recordsPath !== "string") fail("Declare an entity type and recordsPath.");
  if (r.ontologyVersion !== void 0 && (typeof r.ontologyVersion !== "string" || !/^\d+\.\d+\.\d+$/.test(r.ontologyVersion))) fail("Invalid ontology version.");
  const fields = object(r.fields, "Ontology field references");
  if (!Object.keys(fields).length || Object.keys(fields).length > 200) fail("Reference 1 to 200 ontology attributes.");
  pointerSegments(r.recordsPath);
  for (const [field, pointer] of Object.entries(fields)) {
    if (!identifier(field)) fail("Invalid ontology attribute reference.");
    pointerSegments(pointer);
  }
  return r;
}
function validateOntologyReference(ontology2, value) {
  const reference = validateOntologyReferenceShape(value);
  if (reference.ontologyVersion && ontology2.version !== reference.ontologyVersion) throw new OntologyError("ONTOLOGY_VERSION_MISMATCH", "The feed requires a different persona ontology version.");
  const entity = ontologyEntities(ontology2).find((entity2) => entity2.type === reference.entityType);
  if (!entity) throw new OntologyError("UNKNOWN_ENTITY_TYPE", "The persona ontology does not define this entity type.");
  if (Object.keys(reference.fields).some((field) => !Object.prototype.hasOwnProperty.call(entity.attributes, field))) throw new OntologyError("UNKNOWN_ENTITY_ATTRIBUTE", "The persona ontology does not define a referenced attribute.");
  return reference;
}
function pointerSegments(value) {
  if (typeof value !== "string" || value.length > 2e3 || value !== "" && !value.startsWith("/") || /~(?![01])/.test(String(value))) fail("Use a valid JSON pointer.");
  const parts = value === "" ? [] : value.slice(1).split("/").map((key) => key.replace(/~1/g, "/").replace(/~0/g, "~"));
  if (parts.some((key) => ["__proto__", "constructor", "prototype"].includes(key))) fail("Unsafe JSON pointer.");
  return parts;
}

// server/src/shared/persona-outcomes.ts
var record = (v) => v && typeof v === "object" && !Array.isArray(v) ? v : {};
function readOutcomePath(root, path) {
  return path.reduce(
    (value, key) => ["__proto__", "prototype", "constructor"].includes(key) ? void 0 : record(value)[key],
    root
  );
}
function validateRoiMonitoring(value) {
  if (value === null) return [];
  const c = record(value);
  const issues = [];
  const number = (v, min, max, integer = false) => typeof v === "number" && Number.isFinite(v) && v >= min && v <= max && (!integer || Number.isInteger(v));
  if (c.schemaVersion !== 1 || typeof c.enabled !== "boolean")
    issues.push("schemaVersion must be 1 and enabled must be a boolean.");
  if (typeof c.profileId !== "string" || !/^[a-z0-9][a-z0-9-]{0,63}$/.test(c.profileId))
    issues.push("A stable profileId is required.");
  if (typeof c.label !== "string" || !c.label.trim() || c.label.length > 150)
    issues.push("A short dashboard label is required.");
  if (!Array.isArray(c.calculatorPath) || c.calculatorPath.length < 1 || c.calculatorPath.length > 8 || c.calculatorPath.some(
    (k) => typeof k !== "string" || !/^[a-zA-Z][a-zA-Z0-9]*$/.test(k) || ["constructor", "prototype", "__proto__"].includes(k)
  ))
    issues.push("A safe calculatorPath is required.");
  const metrics = Array.isArray(c.metrics) ? c.metrics.map(record) : [];
  if (!metrics.length || metrics.length > 12 || metrics.some(
    (m) => typeof m.id !== "string" || !/^[a-z][a-z0-9_]{0,63}$/.test(m.id) || typeof m.label !== "string" || m.unit !== "count"
  ))
    issues.push(
      "Define 1\u201312 valid outcome-count metrics. Effort minutes are derived from paired check-ins."
    );
  if (metrics.filter((m) => m.primary === true).length !== 1)
    issues.push("Exactly one primary outcome metric is required.");
  if (new Set(metrics.map((m) => m.id)).size !== metrics.length)
    issues.push("Metric IDs must be unique.");
  const bindings = Array.isArray(c.bindings) ? c.bindings.map(record) : [];
  if (!bindings.length || bindings.length > 30 || bindings.some(
    (b) => !metrics.some((m) => m.id === b.metricId) || !(typeof b.commandId === "string" && /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,100}$/.test(b.commandId) || record(b.workflowRef).kind === "workflow" && /^workflow\.[a-zA-Z0-9._-]+$/.test(String(record(b.workflowRef).resourceKey || ""))) || !["pipeline_stage", "execution_completed", "activity_occurrence", "lifecycle_event"].includes(String(b.source)) || typeof b.requiresAcceptance !== "boolean" || b.source === "pipeline_stage" && (!Array.isArray(b.stageIds) || !b.stageIds.length) || ["execution_completed", "lifecycle_event"].includes(String(b.source)) && !b.requiresAcceptance
  ))
    issues.push(
      "Bindings require stable workflow refs, known metrics, and explicit acceptance for execution outputs."
    );
  for (const b of bindings)
    for (const field of [
      ...Array.isArray(b.stageIds) ? b.stageIds : [],
      ...Array.isArray(b.evidenceFields) ? b.evidenceFields : []
    ])
      if (typeof field !== "string" || !/^[a-zA-Z0-9_-]+$/.test(field))
        issues.push(
          "Evidence and stage names must be simple field identifiers."
        );
  for (const b of bindings) {
    for (const k of [
      ...Object.keys(record(b.evidenceEquals)),
      ...b.statusField ? [b.statusField] : []
    ])
      if (typeof k !== "string" || !/^[a-zA-Z][a-zA-Z0-9_]*$/.test(k))
        issues.push("Invalid evidence condition field.");
    if (Object.values(record(b.evidenceEquals)).some((v) => typeof v !== "string"))
      issues.push("Evidence comparisons must be literal strings.");
  }
  if (new Set(
    bindings.map(
      (b) => JSON.stringify([
        b.commandId || record(b.workflowRef).resourceKey,
        b.runtimeSource || b.ledgerSource,
        b.source,
        b.metricId
      ])
    )
  ).size !== bindings.length)
    issues.push("A workflow must map to each metric only once.");
  for (const b of bindings)
    if (!Array.isArray(b.evidenceFields) || !b.evidenceFields.length)
      issues.push("Every binding requires committed output evidence.");
  for (const b of bindings) {
    if (b.runtimeSource !== void 0 && (b.runtimeSource !== "operator" || b.source !== "execution_completed" || b.ledgerSource)) issues.push("Operator bindings require execution-completed semantics.");
    if (b.ledgerSource !== void 0 && (b.ledgerSource !== "purchase" || b.source !== "pipeline_stage")) issues.push("Purchase ledger bindings require pipeline-stage semantics.");
    if (b.ontology !== void 0) {
      try {
        validateOntologyReferenceShape(b.ontology);
      } catch {
        issues.push("Invalid outcome ontology projection.");
      }
      if (b.identityAttribute !== void 0 && !Object.prototype.hasOwnProperty.call(record(record(b.ontology).fields), String(b.identityAttribute))) issues.push("Outcome identity must be a projected ontology attribute.");
    } else if (b.identityAttribute !== void 0) issues.push("Outcome identity requires an ontology projection.");
  }
  if (c.valuation !== void 0) {
    const v = record(c.valuation);
    if (typeof v.currency !== "string" || !/^[A-Z]{3}$/.test(v.currency) || !metrics.some((m) => m.id === v.timeMetricId)) issues.push("Valuation requires an ISO currency and an existing time metric.");
    if (!bindings.filter((b) => b.metricId === v.timeMetricId).every((b) => b.ontology)) issues.push("Valued outcomes require an ontology projection.");
    const rules = Array.isArray(v.amountRules) ? v.amountRules.map(record) : [];
    if (v.amountRules !== void 0 && (!Array.isArray(v.amountRules) || rules.length > 12)) issues.push("Use at most 12 amount rules.");
    if (new Set(rules.map((x) => x.id)).size !== rules.length) issues.push("Amount rule identifiers must be unique.");
    for (const rule of rules) {
      const matches = bindings.filter((b) => b.metricId === rule.metricId);
      if (typeof rule.id !== "string" || !/^[a-z][a-z0-9_]{0,63}$/.test(rule.id) || typeof rule.label !== "string" || !rule.label.trim() || !number(rule.scale, 1e-6, 1e6) || !matches.length || !matches.every((b) => [rule.baselineAttribute, rule.actualAttribute, rule.currencyAttribute].every((k) => typeof k === "string" && Object.prototype.hasOwnProperty.call(record(record(b.ontology).fields), k)))) issues.push("Amount rules require projected ontology attributes, a label and explicit scale.");
    }
  }
  const q = record(c.questions);
  if (["baseline", "preparation", "review", "useful"].some(
    (k) => typeof q[k] !== "string" || !q[k].trim() || q[k].length > 500
  ))
    issues.push("All four check-in questions are required.");
  if (q.people !== void 0 && (typeof q.people !== "string" || !q.people.trim() || q.people.length > 500))
    issues.push("The optional household question must be a non-empty label.");
  const checks = record(c.checkIns), signals = record(c.signals), calibration = record(c.calibration);
  if (!number(checks.initialCount, 0, 10, true) || !number(checks.intervalDays, 1, 90, true))
    issues.push("Invalid check-in cadence.");
  if (!number(signals.negativeMinutes, 0, 1440) || !number(signals.assumptionDifferencePercent, 1, 100))
    issues.push("Invalid signal thresholds.");
  if (typeof calibration.enabled !== "boolean" || !number(calibration.pairedOutcomes, 2, 1e4, true) || !number(calibration.runners, 2, 1e3, true) || !number(calibration.windowDays, 7, 365, true) || !number(calibration.completionRate, 0.5, 1) || !number(calibration.intervalDays, 7, 90, true))
    issues.push("Invalid calibration eligibility.");
  return [...new Set(issues)];
}

// server/skills/chat-app-builder/scripts/roi-monitoring-validator.ts
var [configPath, ontologyPath] = process.argv.slice(2);
if (!configPath || !ontologyPath) throw new Error("Usage: node scripts/validate-roi-monitoring.cjs assets/chat-config.json assets/ontology.json");
var config = JSON.parse(import_fs.default.readFileSync(configPath, "utf8"));
var monitor = config.publishedConfig?.roiMonitoring;
if (!monitor?.enabled) throw new Error("ROI monitoring must be enabled for this measurement check.");
var errors = validateRoiMonitoring(monitor);
if (readOutcomePath(config.publishedConfig?.landingPage, monitor.calculatorPath) === void 0) errors.push("ROI calculatorPath does not resolve to the public landing model.");
var ontology = validatePersonaOntology(JSON.parse(import_fs.default.readFileSync(ontologyPath, "utf8")));
var models = [ontology];
for (const scope of [ontology.localization, ...ontology.localization?.regions || [], ...ontology.localization?.personalizations || []]) {
  if (scope?.definition) models.push({ ...ontology, ...scope.definition });
  for (const variant of Object.values(scope?.variants || {})) models.push({ ...ontology, ...variant.definition });
}
for (const model of models) for (const binding of monitor.bindings) {
  if (binding.commandId && !config.publishedConfig?.agentTopology?.slashCommands?.some((command) => command.enabled !== false && (command.id || command.trigger) === binding.commandId)) errors.push(`Outcome command ${binding.commandId} is not enabled in this persona.`);
  if (!binding.ontology) {
    errors.push("Every measured output must map to a parent ontology entity.");
    continue;
  }
  try {
    validateOntologyReference(model, binding.ontology);
  } catch (error) {
    errors.push(error.message);
  }
}
if (errors.length) throw new Error([...new Set(errors)].join("\n"));
console.log(`ROI monitoring, ${models.length} ontology models and the landing calculator are valid.`);
