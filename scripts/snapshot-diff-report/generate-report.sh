#!/usr/bin/env bash

####################################################################################
# Builds an interface for reviewing diffs between e2e snapshots, as a single html
# page, all images embedded
####################################################################################

set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(git rev-parse --show-toplevel)"
cd "$repo_root"

glob="${1:-e2e/*-snapshots}"
max_rows="${2:-${SNAPSHOT_DIFF_MAX_ROWS:-100}}"
base_ref="${3:-HEAD}"

shopt -s nullglob
dirs=($glob)
shopt -u nullglob

if [ ${#dirs[@]} -eq 0 ]; then
  echo "no snapshot directories match glob: $glob" >&2
  exit 1
fi

modified_files="$(git diff --name-only --diff-filter=M "$base_ref" -- "${dirs[@]}" | grep '\.png$' || true)"

if [ -z "$modified_files" ]; then
  echo "no .png baselines modified vs $base_ref under: ${dirs[*]}" >&2
  exit 1
fi

# The raw-pixel decode (PNG -> RGBA) needed to precompute the head-vs-regen
# differing-pixel count runs in-process via the "sharp" devDependency - no
# child process, no per-file spawn. An ImageMagick binary is only passed
# through as a fallback for if sharp fails to import; its absence here is
# not fatal.
convert_cmd=""
if command -v magick >/dev/null 2>&1; then
  convert_cmd="magick"
elif command -v convert >/dev/null 2>&1; then
  convert_cmd="convert"
fi

standalone_out="$repo_root/snapshot-diff-report.html"
artifact_out="$repo_root/snapshot-diff-viewer-artifact.html"

convert_cmd_args=()
if [ -n "$convert_cmd" ]; then
  convert_cmd_args=(--convert-cmd "$convert_cmd")
fi

echo "$modified_files" | pnpm exec tsx "$script_dir/makeDiff.ts" \
  --standalone-out "$standalone_out" \
  --artifact-out "$artifact_out" \
  --max-rows "$max_rows" \
  --base-ref "$base_ref" \
  "${convert_cmd_args[@]}"

echo "$standalone_out"
echo "$artifact_out"

open $standalone_out
