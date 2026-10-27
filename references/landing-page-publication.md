# Publishing landing-copy updates in an existing persona

For a full portable workflow change, use `scripts/publish-workspace.js` and its full validators.

For a landing-page-only update to a persona that already has an established landing child, use:

```sh
node scripts/publish-landing-page.js validate references/landing-pages/<child>
# Commit the reviewed parent copy and locale mirrors first.
node scripts/publish-landing-page.js publish references/landing-pages/<child>
git push origin HEAD
```

The child must already be clean and pushed. Its resource key must equal the parent's
`landingPageRef`, its origin must match `.gitmodules` and the prior workspace binding,
and every locale must match byte-for-byte. The tool validates the child definition,
pins its exact published commit, and fingerprints its complete definition.

This command preserves all non-landing workspace nodes, edges, portable registry entries,
and runtime-specific IDs. It does not declare those workflows portable or publish changed
workflow dependencies. It is appropriate for copy/calculator changes in older same-environment
persona exports; it is not permission to bypass workflow validation for a workflow change.

## After saving in the app

The publish modal's landing and calculator editors save the live page and sync the parent's
`assets/chat-config.json`, but never the child. Before the next child publish, mirror the
parent back into the child, then commit and push the child before publishing the pin:

```sh
node scripts/sync-landing-child.js check references/landing-pages/<child>
node scripts/sync-landing-child.js apply references/landing-pages/<child>
```

`apply` requires a clean child and a matching resource key. It copies the parent landing page
and its manifest-listed locale files, runs the child validator, and never commits.

If the binding is absent, establish it only from a verified existing child repository whose
resource key matches the parent's already-authored reference. Do not guess repository URLs,
persona identifiers, or workflow endpoint mappings.
