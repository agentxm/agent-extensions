---
type: Reference
title: OpenAI skill profile
description: OpenAI-specific discovery, invocation, metadata, and distribution behavior layered on the portable core.
tags: [agent-skills, openai, codex, compatibility]
status: stable
stale_after: 2027-02-14
generated: { by: "codex/gpt-5.6", at: 2026-08-14T19:36:04Z }
sources:
  - id: openai-build-skills
    resource: https://learn.chatgpt.com/docs/build-skills
    title: OpenAI — Build skills
---

# OpenAI skill profile

OpenAI Codex supports explicit invocation and implicit selection from discovered
skill metadata. Repository-, user-, admin-, and system-level locations can
contribute skills; use the current product documentation for the precise search
order and supported paths.[^openai-build-skills]

Design implications:

- treat name and description as a scarce discovery index; the initial skill
  list is bounded by a context budget;
- put all routing triggers and exclusions in the description, not only the body;
- keep `SKILL.md` concise and load references, scripts, and assets on demand;
- use `agents/openai.yaml` only for OpenAI-specific presentation or dependency
  metadata; do not make it the sole source of the portable contract;
- distribute reusable collections through a supported plugin or package
  mechanism rather than assuming local installation state.

Test both `$`/skill-picker invocation and natural-language routing in the actual
Codex surface being claimed. Product behavior is versioned and this profile
must be refreshed after its `stale_after` date.

[^openai-build-skills]: OpenAI — Build skills

