---
id: 2026-09-02T202947Z-p3h8
subject: axm-cli-interactions
key: public-package-inventory-manual-update
observed_at: "2026-09-02T20:29:47Z"
session: s9q4p2
kind: workaround
status: open
---

**Expected:** After AXM scaffolded a workspace-owned public Knowledge package
and the documented lint, sync, and publish-preview gates passed, the repository
commit gate was expected to accept the staged package or identify any required
inventory registration before publication.

**Observed:** The first commit attempt stopped with `Public package inventory
differs from the approved 8-package set` and a diff adding
`knowledge/desktop-agents`. Repository search located a manually maintained
`expected` array in `scripts/check-public-safety.sh`. The same script also
required every public manifest homepage to equal the repository root, while
the new manifest used its package subdirectory page.

**Impact:** One commit attempt was stopped. Recovery required a public-safety
inventory edit, a manifest metadata correction, a version bump from 0.1.0 to
0.1.1 because 0.1.0 had already been published, and a second publication.

**Recovery:** Added `knowledge/desktop-agents` to the approved inventory,
aligned the manifest homepage with repository policy, and staged version
0.1.1. The git-index public-safety gate and its integration tests both passed;
the commit workflow could continue.

**Detected by:** The commit hook output, followed by read-only repository
search and inspection of `scripts/check-public-safety.sh`.

**Observed factors:** AXM CLI version 0.28.4; new workspace-owned Knowledge
package; public Registry visibility; clean AXM lint and publish preview before
the first commit; no commit was created by the failed attempt.

**Diagnostic evidence:** Commit exit status unavailable — output was not
retained; stable gate message `Public package inventory differs from the
approved 8-package set`; diff addition `knowledge/desktop-agents`; affected
files `scripts/check-public-safety.sh` and
`knowledge/desktop-agents/knowledge.json`.

**Hypothesis:** New package scaffolding and repository admission are separate
workflows, and the manual allowlist and homepage constraint are not surfaced by
the ordinary AXM lint or publish preview.

**Suggests:** Make first-party package admission discoverable before publish,
or validate repository-owned inventory and manifest constraints in the
documented prepublish gate.
