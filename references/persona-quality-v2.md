# Persona Quality v2 authoring

Use the existing `assets/persona-evals.json` file. Upgrade explicitly; retain v1 requirements, scenarios and traceability. An incomplete v2 proposal may be saved, but cannot authorize a release.

The Quality entry point opens a persona overview with separate skills and persona-test contributions. Open a skill or the persona to inspect Tests, Definition of Ready, Definition of Done and History. Test details contain inputs, reference examples, generated artifacts, criterion evidence and execution links. Missing evidence is unscored.

Author every enabled registered command as one skill contract using its existing command ID. Keep disabled commands visible as inactive. Reference stable requirement IDs from skill and persona `readyRequirementIds` and `doneRequirementIds`; do not duplicate requirements to inflate completion. Persona prerequisites must not depend on its own final score.

Every skill needs three distinct successful prompts, missing-input coverage, boundary and adversarial cases, plus applicable approval, rejection, provider failure and external-action cases. Successful real cases default to three repetitions. Deterministic negative cases default to one. A missing-input test must assert the approved intake/refusal behavior and prove that execution did not proceed.

Each criterion has a stable `id`, a `requirementId`, a type and its type-specific parameters. Use `quality` with an explicit rubric, threshold and reference IDs for measured quality; legacy `rubric` remains advisory. Artifact requirements use `artifact_exists` and `artifact_properties`, including MIME type, duration, dimensions and required audio where applicable. Use deterministic assertions for exact schemas, list state and pipeline outcomes.

Persona tests have `scope: "persona"` and an ordered `journey` of existing command invocations. Each step has an ID, command reference, inputs and assertions. Bind later inputs from earlier output paths, for example `{"script":{"stepId":"write","path":"$.text"}}`. The execution output envelope provides `text`, parsed `result` when available, and `artifacts`. Verify intermediate handoffs and the final persona outcome. Every enabled skill must participate in a required journey.

Separate cases into `optimization` and `holdout`. Holdouts, their outputs and their exclusive references must never be supplied to an optimizer. Both the persona and its skills need holdout coverage.

Use `gabriel_draft_persona_benchmark` to propose or explicitly upgrade a standard, then save through `gabriel_update_persona_evals` with `expectedHeadSha`. Have the owner review the tests, weights, thresholds and references before invoking `gabriel_approve_persona_benchmark`. Approval snapshots reference bytes in the existing managed asset library, records provenance and signs the standard for the implementation. Import external reference media into that library first. Do not invent reference asset IDs or approval receipts.

Prepare a workspace candidate, then use `gabriel_run_persona_evals` in `benchmark` mode. A persona target runs the complete combined campaign, including required subscriber cases when applicable. Skill and test targets help diagnose individual failures and cannot substitute for the complete release campaign. A changed candidate, standard, reference or evaluator requires fresh evidence.

Quality is distinct from completion. A raw score of 80 can satisfy an approved threshold of 75. Overall quality is 50% of the mean required skill scores plus 50% of the persona's own test score. Missing required scores leave the result incomplete. Every mandatory criterion and every required repetition must pass before readiness reaches 100%.

Automatic improvement optimizes configuration through isolated candidates; it does not train model weights. The default is five modified candidates after the baseline and two hours from campaign execution start. Both are configurable. An optional Gabriel-credit allowance is unset by default. Existing Gabriel consumption, reservations and settlements remain authoritative: no testing fee, USD cap, additional wallet or duplicate debit. If the next operation has no verifiable credit bound under a configured allowance, it pauses before dispatch.

Review candidate changes and before/after evidence before `gabriel_accept_persona_benchmark`. Acceptance updates the release draft. A final complete passing release campaign is still required. Holdout failure ends improvement and requires review; it must not feed another optimization iteration. Preserve all approved standards, holdouts, permissions, credentials and limits.

Upgraded v2 personas have an enforced release gate even if the Quality display feature is subsequently disabled. Keep legacy release behavior for v1 personas. Only the existing audited administrator override can bypass an enforced gate.
