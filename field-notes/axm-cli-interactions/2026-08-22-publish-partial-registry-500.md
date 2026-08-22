---
subject: axm-cli-interactions
key: publish-partial-registry-500
date: 2026-08-22
kind: workaround
status: open
---

**Expected:** An exact, admitted eight-package `axm publish` selection should publish the dependency graph or return an actionable package-level rejection.
**Actual:** Three packages published, four independent skill uploads returned retryable Registry HTTP 500 responses that AXM did not replay because the requests were unsafe to retry, and the dependent pack was blocked. AXM printed one exact recovery command using `--on-existing verify`.
**Gap:** A transient Registry failure can leave a reviewed dependency graph partially published and require a manual recovery invocation even after preview admission succeeds.
**Suggests:** Make graph publication resumable through a first-class publish-resume operation or durable run identity that verifies completed uploads and safely retries only unfinished packages.

Evidence: The admitted selection contained eight `@agentxm` packages. `agent-skill-evaluator@0.2.2`, `author-agent-instructions@0.1.5`, and `agent-engineering` knowledge `@0.9.0` published; four skill uploads reported HTTP 500; `agent-engineering` pack `@0.10.4` was blocked on those failures; the CLI emitted a five-package recovery command with `--on-existing verify`.
