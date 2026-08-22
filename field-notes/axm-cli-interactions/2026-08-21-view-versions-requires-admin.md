---
subject: axm-cli-interactions
key: view-versions-requires-admin
date: 2026-08-21
kind: blocked
status: open
---

**Expected:** `axm view <fqn> versions --json` would provide the published
version metadata described by `axm view --help` using the active Registry
credentials.
**Actual:** Every requested public `@agentxm` extension failed before returning
versions because the visibility lookup required `extensions:admin`; the active
token had `extensions:publish:new` and `extensions:publish:version` only.
**Gap:** The documented read operation has an undisclosed administrative-scope
dependency, so a publisher cannot inspect versions directly before selecting a
new immutable version.
**Suggests:** Permit public version reads without the visibility-admin scope, or
document the required scope and provide a publisher-safe version lookup that
does not require visibility administration.

Evidence: AXM CLI `0.27.15`; `axm view
@agentxm/skills/evaluate-agent-skill versions --json` returned `403 forbidden`,
required scope `extensions:admin`, and granted scopes
`extensions:publish:new` and `extensions:publish:version`. An exact publish
preview could still report the `version_exists` conflict for `0.1.0`.
