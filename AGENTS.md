# First-party AgentXM extensions

This repository is the canonical public source for extensions owned and
maintained by AgentXM under the `@agentxm` Registry handle. Author canonical
packages under the root type directories; use AXM rather than editing
agent-specific projections.

## Public-by-construction

Treat every tracked file, manifest, generated artifact, symlink target, commit,
branch, issue, and pull request as permanent public information. Never add
private repository paths, internal hostnames, credentials, customer material,
personal data, unpublished product plans, or private operational context.

Every package must be portable, rights-cleared, independently useful outside
AgentXM's private repositories, and safe to copy, index, mirror, and retain.
Examples and fixtures must be synthetic.

## Ownership and package boundaries

- Publish first-party AgentXM guidance here and only here.
- Keep personal methodology and third-party community extensions with their
  respective owners; topic overlap alone does not establish AgentXM ownership.
- Treat every non-pack extension as independently installed. It must not assume
  another extension is present unless both are direct members of one pack and
  the package declares the required pack relationship.
- Use canonical `<plural-type>/<name>/src/` paths for
  intentional same-pack references. Never reference agent projections.
- Packs may depend only on public, active extensions and may not depend on
  other packs.

## AXM-aware extension design

- Here, “extension” includes skills, subagents, MCP servers, rules, hooks,
  knowledge bundles, packs, agent plugins, and similar agent capability
  packages.
- Treat AXM as the extension composition and lifecycle substrate, not merely a
  packaging tool. Before addressing discovery, projections, dependencies,
  packs, reconciliation, validation, versioning, or release, consult the
  installed `axm` skill and relevant `axm help` topics.
- Prefer AXM's native models and workflows. Do not prescribe parallel
  manifests, manual projections or copies, implicit dependencies, or lifecycle
  processes that bypass AXM without a clear design or portability reason.
- Keep portable principles independent of AXM while providing AXM-specific
  realization where applicable. Within the `agent-engineering` pack, use
  declared pack relationships and canonical same-pack references for
  intentional coupling, while keeping standalone extensions self-contained.

## Authoring and release

Before changing an extension, read the installed `axm` skill and the relevant
`axm help` topic. Preserve manifest descriptions, package README guidance,
provenance, attribution, SPDX license expressions, and self-containment.

Before publishing:

1. Inspect the complete diff and every cross-extension reference.
2. Run `axm lint` and resolve all errors and warnings.
3. Run an exact `axm publish <fqn...> --preview --json` selection.
4. Publish only the reviewed selection and verify each Registry identity.

Do not commit, push, publish, deprecate, or change external repositories unless
the developer explicitly requests that operation.

## Evaluation artifacts

For extension evaluations, keep runtime payload under `<extension>/src/`,
versioned contracts, cases, public-safe synthetic fixtures, graders, and harness
source under `<extension>/evals/`, and routine generated runs under the ignored
`.work/evals/<owner>/<type>/<name>/<run-id>/` tree. Before adding or changing
evaluation material, read
[How to manage evaluation assets and evidence](knowledge/agent-engineering/src/evaluation/managing-evaluation-assets-and-evidence.md);
for Agent Skill behavior, also read
[How to evaluate an Agent Skill](knowledge/agent-engineering/src/evaluation/evaluating-agent-skills.md).
After changing Agent Skill evaluation source, run
`node skills/agent-skill-evaluator/src/scripts/agent-skill-eval.mjs validate`.

Do not track routine transcripts, traces, outputs, grades, timing, summaries, or
same-agent authoring-smoke results. Promote a compact immutable manifest under
`<extension>/evals/releases/` only for an explicit release, admission, rollback,
or published benchmark decision, and only when it binds clean target, suite,
harness, environment, grader, trial, baseline, and durable raw-evidence
identities. Preserve unknown and harness-error outcomes; missing evidence is
never a pass. Apply the public-by-construction rule to ignored workspaces, CI
logs, and workflow artifacts as well as tracked files.

