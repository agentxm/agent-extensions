---
subject: axm-cli-interactions
key: pack-uninstall-requires-intact-package
date: 2026-08-17
kind: workaround
status: open
---

**Expected:** `axm uninstall @agentxm/packs/<name>` would unregister a pack from
`.axm/settings.json` regardless of whether its canonical package directory still
existed on disk. `axm lint` had just reported the packs as
`workspace/configured-but-not-installed` — "declares a workspace source, but its
authored canonical package is missing from .axm/extensions" — which reads as an
invitation to uninstall the stale entry.

**Actual:** All three uninstalls failed with
`Cannot uninstall packs while the desired pack graph is incomplete (validation)`
and exit non-zero. The same three packs were simultaneously reported by
`workspace/desired-state-reconcilable` as not forming "a reconcilable
desired-state route", so lint flagged the state but the documented removal
command refused to act on it.

**Gap:** Pack uninstall validates the whole desired pack graph before removing
anything, so a pack whose package is already deleted cannot be unregistered —
the very condition lint reports. Deleting the package directory first is a
natural authoring order (remove the extension, then remove its registration),
and it strands the workspace in a state only lint can describe.

**Suggests:** Let `axm uninstall <pack-fqn>` unregister a pack whose canonical
package is already absent, or have `axm lint --fix` reconcile
`configured-but-not-installed` pack entries. Failing that, have the
`configured-but-not-installed` finding state the required order explicitly.

Evidence:

- AXM 0.27.7, project workspace `/Users/craig/Code/agentxm/agent-extensions`.
- Sequence: `git rm -r` the three pack directories → `axm lint` reports 8
  findings including the three pack entries → `axm uninstall
  @agentxm/packs/context-engineering` fails with the validation error.
- Workaround: `git checkout HEAD -- <the three pack dirs>` to restore the
  packages, then `axm uninstall @agentxm/packs/<name>` succeeded for each and
  removed both the settings entry and the directory
  (`removed: .axm/extensions/@agentxm/packs/context-engineering`).
- `axm uninstall @agentxm/knowledge/<name>` did **not** show this behavior: all
  five knowledge bundles unregistered cleanly with their canonical packages
  already deleted.
- Post-workaround `axm lint` returned to one unrelated pre-existing finding.
