---
subject: axm-cli-interactions
key: knowledge-concept-shadows-instruction-file
date: 2026-08-22
kind: gap
status: open
---

**Expected:** A Knowledge bundle concept under a bundle's `src/` is inert
reference material. `axm help knowledge` states that bundle content is not
injected into agent instructions and is opened on demand, and `axm lint`
reported no findings for the bundle.

**Actual:** While editing
`.axm/extensions/@agentxm/knowledge/agent-engineering/src/skills/platforms/claude.md`,
the Claude Code harness injected that concept's body into the session as a
project instruction file, displayed as
`Contents of .../src/skills/platforms/CLAUDE.md`. A later edit to the same file
produced a harness notice reporting a change to `.../platforms/CLAUDE.md`.

**Gap:** On a case-insensitive filesystem, a concept legitimately named for the
`claude` platform profile collides with the harness convention for `CLAUDE.md`
instruction files. AXM validates the bundle by its own rules and has no reason
to flag the name; the harness matches on filename alone and has no reason to
know the path is inside a Knowledge bundle. Neither side is wrong on its own
terms, so nothing warns.

**Suggests:** Lint could warn when a bundle concept's filename case-folds to a
reserved agent instruction filename for a configured agent, in the same class
as the existing reserved-name checks on `index.md` and `log.md`.

Evidence:

- Host: Claude Code 2.1.220, macOS (case-insensitive APFS by default; the exact
  volume casing setting for this checkout was not verified).
- Bundle: `@agentxm/knowledge/agent-engineering`, concept
  `skills/platforms/claude`, tracked in git as lowercase `claude.md`
  (`git ls-files` shows `.../platforms/claude.md`).
- `axm lint` and `axm knowledge lint --path ...` both reported no findings
  before and after the edit.
- Sibling platform profiles in the same directory (`codex.md`, `openai.md`,
  `gemini-cli.md`, `copilot.md`) do not collide with any harness-reserved name.
- Impact observed this session was context noise only: the concept body was
  presented as authoritative project instruction. Whether the harness would
  apply it as instruction precedence over the real repository `CLAUDE.md` was
  not tested.
