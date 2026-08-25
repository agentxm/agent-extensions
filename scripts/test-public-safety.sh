#!/usr/bin/env bash
set -euo pipefail

repo_root="$(git rev-parse --show-toplevel)"
cd "$repo_root"

real_axm="$(command -v axm)"

test_root="$(mktemp -d "${TMPDIR:-/tmp}/public-safety-tests.XXXXXX")"
cleanup() {
  rm -rf -- "$test_root"
}
trap cleanup EXIT

tree="$(git write-tree)"
subject="skills/author-agent-skill/src/SKILL.md"

make_fixture() {
  local fixture
  fixture="$(mktemp -d "$test_root/fixture.XXXXXX")"
  git archive --format=tar "$tree" | tar -xf - -C "$fixture"
  git -C "$fixture" init -q
  git -C "$fixture" config user.name "Public Safety Test"
  git -C "$fixture" config user.email "public-safety@example.invalid"
  git -C "$fixture" add -A
  git -C "$fixture" add -f CLAUDE.md \
    knowledge/agent-engineering/src/skills/platforms/claude.md
  git -C "$fixture" commit -qm baseline
  printf '%s\n' "$fixture"
}

run_gate() {
  local fixture="$1"
  shift
  (
    cd "$fixture"
    PATH="$(dirname "$real_axm"):$PATH" scripts/check-public-safety.sh "$@"
  )
}

expect_failure() {
  local description="$1"
  shift
  if "$@" >"$test_root/unexpected-success.log" 2>&1; then
    echo "Expected failure: $description" >&2
    cat "$test_root/unexpected-success.log" >&2
    exit 1
  fi
}

baseline_fixture="$(make_fixture)"
before_status="$(git -C "$baseline_fixture" status --porcelain=v1 -z | sha256sum)"
before_index="$(git -C "$baseline_fixture" ls-files --stage -z | sha256sum)"
TMPDIR="$test_root" run_gate "$baseline_fixture" >/dev/null
TMPDIR="$test_root" run_gate "$baseline_fixture" --view git-index >/dev/null
after_status="$(git -C "$baseline_fixture" status --porcelain=v1 -z | sha256sum)"
after_index="$(git -C "$baseline_fixture" ls-files --stage -z | sha256sum)"
if [[ "$before_status" != "$after_status" || "$before_index" != "$after_index" ]]; then
  echo "The safety gate mutated the fixture worktree or index." >&2
  exit 1
fi
if find "$test_root" -maxdepth 1 \
  \( -name 'public-safety-git-index.*' -o -name 'public-safety-sync.*' -o -name 'public-safety-lint.*' -o -name 'public-safety-index.*' \) \
  -print -quit | grep -q .; then
  echo "The safety gate left temporary snapshot artifacts behind." >&2
  exit 1
fi

verification_fixture="$(make_fixture)"
verification_subject="knowledge/agent-engineering/src/skills/agent-skills.md"
sed 's/2026-08-09T20:48:38Z/2026-08-10T20:48:38Z/' \
  "$verification_fixture/$verification_subject" \
  >"$verification_fixture/$verification_subject.next"
mv "$verification_fixture/$verification_subject.next" \
  "$verification_fixture/$verification_subject"
expect_failure "knowledge verification predating generated content" \
  env TMPDIR="$test_root" bash -c 'cd "$1" && PATH="$2:$PATH" scripts/check-public-safety.sh' \
  _ "$verification_fixture" "$(dirname "$real_axm")"

mismatch_fixture="$(make_fixture)"
mismatch_manifest="agent_extensions/agentxm/@agentxm/skills/axm/skill.json"
jq '.version = "0.26.3"' "$mismatch_fixture/$mismatch_manifest" \
  >"$mismatch_fixture/$mismatch_manifest.next"
mv "$mismatch_fixture/$mismatch_manifest.next" "$mismatch_fixture/$mismatch_manifest"
git -C "$mismatch_fixture" add "$mismatch_manifest"
git -C "$mismatch_fixture" show "HEAD:$mismatch_manifest" \
  >"$mismatch_fixture/$mismatch_manifest"
mismatch_lint_sentinel="$test_root/mismatch-lint-executed"
mismatch_wrapper_dir="$(mktemp -d "$test_root/mismatch-wrapper.XXXXXX")"
cat >"$mismatch_wrapper_dir/axm" <<EOF
#!/usr/bin/env bash
set -euo pipefail
if [[ "\${1:-}" == "lint" ]]; then
  touch "$mismatch_lint_sentinel"
