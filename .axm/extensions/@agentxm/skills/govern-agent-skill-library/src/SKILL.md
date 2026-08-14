---
name: govern-agent-skill-library
description: Assesses a governed Agent Skill library across admission controls, operational ownership, capability policy, lifecycle state, version and evidence freshness, routing coherence, active cohorts, utility, deprecation, revocation, and retirement. Use for periodic skill-library governance, catalog health, portfolio audits, orphaned skills, overlapping skills, stale evaluations, permission outliers, version skew, or libraries growing across teams. Not for admitting one candidate, authoring or repairing skills, auditing one untrusted package, generic harness architecture, or deleting a backlog.
---
# Govern an Agent Skill Library

Evaluate whether a bounded skill portfolio remains owned, evidence-backed,
coherent, useful, current, and exposed within its approved authority. Treat the
catalog as an evolving routing and supply-chain system, not a list of files.

This skill is coupled to the skill-engineering pack. From the active AXM scope
root, read:

- `.axm/extensions/@agentxm/knowledge/skill-engineering/src/governance/governance-model.md`;
- `governance/governance-record.md`; and
- `governance/portfolio-coherence-and-observability.md`.

Read `governance/capability-boundaries-and-risk-tiers.md` for authority findings
and `governance/versioning-deprecation-and-change-control.md` for lifecycle
findings.

## Authority

Governance assessment is read-only with respect to library packages, admission
states, policies, deployments, and consumers. It may create an explicitly
requested report, but it must not admit, revise, install, enable, publish,
consolidate, deprecate, revoke, retire, or delete skills. Do not execute skill
code or use production systems to fill an evidence gap without separate
authority. Catalog telemetry may be sensitive; expose only the bounded evidence
needed by the report.

## Workflow

1. **Bind the portfolio.** Record authoritative catalog and source locators,
   snapshot or revision, assessment time, included owners and cohorts, hosts and
   models, policy version, telemetry window, and explicit exclusions.
2. **Validate the inventory.** Reconcile canonical skills, versions, digests,
   lifecycle states, owners, dependencies, cohorts, deployments, and governance
   records. Mark unknown or conflicting authorities rather than selecting one.
3. **Assess control coverage.** Check admission decisions, separation of duties,
   risk tiers, effective capability policies, evaluation and audit identities,
   exceptions, evidence expiry, changelogs, migrations, and rollback.
4. **Assess stewardship.** Find unowned, individually owned, unreachable,
   overdue, or orphaned skills and unresolved cross-team boundaries. Do not
   infer acceptance from commit history or publisher identity.
5. **Assess coherence.** Analyze job overlap, route similarity, false positives,
   misses, deprecated replacements, composition, and active-cohort recall.
   Prioritize semantic neighborhoods and role cohorts; do not equate textual
   similarity with duplicate responsibility.
6. **Assess risk and drift.** Compare requested, approved, effective, and
   observed capabilities. Identify new dependencies, destinations, data classes,
   hosts, models, incidents, policy mismatch, provenance change, and revoked or
   deprecated versions still active.
7. **Assess evidence and utility.** Separate structural, behavioral, trust, and
   operational evidence. Report qualified use, outcome support, marginal value,
   persistent failure, and untested claims without turning low use into an
   automatic retirement decision.
8. **Prioritize control actions.** Distinguish urgent containment, required
   admission or reapproval, owner acceptance, evaluation or audit refresh,
   authoring repair, consolidation study, migration, and retirement decision.
   Name the responsible authority and evidence needed for each.
9. **Report without mutating.** Use `references/library-governance-report.md`.
   Preserve per-dimension findings and uncertainty rather than hiding them in a
   single score.

## Portfolio status

- **Effective** — material controls work across the assessed scope and no
  unresolved critical exposure or coherence failure remains.
- **Degraded** — controls exist, but bounded ownership, evidence, lifecycle, or
  coherence gaps require scheduled correction.
- **Ineffective** — absent or bypassed controls create material unmanaged risk,
  invalid approval, or library-wide selection failure.
- **Inconclusive** — authoritative inventory, policy, telemetry, or evidence is
  insufficient to assess the portfolio defensibly.

## Done when

The report binds an authoritative snapshot and scope; reconciles inventory and
governance identities; assesses ownership, admission, capabilities, lifecycle,
coherence, evidence and utility independently; identifies urgent and systemic
actions with owners; exposes uncertainty; and leaves the library unchanged.

