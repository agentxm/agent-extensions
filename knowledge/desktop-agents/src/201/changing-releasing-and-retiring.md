---
type: How-to guide
description: How to test, communicate, release, roll back, deprecate, and retire changes to shared agent workflows.
tags: [desktop-agent-201, release, change-control, rollback, deprecation, retirement]
---

# How to change, release, and retire a shared workflow

1. State the problem the change solves and the users or cases it may affect.
2. Update the main maintained source, not an installed or product-specific
   copy.
3. Run the existing ordinary, changed, incomplete, and unsafe test cases.
4. Add a case for the problem that motivated the change.
5. Compare results with the previous accepted version. Check for new access,
   tools, network use, or outside effects.
6. Give the release a distinct identity and explain breaking changes,
   required actions, and known limits.
7. Offer a tested rollback when important users cannot move safely.
8. Mark an old version as replaced when users need time to move. State the
   replacement and deadline.
9. Disable or remove a version promptly when leaving it active creates an
   unacceptable risk. Preserve enough history to explain what happened.

An update is not complete when a new file exists. It is complete when intended
users can discover the change, obtain the right version, meet its requirements,
and verify that old unsafe or unsupported behavior is no longer active.

Retirement is a normal part of quality. Remove workflows that no longer have
an owner, purpose, compatible environment, or acceptable risk—even if they
once saved time.
