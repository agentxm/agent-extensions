---
type: Explanation
title: Repository instruction files
description: How AGENTS.md, CLAUDE.md, and related files keep always-on guidance concise, scoped, and actionable.
tags: [agents.md, claude.md, repository-instructions, always-on-context, routing]
status: stable
generated: { by: "codex/gpt-5.6", at: 2026-08-09T22:12:38Z }
verified:
  - by: codex/gpt-5.6
    at: 2026-08-09T22:13:44Z
stale_after: 2027-02-09
sources:
  - id: agents-md
    resource: https://agents.md/
    title: AGENTS.md
  - id: openai-agents-md
    resource: https://learn.chatgpt.com/docs/agent-configuration/agents-md
    title: OpenAI — Custom instructions with AGENTS.md
  - id: anthropic-context
    resource: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
    title: Anthropic — Effective context engineering for AI agents
---

# Repository instruction files

Repository instruction files such as `AGENTS.md`, `CLAUDE.md`, and host-specific
rules provide persistent feedforward context for software work. Their cost and
effect are paid broadly, so they are appropriate for stable invariants,
high-value commands, non-obvious environment facts, and concise discovery
routes—not an encyclopedia of the codebase.

The open `AGENTS.md` convention describes the file as a predictable,
agent-focused counterpart to a human README.[^agents-md]

## Four useful jobs

| Job | Example shape |
| --- | --- |
| Invariant | Never edit generated output; change its canonical source |
| Working command | After changing this package, run its named validation target |
| Discovery route | Before changing migrations, read the migration guide |
| Environment fact | Integration tests require a local service started by this script |

Background essays, exhaustive alternatives, long workflows, and task backlogs
belong on demand.

## Instruction files as maps

```text
root instructions        universal invariants + high-value routes
  └─ local instructions  scope-specific differences
       ├─ knowledge      facts and explanation
       ├─ skills/guides  reusable workflows
       ├─ tools          observation and action
       └─ checks         deterministic enforcement and feedback
```

A route should name when to act, not only a topic. “Before adding a migration,
read …” is more receivable than “Database documentation.”

Hosts vary in how they compose files. Codex, for example, layers guidance from
broader scope toward the working directory.[^openai-agents-md] The portable
rules are to keep broad guidance genuinely broad, put local differences near
their owner, avoid parent duplication, and make overrides explicit.

## Trim content, protect discovery

| Content | Typical action |
| --- | --- |
| Universal invariant | Keep concise |
| High-leverage trigger and route | Protect or sharpen |
| Full procedure | Move to a skill or guide; retain the trigger |
| Explanation or reference | Move to knowledge; retain a route if needed |
| Parent duplication | Remove |
| Mechanically enforceable convention | Promote to a check or schema |
| Stale or aspirational statement | Correct, qualify, or retire |

## Audit finding classes

| Class | Signal | Typical response |
| --- | --- | --- |
| Duplicate body | Restates a guide or parent | Cut the copy and keep the route |
| Procedure in always-on context | Long reusable how-to | Move it and leave a trigger |
| Weak trigger | Topic label does not establish when to act | Rewrite as a receivable condition |
| Missing route | Agents repeatedly rediscover an existing owner | Add the smallest useful route |
| Stale | Dead path, command, or superseded policy | Correct or retire |
| Wrong layer | Local detail appears at broad scope | Move to the nearest truthful owner |
| Unjustified file | Adds no distinct scoped guidance | Remove after confirming no hidden role |
| Index over-cut risk | A trim strands useful depth | Reject the cut or regroup routes |

Treat instructions as an interface that must be tested from representative
entry points. Anthropic's context guidance favors minimal high-signal content
and just-in-time depth.[^anthropic-context]

[^agents-md]: AGENTS.md
[^openai-agents-md]: OpenAI — Custom instructions with AGENTS.md
[^anthropic-context]: Anthropic — Effective context engineering for AI agents
