---
name: digital-twin-page
description: Maintain git-backed AI Persona state and release quality via assets/chat-config.json and assets/persona-evals.json. Covers display profile, published AI config, traceability, functional evals, and candidate-gated activation. Embed appearance moved to assets/embed-config.json.
---

# AI Persona Skill
## Persona operating framework

Read [the source-to-outcome contract](references/persona-framework.md) when
connecting domain evidence and actions. Ontology supplies stable semantics;
Persona Data Feeds acquire validated JSON; Signals explain a change and prepare
declared playbooks; human approvals control effects; accepted outcomes and
attributed cost drive ROI. Keep definitions in model repositories and private
runtime state outside portable Git. Discover `persona-framework`,
`persona-data-feeds`, `persona-signals`, `persona-playbooks`, `persona-ontology`
and `persona-roi` through `gabriel_get_skill_instructions`; load the topics
relevant to the requested work.


Persona landing content is model-owned, including subtitles, navigation, every
audience tab, prototype messages, artwork references, sample data, form options and
initiation prompts. Keep it in the bound landing child and mirror it into
`publishedConfig.landingPage`; do not add persona English fallback/default copy in
platform components. Read the landing-page-builder model-owned content contract,
then generate/validate split language assets with landing-page-translations before
publishing a copy change. Preserve option IDs, operational commands and policy
boundaries. The platform template supplies layout and interactions only.

When creating or updating a landing page, preserve its default-enabled coding-agent
entry point. Follow the landing builder's [required Try with Agents contract](../landing-page-builder/SKILL.md#coding-agent-entry-point-required)
for hero/mobile placement, shared localization, workspace-aware setup and public-page
eligibility. A custom presentation must render the shared button; portable config
alone cannot add a control omitted by its renderer. Disable `landingPage.agentAccess`
only when the user explicitly requests it.

For authenticated persona workspace creation, switching, sharing, or agent setup, load the gateway skill topic `persona-workspaces` (canonical [`Persona Workspaces`](../persona-workspaces/SKILL.md)). Keep `personaWorkspaceId` separate from business/harness IDs. Each explicitly created owned workspace gets author-owned definition branches and private runtime bindings. Invitees join the existing workspace; joining creates no copy or branch, and it becomes their default only when none existed. Owner-only definition/member management, private Coach/profile/memory, owner-funded execution and workspace-scoped ROI are required. Keep the standard dashboard/sidebar composition.

