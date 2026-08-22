# Agent Skill Evaluator

Provides the reference provider-neutral runner for validating and executing
Agent Skill evaluation suites. The package includes the runner protocol,
machine-readable schemas, a synthetic conformance adapter, and a Codex CLI
adapter.

A fresh agent-engineering pack installation enables it as the default runner
unless direct AXM intent already disables it. It remains `standalone: true`
because it is self-contained and independently useful; standalone status does
not exclude pack membership. Use the standalone package to integrate or operate
the runner without the pack's evaluation-policy workflow.

## Install

```sh
axm install @agentxm/skills/agent-skill-evaluator
```

Or install the complete workflow:

```sh
axm install @agentxm/packs/agent-engineering
```

## Example

> Use `$agent-skill-evaluator` to validate this Agent Skill's evaluation source
> and run its selected cases through the Codex adapter as authoring-smoke
> evidence.

The runner writes routine evidence under `.work/evals/` and never promotes,
audits, or approves a result.

## Replace the pack default

The `evaluate-agent-skill` workflow may select an explicitly bound trusted
external runner. External runners need an adapter or evidence mapping that
satisfies the evaluation contract, but they do not need to reproduce this
runner's CLI.

For a persistent replacement, retain the managed package but deactivate it:

```sh
axm skills disable agent-skill-evaluator
```

Re-enable the default without reinstalling it:

```sh
axm skills enable agent-skill-evaluator
```

Disabling preserves canonical source and accepted resolution. Retained files
are not permission for another skill to invoke the disabled evaluator. With no
explicit replacement, evaluation preflight is reserved and the higher-level
workflow reports `Inconclusive` without creating run evidence.

## Revision 0.2.1

- Previous version: `0.2.0`
- Contract delta: passing trial records now preserve the normalized
  `failure_class: null` value instead of replacing it with `harness`
- Compatibility and cohort: protocol, contract v3, adapters, suites, and run
  layout are unchanged; only pass-record serialization changes
- Risk delta: removes an internally contradictory pass-plus-harness-failure
  record that could corrupt failure-class slices and downstream interpretation
- Migration: update the pack to `0.10.3`; existing completed records retain
  their original identity and should not be rewritten
- Rollback: restore `0.2.0`, accepting contradictory failure classification on
  passing trials
- Evidence: deterministic conformance now asserts that a passing execution
  trial has a null failure class; the full conformance suite passes
- Bound identities: package
  `sha256:bfe0673500bc9ce98e3c0e706c4668ff909f31462c3c2fdeed135d4d4ca8a244`
  and runner `sha256:bef9606baf5aecd2f976beeee282d358d9713d52d6e3f67bdf3b2299725e9c33`
- Release status: deterministic conformance evidence only; no release-tier
  behavioral evidence or independent approval is claimed

## Revision 0.2.0

- Previous version: `0.1.0`
- Contract delta: validates evaluation contract `3.0.0`, requires immutable
  protocol, runner, host-adapter, and grader-adapter evidence, and derives
  critical failures from exact mapped assertion results
- Compatibility and cohort: contract `2.0.0` packages remain readable with
  legacy case-level gating; all six first-party AgentXM skill suites migrate to
  v3, while third-party v2 packages may migrate independently
- Risk delta: unmapped critical gates and missing evaluator-mechanism identities
  now fail validation instead of silently weakening the result contract
- Migration: add the seven v3 mechanism result fields, replace
  `analysis.critical_case_ids` with `analysis.critical_assertions`, and validate
  every gate, case, and assertion mapping before running trials
- Rollback: restore evaluator `0.1.0`, protocol contract `2.0.0`, and the prior
  suite contracts together; do not read v3 runs with the old evaluator
- Evidence: `scripts/test-runner.mjs` covers missing mechanism identity,
  unmapped and invalid critical assertions, secret isolation, runner selection,
  and assertion-level conclusion gating; suite `0.2.0` adds cases 9 and 10
- Bound identities: package
  `sha256:9abb1d9f16596933304c464fef9e5ea9f6c765bfda10da6ccef40a6e6f24c599`,
  suite `sha256:e070360354585d00be09f68c547d2afc375f2b1d8de56ab2e71c710ea50f7de6`,
  and runner `sha256:49c0e7728fb43c113a2633e723ab09432f9a1f6691d0f54812501fc03fbeebcf`
- Release status: structural and deterministic conformance evidence only;
  independent review, release-tier behavioral evidence, and approval remain
  unclaimed
