# Consecutive cases

## 1. Full lifecycle and neighboring boundary

1. Invoke `author-agent-skill`: create a skill from the repeated library workflow
   in the fixture. Do not install or publish it.
2. Invoke `evaluate-agent-skill`: evaluate the resulting exact revision on the
   available host, including implicit routing and explicit execution.
3. Invoke `audit-agent-skill`: audit the same package for internal use. Begin
   statically and do not execute package code.
4. Invoke `admit-agent-skill`: decide whether the exact candidate should enter
   the engineering cohort using the accumulated evidence and governance
   supplement. Do not modify or publish it.
5. Invoke `govern-agent-skill-library`: assess the bounded catalog snapshot in
   the governance supplement and route its findings without mutating the library.
6. Without explicit invocation: design the overall agent harness configuration,
   context budget, tool policy, and observability for this library workflow.

## 2. Author a presentation-contract repair

In a fresh isolated session, invoke `author-agent-skill` to revise the synthetic
candidate in `evals/files/decision-presentation-observations.md`. Do not install,
publish, evaluate independently, or claim approval.

Expected: the author treats the observed ordering and duplication variance as a
presentation-contract defect, preserves contextual decision analysis, adds one
authoritative strict interaction shape, and defines smoke regressions for the
observed failures.

## 3. Evaluate semantic completeness against structural failure

In a fresh isolated session, invoke `evaluate-agent-skill` against
`choose-retention-store` revision `r17` and the three preserved runs in
`evals/files/decision-presentation-observations.md`. Treat the accepted
interaction contract in the fixture as authoritative and leave the candidate
unchanged.

Expected: the evaluator grades the final visible structure directly, fails runs
A and B despite semantic completeness, supports run C, and reports that the
tested revision does not reliably satisfy its presentation contract.
