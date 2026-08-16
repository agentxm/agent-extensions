---
subject: axm-cli-interactions
key: publish-partial-internal-upload-failure
date: 2026-08-15
kind: workaround
status: open
---

**Expected:** A publish selection whose `--preview --json` preflight reported
all 9 members `pending` with no blocked or failed entries should publish as one
admitted set, since preflight is the documented gate before releasing a
reviewed selection.

**Actual:** The first `axm publish ... --yes` published 2 of 9, failed 3 with
`failed/upload_execution/upload_failed: An unexpected error occurred.
(internal)`, and blocked the remaining 4 as `blocked_by_dependency`. Rerunning
the CLI's own suggested continuation command published 4 more and failed 3 packs
with the same internal error. A third run of just those 3 succeeded with no
input changes.

**Gap:** Upload failures are transient and per-extension, but the CLI surfaces
them as a terminal error pointing at the issue tracker
("This looks like a bug. Please report it") rather than as a retryable
condition. Nothing distinguishes a transient internal upload failure from a
selection that will never succeed, so the operator has to guess that plain
re-invocation is the correct response.

**Suggests:** Classify `upload_execution/upload_failed (internal)` as retryable
and either retry it inside the command or say plainly in the result that
re-running the continuation command is expected, reserving the bug-report
pointer for failures that persist across attempts.

**Evidence:** Selection was 9 `@agentxm` extensions (3 knowledge, 2 skills,
4 packs), all workspace-authored, all preserving existing public visibility.
`axm lint` and `axm knowledge lint` were clean before publishing, and
`axm publish --preview --json` reported `"pending": 9` with `blocked` and
`failed` at 0. Attempt 1 published `@agentxm/skills/audit-agent-skill@0.3.0` and
`@agentxm/knowledge/skill-engineering@0.3.0`. Attempt 2, using the printed
`--on-existing verify --yes` continuation, published `author-agent-skill@0.3.0`,
`knowledge/harness-engineering@0.2.0`, `knowledge/prompt-engineering@0.2.0`, and
`packs/skill-engineering@0.3.0`. Attempt 3 published the remaining
`packs/agent-engineering@0.3.0`, `packs/context-engineering@0.3.0`, and
`packs/harness-engineering@0.3.0`. All 9 verified afterward with `axm view`. No
request ID was shown with any failure. Installed CLI version not captured.
