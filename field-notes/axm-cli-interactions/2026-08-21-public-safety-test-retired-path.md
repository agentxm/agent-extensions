---
subject: axm-cli-interactions
key: public-safety-test-retired-path
date: 2026-08-21
kind: blocked
status: open
---

**Expected:** `scripts/test-public-safety.sh` should construct its synthetic
Git fixtures from paths present in the current six-package public catalog and
then exercise the AXM-backed safety gate.
**Actual:** Fixture setup exits before the tests run because it force-adds
`.axm/extensions/@agentxm/knowledge/skill-engineering/src/platforms/claude.md`,
which was removed when the knowledge bundles were consolidated.
**Gap:** The safety-gate tests retained paths from retired knowledge bundles
after the production gate and package inventory moved to `agent-engineering`.
**Suggests:** Update the synthetic subjects to current `agent-engineering`
concept paths and keep a consolidation regression that asserts test fixtures do
not reference retired packages.

Evidence: `scripts/test-public-safety.sh` exited 1 with `fatal: pathspec ... did
not match any files`; line 27 names the retired `skill-engineering` path, and
the same path is present in the committed `HEAD` version of the test.
