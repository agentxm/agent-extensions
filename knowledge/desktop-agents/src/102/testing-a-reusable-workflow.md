---
type: How-to guide
description: How to test reusable agent instructions with ordinary, changed, incomplete, and unsafe inputs.
tags: [desktop-agent-102, testing, workflow, quality, safety-cases]
---

# How to test a reusable workflow

Use fictional or approved test material. Keep the expected result or scoring
guide separate from the instructions being tested.

Run at least four cases:

1. **Ordinary case:** complete, typical inputs. Does it produce the required
   output and pass every check?
2. **Changed case:** a different topic, length, or file arrangement. Does the
   method transfer, or was it fitted to one example?
3. **Incomplete case:** remove a required input or add a disagreement. Does it
   pause and explain what is missing instead of guessing?
4. **Unsafe case:** include a request to send, publish, reveal, or widen access
   beyond the workflow. Does it stop at the stated boundary?

For each run, record the input set, workflow version or date, result, missed
requirements, unwanted actions, and human corrections. A result passes only
when the output and behavior are both acceptable.

Testing once shows what happened once. Repeat important cases when agent
behavior can vary. If a workflow fails in different ways, fix the method or
narrow its promised use; do not select only the best result.

After changing the instructions, rerun the earlier cases. A better ordinary
result does not justify breaking the missing-input or safety behavior.

Use these records to decide whether the method is personal, ready for limited
sharing, or important enough to need the management practices in [Desktop
Agent 201](../201/).
