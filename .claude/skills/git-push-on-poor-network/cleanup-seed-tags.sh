#!/usr/bin/env bash
# Delete all seed tags from the remote after the real push has landed
# (the blobs they held stay reachable via the branch, so this is safe).
# Usage: TAG_PREFIX=seed ./cleanup-seed-tags.sh
set -u
tagPrefix=${TAG_PREFIX:-seed}

refs=$(git ls-remote origin "refs/tags/$tagPrefix-*" | awk '{print $2}')
if [ -z "$refs" ]; then
  echo "no $tagPrefix-* tags on remote"
  exit 0
fi

deleteRefs=()
for ref in $refs; do
  deleteRefs+=(":$ref")
done
echo "deleting ${#deleteRefs[@]} tags matching $tagPrefix-*..."
git push origin "${deleteRefs[@]}"
