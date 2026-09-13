#!/usr/bin/env bash
# Pre-seed large blobs onto the remote as lightweight tags, in small batches,
# so a subsequent `git push` of the real branch is small enough to survive
# restricted/throttled wifi. See SKILL.md in this directory for background.
#
# Usage:
#   push-blobs.sh <base-ref>
#
# <base-ref> is the last-known-good remote commit for the branch being
# pushed (e.g. the output of `git ls-remote origin <branch>`, or
# `origin/main` for a brand new branch). Objects reachable from <base-ref>
# are assumed already present on the remote and are skipped.
#
# Tunable via env:
#   TAG_PREFIX   tag namespace to seed into      (default: seed)
#   PATTERN      regex on path selecting blobs   (default: common binary/asset extensions)
#   THRESHOLD    only blobs bigger than this (bytes) are worth seeding (default: 8192)
#   BATCH_LIMIT  raw bytes per push batch          (default: 65000)
#   WORKERS      concurrent push lanes             (default: 1 — see SKILL.md before raising this)
#   RETRIES      attempts per batch before giving up (default: 5)
set -u

baseRef=${1:?"usage: push-blobs.sh <base-ref>  (last-known-good remote commit)"}
tagPrefix=${TAG_PREFIX:-seed}
pattern=${PATTERN:-'\.(png|jpe?g|gif|webp|avif|bmp|ico|zip|woff2?|ttf|otf|eot|mp3|mp4|webm|wasm)$'}
threshold=${THRESHOLD:-8192}
batchLimit=${BATCH_LIMIT:-65000}
workers=${WORKERS:-1}
retries=${RETRIES:-5}

scratch=$(mktemp -d)
trap 'rm -rf "$scratch"' EXIT

echo "checking already-seeded $tagPrefix-* tags on remote..."
git ls-remote origin "refs/tags/$tagPrefix-*" | awk '{print $1}' | sort -u > "$scratch/done_shas.txt"
alreadyDone=$(wc -l < "$scratch/done_shas.txt" | tr -d ' ')
highestExisting=$(git ls-remote origin "refs/tags/$tagPrefix-*" | sed -E "s#.*refs/tags/$tagPrefix-##" | sort -n | tail -1)

echo "listing blobs over ${threshold}B matching /$pattern/ not reachable from $baseRef..."
git rev-list --objects "$baseRef..HEAD" |
  git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' |
  awk -v t="$threshold" '$1=="blob" && $3>t {print $2" "$3" "$4}' > "$scratch/blobs.txt"

batchFile="$scratch/batches.txt"
: > "$batchFile"
batch=()
bytes=0
tagNum=$(( ${highestExisting:--1} + 1 ))
while read -r sha size path; do
  [[ "$path" =~ $pattern ]] || continue
  grep -qx "$sha" "$scratch/done_shas.txt" && continue
  if [ "$bytes" -gt 0 ] && [ $((bytes + size)) -gt "$batchLimit" ]; then
    echo "${batch[*]}" >> "$batchFile"
    batch=()
    bytes=0
  fi
  batch+=("$sha:refs/tags/$tagPrefix-$tagNum")
  tagNum=$((tagNum + 1))
  bytes=$((bytes + size))
done < "$scratch/blobs.txt"
[ ${#batch[@]} -gt 0 ] && echo "${batch[*]}" >> "$batchFile"

pendingTotal=$(wc -l < "$batchFile" | tr -d ' ')
overallTotal=$((alreadyDone + pendingTotal))
echo "$alreadyDone batches already seeded, $pendingTotal pending, $overallTotal total (workers: $workers)"

if [ "$pendingTotal" -eq 0 ]; then
  echo "nothing to seed — proceed straight to the real push"
  exit 0
fi

pushOneBatch() {
  local refs="$1"
  local attempt=0
  local out
  until out=$(git push origin $refs 2>&1); do
    attempt=$((attempt + 1))
    if [ "$attempt" -ge "$retries" ]; then
      echo "BATCH FAILED after $attempt attempts: $refs"
      echo "$out" | sed 's/^/  /'
      return 1
    fi
    echo "retry $attempt: $refs"
    sleep 2
  done
  echo "done: $refs"
}
export -f pushOneBatch
export retries

doneCount=0
if [ "$workers" -eq 1 ]; then
  failed=0
  while IFS= read -r refs; do
    if pushOneBatch "$refs"; then
      doneCount=$((doneCount + 1))
      cum=$((alreadyDone + doneCount))
      echo "progress: $((cum * 100 / overallTotal))% (${cum}/${overallTotal} batches overall)"
    else
      failed=1
    fi
  done < "$batchFile"
  [ "$failed" -eq 1 ] && exit 2
else
  tr '\n' '\0' < "$batchFile" | xargs -0 -P "$workers" -I{} bash -c 'pushOneBatch "$@"' _ {}
fi

echo "ALL BATCHES ATTEMPTED — now run the real: git push --force-with-lease"
echo "then clean up with: TAG_PREFIX=$tagPrefix ./cleanup-seed-tags.sh"
