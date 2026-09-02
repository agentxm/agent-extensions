---
type: How-to guide
description: How to give a desktop agent a goal, sources, limits, output, and finish line it can follow.
tags: [desktop-agent-101, task-brief, prompting, instructions, scope]
---

# How to write a clear task brief

A useful task brief answers six questions. Write it as ordinary work language;
no special prompt formula is required.

1. **What result do you want?** Name the file, decision, plan, analysis, or
   change—not only the topic.
2. **What may the agent use?** Name the files, folders, websites, or tools that
   are in scope.
3. **What must it preserve?** State what it must not change, disclose, send,
   delete, or invent.
4. **What should the result look like?** Give the format, audience, length, and
   required parts.
5. **How will we know it is done?** Give checks a person or tool can perform.
6. **When should it pause?** Ask it to stop before risky actions, unresolved
   choices, or work outside the brief.

For example:

> Using only the three files in the `survey-copies` folder, create
> `themes.md` for the volunteer coordinator. Group repeated concerns, include
> a short supporting excerpt for each theme, and list unanswered questions.
> Do not identify people or change the source files. Stop if a response
> contains information that could identify a person. Before writing, show me
> the plan. Done means every theme points back to at least one source file.

Good briefs reduce avoidable back-and-forth, but they do not need to predict
everything. Ask the agent to state assumptions and questions rather than
silently fill gaps.

Use the [task brief template](../reference/task-brief-template.md) when the work
is unfamiliar or important. For a two-minute, low-risk task, a shorter brief
may be enough.
