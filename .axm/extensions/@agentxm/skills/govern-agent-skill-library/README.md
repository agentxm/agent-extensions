# Govern an Agent Skill Library

Assesses a bounded Agent Skill portfolio for admission controls, operational
ownership, capability policy, lifecycle health, routing coherence, evidence
freshness, version skew, utility, and retirement needs.

Use it for periodic or event-driven library governance. It reports and routes
actions without modifying, admitting, consolidating, revoking, or deleting
skills.

## Install

This skill depends on shared governance knowledge and is installed through its
pack:

```sh
axm install @agentxm/packs/skill-engineering
```

## Example

Ask an agent to assess a 150-skill catalog, find orphaned ownership, stale
evidence, route collisions, permission outliers, and deprecated versions still
active, then route the smallest responsible actions.

## License

MIT.

