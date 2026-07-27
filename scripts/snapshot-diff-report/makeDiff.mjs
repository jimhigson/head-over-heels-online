#!/usr/bin/env node
// Builds a mobile-first, edge-to-edge A/B/diff/swipe viewer over Playwright
// screenshot baselines that are modified in the working tree vs HEAD.
// Produces two outputs: a standalone HTML page and a wrapper-free fragment
// suitable for embedding as a claude.ai artifact.
//
// Invocation (from the repo root; repo-relative file paths, one per line,
// on stdin):
//   node makeDiff.mjs --standalone-out <path> --artifact-out <path>
//                      --max-rows <n> [--convert-cmd "<binary>"]
//                      [--release-ref <tag>] [--main-ref <ref>]
//
// Each row can have up to four versions of the same file: release (latest
// release tag), main (origin/main, local ref only - never fetched), head
// (HEAD), regen (the working tree file, always present - that's what makes
// the row "modified" in the first place). A version is omitted when the
// file doesn't exist at that ref. Byte-identical versions are deduped: each
// distinct blob is embedded once, referenced by every version key that
// matches it.
//
// The generation-time work is: resolve the four versions per row, dedupe
// them into blobs, and precompute the exact head-vs-regen differing-pixel
// count (via raw RGBA decode + exact byte comparison) used to sort rows by
// amount of change. All other diffing - any A/B pair, not just head/regen -
// happens on demand in the browser via canvas, using the same union-extent
// comparison algorithm, so a precomputed and on-demand count for the same
// pair always agree.
//
// Output structure is built for memory-constrained mobile webviews (iOS in
// particular refuses to evaluate a single multi-megabyte script, which
// leaves a JS-driven UI completely blank):
// - the initial UI is fully STATIC markup: the row dropdown's options, the
//   A/B version selects for the first row, and the first row's version-A
//   image are all rendered at generation time, so the page shows real
//   content even before (or without) any script running
// - the heavy image data lives in one small inert
//   <script type="application/json"> block PER ROW, JSON.parsed lazily the
//   first time its row is shown (then cached) - the HTML parser streams
//   these cheaply, and no script evaluation ever touches more than one
//   row's data at a time
// - the executable script is only the viewer logic plus a lightweight
//   per-row metadata array (a few KB total)
//
// Raw RGBA decode uses the in-process `sharp` package (already a repo
// devDependency) - no per-file child-process spawn. --convert-cmd (an
// ImageMagick "magick" or "convert" binary) is an optional fallback, only
// invoked if `sharp` fails to import.
//
// Viewer interaction model:
// - one image on screen at a time, selected via the fixed toolbar's row
//   dropdown (sortable by name or by descending base-vs-regen pixel count),
//   edge-to-edge, filling the viewport width with aspect ratio preserved
// - one toggle button per named version that exists for the row (release /
//   main / head / regen): select ONE to view it, select TWO to compare them;
//   pressing a selected button unselects it, selecting a third replaces the
//   earliest-selected
// - with two selected, the diff/swipe mode buttons choose the comparison,
//   plus an overlay-diff toggle (swipe only) and a zoom-diff button (frames
//   the on-demand diff's bounding box)
// - single-finger drag: moves the swipe divider (swipe showing) or pans the
//   image; two-finger pinch zooms in every mode; double-tap resets zoom/pan
// - the toolbar is a floating panel, draggable by its grip handle, so the
//   user can move it clear of whatever chrome their viewing app overlays;
//   it never moves or scales with the image's in-app zoom
// - the page itself never scrolls or zooms: the whole app is one
//   centre-anchored fixed container with frozen px dimensions, so a host
//   app's auto-hiding top/bottom bars shift it by only half their height
//   instead of reflowing the layout
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const parseArgs = (argv) => {
  const args = new Map();
  for (let i = 0; i < argv.length; i += 2) {
    const flag = argv[i].replace(/^--/, "");
    args.set(flag, argv[i + 1]);
  }
  return args;
};

const startTime = Date.now();

const args = parseArgs(process.argv.slice(2));
const standaloneOutPath = args.get("standalone-out");
const artifactOutPath = args.get("artifact-out");
const maxRows = Number(args.get("max-rows"));
const convertCmd = args.get("convert-cmd")?.split(" ");

if (!standaloneOutPath || !artifactOutPath || !Number.isFinite(maxRows)) {
  throw new Error(
    "usage: makeDiff.mjs --standalone-out <path> --artifact-out <path> --max-rows <n> [--convert-cmd <cmd>] (file list on stdin)",
  );
}

let sharpModule;
try {
  sharpModule = (await import("sharp")).default;
} catch {
  sharpModule = undefined;
}

const stdinText = readFileSync(0, "utf8");
const modifiedFiles = stdinText
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line.length > 0);

if (modifiedFiles.length === 0) {
  throw new Error("no modified .png baselines provided on stdin");
}

const parseSnapshotPath = (
  /**
   * repo-relative path to a screenshot, eg
   * "e2e/cameraRotationSweep.spec.ts-snapshots/chromium-desktop/cycles-100deg.png"
   */
  relPath,
) => {
  const parts = relPath.split("/");
  const fileName = parts.at(-1);
  const project = parts.at(-2);
  const stem = fileName.replace(/\.png$/, "");
  const [scenario] = stem.split("-");
  return { relPath, project, scenario, stem };
};

const allEntries = modifiedFiles.map(parseSnapshotPath).sort((a, b) => a.relPath.localeCompare(b.relPath));

