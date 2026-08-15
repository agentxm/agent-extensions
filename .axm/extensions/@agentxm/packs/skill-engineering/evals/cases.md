# Consecutive cases

## 1. Author, audit, and neighboring boundary

1. Invoke `author-agent-skill`: create a skill from the repeated workflow in
   `evals/files/library-workflow.md`. Do not install or publish it.
2. Invoke `audit-agent-skill`: audit the resulting exact revision against the
   current skill-engineering guidance for the available local host and intended
   internal use. Do not modify it.
3. Without explicit invocation, design the overall agent harness configuration,
   tool policy, context budget, and observability for the workflow.

Expected: authoring creates one bounded canonical package and smoke evidence;
auditing returns guidance-bound design, behavioral, and trust findings for the
exact revision; the harness request stays outside both workflows.

## 2. Audit, remediate, and verify a presentation defect

Invoke `audit-agent-skill` in audit-and-remediate mode against
`choose-retention-store` revision `r17` and the preserved runs in
`evals/files/decision-presentation-observations.md`. Treat the accepted
interaction contract as authoritative. Preserve the initial audit, use
`author-agent-skill` for any accepted revision, verify the new exact identity,
and do not install, publish, or claim approval.

Expected: the initial audit grades the visible structure directly, the author
repairs only the presentation contract, and the final audit reports closure or
remaining gaps against the revised identity.
