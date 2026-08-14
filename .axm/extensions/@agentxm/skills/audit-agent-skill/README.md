# Audit Agent Skill

Audit an Agent Skill before installing, trusting, distributing, or publishing
it. The workflow examines metadata, instructions, bundled code, permissions,
network and data flow, dependencies, provenance, licensing, fixtures,
portability claims, and packaging.

For governed libraries it distinguishes requested, approved, intended effective,
and observed capabilities, assigns risk implications, and identifies changes
that require reapproval. Portable tool metadata is not treated as proof of
runtime enforcement.

The audit is static by default and does not execute untrusted bundled code. Use
the evaluation workflow separately when behavioral performance must be tested.

## Install

```sh
axm install @agentxm/packs/skill-engineering
```

## Example

> Audit this downloaded Agent Skill for installation. Do not run its scripts;
> report its capabilities, risks, provenance gaps, and recommendation.
