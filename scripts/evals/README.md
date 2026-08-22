# Agent Skill evaluation runner

This repository runner validates first-party Agent Skill evaluation source and
executes declared routing and activated-execution cases through a replaceable
adapter. It writes generated evidence under the ignored `.work/evals/` tree.
It does not promote, audit, or approve a result.

Validate every first-party suite:

```sh
node scripts/evals/agent-skill-eval.mjs validate
```

Run selected cases with the included Codex adapter:

```sh
node scripts/evals/agent-skill-eval.mjs run \
  --package .axm/extensions/@agentxm/skills/evaluate-agent-skill \
  --adapter scripts/evals/adapters/codex.mjs \
  --host codex-cli \
  --model <exact-model-id> \
  --configuration-id <configuration-id> \
  --catalog-id <catalog-id> \
  --authority-policy-id read-only \
  --sandbox-mode read-only \
  --case-author-id <case-author-id> \
  --runner-id <runner-id> \
  --reviewer-id <reviewer-id> \
  --grader-id <grader-id> \
  --evidence-class authoring-smoke \
  --case 1,6
```

Use `--case` more than once or pass comma-separated case IDs. Other options
include `--trials`, `--run-id`, `--output-root`, `--baseline`, `--timeout-ms`,
`--token-budget`, `--cost-budget-usd`, and `--independence`.

Use `--sandbox-mode workspace-write` only for a case whose declared task
authority requires local artifacts. The Codex adapter provisions a disposable
AXM project before such a trial; the generated workspace is deleted after the
response and its reported side effects are retained. Grading remains read-only.

The Codex adapter starts a fresh temporary workspace and process for each trial
and grader call. Routing trials see only catalog names and descriptions.
Execution trials receive the target runtime payload, the coupled public
agent-engineering knowledge, and declared fixture contents. The adapter removes
the temporary workspace after preserving transcripts, responses, grades,
timing, and adapter logs in the run directory.

## Adapter contract

An adapter is an executable invoked as either:

```text
<adapter> trial <request.json> <trial-directory>
<adapter> grade <grader-request.json> <trial-directory>
```

`trial` writes `response.json`. A routing response contains `selected`,
`reason`, and `side_effects`; `selected` is one skill name or an ordered array
when the task requires composed skills. An execution response contains
`final_response` and `side_effects`. `grade` writes `grade.json` with an
outcome, failure class, per-assertion results, evidence, and detail. A nonzero
exit or missing output is recorded as `harness-error`.

One same-author run is authoring smoke even when every case passes. Release
evidence additionally requires a clean Git-bound target, exact identities,
the contract's repeated trials and cohort, calibrated grading, reviewable raw
evidence, and independent review. The runner enforces some of these conditions;
the evaluation contract and decision authority remain controlling.
