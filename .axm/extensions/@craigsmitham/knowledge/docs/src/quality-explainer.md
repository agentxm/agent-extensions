---
type: Explanation
title: Documentation quality
description: What functional quality and deep quality mean in documentation craft — and how type-based craft primarily serves deep quality while exposing functional gaps.
tags: [docs, craft, quality, diataxis, explanation]
status: stable
sources:
  - id: diataxis-quality
    resource: https://diataxis.fr/quality/
    title: Diátaxis — Towards a theory of quality in documentation
  - id: diataxis-quality-src
    resource: https://github.com/evildmp/diataxis-documentation-framework/blob/main/source/quality.rst
    title: Diátaxis source — quality.rst
  - id: diataxis-start
    resource: https://diataxis.fr/start-here/
    title: Diátaxis — Start here
generated:
  by: grok/grok-4.5
  at: 2026-08-07T22:41:37Z
---

# Documentation quality

Portable **understanding** of two layers of quality in documentation:
**functional quality** and **deep quality**. Type craft (the four jobs, form
matching, and workflow) mainly conditions deep quality; it does not replace
accuracy, completeness, or other functional obligations.

Practical authoring principles (one job per document, match form to job, link
rather than restate, stay accurate enough for the job, and so on) live in
[Documentation craft](docs-explainer.md). Use this concept when judging
*whether a problem is “wrong facts” or “wrong job/flow”* — and what type craft
can and cannot fix.

## Functional quality

**Functional quality** is whether documentation meets objective craft duties
such as:

- accuracy
- completeness
- consistency
- usefulness
- precision

These traits are largely **independent**: material can be accurate yet
incomplete, complete yet inconsistent, or accurate and complete yet still
useless for the task at hand. Failures are often **measurable** or at least
checkable against the world the docs describe (the product, the API, the
process).

Attaining functional quality needs domain skill, attention, and ongoing
maintenance. Type craft **does not create** functional quality by itself.
Every release can make yesterday’s correct page wrong again.

## Deep quality

**Deep quality** is whether documentation **fits human use** in ways that are
hard to score with a checklist alone, for example:

- feeling good to use
- having flow
- fitting real needs
- anticipating the reader
- beauty of overall form

These traits are **interdependent** and **subjective** in the sense that they
are assessed against the person at work or study, not only against a spec.
They still matter: readers recognize good docs by how the material moves with
them, even when they cannot name the craft reason.

Deep quality is **conditional** on functional quality. Inaccurate or
inconsistent docs will not feel excellent for long — functional failures
tarnish the experience immediately.

| Functional quality | Deep quality |
| --- | --- |
| Independent characteristics | Interdependent characteristics |
| Objective (checked against the world) | Subjective (judged for the human) |
| Measured or verified | Judged and interrogated |
| A condition of deep quality | Conditional on functional quality |
| Constraints the author must meet | Room for craft, taste, and design |

## What type craft does for quality

Need-based types (tutorial, how-to, reference, explanation), the compass, and
iterative workflow address **aspects of deep quality** more than functional
checklists:

- They **fit user needs** by matching mode (study/work, action/cognition) to
  form and voice.
- They protect **flow** by keeping digressions from interrupting the job the
  reader came for.
- They set **conditions of possibility** for excellence — not a formula that
  guarantees beauty or UX design skill.

Type craft is **not all** of deep quality. Interaction design, visual design,
and domain writing skill still matter. Using the four types well does not
guarantee deep quality; it removes systematic ways of working against it.

## Exposing functional gaps

Although type craft does not *supply* functional quality, applying it often
**exposes** functional lapses that mixed pages hid:

- Aligning reference structure with the thing described makes **missing**
  entries stand out.
- Removing explanation from a tutorial can reveal a place where the learner
  was left to **guess a step**.
- Separating how-to from reference can show that the “procedure” never listed
  real preconditions or failure branches.

So: fix functional defects with domain truth and diligence; use type
separation as an **analytical** aid that makes those defects easier to see.

## How this relates to craft principles

The quality principles in [Documentation craft](docs-explainer.md) mix both
layers on purpose:

| Principle (examples) | Layer |
| --- | --- |
| Stay accurate enough for the job; refresh stale how-tos and reference | Functional |
| One primary job; match form to job; link rather than restate | Deep (need fit, flow) |
| Prefer clarity of outcome near the top | Both (skip wrong page; serve the need) |
| Resist feature-only IA without need-based types | Deep (portfolio consistency of jobs) |

When reviewing, ask both:

1. **Functional** — Is this true, complete enough, and consistent?
2. **Deep / type** — Is this the right job, voice, and flow for the reader’s
   mode right now?

## Related

- [Documentation craft](docs-explainer.md)
- [Documentation craft guide](docs-guide.md)
- [Documentation workflow](workflow-explainer.md)
- [Documentation workflow guide](workflow-guide.md)
