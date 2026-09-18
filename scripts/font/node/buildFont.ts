import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

import { type designFor } from "../geometry/fontDesign";

export const outputDir = "src/_generated/font";
export const manifestPath = `${outputDir}/manifest.json`;
export const smoothManifestPath = `${outputDir}/manifest-smooth.json`;

/**
 * woff2 is what the game loads. ttf is the same font in the flavour an os can
 * install - macOS Font Book, and every desktop app that goes through it,
 * cannot read woff2
 */
export type FontFormat = "ttf" | "woff2";

export const isFontFormat = (value: string): value is FontFormat =>
  value === "ttf" || value === "woff2";

export const outputPath = (format: FontFormat) =>
  `${outputDir}/blockstack-head-over-heels.${format}`;

export const smoothOutputPath = (format: FontFormat) =>
  `${outputDir}/blockstack-head-over-heels-smooth.${format}`;

const builderScript = "scripts/font/buildVariableFont.py";
const requirementsPath = "scripts/font/requirements.txt";

// a dedicated venv, self-bootstrapped below - avoids PEP 668's "externally
// managed environment" block on installing into the system python (eg via
// Homebrew on macOS). Override with PYTHON=/path/to/python to use a
// different install instead
const venvDir = "scripts/font/.venv";
const venvPython = `${venvDir}/bin/python`;
const python = process.env.PYTHON ?? venvPython;

// the committed manifest is the design plus a `builtAt` unix timestamp. The
// builder bakes builtAt into head.modified, so the font's version stamp only
// advances when the design genuinely changes (and the build is otherwise
// deterministic - an unchanged design rebuilds to identical bytes)
const committedDesign = (fromManifestPath: string): unknown => {
  if (!existsSync(fromManifestPath)) {
    return undefined;
  }
  try {
    const parsed = JSON.parse(readFileSync(fromManifestPath, "utf8"));
    delete parsed.builtAt;
    return parsed;
  } catch {
    return undefined;
  }
};

const hasToolchain = (forPython: string): boolean => {
  try {
    // every module requirements.txt pins, so a venv from before one was added
    // is rebuilt rather than failing part way through the build
    execFileSync(forPython, ["-c", "import fontTools, brotli, pathops"], {
      stdio: "ignore",
    });
    return true;
  } catch {
    return false;
  }
};

/**
 * bootstrap {@link venvDir} and install the pinned toolchain into it, so
 * `pnpm gen:font` works with no manual python setup. Only attempted when the
 * caller hasn't overridden PYTHON to point somewhere else.
 */
const bootstrapVenv = () => {
  console.log(`setting up python toolchain in ${venvDir}...`);
  try {
    execFileSync("python3", ["-m", "venv", venvDir], { stdio: "inherit" });
    execFileSync(
      venvPython,
      ["-m", "pip", "install", "-q", "-r", requirementsPath],
      { stdio: "inherit" },
    );
  } catch (e) {
    throw new Error(
      `could not set up the font builder's python toolchain in ${venvDir}. ` +
        `Install python 3 (eg via Homebrew), then re-run pnpm gen:font`,
      { cause: e },
    );
  }
};

// fail with an actionable message rather than a raw ENOENT or Python traceback
// when the build toolchain isn't installed
const ensurePythonToolchain = () => {
  if (hasToolchain(python)) {
    return;
  }
  if (python === venvPython) {
    bootstrapVenv();
    if (hasToolchain(python)) {
      return;
    }
  }
  throw new Error(
    `the font builder's python dependencies are missing at ${python}. ` +
      `Install them with: ${python} -m pip install -r ${requirementsPath} ` +
      `(or unset PYTHON to let gen:font manage its own venv)`,
  );
};

export const buildIfChanged = (
  builtDesign: ReturnType<typeof designFor>,
  toManifestPath: string,
  toOutputPath: string,
  forceRebuild: boolean,
) => {
  if (
    !forceRebuild &&
    existsSync(toOutputPath) &&
    JSON.stringify(committedDesign(toManifestPath)) ===
      JSON.stringify(builtDesign)
  ) {
    console.log(
      `🅵 font unchanged (${builtDesign.glyphs.length} glyphs) - kept existing ${toOutputPath}`,
    );
    return;
  }
  ensurePythonToolchain();
  mkdirSync(dirname(toOutputPath), { recursive: true });
  // the manifest describes the design, not the file built from it, so a build
  // that only wants another format of an unchanged design keeps the committed
  // timestamp - both formats then carry the same version stamp
  const designChanged =
    JSON.stringify(committedDesign(toManifestPath)) !==
    JSON.stringify(builtDesign);
  if (designChanged) {
    const builtAt = Math.floor(Date.now() / 1_000);
    writeFileSync(
      toManifestPath,
      JSON.stringify({ ...builtDesign, builtAt }, null, 2),
    );
  }
  // opentype.js can neither write glyf outlines nor a working gvar, and a
  // hand-assembled variable font is silently not animated by Chromium; fontTools
  // (varLib) builds one that is. See scripts/font/buildVariableFont.py.
  execFileSync(python, [builderScript, toManifestPath, toOutputPath], {
    stdio: "inherit",
  });
};
