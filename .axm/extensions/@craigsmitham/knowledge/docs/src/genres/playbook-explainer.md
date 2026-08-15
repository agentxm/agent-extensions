---
type: Explanation
title: Playbook explainer
description: "What a playbook is — a genre, not a type: a situation-selected collection of plays plus the criteria for choosing among them, and why that how-to/explanation fusion is deliberate."
tags: [docs, playbook, genre, runbook, diataxis, explanation]
status: stable
sources:
  - id: methodgrid-origin
    resource: https://methodgrid.com/blog/from-sport-to-business-why-playbooks-underpin-success-seven-key-factors/
    title: Method Grid — From sport to business, why playbooks underpin success
  - id: etymonline-playbook
    resource: https://www.etymonline.com/word/playbook
    title: Etymonline — playbook
  - id: ise-playbook
    resource: https://microsoft.github.io/code-with-engineering-playbook/
    title: Microsoft ISE — Engineering Fundamentals Playbook
  - id: cortex-runbooks-playbooks
    resource: https://www.cortex.io/post/runbooks-vs-playbooks
    title: Cortex — Runbooks vs playbooks
  - id: uptimelabs-runbook-playbook
    resource: https://www.uptimelabs.io/learn/runbook-vs-playbook
    title: Uptime Labs — Runbook vs playbook
  - id: techtarget-compare
    resource: https://www.techtarget.com/searchitoperations/tip/Compare-runbooks-vs-playbooks-for-IT-process-documentation
    title: TechTarget — Compare runbooks vs playbooks for IT process documentation
  - id: trainual-handbook-playbook
    resource: https://trainual.com/manual/andbook-vs-playbook
    title: Trainual — Handbook vs playbook
  - id: redhat-ansible-playbook
    resource: https://www.redhat.com/en/topics/automation/what-is-an-ansible-playbook
    title: Red Hat — What is an Ansible playbook
  - id: diataxis-how-to
    resource: https://diataxis.fr/how-to-guides/
    title: Diátaxis — How-to guides
generated:
  by: claude/opus-5
  at: 2026-08-12T17:05:43Z
---

# Playbook explainer

