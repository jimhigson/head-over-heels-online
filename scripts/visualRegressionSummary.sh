#!/bin/bash

# Compare visual regression screenshots between two git revisions
# Usage: ./visualRegressionSummary.sh [EARLIER] [LATER] [LIMIT]
#   EARLIER: Earlier revision to compare (default: HEAD)
#   LATER: Later revision to compare (default: . = working copy)
#   LIMIT: Max results to show (default: 200)
#
# Examples:
#   ./visualRegressionSummary.sh                    # HEAD vs working copy
#   ./visualRegressionSummary.sh HEAD .             # (also) HEAD vs working copy
#   ./visualRegressionSummary.sh HEAD~1             # HEAD~1 vs working copy
#   ./visualRegressionSummary.sh HEAD~1 .           # (also) HEAD~1 vs working copy
#   ./visualRegressionSummary.sh HEAD~1 HEAD        # HEAD~1 vs HEAD
#   ./visualRegressionSummary.sh HEAD~2 HEAD~1      # HEAD~2 vs HEAD~1
#   ./visualRegressionSummary.sh main feature-branch   # branch names
#   ./visualRegressionSummary.sh v1.0.0 v2.0.0         # tags
#   ./visualRegressionSummary.sh abc123 def456         # commit SHAs

set -e

EARLIER=${1:-HEAD}
LATER=${2:-.}
LIMIT=${3:-200}
PARALLELISM=${4:-16}

# Check for ImageMagick
if ! command -v magick &> /dev/null; then
    echo "Error: ImageMagick is required but not installed."
    exit 1
fi

# Get list of changed PNG files between the two revisions
# Note: git diff doesn't understand "." - we use it to mean working copy
if [ "$EARLIER" = "." ] && [ "$LATER" = "." ]; then
    echo "Error: Both revisions are working copy - nothing to compare" >&2
    exit 1
elif [ "$EARLIER" = "." ]; then
    echo "Error: EARLIER cannot be working copy (.) - did you mean to swap the arguments?" >&2
    echo "Usage: $0 [EARLIER] [LATER]  (LATER defaults to working copy)" >&2
    exit 1
elif [ "$LATER" = "." ]; then
    # A revision vs working copy
    changed_files=$(git diff --name-only "$EARLIER" -- 'screenshotTests/**/*.png' 2>/dev/null)
    display_earlier="$EARLIER"
    display_later="working copy"
else
    # Two revisions
    changed_files=$(git diff --name-only "$EARLIER" "$LATER" -- 'screenshotTests/**/*.png' 2>/dev/null)
    display_earlier="$EARLIER"
    display_later="$LATER"
fi

if [ -z "$changed_files" ]; then
    echo "No screenshot changes detected between $EARLIER and $display_later"
    exit 0
fi

# Temporary file for results
tmp_results=$(mktemp)
tmp_dir=$(mktemp -d)
trap "rm -f $tmp_results; rm -rf $tmp_dir" EXIT

total_count=$(echo "$changed_files" | wc -l | tr -d ' ')

echo "Comparing $EARLIER vs $display_later" >&2
echo "Analysing $total_count screenshots ($PARALLELISM parallel)..." >&2

# Export function and variables for parallel execution
export EARLIER LATER

# Function to process a single file
process_file() {
    local file="$1"
    local tmp_dir="$2"
    local earlier="$3"
    local later="$4"
    local tmp_v1="$tmp_dir/v1_$$.png"
    local tmp_v2="$tmp_dir/v2_$$.png"

    # Get file from EARLIER
    if [ "$earlier" = "." ]; then
        if [ -f "$file" ]; then
            cp "$file" "$tmp_v1"
        else
            return
        fi
    else
        if ! git show "$earlier:$file" > "$tmp_v1" 2>/dev/null; then
            return
        fi
    fi

    # Get file from LATER
    if [ "$later" = "." ]; then
        if [ -f "$file" ]; then
            cp "$file" "$tmp_v2"
        else
            rm -f "$tmp_v1"
            return
        fi
    else
        if ! git show "$later:$file" > "$tmp_v2" 2>/dev/null; then
            rm -f "$tmp_v1"
            return
        fi
    fi

    # Get dimensions from first file
    local dims=$(magick identify -format "%w %h" "$tmp_v1" 2>/dev/null)
    local width=$(echo $dims | cut -d" " -f1)
    local height=$(echo $dims | cut -d" " -f2)
    local total_pixels=$((width * height))

    # Get diff count
    local diff_count=$(magick compare -metric AE "$tmp_v1" "$tmp_v2" /dev/null 2>&1 | grep -oE '^[0-9]+' | head -1)

    if [ "$total_pixels" -gt 0 ] && [ -n "$diff_count" ]; then
        local pct=$(awk -v diff="$diff_count" -v total="$total_pixels" 'BEGIN {printf "%.4f", (diff / total) * 100}')
        local filename=$(basename "$file" .png)
        local browser=$(basename "$(dirname "$file")")
        local shortname="$filename ($browser)"
        echo "$pct $diff_count $total_pixels ${width}x${height} $shortname"
    fi

    rm -f "$tmp_v1" "$tmp_v2"
    echo -n "." >&2
}
export -f process_file

# Process files in parallel
echo "$changed_files" | xargs -P "$PARALLELISM" -I {} bash -c 'process_file "$@"' _ {} "$tmp_dir" "$EARLIER" "$LATER" \
    | sort -t' ' -k1 -rn | head -$LIMIT > "$tmp_results"

echo "" >&2  # newline after dots
echo "Done." >&2

# Count total files
total_files=$(wc -l < "$tmp_results" | tr -d ' ')
echo "Found $total_files changed screenshots (showing top $LIMIT by %)" >&2
echo "" >&2

# Build JSON array, collating by percentage
tmp_json=$(mktemp)
echo "[" > "$tmp_json"

current_pct=""
current_pixels=""
current_size=""
current_files=""
first_row=true

while read pct pixels total size filename; do
    if [ "$pct" = "$current_pct" ] && [ "$pixels" = "$current_pixels" ]; then
        # Same percentage and pixel count - append to current row
        current_files="$current_files,\"$filename\""
    else
        # Different percentage - output previous row (if exists) and start new one
        if [ -n "$current_pct" ]; then
            if [ "$first_row" = true ]; then
                first_row=false
            else
                echo "," >> "$tmp_json"
            fi
            printf '{"pct":"%s%%","pixels":%s,"size":"%s","files":[%s]}' \
                "$current_pct" "$current_pixels" "$current_size" "$current_files" >> "$tmp_json"
        fi
        current_pct="$pct"
        current_pixels="$pixels"
        current_size="$size"
        current_files="\"$filename\""
    fi
done < "$tmp_results"

# Output final row
if [ -n "$current_pct" ]; then
    if [ "$first_row" = false ]; then
        echo "," >> "$tmp_json"
    fi
    printf '{"pct":"%s%%","pixels":%s,"size":"%s","files":[%s]}' \
        "$current_pct" "$current_pixels" "$current_size" "$current_files" >> "$tmp_json"
fi

echo "" >> "$tmp_json"
echo "]" >> "$tmp_json"

# Use Node.js console.table to display
node -e "
const data = $(cat "$tmp_json");
const formatted = data.map(r => ({
    '%': r.pct,
    'changed': r.pixels >= 1000000 ? (r.pixels/1000000).toFixed(1)+'M'
             : r.pixels >= 1000 ? (r.pixels/1000).toFixed(1)+'k'
             : r.pixels,
    'size': r.size,
    'files': r.files
}));
console.table(formatted);
"

rm -f "$tmp_json"
