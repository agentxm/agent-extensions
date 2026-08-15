# First-party AgentXM extensions

This repository is the canonical public source for extensions owned and
maintained by AgentXM under the `@agentxm` Registry handle. Author canonical
packages under `.axm/extensions/@agentxm`; use AXM rather than editing
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
- Use canonical `.axm/extensions/@agentxm/<plural-type>/<name>/src/` paths for
  intentional same-pack references. Never reference agent projections.
- Packs may depend only on public, active extensions and may not depend on
  other packs.

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

<!-- axm:start region=knowledge-base -->
## Knowledge Base

### @agentxm

| Bundle | Description |
| --- | --- |
| [agent-engineering](.axm/extensions/@agentxm/knowledge/agent-engineering/src/index.md) | Design of goal-directed AI agents: agency choice, goals, control loops, planning, tool use, memory policy, human oversight, coordination, trust, reliability, and lifecycle |
| [context-engineering](.axm/extensions/@agentxm/knowledge/context-engineering/src/index.md) | Context selection, authority, routing, retrieval, memory, compaction, feedback, and lifecycle practices for agent systems |
| [eval-engineering](.axm/extensions/@agentxm/knowledge/eval-engineering/src/index.md) | Evaluation design, validity, task sampling, trials, graders, uncertainty, evidence, and lifecycle practices for AI systems |
| [harness-engineering](.axm/extensions/@agentxm/knowledge/harness-engineering/src/index.md) | Runtime, interface, environment, persistence, feedback, authority, and containment engineering for agent systems |
| [prompt-engineering](.axm/extensions/@agentxm/knowledge/prompt-engineering/src/index.md) | Prompt design, templating, evaluation, trust, versioning, and adaptation across model-facing instruction surfaces |
| [skill-engineering](.axm/extensions/@agentxm/knowledge/skill-engineering/src/index.md) | Agent Skill design, evaluation, trust, admission, ownership, capability governance, portability, and portfolio lifecycle practices |

### @craigsmitham

| Bundle | Description |
| --- | --- |
| [docs](.axm/extensions/@craigsmitham/knowledge/docs/src/index.md) | Portable documentation craft for understanding, authoring, organizing, auditing, and improving explainers, guides, principles, and evidence-backed patterns |
<!-- axm:end region=knowledge-base -->