## Field note subjects

| Subject | Mode | Scope | Target condition | Retire when |
| --- | --- | --- | --- | --- |
| axm-cli-interactions | survey | Sessions that directly run `axm` to complete work in this workspace or manually validate AXM behavior; automated test invocations excluded | — | Recurring notes support a specific target condition, or two triage reviews find no pattern |

<!-- axm:start v=1 region=knowledge ext=@agentxm/knowledge/discovery -->
## Knowledge Bundles

Use `axm knowledge concepts --help` to search, read, and explore these bundles.

### @agentxm

<!-- axm:point v=1 ext=@agentxm/knowledge/agent-engineering kind=knowledge -->
<!-- axm:point v=1 ext=@agentxm/knowledge/desktop-agents kind=knowledge -->

| Bundle | Description |
| --- | --- |
| [agent-engineering](knowledge/agent-engineering/src/index.md) | End-to-end design of goal-directed AI agent systems: agent behavior, multi-agent coordination, prompts, context, harness, skills, evaluation, trust, and operations |
| [desktop-agents](knowledge/desktop-agents/src/index.md) | Practical, plain-language guidance for using desktop AI agents safely and effectively in everyday, professional, educational, and technical work |

### @craigsmitham

<!-- axm:point v=1 ext=@craigsmitham/knowledge/docs kind=knowledge -->
<!-- axm:point v=1 ext=@craigsmitham/knowledge/field-notes kind=knowledge -->

| Bundle | Description |
| --- | --- |
| [docs](agent_extensions/agentxm/@craigsmitham/knowledge/docs/src/index.md) | Portable documentation craft for authoring, naming, information architecture, auditing, and improving explainers, guides, principles, and evidence-backed patterns |
| [field-notes](agent_extensions/agentxm/@craigsmitham/knowledge/field-notes/src/index.md) | Operational field-note practice for factual and diagnostic evidence capture, impact-aware triage, evidence-led findings, and verified corrective action |
<!-- axm:end v=1 region=knowledge -->
<!-- axm:start v=1 region=rules ext=@agentxm/rules/instructions -->
<!-- axm:point v=1 ext=@craigsmitham/rules/field-notes@0.2.2 kind=rule -->

## Field notes

Record how work actually goes, so recurring obstacles become durable
improvements instead of repeated friction.

Subjects under observation are declared in the `## Field note subjects` table in
this file. **If that section is missing or has no rows, this rule is inactive —
do nothing.**

### When to record

While doing ordinary work within a declared subject, record one note when:

- reality differs from instructions, documentation, or command output;
- you retry, guess, search, or improvise an undocumented workaround; or
- a `target`-mode subject is blocked from its target condition.

Do not record your own typo, the same incident twice in one session, or
speculation without an observed incident.

### Preserve diagnostic evidence

While working within a declared subject, do not discard safe structured failure
details before deciding whether an interaction qualifies for capture. Inspect
the complete result, preserve the process exit status, and keep result output
separate from diagnostic output. If output must be reduced, retain materially
useful error, request, response, retry, recovery, and affected-artifact fields.
Never retain credentials, authorization material, opaque response bodies, or
other sensitive values. Do not rerun a mutation merely to recover evidence.

### How to record

On the first qualifying incident in a session, read `capture.md` alongside the
installed field-notes rule source.
Append one note for each qualifying incident. Recording it is expected behavior,
not an admission of failure.

### Stay in the work

Log and continue. Do not investigate the note, fix what it describes, open an
issue, or discuss it beyond one short line at the end of your response.

Raise a live correctness, data-loss, or security problem immediately instead of
filing it. Stop to ask only when genuinely blocked on ambiguous architecture,
data model, or destructive scope; name the ambiguity in one sentence with two or
three options.

To declare subjects, triage notes, or promote them into findings, use the
`field-notes` skill. Never do that work inline.
<!-- axm:end v=1 region=rules -->
