# Harness engineering

Compatibility umbrella for agent-system harness foundations plus context,
prompt, and evaluation engineering. It pairs system-level knowledge about
runtime, interfaces, state, feedback, authority, and containment with shared
measurement practice and workflows for authoring or auditing agent
instructions.

New installations focused on information selection, routing, memory, prompts,
or instruction files should prefer the `context-engineering` pack. This pack
remains the broader choice when those workflows need the whole-system harness
model as a direct sibling.

The harness knowledge remains one bundle. Coding harnesses, repository
harnesses, personal agents, background workers, and enterprise platforms are
domain, ownership, topology, or product profiles within the shared discipline;
their labels do not by themselves justify separate knowledge packages.

This pack treats Agent Skills as one harness element. It does not own the
detailed lifecycle for designing, evaluating, auditing, or maintaining skill
packages.

## Included extensions

| Extension | Role |
| --- | --- |
| `@agentxm/knowledge/harness-engineering` | System-level concepts for runtimes, interfaces, state, feedback, authority, containment, agent legibility, and evaluation |
| `@agentxm/knowledge/context-engineering` | Context selection, authority, routing, retrieval, memory, compaction, and lifecycle |
| `@agentxm/knowledge/prompt-engineering` | Prompt contracts, structure, examples, templates, presentation, evaluation, trust, and compatibility |
| `@agentxm/knowledge/eval-engineering` | Shared evaluation contracts, task distributions, trials, graders, uncertainty, validity, and suite lifecycle |
| `@agentxm/skills/author-agent-instructions` | Creates or revises canonical scoped instruction systems and validates their effective entry points |
| `@agentxm/skills/audit-agent-instructions` | Audits effective instruction systems and can orchestrate explicitly authorized remediation and closure verification |

The two skills are coupled to direct siblings and can be installed through this
compatibility pack or the focused context-engineering pack. The knowledge
bundles may also be installed independently.

## Install

```bash
axm packs install @agentxm/packs/harness-engineering
```

## Example

Ask your agent to author or audit the effective `AGENTS.md` system while
preserving discovery routes and scoped authority.

This pack replaces the original `@agentxm/packs/harness-engineering` package.

## License

The skills and pack metadata are MIT licensed. The knowledge bundles use the
licenses declared in their member manifests.
