#!/usr/bin/env bash
# List the files in a review's scope as `STATUS<TAB>PATH`, binaries excluded -
# except raster images (png/jpg/gif/webp/avif), which build.ts can diff
# visually and so stay in the list.
#
#   changedFiles.sh worktree
#   changedFiles.sh commit <sha>
#   changedFiles.sh pr <base-ref> <head-ref>      # eg origin/main origin/my-branch
#
# STATUS is git's own: A (added/untracked) M D R###. Feed the output straight
# into the groups json you author for build.ts.
set -euo pipefail

mode="${1:?usage: changedFiles.sh worktree|commit <sha>|pr <base> <head>}"

binary_extensions='\.(ico|icns|woff2?|ttf|otf|eot|mp3|opus|ogg|wav|m4a|mp4|webm|mov|pdf|zip|gz|br|bin|wasm)$'

case "$mode" in
  worktree)
    # porcelain: XY<space>path; ?? is untracked, which reads as an addition
    git status --porcelain |
      sed -E 's/^\?\?/A /' |
      # a file can be both staged and modified (eg "MM", "AM"); the reading
      # order only cares which kind of change it is, so keep the first letter
      awk '{ status = substr($0, 1, 2); path = substr($0, 4); gsub(/ /, "", status); print substr(status, 1, 1) "\t" path }'
    ;;
  commit)
    sha="${2:?commit mode needs a sha}"
    git show "$sha" --name-status --format=""
    ;;
  pr)
    base="${2:?pr mode needs a base ref}"
    head="${3:?pr mode needs a head ref}"
    # three-dot: diff against the merge base, matching github's own view
    git diff --name-status "$base...$head"
    ;;
  *)
    echo "unknown mode: $mode" >&2
    exit 64
    ;;
esac | grep -Ev "$binary_extensions" || true
