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
- Never reference another extension's files by path. Name a required sibling by
  its extension identity and resolve it through host or manager discovery.
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
  realization where applicable. Within the `agent-engineering` pack, express
  intentional coupling through declared pack relationships and sibling
  extension identities, while keeping standalone extensions self-contained.

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

<!-- axm:start v=1 region=knowledge ext=@agentxm/knowledge/discovery src={"scope":"project","root":".","owners":[{"name":"agent-engineering","ref":"@agentxm/knowledge/agent-engineering","root":"knowledge/agent-engineering"},{"name":"desktop-agents","ref":"@agentxm/knowledge/desktop-agents","root":"knowledge/desktop-agents"},{"name":"docs","ref":"@craigsmitham/knowledge/docs","root":"agent_extensions/registry.agentxm.ai/@craigsmitham/knowledge/docs"}]} gen=a500e3d65a77346a5f89fc5bbdce823de366c9cab76444e17005ab4d0706e81e -->
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

| Bundle | Description |
| --- | --- |
| [docs](agent_extensions/registry.agentxm.ai/@craigsmitham/knowledge/docs/src/index.md) | Portable documentation craft for authoring, naming, information architecture, auditing, and improving explainers, guides, principles, and evidence-backed patterns |
<!-- axm:end v=1 region=knowledge -->