Follow the [workspace validation and packaging contract](../persona-workspaces/SKILL.md#validation) for real browser/API isolation checks, Docker shared-module inputs and explicit reporting of untested delivery/model paths.


## Public persona links

For user-facing handoff, use the `publicUrl` returned by `gabriel_create_page`,
`gabriel_publish_twin`, `gabriel_update_page_profile` or the persona entry in
`gabriel_list_resources`. Its canonical route is `/persona/<slug>`, for example
`https://gabrieloperator.com/persona/victor`. Use the saved `pageSlug`, never a
database id, in public links. A null `publicUrl` means the author must choose and
save a human-readable `pageSlug` through `gabriel_update_page_profile`; do not
invent a fallback URL. Page ids remain valid API lookup parameters. Report a
persona as published only after its publish operation succeeds.

## AgentCard policy

Author global `publishedConfig.agentCardPolicy` in the Identity section: `enabled`, `cardSource` (`runner` or `author`), `requireHumanApproval: true`, and `restrictions`. Opt in each purchase slash command with `agentCard: { enabled: true, restrictions: {} }`. Restrictions support `maxAmountMinor`, `currencies`, `allowedMerchants`, `deniedMerchants`, and `allowRecurring` (default false). Command/runner rules only narrow the global policy. Card attachment and encrypted credentials live in runtime bindings, never this repository. Every purchase must use the workflow-builder `agent_card` node and mandatory human approval.

## Offline-first contract

Read [the embedded runtime contract](references/offline-runtime-v1.md). Portable Persona Git assets remain definitions only. Offline preparation may copy authorized definitions and knowledge into encrypted device storage, while chat, records, runs, checkpoints, conflicts, device preferences, and secrets remain runtime state. Validate nested playbook dependencies and publish their capability report with the prepared pack.

## Portable Git contract (schema v2)

Author new and cross-environment persona assets with stable model identity:

```json
{
  "schemaVersion": 2,
  "resourceKey": "persona.example",
  "publishedConfig": {
    "agentTopology": {
      "slashCommands": [{
        "trigger": "/run",
        "workflowRef": { "kind": "workflow", "resourceKey": "workflow.example.run-v2" }
      }]
    }
  },
  "pageProfile": {}
}
```

- Never write `pageId`, `userId`, `commandId`, `automationId`, `actionId`, or any other database identifier into a portable Git definition.
- Register the portable bundle in `references/registry.json` schema v2. It contains **exactly one Pipeline, one or more domain Lists, and one Workflow for each distinct `workflowRef`**. Commands may share a Workflow entry. Every `workflowRef` must resolve, every Workflow row must be referenced, every List must reference the shared Pipeline, and at least one Workflow must reference that Pipeline; other Workflows may be Pipeline-independent. Every entry requires `kind`, `resourceKey`, repository URL, declared branch, asset path, an immutable `revision`, and the SHA-256 `definitionFingerprint` of the referenced JSON definition. Do not add `team_agent`, `primary`, or `dependsOn` here — extra authoring repos belong in generated `references/workspace.json`.
- `revision` and `definitionFingerprint` are owned by **workspace publish**, which recomputes both and writes them with the matching gitlinks in one validated root commit. Run `node scripts/publish-workspace.js publish` (or Gabriel **Publish workspace**); do not hand-edit them. Creating a child repository in Gabriel only marks the workspace dirty — nothing else advances the persona lock, so a pin stays on its last published commit until you publish. Never point a fingerprint at a moving branch alone.
- The two publishers pin from different sources, deliberately. `scripts/publish-workspace.js` pins the commit **checked out** in each submodule, because that is what you built and tested in this clone. Gabriel's server publish has no working tree and pins each child's **branch head**. After you commit and push a child they agree; they differ only when a submodule is intentionally held on an older commit.
- A submodule sitting **behind its declared origin branch** is a normal pin and does not block publish. Publish fetches `refs/heads/<branch>` and requires the checked-out SHA to be its ancestor. A missing branch, wrong origin, commit from another branch, or local-only commit blocks publish.
- Treat `resourceKey` as stable model identity. Gabriel allocates local page/action IDs during import and stores them only in environment-local bindings and runtime records.
- Keep logical command triggers and workflow task/stage IDs stable; these are model identifiers, not database identifiers.
- Run the portability validator before publishing. An unresolved dependency must fail before the Persona is activated; never guess a local ID.
- Legacy schema v1 is same-environment compatibility only. Do not copy it between environments and do not create new v1 exports.

## Persona quality contract

`assets/persona-evals.json` supports legacy schema v1 and explicitly upgraded schema v2. Read [v2 authoring](references/persona-quality-v2.md) for approved skill benchmarks, persona journeys, evidence and bounded improvement. It is the Git-backed specification, traceability map, and functional scenario contract for this exact Persona workspace. It is independent from structural JSON validation:

- **Structure** proves that schemas, refs, child pins, stages, guards, mappings, and orchestration are connected correctly.
- **Specification coverage** proves that confirmed business requirements map to real implementation elements and reciprocal eval cases.
- **Functional behavior** runs the production command, Task Execution, Canvas, workflow, approval, list, and pipeline runtime with isolated resources and deterministic connector fixtures.
- **Live integrations** are optional smoke runs using real credentials and normal human approvals. They never count toward production readiness.

Minimal shape:

```json
{
  "schemaVersion": 1,
  "requirements": [{
    "id": "buyer-financing-required",
    "category": "business_rule",
    "description": "A buyer cannot become qualified without financing status.",
    "implementedBy": [
      { "kind": "list_column", "resourceRef": "list.buyers", "selector": "financingStatus" },
      { "kind": "pipeline_guard", "resourceRef": "pipeline.buyer-qualification", "selector": "financing-required" }
    ],
    "verifiedBy": ["qualify-buyer-golden", "qualify-buyer-missing-financing"]
  }],
  "suites": [{
    "id": "production-readiness",
    "requiredForProduction": true,
    "mode": "mock",
    "cases": []
  }]
}
```

Locators are typed data, never executable grader code. Deterministic assertions cover execution status, task sequence, decisions, tool calls/forbidden calls, output text/JSON paths, list records, pipeline stages, artifacts, and no-external-side-effect proof. Subjective `rubric` assertions are advisory in v1 and cannot block production.

Completeness requires an outcome for every enabled workflow-backed command, all required inputs and declared outputs, every required list field, every pipeline stage, positive and negative guard paths, approval and rejection paths, mutation field assertions, and approval/rejection/no-side-effect coverage for destructive external steps. Include at least one golden, incomplete-input, and adversarial case. Renamed or deleted implementation elements fail resolution.

Mock cases receive temporary private copies of bound lists, pipelines, and record collections. Exact local resource ids are remapped only inside the trusted eval context. Internal state transitions run for real; declared connector responses replace external dispatch, and an undeclared external action fails before dispatch. Resources are hidden from ordinary list/pipeline queries, cleaned after the case, and carry expiry metadata for interrupted runs. Runs are sequential per Persona. A case may declare `"runAs": "author" | "subscriber"`; missing means legacy author execution. Subscriber runs resolve definitions as the Persona owner but execute chat commands, Canvas, approvals, lists, pipelines, outputs, memory, and artifacts as a page-bound managed subscriber with no login, billing, credits, notifications, discovery, or ordinary subscription analytics. Subscriber candidates and runs record the platform subscriber-policy version; a policy change makes prior subscriber evidence stale and requires a new candidate.

Run `node scripts/validate-persona-evals.js` for repository-level contract checks. Gabriel performs the authoritative pinned-workspace validation and offers the same lifecycle through the Quality UI and Gateway tools:

- `gabriel_get_persona_evals`, `gabriel_update_persona_evals`, `gabriel_validate_persona_evals`
- `gabriel_get_persona_readiness`
- `gabriel_run_persona_evals`, `gabriel_get_persona_eval_run`, `gabriel_list_persona_eval_runs`, `gabriel_cancel_persona_eval_run`

An update uses optimistic `expectedHeadSha`, modifies only `assets/persona-evals.json`, and invalidates the previous candidate. Workspace publish creates a candidate containing the root SHA and every relevant fingerprint. Live publish materializes that evaluated Git candidate and is centrally gated on current-head equality, structural pass, coverage pass, required mock-suite pass, and Git/database parity. Any root, child pin, suite, requirement, model, runtime, registry, or workspace change makes earlier results stale. Only audited platform-admin break glass may bypass an enforced gate.

For legacy v1 personas, Quality control is opt-in through `publishedConfig.qualityControlConfig.enabled === true`. Missing or false means the seventh **Quality** tab, the owner-only live/mobile Quality views, and release gating remain disabled; this preserves legacy Persona behavior. Enable it from the create/edit Persona **Features** tab. Subscriber testing is a separate nested opt-in: `subscriberSimulationEnabled` is effective only when the parent is enabled, defaults to false, and must be written back as false when Quality is disabled. When both are enabled, every subscriber-facing command needs a required mock subscriber case and **Subscriber experience** becomes a release dimension. Owners also receive `Viewing as: Author | Subscriber simulation` in the Persona header. The preview uses a one-time, owner/page/candidate-bound session and never creates an impersonation login. Plain-text free exploration uses the exact candidate prompt/model in a tool-free subscriber lane; configured Operator and Canvas commands use fresh isolated list/pipeline copies, declared fixtures, and the production executor. Free exploration is mock-only and never satisfies readiness. Gateway tools may run `runAs: subscriber` cases but never accept actor ids or create browser previews. The Quality overview separates the persona benchmark from its skills. Each detail screen contains Tests, Definition of Ready, Definition of Done and History. V2 release enforcement survives disabling the display toggle. The same owner-only tab appears in the live Persona experience and links each case to Canvas. Visitors never see eval controls or data. Mobile owners can inspect actor-labelled readiness/history, run or cancel suites, and open Canvas; v1 mobile does not author the specification or interactively impersonate. Inventory-generated requirement prompts are drafts until the owner confirms them.

## Goal
The parent Persona also owns one optional `assets/ontology.json`, with optional context-selected models and terminology, independent of child repositories. Use the `persona-ontology` skill to define stable entity, attribute, and relationship identifiers or validate Data Feed references. Ontologies hold definitions only; existing Lists/JSON/Mongo and state-machine mutations remain unchanged. Legacy personas may omit the file.

Maintain one AI Persona configuration per repository. The `assets/chat-config.json` file is the source of truth for the page's **display profile** (`pageProfile`: title, description, avatar, banners, tags, taxonomy) and **published AI runtime** (`publishedConfig`: assistant name, prompts, voice, connectors, tools, etc.) when a git repository is connected.

Embed appearance is no longer owned by this file. For hero copy, themes, backgrounds, public about panels, conversion blocks, and widget appearance, use the separate embed config skill and edit `assets/embed-config.json`.

When `publishedConfig.landingPage` is present, its schema-version-2 `localization` object is authoritative for public translation and country-specific full-page variants. It is required on newly created landing pages and optional only when reading legacy pages. `localization.translation` contains `enabled`, `sourceLanguage`, `defaultLanguage`, optional `autoDetectCountryLanguage` (default true), and platform-generated `generatedTranslations`; `localization.regionalPages[]` contains a unique key/label, unique uppercase ISO alpha-2 country assignments, a regional default language, and a complete landing page under `page` with no nested `localization`. Market-managed regions additionally own `sourceLanguage` and a `marketContext` containing locale, canonical source asset path, context revision, protected glossary terms, and evidence. Automatic country language selection uses the server-resolved request-IP country and CLDR likely-language data, while a matched regional default remains authoritative. Generated translations are a source-revisioned manifest: base copy is stored as `assets/landing-page.<language>.json`, while new market translations live at `assets/markets/<country>/landing-page.<language>.json`; runtime reads only the selected asset. New entries advertise `assetSchemaVersion: 2`; each v2 asset indexes translated paths by original source hash so unchanged copy can be safely rebased after an authored edit. A market asset may be reused only when its context revision still matches. Matching or safely reusable entries are served before visitor quota, and only genuinely changed strings reach the provider. The landing-page-builder repository remains the authoring source and its existing publish workflow mirrors the manifest and language files into this parent repository. Legacy inline cache entries, exact version-1 assets, flat regional paths, and `chatEmbedConfig.translationEnabled/defaultLanguage` remain read-compatible. Never author quota values, visitor identities, IP addresses, or manual visitor region overrides in Git. Do not hand-invent generated translation revisions or paths; use the platform flow or validated repository tooling.

**Split files are the write contract.** `assets/chat-config.json` stores the compact
manifest projection only. A new `generatedTranslations[]` entry must have `assetPath`
and must not have `page` or `chatEmbedConfig`; those values live in that one asset file.
Never consolidate language files during a Persona sync. When a database projection still
contains inline legacy entries, the Git writer must externalize them atomically with the
manifest update. Reads may support the legacy shape, but edits and syncs may not produce
it. Runtime must resolve the manifest and fetch only the requested locale asset.

### Create-time defaults (new personas)

When creating a persona or writing a first `assets/chat-config.json`, always persist the keys below. Do not omit them: product fallbacks treat missing `todosConfig` and missing `checkInScheduleConfig.enabled` as **on**.

**Landing-page localization — always on when a landing page is created.** Every
new `publishedConfig.landingPage` must contain this baseline; do not expose localization
as a separate create-time opt-in:

```json
{
  "localization": {
    "translation": {
      "enabled": true,
      "sourceLanguage": "en",
      "defaultLanguage": "en",
      "autoDetectCountryLanguage": true,
      "generatedTranslations": []
    },
    "regionalPages": []
  }
}
```

After the English page is final, and again after every authored page change, use `landing-page-translations` to incrementally refresh and validate
the maintained 37-language cache, mirror the compact manifest and every language asset from
the landing-page child into this parent repository, and commit child first. Keep the settings enabled even if a
provider is temporarily unavailable; report missing cache coverage rather than removing
the localization object. `translateConfig` is a different voice/assistant feature and
must not be enabled as a substitute. Course explainer video and translated narration are persona assets as well. Read `course-video-generation` and `course-video-translations`, and keep those files in the persona repository rather than the operator marketplace.

The required filename is `assets/landing-page.<language>.json`; market content uses
`assets/markets/<country>/landing-page.json` plus one `landing-page.<language>.json` per
non-canonical language. English stays in the authored base
page. Preserve stale assets until the generator has recovered their unchanged copy from
Git history; never delete them and force an avoidable full translation. Before handoff,
reject any newly written manifest entry containing an inline `page`,
run the translation skill's migration mode for legacy entries, and run its `--check`.
For jurisdiction-specific copy or ROI assumptions, read `../landing-page-regions/SKILL.md`; regions
adapt individual sections before translation, and protected region terms must not be translated away.

**Voice Agents — always on, Gemini Live only.** Enable Talk on every new persona and always set the provider to Gemini. Never default to xAI, LiveKit, Vapi, or Vapi Squad.

```json
{
  "voiceAgentEnabled": true,
  "voiceOnlyAgentEnabled": true,
  "voiceProvider": "gemini",
  "geminiLiveModel": "gemini-3.1-flash-live-preview",
  "geminiLiveVoice": "Aoede"
}
```

Also call `gabriel_update_twin_config` with the same keys. Writing them only in this file leaves Configure / owner chat on stale draft Mongo (`voiceAgentEnabled: false`) until a pull.

Do not enable `digitalAvatarAgentEnabled`, `phoneAgentEnabled`, `coachConfig`, `translateConfig`, or `meetingsConfig` unless the user asked.

**Operator slash-command Talk — command-level `voiceAgent`, not only persona Talk.** The Talk / Digital Avatar picker reads `publishedConfig.agentTopology.slashCommands[].voiceAgent`. Persona `voiceAgentEnabled` does not activate an operator. On every operator command you want in Talk, set:

```json
{
  "id": "slash-command-1",
  "trigger": "run",
  "label": "Run",
  "execution": { "type": "operator_action" },
  "voiceAgent": {
    "enabled": true,
    "prompt": "Ask what the user wants, gather the required details, read them back, and confirm before starting."
  }
}
```

A non-empty `prompt` is required. `{ "enabled": true }` with an empty prompt is dropped. Do not rely on `execution.canvas.voiceAgent` for `operator_action` commands.

**To-Dos — always off.** The chat **To-Dos button** is only `publishedConfig.todosConfig.enabled`. Write `{ "todosConfig": { "enabled": false } }`. Never set `voiceAgentEnabled` false to hide To-Dos. Never use `todoConfig`. A boolean `"todosConfig": false` is coerced to `{ "enabled": false }`, but prefer the object form.

**Checkin Mentor is not the To-Dos button.** It is the Calls-menu check-in (`checkInScheduleConfig`). Leave it off with `{ "checkInScheduleConfig": { "enabled": false } }`. That does not hide To-Dos and must not change Talk.

```json
{
  "todosConfig": { "enabled": false },
  "checkInScheduleConfig": { "enabled": false }
}
```

Only turn To-Dos or Checkin Mentor on later if the user explicitly asks.

This skill scope is **chat-config.json**, the portable `references/registry.json` bundle, and the generated authoring graph in `references/workspace.json`. Workflow endpoint bindings and task orchestration for team agents are covered by the **team-agents** skill, which ships inside each linked team-agent repository under `references/team-agents/`. This repository owns the *depth-1 gitlink*; the team-agent repository owns its definition. Team agents are **not** portable registry rows. See **Linked repositories** below.

**Slash-command debug/docs are out of scope here.** Do not create or edit `assets/slash-connections/` (or any slash-command connection debug graphs) in this repository. Those live in each command's bound **workflow** repository as `assets/slash-connections.json`, owned by the **workflow-builder** skill (`server/skills/workflow-builder/`). Runtime registration of slash commands (`publishedConfig.agentTopology.slashCommands`: trigger, label, enabled, action linkage) still round-trips in `chat-config.json` when present — that registration is not the debug graph.

### Never author page/master-skill Canvas

The page-backed Canvas mode (`blueprintRef: "page"`) and its page-level master-skill
dependency are deprecated compatibility code. Coding agents must never add a master
skill or `taskExecutionBlueprint` merely to make an Operator slash command run.

Canvas task definitions belong to the command's workflow repository. There they must
use `blueprintRef: "inline"` in every Canvas capability and terminal aggregate. Stable
identity belongs in `canvasTask.sequenceId`; never put a page id, sequence id, product
name, or other custom string in `blueprintRef`. This page repository owns only slash
command registration and must not duplicate the Canvas task catalog.

For a default first-use command, keep the command enabled and use
`launchPolicy.invocationPolicy: "first_use"`, `autoOpenIntake: true`, a bumped
`commandVersion`, and `firstUseCompletion: "execution_started"`. Only one
automatic command is allowed per persona. The command must use the standard
`operator_action` workflow path; never add page-level form discovery, direct
submission tools, acquisition recipes, or Canvas task definitions here.

Existing-case identity is also outside Persona configuration. Do not add a locator
column, URL-normalization rule, `existingCasePolicy` object, or questionnaire
prefill toggle to `assets/chat-config.json` or the slash-command details UI. The
command's workflow Canvas references a stable `existingCasePolicyId`; the selected
Pipeline owns and configures that policy under **Pipeline → Manage → Config →
Existing-case detection**. Changing `form_url` to another resource locator
therefore belongs to the Pipeline and its bound List schema, not to
`PersonaOperatorSlashCommandsPanel`.

### Canvas questionnaires (`channels_only`)

Form-fill slash commands (`/fill`, `/capture-and-fill`, and custom Canvas Collect
tasks) pause on a `channels_only` questionnaire. Runtime — not this file —
presents **Answer here**, **Talk**, and **Chat**:

- **Answer here** is the trusted inline form.
- **Talk** is `in_app_voice` when the workflow lists it in `allowedChannels`.
- **Chat** is `in_app_chat`: Canvas starts a new session titled **Questionnaire**,
  closes the Canvas sheet, and uses a questionnaire-only agent (trusted questions
  plus preview/answer tools, no persona tools). After answers, Canvas reopens for
  Confirm and continue. This is not general Persona chat and must not be
  registered as a slash command, Chat app, or `allowedChannels` value.

Persona Chat apps configured in the Identity/Reach editor may still be reused as
**runner channels** for the same Collect task. That use is runner-specific: it
requires the authenticated runner's linked external identity and sends a
single-use questionnaire URL scoped to one Canvas decision. It must not inject
the questionnaire or its answers into the Persona's general chat conversation.
The runner channel list belongs to the workflow task (`allowedChannels`:
`in_app_voice`, `phone`, `email`, `persona_channels`). `chat-config.json`
continues to own only the normal Chat app configuration and slash-command
registration.

The authenticated Chat App definition is authored separately in
`assets/chat-app.json` and mirrored exactly into `publishedConfig.chatApp` while
preserving `publishedConfig.chatAppRef.resourceKey`. New and updated persona
journeys should set `chatApp.experience.sessionMode` to `"stepper"` unless the
user explicitly requests legacy transcript-first behavior. Stepper mode keeps
new, resumed, edited, and completed sessions in the guided renderer on web and
native. Its current step, answers, uploads, preview token, and terminal state are
server-owned runtime data keyed to the authenticated chat session; never write
them into this repository. Reopening a completed session must show its final
confirmation and next actions without executing or claiming it again.

For a Signals destination, keep its `source: "workspace"`, `provider:
"automations"` data point and optional `signalPresets` identical in both files.
Each preset is a disabled portable template and may contain only a stable id,
title/description, a portable list resource key, and a declared command action
id. Runtime automation ids, enabled state, schedules, observations, audit
history, credentials, and runner records are never stored in this repository.
After changing the Chat App through Gateway, patch the complete validated
definition with `gabriel_update_twin_config` and mirror the same definition in
Git; after a Git-first edit, follow the normal sync/publish path.

Questionnaire draft prefill is also runtime. When Collect starts, Canvas
suggests answers from, in order: a prior List row for this form (Pipeline
`existingCasePolicies`, including a silent lookup), the signed-in user's
profile, then conversational memory when `publishedConfig.memoryConfig.provider`
is not `none`. Low-confidence memory never writes into the form. Leave
`memoryConfig` as `inherit` or an explicit Honcho/Mem0 provider for form-fill
personas unless the user wants memory off. Do not author prefill mappings,
profile field lists, or Honcho queries in this repository — see
**workflow-builder** Rule 4 and **pipeline-builder** Collect.

## Using this skill in coding agents

Gabriel Operator skills are designed for Claude Code, Codex, Cursor, Hermes, OpenClaw, and any agent that supports skill packs. Work in the git-backed AI Persona repository connected to your Gabriel page.

### Install the skill pack

| Agent | Install |
|-------|---------|
| **Claude Code** | `npx skills add go-code-bot/go-digital-twin-page-skills` |
| **Codex** | `codex plugin marketplace add Gabriel-Operator/gabriel-operator-coding-agent-plugin --sparse .agents/plugins` then install the Gabriel Operator plugin |
| **Cursor** | `npx github:go-code-bot/go-digital-twin-page-skills add ./my-digital-twin-page` or copy into `.cursor/skills/digital-twin-page/` |
| **Hermes / generic CLI** | `npx github:go-code-bot/go-digital-twin-page-skills add ./my-digital-twin-page` |
| **OpenClaw** | `npx skills add go-code-bot/go-digital-twin-page-skills` then `openclaw gateway connect --url https://your-openclaw-gateway` |
| **Gabriel Operator monorepo** | `cp -R server/skills/digital-twin-page ./your-git-repo/` |

Alternative curl installer:

```bash
curl -fsSL https://raw.githubusercontent.com/go-code-bot/go-digital-twin-page-skills/main/install.sh | bash
```

### Modify with your coding agent

1. Clone the persona repository and run `git submodule update --init`.
2. Read `references/workspace.json` (generated authoring graph) and `references/registry.json` (portable Workflow + Pipeline + List only).
3. Edit the **owning child** repository — `assets/chat-config.json` here, or the matching submodule under `references/`. Do not hand-edit `workspace.json`.
4. Preserve `schemaVersion: 2`, `resourceKey`, portable refs, and logical command identities. Never add a local `pageId`, `appId`, `endpointId`, or `actionId` to Git.
5. Commit and push **the child first**. Then publish the workspace lock:

```bash
node scripts/publish-workspace.js validate
node scripts/publish-workspace.js publish
```

6. Validate `assets/persona-evals.json`, publish the workspace candidate, run required mock suites, and repair/re-publish/re-run after any failure. Only then offer live activation. A successful workspace publish alone is not production readiness.

A failed validate leaves the currently published persona root untouched. Publish is
all-or-nothing: it plans the pinned registry and manifest in memory, and if any
step fails — including the commit itself — it restores `HEAD`, the index, and the generated
files rather than leaving the tree half-written.

**Every child must be a clean, published checkout.** Publish refuses a child with
uncommitted changes, no `origin`, or a commit that exists only in your clone. A pin sitting
*behind* origin is fine — that is what a pin is; only unpushed commits block, because nobody
else could resolve them.

**Validation is split by trust.** New scaffolds declare their validator scripts in the
root `gabriel.workspace.json`; only the fixed `node` and `tsx` runners are accepted.
When one repository intentionally contains more than one portable kind, the manifest may
declare a `resources` array with one `{ kind, scaffold, validators }` group per kind; the
publisher selects and requires the group matching each workspace node.
Locally, each child's declared validators run
(`validate-pipeline.js`, `validate-list.js` plus `validate-records.js` when the list has
rows, `validate-workflow.ts`, and both `validate-team-agent.ts` and
`validate-task-orchestration.ts`), because you already trust your own clone. A malformed
marker, wrong kind, or missing required script/asset fails. An unmarked legacy repository
runs the conventional validator when present and propagates failures; if none exists it
continues with a prominent compatibility warning. `SKILL.md` is not a scaffold marker.
`scripts/validate-portable-bundle.js` additionally checks the whole
Persona → Workflow → Pipeline → List chain, not just each file's header. The server never
executes child scripts — it performs the equivalent structural checks on JSON read at the
pinned revision.

### Removing a repository from the workspace

`status` reports stale managed links. `validate` and `publish` refuse them until you run:

```bash
node scripts/publish-workspace.js prune
```

`prune` validates the prior generated node, direct kind path, mode-160000 tree/index entry,
`.gitmodules` path and canonical URL, and exclusion from the current graph and portable
registry before changing anything. It removes only the gitlink and matching `.gitmodules`
section in one rollback-safe commit. The physical checkout is always preserved, including
when it contains untracked or unpushed work.

### Working across the whole graph

One clone reaches every definition and every skill pack, so a change that spans the
Pipeline, its List, and the Workflow that maps between them can be written and validated
in a single working tree:

```bash
git clone <persona-repo> && cd <persona-repo>
git submodule update --init
```

1. Read the child `SKILL.md` for whichever asset you are editing — each submodule ships
   its own skill pack (`references/pipelines/*/SKILL.md`, `references/workflows/*/SKILL.md`
   with its `actions/` guides, `references/team-agents/*/SKILL.md` with its `nodes/` guides).
2. Make the change in the child repository that owns the definition. Keep the linked
   assets consistent as you go: a Pipeline column that a Workflow maps into must exist in
   the bound List schema too.
3. Run each child's validator before committing (`node scripts/validate-pipeline.js`,
   `node scripts/validate-list.js`, `npx tsx scripts/validate-workflow.ts`).
