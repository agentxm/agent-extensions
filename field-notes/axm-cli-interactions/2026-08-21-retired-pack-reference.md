---
subject: axm-cli-interactions
key: retired-pack-reference
date: 2026-08-21
kind: gap
status: open
---

**Expected:** After the knowledge-pack consolidation, canonical member
manifests and install guidance should name the active `agent-engineering` pack.
**Actual:** The workspace-owned `author-agent-skill` remains a member of
`agent-engineering`, but its manifest and README still recommend the retired
`skill-engineering` pack.
**Gap:** The consolidation updated the pack's dependencies without updating the
member's reciprocal recommendation and install command.
**Suggests:** Include reciprocal member metadata and README install routes in
pack-consolidation verification.

Evidence: `axm list --json` reports only `@agentxm/packs/agent-engineering` as
the workspace-owned first-party pack; `packs/agent-engineering/pack.json`
depends on `author-agent-skill`; the skill's pre-change `skill.json` and
`README.md` named `@agentxm/packs/skill-engineering`.
