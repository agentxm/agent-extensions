---
subject: axm-cli-interactions
key: commit-hook-duplicates-staged-package
date: 2026-08-22
kind: blocked
status: open
---

**Expected:** A commit containing one staged canonical Agent Skill package and
its shared evaluation harness would pass the repository commit hook after
`axm lint --view git-index --strict` reported no findings.
**Actual:** `git commit` exited 1 before creating a commit and reported that the
public package inventory differed from the approved seven-package set, with
`skills/audit-agent-skill` shown twice as additions.
**Gap:** The hook output does not identify why one staged package is counted
twice or why its inventory result differs from the successful index-only lint.
**Suggests:** Include the inventory source/view, each counted package path, and
the rule that produced duplicate entries in the hook diagnostic.

Evidence: Branch `main` at `a74623c`; the index contained the canonical
`@agentxm/skills/audit-agent-skill` package plus `scripts/evals` harness changes;
`axm lint --view git-index --strict --details --non-interactive` exited 0 with
no findings immediately before the commit; the commit hook printed a diff with
two identical added `skills/audit-agent-skill` lines and created no commit.
