#!/usr/bin/env -S pnpm tsx

/**
 * Builds a mobile-first, edge-to-edge from/to/diff/swipe viewer over Playwright
 * screenshot baselines that are modified in the working tree vs a base ref.
 * Produces two outputs: a standalone HTML page and a wrapper-free fragment
 * suitable for embedding as a claude.ai artifact.
 *
 * Invocation (from the repo root; repo-relative file paths, one per line,
 * on stdin):
 *   makeDiff.ts --standalone-out <path> --artifact-out <path>
 *               --max-rows <n> [--convert-cmd "<binary>"]
 *               [--base-ref <ref>] [--release-ref <tag>] [--main-ref <ref>]
 *
 * Each row can have up to five versions of the same file - release (latest
 * release tag), main (origin/main, local ref only, never fetched), head
 * (HEAD), stage (the git index) and working (the file on disk, always present,
 * since that is what makes the row "modified" in the first place). A version
 * is omitted when the file doesn't exist at that ref. Byte-identical versions
 * are deduped: each distinct blob is embedded once, referenced by every
 * version key that matches it.
 *
 * The generation-time work is: resolve the versions per row, dedupe them into
 * blobs, and precompute the exact base-vs-working differing-pixel count (via
 * raw RGBA decode + exact byte comparison) used to sort rows by amount of
 * change. All other diffing - any pair, not just base/working - happens on
 * demand in the browser via canvas, using the same union-extent comparison
 * algorithm, so a precomputed and an on-demand count for the same pair always
 * agree.
 *
 * Output structure is built for memory-constrained mobile webviews (iOS in
 * particular refuses to evaluate a single multi-megabyte script, which leaves
 * a JS-driven UI completely blank):
 * - the initial UI is fully STATIC markup: the row dropdown's options, the
 *   version chooser and the first row's image are all rendered at generation
 *   time, so the page shows real content even before (or without) any script
 *   running
 * - the heavy image data lives in one small inert
 *   <script type="application/json"> block PER ROW, JSON.parsed lazily the
 *   first time its row is shown (then cached) - the HTML parser streams these
 *   cheaply, and no script evaluation ever touches more than one row's data at
 *   a time
 * - the executable script is only the bundled viewer logic; even the per-row
 *   metadata it holds for every row at once arrives through an inert JSON block
 *
 * Raw RGBA decode uses the in-process `sharp` package (already a repo
 * devDependency) - no per-file child-process spawn. --convert-cmd (an
 * ImageMagick "magick" or "convert" binary) is an optional fallback, only
 * invoked if `sharp` fails to import.
 */
import type sharpDefaultExport from "sharp";

import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

import { bundleViewerScript } from "./bundleViewerScript";
import {
  type ReportMeta,
  reportMetaElementId,
  type RowBlobs,
  rowDataElementId,
  type RowMeta,
  versionDescriptions,
  type VersionKey,
  versionOrder,
} from "./reportData";

type SharpModule = typeof sharpDefaultExport;

type RawImage = { rgba: Buffer; width: number; height: number };

type Row = RowMeta & RowBlobs;

/** the file's bytes at each version; the working-tree one always resolves */
type VersionBuffers = { [K in VersionKey]?: Buffer } & { working: Buffer };

const parseArgs = (argv: Array<string>): Map<string, string> => {
  const args = new Map<string, string>();
  for (let i = 0; i + 1 < argv.length; i += 2) {
    args.set(argv[i].replace(/^--/, ""), argv[i + 1]);
  }
  return args;
};

const gitText = (args: Array<string>): string | undefined => {
  const result = spawnSync("git", args, { encoding: "utf8" });
  return result.status === 0 ? result.stdout.trim() : undefined;
};

const gitBytes = (args: Array<string>): Buffer | undefined => {
  const result = spawnSync("git", args, {
    encoding: "buffer",
    maxBuffer: 1_024 * 1_024 * 64,
  });
  return result.status === 0 ? result.stdout : undefined;
};

const resolveLatestReleaseTag = (): string | undefined => {
  const [latestTag] =
    gitText(["tag", "--sort=-v:refname"])?.split("\n").filter(Boolean) ?? [];
  return latestTag;
};