4. **Commit child-first, then publish the workspace.** Commit and push inside each submodule. Then run `node scripts/publish-workspace.js publish` so this repository's gitlinks, `workspace.json`, and portable fingerprints advance in **one** root commit. Do not hand-bump `revision` rows or treat a persona-root commit as an atomic multi-repo publish.
5. Extra workflows and team agents live in generated `references/workspace.json`. They are same-environment authoring. Cross-environment import materializes only the registry Workflows plus its single Pipeline and List.

A single working tree is what this buys you — not atomic commits across remotes. Changing a Pipeline and its Workflow together is still two child commits plus one workspace publish here.

**Example prompts:**
- *"Update the twin's system prompt and first message for a grocery-shopping persona."*
- *"Change the page title, description, and profile picture URL in pageProfile."*
- **OpenClaw:** *"Clone the persona, run git submodule update --init, read workspace.json, edit the owning child, commit and push that child, then run node scripts/publish-workspace.js publish."*

### Sync to Gabriel

1. Commit and push `assets/chat-config.json` to the default branch.
2. Gabriel pulls the file into the live page database projection automatically on sync, or use **Sync to Git** from the AI Persona Git binding modal in the UI.
3. For edits made in the UI first, use **Sync to Git** to push the current database state back to the repository.

**Optional — run via dedicated computer or managed agents:** When `computerConfig` is enabled or a supervisor has a sandbox provider configured, your twin can execute skill mentors in a sandbox harness. See **Dedicated Computer** and **Gemini Antigravity Managed Agents** below for runtime paths; those are triggered from Gabriel after config sync, not from local CLI alone.

