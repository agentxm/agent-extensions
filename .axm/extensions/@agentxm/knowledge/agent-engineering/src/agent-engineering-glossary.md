---
type: Reference
title: Agent engineering glossary
description: Concise definitions for agency, control, tools, memory, delegation, oversight, and neighboring system layers.
tags: [agent-engineering, agency, autonomy, planning, tools, memory, delegation, oversight, terminology]
status: stable
sources:
  - id: agent-survey
    resource: https://arxiv.org/abs/2308.11432
    title: A Survey on Large Language Model based Autonomous Agents
  - id: anthropic-agents
    resource: https://www.anthropic.com/engineering/building-effective-agents
    title: Anthropic — Building effective agents
generated: { by: "codex/gpt-5.6", at: 2026-08-14T22:24:33Z }
stale_after: 2027-02-14
---

# Agent engineering glossary

**Agent**
: A software actor in which a model dynamically selects at least some next
  actions from observations while pursuing a goal.

**Agent engineering**
: Designing and stewarding the agent's behavioral contract and control policy:
  goals, decisions, planning, capability use, memory influence, coordination,
  stopping, escalation, trust, reliability, and lifecycle.

**Agentic workflow**
: A predefined workflow containing one or more steps whose internal path is
  selected dynamically by a model.

**Autonomy**
: The degree of decision freedom exercised without prior human selection,
  considered together with authority, duration, supervision, reversibility,
  and consequence.

**Control loop**
: The repeated observation, decision, action, and feedback cycle through which
  an agent pursues and revises progress toward a goal.

**Goal contract**
: The outcome, responsibilities, constraints, evidence, stop conditions, and
  escalation conditions that define the agent's assignment.

**Plan**
: An explicit, revisable commitment about intended intermediate outcomes and
  actions; it is not a demand to expose hidden chain-of-thought.

**Tool-use policy**
: Behavioral rules for when, why, and in what sequence an agent selects
  capabilities and interprets their results.

**Memory policy**
: Rules for what information may influence later decisions, at what scope,
  with what provenance and expiry; storage is a harness concern.

**Delegation**
: Assigning a bounded responsibility and authority to another actor while
  retaining an explicit acceptance, escalation, or return path.

**Handoff**
: A transfer of responsibility accompanied by the goal, relevant state,
  authority, expected artifact, acceptance conditions, and unresolved risks.

**Human oversight**
: The means by which people understand, direct, approve, interrupt, correct,
  or stop agent behavior and remain accountable for deployment decisions.

**Harness**
: The system that implements the agent loop and provides model invocation,
  tools, runtime, persistence, feedback, permissions, and enforcement.

**Context**
: Information represented and made available for current decisions, including
  instructions, observations, history, retrieved knowledge, and feedback.

**Workflow**
: An inspectable execution definition whose primary control path, dependencies,
  retries, and lifecycle are specified outside model discretion.

**Agent-specific evaluation obligation**
: A behavior, risk, trajectory, or scenario the agent design requires an
  evaluation system to measure using general evaluation methods.

Anthropic's practical distinction is useful: workflows follow predefined code
paths, while agents dynamically direct their process and tool use.[^anthropic-agents]
Survey taxonomies commonly decompose an agent into planning, memory, action,
and a profile or role, but the engineering boundary also includes human
control, trust, operations, and lifecycle.[^agent-survey]

[^anthropic-agents]: Anthropic — Building effective agents
[^agent-survey]: A Survey on Large Language Model based Autonomous Agents
