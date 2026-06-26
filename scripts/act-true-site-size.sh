#!/usr/bin/env bash
#
# Run the .github/workflows/true-site-size.yml workflow locally with `act`,
# comparing the current checkout against origin/main - and works from a git
# worktree, not just the main clone. Prints just the rendered size-report
# comment; the full act log path is printed at the end.
#
# Usage:
#   scripts/act-true-site-size.sh            # measures the game target
#   scripts/act-true-site-size.sh editor     # measures the editor target
#
# Why the extra flags vs a plain `act`:
#  --container-architecture linux/amd64  most action images are amd64; needed on
#                                        Apple Silicon
#  -P ubuntu-latest=...act-latest        a runner image act can pull (the Chrome
#                                        install step in the workflow adds the
#                                        browser the journey needs)
#  -s GITHUB_TOKEN=...                   so act can fetch the jimhigson/true-site-size
#                                        action and the public origin/main base
#  --env TRUE_SITE_SIZE_OUTPUT_FILE=...  asks the action to also write the comment
#                                        markdown to that path, so we can render it
#                                        here (it's a container path under a dir we
#                                        bind-mount below, so it lands on the host)
#  --container-options -v <gitdir>:...   a worktree's `.git` is a *file* pointing
#                                        at the shared gitdir; without mounting that
#                                        dir into the container, git inside it fails
#                                        ("not a git repository") and the
#                                        base-vs-main diff can't run. The second -v
#                                        mounts the dir the comment file is written to.
#  -e <event>                            a pull_request event whose base is main,
#                                        so the action compares against origin/main
#
# Note: act caches the action under ~/.cache/act; if jimhigson/true-site-size is
# updated, clear that cache to pick up the new version.
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

# the shared .git for this checkout (resolves to the real dir even from a worktree)
gitdir="$(git rev-parse --path-format=absolute --git-common-dir)"

# a pull_request event so the action's compareRef is origin/main, and a dir the
# action writes the comment markdown into (bind-mounted so it lands on the host)
# (explicit XXXXXX templates work on both macOS/BSD and Linux/GNU mktemp; the
# `-t prefix` shorthand is interpreted differently between the two)
tmp="${TMPDIR:-/tmp}"
event="$(mktemp "${tmp}/true-site-size-event.XXXXXX").json"
outdir="$(mktemp -d "${tmp}/true-site-size-out.XXXXXX")"
trap 'rm -f "$event"; rm -rf "$outdir"' EXIT
printf '{"pull_request":{"base":{"ref":"main"}}}' >"$event"
comment="${outdir}/comment.md"

target="${1:-game}"

# act is very chatty (docker setup, install, build, per-request breakdown), so
# capture it all to a log and only surface the rendered comment on success.
log="$(mktemp "${tmp}/true-site-size.XXXXXX").log"

echo "running act for target ${target} (full log: $log) - this may take a while..." >&2

if ! act pull_request \
  -W .github/workflows/true-site-size.yml \
  --container-architecture linux/amd64 \
  -P ubuntu-latest=catthehacker/ubuntu:act-latest \
  -s GITHUB_TOKEN="$(gh auth token)" \
  --env "TRUE_SITE_SIZE_OUTPUT_FILE=${comment}" \
  --matrix "target:${target}" \
  --container-options "-v ${gitdir}:${gitdir} -v ${outdir}:${outdir}" \
  -e "$event" \
  >"$log" 2>&1; then
  echo "act run failed - full log:" >&2
  cat "$log" >&2
  exit 1
fi

if [[ ! -s "$comment" ]]; then
  echo "act finished but wrote no report to ${comment} - full log:" >&2
  cat "$log" >&2
  exit 1
fi

# render the comment markdown (written by the action) for the terminal
node --input-type=module -e '
  import { Marked } from "marked";
  import { markedTerminal } from "marked-terminal";
  let s = ""; for await (const c of process.stdin) s += c;
  process.stdout.write(await new Marked(markedTerminal()).parse(s));
' <"$comment"

echo "(full act log: $log)"