const parseSnapshotPath = (
  /**
   * repo-relative path to a screenshot, eg
   * "e2e/cameraRotationSweep.spec.ts-snapshots/chromium-desktop/cycles-100deg.png"
   */
  relPath: string,
) => {
  const parts = relPath.split("/");
  const stem = (parts.at(-1) ?? relPath).replace(/\.png$/, "");
  const [scenario] = stem.split("-");
  return { relPath, project: parts.at(-2) ?? "", scenario, stem };
};

const readPngDimensions = (pngBuffer: Buffer) => ({
  width: pngBuffer.readUInt32BE(16),
  height: pngBuffer.readUInt32BE(20),
});

const importSharp = async (): Promise<SharpModule | undefined> => {
  try {
    return (await import("sharp")).default;
  } catch {
    return undefined;
  }
};

/**
 * Decodes PNG buffers to raw RGBA, in-process through `sharp` where it imports
 * and through an ImageMagick binary otherwise.
 */
const createPngDecoder = async (
  /** an ImageMagick "magick"/"convert" invocation, already split on spaces */
  convertCmd: Array<string> | undefined,
) => {
  const sharpModule = await importSharp();

  const decodeWithSharp = async (
    sharpInstance: SharpModule,
    pngBuffer: Buffer,
  ): Promise<RawImage> => {
    const { data, info } = await sharpInstance(pngBuffer)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    return { rgba: data, width: info.width, height: info.height };
  };

  const decodeWithImageMagick = (
    command: Array<string>,
    pngBuffer: Buffer,
  ): RawImage => {
    const [binary, ...leadingArgs] = command;
    const result = spawnSync(
      binary,
      [...leadingArgs, "-depth", "8", "-", "rgba:-"],
      {
        encoding: "buffer",
        input: pngBuffer,
        maxBuffer: 1_024 * 1_024 * 64,
      },
    );
    if (result.status !== 0) {
      throw new Error(
        `imagemagick raw decode failed (exit ${result.status}): ${result.stderr.toString()}`,
      );
    }
    return { rgba: result.stdout, ...readPngDimensions(pngBuffer) };
  };

  return {
    description:
      sharpModule !== undefined ? "sharp (in-process)"
      : convertCmd !== undefined ? `imagemagick (${convertCmd.join(" ")})`
      : "none",
    async decode(pngBuffer: Buffer): Promise<RawImage> {
      if (sharpModule !== undefined) {
        return decodeWithSharp(sharpModule, pngBuffer);
      }
      if (convertCmd === undefined) {
        throw new Error(
          "no raw pixel decoder available: sharp failed to import and no --convert-cmd was given",
        );
      }
      return decodeWithImageMagick(convertCmd, pngBuffer);
    },
  };
};

/**
 * Exact differing-pixel count over the union extent of two (possibly
 * differently sized) images; any pixel outside the smaller image's bounds
 * counts as differing. Mirrors the on-demand canvas diff the viewer runs, so a
 * precomputed and an on-demand count for the same pair agree.
 */
const countDiffPixels = (imageA: RawImage, imageB: RawImage): number => {
  const unionWidth = Math.max(imageA.width, imageB.width);
  const unionHeight = Math.max(imageA.height, imageB.height);
  let count = 0;
  for (let y = 0; y < unionHeight; y++) {
    for (let x = 0; x < unionWidth; x++) {
      const inA = x < imageA.width && y < imageA.height;
      const inB = x < imageB.width && y < imageB.height;
      let differs = true;
      if (inA && inB) {
        const offsetA = (y * imageA.width + x) * 4;
        const offsetB = (y * imageB.width + x) * 4;
        differs =
          imageA.rgba[offsetA] !== imageB.rgba[offsetB] ||
          imageA.rgba[offsetA + 1] !== imageB.rgba[offsetB + 1] ||
          imageA.rgba[offsetA + 2] !== imageB.rgba[offsetB + 2] ||
          imageA.rgba[offsetA + 3] !== imageB.rgba[offsetB + 3];
      }
      if (differs) {
        count += 1;
      }
    }
  }
  return count;
};

const toDataUri = (pngBuffer: Buffer) =>
  `data:image/png;base64,${pngBuffer.toString("base64")}`;

const htmlEscapes: { [character: string]: string } = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (character) => htmlEscapes[character]);

/** escapes "<" so JSON text can sit inside a <script> block ("</script" can never appear); JSON.parse decodes < transparently */
const jsonForScriptBlock = (value: unknown) =>
  JSON.stringify(value).replace(/</g, "\\u003c");

