#!/bin/sh
# Lint-fixes a single file's staged content for git-format-staged.
#
# git-format-staged feeds the staged file content on stdin and substitutes the
# file path for {}, expecting the transformed content back on stdout. oxlint has
# no stdin mode, so we round-trip through a temp file that keeps the original
# basename (so oxlint applies the same config and overrides), fix it in place,
# and print the result. This keeps lint-fixes scoped to staged content only,
# exactly like the prettier step. Unfixable lint never fails the commit.
set -eu

dir=".oxlint-fix-tmp.$$"
mkdir -p "$dir"
tmp="$dir/$(basename "$1")"
trap 'rm -rf "$dir"' EXIT

cat >"$tmp"
oxlint --fix "$tmp" >/dev/null 2>&1 || true
cat "$tmp"