## Canonical Files
- `/SKILL.md`
- `/README.md` — human overview; **installation** via `npx` / `curl` / `install.sh` (same pattern as `server/skills/team-agents/`)
- `/cli.js`, `/install.sh`, `/package.json` — optional CLI pack to scaffold this tree into another repo (publish `go-digital-twin-page-skills` or copy from monorepo)
- `/scripts/`
- `/references/` — linked repositories, as git submodules (see **Linked repositories** below)
- `/assets/chat-config.json` — unified snapshot for profile + publish (this document)
- `/assets/persona-evals.json` — confirmed requirements, typed traceability, deterministic scenarios, and release suites

## Linked repositories (`references/`)

Every repository this AI Persona depends on is linked into `references/` as a **git
submodule**, so one clone reaches the whole workspace — every definition and every skill
pack. Links are written by the product when the author creates the child repository —
never add or edit `.gitmodules` by hand.

```text
references/registry.json               ← portable: distinct workflows + one pipeline + domain lists
references/workspace.json              ← generated depth-1 authoring graph (team agents + extras)
references/README.md                   ← generated from workspace.json
references/chat-config-contract.json   ← machine-readable contract for chat-config.json
references/pipelines/<resource-key>/   ← submodule: pipeline-builder repo
references/lists/<resource-key>/       ← submodule: list-builder repo
references/workflows/<resource-key>/   ← submodule: workflow-builder repo (primary + extras, once each)
references/team-agents/<key>/          ← submodule: git-bound team agents only
```

```bash
git submodule update --init
```

**All links are depth 1.** Every repository — including a team agent's child workflows —
is a direct submodule of this Persona, never a submodule of another submodule, so
`--recursive` is not required and a workflow reached by two team agents appears once.
The dependency *graph* is recorded in generated `references/workspace.json`, not by
directory nesting and not by extra rows on `registry.json`.

Submodule directories are named after the stable **resource key** when portable, or the
git remote slug when the child is workspace-only. The readable name lives in
`workspace.json` and the generated `references/README.md` table.

### Portable registry vs authoring graph

`registry.json` is the **strict portable bundle**. Import materializes its distinct
referenced Workflows plus exactly one Pipeline and every registered domain List. Do not add team agents or
same-environment extra workflows to it.

`workspace.json` is **generated**. Authors and agents do not hand-edit it. Publish
(Gabriel **Publish workspace** or `node scripts/publish-workspace.js publish`) regenerates
it after validation. Failed validation does not write a persona root commit.

```json
{
  "schemaVersion": 2,
  "repos": [
    {
      "kind": "pipeline",
      "resourceKey": "pipeline.example.filer-v2",
      "displayName": "Filer pipeline",
      "path": "references/pipelines/pipeline-example-filer-v2",
      "repositoryUrl": "https://github.com/me/filer-pipeline.git",
      "branch": "main",
      "assetPath": "assets/pipeline.json",
      "revision": "bfef019f3e71d337577a2de75bf3cbea0b12c7fb",
      "definitionFingerprint": "aa9a5793…"
    }
  ]
}
```

`kind` is one of `workflow`, `pipeline`, `list`. Never `team_agent`.

### Team agents

The Persona repository owns a team agent's **depth-1 gitlink** after workspace publish;
the team-agent repository owns its definition (`assets/team-agent.json`,
`assets/task-orchestration.json`) and is edited through the **team-agents** skill in that
submodule.

A team-agent definition still carries environment-local ids (`appId`, `endpointId`, and
`data.config.actionId` on native connector nodes). Those ids stay in Gabriel bindings.
They must never be copied into `workspace.json`. Missing Git binding is an unresolved
workspace row and **blocks publish**. `schema-form:*` pipeline endpoints are built-ins,
not git dependencies.

## Minimal payload example
`/assets/chat-config.json` is a single JSON object. A typical file looks like:

```json
{
  "schemaVersion": 2,
  "resourceKey": "persona.example",
  "publishedConfig": {
    "name": "...",
    "firstMessage": "...",
    "systemPrompt": "..."
  },
  "pageProfile": {
    "title": "...",
    "description": "...",
    "longDescription": "",
    "profilePicture": null,
    "bannerImage": null,
    "bannerType": null,
    "tags": [],
    "category": "",
    "subcategory": ""
  },
  "commitMessage": "Update chat config",
  "updatedAt": 1700000000000
}
```

Optional keys the backend may add or preserve when syncing:
- `endpointSummaries` — informational array (see root keys below).
- `includedAgents` — **deprecated**; do not rely on it for new work.

---

## Chat configuration reference (`assets/chat-config.json`)

Use this section when editing the file by hand, generating patches, or reviewing diffs. **Ground truth in code:** TypeScript type `ChatConfigPayload` in `server/src/services/digital-twin-page-git/types.ts`; `publishedConfig` follows the page’s stored publish payload (same conceptual shape as `DigitalTwinConfig` in `app/routes/teams/$teamSlug/team-workspaces/$unitSlug/components/configureDigitalTwin.types.ts`).

### Validation rules (backend)
- **`schemaVersion`** must be `2` for new portable writers/readers.
- **`resourceKey`** must be the stable model identity. A local page id is resolved during import and never belongs in Git.
- **`publishedConfig`** is stored as a JSON object; unknown nested keys are generally preserved on round-trip unless the product strips them on save.
- **`pageProfile`** on **pull** is filtered to an allowlist and typed (see `pageProfile`); unknown keys are **ignored** for safety.

### Root object — every top-level key

| Key | Required | Purpose |
|-----|----------|---------|
| `schemaVersion` | yes | Portable protocol version; use `2`. |
| `resourceKey` | yes | Stable model-owned persona identity. |
| `publishedConfig` | yes | **Published assistant** runtime: prompts, model, voice, connectors, output integration, etc. (see dedicated section). |
| `pageProfile` | optional on old files; written on new syncs | **Page document display** fields (title, description, avatar, banners, tags) mirrored for git editing. |
| `endpointSummaries` | optional | Non-authoritative list of `{ "id": string, "name": string, "isPrimary"?: boolean }` for UI/diff context. Live workflow endpoints are **not** defined here. |
| `includedAgents` | optional | **Deprecated.** Legacy included agents list; do not build new features on it. |
| `commitMessage` | optional | Human-readable note for the last logical change (convention, not always enforced). |
| `updatedAt` | yes | Unix time in **milliseconds** when this snapshot was written. |

---

### `pageProfile` — every key (allowlisted)

These keys mirror the **public page record**. On sync from DB, all keys are always present for stable diffs. On **pull from git**, only these keys are applied; types must match or the key is skipped.

| Key | Type | What to change |
|-----|------|----------------|
| `title` | `string` | Public page / twin headline (SEO, cards, layout). |
| `description` | `string` | Short description (SEO, summaries). |
| `longDescription` | `string` | Longer plain-text description for the **page**. |
| `profilePicture` | `string \| null` | URL (or null) for avatar / brand image on the page shell. |
| `bannerImage` | `string \| null` | Banner image URL, or null. |
| `bannerType` | `"image" \| "gradient" \| null` | How the banner is rendered when present. |
| `tags` | `string[]` | Discovery / filter tags; only string elements are kept on pull. |
| `category` | `string` | Top-level taxonomy label. |
| `subcategory` | `string` | Secondary taxonomy label. |

**Never put in `pageProfile`:** `pageSlug`, `visibility`, `sharedWith`, credits, owner ids, API keys, Twilio secrets—those stay database-only.

`profilePicture` and `bannerImage` need an existing URL. If you have image bytes instead (a generated avatar, an uploaded file) rather than a URL, call `gabriel_upload_asset` first to get a hosted URL, then write that URL into `pageProfile`.

---

### Embed appearance moved

Do not add or edit `chatEmbedConfig` in `assets/chat-config.json`. It is ignored by new chat-config pulls. Use the embed config repository instead, where every initial and follow-up embed change belongs in `assets/embed-config.json` under `chatEmbedConfig`.

---

### `publishedConfig` — what it is and how it is built

`publishedConfig` in git is the **published** assistant configuration blob stored on the page **plus** a few fields merged from **draft** `vapiAssistantConfig` so they appear in version control.

