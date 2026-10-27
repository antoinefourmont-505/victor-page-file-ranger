# AI Persona References

This folder is a **depth-1 composition workspace**. Every linked repository is a git
submodule of this Persona — never a submodule of another submodule.

```bash
git submodule update --init
```

Private submodules need credentials that can read the linked repositories.

## Layout

```text
references/registry.json        ← portable: distinct Workflows + one Pipeline + one List
references/workspace.json       ← generated authoring graph (team agents + extras)
references/pipelines/<key>/     ← submodule: pipeline-builder repo
references/lists/<key>/         ← submodule: list-builder repo
references/workflows/<key>/     ← submodule: workflow-builder repo (once per remote)
references/team-agents/<key>/   ← submodule: git-bound team agents only
```

`registry.json` is the portable bundle. `workspace.json` is generated on **workspace
publish** — do not edit it by hand, and do not add `team_agent` rows to the portable
registry. Import remaps page-scoped team agents from `workspace.json`. Commit content
in each child repository first, then publish so this Persona's lock advances in one
root commit.
