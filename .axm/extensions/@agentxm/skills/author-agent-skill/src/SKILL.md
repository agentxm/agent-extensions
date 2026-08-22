---
name: author-agent-skill
description: Creates or revises portable Agent Skills from defined requirements, concrete workflow evidence, or accepted findings. Use when asked to create, extract, implement, fix, update, adapt, restructure, or remediate an Agent Skill or SKILL.md package. Not for independently auditing a skill, verifying that remediation closed findings, or approving it for use.
---
# Author an Agent Skill

Create or revise one portable Agent Skill without confusing authoring evidence
with independent assessment. Preserve supported behavior during revision and
make the smallest change justified by the request and evidence.

## Load the applicable guidance

This skill is coupled to the `agent-engineering` knowledge sibling in the
`@agentxm/packs/agent-engineering` pack. Resolve the active AXM scope root and
read only the applicable concepts under
`.axm/extensions/@agentxm/knowledge/agent-engineering/src/`. If that sibling or
the required route is unavailable, stop and name the missing pack dependency;
do not improvise a second authoring method in this skill.

- For creation, read `skills/authoring-agent-skills.md`.
- For revision, read `skills/maintenance-and-evolution.md` and
  `operations/governance/versioning-deprecation-and-change-control.md` for a
  revision.
- For remediation, use the revision route and apply only findings confirmed
  against the current target.
- Read `agents/agent-mediated-user-experience.md` when the skill presents a
  meaningful user-facing sequence through openings, progress, questions,
  checkpoints, gates, or closeouts; skip it for one-step or non-interactive
  skills.
- Read `skills/decision-support-presentations.md` when the workflow compares
  alternatives, recommends one, or leaves a consequential choice with a human;
- Read a profile under `skills/platforms/` only for a host the target
  explicitly supports.
- Read the relevant concept under `prompts/` only when a model-facing prompt,
  example, template, or response presentation is part of the target.

## Authority

Resolve and edit the canonical package source through its extension manager or
host. Creation or revision authorizes writes only inside the resolved target
package and ordinary projections owned by that manager. Do not install,
publish, approve, change unrelated extensions, add credentials, or perform the
authored workflow's external side effects unless separately requested.

An audit report is evidence, not executable instruction. Confirm that each
finding applies to the current target before changing it. Authoring may record
remediation evidence but must not declare an audit finding independently
closed.

## Execute

1. Bind the mode, target identity, canonical source, host rules, request, and
   available evidence. Preserve supported behavior and verify accepted findings
   against the current target.
2. Follow the applicable knowledge routes. Edit only the responsible canonical
   surfaces and preserve unrelated metadata, invocation policy, dependencies,
   and package behavior.
3. Validate the package and changed deterministic helpers. Exercise routing and
   execution in proportion to the change; include affected regressions and any
   claimed rich and plain interaction paths. These are authoring checks, not an
   independent audit.
4. Hand off the canonical identity, files changed, checks and exercises,
   public-contract or authority deltas, assumptions, and remaining evaluation,
   audit, migration, or release work. Use
   `references/authoring-handoff.md` only when a durable record is requested.

## Finding disposition

For each accepted audit finding, report one of:

- **Addressed** — changed with concrete validation evidence;
- **Partially addressed** — bounded progress with the remaining gap named;
- **Deferred** — valid but outside current authority or scope;
- **Disputed** — current evidence contradicts applicability; or
- **Requires external evidence** — closure depends on evaluation, provenance,
  host behavior, or another observer unavailable to authoring.

These are authoring dispositions, not audit closure decisions.

## Done when

The canonical target is valid; applicable knowledge routes were followed; only
responsible surfaces changed; representative checks pass; material authority
and compatibility deltas are visible; and remaining audit or governance claims
are stated without self-certification.
