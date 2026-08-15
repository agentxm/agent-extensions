---
name: garden-context
description: |
  Evaluates and improves project or workspace context for software-engineering agents by mapping authority, discovery, scope, freshness, and ownership across instructions, specifications, documentation, skills, code, tests, tools, and runtime evidence. Use when asked to garden, audit, organize, prune, clean up, or improve project or workspace context, a coding-agent harness, memory bank, or AI context. Not for generic repository cleanup, code refactoring, editing one known instruction file, ordinary documentation cleanup, or feature implementation.
---
# garden-context

Cultivate the context system used for project work. Start at the active
workspace, then expand only to project-scoped repositories, services, remote
workers, or external sources that evidence makes relevant.

## Operating contract

- Match the requested authority: inspect and report for an audit; edit when the
  user asks to garden, improve, organize, or clean up.
- Preserve existing work and use repository-owned tools for generated or
  managed surfaces.
- Distinguish evidence, inference, and unresolved policy. Never invent a source
  of truth, lifecycle, owner, or team convention.
- Prefer retirement, relocation, and stronger routing over destructive deletion.
- Do not create a standalone report file unless the user requests one.

## Load knowledge progressively

This skill is coupled to direct siblings in the context-engineering pack and
the harness-engineering compatibility pack. Prefer
`axm knowledge open context-engineering <concept-id>` in project scope; use
`axm knowledge open --scope user context-engineering <concept-id>` for a
user-scope installation. When a direct sibling path is necessary, resolve
`.axm/extensions/...` from the active AXM scope root: the project root for a
project installation or the user's home directory for a user installation.
Never route through an agent projection.

Read the governing practice first:

`axm knowledge open context-engineering operations/context-gardening`

Open only the concepts whose signal is present:

| Signal | Concept ID |
| --- | --- |
| Context boundaries or selection are unclear | `foundations/context-engineering` |
| Authority, provenance, scope, relevance, or freshness is unclear | `foundations/context-quality-and-authority` |
| Persistent, retrieved, observed, working, or memory context is conflated | `foundations/context-forms-and-lifecycles` |
| Initial context is noisy or deeper material is hard to find | `design/progressive-disclosure` |
| Context spans instructions, prompts, tools, retrieval, memory, or feedback | `domains/software-engineering/repository-context-map` |
| Always-on repository guidance is implicated | `domains/software-engineering/repository-instruction-files` |
| Specifications, plans, or competing truth claims appear | `domains/software-engineering/specification-authority` |
| Context continuity, compaction, or handoff is implicated | `operations/memory-compaction-and-continuity` |
| Context quality needs objective assessment | `operations/context-evaluation` |

When a finding concerns model-facing wording, templates, examples, or response
shape, open the smallest relevant concept from the direct prompt-engineering
sibling, usually `design/prompt-contracts`,
`design/instruction-structure-and-examples`, or
`design/response-and-presentation-contracts`.

`axm knowledge open` supplies the concept body but not its OKF frontmatter.
When a finding concerns provenance, `status`, `generated`, `verified`, or
`stale_after`, inspect that concept's canonical Markdown frontmatter from the
active AXM scope root after selecting it.

Treat these concepts as decision support, not project policy. When instruction
files are the chosen owner, use `audit-agent-instructions` for assessment and
`author-agent-instructions` for creation or revision. For an explicitly
authorized audit-remediation loop, begin with the audit skill. Resolve their
canonical `src/SKILL.md` files under
`.axm/extensions/@agentxm/skills/<name>/` from the active AXM scope root.

## Workflow

### 1. Bound the garden

Identify the project outcome, active workspace, relevant roots and
environments, and two or three representative tasks. Infer reasonable examples
from commands, tests, entry points, and recent work when the user did not supply
them. Do not widen into user-global or external systems without evidence and
authority.

### 2. Inventory by route

Read applicable instruction files first. Use fast listings and targeted search
to locate likely specifications, plans, architecture material, skills, source,
tests, schemas, tool configuration, generated artifacts, and operational
evidence. Follow existing indexes before opening content in bulk.

For each relevant surface, record its scope, intended reader or consumer,
owner when known, lifecycle status, authority claim, discovery route, and
verification path. Useful lifecycle states include proposed, active,
historical, superseded, generated, and unknown.

### 3. Map authority

Separate the authorities for:

- intended behavior;
- implemented behavior;
- mechanically verified contracts;
- observed runtime behavior; and
- rationale and history.

For specifications, determine whether evidence supports spec-first,
spec-anchored, spec-as-source, or no explicit model. Also identify whether
changes flow back among artifacts, flow forward as new records, or begin in a
living specification. Surface ambiguity instead of resolving policy by guess.

### 4. Trace representative tasks

For each representative task, start from the context an agent actually receives
and follow the routes it can discover. Check whether:

- the initial surface exposes the right next decision;
- irrelevant context stays out;
- routes select the correct depth;
- destinations fulfill their advertised purpose;
- authority and freshness remain legible; and
- the agent can verify completion or recover from conflict.

Distinguish a bad destination from a route that was never discoverable or
selected.

### 5. Classify findings

Require concrete evidence and use the finding classes in the governing context-
gardening practice. Do not create a finding merely because a surface could be
organized differently.

### 6. Choose cultivation moves

Choose the smallest cultivation move and truthful owner described by the
governing practice. Preserve needed history and do not promote prose into
always-on instructions when a skill, tool, check, reference, observation, or
task record owns it better.

### 7. Propose or apply

For an audit, report findings and recommended moves without editing. For an
authorized improvement, make reviewable changes within scope and preserve
generated boundaries. Stop for direction when a change would establish new
project policy, choose between competing legitimate authorities, or delete
material whose historical value is unresolved.

### 8. Verify and report

Re-run relevant validators, link checks, searches, tests, or managed generators.
Trace the representative tasks again and compare discovery, scope, authority,
and verification with the original state.

Report:

1. garden scope and representative tasks;
2. authority and lifecycle map;
3. evidence-backed findings by class;
4. changes made or proposed cultivation moves;
5. validation evidence; and
6. unresolved policy decisions and intentionally deferred work.
