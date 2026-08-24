---
subject: axm-cli-interactions
key: publish-registry-failure-recurrence
date: 2026-08-24
kind: workaround
status: open
---

**Expected:** An admitted five-package publish selection should upload its four
independent leaves and then the dependent pack, or complete through transparent
safe recovery.
**Actual:** all four leaf uploads reported retryable Registry failures—one HTTP
500 and three timeouts—and the pack was blocked. AXM declined unsafe replay and
printed an exact `--on-existing verify` recovery command.
**Gap:** the previously observed partial-publish failure mode recurred, this time
without any leaf reported as published, so an admitted graph still requires a
manual recovery invocation after transient Registry failures.
**Suggests:** persist an attributable publish run and offer a resumable command
that verifies ambiguous uploads and safely continues unfinished graph nodes.

Evidence: AXM CLI `0.27.17`; five explicitly selected public `@agentxm`
packages; authoritative preview admitted the graph; apply reported one internal
HTTP 500, three Registry timeouts, one dependency-blocked pack, and a five-item
recovery command using `--on-existing verify`.
