---
id: 2026-08-25T165432Z-k8r3
subject: axm-cli-interactions
key: workspace-pack-settings-reencode
observed_at: "2026-08-25T16:54:32Z"
session: s4k9p2
kind: blocked
status: open
---

**Expected:** `axm install --yes` should preserve compact `workspace` entries while resolving packs that include workspace-authored dependencies.
**Observed:** AXM installed six extensions, then failed while applying the workspace Knowledge bundle with `Failed to encode settings: Workspace package "agent-engineering" must use the compact source "workspace" in knowledge`; five later steps were blocked.
**Impact:** Source-qualified workspace migration could not complete; one install attempt partially applied six of eleven extension steps before stopping.
**Recovery:** Not yet recovered when captured; the temporary legacy workspace backup remains available.
**Detected by:** Non-zero exit from `axm install --yes` during fresh workspace reconciliation.
**Observed factors:** AXM was the locally built source-qualified CLI; `axm.json` already held `knowledge.agent-engineering: "workspace"`; the authored Knowledge package and pack share owner `@agentxm`.
**Diagnostic evidence:** Exit status 1; failed identity `agent-engineering`; error category `internal`; five blocked steps included three packs and shared projections.
**Hypothesis:** A pack dependency write path reconstructs the internal `workspace:@owner/type/name` identity and passes it to the settings encoder instead of retaining the compact persisted form.
**Suggests:** Normalize workspace identities at the settings-mutation boundary and cover packs containing direct workspace-authored members.
