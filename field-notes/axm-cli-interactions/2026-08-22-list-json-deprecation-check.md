---
subject: axm-cli-interactions
key: list-json-deprecation-check
date: 2026-08-22
kind: gap
status: open
---

**Expected:** `axm list --json` would provide the fast local inventory described by `axm help basic-usage`; that help distinguishes `axm list --outdated` and `axm list --deprecated` as the remote-checking variants.
**Actual:** Plain `axm list --json` emitted `Checking extensions for deprecation`, `Checked extension deprecated status`, and `OS keychain unavailable; using restricted credential file.` diagnostics before returning the inventory.
**Gap:** The ordinary-list behavior or its diagnostics imply deprecation and credential work that the local-inventory guidance does not disclose.
**Suggests:** Either keep plain `axm list` local, or update help and command diagnostics to state when and why deprecation or credential state is consulted.

Evidence: AXM CLI `0.27.15`; project scope; command `axm list --json`; repository commit `992d444626cec321c6235d91aafd73b58603f6fe`; observed 2026-08-22T13:00:56-05:00. Whether the deprecation check performed a network request is unknown.
