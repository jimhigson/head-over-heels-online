#!/usr/bin/env bash
#
# revert-noop-pngs.sh
#
# Provides revert_noop_images() — a function that scans for image
# files with unstaged changes, compares them pixel-for-pixel against the
# version in the index (staging area), and reverts any that are visually
# identical — removing noop changes that bloat the repo.
#
# If a file has a staged version, it compares worktree vs index.
# If a file has no staged changes, it compares worktree vs HEAD.
# New files (not in HEAD or index) are skipped.
#
# Requires: git, ImageMagick 7+ (magick CLI)
#
# Usage:
#   source revert-noop-pngs.sh
#   revert_noop_images [paths...]
#
# Examples:
#   revert_noop_images                              # scan current directory
#   revert_noop_images assets/sprites               # single directory
#   revert_noop_images foo.png bar.webp             # specific files
#   revert_noop_images foo.png bar.webp dirOfImages # mix of both

revert_noop_pngs() { revert_noop_images "$@"; }

revert_noop_images() {
    local targets=("$@")
    if [[ ${#targets[@]} -eq 0 ]]; then
        targets=(".")
    fi

    local reverted=0
    local skipped=0
    local changed=0
    local errors=0

    # Ensure we're inside a git repo
    if ! git rev-parse --show-toplevel &>/dev/null; then
        echo "Error: not inside a git repository." >&2
        return 1
    fi

    local repo_root
    repo_root="$(git rev-parse --show-toplevel)"

    # Validate all targets exist
    local t
    for t in "${targets[@]}"; do
        if [[ ! -e "$t" ]]; then
            echo "Error: '${t}' does not exist." >&2
            return 1
        fi
    done

    # Collect image files with unstaged modifications (worktree differs from index)
    local dirty_images=()
    while IFS= read -r line; do
        dirty_images+=("$line")
    done < <(git diff --name-only -- "${targets[@]}" 2>/dev/null | grep -iE '\.(png|webp)$' || true)

    if [[ ${#dirty_images[@]} -eq 0 ]]; then
        echo "No unstaged image changes found."
        return 0
    fi

    echo "Found ${#dirty_images[@]} image file(s) with unstaged changes. Comparing pixels..."
    echo

    local tmpdir
    tmpdir="$(mktemp -d /tmp/noop-png-XXXXXX)"

    local relpath filepath baseline_img baseline_label ae_count ae_int
    for relpath in "${dirty_images[@]}"; do
        filepath="${repo_root}/${relpath}"

        # Skip if the working copy file doesn't exist (deleted in worktree)
        if [[ ! -f "$filepath" ]]; then
            ((skipped++)) || true
            continue
        fi

        # Determine the baseline: index first, then HEAD
        # git show :<path> retrieves the version from the index (staging area)
        baseline_img="${tmpdir}/baseline.png"

        if git show ":${relpath}" > "$baseline_img" 2>/dev/null; then
            baseline_label="index"
        elif git show "HEAD:${relpath}" > "$baseline_img" 2>/dev/null; then
            baseline_label="HEAD"
        else
            echo "  SKIP (new file): ${relpath}"
            ((skipped++)) || true
            continue
        fi

        # Pixel-for-pixel comparison using ImageMagick 7.
        # `magick compare -metric AE` outputs the number of differing pixels.
        ae_count=$(magick compare -metric AE "$baseline_img" "$filepath" null: 2>&1) || true
        # ImageMagick may output "0 (0)" (raw count + normalised); keep only the first token
        ae_count="${ae_count%% *}"

        # Handle comparison failures (e.g. different dimensions)
        if ! [[ "$ae_count" =~ ^[0-9]+([.][0-9]+)?$ ]]; then
            echo "  ERROR comparing: ${relpath} (${ae_count})"
            ((errors++)) || true
            continue
        fi

        # Truncate any decimal (AE can return "0" or "0.0")
        ae_int="${ae_count%%.*}"

        if [[ "$ae_int" -eq 0 ]]; then
            echo "  REVERT vs ${baseline_label} (pixels identical): ${relpath}"
            # Restore the index version to the worktree (preserves staging)
            git -C "$repo_root" checkout -- "$relpath"
            ((reverted++)) || true
        else
            echo "  KEEP   (${ae_int} pixels differ): ${relpath}"
            ((changed++)) || true
        fi
    done

    rm -rf "$tmpdir"

    echo
    echo "Done. Reverted: ${reverted} | Kept: ${changed} | Skipped: ${skipped} | Errors: ${errors}"
}

# Allow direct execution as well as sourcing
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    set -euo pipefail
    revert_noop_images "$@"
fi