// Cap to maxRows (0 = unlimited): keep every row of the first project
// (alphabetically), then fill the remainder from subsequent projects in
// order, dropping whatever doesn't fit.
let kept;
const omittedByProject = new Map();
if (maxRows === 0) {
  kept = allEntries;
} else {
  const projectOrder = [...new Set(allEntries.map((entry) => entry.project))].sort();
  let remaining = maxRows;
  kept = [];
  for (const project of projectOrder) {
    const projectEntries = allEntries.filter((entry) => entry.project === project);
    const take = projectEntries.slice(0, remaining);
    kept.push(...take);
    remaining -= take.length;
    const omitted = projectEntries.length - take.length;
    if (omitted > 0) {
      omittedByProject.set(project, omitted);
    }
  }
}

const resolveLatestReleaseTag = () => {
  const result = spawnSync("git", ["tag", "--sort=-v:refname"]);
  if (result.status !== 0) return undefined;
  const [firstTag] = result.stdout.toString().split("\n").filter(Boolean);
  return firstTag;
};

const refExistsLocally = (ref) => spawnSync("git", ["rev-parse", "--verify", "--quiet", ref]).status === 0;

const releaseRef = args.get("release-ref") ?? resolveLatestReleaseTag();
const mainRef = args.get("main-ref") ?? (refExistsLocally("origin/main") ? "origin/main" : undefined);
const headRef = "HEAD";
const baseRef = args.get("base-ref") ?? "HEAD";

/** Canonical version priority, oldest-conceptually to most-current; also the client's dedupe/label order. */
const versionOrder = ["release", "main", "head", "regen"];

const revParse = (ref) => {
  if (!ref) return undefined;
  const result = spawnSync("git", ["rev-parse", ref]);
  return result.status === 0 ? result.stdout.toString().trim() : undefined;
};

/**
 * which version key the base ref IS - the default A side of every
 * comparison, and the ref the sortable differing-pixel count is measured
 * from. Matched by commit id so eg a base of "main" or "origin/main" both
 * land on the "main" key; an unrecognised base falls back to "head"
 */
const baseKey = (() => {
  const baseSha = revParse(baseRef);
  if (baseSha !== undefined) {
    if (baseSha === revParse(releaseRef)) return "release";
    if (baseSha === revParse(mainRef)) return "main";
  }
  return "head";
})();

const tryGitShow = (ref, relPath) => {
  if (!ref) return undefined;
  const result = spawnSync("git", ["show", `${ref}:${relPath}`], { maxBuffer: 1024 * 1024 * 64 });
  return result.status === 0 ? result.stdout : undefined;
};

const readPngDimensions = (buffer) => ({
  width: buffer.readUInt32BE(16),
  height: buffer.readUInt32BE(20),
});

/** Decodes a PNG buffer to raw RGBA + its dimensions, via sharp (in-process) or an ImageMagick fallback. */
const decodeRawRgba = async (pngBuffer) => {
  if (sharpModule) {
    const { data, info } = await sharpModule(pngBuffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    return { rgba: data, width: info.width, height: info.height };
  }
  if (!convertCmd) {
    throw new Error("no raw pixel decoder available: sharp failed to import and no --convert-cmd was given");
  }
  const result = spawnSync(convertCmd[0], [...convertCmd.slice(1), "-depth", "8", "-", "rgba:-"], {
    input: pngBuffer,
    maxBuffer: 1024 * 1024 * 64,
  });
  if (result.status !== 0) {
    throw new Error(`imagemagick raw decode failed (exit ${result.status}): ${result.stderr?.toString() ?? ""}`);
  }
  return { rgba: result.stdout, ...readPngDimensions(pngBuffer) };
};

/**
 * Exact differing-pixel count over the union extent of two (possibly
 * differently sized) images; any pixel outside the smaller image's bounds
 * counts as differing. Mirrors the on-demand canvas diff algorithm used in
 * the viewer, so a precomputed and on-demand count for the same pair agree.
 */
const countDiffPixels = (rgbaA, widthA, heightA, rgbaB, widthB, heightB) => {
  const unionWidth = Math.max(widthA, widthB);
  const unionHeight = Math.max(heightA, heightB);
  let count = 0;
  for (let y = 0; y < unionHeight; y++) {
    for (let x = 0; x < unionWidth; x++) {
      const inA = x < widthA && y < heightA;
      const inB = x < widthB && y < heightB;
      let differs = true;
      if (inA && inB) {
        const offsetA = (y * widthA + x) * 4;
        const offsetB = (y * widthB + x) * 4;
        differs =
          rgbaA[offsetA] !== rgbaB[offsetB] ||
          rgbaA[offsetA + 1] !== rgbaB[offsetB + 1] ||
          rgbaA[offsetA + 2] !== rgbaB[offsetB + 2] ||
          rgbaA[offsetA + 3] !== rgbaB[offsetB + 3];
      }
      if (differs) count += 1;
    }
  }
  return count;
};

const toDataUri = (buffer) => `data:image/png;base64,${buffer.toString("base64")}`;

const rows = [];
for (const entry of kept) {
  const buffers = {
    release: tryGitShow(releaseRef, entry.relPath),
    main: tryGitShow(mainRef, entry.relPath),
    head: tryGitShow(headRef, entry.relPath),
    regen: readFileSync(entry.relPath),
  };

  const blobs = [];
  const versions = {};
  for (const key of versionOrder) {
    const buffer = buffers[key];
    if (!buffer) continue;
    const existingIndex = blobs.findIndex((blob) => blob.equals(buffer));
    if (existingIndex === -1) {
      blobs.push(buffer);
      versions[key] = blobs.length - 1;
    } else {
      versions[key] = existingIndex;
    }
  }

  const { width, height } = readPngDimensions(buffers.regen);

  let baseRegenDiffCount = 0;
  if (versions[baseKey] !== versions.regen) {
    const baseDecoded = await decodeRawRgba(buffers[baseKey]);
    const regenDecoded = await decodeRawRgba(buffers.regen);
    baseRegenDiffCount = countDiffPixels(
      baseDecoded.rgba,
      baseDecoded.width,
      baseDecoded.height,
      regenDecoded.rgba,
      regenDecoded.width,
      regenDecoded.height,
    );
  }

  rows.push({
    relPath: entry.relPath,
    project: entry.project,
    scenario: entry.scenario,
    stem: entry.stem,
    width,
    height,
    blobUris: blobs.map(toDataUri),
    versions,
    baseRegenDiffCount,
  });
}

const escapeHtml = (text) =>
  text.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);

