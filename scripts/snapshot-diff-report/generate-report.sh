#!/usr/bin/env bash
# Builds a mobile-first, edge-to-edge A/B/diff/swipe viewer over every
# Playwright screenshot baseline (.png) that is modified in the working
# tree relative to HEAD, under the given snapshot-directory glob. Writes two
# outputs: a standalone HTML page and a wrapper-free fragment suitable for
# embedding as a claude.ai artifact.
#
# Usage:
#   generate-report.sh [snapshot-dir-glob] [max-rows] [base-ref]
#
# snapshot-dir-glob defaults to "e2e/*-snapshots" and is expanded as a bash
# glob relative to the repo root (each match is one Playwright
# "<spec>.ts-snapshots" directory).
#
# max-rows caps how many modified images are embedded (every project's rows
# are kept in full before the next project is touched, in alphabetical
# project order; whatever doesn't fit is dropped). 0 means unlimited - every
# modified row is included. Defaults to the SNAPSHOT_DIFF_MAX_ROWS env var,
# or 100 if that's unset too.
#
# base-ref is what "modified" is measured against (and the default A side of
# every comparison). HEAD (the default) reviews uncommitted regenerated
# baselines; origin/main reviews a branch whose baselines are already
# committed.
#
# Each row can carry up to four versions of the file (release / main / head
# / regen); see makeDiff.mjs for how those are resolved and deduped.
#
# Output is always written to repo root
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

echo "$modified_files" | node "$script_dir/makeDiff.mjs" \
  --standalone-out "$standalone_out" \
  --artifact-out "$artifact_out" \
  --max-rows "$max_rows" \
  --base-ref "$base_ref" \
  "${convert_cmd_args[@]}"

echo "$standalone_out"
echo "$artifact_out"

open $standalone_out
