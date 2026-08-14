#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 <empty-destination>" >&2
  exit 2
fi

destination="$1"
if [[ ! -d "$destination" || -n "$(find "$destination" -mindepth 1 -print -quit)" ]]; then
  echo "Git-index snapshot destination must be an empty directory: $destination" >&2
  exit 1
fi
destination="$(realpath "$destination")"

index_listing="$(mktemp "${TMPDIR:-/tmp}/public-safety-index.XXXXXX")"
cleanup() {
  rm -f -- "$index_listing"
}
trap cleanup EXIT

git ls-files --stage -z >"$index_listing"
index_fingerprint="sha256:$(sha256sum "$index_listing" | cut -d ' ' -f 1)"

while IFS= read -r -d '' entry; do
  metadata="${entry%%$'\t'*}"
  path="${entry#*$'\t'}"
  read -r mode object_id stage <<<"$metadata"

  if [[ "$stage" != "0" ]]; then
    echo "The Git index contains an unmerged entry: $path (stage $stage)." >&2
    exit 1
  fi
  case "$path" in
    ""|/*|..|../*|*/../*)
      echo "The Git index contains an unsafe path: $path" >&2
      exit 1
      ;;
  esac

  target="$destination/$path"
  mkdir -p -- "$(dirname "$target")"
  case "$mode" in
    100644|100755)
      git cat-file blob "$object_id" >"$target"
      if [[ "$mode" == "100755" ]]; then
        chmod 755 "$target"
      else
        chmod 644 "$target"
      fi
      ;;
    120000)
      link_target=""
      IFS= read -r -d '' link_target < <(git cat-file blob "$object_id"; printf '\0') || true
      ln -s -- "$link_target" "$target"
      ;;
    160000)
      mkdir -p -- "$target"
      ;;
    *)
      echo "The Git index contains an unsupported mode $mode for $path." >&2
      exit 1
      ;;
  esac
done <"$index_listing"

printf '%s\n' "$index_fingerprint"
