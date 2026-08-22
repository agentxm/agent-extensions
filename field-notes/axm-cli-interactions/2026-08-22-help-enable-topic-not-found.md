---
subject: axm-cli-interactions
key: help-enable-topic-not-found
date: 2026-08-22
kind: gap
status: open
---

**Expected:** `axm help enable` and `axm help disable` would expose lifecycle semantics after the installed AXM skill directed extension lifecycle questions to relevant `axm help` topics.
**Actual:** `axm help enable` returned `Unknown help topic: enable` and suggested running `axm help`; lifecycle details were instead found under the extension-type topic `axm help packs`.
**Gap:** Lifecycle verbs are discoverable as command help or sections inside type topics, but not as top-level help topics named after the verbs, and the initial error does not point to the relevant type topic.
**Suggests:** Add lifecycle help aliases or have unknown lifecycle-topic errors point to `axm <type> <verb> --help` and the relevant extension-type help topics.

Evidence: In the repository workspace with AXM 0.16.1 on 2026-08-22, `axm help enable` returned an unknown-topic error; `axm help` listed `skills`, `packs`, and `workspace-state` but no `enable` or `disable` topics; `axm help packs` documented enable/disable precedence and canonical-content retention.
