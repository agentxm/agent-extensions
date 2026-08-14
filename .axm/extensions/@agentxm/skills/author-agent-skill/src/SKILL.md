---
name: author-agent-skill
description: Creates or revises portable Agent Skills from concrete workflow evidence, including job boundaries, routing descriptions, instructions, references, assets, scripts, validation, and representative exercises. Use when asked to create, extract, implement, or modify an Agent Skill or SKILL.md package. Not for independent behavioral evaluation or reviewing an untrusted skill for installation.
---
# Author an Agent Skill

Create one coherent, portable Agent Skill from evidence about work that should
repeat. Do not freeze an imagined workflow into a skill merely because it can
be described.

This skill is coupled to direct siblings in the skill-engineering pack. From
the active AXM scope root, read only the concepts needed from
`.axm/extensions/@agentxm/knowledge/skill-engineering/src/`. Begin with:

- `design/candidate-selection.md` to test whether the work warrants a skill;
- `design/routing-and-activation.md` for the description contract;
- `design/workflow-contracts.md` for instructions and authority; and
- `design/resources-scripts-and-assets.md` when bundled resources are needed.

Read `design/decision-support-presentations.md` when the skill compares options,
makes a recommendation, or otherwise structures a consequential human choice.
For any model-facing prompt, template, example, or response contract, open only
the needed direct sibling under
`.axm/extensions/@agentxm/knowledge/prompt-engineering/src/`: begin with
`design/prompt-contracts.md`; add `design/response-and-presentation-contracts.md`
when order, labels, emphasis, repetition, or handoff are consequential; add
`design/templates-and-composition.md` when several prompt fragments or reusable
templates must compose.

Read `governance/governance-record.md` when the skill will enter a governed
library or materially changes an accepted version. Read a platform profile only
for a host the target explicitly supports.

## Inputs and authority

Use concrete successful and failed examples, the intended users and hosts,
required tools and permissions, the target location, and repository-local
instructions. Discover missing repository facts when they are locally
available. Ask only when a missing choice would materially change the skill.

Creation or revision authorizes writes only inside the resolved target package
and ordinary generated projections owned by its package manager. Do not install
globally, publish, change unrelated extensions, add credentials, or perform the
workflow's external side effects unless the caller separately authorizes them.

## Workflow

1. **Inspect the host.** Read local instructions and the package manager or
   harness help that governs extension authoring. Resolve the canonical source;
   never edit an agent-specific projection when another source owns it.
2. **Ground the candidate.** List representative positive examples, failures or
   friction, and adjacent work that should remain outside. If the work has not
   repeated and lacks a coherent completion condition, recommend continued
   observation instead of authoring.
3. **Bound one job.** State `Starts when`, `Succeeds when`, and `Does not own`.
   Split unrelated triggers or outcomes; retain genuine variations of one job.
4. **Define contracts.** Record inputs, discoverable facts, output, observers,
   authority, side effects, failure behavior, and completion evidence. When
   presentation affects interpretation, comparison, authority, or downstream
   use, also record required fields, relative order, repetition, optionality,
   and final handoff. Distinguish requested capability from what a host will
   effectively enforce.
5. **Choose contents.** Keep judgment and recovery in instructions. Add a
   focused reference for conditional facts, an asset for reusable output
   material, and a script only for exact repeated mechanics. Keep a short strict
   presentation template at the step that emits it; route to one supporting
   template when it would otherwise obscure the workflow. Declare every
   dependency and material side effect.
6. **Write routing metadata.** Lead with what the skill does, then concrete
   `Use when` triggers. Add a negative boundary where adjacent skills or general
   model capability could over-match. Keep registry prose separate.
7. **Author through the host.** Use the repository's extension manager or
   scaffold. Keep `SKILL.md` as the control plane, reference supporting files
   at the step that needs them, and keep references shallow.
8. **Validate mechanics.** Run the host and format validators. Check links,
   names, manifests, license metadata, scripts, fixtures, and projections.
   Actually test any new deterministic helper with synthetic inputs.
9. **Exercise behavior.** Run at least a clear positive, a paraphrased positive,
   and an adjacent negative. Confirm the expected resources load, the stated
   completion evidence appears, and any contractual presentation preserves its
   required order, uniqueness, parallelism, and handoff. This is an authoring
   smoke test, not an independent evaluation verdict.
10. **Prepare governance claims.** For a governed library, record purpose,
    requested capabilities, dependencies, supported environments, proposed
    owner, lifecycle state, and related or superseded skills. For a revision,
    classify compatibility and risk deltas independently. Do not write approval,
    reviewer, effective-policy, or runtime-observation fields owned elsewhere.
11. **Handoff.** Summarize the package identity, supported examples, validation
    evidence, exercises, known assumptions, and evaluation, audit, or admission
    still needed. Use `references/authoring-handoff.md` when a durable report is
    requested. Never describe authoring evidence as admission or self-approval.

## Revision from evidence

Classify an observed failure before editing:

| Failure | Smallest likely owner |
| --- | --- |
| Missed or over-eager activation | Routing description or invocation policy |
| Missing judgment or recovery | Workflow instructions |
| Missing conditional fact | Focused reference |
| Inconsistent ordering, labels, emphasis, or repetition | Presentation contract or template |
| Repeated mechanical error | Script or deterministic check |
| Unavailable capability | Environment or tool contract |
| Excess authority or unsafe action | Permission and escalation boundary |

Change only the responsible contract, preserve supported behavior, and rerun
the affected cases plus one adjacent-negative regression case.

## Done when

The target is canonical and valid; one job and its non-goals are clear; routing
uses recognizable language; authority and environment assumptions are visible;
supporting resources are necessary and reachable; new scripts work on synthetic
inputs; contractual presentation is explicit and exercised; representative
exercises pass; and remaining evaluation or trust claims are stated rather than
implied. For a governed target, authored governance claims and change deltas are
complete without manufacturing approval fields.
