---
subject: axm-cli-interactions
key: publish-transient-internal-upload-failure
date: 2026-08-17
kind: workaround
status: open
---

**Expected:** A reviewed `axm publish <fqn...>` selection that passed
`--preview` with `0 blocked, 0 failed, 6 pending` would publish all six
extensions in one invocation.

**Actual:** The same selection partially failed twice.

- Attempt 1: 3 published, 2 failed with
  `failed/upload_execution/upload_failed: An unexpected error occurred.
  (internal)`, 1 blocked by the failed dependency.
- Attempt 2 (the CLI's own suggested `--on-existing verify --yes` continuation):
  1 more published, `@agentxm/knowledge/agent-engineering` failed again with the
  identical internal error, pack still blocked.
- Attempt 3: the same bundle published with no change to the artifact.

**Gap:** The failure is reported as an internal registry error with no request
ID in the output, and the CLI's remediation text points at the GitHub issue
tracker ("This looks like a bug") rather than suggesting a retry. Nothing
distinguishes a transient upload failure from a permanent one, so the correct
response — retry unchanged — is not discoverable. The two failures both hit the
largest artifact in the set (118 concept files), which suggests size or upload
duration as a factor, but that is not stated and remains unverified.

**Suggests:** Distinguish retryable upload failures from permanent ones in the
result status, and either retry automatically with backoff or say plainly that
the operation is safe to re-run. Include a request ID when directing the user to
file a bug.

Evidence:

- AXM 0.27.8, registry `https://registry.agentxm.ai`, authenticated as
  `@craigsmitham`, publishing under `@agentxm`.
- Selection: `knowledge/agent-engineering@0.3.0`, `packs/agent-engineering@0.5.0`,
  `skills/{audit,author}-agent-instructions@0.1.1`,
  `skills/{audit,author}-agent-skill@0.3.1`.
- `--preview` immediately beforehand reported `selected: 6, blocked: 0,
  failed: 0, pending: 6`.
- Failures were confined to `knowledge/agent-engineering` (both attempts) and
  `skills/audit-agent-instructions` (first attempt only); the pack was blocked
  each time by `blocked_by_dependency`, which is correct behavior.
- Partial-failure states left the registry temporarily inconsistent: the four
  skills were published at new versions while the knowledge bundle they
  reference was not. No command surfaced that inconsistency as a risk.
- Third attempt succeeded with no edit to the bundle; final state verified as
  all six `active` at the intended versions.
