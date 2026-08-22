# Synthetic evaluation-source validation state

- Target: `@example/skills/render-status-summary@0.3.0`
- Requested change: revise one execution case and its deterministic grader
- Bundled evaluator AXM state: installed, `enabled: false`
- Retained bundled source:
  `.axm/extensions/@agentxm/skills/agent-skill-evaluator/src/`
- Explicit validator: `@example/eval-contract-checker@3.0.0`
- Validator identity:
  `sha256:6666666666666666666666666666666666666666666666666666666666666666`
- Entrypoint: operator-declared, read-only, and trusted for this authoring task
- Capability mapping: validates the repository evaluation contract, cases,
  fixtures, and grader declarations without running behavioral trials

The explicit validator is the only active validation mechanism for this task.