const omittedParts = [...omittedByProject].map(([project, count]) => `${count} from ${project}`);
const omittedNote =
  omittedParts.length > 0
    ? `${rows.length} of ${allEntries.length} shown — ${allEntries.length - rows.length} omitted (${omittedParts.join(", ")})`
    : `${rows.length} of ${allEntries.length} shown`;

/** escapes "<" so JSON text can sit inside a <script> block ("</script" can never appear); JSON.parse decodes < transparently */
const jsonForScriptBlock = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

// light per-row metadata - the only row data evaluated as script; the heavy
// blobs go into inert per-row JSON blocks instead:
const rowsMetaJson = jsonForScriptBlock(
  rows.map(({ relPath, project, scenario, stem, width, height, baseRegenDiffCount }) => ({
    relPath,
    project,
    scenario,
    stem,
    width,
    height,
    baseRegenDiffCount,
  })),
);

const rowDataBlocks = rows
  .map(
    (row, index) =>
      `<script type="application/json" id="row-data-${index}">${jsonForScriptBlock({
        blobUris: row.blobUris,
        versions: row.versions,
      })}</script>`,
  )
  .join("\n");

const [firstRow] = rows;

// one toggle button per named version that exists for the first row (the
// client rebuilds these per row); "regen" starts selected, matching the
// statically-shown image:
const staticVersionButtonsHtml = versionOrder
  .filter((key) => key in firstRow.versions)
  .map(
    (key) =>
      `<button type="button" class="mode-btn ver-btn${key === "regen" ? " active" : ""}" data-version="${key}" disabled>${key}</button>`,
  )
  .join("");

// the row dropdown's initial (name-sorted, project/scenario-grouped) options,
// rendered statically; the client only rebuilds them when the sort changes:
const staticRowOptionsHtml = (() => {
  const groups = new Map();
  rows.forEach((row, index) => {
    const key = `${row.project} / ${row.scenario}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(index);
  });
  return [...groups]
    .map(
      ([label, indices]) =>
        `<optgroup label="${escapeHtml(label)}">${indices
          .map(
            (index) =>
              `<option value="${index}"${index === 0 ? " selected" : ""}>${escapeHtml(rows[index].stem)}</option>`,
          )
          .join("")}</optgroup>`,
    )
    .join("\n");
})();

const firstRowInitialUri = firstRow.blobUris[firstRow.versions.regen];

// CSS/markup/script shared verbatim by both the standalone page and the
// artifact fragment. The whole app is ONE fixed container anchored to the
// CENTRE of the screen, with JS-frozen px dimensions (static fallback
// 100%); everything else positions absolutely inside it. Host apps'
// auto-hiding bars shrink the viewport from the top AND the bottom edges,
// so no edge is a stable anchor - the centre moves by only half of any
// bar's height, the least movement available to the page. No vh/dvh units
// anywhere.
const sharedCss = `
  #diffViewerApp {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #f6f6f4;
    color: #1a1a1a;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  #diffViewerApp * { box-sizing: border-box; }

  #diffViewerApp #toolbar {
    position: absolute;
    bottom: calc(0.5rem + env(safe-area-inset-bottom, 0px));
    left: 0.5rem;
    max-width: calc(100% - 1rem);
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0 0.5rem 0.35rem 0.5rem;
    background: rgba(250, 250, 250, 0.95);
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
    flex-wrap: wrap;
    touch-action: none;
  }
  #diffViewerApp #toolbar-handle {
    flex: 1 0 100%;
    height: 1.1rem;
    cursor: move;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    font-size: 0.7rem;
    letter-spacing: 0.3em;
    user-select: none;
  }
  #diffViewerApp select {
    font: inherit;
    font-size: 0.78rem;
    padding: 0.3rem 0.25rem;
    border: 1px solid #bbb;
    border-radius: 4px;
    background: #fff;
  }
  #diffViewerApp #row-select {
    flex: 1 1 8rem;
    min-width: 0;
  }
  #diffViewerApp #sort-select {
    flex: 0 0 auto;
    max-width: 5.5rem;
  }
  #diffViewerApp .version-group { display: flex; gap: 0.25rem; flex: 0 0 auto; }
  #diffViewerApp .ver-btn.active { background: #0b57d0; border-color: #0b57d0; color: #fff; }
  #diffViewerApp .mode-group { display: flex; gap: 0.25rem; flex: 0 0 auto; }
  #diffViewerApp .mode-btn {
    font: inherit;
    font-size: 0.78rem;
    padding: 0.4rem 0.55rem;
    min-height: 2rem;
    border: 1px solid #bbb;
    background: #fff;
    border-radius: 4px;
    cursor: pointer;
  }
  #diffViewerApp .mode-btn.active { background: #1a1a1a; color: #fff; border-color: #1a1a1a; }
  #diffViewerApp .mode-btn:disabled { opacity: 0.35; cursor: not-allowed; }
  #diffViewerApp #overlay-diff-label {
    flex: 0 0 auto;
    font-size: 0.78rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    white-space: nowrap;
  }
  #diffViewerApp #overlay-diff { width: 1.1rem; height: 1.1rem; }
  #diffViewerApp #diff-count-readout {
    flex: 0 0 auto;
    font-size: 0.72rem;
    color: #555;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    white-space: nowrap;
  }

  #diffViewerApp #viewport {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    overflow: hidden;
    touch-action: none;
    background: repeating-conic-gradient(#f0f0f0 0% 25%, #fff 0% 50%) 50% / 20px 20px;
  }
  #diffViewerApp #stage {
    position: relative;
    flex: 0 0 auto;
    width: 100%;
    transform-origin: 0 0;
    will-change: transform;
  }
  #diffViewerApp #stage .layer {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    image-rendering: pixelated;
    display: none;
    user-select: none;
    -webkit-user-drag: none;
    -webkit-touch-callout: none;
  }
  #diffViewerApp #layer-b { z-index: 1; }
  #diffViewerApp #layer-a { z-index: 2; }
  #diffViewerApp #layer-diff { z-index: 3; }
  #diffViewerApp #swipe-divider {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #ff2fd0;
    z-index: 4;
    pointer-events: none;
    display: none;
  }
  /*
   * which version is on which side of the divider, read down the line
   * itself: each label is centred (via the standard translate(-50%,-50%)
   * rotate() idiom, which lands the box's own centre exactly on its left/top
   * point regardless of rotation angle) on its own edge of the divider, then
   * nudged an extra half-thickness further away from the line so the two
   * rotated boxes sit flush against either side of it without overlapping.
   * The nudge (0.7em) is the label's own half-height pre-rotation:
   * line-height 1 (1em) + top/bottom padding (0.2em each) = 1.4em tall.
   */
  #diffViewerApp .swipe-label {
    position: absolute;
    top: 50%;
    background: #ff2fd0;
    color: #000;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.7rem;
    line-height: 1;
    padding: 0.2em 0.4em;
    white-space: nowrap;
  }
  #diffViewerApp #swipe-label-left {
    left: 0;
    transform: translate(calc(-50% - 0.7em), -50%) rotate(-90deg);
  }
  #diffViewerApp #swipe-label-right {
    left: 100%;
    transform: translate(calc(-50% + 0.7em), -50%) rotate(-90deg);
  }
