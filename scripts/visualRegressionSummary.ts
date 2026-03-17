#!/usr/bin/env node

import { ScrollBar } from "@byteland/ink-scroll-bar";
import { Command } from "@commander-js/extra-typings";
import { FullScreenBox, useScreenSize } from "fullscreen-ink";
import { Box, render, Text, useApp, useInput } from "ink";
import { ScrollList, type ScrollListRef } from "ink-scroll-list";
import { execFile } from "node:child_process";
import { readdirSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { basename, dirname } from "node:path";
import { promisify } from "node:util";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import React, { useEffect, useRef, useState } from "react";

const execFileAsync = promisify(execFile);

// ── CLI ──────────────────────────────────────────────────────────────────────

const program = new Command()
  .name("visual-regression-summary")
  .description(
    "Compare visual regression screenshots between two git revisions",
  )
  .argument("[dir]", "directory to filter PNGs", "screenshotTests")
  .option("--base <rev>", "base git revision to compare against", "main")
  .option("--later <rev>", 'later revision ("." = working copy)', ".")
  .option("--limit <n>", "max rows to show", "2000")
  .option("--parallelism <n>", "parallel workers", "16")
  .option("--spec <substring>", "filter to a spec by substring match")
  .parse();

const opts = program.opts();
const [dirArg] = program.processedArgs;
const { base, later } = opts;
const limit = Number.parseInt(opts.limit);
const parallelism = Number.parseInt(opts.parallelism);

const resolveDir = (): string => {
  if (opts.spec === undefined) return dirArg;

  const snapshotDirs = readdirSync("screenshotTests", { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name.endsWith(".spec.ts-snapshots"))
    .map((d) => d.name.replace(".spec.ts-snapshots", ""));

  const matches = snapshotDirs.filter((name) => name.includes(opts.spec!));

  if (matches.length === 0) {
    console.error(
      `No spec matching "${opts.spec}". Available: ${snapshotDirs.join(", ")}`,
    );
    process.exit(1);
  }
  if (matches.length > 1) {
    console.error(
      `"${opts.spec}" matches multiple specs: ${matches.join(", ")}`,
    );
    process.exit(1);
  }

  return `screenshotTests/${matches[0]}.spec.ts-snapshots`;
};

const dir = resolveDir();

// ── Validation ───────────────────────────────────────────────────────────────

if (base === "." && later === ".") {
  console.error("Error: Both revisions are working copy — nothing to compare");
  process.exit(1);
}
if (base === ".") {
  console.error(
    "Error: --base cannot be working copy (.) — did you mean --later?",
  );
  process.exit(1);
}

// ── Git helpers ──────────────────────────────────────────────────────────────

const getChangedFiles = async (): Promise<string[]> => {
  const args =
    later === "." ?
      ["diff", "--name-only", base, "--", `${dir}/*.png`, `${dir}/**/*.png`]
    : [
        "diff",
        "--name-only",
        base,
        later,
        "--",
        `${dir}/*.png`,
        `${dir}/**/*.png`,
      ];

  const { stdout } = await execFileAsync("git", args);
  return stdout.trim().split("\n").filter(Boolean);
};

/**
 * Determine file status:
 * - "committed": file differs from base AND the later version is in a commit (not working copy)
 *   OR the file is in the working copy but has been committed since base (appears in log)
 * - "staged": file is in the git index and the staged version matches what we analysed
 * - "local": file has local modifications not yet staged
 */
type FileStatus = "committed" | "local" | "staged";

type FileStatuses = Map<string, FileStatus>;

const getFileStatuses = async (): Promise<FileStatuses> => {
  if (later !== ".") {
    // comparing two revisions — everything is committed
    return new Map();
  }

  const [{ stdout: staged }, { stdout: unstaged }, { stdout: committed }] =
    await Promise.all([
      execFileAsync("git", ["diff", "--cached", "--name-only"]),
      execFileAsync("git", ["diff", "--name-only"]),
      execFileAsync("git", [
        "diff",
        "--name-only",
        base,
        "HEAD",
        "--",
        `${dir}/*.png`,
        `${dir}/**/*.png`,
      ]),
    ]);

  const stagedSet = new Set(staged.trim().split("\n").filter(Boolean));
  const unstagedSet = new Set(unstaged.trim().split("\n").filter(Boolean));
  const committedSet = new Set(committed.trim().split("\n").filter(Boolean));

  const result: FileStatuses = new Map();
  for (const file of [...stagedSet, ...unstagedSet, ...committedSet]) {
    if (
      committedSet.has(file) &&
      !unstagedSet.has(file) &&
      !stagedSet.has(file)
    ) {
      result.set(file, "committed");
    } else if (stagedSet.has(file) && !unstagedSet.has(file)) {
      result.set(file, "staged");
    } else {
      result.set(file, "local");
    }
  }
  return result;
};

const getFileAtRevision = async (
  rev: string,
  file: string,
): Promise<Buffer | undefined> => {
  if (rev === ".") {
    try {
      return await readFile(file);
    } catch {
      return undefined;
    }
  }
  try {
    const { stdout } = await execFileAsync("git", ["show", `${rev}:${file}`], {
      encoding: "buffer",
      maxBuffer: 10 * 1_024 * 1_024,
    });
    return stdout;
  } catch {
    return undefined;
  }
};

// ── Concurrency pool ─────────────────────────────────────────────────────────

const withPool = async <T>(
  items: T[],
  concurrency: number,
  fn: (item: T) => Promise<void>,
) => {
  let index = 0;
  const next = async (): Promise<void> => {
    const i = index++;
    if (i >= items.length) return;
    await fn(items[i]);
    return next();
  };
  await Promise.all(Array.from({ length: concurrency }, () => next()));
};

// ── Comparison ───────────────────────────────────────────────────────────────

type CompareResult = {
  file: string;
  suite: string;
  status: FileStatus;
  diffPixels: number;
  totalPixels: number;
  pct: number;
  size: string;
};

const suiteFromPath = (file: string): string => {
  const match = file.match(/\/(?<suite>[^/]+)\.spec\.ts-snapshots\//);
  return match?.groups?.suite ?? "unknown";
};

const suiteColours: Record<string, string> = {
  roomSnapshots: "blue",
  menuSnapshotsDialogs: "magenta",
  menuSnapshotsInGame: "magenta",
  menuSnapshotsMainMenu: "magenta",
  lutSnapshot: "yellow",
  spritesPage: "cyan",
  offlineCampaignCache: "green",
};

const statusColour = (status: FileStatus): string => {
  switch (status) {
    case "committed":
      return "green";
    case "staged":
      return "#FFA500";
    case "local":
      return "gray";
  }
};

const compareFile = async (
  file: string,
  fileStatuses: FileStatuses,
): Promise<CompareResult | undefined> => {
  const [baseBuffer, laterBuffer] = await Promise.all([
    getFileAtRevision(base, file),
    getFileAtRevision(later, file),
  ]);

  if (baseBuffer === undefined || laterBuffer === undefined) return undefined;

  const img1 = PNG.sync.read(baseBuffer);
  const img2 = PNG.sync.read(laterBuffer);
  const status = fileStatuses.get(file) ?? "local";

  if (img1.width !== img2.width || img1.height !== img2.height) {
    const totalPixels = Math.max(
      img1.width * img1.height,
      img2.width * img2.height,
    );
    return {
      file,
      suite: suiteFromPath(file),
      status,
      diffPixels: totalPixels,
      totalPixels,
      pct: 100,
      size: `${img1.width}x${img1.height}\u2192${img2.width}x${img2.height}`,
    };
  }

  const { width, height } = img1;
  const totalPixels = width * height;
  if (totalPixels === 0) return undefined;

  const diffPixels = pixelmatch(
    img1.data,
    img2.data,
    undefined,
    width,
    height,
    { threshold: 0 },
  );

  const pct = (diffPixels / totalPixels) * 100;

  return {
    file,
    suite: suiteFromPath(file),
    status,
    diffPixels,
    totalPixels,
    pct,
    size: `${width}x${height}`,
  };
};

// ── List rows ────────────────────────────────────────────────────────────────

type BrowserEntry = { browser: string; status: FileStatus };

type ListRow = {
  pct: string;
  changed: string;
  size: string;
  suite: string;
  filename: string;
  browsers: BrowserEntry[];
};

/** bin pct to nearest 0.1% */
const binPct = (pct: number): string =>
  `${(Math.round(pct * 10) / 10).toFixed(1)}%`;

/**
 * Build a flat list of rows — one per unique filename. Files from
 * different browsers with matching pct/size/suite are grouped into
 * a single row with multiple browser entries.
 */
const buildRows = (results: CompareResult[]): ListRow[] => {
  const sorted = results
    .filter((r) => r.diffPixels > 0)
    .sort((a, b) => b.pct - a.pct)
    .slice(0, limit);

  const rows: (ListRow & { key: string })[] = [];
  for (const r of sorted) {
    const pct = binPct(r.pct);
    const changed = formatPixels(r.diffPixels);
    const filename = basename(r.file, ".png");
    const browser = basename(dirname(r.file));
    const key = `${pct}|${changed}|${r.size}|${r.suite}|${filename}`;

    const last = rows[rows.length - 1];
    if (last && last.key === key) {
      last.browsers.push({ browser, status: r.status });
    } else {
      rows.push({
        pct,
        changed,
        size: r.size,
        suite: r.suite,
        filename,
        browsers: [{ browser, status: r.status }],
        key,
      });
    }
  }
  return rows;
};

const formatPixels = (n: number): string =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M`
  : n >= 1_000 ? `${(n / 1_000).toFixed(1)}k`
  : String(n);

// ── Ink UI ───────────────────────────────────────────────────────────────────

const progressBar = (fraction: number, width: number): string => {
  const filled = Math.round(fraction * width);
  return "\u2588".repeat(filled) + "\u2591".repeat(width - filled);
};

type ColWidths = {
  pct: number;
  changed: number;
  size: number;
  suite: number;
  filename: number;
};

const computeColWidths = (rows: ListRow[]): ColWidths => ({
  pct: Math.max(1, ...rows.map((r) => r.pct.length)),
  changed: Math.max(7, ...rows.map((r) => r.changed.length)),
  size: Math.max(4, ...rows.map((r) => r.size.length)),
  suite: Math.max(5, ...rows.map((r) => r.suite.length)),
  filename: Math.max(4, ...rows.map((r) => r.filename.length)),
});

const RowItem = ({
  row,
  colWidths,
  selected,
}: {
  row: ListRow;
  colWidths: ColWidths;
  selected: boolean;
}) =>
  React.createElement(
    Box,
    null,
    React.createElement(
      Text,
      { color: selected ? "white" : undefined },
      selected ? "\u25b6 " : "  ",
    ),
    React.createElement(
      Text,
      { color: selected ? "white" : undefined, bold: selected },
      `${row.pct.padStart(colWidths.pct)}  ${row.changed.padStart(colWidths.changed)}  ${row.size.padEnd(colWidths.size)}  `,
    ),
    React.createElement(
      Text,
      { color: suiteColours[row.suite] ?? "gray" },
      row.suite.padEnd(colWidths.suite) + "  ",
    ),
    React.createElement(
      Text,
      { bold: selected },
      row.filename.padEnd(colWidths.filename) + "  ",
    ),
    // browsers with status colouring
    React.createElement(Text, null, "("),
    ...row.browsers.flatMap((b, i) => [
      ...(i > 0 ? [React.createElement(Text, { key: `sep-${i}` }, ", ")] : []),
      React.createElement(
        Text,
        { key: `b-${i}`, color: statusColour(b.status) },
        b.browser,
      ),
    ]),
    React.createElement(Text, null, ")"),
  );

const App = ({ changedFiles }: { changedFiles: string[] }) => {
  const { exit } = useApp();
  const { height: termHeight } = useScreenSize();
  const listRef = useRef<ScrollListRef>(null);
  const [processed, setProcessed] = useState(0);
  const [results, setResults] = useState<CompareResult[]>([]);
  const [done, setDone] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const run = async () => {
      const fileStatuses = await getFileStatuses();
      await withPool(changedFiles, parallelism, async (file) => {
        const result = await compareFile(file, fileStatuses);
        setProcessed((p) => p + 1);
        if (result && result.diffPixels > 0) {
          setResults((prev) => [...prev, result]);
        }
      });
      setDone(true);
    };
    run();
  }, [changedFiles]);

  const rows = buildRows(results);
  const colWidths = computeColWidths(rows);

  // 2 lines for status bar + table header
  const listHeight = Math.max(1, termHeight - 2);

  useInput((input, key) => {
    if (input === "q" || (key.ctrl && input === "c")) {
      exit();
      return;
    }
    if (key.upArrow || input === "k") {
      setSelectedIndex((i) => Math.max(0, i - 1));
    }
    if (key.downArrow || input === "j") {
      setSelectedIndex((i) => Math.min(rows.length - 1, i + 1));
    }
    if (key.pageUp || input === "b") {
      setSelectedIndex((i) => Math.max(0, i - listHeight));
    }
    if (key.pageDown || input === "f") {
      setSelectedIndex((i) => Math.min(rows.length - 1, i + listHeight));
    }
    if (input === "g" || input === "s") {
      setSelectedIndex(0);
    }
    if (input === "G" || input === "e") {
      setSelectedIndex(Math.max(0, rows.length - 1));
    }
  });

  const fraction =
    changedFiles.length > 0 ? processed / changedFiles.length : 0;

  const keys = "\u2191\u2193/jk move  f/b page  s/e start/end  q quit";
  const statusLine =
    done ?
      `${rows.length} rows  |  ${base} vs ${later === "." ? "working copy" : later}  |  ${keys}`
    : `${progressBar(fraction, 20)} ${processed}/${changedFiles.length} (${results.length} changed)`;

  return React.createElement(
    FullScreenBox,
    { flexDirection: "column" },
    // status bar
    React.createElement(
      Box,
      null,
      React.createElement(
        Text,
        { color: done ? "green" : "yellow", bold: true },
        statusLine,
      ),
    ),
    // table header
    rows.length > 0 &&
      React.createElement(
        Box,
        null,
        React.createElement(
          Text,
          { color: "cyan", bold: true },
          `  ${"%".padStart(colWidths.pct)}  ${"changed".padStart(colWidths.changed)}  ${"size".padEnd(colWidths.size)}  ${"suite".padEnd(colWidths.suite)}  ${"file".padEnd(colWidths.filename)}  browsers`,
        ),
      ),
    // scrollable list + scrollbar
    React.createElement(
      Box,
      { flexDirection: "row", flexGrow: 1 },
      React.createElement(
        ScrollList,
        {
          ref: listRef,
          height: listHeight,
          selectedIndex,
          scrollAlignment: "auto",
          onScroll: setScrollOffset,
          onContentHeightChange: setContentHeight,
        },
        ...rows.map((row, i) =>
          React.createElement(RowItem, {
            key: i,
            row,
            colWidths,
            selected: i === selectedIndex,
          }),
        ),
      ),
      React.createElement(ScrollBar, {
        placement: "inset",
        style: "block",
        contentHeight,
        viewportHeight: listHeight,
        scrollOffset,
        autoHide: true,
        color: "gray",
      }),
    ),
  );
};

// ── Main ─────────────────────────────────────────────────────────────────────

const main = async () => {
  const changedFiles = await getChangedFiles();
  if (changedFiles.length === 0) {
    const displayLater = later === "." ? "working copy" : later;
    console.log(
      `No screenshot changes detected between ${base} and ${displayLater}`,
    );
    process.exit(0);
  }

  const instance = render(React.createElement(App, { changedFiles }));
  await instance.waitUntilExit();
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
