# Agent engineering pack

Installs one knowledge bundle for designing goal-directed AI agent systems,
plus the workflows for authoring and auditing agent instructions and for
authoring, evaluating, and auditing the Agent Skills that shape them.

The knowledge covers agent behavior, multi-agent coordination, prompts,
context, harness, skills, evaluation, trust, and operations as sections of a
single body rather than as separate bundles. The pack does not add a framework,
runtime, or executable agent.

AXM supplies the extension-manager workflow used when these skills change
managed packages; it is workspace management infrastructure, not an agent
host, and is not installed as a pack dependency.

## Install

```bash
axm install @agentxm/packs/agent-engineering
```

## Contents

| Extension | Purpose |
| --- | --- |
| `@agentxm/knowledge/agent-engineering` | The knowledge bundle |
| `@agentxm/skills/author-agent-instructions` | Create or revise AGENTS.md, CLAUDE.md, and scoped instruction files |
| `@agentxm/skills/audit-agent-instructions` | Audit an instruction system against the knowledge |
| `@agentxm/skills/author-agent-skill` | Create or revise a portable Agent Skill |
| `@agentxm/skills/agent-skill-evaluator` | Default provider-neutral Agent Skill evaluation runner; independently installable and replaceable |
| `@agentxm/skills/evaluate-agent-skill` | Run attributable routing and activated-execution evaluations for an exact Agent Skill revision |
| `@agentxm/skills/audit-agent-skill` | Audit an Agent Skill against the knowledge |

After installation, browse the workspace Knowledge Base or search for concepts
such as agency choice, control loops, tool-use policy, memory policy, handoffs,
human oversight, instruction files, agent threats, and agent-specific
evaluation.

## Evaluation runner choice

A fresh pack installation enables `agent-skill-evaluator` as the default
mechanism unless direct AXM intent already disables it. `evaluate-agent-skill`
selects an explicitly bound trusted runner first, otherwise this active default.
A repository that persistently uses another runner can keep the package managed
but inactive:

```sh
axm skills disable agent-skill-evaluator
```

Use `axm skills enable agent-skill-evaluator` to restore it without
reinstallation. AXM retains canonical files while disabled; their presence does
not authorize the evaluation workflow to invoke them. If no explicit runner is
bound while the default is disabled, preflight is reserved and the evaluation
is `Inconclusive` with no run evidence.

An external runner needs an explicit identity, trusted entrypoint, capabilities,
and adapter or evidence mapping. It does not need to implement the bundled
runner's CLI, and the workflow never auto-discovers or runs two mechanisms.

## License

The pack metadata is MIT licensed. Each dependency retains the license in its
own manifest.

## Revision 0.10.0

- Previous version: `0.9.1`
- Contract delta: adds the standalone Agent Skill evaluator as the enabled
  pack default while retaining replaceable runner selection, evaluation
  strategy, and interpretation in `evaluate-agent-skill`
- Membership adds `@agentxm/skills/agent-skill-evaluator` at `>=0.1.0`
- Lower bounds select the knowledge and author, evaluate, and audit skill
  revisions that honor explicit runner bindings and AXM disabled state
