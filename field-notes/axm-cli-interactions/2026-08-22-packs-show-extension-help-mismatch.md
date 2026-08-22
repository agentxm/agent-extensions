---
subject: axm-cli-interactions
key: packs-show-extension-help-mismatch
date: 2026-08-22
kind: gap
status: open
---

**Expected:** `axm packs show <extension>` would accept a skill FQN and report its desired pack membership, because the installed AXM skill quick reference says “Inspect desired Pack state” and the `packs` help says the command compares pack state for `<extension>`.
**Actual:** `axm packs show @agentxm/skills/evaluate-agent-skill --json` exited with a validation error: `Expected a pack identity`.
**Gap:** The documented operand is broader than the CLI's accepted pack-only identity.
**Suggests:** Clarify the help and skill quick reference to require a pack identity, or extend the command to accept member-extension identities and report owning-pack state.

Evidence: AXM CLI `0.27.15`; project scope; the pack-FQN form succeeded immediately beforehand, while the skill-FQN form returned the validation error above.
