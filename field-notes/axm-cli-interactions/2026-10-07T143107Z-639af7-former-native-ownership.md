---
id: 2026-10-07T143107Z-639af7
subject: axm-cli-interactions
key: former-native-ownership
observed_at: "2026-10-07T14:31:07.433000+00:00"
session: "unknown"
kind: workaround
status: open
---

# Storage recovery encounters former native ownership proofs

## Context
Update the committed workspace to AXM 0.42.0 source-addressed storage and lockfile format 11.

## Friction
After preserving the unsupported lockfile, bundled-skill installation refused native artifacts that point at the former package address. Sync also rejected existing instruction regions whose source proofs refer to former addresses. Instruction adoption required accepted source authority before those external packages had been reacquired.

## Cost / impact
Recovery required preserving former native artifacts outside the workspace, rebuilding external acceptance, explicitly adopting affected instruction regions, and then reconciling again.

## Outcome
The original artifacts and lockfile were preserved outside the workspace. AXM regenerated package storage and native projections. The resulting workspace passed lint and a sync preview with fail-on-change.

## Evidence
AXM 0.42.0 returned `bundled-axm-skill-native-artifact` and `Managed region source ownership conflicts`. `axm instructions adopt knowledge --file AGENTS.md --preview` initially reported that the selected region had no accepted source authority; after reacquisition it applied successfully.
