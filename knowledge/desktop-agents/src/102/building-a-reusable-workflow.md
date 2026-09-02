---
type: How-to guide
description: How to turn a repeated task into stable instructions, changing inputs, outputs, checks, and pause points.
tags: [desktop-agent-102, reusable-workflow, templates, skills, checks]
---

# How to build a reusable workflow

Start from a task you have observed at least twice.

1. Name the situation in which the method should be used: “When weekly status
   notes are ready,” not “whenever writing is needed.”
2. List the inputs that change each time, such as this week's notes, audience,
   and due date.
3. Write the stable steps in the order they should happen.
4. Define the output: filename or destination, format, required parts, and
   examples if a visual shape matters.
5. Add checks that compare the result with its sources and requirements.
6. Add stop points for missing inputs, conflicting facts, sensitive material,
   and outside actions.
7. Run the method with one ordinary input set, then revise only from observed
   problems.

Keep **stable instructions** separate from **today's assignment**. The stable
instructions might say, “Always list missing owners.” Today's assignment says,
“Prepare the update for the September 8 meeting.” Mixing them makes reuse
harder and can leave old dates or names hidden in the method.

Products use different names for reusable instructions: templates, saved
prompts, custom instructions, skills, rules, or workflows. The label matters
less than the contents. A reusable method should make its trigger, inputs,
steps, outputs, checks, and limits inspectable.

Record it with the [workflow card template](../reference/workflow-card-template.md).
