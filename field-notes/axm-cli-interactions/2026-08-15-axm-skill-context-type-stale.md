---
subject: axm-cli-interactions
key: axm-skill-context-type-stale
date: 2026-08-15
kind: gap
status: open
---

**Expected:** The installed `axm` skill's Quick Reference lists `<type>` ∈
{`skills`, `subagents`, `commands`, `mcps`, `context`, `packs`} and the commands
`axm <type> list` and `axm <type> publish <name>`, so `axm context list` should
list the workspace's knowledge extensions.

**Actual:** `axm context list` exited non-zero with `Unknown subcommand
"context" for "axm"`. The root help lists `knowledge` instead, has no `commands`
or `context` subcommand, adds `hooks` and `rules`, and exposes publish as a
top-level `axm publish [<selectors...>]` rather than a per-type subcommand.

**Gap:** The skill's Quick Reference tables were written against an earlier
command surface and are not regenerated when the CLI's type vocabulary changes.
Nothing in the skill points at a command that would reveal the drift before the
first failed invocation.

**Suggests:** Generate the skill's type list and command tables from `axm`'s own
help output, or replace them with a directive to read `axm --help` and
`axm help <topic>` first, so the skill cannot drift from the installed CLI.

Evidence: Ran from `/Users/craig/Code/agentxm/agent-extensions` on the
`@agentxm` first-party catalog. `axm context list` → exit 1, `Unknown
subcommand "context"`. `axm help` lists a `knowledge` topic and no `context`
topic. `axm publish --help` documents `axm publish [flags] [<selectors...>]`.
`axm knowledge --help` documents `new`, `install`, `update`, `uninstall`,
`list`, `show`, `concepts`, `lint`, `enable`. Skill source read this session at
`/Users/craig/.claude/skills/axm`. Installed CLI version not captured.