A **playbook** is a **collection of pre-decided responses to a category of
situation, together with the criteria for choosing among them**. It is a
[genre, not a type](../docs-explainer.md#genres-are-not-types): it decomposes into
several **how-to guides** (the plays) wrapped in **explanation** (which play,
who decides, who is told).

The name is literal. In American football a playbook is a bound book of
diagrammed plays that the team studies before the season; each play tells every
player what to do, when, and what everyone else is doing at the same moment.
Three properties come across with the metaphor and are what the word still
carries in business and operations:

- **Plurality** — it is a container of many discrete plays, not one document.
- **Situational selection** — the reader picks the play that fits the field.
  Plays are modular and unordered.
- **Coordination** — plays direct several actors at once, not one reader.

Microsoft’s engineering playbook states the selection property plainly: a play
is a step-by-step guide to a desired end state, plays need not be executed in
any specific order, and the reader mixes and matches the most appropriate play
for the problem at hand.

Other names hosts use for overlapping jobs: *Field guide*, *Response guide*,
*Operating manual*.

## Not the Ansible sense

In infrastructure tooling, an **Ansible playbook** is executable YAML — a
blueprint of automation tasks run against an inventory. That is a genuine
homonym, not a documentation genre. Near infrastructure code, say “Ansible
playbook” or “response playbook” rather than relying on context.

## Genre decomposition

A playbook is not a fifth documentation type. It is a container whose parts
each belong to one of the four:

| Part of a playbook | Diátaxis job |
| --- | --- |
| Each individual play | How-to guide |
| Selection criteria — which play, when | Explanation |
| Roles, authority, escalation, comms | Explanation |
| Severity matrices, contact tables, thresholds | Reference |
| Onboarding walkthrough of the playbook itself | Tutorial (usually separate) |

The fusion of how-to and explanation is **deliberate**, and it is the genre’s
whole value: a reader who already knew which play to run would just open the
play. Diátaxis warns against mixing jobs *within a document*; a playbook avoids
the warning by keeping the mix at the **collection** level — plays stay clean
how-tos, and the selection layer stays a distinct, explanation-shaped front
matter that routes to them.

A playbook that fails does so by collapsing that separation: the selection
rationale bleeds into the plays until no single document can be executed under
pressure.

## Orientation

| | |
| --- | --- |
| **Reader need** | Choosing and coordinating a response to a class of situation |
| **Success** | The right play is selected quickly, and everyone knows their part |
| **Voice** | Guiding framework: decisions, roles, and criteria, then hand off to a play |
| **Typical prompt** | *What do we do when X happens?* · *Who decides?* · *Which procedure applies here?* |
| **Title cue** | Names a **situation class**, not one task — *Security incident playbook* |

## What belongs

- A **named category of situation** with entry criteria — when this playbook
  is in force and when it is not
- **Roles and authority** — who commands, who executes, who communicates, who
  is informed
- **Selection criteria** — the decision points, thresholds, and branches that
  route to one play rather than another
- The **plays themselves**, each a bounded how-to that can be executed alone
- Escalation and communication paths, including out to people who are not
  reading the playbook
- Exit criteria — how the situation is declared over

## What does not belong

- A single linear procedure with no branch and no choice — that is a
  [runbook](runbook-explainer.md); a playbook containing exactly one play is a
  runbook with ceremony
- Rules, policy, and employment terms with no situational trigger — that is a
  handbook
- The exhaustive **inventory** of every system, endpoint, or contact
  (reference) — link it
- Extended design rationale or postmortem narrative (explanation) beyond what
  selection requires
- Plays swollen with the reasoning that belongs in the selection layer, so
  nothing is executable at speed

## Quality signals

- The entry criteria are unambiguous — a reader can tell in seconds whether
  this playbook applies
- Selection is **decidable**: each branch names an observable condition, not a
  judgment left entirely open
- Every play stands alone; extracting one and handing it to a stranger still
  works
- Roles are named by function, not by person
- The reader under pressure reaches an action within one page
- It admits its limits — see *Where playbooks stop* below

## Playbook vs runbook (the hard boundary)

The industry draws the contrast this way, and Uptime Labs compresses it well:
runbooks fix the technology, playbooks coordinate the humans.

| | Playbook | Runbook |
| --- | --- | --- |
| Unit | A category of situation | A single known failure mode |
| Structure | Branching; selects among procedures | Linear; one procedure |
| Contains | Roles, decisions, communication | Commands, steps, expected output |
| Audience | Whoever coordinates, plus all responders | Whoever is on call |
| Trigger | A situation is declared | A specific alert fires |
| Tone | Guiding framework | Prescriptive instruction |
| Judgment | Required — that is the point | Minimized by design |
| Relationship | Often references or contains runbooks | Referenced from playbooks |

The containment is the most useful part: a playbook includes the means of
deciding **which** runbook to run.

## The distinction is contested

Treat the table above as normative aspiration rather than observed usage.
TechTarget argues the two are more similar than different, that practitioners
frequently use the terms interchangeably, and that the split is mainly a matter
of tradition — **business** professionals say *playbook*, **IT** professionals
say *runbook* for materially similar documents.

Two consequences for authoring:

1. Do not correct someone else’s usage as if the distinction were settled.
   Ask what the document must do.
2. Do not rely on the genre name to tell a reader what is inside. Say in the
   opening lines whether the document selects among procedures or executes one.

## The reducibility test

Because the received contrast is unreliable, it helps to have a test that
follows from craft rather than tradition. Ask what the document **reduces to**:

- A **runbook reduces to one type** — a how-to guide. Its thresholds and
  contacts are links to reference; its background is a link to explanation;
  what remains is a single executable path.
- A **playbook does not reduce.** Remove the explanation that selects among
  the plays and what is left is a folder of unrelated how-tos. The selection
  layer is not packaging around the content; it *is* content.

Both genres contain branches, so branching alone decides nothing. What decides
it is where the branch sits:

> **Branching within a procedure is a runbook. Branching between procedures is
> a playbook.**

Verify-and-continue, roll back, and stop-and-escalate are all *within* one
procedure — a runbook keeps them and stays a how-to guide. Choosing which
procedure applies is *between* procedures, and needs a document whose job is
that choice.

This is a claim about what each genre reduces to when written well, not a
description of every artifact bearing the name. Real runbooks accumulate
triage trees; that accumulation is the *diagnosis creep* failure mode below,
and the test is what names it.

## Where playbooks stop

Both playbooks and runbooks assume the situation follows an **anticipated
pattern**. A genuinely novel incident falls outside what either can supply, and
a playbook that claims otherwise trains false confidence. The honest playbook
names the boundary of its own coverage and says what to do when the situation
is not in the book.

## Failure modes (common)

- **Handbook drift** — accumulates values, policy, and org trivia until the
  operational core is unfindable
- **One-play playbook** — a single procedure dressed in coordination language
- **Undecidable branches** — selection criteria that restate the problem
  (*if the incident is severe*) without an observable threshold
- **Absorbed plays** — rationale mixed into each play until none is executable
  under pressure
- **Naming collision** — used near infrastructure code without disambiguating
  the Ansible sense
- **Closed-world confidence** — no acknowledgment that novel situations exist

## Related

- [Runbook explainer](runbook-explainer.md)
- [Documentation craft](../docs-explainer.md)
- [How-to explainer](../types/how-to-explainer.md) · [How-to guide](../types/how-to-guide.md)
- [Explanation explainer](../types/explanation-explainer.md)
- [Reference explainer](../types/reference-explainer.md)
