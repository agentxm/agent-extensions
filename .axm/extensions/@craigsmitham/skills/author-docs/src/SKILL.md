---
name: author-docs
description: >
  Creates, revises, classifies, reviews, and maintains repository
  documentation using portable Diátaxis-oriented craft. Use for READMEs,
  tutorials, how-to guides, reference material, explanations, documentation
  reviews, stale docs, broken links, or documentation restructuring. Not for
  always-on agent instruction files, Word/Google Docs artifacts, or inventing
  repository information architecture or metadata schemas.
---

# Author docs

Route repository documentation work to the smallest relevant part of
`@craigsmitham/knowledge/docs`.

1. Read repository-local documentation instructions and inspect the requested
   targets and source material.
2. Open only the concepts needed from
   `.axm/extensions/@craigsmitham/knowledge/docs/src/`:

| Request | Start with | Add when needed |
| --- | --- | --- |
| Choose, classify, or review a documentation type | `docs-explainer.md` | Matching `types/*-explainer.md` |
| Create or substantially revise one document | `docs-guide.md` | Concepts that guide directs you to |
| Review one document's structure | Matching `types/*-guide.md` | Matching `types/*-explainer.md` for type-fit questions |
| Evaluate overall documentation quality | `quality-explainer.md` | `docs-explainer.md` or a type pair for type-specific findings |
| Remediate or restructure a corpus | `workflow-guide.md` | `workflow-explainer.md` for rationale; concepts for the selected unit |
| Author or classify a named artifact (runbook, playbook) | `genres/<genre>-explainer.md` | `types/how-to-guide.md` to write it |
| Check links, staleness, or factual accuracy | Repository-local sources and validators | Relevant concepts only when type or structure is also in scope |

`types/` holds the four Diátaxis pairs; `genres/` holds named artifacts and is
explainer-only. Each directory has an `index.md` routing map.

3. Follow the selected concepts and repository-local requirements. Open linked
   concepts only when the requested scope needs them.
