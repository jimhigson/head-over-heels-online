---
name: snapshot-diff-report
description: Build an interactive HTML viewer over Playwright screenshot baselines modified vs a base ref (HEAD or origin/main), for visual review incl. on a phone
---

# Snapshot diff report

Builds a single-page, mobile-first viewer app over every modified `.png`
baseline, so screenshot changes can be reviewed visually (including on a
phone) without opening PNGs individually. Run it after regenerating
baselines (`--update-snapshots`) (if there are changes), or offer to any time the user
is concerned with diffs in snapshtos

## Run it

```
bash .claude/skills/snapshot-diff-report/generate-report.sh [snapshot-dir-glob] [max-rows] [base-ref]
```

The two common invocations:

```
# uncommitted regenerated baselines, vs HEAD:
bash .claude/skills/snapshot-diff-report/generate-report.sh

# everything a branch changed, vs origin/main, no row cap:
bash .claude/skills/snapshot-diff-report/generate-report.sh 'e2e/*-snapshots' 0 origin/main
```

| argument | default | meaning |
| --- | --- | --- |
| snapshot-dir-glob | `e2e/*-snapshots` | bash glob (repo-root-relative) of Playwright `*-snapshots` dirs to consider; narrow it to scope to one spec |
| max-rows | 100 (or `SNAPSHOT_DIFF_MAX_ROWS`) | cap on embedded images; `0` = unlimited. Whole projects (alphabetical) are kept before the next is touched; the omitted count appears in the row picker's `title` tooltip and the console output only |
| base-ref | `HEAD` | what "modified" is measured against, and the default **A** side of every comparison. Use `origin/main` to review committed branch work |

The script prints both output paths on success. It fails loudly (exit 1)
when the glob matches nothing or nothing is modified vs the base.

## What generation does

- Lists `.png`s **modified** (not added/untracked) vs `base-ref` under the
  matched dirs.
- Per row, resolves up to four versions via `git show`: **release** (latest
  tag by `git tag --sort=-v:refname`), **main** (local `origin/main` ref,
  never fetched), **head**, **regen** (working tree). Versions absent at a
  ref are skipped; byte-identical versions are deduped (one embedded blob,
  collapsed label like `head (= main)`).
- Precomputes the exact base-vs-regen differing-pixel count per row (raw
  RGBA decode + byte comparison over the union extent; out-of-bounds pixels
  count as differing) — this drives the `px diff` sort. All other pair
  diffs are computed on demand in the browser with the identical algorithm,
  so precomputed and on-demand counts always agree.
- Decodes via `sharp` in-process (repo devDependency; no per-file process
  spawn). An ImageMagick binary found on `PATH` is the fallback only if
  `sharp` fails to import.
- Everything is inlined (base64 data URIs) — both outputs are fully
  self-contained single files.
- The output is structured for memory-constrained mobile webviews (iOS
  refuses to evaluate one huge script, which would leave a JS-built UI
  blank): the row dropdown, the first row's version selects and its image
  are **static markup**; image data sits in one inert
  `<script type="application/json">` block per row, parsed lazily when that
  row is first shown; the executable script is only viewer logic plus a
  small metadata array.

## Locations
- the script is in `scripts/snapshot-diff-report/generate-report.sh` (from repo root)

## The viewer

- One image at a time, edge-to-edge, full viewport width,
  `image-rendering: pixelated`. The toolbar is a floating panel, draggable
  by its grip handle (so it can be moved clear of a host app's own bars);
  it never moves or scales with zoom. The page itself never scrolls or
  zooms — the whole app is one centre-anchored fixed container with frozen
  px dimensions (grow-only; re-frozen on orientation change), so a host
  app's auto-hiding top/bottom bars shift it by only half their height —
  the least movement available to the page — instead of reflowing the
  layout.
- Toolbar: row dropdown (sortable by `name` — grouped by project/scenario —
  or `px diff` — flat, descending, labelled `<name> — <count>px`; switching
  sort preserves the shown row), one **toggle button per named version**
  that exists for the row (release / main / head / regen), mode buttons
  **diff | swipe**, **zoom diff**, overlay-diff checkbox, pixel-count
  readout.
- Version selection: select ONE version to view it; select TWO to compare
  them. Pressing a selected button unselects it; selecting a third replaces
  the earliest-selected. `regen` starts selected.
- With two selected: diff mode renders the on-demand diff (magenta on
  transparent) over a checkerboard; swipe stacks the pair with a draggable
  divider (first-selected on the left; overlay checkbox composites the diff
  on top); zoom diff frames the diff's bounding box plus margin.
- Gestures (Pointer Events, mouse and touch): one finger drags the swipe
  divider (when swipe is showing) or pans; two-finger pinch zooms in every
  mode; double-tap resets. Keyboard: ←/→ step rows, 1–4 toggle the row's
  version buttons in order, d/s switch diff/swipe.

## Output

Both overwritten each run; scratch output, never commit them:

- `(repo root)/snapshot-diff-report.html` — standalone page, open directly in
  a browser.
- `(repo root)/snapshot-diff-viewer-artifact.html` — the same viewer as a
  wrapper-free fragment (no `<!doctype>`/`<html>`/`<head>`/`<body>`/
  `<title>`) for publishing as a claude.ai artifact; its root
  `#diffViewerApp` is `position: fixed; inset: 0` so it fills the screen
  inside any host page.
