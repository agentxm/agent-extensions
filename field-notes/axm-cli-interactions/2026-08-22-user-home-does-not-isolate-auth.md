---
subject: axm-cli-interactions
key: user-home-does-not-isolate-auth
date: 2026-08-22
kind: gap
status: open
---

**Expected:** Setting `AXM_USER_HOME` to a fresh directory should relocate
credentials and pending login state, as documented by `axm help environment`,
so a separate scoped device login can proceed without replacing the active
publisher credential.
**Actual:** `axm login --device-code --scope extensions:admin --json` reported
the existing `@craigsmitham` session as already logged in, while the fresh
`AXM_USER_HOME` directory remained empty. Inspection of the installed 0.27.15
executable showed credential and pending-login stores resolving `HOME`,
`USERPROFILE`, or `HOMEPATH` directly.
**Gap:** The supported environment contract and the login credential-resolution
implementation disagree, preventing isolated reauthorization.
**Suggests:** Route both credential and pending-device-login storage through
the same resolved AXM user home used by other user-scope state, and add an
integration test that proves two `AXM_USER_HOME` values have independent auth
state.

Evidence: AXM CLI and installed skill were both 0.27.15. The temporary path
contained no files after login, and attempts with both `--device-code` and the
Registry-suggested `--scope extensions:admin` remained no-ops against the
existing publish-scoped session.