**Merge rules** (`server/src/services/digital-twin-page-git/chat-config-published-config.util.ts`):
1. Start from the page’s `publishedConfig` document (deep-cloned).
2. If draft `vapiAssistantConfig.outputIntegration.outputTabViewerDefaultsByUserId` exists, copy it onto `publishedConfig.outputTabViewerDefaultsByUserId`.
3. If draft has `webSearchEnabled`, `xSearchEnabled`, or `xSearchAllowedHandles`, copy those keys onto `publishedConfig` so voice/search flags round-trip in git.
4. If draft has `composioEnabledToolkitSlugs`, `formUi`, `chatImageUpload`, `qualityControlConfig`, `agentTopology`, `chatCommandSettings`, `chatCommandModels`, or `multimodalUnderstanding`, copy those keys onto `publishedConfig` so Composio toolkit allowlists, chat UI, Quality opt-in, agent topology, generation commands, and input-understanding providers round-trip in git.
5. `computerConfig` and `emailConfig` are stored directly on the page and always round-trip in `publishedConfig` when present.

When a coding agent **edits git**, treat `publishedConfig` as the same shape the product uses after publish. The authoritative TypeScript interface is **`DigitalTwinConfig`** (`configureDigitalTwin.types.ts`). Below: **every field name** on that interface with a one-line meaning (optional fields marked by “optional” in prose).

#### Core assistant text and model
| Field | Purpose |
|-------|---------|
| `name` | Display name of the published assistant. |
| `voiceId` | Default TTS/voice id for the assistant where applicable. |
| `llmModel` | Chat LLM model id string. |
| `firstMessage` | Opening message users see when a session starts. |
| `systemPrompt` | System / developer instructions for chat behavior. |
| `temperature` | Sampling temperature for the chat model. |
| `language` | Optional locale / language hint for the assistant (e.g. `en`). |

#### Connectors, knowledge, mentors
| Field | Purpose |
|-------|---------|
| `nativeConnectorIds` | Optional list of native (in-product) connector ids enabled for tools. |
| `mcpServerIds` | Optional MCP server ids for tool servers. |
| `knowledgeBaseFileIds` | Attached knowledge base file ids for RAG-style retrieval. |
| `mentorIds` | Mentor ids when mentor routing is used. |
| `mentorSelections` | `{ id, name, icon? }[]` richer mentor picker state. |

#### Task execution blueprint (orchestrated skills)
| Field | Purpose |
|-------|---------|
| `taskExecutionBlueprint` | **Deprecated for Canvas/Operator commands.** Historical page-level master-skill blueprint; do not add it to support new workflows. Existing unrelated legacy records may still round-trip until migrated. |
| `taskExecutionSourcePageId` | **Deprecated for Canvas/Operator commands.** Historical page blueprint inheritance reference; do not author for new workflows. |

#### Voice agent stack (LiveKit / telephony / xAI / Anam)
| Field | Purpose |
|-------|---------|
| `voiceAgentEnabled` | Master switch for voice agent sessions. New personas must set this `true` **and** patch it with `gabriel_update_twin_config` (git-only is not enough for Configure / owner chat). |
| `voiceOnlyAgentEnabled` | Audio-only Talk mode. New personas must set this `true` with Gemini Live. |
| `agentTopology.slashCommands[].voiceAgent` | Operator Talk. `{ "enabled": true, "prompt": "..." }` on the **command** (not only canvas). Empty prompt is ignored. |
| `digitalAvatarAgentEnabled` | Avatar video mode when supported. Leave off on create unless asked. |
| `phoneAgentEnabled` | Telephony integration enabled. Leave off on create unless asked. |
| `callButtonConfig` | Visitor-facing label and icon for the Talk option in the Calls launcher. |
| `phoneCallButtonConfig` | Visitor-facing label and icon for the Phone option in the Calls launcher. |
| `checkInScheduleConfig` | Checkin Mentor in the Calls menu. Not the To-Dos button and not Gemini Talk. Omitted `enabled` means on. New personas must write `{ "enabled": false }`. Do not create this voice agent by default. |
| `checkInScheduleConfig.appearance` | Label and icon for Checkin Mentor (only if the user later enables it). |
| `coachConfig.appearance` | Label and icon for Coach. |
| `translateConfig.appearance` | Label and icon for Translate. |
| `twilioCredentialId` | Reference id to user’s saved Twilio credential (not the secret itself). |
| `livekitBackend` | `"gateway"` or `"xai-realtime"` backend selection. |
| `livekitKeyId` | Saved LiveKit key reference. |
| `xaiKeyId` | Saved xAI key reference. |
| `xaiVoice` | xAI realtime voice id. |
| `xaiVadThreshold` | Voice activity detection threshold. |
| `xaiVadPrefixPaddingMs` | VAD padding milliseconds. |
| `voiceBrowserToolsEnabled` | Allow browser-control tools in xAI realtime voice. |
| `webSearchEnabled` | xAI web search tool (may be merged from draft). |
| `xSearchEnabled` | xAI X/Twitter search tool (may be merged from draft). |
| `xSearchAllowedHandles` | Allowlist of X handles for search (may be merged from draft). |
| `imageAnalysisPrompt` | Custom prompt for image analysis tool. |
| `livekitUrl` / `livekitApiKey` / `livekitApiSecret` | LiveKit connection parameters when stored (prefer credential refs in production). |
| `anamKeyId` / `anamAvatarId` / `anamPersonaName` / `anamApiUrl` / `anamRenderVideo` / `anamVoiceId` / `anamLlmId` | Anam avatar plugin configuration. |
| `ttsModel` / `ttsVoice` / `ttsVoiceCustom` / `ttsLanguage` | Text-to-speech stack. |
| `sttModel` / `sttLanguage` | Speech-to-text stack. |
| `voiceProvider` | Voice stack provider. **Always `"gemini"`** when enabling Talk on a new persona. Never default to `xai`, `livekit`, `vapi`, or `vapi-squad`. |
| `vapiSquadId` / `vapiAssistantId` | Legacy Vapi ids when used. |
| `voiceLlmModel` | Separate LLM for voice path vs chat. |
| `backgroundAudio` | Ambient loop: `none`, `office`, `cafe`, `nature`. |

#### Providers and browser
| Field | Purpose |
|-------|---------|
| `browserProviderId` | Browser automation provider for goals/workflows. |
| `guardianRequirements` | Guardian policy requirements (browser, sites, credential types). |
| `geminiProviderId` | Gemini File Search provider id. |
| `geminiLiveProviderId` / `geminiLiveModel` / `geminiLiveVoice` / `geminiLiveWebSearchEnabled` | Gemini Live realtime voice configuration. New personas: `geminiLiveModel` `"gemini-3.1-flash-live-preview"`, `geminiLiveVoice` `"Aoede"`. |
| `xaiProviderId` | xAI File Search provider id. |
| `mem0ProviderId` | mem0 memory provider id. |
| `jarvisMode` | Optional `{ "enabled": boolean, "localComputerControl": boolean, "preferredTransport": "runner-choice" \| "realtime" \| "local-hybrid" }`. Both capability switches default off. This is local Gabriel Desktop control and is independent of `computerConfig`. |
| `memoryConfig` | Optional `{ "provider": "inherit" \| "honcho" \| "mem0" \| "none", "providerId"?: string, "captureMode": "automatic" \| "explicit" }`. `providerId` is a safe saved-provider reference and is valid only for explicit Honcho or Mem0. Canvas `channels_only` questionnaires also read this at Collect time (unless `none`) to suggest answers; they never auto-submit those drafts. |
| `sandboxProviderId` | E2B sandbox provider id. |
| `chatCommandSettings` | Which **generation** slash-commands / tools are exposed in chat UI. Keys: `image`, `video`, `audio`, `search`, `deepsearch`, `deepresult`, `skillRun`; each value is `boolean`. Default for all keys is `false`. This does **not** control input understanding. |
| `chatCommandModels` | Per-command model overrides: `Partial<Record<ChatCommandKey, string>>`. Same keys as `chatCommandSettings`; value is a model id string. Set per-tool in the Agents column. Takes precedence over the global `llmModel` for that command. |
| `chatCommandOptions` | Per-command extra options: `Partial<Record<ChatCommandKey, Record<string, unknown>>>`. Arbitrary key-value config per command (e.g. `video.durationSeconds`, `video.size`). Also set per-tool in the Agents column. |
| `multimodalUnderstanding` | Independent **input** capabilities. Shape: `{ image, video, audio, file }` each `{ enabled: boolean, provider: "google" \| "openrouter", modelId?: string }`. Defaults when omitted: image enabled, video/audio/file disabled, every capability preselects `google`. For `google`, `modelId` is an optional saved Gemini credential id shared across image, video, audio, and file (same store as Talk / File Search) — omit it to reuse `geminiLiveProviderId`, then `geminiProviderId`, then the system default Gemini API key. For `openrouter`, `modelId` is an opaque custom/gateway model reference. Never store API keys here. `/capture-and-fill` schema extraction uses Image Understanding; producing the filled image remains image generation. |

#### Chat UI, forms, and agents
| Field | Purpose |
|-------|---------|
| `formUi` | Optional form/cart UI configuration used by the page chat surface; merged from draft so git has the active UI behavior. |
| `chatImageUpload` | Optional image-upload and image-resolver configuration for chat; merged from draft into git when present. |
| `landingPage` | Optional only when no marketing page exists. Every newly created landing page must include enabled schema-v2 localization, IP-country language detection, and the source-revisioned generated cache produced by `landing-page-translations`. |
| `chatApp` | Authenticated Chat App definition mirrored from `assets/chat-app.json`. Preserve `chatAppRef.resourceKey`. New persona experiences default to `sessionMode: "stepper"`; Git stores only the stable definition, including disabled portable `signalPresets`, while per-session journey and automation state stays in runtime storage. |
| `todosConfig` | Optional `{ "enabled": boolean }`. Product default when omitted is **on**. New personas must persist `{ "enabled": false }`. Do not enable To-Dos or invoke `todo-builder` on create. |
| `qualityControlConfig` | Optional `{ "enabled": boolean, "subscriberSimulationEnabled"?: boolean }`. Both default false. Subscriber simulation is effective only when both are explicitly true; disabling Quality must persist the nested flag as false. The full object is merged from draft into git and fingerprints the release candidate. |
| `agentTopology` | Runtime agent topology for multi-supervisor, built-in subagents, custom subagents, and **slash command registration** (`slashCommands`); merged from draft into git when present. Each operator command that should appear in Talk must include command-level `voiceAgent.enabled` plus a non-empty `prompt`. Registration only — slash-command **debug graphs** are not stored in this file (see workflow-builder / `assets/slash-connections.json` on the bound workflow repo). |
| `computerConfig` | Dedicated computer / sandbox configuration. See **Dedicated Computer** section below. |
| `emailConfig` | Dedicated inbox configuration. See **Dedicated Inbox** section below. |

