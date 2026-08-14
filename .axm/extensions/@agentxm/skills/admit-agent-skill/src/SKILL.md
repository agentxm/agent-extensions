---
name: admit-agent-skill
description: Decides whether an exact new or materially revised Agent Skill should enter a governed skill library, remain experimental, extend or consolidate an existing skill, be revised, or be rejected. Use for skill admission, approval gates, portfolio-aware change review, ownership acceptance, or reapproval after compatibility, authority, provenance, dependency, owner, host, or model changes. Not for authoring the candidate, evaluating it, auditing untrusted package contents, publishing it, or reviewing a whole library.
---
# Admit an Agent Skill

Make an independent, evidence-bound decision about whether one exact candidate
should alter a governed library. Package validity and successful smoke checks
are inputs, not admission.

This skill is coupled to the skill-engineering pack. From the active AXM scope
root, read:

- `.axm/extensions/@agentxm/knowledge/skill-engineering/src/governance/admission-and-ownership.md`;
- `governance/governance-record.md`; and
- `governance/capability-boundaries-and-risk-tiers.md`.

Read `governance/versioning-deprecation-and-change-control.md` for a revision
and `evaluation/evaluation-model.md` when judging behavioral evidence.

## Authority

Admission is read-only with respect to the candidate and governed library. It
may create an explicitly requested decision record, but it must not revise,
install, enable, publish, deprecate, revoke, retire, or delete a skill. The
candidate author cannot be the sole approver. Do not invent a missing owner,
approval, artifact identity, evaluation, audit, or runtime policy.

## Workflow

1. **Bind the proposal.** Record the canonical candidate, exact version, source
   revision and digest, proposed lifecycle state, intended consumers, active
   cohorts, hosts, models, and evaluation time. Distinguish new admission from
   reapproval of a change.
2. **Recover the contract and delta.** Extract purpose, triggers and exclusions,
   inputs and outputs, completion and failure behavior, compatibility,
   requested capabilities, dependencies, and side effects. For a revision,
   compare the previous accepted identity and classify compatibility and risk
   deltas independently.
3. **Resolve stewardship.** Require a responsible team, backup or escalation
   route, and explicit acceptance of maintenance, incident, evidence-refresh,
   migration, and retirement obligations. Publisher identity is not enough.
4. **Compare the portfolio.** Search current and deprecated skills for the same
   job, overlapping triggers, related resources, replacements, and composition.
   Decide whether the proposal is distinct, belongs in an existing skill, or
   requires consolidation evidence.
5. **Determine controls.** Classify risk from requested and intended effective
   capabilities, data, environment, and autonomy. Identify required automated
   gates and independent owner, platform, security, or domain reviewers.
6. **Assess evidence.** Trace each material claim to structural validation,
   isolated and coexistence evaluations, audit findings, provenance, policy
   enforcement, version and changelog, migration, rollback, and known consumers.
   Treat unavailable evidence as untested.
7. **Test decision integrity.** Confirm the evaluated and audited bytes match
   the candidate, the effective capability policy is no broader than approval,
   conditions are machine-checkable where possible, and author self-approval
   has not replaced separation of duties.
8. **Decide without repairing.** Use `references/admission-decision.md`. State
   scope, evidence, risk, reviewers, conditions, expiry and reapproval triggers.
   Route defects to the smallest responsible workflow without editing them.

## Dispositions

- **Admit experimental** — bounded exposure is justified while named evidence
  accumulates; production or broad implicit use remains prohibited.
- **Admit approved** — every material admission obligation is supported for the
  exact identity, cohort, and effective policy.
- **Extend existing** — the need belongs inside one owned existing skill.
- **Consolidate** — overlapping skills should be evaluated as one replacement
  before any are removed or broadly admitted.
- **Revise** — known correctable defects prevent current admission.
- **Reject** — the proposal lacks a warranted job or creates unacceptable,
  deceptive, or irreconcilable risk for the intended library.
- **Inconclusive** — identity, authority, environment, or material evidence is
  unavailable, so no defensible decision can be made.

## Done when

The decision binds an exact artifact and use; operational ownership is accepted;
portfolio alternatives are considered; compatibility and risk deltas are
separate; every material gate has attributable evidence; reviewers and runtime
conditions are explicit; and neither the candidate nor library was mutated.

