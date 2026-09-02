---
type: How-to guide
description: How to establish one maintained workflow source with ownership, origin, versions, and change history.
tags: [desktop-agent-201, source-of-truth, ownership, provenance, versions]
---

# How to keep one main copy

1. Choose the place that owns the maintained workflow. Other installations or
   product-specific forms should be derived from it, not edited independently.
2. Name an owner responsible for reviews, updates, incidents, and retirement.
   Name a backup or team for important work.
3. Record where the workflow came from and preserve its publisher and license.
4. Give meaningful releases distinct version numbers or dated identities.
5. Keep a short change log that tells users what changed, who may be affected,
   and whether action is required.
6. Make shared copies point back to the main source and exact version.
7. Define how local changes return to the main source or remain clearly
   separate forks.

Avoid using “latest” as the only identity. It tells a user where to look but
not what they tested or what changed.

An owner is not required to perform every review. The owner makes sure the
right review occurs and that unsafe or unsupported versions do not remain
silently available.

When someone needs a different method, first decide whether the main workflow
should support another case or whether a separately named workflow is clearer.
Hidden local edits create neither a reliable improvement nor a safe new
workflow.