/**
 * Caps the row list to `maxRows` (0 = unlimited): keeps every row of the first
 * project (alphabetically), then fills the remainder from subsequent projects
 * in order, dropping whatever doesn't fit.
 */
const capRows = <Entry extends { project: string }>(
  entries: Array<Entry>,
  maxRows: number,
) => {
  if (maxRows === 0) {
    return { kept: entries, omittedByProject: new Map<string, number>() };
  }
  const projectOrder = [
    ...new Set(entries.map(({ project }) => project)),
  ].sort();
  const omittedByProject = new Map<string, number>();
  const kept: Array<Entry> = [];
  let remaining = maxRows;
  for (const project of projectOrder) {
    const projectEntries = entries.filter((entry) => entry.project === project);
    const take = projectEntries.slice(0, remaining);
    kept.push(...take);
    remaining -= take.length;
    const omitted = projectEntries.length - take.length;
    if (omitted > 0) {
      omittedByProject.set(project, omitted);
    }
  }
  return { kept, omittedByProject };
};

// CSS/markup shared verbatim by both the standalone page and the artifact
// fragment. The whole app is ONE fixed container anchored to the CENTRE of the
// screen, with JS-frozen px dimensions (static fallback 100%); everything else
// positions absolutely inside it. Host apps' auto-hiding bars shrink the
// viewport from the top AND the bottom edges, so no edge is a stable anchor -
// the centre moves by only half of any bar's height, the least movement
// available to the page. No vh/dvh units anywhere.
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

  /*
   * the version chooser: columns are versions, the radios above the labels
   * choose the "from" side and those below the "to" side. Every column the
   * report has is in the markup; the ones a row has no version for are hidden.
   */
  #diffViewerApp #version-chooser {
    flex: 0 0 auto;
    border-collapse: collapse;
    font-size: 0.7rem;
    line-height: 1;
  }
  #diffViewerApp #version-chooser th,
  #diffViewerApp #version-chooser td {
    padding: 0;
    text-align: center;
    font-weight: normal;
  }
  #diffViewerApp #version-chooser [hidden] { display: none; }
  #diffViewerApp #version-chooser .side-label {
    color: #777;
    font-size: 0.62rem;
    letter-spacing: 0.04em;
    padding-right: 0.3rem;
    text-align: right;
  }
  #diffViewerApp #version-chooser .version-label {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    padding: 0.1rem 0.25rem;
  }
  #diffViewerApp #version-chooser .version-label.duplicate { color: #aaa; }
  #diffViewerApp .version-radio {
    width: 1rem;
    height: 1rem;
    margin: 0.1rem 0;
  }
  #diffViewerApp .version-radio:disabled { opacity: 0.3; }

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
  #diffViewerApp #layer-to { z-index: 1; }
  #diffViewerApp #layer-from { z-index: 2; }
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

/**
 * The chooser's static markup: three `<tr>`s (from radios, labels, to radios)
 * over a column per version any row of the report has. The viewer hides the
 * columns the shown row lacks, so it never has to build markup itself.
 */
const versionChooserHtml = (
  /** a column per version any row of the report has, in version order */
  columnVersions: Array<VersionKey>,
  /** the versions of the row shown before any script runs */
  firstRowVersions: RowBlobs["versions"],
  baseVersion: VersionKey,
) => {
  const hiddenAttribute = (version: VersionKey) =>
    version in firstRowVersions ? "" : " hidden";

  const radioCells = (side: "from" | "to") =>
    columnVersions
      .map((version) => {
        const startsChecked =
          (side === "from" ? baseVersion : "working") === version;
        return `<td data-version="${version}"${hiddenAttribute(version)}><input type="radio" class="version-radio" id="${side}-radio-${version}" name="${side}-version" value="${version}" aria-label="compare ${side} ${version}"${startsChecked ? " checked" : ""} disabled></td>`;
      })
      .join("");

  const labelCells = columnVersions
    .map(
      (version) =>
        `<th scope="col" class="version-label" id="label-cell-${version}" data-version="${version}" title="${escapeHtml(versionDescriptions[version])}"${hiddenAttribute(version)}>${version}</th>`,
    )
    .join("");

  return `<table id="version-chooser">
      <tbody>
        <tr><td class="side-label">from</td>${radioCells("from")}</tr>
        <tr><td></td>${labelCells}</tr>
        <tr><td class="side-label">to</td>${radioCells("to")}</tr>
      </tbody>
    </table>`;
};

