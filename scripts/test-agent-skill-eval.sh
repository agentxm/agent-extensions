#!/usr/bin/env bash
set -euo pipefail

repo_root="$(git rev-parse --show-toplevel)"
cd "$repo_root"

node scripts/evals/agent-skill-eval.mjs validate

test_root="$(mktemp -d "${TMPDIR:-/tmp}/agent-skill-eval-tests.XXXXXX")"
cleanup() {
  rm -rf -- "$test_root"
}
trap cleanup EXIT

adapter="$test_root/synthetic-adapter.mjs"
printf '%s\n' \
  '#!/usr/bin/env node' \
  'import { mkdirSync, readFileSync, writeFileSync } from "node:fs";' \
  'import { join } from "node:path";' \
  'const [mode, requestPath, trialRoot] = process.argv.slice(2);' \
  'const request = JSON.parse(readFileSync(requestPath, "utf8"));' \
  'mkdirSync(trialRoot, { recursive: true });' \
  'if (mode === "trial") {' \
  '  const response = request.stage === "routing"' \
  '    ? { selected: request.catalog.some((item) => item.name === "axm") ? ["axm", request.target.name] : request.target.name, reason: "synthetic runner test", side_effects: [] }' \
  '    : { final_response: "Synthetic execution response for runner mechanics.", side_effects: [], support_paths: JSON.parse(process.env.EVAL_SUPPORT_PATHS_JSON ?? "[]") };' \
  '  writeFileSync(join(trialRoot, "response.json"), `${JSON.stringify(response, null, 2)}\n`);' \
  '} else {' \
  '  const grade = {' \
  '    outcome: "pass",' \
  '    failure_class: null,' \
  '    assertions: request.assertions.map((assertion) => ({ assertion, result: "pass", evidence: "synthetic runner test" })),' \
  '    detail: "Synthetic grade verifies runner mechanics only.",' \
  '  };' \
  '  writeFileSync(join(trialRoot, "grade.json"), `${JSON.stringify(grade, null, 2)}\n`);' \
  '}' \
  >"$adapter"
chmod 755 "$adapter"

run_suite() {
  local package="$1"
  local cases="$2"
  local run_id="$3"
  node scripts/evals/agent-skill-eval.mjs run \
    --package "$package" \
    --adapter "$adapter" \
    --host synthetic-runner-test \
    --model synthetic-model-1 \
    --configuration-id synthetic-config-1 \
    --catalog-id repository-catalog-test \
    --authority-policy-id read-only-synthetic \
    --sandbox-mode read-only \
    --case-author-id repository-suite \
    --runner-id repository-runner-test \
    --reviewer-id same-agent-test \
    --grader-id synthetic-grader-1 \
    --evidence-class authoring-smoke \
    --support-path .axm/extensions/@agentxm/knowledge/agent-engineering/src/index.md \
    --case "$cases" \
    --run-id "$run_id" \
    --output-root "$test_root/output" \
    >/dev/null
}

run_suite \
  .axm/extensions/@agentxm/skills/author-agent-skill \
  1,10 \
  author-agent-skill-runner-test
run_suite \
  .axm/extensions/@agentxm/skills/evaluate-agent-skill \
  1,6 \
  evaluate-agent-skill-runner-test

for run_record in \
  "$test_root/output/@agentxm/skills/author-agent-skill/author-agent-skill-runner-test/run.json" \
  "$test_root/output/@agentxm/skills/evaluate-agent-skill/evaluate-agent-skill-runner-test/run.json"; do
  jq -e '
    .state == "complete" and
    .evidence_class == "authoring-smoke" and
    .target.source_revision != null and
    .target.source_state != null and
    .target.package_content_identity != null and
    .suite.suite_content_identity != null and
    .environment.host == "synthetic-runner-test" and
    .provenance.grader_identity == "synthetic-grader-1" and
    .outcomes.pass == 2 and
    (.raw_evidence | length > 0)
  ' "$run_record" >/dev/null
done

jq -e '
  .support_paths == [".axm/extensions/@agentxm/knowledge/agent-engineering/src/index.md"]
' "$test_root/output/@agentxm/skills/author-agent-skill/author-agent-skill-runner-test/trials/1/1/response.json" >/dev/null

echo "Agent Skill evaluation runner tests passed."
