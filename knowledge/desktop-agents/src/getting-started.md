---
type: Tutorial
description: A complete first session with a desktop AI agent, from choosing and setting up a product to checking a finished result and repeating the method on your own task.
tags: [getting-started, desktop-agent-101, setup, first-task, verification]
---

# Get started with a desktop AI agent

In this guide we will go from nothing installed to one checked result. We will
choose a product, give it a small practice workspace, ask it for a one-page
decision brief built from two fictional files, review its plan, check its work
against the sources, and then repeat the method on a task of your own.

Allow about 90 minutes: 15 to choose and set up, 45 for the practice task, and
30 for your own task. No coding or command-line experience is required.

Everything you need is on this page. Each step links to a fuller treatment if
you want more depth, but you can finish without opening any of them.

## Before you start

You need a computer you can install software on (or an approved product
already installed), and permission to use an AI tool for your work. If your
workplace or school has an AI-use policy, follow it—it sets the boundary even
when a product offers a broader button.

## 1. Confirm this task wants an agent

A desktop agent is worth the setup when the result has to live in your work:
a changed document, an organized folder, a checked set of outputs. When the
answer itself is the result, ordinary chat is still the right tool.

The signal to watch for is **manual relay work**—pasting the same background
again, copying answers into several files, or explaining which version is
current. That friction is the problem an agent removes.

Do not force every task into an agent. A two-minute question is still a
two-minute chat.

More depth: [Chat, projects, and desktop
agents](start-here/chat-projects-and-desktop-agents.md) and the [chat or agent
decision guide](reference/chat-or-agent-decision-guide.md).

## 2. Choose a product

You do not need the best product—you need one you are allowed to use, can
point at a single folder, and can review. Decide in this order:

1. **Use an approved product** if your organization has one.
2. **Match the form to your material.** Choose a desktop app for documents and
   mixed files, an editor add-on for files you already keep open, a
   command-line tool for a folder you already work in. If unsure, choose a
   desktop app: it shows the most and demands the least new skill.
3. **Require four things.** The product must let you limit the workspace, ask
   before it changes or sends anything, show you what it changed, and write
   results back into your files. A product missing any of these is a poor fit
   for learning.

More depth: [How to choose a desktop AI
agent](platforms/choosing-a-desktop-agent.md), [Ways desktop agents come
packaged](start-here/ways-desktop-agents-come-packaged.md), and the
freshness-dated [official setup guides](platforms/current-official-guides.md).

## 3. Set it up with a safe practice space

1. Install or open the product from its official source.
2. Review its data and permission settings. Know whether work runs locally,
   remotely, or in a mixture, and what may be retained.
3. Create a new folder named `desktop-agent-practice`.
4. Copy these two fictional files into it:
   [`meeting-notes.txt`](resources/101/meeting-notes.txt) and
   [`project-update.txt`](resources/101/project-update.txt). Download them or
   paste their contents into new plain-text files.
5. Open that folder as the agent's working space, and give it access only to
   that folder if the interface allows it.

Use fictional details only. Do not add real names, company facts, or private
information to a practice folder.

If setup needs unfamiliar administrator access or security choices, use the
provider's official support or a trusted local administrator. Do not paste
commands from an unverified source to get past a blocker.

More depth: [Start with your
platform](platforms/starting-with-your-platform.md).

## 4. Make first contact without changing anything

Ask:

> List the files you can see. Do not change anything. Tell me what kinds of
> actions would require my approval in this product.

**You should see** exactly two files, plus a short description of the
product's approval behavior.

**If it can see more than the practice folder,** stop and narrow its access
before continuing. Seeing your whole drive on a first task is a setup problem,
not something to work around.

## 5. Write the assignment

A useful task brief answers six questions: what result you want, what the
agent may use, what it must not change, what the result should look like, how
you will know it is done, and when it should pause.

Send this brief:

> Create `decision-brief.md` from `meeting-notes.txt` and
> `project-update.txt`. Include: the decision needed, three options, known
> facts, open questions, and next steps with owners and dates. Keep it under
> 500 words. Mark disagreements or missing information instead of guessing.
> Do not change the source files and do not use the internet. First show me
> your plan and wait for approval.

Notice that the brief names the output file, bounds the sources, protects the
originals, states the required parts, and asks for a plan first.

More depth: [How to write a clear task
brief](101/writing-a-clear-task-brief.md) and the [task brief
template](reference/task-brief-template.md).

## 6. Review the plan and any permission request

**You should see** a plan that reads both sources, compares them, creates one
new file, and checks it against the brief. It should not propose editing the
source files or contacting anyone.