fi
exec "$real_axm" "\$@"
EOF
chmod 755 "$mismatch_wrapper_dir/axm"
expect_failure "staged AXM skill pin mismatch" \
  env TMPDIR="$test_root" bash -c 'cd "$1" && PATH="$2:$PATH" scripts/check-public-safety.sh --view git-index' \
  _ "$mismatch_fixture" "$mismatch_wrapper_dir"
if [[ ! -e "$mismatch_lint_sentinel" ]]; then
  echo "The safety gate did not let AXM lint report the staged skill pin mismatch." >&2
  exit 1
fi

unstaged_fixture="$(make_fixture)"
printf '\n/home/private-machine\n' >>"$unstaged_fixture/$subject"
TMPDIR="$test_root" run_gate "$unstaged_fixture" --view git-index >/dev/null
expect_failure "workspace-only private content" \
  env TMPDIR="$test_root" bash -c 'cd "$1" && PATH="$2:$PATH" scripts/check-public-safety.sh' \
  _ "$unstaged_fixture" "$(dirname "$real_axm")"

staged_fixture="$(make_fixture)"
printf '\n/home/private-machine\n' >>"$staged_fixture/$subject"
git -C "$staged_fixture" add "$subject"
git -C "$staged_fixture" show "HEAD:$subject" >"$staged_fixture/$subject"
TMPDIR="$test_root" run_gate "$staged_fixture" >/dev/null
expect_failure "staged private content hidden by a clean worktree" \
  env TMPDIR="$test_root" bash -c 'cd "$1" && PATH="$2:$PATH" scripts/check-public-safety.sh --view git-index' \
  _ "$staged_fixture" "$(dirname "$real_axm")"

untracked_fixture="$(make_fixture)"
printf 'api_key = exposed\n' >"$untracked_fixture/skills/untracked-secret.txt"
TMPDIR="$test_root" run_gate "$untracked_fixture" --view git-index >/dev/null
expect_failure "untracked secret in workspace mode" \
  env TMPDIR="$test_root" bash -c 'cd "$1" && PATH="$2:$PATH" scripts/check-public-safety.sh' \
  _ "$untracked_fixture" "$(dirname "$real_axm")"

eval_result_fixture="$(make_fixture)"
mkdir -p "$eval_result_fixture/skills/author-agent-skill/evals/results"
printf '{"evidence_class":"authoring-smoke"}\n' \
  >"$eval_result_fixture/skills/author-agent-skill/evals/results/smoke.json"
expect_failure "routine evaluation result stored in extension source" \
  env TMPDIR="$test_root" bash -c 'cd "$1" && PATH="$2:$PATH" scripts/check-public-safety.sh' \
  _ "$eval_result_fixture" "$(dirname "$real_axm")"

eval_runs_fixture="$(make_fixture)"
mkdir -p "$eval_runs_fixture/skills/author-agent-skill/evals/runs"
printf '{"evidence_class":"authoring-smoke"}\n' \
  >"$eval_runs_fixture/skills/author-agent-skill/evals/runs/smoke.json"
expect_failure "routine evaluation run stored under an alternative source path" \
  env TMPDIR="$test_root" bash -c 'cd "$1" && PATH="$2:$PATH" scripts/check-public-safety.sh' \
  _ "$eval_runs_fixture" "$(dirname "$real_axm")"

malformed_suite_fixture="$(make_fixture)"
malformed_suite="skills/author-agent-skill/evals/evals.json"
jq 'del(.suite_version)' "$malformed_suite_fixture/$malformed_suite" \
  >"$malformed_suite_fixture/$malformed_suite.next"
mv "$malformed_suite_fixture/$malformed_suite.next" "$malformed_suite_fixture/$malformed_suite"
expect_failure "malformed Agent Skill evaluation source" \
  env TMPDIR="$test_root" bash -c 'cd "$1" && PATH="$2:$PATH" scripts/check-public-safety.sh' \
  _ "$malformed_suite_fixture" "$(dirname "$real_axm")"

eval_symlink_fixture="$(make_fixture)"
ln -s ../../src/SKILL.md \
  "$eval_symlink_fixture/skills/author-agent-skill/evals/files/escaped-source.md"
expect_failure "evaluation source symlink into runtime payload" \
  env TMPDIR="$test_root" bash -c 'cd "$1" && PATH="$2:$PATH" scripts/check-public-safety.sh' \
  _ "$eval_symlink_fixture" "$(dirname "$real_axm")"

