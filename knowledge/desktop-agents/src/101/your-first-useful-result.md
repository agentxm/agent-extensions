---
type: Tutorial
description: A guided first desktop-agent task that turns fictional notes into a checked one-page decision brief.
tags: [desktop-agent-101, tutorial, first-task, decision-brief, synthetic-data]
---

# Your first useful result

In this lesson, we will give a desktop AI agent two fictional source files and
ask it to create a one-page decision brief. We will approve a small plan, keep
the source files unchanged, and check the result against the originals.

Allow 30 to 45 minutes. Use any desktop agent that can work with files in a
folder. If you have not chosen one, start with [the platform
notes](../platforms/).

## 1. Make a safe practice space

Create a new folder named `desktop-agent-practice`. Copy these two fictional
files into it:

- [`meeting-notes.txt`](../resources/101/meeting-notes.txt)
- [`project-update.txt`](../resources/101/project-update.txt)

Download them or copy their contents into new plain-text files. Do not add real
names, company facts, or private information.

## 2. Open the folder with your agent

Choose this practice folder as the agent's working space. Ask:

> List the files you can see. Do not change anything. Tell me what kinds of
> actions would require my approval in this product.

You should see only the two source files. If the agent can see more than the
practice folder, stop and narrow its access before continuing.

## 3. Give the assignment

Send this task brief:

> Create `decision-brief.md` from `meeting-notes.txt` and
> `project-update.txt`. Include: the decision needed, three options, known
> facts, open questions, and next steps with owners and dates. Keep it under
> 500 words. Mark disagreements or missing information instead of guessing.
> Do not change the source files and do not use the internet. First show me
> your plan and wait for approval.

The expected plan should mention reading both sources, comparing them,
creating one new file, and checking it against the brief. It should not propose
editing the source files or contacting anyone.

## 4. Review and approve the plan

Ask for a change if the plan is broader than the assignment. When the plan is
bounded, approve only the creation of `decision-brief.md`.

Notice any permission question. Read the action and target before approving.
An unfamiliar or wider action is a reason to pause, not a test you must pass.

## 5. Inspect the result

Open `decision-brief.md` yourself. Check that it contains all five requested
parts and stays under 500 words. Then ask:

> Check `decision-brief.md` against both source files. List any statement that
> is unsupported, any requirement you missed, and any source disagreement you
> may have hidden. Do not edit yet.

Review that check yourself. The two fictional sources disagree about the
launch date and leave the help-desk owner open. A trustworthy brief should show
those gaps rather than quietly choose an answer.

## 6. Revise, then close

If needed, ask the agent to correct only `decision-brief.md`. Finish by asking
it to summarize which file it created or changed. Confirm that the two source
files are still unchanged.

You now have the basic desktop-agent loop:

**Choose a workspace → give a bounded task → review the plan → allow the work
→ inspect the result → verify the changes.**

Next, learn [how to write a clear task brief](writing-a-clear-task-brief.md),
then try the [101 transfer challenge](transfer-challenge.md).
