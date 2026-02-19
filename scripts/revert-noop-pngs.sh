#!/usr/bin/env bash
#
# revert-noop-pngs.sh
#
# Provides revert_noop_pngs() — a function that scans a directory for PNG
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
#   revert_noop_pngs [paths...]
#
# Examples:
#   revert_noop_pngs                              # scan current directory
#   revert_noop_pngs assets/sprites               # single directory
#   revert_noop_pngs foo.png bar.png              # specific files
#   revert_noop_pngs foo.png bar.png dirOfImages  # mix of both

revert_noop_pngs() {
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

    # Validate all targets exist, and that any files are PNGs
    local t
    for t in "${targets[@]}"; do
        if [[ ! -e "$t" ]]; then
            echo "Error: '${t}' does not exist." >&2
            return 1
        fi
        if [[ -f "$t" ]] && ! echo "$t" | grep -qi '\.png$'; then
            echo "Error: '${t}' is not a PNG file." >&2
            return 1
        fi
    done

    # Collect PNGs with unstaged modifications (worktree differs from index)
    # git diff --name-only accepts multiple files and directories
    local dirty_pngs=()
    while IFS= read -r line; do
        dirty_pngs+=("$line")
    done < <(git diff --name-only -- "${targets[@]}" 2>/dev/null | grep -i '\.png$' || true)

    if [[ ${#dirty_pngs[@]} -eq 0 ]]; then
        echo "No unstaged PNG changes found."
        return 0
    fi

    echo "Found ${#dirty_pngs[@]} PNG file(s) with unstaged changes. Comparing pixels..."
    echo

    local tmpdir
    tmpdir="$(mktemp -d /tmp/noop-png-XXXXXX)"

    local relpath filepath baseline_png baseline_label ae_count ae_int
    for relpath in "${dirty_pngs[@]}"; do
        filepath="${repo_root}/${relpath}"

        # Skip if the working copy file doesn't exist (deleted in worktree)
        if [[ ! -f "$filepath" ]]; then
            ((skipped++)) || true
            continue
        fi

        # Determine the baseline: index first, then HEAD
        # git show :<path> retrieves the version from the index (staging area)
        baseline_png="${tmpdir}/baseline.png"

        if git show ":${relpath}" > "$baseline_png" 2>/dev/null; then
            baseline_label="index"
        elif git show "HEAD:${relpath}" > "$baseline_png" 2>/dev/null; then
            baseline_label="HEAD"
        else
            echo "  SKIP (new file): ${relpath}"
            ((skipped++)) || true
            continue
        fi

        # Pixel-for-pixel comparison using ImageMagick 7.
        # `magick compare -metric AE` outputs the number of differing pixels.
        ae_count=$(magick compare -metric AE "$baseline_png" "$filepath" null: 2>&1) || true
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
    revert_noop_pngs "$@"
fi