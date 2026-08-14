# AgentXM agent extensions

First-party public extensions maintained by
[AgentXM](https://agentxm.ai) and distributed through the AgentXM Registry.

## Packs

| Pack | Purpose | Install |
| --- | --- | --- |
| `agent-engineering` | Agent behavior foundations with companion harness, context, prompt, and evaluation knowledge | `axm install @agentxm/packs/agent-engineering` |
| `context-engineering` | Context, prompt, and evaluation knowledge plus project-context workflows | `axm install @agentxm/packs/context-engineering` |
| `harness-engineering` | Agent-system harness foundations and context-engineering workflows | `axm install @agentxm/packs/harness-engineering` |
| `skill-engineering` | Agent Skill authoring, evaluation, audit, admission, governance, and lifecycle | `axm install @agentxm/packs/skill-engineering` |

Canonical packages live under `.axm/extensions/@agentxm`. Agent-specific skill
directories are AXM-managed projections and are not authoring locations.

Read [AGENTS.md](AGENTS.md) and the
[publishing guide](docs/publishing.md) before contributing. This repository is
public-by-construction and must never contain private AgentXM context.

## Licensing

Each extension declares its own SPDX license in its manifest. A pack's license
covers only the pack package; its dependencies retain their own licenses. See
[LICENSE.md](LICENSE.md) for the repository summary.
