#!/usr/bin/env bash
# Losslessly shrink PNGs before committing/pushing them, so a push over
# degraded wifi has less to send in the first place. Pure re-encode: strips
# ancillary chunks and re-runs DEFLATE at max effort, touching zero pixels.
# Verified: game/e2e screenshot PNGs (low colour-count pixel art) shrink by
# 55-75% this way. See SKILL.md "Shrinking PNGs before pushing".
#
# Usage: recompress-pngs.sh <file.png> [file2.png ...]
#
# Each file is verified pixel-identical (ImageMagick AE=0) before being
# overwritten; on any mismatch the original is left untouched and the file
# is reported as skipped. Only touches files given on the command line — it
# is your responsibility to only pass files that are safe to modify (not
# yet committed, or you intend to commit the recompressed result).
set -u

if [ "$#" -eq 0 ]; then
  echo "usage: recompress-pngs.sh <file.png> [file2.png ...]" >&2
  exit 1
fi

scratch=$(mktemp -d)
trap 'rm -rf "$scratch"' EXIT

totalBefore=0
totalAfter=0
for f in "$@"; do
  if [ ! -f "$f" ]; then
    echo "skip (not found): $f"
    continue
  fi
  before=$(wc -c < "$f")
  tmp="$scratch/$(basename "$f")"
  magick "$f" -strip -define png:compression-level=9 \
    -define png:compression-filter=5 -define png:compression-strategy=1 "$tmp"

  ae=$(magick compare -metric AE "$f" "$tmp" null: 2>&1 | awk '{print $1}')
  if [ "$ae" != "0" ]; then
    echo "skip (pixel mismatch, AE=$ae): $f"
    continue
  fi

  after=$(wc -c < "$tmp")
  if [ "$after" -ge "$before" ]; then
    echo "skip (no smaller): $f"
    continue
  fi

  cp "$tmp" "$f"
  totalBefore=$((totalBefore + before))
  totalAfter=$((totalAfter + after))
  pct=$(( (before - after) * 100 / before ))
  echo "$f: $before -> $after (-${pct}%)"
done

if [ "$totalBefore" -gt 0 ]; then
  pct=$(( (totalBefore - totalAfter) * 100 / totalBefore ))
  echo "total: $totalBefore -> $totalAfter (-${pct}%)"
fi
