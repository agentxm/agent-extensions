# Synthetic runnable authoring smoke

- Target: `@example/skills/normalize-release-notes@0.2.0`
- Target identity: `sha256:1111111111111111111111111111111111111111111111111111111111111111`
- Suite: `0.1.0`, identity `sha256:2222222222222222222222222222222222222222222222222222222222222222`
- Harness: isolated synthetic runner `1.0.0`
- Host and model: `example-host/1.0`, `example-model-1`
- Configuration and catalog: `config-a`, `catalog-a`
- Authority: read supplied fixtures and write only the ignored run workspace
- Grader: deterministic structural checks plus calibrated reviewer `reviewer-a`
- Trials: one per selected case
- Baseline: `no-baseline`
- Evidence tier: authoring smoke

The suite contains one routing positive, one adjacent negative, and one
activated-execution happy path. Expected selections and grader assertions are
available only to the grader. The harness starts fresh state for every trial.
