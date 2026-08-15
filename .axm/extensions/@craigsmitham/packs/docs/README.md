# Documentation craft

Portable guidance for **effective documentation**: what high-quality material
looks like, and how to author it — not how a given repository must organize
files or metadata.

Inspired by [Diátaxis](https://diataxis.fr/), this pack pairs an **explainer**
(`*-explainer`) with a **guide** (`*-guide`) for overall craft and for each of
**tutorial**, **how-to**, **explanation**, and **reference**. It does **not**
prescribe folder trees, frontmatter schemas, validators, or host tooling. Local
projects keep their own implementation details.

## Included extensions

Members are **not standalone** (`standalone: false`): install this pack (or
another pack that depends on them) rather than treating the leaves as complete
units on their own.

| Extension | Role |
| --- | --- |
| `@craigsmitham/knowledge/docs` | `*-explainer` + `*-guide` concepts for documentation craft and each Diátaxis type |
| `@craigsmitham/skills/author-docs` | Create, revise, classify, review, and maintain docs by loading only the relevant craft concepts |

## Install

```bash
axm packs install @craigsmitham/packs/docs
```

Or, while authoring from a workspace that already holds the members:

```bash
# members already configured as workspace extensions
axm install
```

## Usage

- **Author:** ask to create or revise a guide, tutorial, reference, explanation,
  README, or other repository documentation.
- **Review:** ask to classify, audit, refresh, or restructure named paths or a
  change set.
- **Doctrine:** open concepts under the `docs` knowledge bundle — for example
  `docs-explainer` / `docs-guide`, `how-to-explainer` / `how-to-guide` (via
  `axm knowledge search` / `axm knowledge open`).

Prefer any repository documentation guidelines when they exist; this pack is
the quality bar, not a layout standard.

## License

CC-BY-SA-4.0. See the repository for source attribution and provenance.