#### Composio / Arcade MCP
| Field | Purpose |
|-------|---------|
| `composioChatToolsEnabled` | Toggle Composio toolkit tools in chat. |
| `composioKeyId` | Saved Composio key reference or sentinel like `default`. |
| `composioApiKey` | Raw key when not yet saved (avoid committing real secrets). |
| `thirdPartyAppToolsProvider` | Legacy single-provider selector: `"composio"` or `"arcade"`. Used when only one provider is active. |
| `enabledThirdPartyToolProviders` | Array form (newer): `Array<"composio" \| "arcade">`. Allows multiple providers to be active simultaneously. Both fields may coexist; `enabledThirdPartyToolProviders` is the authoritative list at runtime. |
| `composioEnabledToolkitSlugs` | Composio toolkit allowlist, e.g. `["gmail"]`. Only these toolkits appear in page chat `@` mentions. For SDK-session Composio, runtime tools are loaded only for toolkit slugs explicitly mentioned in the user message. Empty or omitted means no SDK-session Composio toolkit is available until a toolkit is selected. |
| `arcadeKeyId` | Saved Arcade key reference. |
| `composioToolRouterMcpUrl` | Legacy/provisioned Composio MCP URL path. Toolkit selection uses `composioEnabledToolkitSlugs` instead. |
| `arcadeMcpGatewayUrl` | Arcade MCP gateway URL. |

#### Output integration (Airtable / Notion / native / pipelines)
| Field | Purpose |
|-------|---------|
| `outputIntegration` | Full output integration object: connectors, `resultSets`, `dataLists`, `pipelineListBindings`, Airtable/Notion ids, etc. (see `OutputIntegrationConfig` in the same types file). |
| `outputTabViewerDefaultsByUserId` | Per-user Output tab defaults (`defaultPipelineId`, `defaultListByPipelineId`); **merged from draft** into git `publishedConfig` for visibility in repo. |

**Secrets and device state:** Never commit raw API keys, Twilio auth tokens, private LiveKit secrets, Honcho workspace ids, raw Gabriel user ids, memory identity HMAC material, local voice model paths/download state, device capability state, or Jarvis consent. `memoryConfig.providerId` is only an opaque saved-provider reference. The product uses reference ids (`*KeyId`, `*CredentialId`, `providerId`) pointing at encrypted user-stored credentials.

---

## Write-Through Behaviour
When a user edits configure/publish settings or page display fields in the UI, changes are saved to the database and then synced to this file automatically (500 ms debounce where implemented). **Pull from git** overwrites the database for `publishedConfig` and allowlisted **`pageProfile`** fields to match the file. Chat embed appearance changes sync through `assets/embed-config.json`.

## Ways to apply changes
1. **In-app editors** — UI saves to DB; debounced or explicit **Sync to Git** (e.g. from the AI Persona Git binding modal) pushes current DB state, including `pageProfile`, to the default branch. That full sync also rewrites the skill tree from the platform template (including this `SKILL.md`) and, for **page-primary** repositories only, deletes legacy `assets/team-agent.json`, `assets/task-orchestration.json`, and `skills/master/SKILL.md` if they are still present from older layouts. Per-endpoint bound repos keep those workflow files.
2. **Edit in repo** — Commit `assets/chat-config.json` on the bound branch, then use the product’s **Pull** action to hydrate the page document from git.
3. **Automation / CI** — Pipeline or agent updates the same JSON shape; pull or webhook-driven sync must respect `pageId` and branch binding rules enforced by the backend.

## Dedicated Computer (`computerConfig`)

`computerConfig` is exclusively the remote/dedicated sandbox binding. Do not use it to represent Jarvis control of the runner's Mac. Local Mac control is declared only through `jarvisMode.localComputerControl`; Gabriel Desktop negotiates native capability and asks for fresh call-scoped consent at runtime. Git never proves that a device is capable or authorized.