Ask for a change if the plan is broader than the assignment. Then read each
permission request as a sentence: **"Allow this action on this target now."**
Check all three parts. "Run a tool" is not specific enough—which tool, doing
what, to which files?

Approve only the creation of `decision-brief.md`.

Pause when the target is wider than the task, when the action can spend money,
publish, send, delete, or overwrite, or when you do not understand what will
happen. You may reject a request and ask for a smaller route; a capable agent
should help you find one.

More depth: [How to review plans and
permissions](101/reviewing-plans-and-permissions.md).

## 7. Check the result yourself

Open `decision-brief.md` and read it before asking the agent anything.

1. **Check the assignment.** Are all five requested parts present? Is it under
   500 words?
2. **Check the sources.** Open both files and sample the brief's key claims,
   names, and dates. The two fictional sources disagree about the launch date
   and leave the help-desk owner open. A trustworthy brief shows those gaps
   rather than quietly choosing an answer.
3. **Check the changes.** Confirm both source files are unchanged and that no
   unexpected file was left behind.
4. **Check usefulness.** Would acting on this cause harm if a claim were
   wrong?

Then ask the agent for its own check:

> Check `decision-brief.md` against both source files. List any statement that
> is unsupported, any requirement you missed, and any source disagreement you
> may have hidden. Do not edit yet.

Read that check yourself. It is useful, but it is not proof—the same system
that made a mistake may miss it again. Strong checks compare the result with
something outside the agent: the original files, a calculation, a trusted
reference, or another person.

More depth: [How to check the result](101/checking-the-result.md).

## 8. Correct and close out

Ask for corrections to `decision-brief.md` only. Finish with:

> Summarize which files you created, changed, moved, or deleted, and state any
> remaining uncertainty.

Confirm that summary matches what you see in the folder.

You have now completed the basic loop:

**Choose a workspace → give a bounded task → review the plan → allow the work
→ inspect the result → verify the changes.**

## 9. Repeat it on a task of your own

The practice task only proves the tool works. This step proves the method
transfers.

1. Choose a low-risk task with two to five inputs and one visible output—one
   that would take you 20 to 45 minutes by hand and whose correct result you
   can recognize.
2. Remove anything private, confidential, irreplaceable, or high-stakes. Work
   from copies, and replace personal details with fictional ones.
3. Write a brief covering the six questions from step 5.
4. Ask for a plan, and correct any step that exceeds the brief.
5. Allow the bounded work, then check the output against the brief and at
   least two source details.
6. Record what changed and whether you would use an agent for this again.

Keep three things: your brief, the final output, and a short check note naming
one thing you verified yourself and one thing you would change next time.

Save sending messages, changing real accounts, handling client or patient
information, spending money, publishing, and deleting for later—after you know
the product's controls and your organization's rules.

More depth: [How to choose a good first
task](start-here/choosing-a-good-first-task.md) and the [101 transfer
challenge](101/transfer-challenge.md).

## If something goes wrong

| What you see | What to do |
| --- | --- |
| The agent can see files outside the practice folder | Stop and narrow its access in the product's settings before continuing |
| It edited a source file | Restore your copy, then restate the protection in the brief and ask for a plan again |
| It acted without showing a plan | Ask it to stop, then check the product's approval settings before retrying |
| The result looks polished but you cannot trace a claim | Ask which source supports it; treat an unsupported claim as an assumption to verify or remove |
| It asks to send, publish, or delete something | Reject the request. Preparing a draft never implies permission to send it |
| Setup asks for administrator access you do not understand | Stop and use the provider's official support or a trusted administrator |

## What you can do now

| You can now | Where it was practiced |
| --- | --- |
| Tell whether a task suits chat or an agent (101.1) | Steps 1 and 9 |
| Choose a useful, low-risk first task (101.2) | Step 9 |
| Give an agent a bounded assignment (101.3) | Steps 5 and 9 |
| Review a plan and narrow a permission request (101.4) | Steps 4 and 6 |
| Verify a result and the actual changes (101.5) | Steps 7 and 8 |
| Transfer the loop to your own work (101.6) | Step 9 |

Do not count time saved from a single attempt as a guaranteed benefit. Setup
and learning take time. Record the handoffs, repeated copying, or errors the
agent removed—those are a better basis for deciding what to repeat.

## Where to go next

- [Desktop Agent 101](101/) - the same skills, one at a time, with more
  practice and an independent challenge.
- [Safety and human review](safety/) - risk levels, sensitive information,
  outside effects, and recovery. Read this before your first task involving
  anything real.
- [Scenario library](scenarios/) - executive, household, professional,
  education, and small-team practice tasks made from fictional data.
- [Desktop Agent 102](102/) - turn a task you repeat into a reusable method.
