# Audit Agent Instructions

Audit an exact repository instruction system against context-engineering
guidance and the active harness contract. The workflow examines canonical
authority, scope, runtime applicability, composition, precedence, projections,
content quality, discovery routes, and behavior at representative and adjacent
entry points.

A plain audit is read-only. An explicit “audit and remediate” request preserves
the initial findings, applies `author-agent-instructions`, reconciles owned
projections, and verifies the revised effective surface. That same-agent pass
is closure verification, not independent approval.

When AXM manages the instruction system, the audit uses AXM's read-only
instruction inventory, lint, and reconciliation preview as ownership and drift
evidence. Audit-only mode never applies reconciliation.

## Install

```sh
axm install @agentxm/packs/agent-engineering
```

## Example

> Audit our AGENTS.md system from the repository root and package directories,
> remediate supported findings, and verify the resulting effective context.

## Revision 0.1.3

- Previous version: `0.1.2`
- Contract delta: AXM-managed instruction audits now inspect native ownership,
  target health, and reconciliation previews without mutation
- Risk delta: no authority expansion; audit-only mode explicitly excludes sync
  application and managed-state edits
- Evaluation source: suite `0.2.0` adds an AXM-managed audit-only case
