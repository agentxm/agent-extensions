---
type: Explanation
title: Runbook explainer
description: "What a runbook is — a genre, not a type: a how-to guide for one known failure mode, hardened for execution under time pressure, and where it stops."
tags: [docs, runbook, genre, playbook, operations, diataxis, explanation]
status: stable
sources:
  - id: uptimelabs-runbook-playbook
    resource: https://www.uptimelabs.io/learn/runbook-vs-playbook
    title: Uptime Labs — Runbook vs playbook
  - id: cortex-runbooks-playbooks
    resource: https://www.cortex.io/post/runbooks-vs-playbooks
    title: Cortex — Runbooks vs playbooks
  - id: techtarget-compare
    resource: https://www.techtarget.com/searchitoperations/tip/Compare-runbooks-vs-playbooks-for-IT-process-documentation
    title: TechTarget — Compare runbooks vs playbooks for IT process documentation
  - id: solarwinds-runbook-playbook
    resource: https://www.solarwinds.com/blog/runbook-vs-playbook-whats-the-difference
    title: SolarWinds — Runbook vs playbook
  - id: redhat-ansible-playbook
    resource: https://www.redhat.com/en/topics/automation/what-is-an-ansible-playbook
    title: Red Hat — What is an Ansible playbook (runbook automation context)
  - id: diataxis-how-to
    resource: https://diataxis.fr/how-to-guides/
    title: Diátaxis — How-to guides
  - id: diataxis-how-to-src
    resource: https://github.com/evildmp/diataxis-documentation-framework/blob/main/source/how-to-guides.rst
    title: Diátaxis source — how-to-guides.rst
generated:
  by: claude/opus-5
  at: 2026-08-12T17:05:43Z
---

# Runbook explainer

