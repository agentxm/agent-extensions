#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage: $0 [--view workspace|git-index]" >&2
}

view="workspace"
if [[ $# -gt 0 ]]; then
  if [[ $# -ne 2 || "$1" != "--view" ]]; then
    usage
    exit 2
  fi
  view="$2"
fi

if [[ "$view" != "workspace" && "$view" != "git-index" ]]; then
  usage
  exit 2
fi

repo_root="$(git rev-parse --show-toplevel)"
cd "$repo_root"

if ! command -v axm >/dev/null 2>&1; then
  echo "AXM is required. Install the latest release from https://axm.sh." >&2
  exit 1
fi

for dependency in jq rg realpath sha256sum; do
  if ! command -v "$dependency" >/dev/null 2>&1; then
    echo "The public safety gate requires '$dependency', but it is not installed." >&2
    exit 1
  fi
done

git_index_fingerprint() {
  local digest
  digest="$(git ls-files --stage -z | sha256sum | cut -d ' ' -f 1)"
  printf 'sha256:%s\n' "$digest"
}

assert_index_unchanged() {
  local current_fingerprint
  current_fingerprint="$(git_index_fingerprint)"
  if [[ "$current_fingerprint" != "$expected_index_fingerprint" ]]; then
    echo "The Git index changed during public safety validation; rerun the commit." >&2
    exit 1
  fi
}

snapshot_root=""
cleanup() {
  if [[ -n "$snapshot_root" ]]; then
    rm -rf -- "$snapshot_root"
  fi
}
trap cleanup EXIT

assert_sync_converged() {
  local root="$1"
  local output="$2"

  if ! (cd "$root" && axm sync --preview --json) >"$output"; then
    cat "$output"
    return 1
  fi

  if ! jq -e '
    select(
      .ok == true and
      (.result.outcome == "previewed" or .result.outcome == "no-op") and
      .result.errorCount == 0 and
      .result.blockedCount == 0
    )
  ' "$output" >/dev/null; then
    cat "$output"
    echo "AXM sync preview did not report a recoverable workspace." >&2
    return 1
  fi
}

validation_root="$repo_root"
if [[ "$view" == "git-index" ]]; then
  expected_index_fingerprint="$(git_index_fingerprint)"

  sync_output="$(mktemp "${TMPDIR:-/tmp}/public-safety-sync.XXXXXX")"
  lint_output="$(mktemp "${TMPDIR:-/tmp}/public-safety-lint.XXXXXX")"
  snapshot_root="$(realpath "$(mktemp -d "${TMPDIR:-/tmp}/public-safety-git-index.XXXXXX")")"
  trap 'rm -f -- "$sync_output" "$lint_output"; cleanup' EXIT

  materialized_index_fingerprint="$(
    scripts/materialize-git-index.sh "$snapshot_root"
  )"
  if [[ "$materialized_index_fingerprint" != "$expected_index_fingerprint" ]]; then
    echo "The materialized snapshot does not match the Git index." >&2
    exit 1
  fi
  assert_index_unchanged
  validation_root="$snapshot_root"

  if ! assert_sync_converged "$validation_root" "$sync_output"; then
    exit 1
  fi
  assert_index_unchanged

  if ! axm lint --view git-index --strict --json >"$lint_output"; then
    cat "$lint_output"
    exit 1
  fi

  reported_index_fingerprint="$(
    jq -er '
      select(.ok == true and .result.input.view == "git-index") |
      .result.input.fingerprint
    ' "$lint_output"
  )"
  if [[ "$reported_index_fingerprint" != "$expected_index_fingerprint" ]]; then
    echo "AXM validated a different Git index; rerun the commit." >&2
    exit 1
  fi
  assert_index_unchanged
else
  sync_output="$(mktemp "${TMPDIR:-/tmp}/public-safety-sync.XXXXXX")"
  trap 'rm -f -- "$sync_output"; cleanup' EXIT
  assert_sync_converged "$validation_root" "$sync_output"
  axm lint --view workspace --strict
fi

expected=(
  knowledge/agent-engineering
  knowledge/context-engineering
  knowledge/eval-engineering
  knowledge/harness-engineering
  knowledge/prompt-engineering
  knowledge/skill-engineering
  packs/agent-engineering
  packs/context-engineering
  packs/harness-engineering
  packs/skill-engineering
  skills/audit-agent-instructions
  skills/audit-agent-skill
  skills/author-agent-instructions
  skills/author-agent-skill
  skills/garden-context
)

expected_list="$(printf '%s\n' "${expected[@]}")"
actual_list="$(
  find "$validation_root/.axm/extensions/@agentxm" -type f \
    \( -name skill.json -o -name pack.json -o -name knowledge.json -o -name rule.json \) \
    ! -path '*/skills/axm/skill.json' \
    | sed -E "s#^${validation_root}/.axm/extensions/@agentxm/([^/]+/[^/]+)/.*#\\1#" \
    | sort
)"

if [[ "$expected_list" != "$actual_list" ]]; then
  echo "Public package inventory differs from the approved ${#expected[@]}-package set." >&2
  diff <(printf '%s\n' "$expected_list") <(printf '%s\n' "$actual_list") || true
  exit 1
fi

if rg -n --hidden \
  '(/Users/|/home/[A-Za-z0-9._-]+|~/(Code|Notes|OneDrive)|agent-extensions-private|personal-os|\.exe\.xyz|craig@)' \
  "$validation_root/.axm/extensions/@agentxm"; then
  echo "Found a private or machine-specific identifier in public package content." >&2
  exit 1
fi

if rg -n --hidden -i \
  '(api[_-]?key|client[_-]?secret|access[_-]?token|private[_-]?key|password)[[:space:]]*[:=][[:space:]]*[^$<{[:space:]]' \
  "$validation_root/.axm/extensions/@agentxm"; then
  echo "Found a possible hard-coded secret in public package content." >&2
  exit 1
fi

while IFS= read -r -d '' link; do
  resolved="$(realpath "$link")"
  case "$resolved" in
    "$validation_root"/*) ;;
    *)
      echo "Symlink escapes validation root: $link -> $resolved" >&2
      exit 1
      ;;
  esac
done < <(find "$validation_root" -path "$validation_root/.git" -prune -o -type l -print0)

while IFS= read -r -d '' manifest; do
  jq -e '
    (.description | type == "string" and length > 0) and
    (.keywords | type == "array" and length > 0) and
    (.license | type == "string" and length > 0) and
    (.homepage == "https://github.com/agentxm/agent-extensions") and
    (.repository.url == "https://github.com/agentxm/agent-extensions") and
    (.repository.directory | startswith(".axm/extensions/@agentxm/"))
  ' "$manifest" >/dev/null
done < <(find "$validation_root/.axm/extensions/@agentxm" -type f \
  \( -name skill.json -o -name pack.json -o -name knowledge.json -o -name rule.json \) \
  ! -path '*/skills/axm/skill.json' -print0)

while IFS= read -r license_id; do
  if [[ ! -f "$validation_root/LICENSES/${license_id}.txt" ]]; then
    echo "Missing license text for declared SPDX identifier: ${license_id}" >&2
    exit 1
  fi
done < <(
  find "$validation_root/.axm/extensions/@agentxm" -type f \
    \( -name skill.json -o -name pack.json -o -name knowledge.json -o -name rule.json \) \
    ! -path '*/skills/axm/skill.json' \
    -print0 \
    | xargs -0 jq -r '.license' \
    | rg -o '[A-Za-z0-9][A-Za-z0-9.-]*' \
    | rg -v '^(AND|OR|WITH)$' \
    | sort -u
)

if jq -e --argjson expected_count "${#expected[@]}" '
  ([.skills | to_entries[] | select(.key != "axm") |
      (.value | if type == "object" then .source else . end)] +
   [.knowledge | to_entries[] | .value] +
   [.packs | to_entries[] | .value] +
   [(.rules // {}) | to_entries[] | .value]) |
  map(select(type == "string" and startswith("workspace:@agentxm/"))) |
  length == $expected_count
' "$validation_root/.axm/settings.json" >/dev/null; then
  :
else
  echo "A public package is not owned by this workspace." >&2
  exit 1
fi

if ! jq -e '
  .owner == "@agentxm" and
  .publish.defaultVisibility == "public"
' "$validation_root/.axm/settings.json" >/dev/null; then
  echo "Public first-party extensions must default to public Registry visibility." >&2
  exit 1
fi

while IFS= read -r -d '' manifest; do
  axm knowledge lint --path "$(dirname "$manifest")"
done < <(find "$validation_root/.axm/extensions/@agentxm/knowledge" \
  -mindepth 2 -maxdepth 2 -name knowledge.json -print0)

knowledge_cursor=""
while :; do
  metadata_output=""
  query_args=(
    knowledge concepts query
    --kind concept
    --limit 100
    --json
  )
  if [[ -n "$knowledge_cursor" ]]; then
    query_args+=(--cursor "$knowledge_cursor")
  fi

  if ! metadata_output="$(
    cd "$validation_root"
    axm "${query_args[@]}"
  )"; then
    printf '%s\n' "$metadata_output"
    echo "Could not inspect knowledge lifecycle metadata." >&2
    exit 1
  fi

  if ! jq -e '
    .result.items as $items |
    all($items[];
      . as $item |
      (($item.verified // []) | length) == 0 or
      (
        ($item.generated.at? | type) == "string" and
        all($item.verified[]; .at >= $item.generated.at)
      )
    )
  ' <<<"$metadata_output" >/dev/null; then
    echo "Knowledge verification must not predate generated content." >&2
    jq -r '
      .result.items[] |
      . as $item |
      ($item.verified // [])[] |
      select(($item.generated.at? // "") == "" or .at < $item.generated.at) |
      "  \($item.ref.bundle)#\($item.ref.conceptId): generated=\($item.generated.at // "missing") verified=\(.at)"
    ' <<<"$metadata_output" >&2
    exit 1
  fi

  if [[ "$(jq -r '.result.hasMore' <<<"$metadata_output")" != "true" ]]; then
    break
  fi
  knowledge_cursor="$(jq -er '.result.cursor' <<<"$metadata_output")"
done

if [[ "$view" == "git-index" ]]; then
  assert_index_unchanged
fi

echo "Public extension safety checks passed for the ${view} view."
