# Context engineering

Design and operate the informational environment agents receive, discover,
produce, and carry through work. This pack combines context, prompt, and
evaluation-engineering knowledge with workflows for gardening project context
and for authoring or auditing persistent repository agent instructions.

Prompt engineering is included because model-facing instructions appear in
instruction files, tools, workflows, applications, and other context surfaces.
Harness engineering remains separate and owns the larger runtime, interfaces,
state, feedback, authority, and containment system.

## Included extensions

| Extension | Role |
| --- | --- |
| `@agentxm/knowledge/context-engineering` | Context selection, authority, routing, retrieval, memory, compaction, evaluation, and lifecycle |
| `@agentxm/knowledge/prompt-engineering` | Prompt contracts, structure, examples, templates, presentation, evaluation, trust, and compatibility |
| `@agentxm/knowledge/eval-engineering` | Evaluation contracts, task distributions, trials, graders, uncertainty, validity, and suite lifecycle |
| `@agentxm/skills/garden-context` | Audits and improves project or workspace context from representative work |
| `@agentxm/skills/author-agent-instructions` | Creates or revises canonical scoped instruction systems and validates their effective entry points |
| `@agentxm/skills/audit-agent-instructions` | Audits effective instruction systems and can orchestrate explicitly authorized remediation and closure verification |

The skills are coupled to their direct knowledge siblings and should be
installed through this pack. Each knowledge bundle may also be installed
independently.

## Install

```bash
axm packs install @agentxm/packs/context-engineering
```

## License

The skills and pack metadata are MIT licensed. The knowledge bundles use the
license declared by each member manifest.