const bodyMarkup = (
  rows: Array<Row>,
  reportMeta: ReportMeta,
  omittedNote: string,
) => {
  const [firstRow] = rows;
  const firstRowWorkingBlobIndex = firstRow.versions.working;
  if (firstRowWorkingBlobIndex === undefined) {
    throw new Error("every row must have a working-tree version");
  }
  const columnVersions = versionOrder.filter((version) =>
    rows.some((row) => version in row.versions),
  );

  // the row dropdown's initial (name-sorted, project/scenario-grouped) options,
  // rendered statically; the viewer only rebuilds them when the sort changes:
  const indicesByGroup = new Map<string, Array<number>>();
  for (const [index, row] of rows.entries()) {
    const label = `${row.project} / ${row.scenario}`;
    const existing = indicesByGroup.get(label);
    if (existing === undefined) {
      indicesByGroup.set(label, [index]);
    } else {
      existing.push(index);
    }
  }
  const rowOptionsHtml = [...indicesByGroup]
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

  const dataBlocks = [
    `<script type="application/json" id="${reportMetaElementId}">${jsonForScriptBlock(reportMeta)}</script>`,
    ...rows.map(
      ({ blobUris, versions }, index) =>
        `<script type="application/json" id="${rowDataElementId(index)}">${jsonForScriptBlock({ blobUris, versions })}</script>`,
    ),
  ].join("\n");

  return `<div id="diffViewerApp">
  <div id="toolbar">
    <div id="toolbar-handle" aria-hidden="true">••••</div>
    <select id="row-select" aria-label="Select screenshot to view" title="${escapeHtml(omittedNote)}">
${rowOptionsHtml}
    </select>
    <select id="sort-select" aria-label="Sort image list" disabled>
      <option value="name">name</option>
      <option value="pixels">px diff</option>
    </select>
    ${versionChooserHtml(columnVersions, firstRow.versions, reportMeta.baseVersion)}
    <button type="button" id="swap-versions" class="mode-btn" title="swap from and to" aria-label="swap from and to" disabled>⇄</button>
    <div class="mode-group">
      <button type="button" class="mode-btn" data-mode="from" disabled>from</button>
      <button type="button" class="mode-btn active" data-mode="to" disabled>to</button>
      <button type="button" class="mode-btn" data-mode="diff" disabled>diff</button>
      <button type="button" class="mode-btn" data-mode="swipe" disabled>swipe</button>
    </div>
    <button type="button" id="zoom-diff" class="mode-btn" disabled>zoom diff</button>
    <label id="overlay-diff-label"><input type="checkbox" id="overlay-diff" disabled> overlay</label>
    <span id="diff-count-readout"></span>
  </div>
  <div id="viewport">
    <div id="stage" style="aspect-ratio: ${firstRow.width} / ${firstRow.height}">
      <img id="layer-to" class="layer" alt="the version compared to" style="display: block" src="${firstRow.blobUris[firstRowWorkingBlobIndex]}">
      <img id="layer-from" class="layer" alt="the version compared from">
      <img id="layer-diff" class="layer" alt="differing pixels">
      <div id="swipe-divider">
        <span class="swipe-label" id="swipe-label-left"></span>
        <span class="swipe-label" id="swipe-label-right"></span>
      </div>
    </div>
  </div>
</div>
${dataBlocks}`;
};

