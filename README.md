# AgentXM agent extensions

First-party public extensions maintained by
[AgentXM](https://agentxm.ai) and distributed through the AgentXM Registry.

> [!IMPORTANT]
> This repository is archived and no longer receives changes. AgentXM now
> maintains these packages outside this repository and continues to publish
> them to the AgentXM Registry; install them with `axm install` as before.
> The Agent Skill evaluation extensions (`agent-skill-evaluator` and
> `evaluate-agent-skill`) are retired, and `author-agent-skill`,
> `audit-agent-skill`, `author-agent-instructions`, and
> `audit-agent-instructions` are superseded by `agent-skills` and
> `agent-instructions` in `@agentxm/packs/agent-engineering`.

## Packs

| Pack | Purpose | Install |
| --- | --- | --- |
| `agent-engineering` | Agent, harness, context, prompt, evaluation, instruction-system, and Agent Skill engineering workflows | `axm install @agentxm/packs/agent-engineering` |

Canonical packages live in their root type directories. Agent-specific skill
directories are AXM-managed projections and are not authoring locations.

Read [AGENTS.md](AGENTS.md) and the
[publishing guide](docs/publishing.md) before contributing. This repository is
public-by-construction and must never contain private AgentXM context.

## Licensing

Each extension declares its own SPDX license in its manifest. A pack's license
covers only the pack package; its dependencies retain their own licenses. See
[LICENSE.md](LICENSE.md) for the repository summary.
