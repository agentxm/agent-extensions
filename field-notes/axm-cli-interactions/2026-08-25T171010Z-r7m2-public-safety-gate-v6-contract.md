---
id: 2026-08-25T171010Z-r7m2
subject: axm-cli-interactions
key: public-safety-gate-v6-contract
observed_at: "2026-08-25T17:10:10Z"
session: s4k9p2
kind: friction
status: open
---

**Expected:** The repository pre-commit safety gate should accept a converged source-qualified AXM workspace produced by the locally built CLI.
**Observed:** The gate rejected a successful `axm sync --preview --json` result because it still read the retired top-level `errorCount` and `blockedCount` fields, and its subsequent checks still targeted `.axm/extensions/@agentxm`.
**Impact:** A valid migration could not be committed until the repository-owned gate and fixtures were aligned with lockfile v6 and the root authored-package layout.
**Recovery:** Updated the gate to read `result.counts`, validate root authored-package directories, and use `axm.json`; updated its fixtures and package path references with the workspace migration.
**Detected by:** Non-zero pre-commit hook exit after AXM reported a successful preview with no planned changes.
**Observed factors:** AXM was the locally built source-qualified CLI; strict lint and a direct no-op sync check had already passed; the staged workspace used `axm.json`, `axm-lock.yaml`, and root authored packages.
**Diagnostic evidence:** The hook printed `AXM sync preview did not report a recoverable workspace` while the JSON result reported `outcome: previewed`, `counts.failed: 0`, and `counts.blocked: 0`.
**Hypothesis:** Repository-owned enforcement encoded both the previous result schema and the retired storage layout rather than consuming the current AXM contract.
**Suggests:** Keep safety gates and their regression fixtures on the current public plan-result and workspace-state contracts whenever AXM storage changes.
