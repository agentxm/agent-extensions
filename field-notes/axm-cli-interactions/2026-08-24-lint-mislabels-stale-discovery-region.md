---
subject: axm-cli-interactions
key: lint-mislabels-stale-discovery-region
date: 2026-08-24
kind: gap
status: open
---

**Expected:** `axm lint --json` should distinguish a missing projection from an
existing projection whose managed Knowledge discovery region needs refresh.
**Actual:** lint reported that the AXM-owned root `AGENTS.md` projection was
missing, while the file existed, `axm instructions --json` reported it as
`owned-current`, and `axm sync --preview --json` proposed updating only its
Knowledge discovery region.
**Gap:** the lint diagnostic's missing-file wording does not match the observed
file or the reconciliation plan.
**Suggests:** report managed-region staleness separately from a missing
projection and align lint with instruction-inventory and sync terminology.

Evidence: AXM CLI `0.27.17`; root `AGENTS.md` existed as a regular file;
instruction inventory reported `health: ok` and `ownership: owned-current`;
sync preview proposed one `Knowledge discovery` update to `AGENTS.md`; lint
emitted `workspace/projections-current` with “projection ... is missing.”
