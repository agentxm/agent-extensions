# Audit Agent Skill

Audit an exact Agent Skill revision against an explicit skill-engineering
guidance baseline and intended use. The workflow covers design, routing,
activated execution, resources, portability, authority, provenance, licensing,
packaging, public suitability, change control, and lifecycle evidence.

A plain audit is read-only. An explicit “audit and remediate” request preserves
the initial findings, applies the sibling authoring workflow, and verifies the
new exact revision. That final pass is closure verification, not independent
approval. Untrusted packages remain static by default and their bundled code is
not executed merely for inspection.

## Evaluation

`evals/evals.json` contains separate routing and activated-execution cases.
`evals/evaluation-contract.json` defines the required target, environment,
trial, grader, provenance, freshness, and result evidence. Case definitions do
not imply that a revision passed: release evidence must bind actual results to
the exact package identity, host, model, configuration, and active catalog.
Authoring-smoke results belong in an ignored or external run workspace, remain
same-agent evidence, and do not satisfy the contract's isolated release
threshold merely because they were retained or committed.

Use `evaluate-agent-skill` when new behavioral trials must be executed. This
audit inspects the resulting evidence and its claim limits; it does not own the
evaluation run.

## Install

```sh
axm install @agentxm/packs/agent-engineering
```

## Example

> Audit this Agent Skill against the current skill-engineering guidance,
> remediate supported findings, and verify the resulting revision. Do not
> publish or claim independent approval.
