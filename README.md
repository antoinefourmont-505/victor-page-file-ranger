# Gabriel Operator — AI Persona Skill

Canonical skill scaffold for **git-backed AI Persona** repositories. It documents how to maintain `assets/chat-config.json` — the unified snapshot for **page profile** (`pageProfile`) and **published assistant runtime** (`publishedConfig`) — plus `assets/persona-evals.json`, the requirement, traceability, functional scenario, and release-gating contract.

Embed appearance has moved to the separate embed config scaffold, where agents edit `assets/embed-config.json`.

Slash-command **debug/docs** (`assets/slash-connections`) are **not** part of this scaffold — they live on each command's bound workflow repository (`assets/slash-connections.json`) under the workflow-builder skill. Runtime slash-command registration in `publishedConfig.agentTopology.slashCommands` may still appear in chat-config.

The authoritative copy in development lives in this marketplace repo at **`server/skills/digital-twin-page/`** (this folder).

Persona composition registries contain one Workflow per distinct `workflowRef`, plus one
Pipeline and one or more domain Lists. Workspace publishing validates each child's declared branch and
root `gabriel.workspace.json`. Stale managed links must be removed with the non-destructive
`node scripts/publish-workspace.js prune`; physical child checkouts are preserved.
Repositories that intentionally package multiple portable kinds use a bounded
`gabriel.workspace.json.resources` array so every kind retains its required validator.

Workspace publish creates an immutable candidate, not a correctness claim. Quality control is opt-in: set `publishedConfig.qualityControlConfig.enabled` to `true` from the create/edit Persona **Features** tab to expose Quality UI and enforce the release gate. Missing or false preserves legacy behavior. Subscriber testing is a second default-off switch nested beneath Quality: `subscriberSimulationEnabled` works only while Quality is enabled. When active, required cases use `runAs: "subscriber"`, execute through a managed login-disabled subscriber with isolated data and mocked external actions, add a Subscriber experience release dimension, and expose an owner-only Author/Subscriber simulation header control. The browser preview is one-time, page/candidate-bound, and cannot act as an ordinary login. Its free-text chat lane is tool-free; configured commands and Canvas runs use isolated list/pipeline copies and the deterministic mock executor. Once enabled, the **Quality** UI and Gateway eval tools separately report Structure, Specification coverage, Functional behavior, Subscriber experience, Live integrations, and overall production readiness. Live connector smoke tests remain optional and never authorize production.

## Installation

### Method 1: NPX (recommended)

After this package is published to GitHub as [`go-code-bot/go-digital-twin-page-skills`](https://github.com/go-code-bot/go-digital-twin-page-skills), install into the current directory:

```bash
npx github:go-code-bot/go-digital-twin-page-skills
```

Install into a specific subdirectory:

```bash
npx github:go-code-bot/go-digital-twin-page-skills add ./my-digital-twin-page
```

Re-sync (overwrite existing scaffold files):

```bash
npx github:go-code-bot/go-digital-twin-page-skills sync .
```

### Method 2: Curl

```bash
curl -fsSL https://raw.githubusercontent.com/go-code-bot/go-digital-twin-page-skills/main/install.sh | bash
```

With a target directory:

```bash
curl -fsSL https://raw.githubusercontent.com/go-code-bot/go-digital-twin-page-skills/main/install.sh | bash -s -- ./my-digital-twin-page
```

### Working from the Gabriel Operator monorepo

Until [`go-code-bot/go-digital-twin-page-skills`](https://github.com/go-code-bot/go-digital-twin-page-skills) exists on GitHub, **copy this directory** into your target repo (or publish this folder to that repo name and then use `npx` / `curl`):

```bash
cp -R server/skills/digital-twin-page ./path/to/your-git-repo/
```

After the package is published, `npx github:go-code-bot/go-digital-twin-page-skills` and the curl installer will download scaffold files from GitHub.

## Documentation

1. Read **`SKILL.md`** for the full `chat-config.json` contract and field reference.
2. **`assets/chat-config.json`** is created and updated by the platform when git sync runs — edit in-repo only when you intend to drive changes back through git.
3. **`assets/persona-evals.json`** maps confirmed business requirements to pinned implementation elements and deterministic cases. Run `node scripts/validate-persona-evals.js`, publish a candidate, then run required suites before live activation.

## Related

- **Team agent / task orchestration** workflows use the separate **`team-agents`** skill pack (`go-task-orchestrator-skills`), not this scaffold.
