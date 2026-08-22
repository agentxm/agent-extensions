# Author Agent Skill

Create a new portable Agent Skill or revise an existing one from defined or
changed requirements, concrete workflow evidence, accepted audit findings, or
observed failures. The skill is a thin execution layer over the authoritative
authoring and interaction guidance in the coupled `agent-engineering` knowledge
bundle.

Use it for requests to create, fix, update, adapt, restructure, or remediate an
Agent Skill. Use `audit-agent-skill` to assess conformity or verify closure;
use `evaluate-agent-skill` to execute controlled behavioral suites. Authoring
does not independently certify its own changes.

When authoring changes behavior, the workflow keeps versioned evaluation source
separate from generated runs, preserves confirmed failures as regressions, and
labels same-agent exercises as authoring smoke rather than release evidence.

When the target owns a meaningful user-facing sequence, the workflow applies
the agent-engineering guidance for openings, progress, questions, interaction
surfaces, gates, and closeouts. It leaves one-step and non-interactive skills
free of unnecessary interaction ceremony.

For AXM-managed packages, the workflow applies AXM extension-management
guidance independently of the runtime host profiles the skill claims. This
preserves the portable core while using AXM's canonical package, projection,
composition, validation, and lifecycle capabilities.

## Install

```sh
axm install @agentxm/packs/agent-engineering
```

## Example

> Revise this Agent Skill to address findings A-01 and A-03. Preserve its
> supported routing behavior, preserve the motivating cases, validate the
> package, and record any remaining evidence needed for closure.

## Revision 0.8.1

- Previous version: `0.8.0`
- Contract delta: evaluation contract `3.0.0` binds all four critical gates to
  exact assertions and records immutable runner and adapter evidence
- Compatibility and cohort: runtime authoring behavior is unchanged; suite
  `0.3.1` requires evaluator `0.2.0` or an equivalent v3-capable runner
- Risk delta: install, self-certification, package-boundary, and validator
  selection gates can no longer remain declared without executable mappings
- Migration: update the pack to `0.10.1` before collecting new regression runs
- Rollback: restore skill `0.8.0`, suite `0.3.0`, and contract `2.0.0` together
- Evidence: workspace validator acceptance and deterministic evaluator
  conformance; no release-tier behavioral run or independent approval is claimed
- Bound identities: package
  `sha256:2bcf5479fc6bfc12ed100d31899be434daf722e36a9a042e79bb538a741abccf`
  and suite `sha256:2d902d8f5ba7c0a17aa575ddc97472459260ea7b4ae634de45f6874cd396838d`
