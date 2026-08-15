---
type: Playbook
title: Documentation craft guide
description: How to choose a documentation type and produce a document that keeps one job clear without inventing host layout or metadata rules.
tags: [docs, craft, authoring, how-to, diataxis]
status: stable
generated:
  by: grok/grok-4.5
  at: 2026-08-07T23:50:00Z
---

# Documentation craft guide

Use this when you need to **write or revise one document** and want a
portable process. For *why* the four types exist and the quality principles
behind them, read [Documentation craft](docs-explainer.md) first. For
iterative remediation across a corpus, use
[Documentation workflow guide](workflow-guide.md).

## Goal

Ship (or improve) a document whose **primary job** is clear to a reader who
opens it cold.

## Steps

1. **Name the reader need** — learning, doing, looking up, or understanding.
2. **Pick one type** from the craft table in
   [Documentation craft](docs-explainer.md). If two needs are real, plan two
   documents (or one primary plus links).
3. **Open both concepts for that type** — the explainer (what good looks like)
   and the guide (how to structure the draft).
4. **Bound the job** — purpose or goal near the top; list non-goals; link
   owners of adjacent jobs instead of copying them.
5. **Draft for the type** — follow the matching guide; keep form matched to
   job (steps vs inventory vs discussion).
6. **Apply host rules last** — paths, indexes, metadata, and validators only
   as the repository already defines them. Do not invent a portable schema.
7. **Check** — can a stranger tell the job in one skim? Would another type
   fit better? Are stale commands or duplicated procedures present?

## Preconditions

- Enough source material (product behavior, design decisions, or an existing
  draft) that you are not inventing policy
- Access to any local documentation guidelines the host already uses

## Pitfalls

- Starting from a folder path instead of a reader need
- Mixing a lesson, a runbook, and a reference into one undifferentiated page
- Encoding monorepo-only commands or layout as if they were universal craft

## Related

- [Documentation craft](docs-explainer.md)
- [Documentation workflow](workflow-explainer.md) · [Documentation workflow guide](workflow-guide.md)
- [Documentation quality](quality-explainer.md)
- [Tutorial guide](types/tutorial-guide.md)
- [How-to guide](types/how-to-guide.md)
- [Reference guide](types/reference-guide.md)
- [Explanation guide](types/explanation-guide.md)