A **runbook** is a **linear procedure for one known, recurring operational task
or failure mode**, written to be executed correctly by whoever is on call. It
is a [genre, not a type](../docs-explainer.md#genres-are-not-types): stripped of
its operational framing, a runbook is a
[how-to guide](../types/how-to-explainer.md) — goal-oriented directions for a competent
reader at work.

What the genre adds is **execution context**. A runbook is read by someone who
did not necessarily write it, possibly at 3am, under time pressure, on a system
that is currently misbehaving, with a stake in not making things worse. That
context hardens the how-to in specific ways:

- a **named trigger** — the alert or condition that sends the reader here
- **verification after each step** — the expected output, so the reader knows
  the step worked before continuing
- an explicit **stop-and-escalate** condition
- a **rollback** or safe abort path
- **no digression** — anything the reader does not need mid-incident is a link

Everything on that list is compatible with Diátaxis how-to craft. The runbook
is not a different job; it is the how-to guide with its least forgiving reader.

## Genre decomposition

| Part of a runbook | Diátaxis job |
| --- | --- |
| The procedure itself | How-to guide |
| Trigger, preconditions, expected output | How-to guide (preconditions, verification) |
| Thresholds, contacts, system inventories | Reference — link, do not inline |
| Why this failure happens | Explanation — link, do not inline |
| Choosing between two runbooks | Not here — see [playbook](playbook-explainer.md) |

Because a runbook is a how-to guide, [How-to guide](../types/how-to-guide.md) is the
authoring procedure. This document explains what the genre adds; it does not
duplicate that craft.

## Orientation

| | |
| --- | --- |
| **Reader need** | Executing a known procedure correctly, now |
| **Success** | The task completes, or the reader escalates knowingly rather than improvising |
| **Voice** | Prescriptive: numbered actions, exact commands, stated expected results |
| **Typical prompt** | *This alert fired — what do I run?* · *How do I fail over the primary?* |
| **Title cue** | Names the **condition or task**, matching the trigger — *Failover the primary database* |

## What belongs

- The **trigger**: the alert name, symptom, or scheduled occasion that sends a
  reader here, worded to match what they actually saw
- Preconditions: access, credentials by reference, tooling, and any prior state
  the procedure assumes
- Exact, copyable **commands** with the expected output beside them
- **Verification** — how the reader confirms each consequential step landed
- A **stop condition**: what observation means *do not continue, escalate*
- **Rollback** or safe abort, and how to tell whether rollback is still possible
- Where to go next when the procedure completes, or when it does not

## What does not belong

- Diagnosis of *which* problem the reader has, or selection among several
  procedures — that routing belongs in a [playbook](playbook-explainer.md)
- Background on why the system fails this way (explanation) — link it
- Full inventories of flags, hosts, or dashboards (reference) — link them
- Teaching the reader the system from zero (tutorial) — a runbook assumes
  competence, and an incident is the worst time to learn
- Live secrets, tokens, or credentials — reference the secret store instead
- Steps whose outcome the reader cannot verify

## Quality signals

- The trigger at the top matches the words on the alert that woke someone up
- A reader who has never run it before can execute it without asking anyone
- Every consequential step says what *should* happen, so a silent failure is
  visible
- The escalation condition appears before the reader needs it, not after the
  final step
- It has been executed recently, by someone other than its author
- Its blast radius is stated where an action is destructive or irreversible

Staleness is the dominant risk. Runbooks describe the system as it was; every
deploy can invalidate one. An untested runbook is a **claim**, not a
capability — the rehearsal is the only thing that distinguishes them.

## Runbook vs how-to guide (the hard boundary)

Both are goal-oriented directions for a competent reader at work. The
difference is the **execution context**, not the job:

| | Runbook | How-to guide (general) |
| --- | --- | --- |
| Occasion | A trigger fires; the reader did not choose the moment | The reader chose to do this |
| Time pressure | Usually present | Usually absent |
| Path | Deliberately single and linear | Forks and alternatives are welcome |
| Adaptability | Minimized — variation is risk | Real-world adaptability is a virtue |
| Verification | Expected output at each step | Often only at the end |
| Failure handling | Explicit stop, escalate, roll back | Pitfalls and recovery notes |
| Reader’s stake | Making it worse is a live possibility | Usually recoverable |

Diátaxis argues that how-tos should *not* be only linear, because real problems
fork and need judgment. A runbook narrows that deliberately: under pressure,
the fork is the hazard. That narrowing is legitimate precisely because the
situation is **known**. Where the situation is not known, the fork has to live
somewhere — and that somewhere is a playbook.

A runbook still branches, though: verify-and-continue, roll back,
stop-and-escalate. Those forks sit **within** the procedure, which is why the
document still reduces to a single how-to guide. A fork **between** procedures
does not reduce, and belongs in a
[playbook](playbook-explainer.md#the-reducibility-test) — that asymmetry, not
tactical-versus-strategic, is the load-bearing difference between the two
genres.

For the full playbook contrast, see
[Playbook explainer](playbook-explainer.md#playbook-vs-runbook-the-hard-boundary).
Note also that the split between the terms is
[contested](playbook-explainer.md#the-distinction-is-contested): many
organizations use *runbook* and *playbook* interchangeably, along traditional
IT-versus-business lines.

## The automation gradient

Runbooks are the how-to genre most likely to stop being prose. Runbook
automation tooling exists to execute exactly this material, and the industry
term *playbook* in Ansible refers to that executable form.

A useful reading: **a runbook with no judgment left in it is a script nobody
has written yet.** That suggests where each one sits on a gradient:

| Judgment remaining | Right form |
| --- | --- |
| None — deterministic steps, deterministic checks | Automate it; keep prose only as the description |
| A little — one human decision, rest mechanical | Automate around the decision point |
| Substantial — reading context, weighing risk | Keep it prose, and make the judgment explicit |

Documenting a fully mechanical runbook forever, rather than automating it, is a
real cost decision — not a documentation success.

## Where runbooks stop

A runbook assumes the failure follows an **anticipated pattern**. Novel
incidents fall outside what it can supply, and a reader who follows a
plausible-looking runbook into a different failure can extend an outage. The
honest runbook states which failure it addresses precisely enough that the
reader can tell it is the wrong document.

## Failure modes (common)

- **Stale procedure** — commands, hostnames, or console paths that no longer
  exist; discovered mid-incident
- **Unverifiable steps** — actions with no expected output, so failure is
  silent until later
- **Diagnosis creep** — the runbook grows a triage tree and quietly becomes a
  bad playbook
- **Absorbed explanation** — background about the subsystem in the middle of
  the procedure
- **Author-only executability** — implicit knowledge that only the writer has
- **No stop condition** — the reader keeps going past the point where
  escalation was correct
- **Never rehearsed** — correct-looking and untested

## Related

- [Playbook explainer](playbook-explainer.md)
- [How-to explainer](../types/how-to-explainer.md) · [How-to guide](../types/how-to-guide.md)
- [Documentation craft](../docs-explainer.md)
- [Reference explainer](../types/reference-explainer.md)
- [Explanation explainer](../types/explanation-explainer.md)