Portable Runtime (DGX Spark / RTX Linux appliance) is also device state: model paths, GPU profile, secrets, and `offline|local-first|hybrid` policy must not be written into this author repository. After a published candidate exists, load [`portable-persona-runtime`](https://github.com/Gabriel-Operator/portable-persona-runtime) (`npx skills add Gabriel-Operator/portable-persona-runtime`) or topic `portable-persona-runtime`. Compatibility rules: core execution (chat, knowledge, skills, workflows, lists/pipelines, local sandbox, API, MCP) must remain local-capable; Gemini Live, telephony, meetings, SaaS connectors, and cloud media stay classified as consented online capabilities.

An AI Persona can expose a **dedicated computer** (sandbox runtime) to chat and skill-run commands. The author configures this in the **Computer** tab of the Connectors column; the result is stored as `computerConfig` on the page and round-trips in `publishedConfig`.

### `computerConfig` shape (`DigitalTwinComputerConfig`)

| Field | Type | Purpose |
|-------|------|---------|
| `enabled` | `boolean` | Master switch. When `false`, `/skill-run` falls back to the conventional coding-agent harness with no dedicated computer. |
| `mode` | `"visitor_supplied" \| "author_provided" \| "hybrid"` | Computed from whether the author has pre-saved credentials. `visitor_supplied` = visitor must connect their own; `author_provided` = author credential used for all; `hybrid` = author credential saved but visitors may override. |
| `providers` | `DigitalTwinComputerProviderType[]` | Ordered allowlist of sandbox providers the visitor may choose from. |
| `defaultProvider` | `DigitalTwinComputerProviderType?` | Which provider is pre-selected in the visitor connection dialog. |
| `providerCredentialIds` | `Record<provider, string>?` | Author-saved credential ids keyed by provider (stored references, not raw keys). |
| `providerCredentialLabels` | `Record<provider, string>?` | Display labels for each saved author credential. |
| `footerButtonLabel` | `string?` | Custom label for the computer connect button in the chat footer. |
| `lockedModelSettings` | `boolean?` | When `true`, visitors cannot change provider, harness, or model — the author's preconfigured values are used. |
| `preconfiguredHarnessProvider` | `"gabriel_operator" \| "openclaw" \| "hermes"?` | Harness locked for visitors when `lockedModelSettings` is `true`. |
| `preconfiguredLlmModel` | `string?` | LLM / coding-agent model locked for visitors when `lockedModelSettings` is `true`. |
| `preconfiguredHarnessGatewayUrl` | `string?` | OpenClaw or Hermes gateway URL locked for visitors. |
| `autoProvisionMode` | `boolean?` | When `true`, a computer is automatically provisioned per session using the author's system credential; visitors see no setup form. |
| `geminiTools` | `Array<"code_execution" \| "google_search" \| "url_context">?` | Gemini-specific tool subset enabled for Antigravity sessions. Defaults to all three when absent. |

### Supported sandbox providers (`DigitalTwinComputerProviderType`)

| Provider id | Runtime |
|-------------|---------|
| `gemini_managed_agents` | Gemini Antigravity — persistent managed-agent environments (see dedicated section below). |
| `claude_managed_agents` | Claude managed-agent sandbox runtime. |
| `openai_sandbox_agents` | OpenAI Sandbox Agents (bring-your-own OpenAI key). |
| `e2b` | E2B code sandbox — ephemeral skill execution. |
| `daytona` | Daytona dev-environment runtime. |
| `blaxel` | Blaxel serverless sandbox. |
| `modal` | Modal cloud sandbox. |

Providers `e2b`, `daytona`, `blaxel`, and `modal` also support a **harness** selection (`gabriel_operator`, `openclaw`, `hermes`) and an optional gateway URL for custom routing.

### Per-supervisor sandbox (`agentTopology.supervisorAgents[*]`)

Each supervisor agent in `agentTopology.supervisorAgents` can optionally run its own sandbox, **independent of the global `computerConfig`**. This is configured per-card in the Agents column. When set, the supervisor's sandbox takes priority over the global computer binding for that agent's `/skill-run` execution.

Additional fields on each `DigitalTwinSupervisorAgent` entry:

| Field | Type | Purpose |
|-------|------|---------|
| `sandboxProvider` | `DigitalTwinComputerProviderType?` | Sandbox to run this supervisor in. When absent, no sandbox is used regardless of `computerConfig`. |
| `sandboxGeminiCredentialId` | `string?` | RAG provider id (Gemini) used as the Gemini API key for this supervisor's Antigravity session. Bypasses the global computer binding when set. |
| `sandboxApiKeyId` | `string?` | Saved user sandbox provider id for non-Gemini providers. Resolved via `SandboxProvidersService` at run time. |
| `sandboxApiKeyLabel` | `string?` | Display label for the saved non-Gemini credential. |
| `sandboxLlmModel` | `string?` | LLM or managed-agent model id for this supervisor's sandbox (e.g. `antigravity-preview-05-2026`, `openai/gpt-5.5`). |
| `sandboxHarnessProvider` | `"gabriel_operator" \| "openclaw" \| "hermes"?` | Harness for `e2b`/`daytona`/`blaxel`/`modal` sandboxes. |
| `sandboxHarnessGatewayUrl` | `string?` | Gateway URL when harness is `openclaw` or `hermes`. |

**Routing logic (server, `skill-run.controller.ts`):**
- If `sandboxProvider === "gemini_managed_agents"` and `sandboxGeminiCredentialId` is set → resolves the Gemini API key directly via `RAGProvidersService.getGeminiCredentialsForProvider`, skipping the global computer binding.
- If `sandboxProvider === "gemini_managed_agents"` and no `sandboxGeminiCredentialId` → falls back to the global Gemini computer binding (requires the visitor to connect one via the Computer button).
- For other sandbox providers with `sandboxApiKeyId` → resolves via `SandboxProvidersService.resolveProviderCredential` and injects as `sandboxCredentialOverride`.
- `sandboxLlmModel`, `sandboxHarnessProvider`, `sandboxHarnessGatewayUrl` override the effective model/harness/gateway for that supervisor's run.

**Example `agentTopology` entry with per-supervisor Gemini sandbox:**

```json
{
  "agentTopology": {
    "supervisorAgents": [
      {
        "id": "research-supervisor",
        "label": "Research Supervisor",
        "role": "supervisor",
        "enabled": true,
        "instructions": "Coordinate research tasks using the Gemini Antigravity environment.",
        "sandboxProvider": "gemini_managed_agents",
        "sandboxGeminiCredentialId": "<rag-provider-id>",
        "sandboxLlmModel": "antigravity-preview-05-2026"
      }
    ]
  }
}
```

---

## Dedicated Inbox (`emailConfig`)

An AI Persona can expose a **dedicated email inbox** to chat agents. The author configures this in the **Email** tab of the Connectors column; the result is stored as `emailConfig` on the page and round-trips in `publishedConfig`.

### `emailConfig` shape (`DigitalTwinEmailConfig`)

| Field | Type | Purpose |
|-------|------|---------|
| `enabled` | `boolean` | Master switch for dedicated inbox features in chat. |
| `mode` | `"visitor_owned" \| "author_provided" \| "hybrid"` | `visitor_owned` = each visitor connects their own inbox; `author_provided` = author's connection used for all sessions; `hybrid` = author connection saved but visitor may override. |
| `providers` | `DigitalTwinEmailProviderType[]` | Allowed email providers. Defaults to both `["agentmail", "openmail"]`. |
| `authorConnectionIds` | `Record<provider, string>?` | Author-saved email connection ids keyed by provider. |
| `authorConnectionLabels` | `Record<provider, string>?` | Display labels for each saved author connection. |
| `identityFlowEnabled` | `boolean?` | When `true`, enables the identity-verification flow before granting inbox access. |
| `footerButtonLabel` | `string?` | Custom label for the inbox connect button in the chat footer. |

### Supported email providers (`DigitalTwinEmailProviderType`)

| Provider id | Description |
|-------------|-------------|
| `agentmail` | AgentMail — purpose-built agent inbox provider. |
| `openmail` | OpenMail — open email protocol inbox provider. |

**Secrets:** `authorConnectionIds` stores reference ids into the platform's email connection store, not raw tokens or passwords.

---

## Gemini Antigravity Managed Agents

AI Personas that have a **Gemini managed agents** dedicated computer bound can register their `agentTopology` entries (supervisor agents and custom subagents) as individual Gemini managed agents via the `registerGeminiPageAgents` service function. Each registered agent is backed by the `antigravity-preview-05-2026` runtime, receives a stable ID derived from the page ID and agent ID, and is provisioned with:

- A **system instruction** built from the agent's `label`, `description`, `whenToUse`, `instructions`, and `tools`.
- An inline `.agents/AGENTS.md` that describes the agent role and instructs it to write output files to `/workspace/output/`.

### Managed agent ID format

```
dt-{last-8-chars-of-pageId}-{agent-id-slug}
```

Agent IDs are alphanumeric with hyphens, max ~40 characters, stable across re-registrations.

### Registering from server code

```typescript
import { registerGeminiPageAgents } from '../../services/gemini/gemini-managed-agent.service';

const results = await registerGeminiPageAgents({
  pageId: '<mongo-page-id>',
  apiKey: '<gemini-api-key>',
  agentTopology: publishedConfig.agentTopology,  // DigitalTwinAgentTopology
});
// results: Array<{ agentId, agentKey, label, success, error? }>
```

Only agents with `enabled !== false` are registered. Each call is idempotent — if the agent already exists it is deleted and recreated with the latest instructions.

### Slash commands in the sandbox (`/skill-run`)

The `/skill-run` endpoint resolves which sandbox to use in the following priority order:

1. **Per-supervisor sandbox** — if the primary enabled supervisor in `agentTopology.supervisorAgents` has a `sandboxProvider` set, that provider is used (see **Per-supervisor sandbox** above). This takes priority over the global computer binding.
2. **Global dedicated computer** — if `computerConfig.enabled` is `true` and the visitor has connected a runtime, that binding is used.
3. **No sandbox** — falls back to the conventional coding-agent harness (E2B, Daytona, etc. via `sandboxProviderId`).

**Gemini Antigravity path** (when resolved provider is `gemini_managed_agents`):

1. The user's selected skill mentors are mounted as inline `.agents/skills/<slug>/SKILL.md` sources in the Gemini environment.
2. `executeGeminiManagedAgent` is called with the prompt, mentor skill sources, the resolved API key, and the effective managed-agent model id (`sandboxLlmModel` from the supervisor, or the binding's `llmModel`, or `antigravity-preview-05-2026`).
3. After completion the environment snapshot is persisted to `page_generated_media` and output files are surfaced as downloadable attachments in the `skill-run-complete` SSE event.
4. When using the global computer binding (not a per-supervisor credential), `geminiEnvironmentId` and `geminiInteractionId` are saved back to the binding's `sessionMetadata` so subsequent runs continue in the same environment.

**Conventional coding-agent path** (all other sandbox providers):

Uses `executeCodingAgent` with the effective `harnessProvider`, `harnessGatewayUrl`, `llmModel`, and `sandboxCredentialOverride`. The credential override is sourced (in priority order) from: the global dedicated computer binding → the supervisor's `sandboxApiKeyId` resolved via `SandboxProvidersService`.

### Running a managed agent directly (REST / SDK)

```bash
# Inline (no registration required)
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Api-Revision: 2026-05-20" \
  -d '{
    "agent": "antigravity-preview-05-2026",
    "input": "Run the requested skill task",
    "system_instruction": "<agent instructions>",
    "environment": { "type": "remote" }
  }'

# Via registered managed agent ID
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Api-Revision: 2026-05-20" \
  -d '{
    "agent": "dt-abc12345-planner-supervisor",
    "input": "Analyze the grocery list and build a complete shopping bundle.",
    "environment": "remote"
  }'
```

Output files written to `/workspace/output/` inside the sandbox are extracted from the environment snapshot tar and served as downloadable assets via `/api/page-builder/digital-twin-computer/:pageId/gemini-environments/:environmentId/file`.

---

## Twilio Telephony
- AI Personas can be used with outbound Twilio phone flows, including direct agent phone calls and run callbacks.
- Twilio phone number selection is page-aware: if the page has a saved `twilioCredentialId` in `publishedConfig` or `vapiAssistantConfig`, that credential is used first; otherwise the backend falls back to the global Twilio environment configuration when allowed.
- Callback telephony is a special case and must not depend on the page's stored voice runtime settings.
- For `run_callback` calls, the voice runtime now uses the system telephony xAI configuration instead of the AI Persona's stored `voiceProvider`, `xaiKeyId`, `xaiVoice`, or other voice-runtime fields.
- For callbacks, the page/agent ID is still important for tools, knowledge-base context, and conversational context, but not for selecting the voice provider.
- Callback telephony still requires the caller/user to have a usable default xAI key available in their profile.
- Twilio telephony requires a public HTTPS backend URL so Twilio can reach the outbound TwiML/status endpoints and the media-stream websocket endpoint.

## Notes
- `pageId` must never be written into portable Git definitions. Schema v2 uses `resourceKey`.
- Passwords and public-access flags are not stored in git; they are managed via the database only (`visibility`, `sharedWith`, `pageSlug`, etc. remain DB-only).
- Default-branch updates sync back into the AI Persona configuration automatically when the product runs a sync to git.
- Older repos may omit `pageProfile` until the next successful sync or pull; the backend treats missing `pageProfile` as valid for reads and fills it on the next write.

## Automatic audience versions and global country

Use `publishedConfig.personalization` for a global-country baseline plus country,
language, saved-profile/custom or individual authenticated versions of a whole
Persona presentation. Configure it in Chat Publish → Audience versions. It can
change the name, avatar, landing theme/layout, embed appearance and signed-in app.
Read [the presentation contract](references/personalization.md)
for precedence, JSON, hierarchy, trusted profile matching and bounded prompt
generation. Empty country/language lists mean all; global precedes country/language
and the matched authenticated audience. Never expose a country selector in the
public header. Use styled form primitives and `app/components/Select.tsx`.

Prompts adapt editable copy through the existing country generation jobs and
policies; complete layouts are authored validated config. Translations and
generated assets live under their matched variant and cannot use a shared global
translation cache. Preserve human approvals, real-data boundaries and access checks.

## Persona integration support

Published config supports `integrationBindings`, `mastraVoiceConfig`, and `liveVisionConfig`; input-understanding provider `mastra` uses a saved vision-model reference. Preserve these fields through save/publish/Git round trips. Load the `persona-integrations` topic for current schemas and capabilities. Never commit credentials.

## Home dashboard composition

Author signed-in applications through `chat-app-builder` and [the dashboard format](../chat-app-builder/references/dashboard-first.md). Keep the review coach on Home’s `coach` tab with a declared coach provider and `chatApp.coach.mode: review`, and keep only domain records/results/decisions in Home tabs. Playbooks is sidebar-only, milestones/goals uses the Coach control, and routines/Signals/Schedule belongs to Signals. Never show duplicate Home tabs or panels for these managers. Use the standard minimal sidebar rather than extra Coach/Goals/Connections/To-Dos/Canvas destinations. Preserve an explicitly requested alternative and existing runtime data. Mirror the canonical app exactly and verify Home’s nested conversation, history, New Run and Goals controls after publication.

## Context-aware ontology

Use the parent persona’s `assets/ontology.json` for Global → country/region → one authenticated audience → language → terminology. Refer to [the ontology authoring contract](references/ontology-context/contract.md) for snapshots, stable IDs, validation, preview and gateway/MCP authoring. Child resources reference that contract; stored instances and credentials remain in existing runtime storage. Preserve captured ontology selections during retries and downstream mappings. Saving an ontology candidate is separate from activation.

## Evidence-backed ROI

For a standard Persona app, include the domain ROI/Impact sidebar destination and connect it to the same landing calculator definitions via `publishedConfig.roiMonitoring`. Read [the ROI algorithm and evidence contract](../chat-app-builder/references/roi-evidence.md) or Gateway topic `persona-roi`: map committed output/List fields to the parent ontology, capture the semantic revision at execution, deduplicate stable identities, preserve acceptance/withdrawal boundaries and measure value with explicit runner baselines or evidenced economic rules. Credits/tokens/top-up funding are distinct; never sum them as one cost or call a budget/row count cash savings. Missing evidence/currency conversion keeps financial ROI unknown. Validate the model and real runner ROI before publication.

Signals uses the shared panel’s inner Signals/Planning controls; never add or show a duplicate outer Signals/Routines tab strip. Scheduled and legacy routines remain in that panel’s existing controls. Meet/Coach tabs must prefix the label with the current persona portrait, even when an older model has a generic AI icon. Configure the actual persona avatar, not the author’s photo.

ROI/Impact is sidebar-only. Use canonical `agents` (existing Kai `grocery-agents`) metadata as the standalone target; never display an ROI tab beside Meet/Coach.


### Mobile map activities

For an Amigos-style mobile community persona, use `peopleMatchingConfig.proximity.activitiesEnabled: true` only when the author requests activities. It defaults off and also requires enabled proximity/profile onboarding. Neighborhood and Schools retain separate active profiles. Activity school/mode/owner values always come from the authenticated active profile. Searches and all joins stay inside the saved geofence and same school; panning a map never widens discovery.

Activities are runtime data in `community_activities`, not portable Git seeds. Use `GET/POST /api/gateway/pages/{pageId}/people-matching/activities` and `POST .../activities/{activityId}/{join|leave|cancel}`. Signed-in web/native routes use `/api/v1/pages/{pageId}/people-matching/...`; persona-key routes use `/api/v1/matches/activities`. MCP equivalents are `gabriel_list_nearby_activities`, `gabriel_create_community_activity`, `gabriel_set_activity_participation` and the same `persona_` names without pageId. The chat tool is `community_activities`.

A creation includes title, description, venue, category (`sports|creative|outdoors|study|games|other`), ageGroup (`all_ages|under_6|6_10|11_15|16_plus|adults`), future startsAt with timezone, latitude/longitude, capacity (1–200), and `publicVenueConfirmed: true`. School creation/joining also requires `familyParticipationAcknowledged: true` from a parent or school group adult. Never infer this acknowledgement or invent activity rows. Parents manage family participation; do not collect children's names, contact details, private locations or attendance identities. Responses include aggregate participant count and only the current runner's joined/owned state. Joining is idempotent and capacity is checked atomically; only the host can cancel. These operations never send invitations.

Configure Maps keys in the persona's Edit Persona or Publish App configuration and via maps-config author APIs/MCP, never deployment/build environment variables. Native packages read that saved encrypted persona configuration. Landing screens should show phone devices, location-centered maps, activity pins, filters, activity detail cards and a create action. Label fictional marketing activities as previews; keep functional hero chat and floating chat available.


#### School workshop programmes

For school-led workshops, `schoolCommunityRole` on the completed active profile must be `teacher` or `staff` to create a school activity. This role is self-reported during profile onboarding; a matching school domain does not verify affiliation. Parents and external providers can submit a custom school solution brief from the Schools landing palette. No automatic provider bookings or payouts occur. Teachers can combine bounded `groupLabels` (class/group labels only, no child names), set a `learningGoal`, venue, future date, age range and capacity. Categories include `ai_technology` and `music` as well as sports, creative, outdoors, study, games and other.

A school join action creates a pending participation request rather than granting a place. Parents explicitly acknowledge managing family participation and choose a declared group label. Only the activity host can `approve` or `decline`, passing `requestId` through the same participation endpoint/tool. Approval enforces capacity atomically. The host alone receives pending adult requester display labels and group choices; other users receive aggregate counts and their own requested/joined status, never attendee identities or child profiles. School hosts do not consume a family place. Neighborhood joining remains direct.

The Schools landing experience has a desktop workshop palette and programme preview plus a parent mobile companion, separate from the Neighborhood mobile map. Keep the real hero conversation mounted once across tab switches. Put character artwork inside the chat’s bottom-right corner, above the input, and show an AI mistakes disclaimer below the input. The school solution registration uses the established Boli pilot-request route and requires adult contact details only. Research-based funding copy must identify country, source and review date; check open rounds and eligibility, and do not promise subsidies, school profit or provider income.


#### Family neighborhood activities

Mirav Neighborhood is specifically for parents/guardians finding kids activities and socializing with other parents. Enable `proximity.familyActivitiesOnly: true` and include a `parentGuardianAcknowledged` boolean mapped to the participant row. Real nearby discovery and activity operations require it to be true; the shared participant pool also filters to acknowledged parents/guardians. Optional kids age groups are broad ranges only, never child names or profiles. This flag defaults off for other personas.

One parent creates a family activity. An already joined parent may call participation action `offer_to_cohost`. Only the original organizer reviews the opaque requestId through `approve` or `decline`; co-hosting is never inferred. `withdraw_cohost` removes only the current runner’s offer/role and leaves participation intact. Leaving an activity also removes the runner’s co-host role. The public result exposes co-host count and only the runner’s own cohost/cohostRequested state; adult offer display labels are shown to the original organizer only. This feature sends no invitations or messages. The Neighborhood landing and mobile previews must consistently show kids playdates, parent connections and shared organizing, rather than a generic adult social app.

### Google photorealistic 3D Maps

Choose `renderMode: "3d"` in the persona's saved Maps configuration (Edit Persona or
Publish App), or pass it to `gabriel_update_persona_maps_config` / PUT
`/api/gateway/pages/:pageId/maps-config`. The default is `"standard"`; omitting the
field preserves the saved value. This opt-in applies to that persona only. Never
enable it globally for Juno or other personas. Masked author settings, browser
runtime settings and the native packaging snapshot all expose the selected mode.

Use Google's actual 3D SDKs: web Maps JavaScript `maps3d`, Android
`play-services-maps3d:0.2.2`, and iOS `GoogleMaps3D` Swift Package pinned to 1.0.0.
Native 3D is experimental; Android needs API 26+ and iOS needs 16+. A 2D switch
remains available. The app generator links the iOS package only for 3D personas,
initializes both SDKs from the saved persona key, registers native platform views,
and stamps Android's `com.google.android.geo.maps3d.API_KEY`. No Maps keys or
feature flags belong in environment variables or public portable repositories.
Changing native configuration requires publishing a new app package.

Draw a terrain-clamped great-circle polygon from the saved center and radius.
Use the same server-scoped activity and approximate adult-profile pins in 2D and
3D. Panning, tilt, or switching views must never broaden a search. Schools retain
school ID and active-profile isolation. Hide all pins during an unsaved area
preview; clear old activity pins immediately after saving an area, ignore stale
callbacks, and reload even when the saved coordinates are unchanged. Category
filters must filter map pins too. Activity markers open their activity details.
Keep Google attribution and SDK errors visible. Never present generated artwork
as an accurate geographic layer. AI image generation is not required for 3D Maps.

Enable billing and the Maps JavaScript API / Maps SDKs / Maps 3D SDKs in the key's
Google Cloud project and apply web referrer, Android package+signing SHA-1 and iOS
bundle restrictions as appropriate. Key presence is not proof of authorization.
Test Neighborhood and Schools on iOS and Android with native controllers, geocoding,
markers, radius previews/saves and mode changes. Report simulator fixture/API tests
separately from live imagery and physical-device coverage; Google authorization
failures must remain explicit blockers for live rendering verification.


## Command governance and cost handoff

For slash-command authoring, read [command governance and estimated cost](references/command-governance.md). Report warnings and the selected review profile with cost comparisons before handing off the command.


## Required playbook team protocol

Every slash command and directly runnable saved Canvas playbook owns a human-reviewed schema-v1 `team`. Generate or validate it after defining steps with `gabriel_propose_playbook_team` / `gabriel_validate_playbook_team`, then return the authenticated review URL. Use `gabriel_update_playbook_team` with the current `expectedFingerprint` to save a draft. API/MCP clients cannot confirm, import or manufacture human approval. Activation and new launches fail with `TEAM_REVIEW_REQUIRED` or `TEAM_REVIEW_STALE` until the author/owner confirms.

Define contextual specialist sub-agents with explicit goals, start conditions, outputs, completion criteria, approved stage IDs, hierarchy, recipients and finite invocation/step/time limits. Coordinator, reviewer, scorer, independent judge, auditor and memory steward are always present. Assign one integration owner. Preserve ontology usage, feed revision references, declared record operations, optional recorded Signal triggers and authored outcome metric bindings; missing semantics or capabilities block affected work. Deterministic actions remain tools of the appropriate specialist.

Runtime authority, claims, exact-effect approvals, audit, encrypted artifacts and private memory are server-owned. Delegation never expands permissions. Downstream work consumes accepted versions. Unknown effects require reconciliation; never automatically repeat them. Provider costs and Gabriel credits are separate. A delivered artifact does not prove economic value: capture accepted committed evidence with the producing ontology/calculator pins and saved baseline, preserving unknown costs and coverage gaps. Team/ontology/Signal/calculator changes remain reviewed proposals. Portable Git carries definitions and stable references only.

For a family activity or school-workshop flagship, read [the community activity loop contract](../persona-framework/references/community-activity-loop.md). It covers shared guided state, scoped refreshable feeds, opt-in Signals, reviewed team execution and adult-confirmed occurrence ROI.

For a Persona that publishes learning courses and awards adult-verified badges, read [the learning course contract](../chat-app-builder/references/learning-courses.md). A course workflow names its Canvas tasks in `chatApp.learning.course.tasks` (brief, script, quiz, optional film, narration and frames, and the approve and publish gates) and the platform reads them from there; no task, command or tab name is built in.

For pages a Persona serves under its own address (`/persona/<slug>/…`), declared in `chatApp.routes` and composed from registered components, read [the persona routes contract](../chat-app-builder/references/persona-routes.md).
