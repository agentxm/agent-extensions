#!/usr/bin/env bash
set -euo pipefail

repo_root="$(git rev-parse --show-toplevel)"
cd "$repo_root"

evaluator_root=".axm/extensions/@agentxm/skills/agent-skill-evaluator/src"
jq -e '
  .standalone == true and
  (.recommendedPacks | index("@agentxm/packs/agent-engineering") != null)
' .axm/extensions/@agentxm/skills/agent-skill-evaluator/skill.json >/dev/null
jq -e '
  .dependencies["@agentxm/skills/agent-skill-evaluator"] == ">=0.1.0"
' .axm/extensions/@agentxm/packs/agent-engineering/pack.json >/dev/null
node "$evaluator_root/scripts/agent-skill-eval.mjs" validate --json
node "$evaluator_root/scripts/test-runner.mjs"
