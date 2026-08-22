# Evaluate Agent Skill

Produces attributable behavioral evidence for an exact Agent Skill revision by
running routing and activated-execution trials independently, preserving raw
evidence, uncertainty, baselines, environment identity, and claim limits.

Use it to execute a declared Agent Skill evaluation or compare exact revisions.
Use `author-agent-skill` to create or revise the target and evaluation source,
and `audit-agent-skill` to assess conformity, trust, or the reliability of the
resulting evidence. Evaluation does not approve, publish, or promote a skill.

This skill is designed for the `@agentxm/packs/agent-engineering` pack because
it relies on the pack's evaluation knowledge, sibling responsibility
boundaries, and its default `agent-skill-evaluator` runner. The default runner
is replaceable: an explicit trusted runner binding takes precedence, and the
bundled evaluator is used only while AXM reports it enabled.

## Install

```sh
axm install @agentxm/packs/agent-engineering
```

## Example

> Run the declared routing and activated-execution suite for this exact Agent
> Skill revision as regression evidence. Use the previous accepted revision as
> the baseline and keep all generated output in the repository evaluation
> workspace.

## Runner selection

The workflow selects exactly one runner:

1. an explicit runner binding;
2. otherwise the enabled bundled evaluator; or
3. no runner, producing a reserved preflight and `Inconclusive` result without
   run evidence.

Canonical files retained by AXM do not make a disabled evaluator active. The
workflow does not auto-discover executables or fall back to a second runner
after capability preflight fails. External runners may use a different native
interface when a declared adapter or evidence mapping preserves the required
identity, isolation, lifecycle, uncertainty, and evidence semantics.

To make an external runner the persistent workspace choice, disable the
bundled default with `axm skills disable agent-skill-evaluator`. Restore it with
`axm skills enable agent-skill-evaluator`.

## Revision 0.3.1

- Previous version: `0.3.0`
- Contract delta: evaluation contract `3.0.0` binds all six critical gates to
  exact assertions and records immutable runner and adapter evidence
- Compatibility and cohort: runtime evaluation strategy is unchanged; suite
  `0.4.1` requires evaluator `0.2.0` or an equivalent v3-capable runner
- Risk delta: mutation, answer leakage, evidence promotion, contamination, and
  runner-selection gates can no longer remain declared without mappings
- Migration: update the pack to `0.10.1` before collecting new regression runs
- Rollback: restore skill `0.3.0`, suite `0.4.0`, and contract `2.0.0` together
- Evidence: workspace validator acceptance and deterministic evaluator
  conformance; no release-tier behavioral run or independent approval is claimed
- Bound identities: package
  `sha256:e1c2e81c9676e453b1c12909d359353c66f9a3beaf1dc9afc91d4ee6a8416a93`
  and suite `sha256:f36fc197ab4fc21e2c808402ba287ba56de823436071b815bca9bfda5bc3a97e`
