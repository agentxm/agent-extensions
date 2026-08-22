---
subject: axm-cli-interactions
key: packs-add-rewrites-constraint
date: 2026-08-21
kind: gap
status: open
---

**Expected:** Re-adding an existing pack member after its version bump should
update the dependency floor while preserving the manifest's authored constraint
style, or preview should disclose the resulting constraint.
**Actual:** `axm packs add` preview reported only that one extension would be
added; applying it replaced existing caret constraints with open-ended minimum
constraints such as `^0.4.0` to `>=0.5.0`.
**Gap:** The preview does not expose the dependency constraint it will write, so
a compatibility-policy change is visible only after mutation.
**Suggests:** Show the before-and-after constraint in preview and preserve the
existing operator unless the user explicitly requests another policy.

Evidence: In the `agent-engineering` pack, preview returned one ready step with
no message or diff. Applying the command changed the existing knowledge and
author-skill constraints from caret ranges to `>=` ranges while raising their
floors to the current workspace versions.
