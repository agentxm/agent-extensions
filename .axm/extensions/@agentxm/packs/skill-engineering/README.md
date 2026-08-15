# Skill engineering

Develop Agent Skills as durable artifacts rather than one-off prompts. This
pack combines portable skill-, prompt-, and evaluation-engineering knowledge
with two developer-facing workflows: authoring a skill and auditing an exact
skill revision against applicable guidance.

`author-agent-skill` creates or revises canonical packages from workflow
evidence, observed failures, changed requirements, or accepted findings.
`audit-agent-skill` assesses design, routing, behavior, trust, portability,
packaging, and lifecycle integrity. A plain audit is read-only; an explicit
“audit and remediate” request preserves the initial report, applies the
authoring workflow, and verifies the revised identity.

Detailed evaluation, governance, admission, change-control, and retirement
methods remain available in the knowledge bundles without adding competing
developer-facing skill triggers.

## Included extensions

| Extension | Role |
| --- | --- |
| `@agentxm/knowledge/skill-engineering` | Skill boundaries, routing, workflow design, evaluation, trust, portability, governance, and lifecycle knowledge |
| `@agentxm/knowledge/prompt-engineering` | Prompt contracts, templates, presentation, robustness, and model-facing compatibility guidance |
| `@agentxm/knowledge/eval-engineering` | Evaluation contracts, cases, trials, graders, uncertainty, validity, and suite lifecycle |
| `@agentxm/skills/author-agent-skill` | Creates or revises canonical skills and records validation and remediation evidence |
| `@agentxm/skills/audit-agent-skill` | Audits exact skills against applicable guidance and can orchestrate explicitly authorized remediation and closure verification |

Both skills read direct knowledge siblings and are therefore coupled to this
pack (`standalone: false`). The knowledge bundles may be installed separately.

## Lifecycle

```text
observed need or finding -> author -> exact revision -> audit -> disposition
                              ^                         |
                              +-- authorized repair ---+
```

Authoring never certifies its own work. A same-agent post-remediation audit is
closure verification rather than independent approval. Publishing, admission,
deprecation, and retirement remain separately authorized lifecycle actions.

## Install

```sh
axm install @agentxm/packs/skill-engineering
```

## Example

Ask an agent to author a skill from a repeated workflow, audit the exact result
against the current guidance, remediate supported findings, and return a
snapshot-bound closure matrix without publishing or claiming approval.

## License

The skills and pack metadata are MIT licensed. The knowledge bundles use the
license declared by each member manifest.
