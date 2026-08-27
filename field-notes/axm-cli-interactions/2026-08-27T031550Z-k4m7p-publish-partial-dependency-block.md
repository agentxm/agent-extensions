---
id: 2026-08-27T031550Z-k4m7p
subject: axm-cli-interactions
key: publish-partial-dependency-block
observed_at: "2026-08-27T03:15:50Z"
session: c8v2n6
kind: gap
status: open
---

**Expected:** An admitted four-package `axm publish` set whose preview had no
blocking findings should publish all four packages.
**Observed:** The apply result was partial: two skills published, the knowledge
package failed, and the dependent pack was blocked.
**Impact:** Publication and downstream consumer updates paused for one recovery
step; elapsed delay was not measured.
**Recovery:** AXM supplied an exact two-package recovery command; it had not yet
been attempted when this note was captured.
**Detected by:** The structured publish result returned `ok: false` and
`execution.status: partial`.
**Observed factors:** AXM `0.28.1`; explicit selection; the preceding preview
was admitted; the skill uploads succeeded before the knowledge failure.
**Diagnostic evidence:** Counts were `published: 2`, `failed: 1`, `blocked: 1`.
`@agentxm/knowledge/agent-engineering@0.10.0` failed and
`@agentxm/packs/agent-engineering@0.11.0` was blocked by that dependency. The
supplied recovery command was
`axm publish --on-existing verify --json --yes @agentxm/knowledge/agent-engineering @agentxm/packs/agent-engineering`.
The process exit status and the knowledge failure's detailed fields are
unavailable — output was not retained before display truncation.
**Hypothesis:** unknown

Evidence: The publish preview admitted all four exact versions. The apply result
reported successful publication of `@agentxm/skills/audit-agent-skill@0.8.0`
and `@agentxm/skills/author-agent-skill@0.11.0`, then supplied recovery for the
remaining knowledge and pack identities.
