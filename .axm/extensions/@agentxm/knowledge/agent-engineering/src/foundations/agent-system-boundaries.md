---
type: Reference
title: Agent-system boundaries
description: Assigns behavioral, informational, model-facing, runtime, workflow, skill, and evaluation responsibilities.
tags: [agent-systems, boundaries, ownership, harness, context, prompt, workflow, skills, evaluation]
status: stable
sources:
  - id: openai-sdk
    resource: https://openai.github.io/openai-agents-python/
    title: OpenAI Agents SDK
  - id: anthropic-agents
    resource: https://www.anthropic.com/engineering/building-effective-agents
    title: Anthropic — Building effective agents
generated: { by: "codex/gpt-5.6", at: 2026-08-14T22:24:33Z }
stale_after: 2027-02-14
---

# Agent-system boundaries

Assign responsibility to the smallest surface whose design can explain and
repair the behavior. Influence is shared; ownership should not be.

| Concern | Behavioral owner | Neighboring mechanism |
| --- | --- | --- |
| Goal and completion | Agent engineering defines outcome, responsibility, evidence, stopping, escalation | Prompt expresses; harness enforces hard limits and captures evidence |
| Tool use | Agent engineering defines when, why, and how capability is selected | Harness implements, authorizes, executes, and validates; prompt describes |
| Observation | Agent engineering defines what evidence decisions require | Harness exposes signals; context selects and represents them |
| Memory | Agent engineering defines what may influence later behavior | Context owns provenance, scope, freshness, compaction, retirement; harness persists |
| Planning and recovery | Agent engineering defines decisions, replanning, retry, fallback, escalation | Harness reports failure and applies budgets or limits |
| Delegation and handoff | Agent engineering defines actors, responsibilities, authority, artifacts, acceptance | Harness dispatches and transfers state; prompt carries model-facing wording |
| Durable process | Agent engineering owns dynamic choices inside an agent step | Workflow automation owns schedules, dependencies, retries, cancellation, and compensation |
| Reusable job | Agent engineering may select or delegate a job | Skill engineering owns routing, packaged procedure, resources, trust, and lifecycle |
| Evaluation | Agent engineering defines behaviors, risks, and scenarios that matter | Evaluation engineering owns sampling, trials, graders, uncertainty, validity, and reporting |

An SDK may package agents, tools, loops, handoffs, guardrails, sessions,
human-in-the-loop controls, and tracing together.[^openai-sdk] Product
co-location does not erase the conceptual boundaries: each failure still needs
an accountable design surface. The same holds for practitioner patterns that
combine routing, parallel workers, evaluators, and agents in one implementation.[^anthropic-agents]

Use cross-layer changes when evidence shows several surfaces jointly caused a
failure, but state each change's responsibility. Avoid “the agent” as a label
for the entire application, platform, harness, or workflow graph.

[^openai-sdk]: OpenAI Agents SDK
[^anthropic-agents]: Anthropic — Building effective agents
