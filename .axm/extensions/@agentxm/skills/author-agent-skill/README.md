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

## Revision 0.9.0

- Previous version: `0.8.1`
- Contract delta: the runtime now resolves the target package, declared
  repository evaluation-source root, and strictly required manager-owned state
  before writing; it also distinguishes confirmed regression evidence from
  requirement-derived greenfield cases
- Suite delta: suite `0.4.0` supplies complete synthetic target packages for
  remediation and validator-selection cases, supplies coherent greenfield
  requirements, and adds a baseline-bound ambiguous-lifecycle authority case
- Compatibility and cohort: routing is unchanged; the suite is validated with
  `agent-engineering` pack `0.10.3` and evaluator `0.2.2`
- Risk delta: the bounded local write envelope now includes declared evaluation
  source and manager state required by the request; install, enable, publish,
  certification, and unrelated external effects still require separate authority
- Migration: resolve and report all authorized roots before writes; treat
  suite `0.3.1` runs as stale for the revised runtime and evaluation source
- Rollback: restore skill `0.8.1`, suite `0.3.1`, and their prior fixtures and
  critical-gate mappings together
- Evidence: AXM and evaluator structural validation plus synthetic target-package
  validation and deterministic validator fail/pass calibration; no controlled
  behavioral regression run or independent approval is claimed
- Bound identities: package
  `sha256:282473451c9804f1b617cb72ee1ad3a490d40d49c8d60a34a1273bc3d11581d1`
  and suite `sha256:786fc4aba38dcb3d2abf5f1bc10150ed5700699d82070c1a1eb5987693b2e27a`
