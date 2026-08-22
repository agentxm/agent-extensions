# Evaluate Agent Skill

Produces attributable behavioral evidence for an exact Agent Skill revision by
running routing and activated-execution trials independently, preserving raw
evidence, uncertainty, baselines, environment identity, and claim limits.

Use it to execute a declared Agent Skill evaluation or compare exact revisions.
Use `author-agent-skill` to create or revise the target and evaluation source,
and `audit-agent-skill` to assess conformity, trust, or the reliability of the
resulting evidence. Evaluation does not approve, publish, or promote a skill.

This skill is designed for the `@agentxm/packs/agent-engineering` pack because
it relies on the pack's evaluation knowledge and sibling responsibility
boundaries.

## Install

```sh
axm install @agentxm/packs/agent-engineering
```

## Example

> Run the declared routing and activated-execution suite for this exact Agent
> Skill revision as regression evidence. Use the previous accepted revision as
> the baseline and keep all generated output in the repository evaluation
> workspace.
