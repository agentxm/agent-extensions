---
name: author-agent-skill
description: Creates or revises portable Agent Skills and their versioned evaluation source from defined requirements, workflow evidence, or accepted findings. Use when asked to create, extract, implement, fix, update, adapt, restructure, or remediate an Agent Skill, SKILL.md package, or its evaluation contracts, cases, fixtures, graders, or harness inputs. Compose with the AXM skill before changing managed packages. Not for executing behavioral suites, independently auditing a skill, verifying remediation closure, or approving it for use.
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
- Read `evaluation/evaluating-agent-skills.md` when creating or changing
  behavioral claims, evaluation cases, graders, or harness inputs.
- Read `evaluation/managing-evaluation-assets-and-evidence.md` whenever the
  target package or repository creates, stores, promotes, or migrates
  evaluation artifacts.
- When evaluation source changes, apply the runner-selection contract at the
  direct
  `.axm/extensions/@agentxm/skills/evaluate-agent-skill/src/references/runner-selection.md`
  sibling. Use an explicitly bound trusted validator when supplied; otherwise
  use the bundled `agent-skill-evaluator` only when AXM reports it enabled. Do
  not invoke retained source from a disabled extension or auto-discover an
  executable. Do not add a package-local generic runner; target-specific
  fixtures, assertions, and deterministic graders remain authored evaluation
  source.
- Read `agents/agent-mediated-user-experience.md` when the skill presents a
  meaningful user-facing sequence through openings, progress, questions,
  checkpoints, gates, or closeouts; skip it for one-step or non-interactive
  skills.
- Read `skills/decision-support-presentations.md` when the workflow compares
  alternatives, recommends one, or leaves a consequential choice with a human;
- Read `skills/platforms/axm.md` whenever AXM manages the target package, and
  use the installed `axm` skill plus current CLI help as the operational
  authority. AXM is an extension-management layer, not a host claim.
- Read another profile under `skills/platforms/` only for a host the target
  explicitly supports.
- Read the relevant concept under `prompts/` only when a model-facing prompt,
  example, template, or response presentation is part of the target.

## Authority

Resolve and edit the canonical package source through its extension manager or
host. Before writing, resolve the target package, the repository-authoritative
evaluation-source root, and any manager-owned desired or projected state that
the canonical create or revise operation strictly requires. Creation or
revision authorizes writes only to those bounded surfaces. Do not install,
enable, publish, approve, change unrelated extensions, add credentials, or
perform the authored workflow's external side effects unless separately
requested.

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
3. For revision or remediation, preserve each confirmed motivating failure as
   evaluation source before changing behavior. For greenfield creation, derive
   representative cases from the commissioned requirements, label unsupported
   assumptions, and do not invent a prior field failure. Keep contracts, cases,
   fixtures, graders, and harness inputs in the repository's evaluation-source
   location, outside the runtime payload unless execution genuinely needs them.
4. Validate the package, evaluation source through the selected trusted
   validator, and changed deterministic helpers. If no validator is selected,
   preserve the source and report mechanical evaluation-source validation as
   unavailable rather than invoking a disabled or undeclared mechanism.
   Exercise routing and execution in proportion to the change; include affected
   regressions and any claimed rich and plain interaction paths. When a
   description is revised against measured routing results, hold out decision
   cases before the first revision so the reported result is not a measure of
   its own tuning. Write generated runs only to the repository's ignored or
   external evaluation workspace. Label same-agent or non-isolated exercises as
   authoring smoke and never promote them to release evidence.
   When the caller requests a controlled behavioral run beyond authoring smoke,
   hand the exact target and suite to the direct sibling
   `.axm/extensions/@agentxm/skills/evaluate-agent-skill/src/SKILL.md`; authoring
   owns source changes, while evaluation owns execution and run evidence.
5. Hand off the canonical identity, files changed, evaluation source, generated
   workspace when present, evidence class, checks and exercises, public-contract
   or authority deltas, assumptions, and remaining independent evaluation,
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
responsible surfaces changed; evaluation source and generated evidence have
truthful owners; representative checks pass; material authority and
compatibility deltas are visible; and remaining evaluation, audit, or governance
claims are stated without self-certification.