unmerged_fixture="$(make_fixture)"
base_blob="$(printf 'base\n' | git -C "$unmerged_fixture" hash-object -w --stdin)"
ours_blob="$(printf 'ours\n' | git -C "$unmerged_fixture" hash-object -w --stdin)"
theirs_blob="$(printf 'theirs\n' | git -C "$unmerged_fixture" hash-object -w --stdin)"
git -C "$unmerged_fixture" update-index --force-remove "$subject"
printf '100644 %s 1\t%s\n100644 %s 2\t%s\n100644 %s 3\t%s\n' \
  "$base_blob" "$subject" "$ours_blob" "$subject" "$theirs_blob" "$subject" \
  | git -C "$unmerged_fixture" update-index --index-info
expect_failure "unmerged Git index" \
  env TMPDIR="$test_root" bash -c 'cd "$1" && PATH="$2:$PATH" scripts/check-public-safety.sh --view git-index' \
  _ "$unmerged_fixture" "$(dirname "$real_axm")"

trusted_fixture="$(make_fixture)"
sentinel="$test_root/snapshot-script-executed"
printf '#!/usr/bin/env bash\ntouch %q\nexit 0\n' "$sentinel" \
  >"$trusted_fixture/scripts/check-public-safety.sh"
chmod 755 "$trusted_fixture/scripts/check-public-safety.sh"
git -C "$trusted_fixture" add scripts/check-public-safety.sh
git -C "$trusted_fixture" show HEAD:scripts/check-public-safety.sh \
  >"$trusted_fixture/scripts/check-public-safety.sh"
chmod 755 "$trusted_fixture/scripts/check-public-safety.sh"
TMPDIR="$test_root" run_gate "$trusted_fixture" --view git-index >/dev/null
if [[ -e "$sentinel" ]]; then
  echo "The safety gate executed the script from the untrusted snapshot." >&2
  exit 1
fi

trusted_eval_fixture="$(make_fixture)"
eval_sentinel="$test_root/snapshot-eval-validator-executed"
printf '#!/usr/bin/env node\nimport { writeFileSync } from "node:fs";\nwriteFileSync("%s", "executed\\n");\n' "$eval_sentinel" \
  >"$trusted_eval_fixture/skills/agent-skill-evaluator/src/scripts/agent-skill-eval.mjs"
git -C "$trusted_eval_fixture" add skills/agent-skill-evaluator/src/scripts/agent-skill-eval.mjs
git -C "$trusted_eval_fixture" show HEAD:skills/agent-skill-evaluator/src/scripts/agent-skill-eval.mjs \
  >"$trusted_eval_fixture/skills/agent-skill-evaluator/src/scripts/agent-skill-eval.mjs"
TMPDIR="$test_root" run_gate "$trusted_eval_fixture" --view git-index >/dev/null
if [[ -e "$eval_sentinel" ]]; then
  echo "The safety gate executed the evaluation validator from the untrusted snapshot." >&2
  exit 1
fi

mutation_fixture="$(make_fixture)"
wrapper_dir="$(mktemp -d "$test_root/wrapper.XXXXXX")"
cat >"$wrapper_dir/axm" <<EOF
#!/usr/bin/env bash
set -euo pipefail
"$real_axm" "\$@"
status=\$?
if [[ \$status -eq 0 && "\${1:-}" == "lint" ]]; then
  printf '\nindex mutation\n' >> docs/publishing.md
  git add docs/publishing.md
fi
exit \$status
EOF
chmod 755 "$wrapper_dir/axm"
expect_failure "Git index mutation during validation" \
  env TMPDIR="$test_root" bash -c 'cd "$1" && PATH="$2:$PATH" scripts/check-public-safety.sh --view git-index' \
  _ "$mutation_fixture" "$wrapper_dir"

hook_fixture="$(make_fixture)"
git -C "$hook_fixture" config core.hooksPath .githooks
printf '\nHook integration test.\n' >>"$hook_fixture/docs/publishing.md"
git -C "$hook_fixture" add docs/publishing.md
(
  cd "$hook_fixture"
  PATH="$(dirname "$real_axm"):$PATH" git commit -qm "test: exercise public safety hook"
)

missing_axm_fixture="$(make_fixture)"
minimal_path="$(mktemp -d "$test_root/no-axm.XXXXXX")"
ln -s "$(command -v bash)" "$minimal_path/bash"
ln -s "$(command -v git)" "$minimal_path/git"
expect_failure "pre-commit hook without AXM" \
  env PATH="$minimal_path" "$missing_axm_fixture/.githooks/pre-commit"

echo "Public safety integration tests passed."
