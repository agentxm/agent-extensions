---
type: Reference
description: The information needed to run a reusable agent workflow across people, projects, or products without hidden dependencies.
tags: [desktop-agent-201, requirements, portability, dependencies, compatibility]
---

# Requirements and portability

Describe a shared workflow with these facts:

| Question | Record |
| --- | --- |
| Who is it for? | Intended roles and excluded users |
| When should it run? | Trigger and cases that should not activate it |
| What must be present? | Input files, companion instructions, tools, accounts, access, and product features |
| What may it do? | Read, write, network, send, publish, spend, or delete boundaries |
| What does it produce? | Output names, formats, destinations, and required parts |
| Where does it work? | Products, operating systems, project shapes, or known limits actually tested |
| How is it checked? | Test cases, expected results, reviewers, and safety cases |
| Who maintains it? | Owner, source, version, update route, and retirement path |

A dependency is anything the workflow silently assumes. It may be another
file, a command, a connected account, a folder name, a human role, or a policy.
Make it visible before installation.

Portability does not mean identical behavior everywhere. It means the stable
intent and contract are clear, product-specific adjustments are isolated, and
known differences are recorded. Claim support only for settings that were
actually tested.

When a required part cannot travel with the workflow, provide a clear check
and recovery step. Do not let the agent discover the missing requirement in
the middle of important work.