const run = async () => {
  const startTime = Date.now();

  const args = parseArgs(process.argv.slice(2));
  const standaloneOutPath = args.get("standalone-out");
  const artifactOutPath = args.get("artifact-out");
  const maxRows = Number(args.get("max-rows"));

  if (
    standaloneOutPath === undefined ||
    artifactOutPath === undefined ||
    !Number.isFinite(maxRows)
  ) {
    throw new Error(
      "usage: makeDiff.ts --standalone-out <path> --artifact-out <path> --max-rows <n> [--convert-cmd <cmd>] (file list on stdin)",
    );
  }

  const modifiedFiles = readFileSync(0, "utf8")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (modifiedFiles.length === 0) {
    throw new Error("no modified .png baselines provided on stdin");
  }

  const allEntries = modifiedFiles
    .map(parseSnapshotPath)
    .sort((a, b) => a.relPath.localeCompare(b.relPath));
  const { kept, omittedByProject } = capRows(allEntries, maxRows);

  const releaseRef = args.get("release-ref") ?? resolveLatestReleaseTag();
  const mainRef =
    args.get("main-ref") ??
    ((
      gitText(["rev-parse", "--verify", "--quiet", "origin/main"]) !== undefined
    ) ?
      "origin/main"
    : undefined);
  const baseRef = args.get("base-ref") ?? "HEAD";

  // which version key the base ref IS - the default "from" side of every
  // comparison, and the version the sortable differing-pixel count is measured
  // from. Matched by commit id, so a base of "main" or of "origin/main" both
  // land on the "main" key; an unrecognised base falls back to "head":
  const revParse = (ref: string | undefined) =>
    ref === undefined ? undefined : gitText(["rev-parse", ref]);
  const baseSha = revParse(baseRef);
  const baseVersion: VersionKey =
    baseSha === undefined ? "head"
    : baseSha === revParse(releaseRef) ? "release"
    : baseSha === revParse(mainRef) ? "main"
    : "head";

  const decoder = await createPngDecoder(args.get("convert-cmd")?.split(" "));

  const rows: Array<Row> = [];
  for (const entry of kept) {
    const buffers: VersionBuffers = {
      release:
        releaseRef === undefined ? undefined : (
          gitBytes(["show", `${releaseRef}:${entry.relPath}`])
        ),
      main:
        mainRef === undefined ? undefined : (
          gitBytes(["show", `${mainRef}:${entry.relPath}`])
        ),
      head: gitBytes(["show", `HEAD:${entry.relPath}`]),
      stage: gitBytes(["show", `:${entry.relPath}`]),
      working: readFileSync(entry.relPath),
    };

    const blobs: Array<Buffer> = [];
    const versions: RowBlobs["versions"] = {};
    for (const version of versionOrder) {
      const buffer = buffers[version];
      if (buffer === undefined) {
        continue;
      }
      const existingIndex = blobs.findIndex((blob) => blob.equals(buffer));
      if (existingIndex === -1) {
        versions[version] = blobs.push(buffer) - 1;
      } else {
        versions[version] = existingIndex;
      }
    }

    const baseBuffer = buffers[baseVersion];
    const baseWorkingDiffCount =
      baseBuffer === undefined || versions[baseVersion] === versions.working ?
        0
      : countDiffPixels(
          await decoder.decode(baseBuffer),
          await decoder.decode(buffers.working),
        );

    rows.push({
      ...entry,
      ...readPngDimensions(buffers.working),
      blobUris: blobs.map(toDataUri),
      versions,
      baseWorkingDiffCount,
    });
  }

  const omittedParts = [...omittedByProject].map(
    ([project, count]) => `${count} from ${project}`,
  );
  const omittedNote =
    omittedParts.length > 0 ?
      `${rows.length} of ${allEntries.length} shown — ${allEntries.length - rows.length} omitted (${omittedParts.join(", ")})`
    : `${rows.length} of ${allEntries.length} shown`;

  const reportMeta: ReportMeta = {
    baseVersion,
    rows: rows.map(
      ({
        relPath,
        project,
        scenario,
        stem,
        width,
        height,
        baseWorkingDiffCount,
      }) => ({
        relPath,
        project,
        scenario,
        stem,
        width,
        height,
        baseWorkingDiffCount,
      }),
    ),
  };

  const markup = bodyMarkup(rows, reportMeta, omittedNote);
  const script = `<script type="module">\n${await bundleViewerScript()}\n</script>`;

  writeFileSync(
    standaloneOutPath,
    `<!doctype html>
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
${markup}
${script}
</body>
</html>
`,
  );

  writeFileSync(
    artifactOutPath,
    `<style>
${sharedCss}
</style>
${markup}
${script}
`,
  );

  console.log(
    `refs: release=${releaseRef ?? "none"} main=${mainRef ?? "none"} head=HEAD base=${baseRef} (from side: ${baseVersion})`,
  );
  console.log(`decoder: ${decoder.description}`);
  console.log(
    `rows: ${rows.length} of ${allEntries.length} modified (${omittedNote})`,
  );
  console.log(`wrote standalone: ${standaloneOutPath}`);
  console.log(`wrote artifact fragment: ${artifactOutPath}`);
  console.log(
    `generation time: ${((Date.now() - startTime) / 1_000).toFixed(1)}s`,
  );
};

run();
