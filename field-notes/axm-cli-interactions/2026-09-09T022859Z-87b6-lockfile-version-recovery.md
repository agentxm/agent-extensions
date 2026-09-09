---
id: 2026-09-09T022859Z-87b6
subject: axm-cli-interactions
key: lockfile-version-recovery
observed_at: "2026-09-09T02:28:59.108111+00:00"
session: maintenance-release-f2k9
kind: workaround
status: open
---

**Expected:** AXM updates configured extensions from the existing lockfile.

**Observed:** CLI 0.28.12 rejected lockfileVersion 6 with workspace-lockfile-version-unsupported (exit 9). The documented fresh-resolution recovery then failed because each of two configured external packs required an accepted resolution for the other.

**Impact:** Delayed the extension update and required additional recovery commands; elapsed time not measured.

**Recovery:** Preserved the old lockfile, temporarily omitted field-notes from desired state, installed docs, restored desired state, and installed field-notes.

**Detected by:** CLI result and lint.

**Observed factors:** Existing version 6 lockfile; current CLI supports version 7.

**Diagnostic evidence:** The sync apply returned exit 6 and conflict; update returned exit 1 with two failed pack units. No matching accepted resolution was reported for @craigsmitham/packs/docs and @craigsmitham/packs/field-notes.

**Hypothesis:** unknown
