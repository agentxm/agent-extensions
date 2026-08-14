# Harness engineering

Compatibility umbrella for agent-system harness foundations plus context,
prompt, and evaluation engineering. It pairs system-level knowledge about
runtime, interfaces, state, feedback, authority, and containment with shared
measurement practice and workflows for gardening project context and improving
agent instructions.

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
| `@agentxm/skills/garden-context` | Audits and improves project or workspace context by routing observed concerns to the relevant knowledge concepts and cultivation moves |
| `@agentxm/skills/improve-instructions` | Audits, trims, reindexes, and localizes `AGENTS.md`, `CLAUDE.md`, and related instruction files |

The two skills are coupled to direct siblings and can be installed through this
compatibility pack or the focused context-engineering pack. The knowledge
bundles may also be installed independently.

## Install

```bash
axm packs install @agentxm/packs/harness-engineering
```

## Example

Ask your agent to garden a project's context, identify unresolved authority and
lifecycle decisions, and improve how representative coding tasks discover the
right depth. For an instruction-only concern, ask it to audit the root
`AGENTS.md` while preserving discovery routes.

This pack replaces the original `@agentxm/packs/harness-engineering` package.

## License

The skills and pack metadata are MIT licensed. The knowledge bundles use the
licenses declared in their member manifests.
