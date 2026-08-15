# Agent engineering knowledge

Portable knowledge for people designing and operating goal-directed AI agents.
It covers when agency is warranted, how agent behavior should be structured,
and how humans, tools, memory, multiple actors, trust, and lifecycle concerns
fit together. It does not replace runtime, prompt, context, workflow, skill, or
evaluation engineering, and it does not attempt to cover robotics, autonomous
vehicles, or reinforcement learning as complete fields.

## Install

```bash
axm install @agentxm/knowledge/agent-engineering
```

## Usage

Browse from `src/index.md`, or retrieve an exact concept with AXM:

```bash
axm knowledge concepts get '@agentxm/knowledge/agent-engineering#foundations/agents-workflows-and-automation'
axm knowledge concepts get '@agentxm/knowledge/agent-engineering#design/agent-loop-feedback-and-termination'
```

## Trust and freshness

Concept frontmatter distinguishes lifecycle status from provenance. `stable`
means the concept is intended for current use; it does not claim independent
review. `generated` records the producing actor. A `verified` event applies to
the current generated content only when its timestamp is at or after
`generated.at`. A `codex/*` verification is machine confirmation, not human
review. Unless a `human:*` verifier is recorded, confirm consequential claims
against cited sources and current product documentation.

## License

CC-BY-4.0.
