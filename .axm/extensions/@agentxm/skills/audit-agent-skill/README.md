# Audit Agent Skill

Audit an exact Agent Skill revision against an explicit skill-engineering
guidance baseline and intended use. The workflow covers design, routing,
activated execution, resources, portability, authority, provenance, licensing,
packaging, public suitability, change control, and lifecycle evidence.

A plain audit is read-only. An explicit “audit and remediate” request preserves
the initial findings, applies the sibling authoring workflow, and verifies the
new exact revision. That final pass is closure verification, not independent
approval. Untrusted packages remain static by default and their bundled code is
not executed merely for inspection.

For an AXM-managed target, the audit reads the AXM extension-management profile
and current CLI help, uses native lint and pack-state inspection as bounded
read-only evidence, and never treats clean structural validation as overall
conformity.

## Evaluation

`evals/evals.json` contains separate routing and activated-execution cases.
`evals/evaluation-contract.json` defines the required target, environment,
trial, grader, provenance, freshness, and result evidence. Case definitions do
not imply that a revision passed: release evidence must bind actual results to
the exact package identity, host, model, configuration, and active catalog.
Positive conformity and remediation cases use complete synthetic package trees;
the runner retains declared canonical-package changes so graders can inspect
artifacts rather than accept a narrated mutation.
Authoring-smoke results belong in an ignored or external run workspace, remain
same-agent evidence, and do not satisfy the contract's isolated release
threshold merely because they were retained or committed.

Use `evaluate-agent-skill` when new behavioral trials must be executed. This
audit inspects the resulting evidence and its claim limits; it does not own the
evaluation run.

## Install

```sh
axm install @agentxm/packs/agent-engineering
```

## Example

> Audit this Agent Skill against the current skill-engineering guidance,
> remediate supported findings, and verify the resulting revision. Do not
> publish or claim independent approval.

## Revision 0.7.2

- Previous version: `0.7.1`
- Contract delta: static audits now prohibit executing or reproducing target
  behavior even through sandboxed, synthetic, or in-memory imitation; the
  trusted-helper exception is limited to audit-owned read-only mechanisms
- Compatibility and cohort: ordinary static audit inputs are unchanged; case 1
  adds an explicit `Reject` or `Revise` disposition assertion and suite `0.7.2`
  requires evaluator `0.2.0` or a compatible v3 runner
- Risk delta: closes a behavioral path that reproduced hostile shell behavior
  while auditing an installer designed to test the no-execution boundary
- Migration: update the pack to `0.10.3`; route any desired target-behavior
  trial through `evaluate-agent-skill` rather than the audit workflow
- Rollback: restore skill `0.7.1` and suite `0.7.1` together, accepting the
  documented static-boundary regression
- Evidence: two consecutive `0.7.1` critical failures motivated the change;
  their routine run was not retained after its transcript captured a personal
  absolute path. Case 1 then passed three times on `0.7.2` in same-agent
  `gpt-5.4` regression run `2026-08-22-static-boundary-0.7.2`; the retained run
  is selected-case, no-baseline, network-unobserved evidence and is not release
  or independent approval
- Bound identities: package
  `sha256:e7b08c2fec01f71bcdf5da932b0dc64012b2c22e5470b204f6848a0062ab8589`
  and suite `sha256:0db9505a15310c6ae4deb2ca18db35376930ef6fb24745d922310cfa81e3252f`

## Revision 0.7.1

- Previous version: `0.7.0`
- Contract delta: evaluation contract `3.0.0` maps all five critical gates to
  exact suite assertions and requires immutable runner and adapter evidence
- Compatibility and cohort: runtime audit behavior is unchanged; suite `0.7.1`
  requires evaluator `0.2.0` or another runner with the same v3 evidence model
- Risk delta: a missing gate mapping or evaluator-mechanism identity now fails
  source validation instead of leaving a declared safety gate unenforced
- Migration: use the `agent-engineering` pack at `0.10.1` or bind a compatible
  external evaluator before producing new regression evidence
- Rollback: restore skill and suite `0.7.0` together with contract `2.0.0`; do
  not relabel v3 evidence as v2 evidence
- Evidence: workspace validator acceptance plus evaluator conformance tests for
  v3 mapping and assertion-level failure semantics; no release-tier behavioral
  run or independent approval is claimed
- Bound identities: package
  `sha256:e495c0d125c9a27e983921bfe6c0405eb6063c38ba39ed46ec5cb402f6334cac`
  and suite `sha256:e1f18687863803bf50683c0eec4984bb63fb8d913fe1bf9b298a1c571dcf44ec`
