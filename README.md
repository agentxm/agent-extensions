# AgentXM agent extensions

First-party public extensions maintained by
[AgentXM](https://agentxm.ai) and distributed through the AgentXM Registry.

## Packs

| Pack | Purpose | Install |
| --- | --- | --- |
| `agent-engineering` | Agent, harness, context, prompt, evaluation, instruction-system, and Agent Skill engineering workflows | `axm install @agentxm/packs/agent-engineering` |

Canonical packages live under `.axm/extensions/@agentxm`. Agent-specific skill
directories are AXM-managed projections and are not authoring locations.

Read [AGENTS.md](AGENTS.md) and the
[publishing guide](docs/publishing.md) before contributing. This repository is
public-by-construction and must never contain private AgentXM context.

## Licensing

Each extension declares its own SPDX license in its manifest. A pack's license
covers only the pack package; its dependencies retain their own licenses. See
[LICENSE.md](LICENSE.md) for the repository summary.
