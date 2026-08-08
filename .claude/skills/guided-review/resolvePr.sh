#!/usr/bin/env bash
# Resolve a pull request to refs this machine can diff, whichever repo it is in.
#
#   resolvePr.sh 34
#   resolvePr.sh my-branch
#   resolvePr.sh https://github.com/owner/repo/pull/34
#
# Prints json: { number, title, url, base, head } where base/head are local refs
# ready for `changedFiles.sh pr <base> <head>` and `build.py --base/--head`.
# The head is fetched from refs/pull/<n>/head, so PRs from forks work the same
# as PRs from branches on the origin.
set -euo pipefail

target="${1:?usage: resolvePr.sh <number|branch|url>}"

pr=$(gh pr view "$target" --json number,title,url,baseRefName,headRefName)
number=$(printf '%s' "$pr" | python3 -c 'import json,sys; print(json.load(sys.stdin)["number"])')
base_ref=$(printf '%s' "$pr" | python3 -c 'import json,sys; print(json.load(sys.stdin)["baseRefName"])')

head="refs/review/pr${number}"
git fetch --quiet origin "${base_ref}:refs/remotes/origin/${base_ref}" 2>/dev/null ||
  git fetch --quiet origin "${base_ref}"
git fetch --quiet --force origin "refs/pull/${number}/head:${head}"

printf '%s' "$pr" | python3 -c '
import json, sys
pr = json.load(sys.stdin)
pr["base"] = "origin/" + pr["baseRefName"]
pr["head"] = "refs/review/pr" + str(pr["number"])
print(json.dumps(pr, indent=2))
'
