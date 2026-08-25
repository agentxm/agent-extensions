---
id: 2026-08-25T010436Z-a7k2
subject: axm-cli-interactions
key: update-help-topic-not-found
observed_at: "2026-08-25T01:04:36Z"
session: s8m4q2
kind: gap
status: open
---

**Expected:** `axm help updates` would expose conceptual guidance for the `axm update` command, following the topic-oriented help pattern used by publish, sync, and workspace state.
**Observed:** AXM returned `Unknown help topic or command path 'updates'. (not_found)` after the command-specific `axm update --help` had succeeded.
**Impact:** One help lookup failed and added one extra command result to review before the repository update workflow could continue.
**Recovery:** Used the complete `axm update --help` and `axm help workspace-state` output already returned; the main task continued.
**Detected by:** The combined help command exited with status 1 and printed the `not_found` diagnostic.
**Observed factors:** AXM CLI version 0.27.17; command was run in a valid AXM project workspace; neighboring conceptual topics `publish` and `workspace-state` exist.
**Diagnostic evidence:** command `axm help updates`; process exit status 1; error code `not_found`; retryability not supplied; request ID not supplied.
**Hypothesis:** The update command has command help but no plural conceptual topic alias.

Evidence: The successful `axm update --help` output and the failing `axm help updates` diagnostic occurred in the same invocation on AXM 0.27.17.
