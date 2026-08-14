# Synthetic decision-presentation candidate

Candidate identity: `choose-retention-store` revision `r17`.

The skill helps a platform owner choose one of two viable retention stores. The
owner retains decision authority. For each decision, the accepted interaction
contract is:

1. state the decision question and evidence;
2. present both options with parallel benefits, costs, and reversibility;
3. state one recommendation after both options;
4. label the decision `Proposed`; and
5. end by asking the owner to choose or revise.

The recommendation must not appear in an option heading and must appear exactly
once. Analysis and wording may adapt to the evidence.

The current `SKILL.md` says only:

> Present the decision, two viable options with tradeoffs, an explicit
> recommendation, and a request for the owner to choose. Never accept the
> recommendation by default.

Three runs against the same synthetic fixture produced:

- **Run A:** Marked option 1 “recommended,” repeated the recommendation after
  option 2, then requested a choice.
- **Run B:** Stated the recommendation before listing either option, compared
  the two options, then requested a choice.
- **Run C:** Compared both options, stated the recommendation once, marked the
  decision `Proposed`, and requested a choice.

Every run contained the correct two options, evidence, tradeoffs, recommendation,
and request for human choice. No run changed external state.
