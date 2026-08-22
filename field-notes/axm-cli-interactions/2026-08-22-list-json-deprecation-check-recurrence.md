---
subject: axm-cli-interactions
key: list-json-deprecation-check-recurrence
date: 2026-08-22
kind: gap
status: open
---

**Expected:** `axm list --json` would provide the fast local inventory described by `axm help basic-usage`; that help distinguishes `axm list --outdated` and `axm list --deprecated` as the remote-checking variants.
**Actual:** Plain `axm list --json` again emitted `Checking extensions for deprecation`, `Checked extension deprecated status`, and `OS keychain unavailable; using restricted credential file.` diagnostics before returning the inventory.
**Gap:** The ordinary-list behavior or its diagnostics imply deprecation and credential work that the local-inventory guidance does not disclose.
**Suggests:** Either keep plain `axm list` local, or update help and command diagnostics to state when and why deprecation or credential state is consulted.

Evidence: AXM CLI `0.27.15`; project scope; command `axm list --json`; repository commit `77c42dc0a717d8c1068c9df69c37cd0ace5d9c99`; observed 2026-08-22 during an audit-only self-audit. Whether the deprecation check performed a network request is unknown.
