---
type: Tutorial
description: A coding scenario for making and testing one bounded change in a fictional software project.
tags: [scenario, coding, software, testing, review]
---

# Small software change

**Situation:** A fictional website project has a feedback form, a short
requirements note, and automated checks. The form accepts an empty message,
which conflicts with the requirement.

**Agent fit:** The agent can inspect several files, propose a change, edit the
code, run the project's existing checks, and show the exact differences. A
person still approves the plan and reviews whether the behavior matches the
requirement.

**Task brief:**

> Find why the feedback form accepts an empty message. Use only this project.
> First explain the cause and propose the smallest change. After approval,
> update the code and add or adjust a check that proves an empty message is
> rejected without breaking a valid message. Do not install new software,
> change unrelated files, publish, or deploy. At the end, list changed files
> and show the check results.

**Checks:** The explanation points to the relevant code; the change is limited
to the stated behavior; the new check fails before the fix and passes after it;
existing checks still pass; the person reviews the exact file differences.

**Measure the gain:** Compare time spent locating the cause, making the change,
and gathering evidence. Record any unnecessary change the review prevented.

**Safety boundary:** Use a practice or authorized project. Never place secrets
or customer data in a test. Keep publishing, deployment, account changes, and
security-sensitive decisions behind the responsible person's approval.
