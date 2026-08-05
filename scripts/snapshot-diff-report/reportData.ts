/**
 * The data contract between the report generator and the viewer script that
 * runs in the generated page. The generator serialises `RowMeta`/`RowBlobs`
 * into inert `<script type="application/json">` blocks; the viewer parses them
 * back out, so both sides agree on shape and on the element ids they live at.
 *
 * Nothing here may touch node or the DOM - it is bundled into the browser
 * script as well as imported by the generator.
 */

/**
 * Every version of a baseline the report can show, ordered oldest-first. Also
 * the left-to-right column order of the viewer's version chooser.
 */
export const versionOrder = [
  "release",
  "main",
  "head",
  "stage",
  "working",
] as const;

export type VersionKey = (typeof versionOrder)[number];

/** what each version key resolves to, shown as the chooser's tooltips */
export const versionDescriptions = {
  release: "the latest release tag",
  main: "the local origin/main ref",
  head: "the HEAD commit",
  stage: "the git index (staged content)",
  working: "the file on disk in the working tree",
} as const satisfies { [K in VersionKey]: string };

/** the light per-row data the viewer keeps in memory for every row at once */
export type RowMeta = {
  /** repo-relative path of the baseline png */
  relPath: string;
  /** playwright project directory the baseline sits in */
  project: string;
  /** leading dash-separated segment of the file name, used to group rows */
  scenario: string;
  /** file name without its .png extension */
  stem: string;
  width: number;
  height: number;
  /** differing pixels between the base ref's version and the working-tree one */
  baseWorkingDiffCount: number;
};

/**
 * the heavy per-row data, parsed lazily the first time its row is shown.
 * Byte-identical versions share one entry in `blobUris`.
 */
export type RowBlobs = {
  /** each distinct image of this row, as a png data uri */
  blobUris: Array<string>;
  /** index into `blobUris` for each version this row has */
  versions: { [K in VersionKey]?: number };
};

/** everything the viewer needs before it looks at any particular row */
export type ReportMeta = {
  /**
   * the version key the report was generated against - the default "from"
   * side, and the side `baseWorkingDiffCount` is measured from
   */
  baseVersion: VersionKey;
  rows: Array<RowMeta>;
};

export const reportMetaElementId = "report-meta";

export const rowDataElementId = (rowIndex: number): string =>
  `row-data-${rowIndex}`;
