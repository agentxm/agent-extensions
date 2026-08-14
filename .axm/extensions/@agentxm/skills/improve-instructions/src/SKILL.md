---
name: improve-instructions
description: |
  Audit and improve agent instruction files (AGENTS.md, CLAUDE.md, local instruction files): trim always-on bloat, protect discovery indexes, sharpen triggers, remove duplication and stale commands. Use when trimming AGENTS.md, maintaining instruction files, fixing progressive disclosure, or cleaning root/local agent docs. Not for writing product design docs or implementing features.
---
# improve-instructions

Improve **always-on** agent instruction files so they stay small, accurate, and
discoverable.

## Defaults

- **Dry-run** proposals first; write files only after explicit confirm (or the
  user said "apply" / "trim and update").
- Scope defaults to the **root** instruction file the workspace uses
  (`AGENTS.md` / `CLAUDE.md` / configured name); accept a path or directory for
  local surfaces.
- Prefer **move + link** over **delete without a home**.
- **Protect discovery:** never remove index/router rows to save tokens unless
  the linked target is gone or the row is proven useless.

## Modes

| Mode | Focus |
| --- | --- |
| **audit** (default) | Report findings only; no rewrite draft required |
| **trim** | Propose body cuts / moves; keep indexes |
| **reindex** | Sharpen triggers, grouping, broken/missing routes |
| **local-surface** | Nearest `AGENTS.md` / `CLAUDE.md` / README for a package or app |

## Steps

### 1. Intake

Confirm: target path(s), mode, dry-run vs apply. If missing, default root
instruction file + audit + dry-run.

### 2. Load doctrine

Read
`.axm/extensions/@agentxm/knowledge/context-engineering/src/domains/software-engineering/repository-instruction-files.md`.
If the repo has a harness or instructions guide, prefer that as the system of
record for repo-specific rules; the knowledge concept is the portable bar.

### 3. Inventory

For each target file:

- Line count / approximate always-on weight
- Sections: invariants, commands, indexes/routers, embedded procedures
- Linked targets (exist? stale?)
- Overlap with parent instruction files and with linked guides
- Nested instruction files that should own local detail

### 4. Classify findings

Use the audit finding classes in the loaded repository-instruction doctrine.
Require concrete evidence for every finding and reject any proposed cut that
would strand still-useful knowledge.

### 5. Propose

Present:

1. **Summary** — health one-liner (e.g. "root heavy on embedded tables; indexes OK")
2. **Findings table** — location · class · why · proposed change · risk
3. **Draft edits** (trim/reindex modes) — concrete before/after or patch-sized
   bullets; preserve index coverage
4. **Out of scope / deferred** — needs a new guide, skill, or mechanical check

Stop for confirm unless apply was pre-authorized.

### 6. Apply (gated)

On confirm only:

1. Edit instruction files (and only those files unless the user approved creating
   a destination guide for moved content)
2. Do not invent new product policy — only restructure what already exists or is
   clearly stale
3. If content must move and no destination exists, **ask** before creating one
4. Re-read the file: links resolve; no orphan "see below" after cuts

### 7. Report

- Findings counts by class
- Lines/tokens roughly removed vs index rows preserved
- Follow-ups (new guide, local surface file, skill extraction)

## Rules

- Dry-run default; confirm destructive deletes.
- **Trim content, protect discovery** is non-negotiable.
- Prefer linking to existing SoR docs over copying.
- Do not stuff more always-on prose to "fix" one failure — consider skill,
  local doc, or check instead (name the alternative in the report).
- Match the file's existing voice (terse/imperative for agent files).
- Never edit generated AXM-managed regions by hand when a CLI owns them
  (e.g. knowledge discovery tables) unless the user explicitly wants that
  exception.
