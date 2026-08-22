---
subject: axm-cli-interactions
key: update-preview-marker-conflict
date: 2026-08-21
kind: gap
status: open
---

**Expected:** `axm update --preview` would report an ownership-marker conflict
that prevents the corresponding live pack update.
**Actual:** Preview marked both configured pack steps ready with no warnings or
errors; the live update then rejected each because its `AGENTS.md` region
marker was missing `v=1`.
**Gap:** Preview did not exercise or report the contributed-region ownership
check that live application enforced after updating AXM from 0.27.11 to
0.27.15.
**Suggests:** Run the same managed-region ownership validation during update
preview and name the minimal marker migration before application.

Evidence: the preview returned nine ready steps and zero errors. The live
result applied AXM 0.27.15, then failed the docs and field-notes pack steps with
`AXM ownership marker is missing v: AGENTS.md (conflict)`.
