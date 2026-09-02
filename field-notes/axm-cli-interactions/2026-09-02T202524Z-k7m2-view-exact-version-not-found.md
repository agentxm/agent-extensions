---
id: 2026-09-02T202524Z-k7m2
subject: axm-cli-interactions
key: view-exact-version-not-found
observed_at: "2026-09-02T20:25:24Z"
session: s9q4p2
kind: workaround
status: open
---

**Expected:** After publishing `@agentxm/knowledge/desktop-agents@0.1.0`, the
installed AXM lifecycle guidance required an exact-version Registry readback,
so `axm view @agentxm/knowledge/desktop-agents@0.1.0 --json
--non-interactive` was expected to return that version's metadata.

**Observed:** AXM exited 1 with code `not_found` and reported, `No extension
named "@agentxm/knowledge/desktop-agents@0.1.0" was found`. The publish result
had already reported the exact version as successfully published.

**Impact:** Exact-version verification required two additional Registry reads
instead of one. No mutation was retried.

**Recovery:** `axm view @agentxm/knowledge/desktop-agents versions --json
--non-interactive` returned only `0.1.0`, and the unversioned metadata read
reported public visibility with latest version `0.1.0`. Registry verification
completed.

**Detected by:** The structured result and exit status of the exact-version
`axm view` command.

**Observed factors:** AXM CLI version 0.28.4; project workspace; AgentXM
Registry; public Knowledge package; first published version 0.1.0.

**Diagnostic evidence:** Exit 1; error code `not_found`; package
`@agentxm/knowledge/desktop-agents`; requested version `0.1.0`; retryability,
request ID, and response status were not supplied.

**Hypothesis:** The `view` command parses the version suffix as part of the
package name rather than as an exact-version selector.

**Suggests:** Document and support an exact-version readback form, or make the
required verification sequence explicitly use `versions` plus metadata.
