#!/bin/sh
# Lint-fixes a single file's staged content for git-format-staged, and fails
# (blocking the commit) if any lint error can not be auto-fixed.
#
# git-format-staged feeds the staged file content on stdin and substitutes the
# file path for {}, expecting the transformed content back on stdout. oxlint has
# no stdin mode, so we round-trip through a temp file, fix it in place, and print
# the result. The temp file lives at the repo root (not under the original path),
# which is deliberate: it bypasses oxlint's `ignorePatterns` (eg `src/_generated`)
# so generated files get linted too, while keeping the original basename so
# file-extension-based rules still apply.
#
# oxlint only applies non-overlapping fixes per run, so some fixes (eg nested
# sort-union-types) need several passes - loop --fix until the file stops
# changing. Anything still failing after that is a real lint error and fails.
set -eu

dir=".oxlint-fix-tmp.$$"
mkdir -p "$dir"
tmp="$dir/$(basename "$1")"
trap 'rm -rf "$dir"' EXIT

cat >"$tmp"

# apply auto-fixes repeatedly until the file stops changing (a fixpoint)
i=0
while [ "$i" -lt 10 ]; do
  before=$(cksum <"$tmp")
  oxlint --fix "$tmp" >/dev/null 2>&1 || true
  [ "$(cksum <"$tmp")" = "$before" ] && break
  i=$((i + 1))
done

# any lint that could not be auto-fixed fails the hook (and so the commit)
if ! oxlint "$tmp" 1>&2; then
  echo "oxlintFixStdin: $1 has lint errors that could not be auto-fixed" >&2
  exit 1
fi

cat "$tmp"
