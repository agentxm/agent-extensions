# Author Agent Skill

Create a new portable Agent Skill or revise an existing one from defined or
changed requirements, concrete workflow evidence, accepted audit findings, or
observed failures. The skill is a thin execution layer over the authoritative
authoring and interaction guidance in the coupled `agent-engineering` knowledge
bundle.

Use it for requests to create, fix, update, adapt, restructure, or remediate an
Agent Skill. Use `audit-agent-skill` to assess conformity or verify closure;
use `evaluate-agent-skill` to execute controlled behavioral suites. Authoring
does not independently certify its own changes.

When authoring changes behavior, the workflow keeps versioned evaluation source
separate from generated runs, preserves confirmed failures as regressions, and
labels same-agent exercises as authoring smoke rather than release evidence.

When the target owns a meaningful user-facing sequence, the workflow applies
the agent-engineering guidance for openings, progress, questions, interaction
surfaces, gates, and closeouts. It leaves one-step and non-interactive skills
free of unnecessary interaction ceremony.

## Install

```sh
axm install @agentxm/packs/agent-engineering
```

## Example

> Revise this Agent Skill to address findings A-01 and A-03. Preserve its
> supported routing behavior, preserve the motivating cases, validate the
> package, and record any remaining evidence needed for closure.
