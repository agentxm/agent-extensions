---
type: Explanation
title: Action and observation interfaces
description: How harness interfaces expose useful capabilities and legible environmental state to an agent.
tags: [harness, tools, interfaces, actions, observations, errors]
status: stable
sources:
  - id: anthropic-tool-writing
    resource: https://www.anthropic.com/engineering/writing-tools-for-agents
    title: Anthropic — Writing tools for agents
generated:
  by: codex/gpt-5.6
  at: 2026-08-14T22:24:33Z
stale_after: 2027-02-14
---

# Action and observation interfaces

A harness mediates between model decisions and environmental effects through
interfaces. An action interface exposes what the agent can do; an observation
interface renders state and consequences in a form the agent can use.

The harness owns interface implementation, authorization, execution, and
result validation. Agent engineering owns the behavioral policy for when and
why a capability should be selected, what evidence should precede a
consequential action, and how the result changes the next decision.

Good interfaces form a closed loop:

```text
inspect state → choose action → execute → observe consequence → decide again
```

Each tool should have a distinct purpose, compact and unambiguous inputs,
bounded effects, and results that expose the identifiers and state needed for
the next decision. Errors should distinguish invalid requests, denied
authority, environmental failure, and partial completion, then identify a safe
recovery path.[^anthropic-tool-writing]

Interface quality is systemic. A perfect schema does not help if the runtime
hides relevant state, truncates the decisive output, or reports success before
an effect is durable. Evaluate the full loop on representative tasks, including
failure and retry paths.

[^anthropic-tool-writing]: Anthropic — Writing tools for agents
