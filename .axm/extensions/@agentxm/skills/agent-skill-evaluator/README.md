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
