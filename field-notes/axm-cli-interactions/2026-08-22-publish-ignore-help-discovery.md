---
subject: axm-cli-interactions
key: publish-ignore-help-discovery
date: 2026-08-22
kind: gap
status: open
---

**Expected:** The normal `axm help skills` or `axm help authoring` path would
explain how to keep workspace-authored package-root files out of a published
extension archive.
**Actual:** Neither topic mentioned the existing `publish.ignore` manifest
option; it became visible only by reading `axm help skill-schema` and searching
its raw JSON Schema output.
**Gap:** The capability exists, but task-oriented help does not route authors
to it or explain its archive-only semantics and consequences.
**Suggests:** Add a short publication-boundary section to type authoring help,
including an example, glob behavior, preview inspection, and the distinction
between agent projection, Registry archive, source repository, and generated
workspace content.

Evidence: AXM CLI 0.27.15. `axm help skills` documents `src/`, projection, and
publishing commands; `axm help authoring` documents metadata and that README is
shipped but not projected. Neither output contains `publish.ignore`. `axm help
skill-schema` defines `publish.ignore` as archive-relative POSIX glob patterns
whose matching files are left out of the published archive.
