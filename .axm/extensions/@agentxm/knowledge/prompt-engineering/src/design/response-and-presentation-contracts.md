---
type: Reference
title: Response and presentation contracts
description: How answer shape, relative order, emphasis, uniqueness, and handoff become explicit output obligations.
tags: [response-contract, presentation, answer-shape, ordering, structured-output, decision-support]
status: stable
generated: { by: "codex/gpt-5.6", at: 2026-08-14T20:43:46Z }
stale_after: 2027-02-14
sources:
  - id: prompt-report
    resource: https://arxiv.org/abs/2406.06608
    title: The Prompt Report — A Systematic Survey of Prompting Techniques
  - id: google-prompting
    resource: https://ai.google.dev/gemini-api/docs/prompting-strategies
    title: Google — Prompt design strategies
  - id: ipdas
    resource: https://www.bmj.com/content/393/bmj-2025-088116
    title: Updated International Patient Decision Aid Standards, version 5.0
  - id: advice-timing
    resource: https://arxiv.org/abs/2205.09696
    title: Who Goes First? Influences of Human-AI Workflow on Decision Making in Clinical Imaging
---

# Response and presentation contracts

A response contract defines what a model must return. A presentation contract
adds relative order, labels, emphasis, uniqueness, and the final interaction
handoff when those properties affect interpretation or downstream use.

The Prompt Report calls attention to answer shape, answer space, and extraction
as design decisions rather than incidental formatting.[^prompt-report] Define:

- required and optional sections;
- field names and permitted values;
- relative order when sequencing changes meaning;
- repetition or uniqueness constraints;
- length and compression priorities;
- uncertainty, refusal, and missing-evidence forms;
- citations or provenance requirements; and
- the final status, choice request, or machine handoff.

Use deterministic structured-output or schema validation when syntax must be
enforced. Google recommends native structured output for complex schemas rather
than relying only on natural-language formatting instructions.[^google-prompting]

## Decision-support presentation

When a model compares alternatives, recommends one, and leaves authority with a
human, use this default sequence:

1. Decision question and proposed status.
2. Evidence, criteria, constraints, and affected boundaries.
3. Every viable option in parallel structure and comparable detail.
4. Material exclusions and their evidence-based reason.
5. One recommendation after the complete neutral comparison.
6. An explicit choice, revision, deferral, or evidence request without repeating
   the recommendation.

Balanced decision aids make the decision and relevant alternatives explicit and
present benefits and harms comparably.[^ipdas] Human-AI studies also show that
advice timing can change anchoring and reliance.[^advice-timing] For high-stakes
or preference-sensitive decisions, consider eliciting priorities or a
provisional view before revealing the recommendation.

Grade contractual structure directly. Semantic completeness does not excuse an
invalid order, duplicate recommendation, omitted choice request, or misleading
visual emphasis.

[^prompt-report]: The Prompt Report — A Systematic Survey of Prompting Techniques
[^google-prompting]: Google — Prompt design strategies
[^ipdas]: Updated International Patient Decision Aid Standards, version 5.0
[^advice-timing]: Who Goes First? Influences of Human-AI Workflow on Decision Making in Clinical Imaging