`;

const bodyMarkup = `<div id="diffViewerApp">
  <div id="toolbar">
    <div id="toolbar-handle" aria-hidden="true">••••</div>
    <select id="row-select" aria-label="Select screenshot to view" title="${escapeHtml(omittedNote)}">
${staticRowOptionsHtml}
    </select>
    <select id="sort-select" aria-label="Sort image list" disabled>
      <option value="name">name</option>
      <option value="pixels">px diff</option>
    </select>
    <div class="version-group" id="version-buttons">${staticVersionButtonsHtml}</div>
    <div class="mode-group">
      <button type="button" class="mode-btn active" data-mode="diff" disabled>diff</button>
      <button type="button" class="mode-btn" data-mode="swipe" disabled>swipe</button>
    </div>
    <button type="button" id="zoom-diff-btn" class="mode-btn" disabled>zoom diff</button>
    <label id="overlay-diff-label"><input type="checkbox" id="overlay-diff" disabled> overlay</label>
    <span id="diff-count-readout"></span>
  </div>
  <div id="viewport">
    <div id="stage" style="aspect-ratio: ${firstRow.width} / ${firstRow.height}">
      <img id="layer-b" class="layer" alt="version B">
      <img id="layer-a" class="layer" alt="version A" style="display: block" src="${firstRowInitialUri}">
      <img id="layer-diff" class="layer" alt="diff">
      <div id="swipe-divider">
        <span class="swipe-label" id="swipe-label-left"></span>
        <span class="swipe-label" id="swipe-label-right"></span>
      </div>
    </div>
  </div>
