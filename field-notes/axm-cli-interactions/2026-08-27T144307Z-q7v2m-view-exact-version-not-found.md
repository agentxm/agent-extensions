---
id: 2026-08-27T144307Z-q7v2m
subject: axm-cli-interactions
key: view-exact-version-not-found
observed_at: "2026-08-27T14:43:07Z"
session: unknown
kind: gap
status: open
---

**Expected:** The AXM publication workflow requires an exact-version Registry
readback after mutation, so the Registry metadata surface should expose a
supported exact-version lookup syntax.
**Observed:** `axm view @agentxm/skills/audit-agent-skill@0.8.0 --registry
agentxm --json` treated the version-qualified handle as an extension name and
returned `not_found`; `axm view --help` documents extension metadata and
version-list fields but no exact-version lookup syntax.
**Impact:** The exact-version readback could not be performed or named from
live CLI help. One read-only lookup failed; the publish remained independently
blocked by immutable-version integrity drift.
**Recovery:** No workaround was established. Work stopped without a Registry
mutation.
**Detected by:** A read-only exact-version lookup attempted while preparing the
required post-publish verification plan.
**Observed factors:** AXM CLI 0.28.1; project workspace; registry `agentxm`;
target `@agentxm/skills/audit-agent-skill@0.8.0`.
**Diagnostic evidence:** Process exit status `3`; result `ok: false`; error code
`not_found`; detail `No extension named
"@agentxm/skills/audit-agent-skill@0.8.0" was found`; no request or correlation
ID supplied.
**Hypothesis:** The CLI either lacks an exact-version metadata lookup or uses a
syntax that is not discoverable from `axm view --help`.
**Suggests:** Document and support the exact-version readback command used by
the publication verification workflow.

Evidence: `axm view --help` accepts a fully qualified extension handle and an
optional metadata field, while the version-qualified handle above was rejected
with the structured `not_found` result and exit status 3.