</div>
${rowDataBlocks}`;

const script = `(() => {
  "use strict";

  const rowsMeta = ${rowsMetaJson};
  const versionOrder = ["release", "main", "head", "regen"];

  // heavy per-row data (image data URIs + version->blob mapping) lives in
  // inert JSON blocks, parsed lazily on first use so no script evaluation
  // ever holds more than one row's images:
  const rowDataCache = new Map();
  const getRow = (index) => {
    if (!rowDataCache.has(index)) {
      rowDataCache.set(
        index,
        JSON.parse(document.getElementById("row-data-" + index).textContent),
      );
    }
    return rowDataCache.get(index);
  };

  const rowSelect = document.getElementById("row-select");
  const sortSelect = document.getElementById("sort-select");
  const versionButtonsContainer = document.getElementById("version-buttons");
  const viewport = document.getElementById("viewport");
  const stage = document.getElementById("stage");
  const layerA = document.getElementById("layer-a");
  const layerB = document.getElementById("layer-b");
  const layerDiff = document.getElementById("layer-diff");
  const swipeDivider = document.getElementById("swipe-divider");
  const swipeLabelLeft = document.getElementById("swipe-label-left");
  const swipeLabelRight = document.getElementById("swipe-label-right");
  const overlayCheckbox = document.getElementById("overlay-diff");
  const zoomDiffBtn = document.getElementById("zoom-diff-btn");
  const diffCountReadout = document.getElementById("diff-count-readout");
  const modeButtons = [...document.querySelectorAll(".mode-btn[data-mode]")];

  let currentIndex = 0;
  // the named versions currently selected, in selection order (max two):
  // one selected = view it; two selected = compare them in pairMode
  let selectedVersions = ["regen"];
  let pairMode = "diff";
  let swipeValue = 50;
  let sortMode = "name";
  let applyViewRequestId = 0;

  let scale = 1;
  let translateX = 0;
  let translateY = 0;
  const minScale = 1;
  const maxScale = 10;

  const pointers = new Map();
  let gestureMode = null;
  let panStart = null;
  let panStartTranslate = null;
  let pinchStartDist = 0;
  let pinchStartScale = 1;
  let pinchStagePoint = null;
  let lastTap = null;

  const getVersionDataUri = (row, key) => row.blobUris[row.versions[key]];

  /** one toggle button per named version that exists for this row */
  const rebuildVersionButtons = (row) => {
    versionButtonsContainer.replaceChildren();
    for (const key of versionOrder) {
      if (!(key in row.versions)) continue;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "mode-btn ver-btn";
      button.dataset.version = key;
      button.textContent = key;
      button.addEventListener("click", () => toggleVersion(key));
      versionButtonsContainer.appendChild(button);
    }
  };

  /**
   * select/unselect a named version: pressing a selected one unselects it,
   * selecting beyond two replaces the earliest-selected. At least one stays
   * selected (unselecting the last one is ignored)
   */
  const toggleVersion = (key) => {
    const existingIndex = selectedVersions.indexOf(key);
    if (existingIndex !== -1) {
      if (selectedVersions.length === 1) return;
      selectedVersions.splice(existingIndex, 1);
    } else {
      selectedVersions.push(key);
      if (selectedVersions.length > 2) {
        selectedVersions.shift();
      }
    }
    applyView();
  };

  const rebuildRowSelect = () => {
    const previousValue = rowSelect.value;
    rowSelect.replaceChildren();
    if (sortMode === "name") {
      const groups = new Map();
      rowsMeta.forEach((meta, index) => {
        const key = \`\${meta.project} / \${meta.scenario}\`;
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(index);
      });
      for (const [label, indices] of groups) {
        const optgroup = document.createElement("optgroup");
        optgroup.label = label;
        for (const index of indices) {
          const optionEl = document.createElement("option");
          optionEl.value = String(index);
          optionEl.textContent = rowsMeta[index].stem;
          optgroup.appendChild(optionEl);
        }
        rowSelect.appendChild(optgroup);
      }
    } else {
      const indices = rowsMeta
        .map((_, index) => index)
        .sort((a, b) => rowsMeta[b].baseRegenDiffCount - rowsMeta[a].baseRegenDiffCount);
      for (const index of indices) {
        const optionEl = document.createElement("option");
        optionEl.value = String(index);
        optionEl.textContent = \`\${rowsMeta[index].stem} — \${rowsMeta[index].baseRegenDiffCount}px\`;
        rowSelect.appendChild(optionEl);
      }
    }
    rowSelect.value = previousValue;
  };

  const diffCache = new Map();

  const loadImage = (dataUri) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = dataUri;
    });

  /**
   * On-demand pixel diff for one A/B pair of the current row: magenta on
   * fully transparent, over the union extent of both images (out-of-bounds
   * pixels count as differing). Cached per (row, unordered key pair).
   */
  const computeDiff = async (rowIndex, keyA, keyB) => {
    const row = getRow(rowIndex);
    const [imgA, imgB] = await Promise.all([
      loadImage(getVersionDataUri(row, keyA)),
      loadImage(getVersionDataUri(row, keyB)),
    ]);
    const widthA = imgA.naturalWidth;
    const heightA = imgA.naturalHeight;
    const widthB = imgB.naturalWidth;
    const heightB = imgB.naturalHeight;
    const unionWidth = Math.max(widthA, widthB);
    const unionHeight = Math.max(heightA, heightB);

    const canvasA = document.createElement("canvas");
    canvasA.width = widthA;
    canvasA.height = heightA;
    const ctxA = canvasA.getContext("2d");
    ctxA.drawImage(imgA, 0, 0);
    const dataA = ctxA.getImageData(0, 0, widthA, heightA).data;

    const canvasB = document.createElement("canvas");
    canvasB.width = widthB;
    canvasB.height = heightB;
    const ctxB = canvasB.getContext("2d");
    ctxB.drawImage(imgB, 0, 0);
    const dataB = ctxB.getImageData(0, 0, widthB, heightB).data;

    const diffImageData = new ImageData(unionWidth, unionHeight);
    const diffData = diffImageData.data;
    let count = 0;
    let minX = unionWidth;
    let minY = unionHeight;
    let maxX = -1;
    let maxY = -1;

    for (let y = 0; y < unionHeight; y++) {
      for (let x = 0; x < unionWidth; x++) {
        const inA = x < widthA && y < heightA;
        const inB = x < widthB && y < heightB;
        let differs = true;
        if (inA && inB) {
          const offsetA = (y * widthA + x) * 4;
          const offsetB = (y * widthB + x) * 4;
          differs =
            dataA[offsetA] !== dataB[offsetB] ||
            dataA[offsetA + 1] !== dataB[offsetB + 1] ||
            dataA[offsetA + 2] !== dataB[offsetB + 2] ||
            dataA[offsetA + 3] !== dataB[offsetB + 3];
        }
        if (differs) {
          count += 1;
          const offsetOut = (y * unionWidth + x) * 4;
          diffData[offsetOut] = 255;
          diffData[offsetOut + 1] = 0;
          diffData[offsetOut + 2] = 255;
          diffData[offsetOut + 3] = 255;
          if (x < minX) minX = x;
          if (y < minY) minY = y;
          if (x > maxX) maxX = x;
          if (y > maxY) maxY = y;
        }
      }
    }

    const diffCanvas = document.createElement("canvas");
    diffCanvas.width = unionWidth;
    diffCanvas.height = unionHeight;
    diffCanvas.getContext("2d").putImageData(diffImageData, 0, 0);

    return {
      dataUri: diffCanvas.toDataURL(),
      count,
      box: maxX >= minX ? { x: minX, y: minY, width: maxX - minX + 1, height: maxY - minY + 1 } : null,
      width: unionWidth,
      height: unionHeight,
    };
  };

  const getDiffResult = (rowIndex, keyA, keyB) => {
    const cacheKey = \`\${rowIndex}:\${[keyA, keyB].sort().join("|")}\`;
    if (!diffCache.has(cacheKey)) {
      diffCache.set(cacheKey, computeDiff(rowIndex, keyA, keyB));
    }
    return diffCache.get(cacheKey);
  };

  const applyTransform = () => {
    stage.style.transform = \`translate(\${translateX}px, \${translateY}px) scale(\${scale})\`;
  };

  const resetTransform = () => {
    scale = 1;
    translateX = 0;
    translateY = 0;
    applyTransform();
  };

  const toViewportLocal = (event) => {
    const rect = viewport.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  /**
   * Zooms/pans so the current A/B pair's on-demand diff bounding box (plus
   * margin) fills the viewport, using the same scale/translate state as
   * pinch-zoom. Box coordinates are in the diff's own (union-extent) pixel
   * space; image-px -> stage-px is uniform on both axes since the diff's
   * aspect ratio there matches what's actually rendered at scale 1.
   */
  const zoomToDiff = async () => {
    if (selectedVersions.length !== 2) return;
    const result = await getDiffResult(currentIndex, selectedVersions[0], selectedVersions[1]);
    diffCountReadout.textContent = \`\${result.count}px\`;
    if (!result.box) return;

    const marginX = Math.max(result.box.width * 0.08, 4);
    const marginY = Math.max(result.box.height * 0.08, 4);
    const boxXImg = Math.max(0, result.box.x - marginX);
    const boxYImg = Math.max(0, result.box.y - marginY);
    const boxWImg = Math.min(result.width - boxXImg, result.box.width + marginX * 2);
    const boxHImg = Math.min(result.height - boxYImg, result.box.height + marginY * 2);

    const viewportRect = viewport.getBoundingClientRect();
    const stagePxPerImagePx = viewportRect.width / result.width;
    const boxX = boxXImg * stagePxPerImagePx;
    const boxY = boxYImg * stagePxPerImagePx;
    const boxW = boxWImg * stagePxPerImagePx;
    const boxH = boxHImg * stagePxPerImagePx;

    scale = Math.min(maxScale, Math.max(minScale, Math.min(viewportRect.width / boxW, viewportRect.height / boxH)));
    const centerX = boxX + boxW / 2;
    const centerY = boxY + boxH / 2;
    translateX = viewportRect.width / 2 - centerX * scale;
    translateY = viewportRect.height / 2 - centerY * scale;
    applyTransform();
  };

  const screenToStagePoint = (localPoint) => ({
    x: (localPoint.x - translateX) / scale,
    y: (localPoint.y - translateY) / scale,
  });

  const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const midpoint = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

  const updateSwipeClip = () => {
    layerA.style.clipPath = \`inset(0 \${100 - swipeValue}% 0 0)\`;
    swipeDivider.style.left = \`\${swipeValue}%\`;
  };

  const setSwipeValueFromLocalPoint = (localPoint) => {
    const stageWidth = viewport.getBoundingClientRect().width;
    const stagePoint = screenToStagePoint(localPoint);
    swipeValue = Math.min(100, Math.max(0, (stagePoint.x / stageWidth) * 100));
    updateSwipeClip();
  };

  const showVersion = (layer, key) => {
    layer.src = getVersionDataUri(getRow(currentIndex), key);
    layer.style.display = "block";
  };

  /**
   * renders the current selection: one selected version shows plainly; two
   * show as the pair comparison (diff or swipe). Also keeps every control's
   * enabled/active state in step with the selection
   */
  const applyView = async () => {
    const requestId = ++applyViewRequestId;
    const paired = selectedVersions.length === 2;

    for (const button of versionButtonsContainer.children) {
      button.classList.toggle("active", selectedVersions.includes(button.dataset.version));
    }
    for (const button of modeButtons) {
      button.classList.toggle("active", button.dataset.mode === pairMode);
      button.disabled = !paired;
    }
    overlayCheckbox.disabled = !paired || pairMode === "diff";
    zoomDiffBtn.disabled = !paired;

    layerA.style.display = "none";
    layerB.style.display = "none";
    layerDiff.style.display = "none";
    layerA.style.clipPath = "";
    swipeDivider.style.display = "none";

    if (!paired) {
      showVersion(layerA, selectedVersions[0]);
      diffCountReadout.textContent = "";
      return;
    }

    const [firstKey, secondKey] = selectedVersions;
    if (pairMode === "diff") {
      const result = await getDiffResult(currentIndex, firstKey, secondKey);
      if (requestId !== applyViewRequestId) return;
      layerDiff.src = result.dataUri;
      layerDiff.style.display = "block";
      diffCountReadout.textContent = \`\${result.count}px\`;
    } else {
      // swipe: the first-selected version on the left of the divider
      showVersion(layerB, secondKey);
      showVersion(layerA, firstKey);
      swipeLabelLeft.textContent = firstKey;
      swipeLabelRight.textContent = secondKey;
      swipeDivider.style.display = "block";
      updateSwipeClip();
      if (overlayCheckbox.checked) {
        const result = await getDiffResult(currentIndex, firstKey, secondKey);
        if (requestId !== applyViewRequestId) return;
        layerDiff.src = result.dataUri;
        layerDiff.style.display = "block";
        diffCountReadout.textContent = \`\${result.count}px\`;
      }
    }
  };

  const showRow = (index) => {
    currentIndex = ((index % rowsMeta.length) + rowsMeta.length) % rowsMeta.length;
    const row = getRow(currentIndex);
    const meta = rowsMeta[currentIndex];

    rebuildVersionButtons(row);
    // keep the selection where those versions exist for this row too;
    // fall back to regen (always present) when none survive:
    selectedVersions = selectedVersions.filter((key) => key in row.versions);
    if (selectedVersions.length === 0) {
      selectedVersions = ["regen"];
    }

    stage.style.aspectRatio = \`\${meta.width} / \${meta.height}\`;
    rowSelect.value = String(currentIndex);
    diffCountReadout.textContent = "";
    resetTransform();
    applyView();
  };

  const setPairMode = (mode) => {
    pairMode = mode;
    applyView();
  };

  const stepRow = (delta) => {
    const optionCount = rowSelect.options.length;
    const newOptionIndex = (((rowSelect.selectedIndex + delta) % optionCount) + optionCount) % optionCount;
    rowSelect.selectedIndex = newOptionIndex;
    showRow(Number(rowSelect.value));
  };

  rowSelect.addEventListener("change", () => showRow(Number(rowSelect.value)));

  sortSelect.addEventListener("change", () => {
    sortMode = sortSelect.value;
    rebuildRowSelect();
  });

  for (const button of modeButtons) {
    button.addEventListener("click", () => setPairMode(button.dataset.mode));
  }

  overlayCheckbox.addEventListener("change", applyView);
  zoomDiffBtn.addEventListener("click", zoomToDiff);

  const startPan = (point) => {
    gestureMode = "pan";
    panStart = point;
    panStartTranslate = { x: translateX, y: translateY };
  };

  /** the swipe divider is draggable exactly when the swipe comparison is on screen */
  const swipeShowing = () => selectedVersions.length === 2 && pairMode === "swipe";

  viewport.addEventListener("pointerdown", (event) => {
    // Pointer capture keeps move/up events arriving even if the finger
    // leaves the element's bounds; its absence shouldn't stop gesture
    // tracking, so a capture failure here is swallowed, not fatal.
    try {
      viewport.setPointerCapture(event.pointerId);
    } catch {
      // no-op: gesture tracking below still works without capture
    }
    const point = toViewportLocal(event);
    pointers.set(event.pointerId, point);
    event.preventDefault();

    if (pointers.size === 1) {
      const now = Date.now();
      if (lastTap && now - lastTap.time < 300 && distance(point, lastTap) < 20) {
        resetTransform();
        lastTap = null;
        gestureMode = null;
        return;
      }
      lastTap = { time: now, x: point.x, y: point.y };

      if (swipeShowing()) {
        gestureMode = "swipe";
        setSwipeValueFromLocalPoint(point);
      } else {
        startPan(point);
      }
    } else if (pointers.size === 2) {
      gestureMode = "pinch";
      const [p1, p2] = [...pointers.values()];
      pinchStartDist = distance(p1, p2);
      pinchStartScale = scale;
      pinchStagePoint = screenToStagePoint(midpoint(p1, p2));
    }
  });

  viewport.addEventListener("pointermove", (event) => {
    if (!pointers.has(event.pointerId)) return;
    pointers.set(event.pointerId, toViewportLocal(event));
    event.preventDefault();

    if (gestureMode === "swipe" && pointers.size === 1) {
      setSwipeValueFromLocalPoint(pointers.get(event.pointerId));
    } else if (gestureMode === "pan" && pointers.size === 1) {
      const point = pointers.get(event.pointerId);
      translateX = panStartTranslate.x + (point.x - panStart.x);
      translateY = panStartTranslate.y + (point.y - panStart.y);
      applyTransform();
    } else if (gestureMode === "pinch" && pointers.size === 2) {
      const [p1, p2] = [...pointers.values()];
      const dist = distance(p1, p2);
      scale = Math.min(maxScale, Math.max(minScale, pinchStartScale * (dist / pinchStartDist)));
      const mid = midpoint(p1, p2);
      translateX = mid.x - pinchStagePoint.x * scale;
      translateY = mid.y - pinchStagePoint.y * scale;
      applyTransform();
    }
  });

  const endPointer = (event) => {
    pointers.delete(event.pointerId);
    if (viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }
    if (pointers.size === 0) {
      gestureMode = null;
    } else if (pointers.size === 1) {
      const [point] = pointers.values();
      if (swipeShowing()) {
        gestureMode = "swipe";
      } else {
        startPan(point);
      }
    }
  };
  viewport.addEventListener("pointerup", endPointer);
  viewport.addEventListener("pointercancel", endPointer);

  document.addEventListener("keydown", (event) => {
    const activeTag = document.activeElement && document.activeElement.tagName;
    if (activeTag === "INPUT" || activeTag === "SELECT" || activeTag === "TEXTAREA") {
      return;
    }
    if (event.key === "ArrowLeft") {
      stepRow(-1);
    } else if (event.key === "ArrowRight") {
      stepRow(1);
    } else if (event.key >= "1" && event.key <= "4") {
      // 1-N toggle the row's version buttons in display order:
      const button = versionButtonsContainer.children[Number(event.key) - 1];
      if (button) {
        toggleVersion(button.dataset.version);
      }
    } else if (event.key === "d") {
      setPairMode("diff");
    } else if (event.key === "s") {
      setPairMode("swipe");
    }
  });

  // ---- host-chrome resilience (eg the Documents app's auto-hiding bars) ----

  const app = document.getElementById("diffViewerApp");
  const toolbar = document.getElementById("toolbar");
  const toolbarHandle = document.getElementById("toolbar-handle");

  // freeze the app's dimensions in px so host chrome showing/hiding never
  // reflows the layout - the centre-anchored container just shifts by half
  // the bar height (the least movement available) while its contents hold
  // their positions within it. Grow-only within an orientation: dimensions
  // lock to the largest viewport seen (chrome hidden); a width change (a
  // real orientation change) starts afresh:
  let frozenWidth = 0;
  let frozenHeight = 0;
  const freezeSize = () => {
    frozenWidth = window.innerWidth;
    frozenHeight = window.innerHeight;
    app.style.width = frozenWidth + "px";
    app.style.height = frozenHeight + "px";
  };
  freezeSize();
  window.addEventListener("resize", () => {
    if (window.innerWidth !== frozenWidth) {
      freezeSize();
    } else if (window.innerHeight > frozenHeight) {
      freezeSize();
    }
  });

  // the page itself never scrolls or zooms - all pinch/pan is the in-app
  // image transform. Native select popups don't need touchmove, and taps
  // (touchstart+touchend) still click buttons:
  document.addEventListener("touchmove", (event) => event.preventDefault(), { passive: false });
  document.addEventListener("gesturestart", (event) => event.preventDefault());

  // the toolbar floats and is draggable by its handle, so the user can move
  // it clear of whatever chrome their viewing app overlays:
  let toolbarDrag = null;
  toolbarHandle.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    const rect = toolbar.getBoundingClientRect();
    toolbarDrag = { offsetX: event.clientX - rect.left, offsetY: event.clientY - rect.top };
    try {
      toolbarHandle.setPointerCapture(event.pointerId);
    } catch {
      // capture failure never blocks the drag itself
    }
  });
  toolbarHandle.addEventListener("pointermove", (event) => {
    if (!toolbarDrag) return;
    // positioned in the app's own (centre-anchored, frozen-size) frame, so
    // the panel holds still wherever host chrome pushes the viewport edges:
    const appRect = app.getBoundingClientRect();
    const rect = toolbar.getBoundingClientRect();
    const maxLeft = appRect.width - rect.width;
    const maxBottom = appRect.height - rect.height;
    const leftPx = event.clientX - toolbarDrag.offsetX - appRect.left;
    const bottomPx = appRect.bottom - (event.clientY - toolbarDrag.offsetY) - rect.height;
    toolbar.style.left = Math.min(maxLeft, Math.max(0, leftPx)) + "px";
    toolbar.style.bottom = Math.min(maxBottom, Math.max(0, bottomPx)) + "px";
  });
  const endToolbarDrag = () => {
    toolbarDrag = null;
  };
  toolbarHandle.addEventListener("pointerup", endToolbarDrag);
  toolbarHandle.addEventListener("pointercancel", endToolbarDrag);

  // every JS-dependent control renders disabled in the static markup and is
  // enabled here - so a viewing context that never runs scripts (eg iOS
  // Quick Look) shows greyed-out controls instead of dead-looking live ones:
  for (const control of document.querySelectorAll(
    "#diffViewerApp button, #diffViewerApp select, #diffViewerApp input",
  )) {
    control.disabled = false;
  }

  // the row dropdown's initial (name-sorted) options are static markup;
  // rebuildRowSelect only runs when the sort changes:
  showRow(0);
})();`;

const standaloneHtml = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover">
<title>Snapshot diff viewer</title>
<style>
html, body { margin: 0; padding: 0; overflow: hidden; }
${sharedCss}
</style>
</head>
<body>
${bodyMarkup}
<script>
${script}
</script>
</body>
</html>
`;

const artifactHtml = `<style>
${sharedCss}
</style>
${bodyMarkup}
<script>
${script}
</script>
`;

writeFileSync(standaloneOutPath, standaloneHtml);
writeFileSync(artifactOutPath, artifactHtml);
console.log(`refs: release=${releaseRef ?? "none"} main=${mainRef ?? "none"} head=HEAD base=${baseRef} (A side: ${baseKey})`);
console.log(`decoder: ${sharpModule ? "sharp (in-process)" : `imagemagick (${convertCmd?.join(" ")})`}`);
console.log(`rows: ${rows.length} of ${allEntries.length} modified (${omittedNote})`);
console.log(`wrote standalone: ${standaloneOutPath}`);
console.log(`wrote artifact fragment: ${artifactOutPath}`);
console.log(`generation time: ${((Date.now() - startTime) / 1000).toFixed(1)}s`);
