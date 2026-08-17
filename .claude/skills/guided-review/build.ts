#!/usr/bin/env node
/* Build the guided-review page from an authored groups json.
 *
 * The only part of a guided review that needs judgement is the grouping and the
 * per-file notes; everything else - collecting diffs, stripping headers,
 * counting lines, computing github anchors, inlining the font and the ui - is
 * mechanical and happens here.
 *
 *   node build.ts --groups review.json --out review.html --mode worktree
 *   node build.ts --groups review.json --out review.html --mode commit --ref <sha> \
 *                 --github https://github.com/owner/repo/commit/<sha>
 *   node build.ts --groups review.json --out review.html --mode pr \
 *                 --base origin/main --head origin/my-branch \
 *                 --github https://github.com/owner/repo/pull/12/files
 *
 * The groups json is `{"meta": {...}, "groups": [{title, blurb, items: [{path,
 * status, note}]}]}`. meta takes title, headerTitle, eyebrow, lede, facts (a
 * list of html strings, appended after the file and line counts) and footer;
 * lede and footer may contain html.
 */

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { parseArgs } from "node:util";

import { buildPage } from "./buildPage.ts";
import {
  type ReviewGroup,
  type ReviewMeta,
  type ReviewPayload,
  type Side,
} from "./src/ReviewPayload.ts";

/** the reviewed repo's own pixel font, if it has one - harmless if absent */
const defaultFont = "src/_generated/font/blockstack-head-over-heels.woff2";

type Mode = "commit" | "pr" | "worktree";

type Options = {
  groups: string;
  out: string;
  mode: Mode;
  ref?: string;
  base?: string;
  head?: string;
  pr?: string;
  github?: string;
  repo?: string;
  id?: string;
  font?: string;
  maxDiffLines: number;
  maxSideLines: number;
};

const usage = (): never => {
  console.log(
    [
      "build.ts --groups <authored.json> --out <review.html> --mode worktree|commit|pr",
      "  --ref <sha>                commit mode: what to show",
      "  --base <ref> --head <ref>  pr mode: what to diff",
      "  --pr <number>              per-file links point at its Files changed tab",
      "  --github <url>|none        base url for those links (derived from origin otherwise)",
      "  --repo <dir>               repo root (default: git toplevel)",
      "  --id <name>                names the directory a served review keeps ticks and notes in",
      "  --font <woff2>             inlined as the display face",
      "  --max-diff-lines <n>       patch lines kept per file (default 400)",
      "  --max-side-lines <n>       longer files keep only their patch (default 2000)",
    ].join("\n"),
  );
  process.exit(1);
};

const parseOptions = (): Options => {
  const { values } = parseArgs({
    options: {
      groups: { type: "string" },
      out: { type: "string" },
      mode: { type: "string" },
      ref: { type: "string" },
      base: { type: "string" },
      head: { type: "string" },
      pr: { type: "string" },
      github: { type: "string" },
      repo: { type: "string" },
      id: { type: "string" },
      font: { type: "string" },
      "max-diff-lines": { type: "string", default: "400" },
      "max-side-lines": { type: "string", default: "2000" },
      help: { type: "boolean", default: false },
    },
  });

  if (values.help === true) {
    usage();
  }
  const { groups, out, mode } = values;
  if (groups === undefined || out === undefined || mode === undefined) {
    throw new Error("--groups, --out and --mode are all required");
  }
  if (mode !== "worktree" && mode !== "commit" && mode !== "pr") {
    throw new Error(`--mode must be worktree, commit or pr, not ${mode}`);
  }
  if (mode === "commit" && values.ref === undefined) {
    throw new Error("commit mode needs --ref");
  }
  if (mode === "pr" && (values.base === undefined || values.head === undefined)) {
    throw new Error("pr mode needs --base and --head");
  }

  return {
    groups,
    out,
    mode,
    ref: values.ref,
    base: values.base,
    head: values.head,
    pr: values.pr,
    github: values.github,
    repo: values.repo,
    id: values.id,
    font: values.font,
    maxDiffLines: Number(values["max-diff-lines"]),
    maxSideLines: Number(values["max-side-lines"]),
  };
};

const git = (repo: string, ...args: string[]): string => {
  try {
    return execFileSync("git", args, { cwd: repo, encoding: "utf8", maxBuffer: 512 * 1_024 * 1_024 });
  } catch (error) {
    const failure = error as { status?: number; stdout?: string; stderr?: string };
    // diff exits 1 whenever there are differences, which is the normal case here
    if (failure.status === 1) {
      return failure.stdout ?? "";
    }
    throw new Error(`git ${args.join(" ")} failed:\n${failure.stderr ?? ""}`, { cause: error });
  }
};

/** the content of a path at a rev, or empty when it didn't exist there */
const gitShow = (repo: string, spec: string): string => {
  try {
    return execFileSync("git", ["show", spec], {
      cwd: repo,
      encoding: "utf8",
      maxBuffer: 512 * 1_024 * 1_024,
      stdio: ["ignore", "pipe", "ignore"],
    });
  } catch {
    return "";
  }
};

const sha256 = (text: string): string => createHash("sha256").update(text, "utf8").digest("hex");

const diffFor = (repo: string, options: Options, path: string, status: string): string => {
  if (options.mode === "commit") {
    return git(repo, "show", options.ref ?? "", "--", path);
  }
  if (options.mode === "pr") {
    return git(repo, "diff", `${options.base}...${options.head}`, "--", path);
  }
  // worktree: untracked files have no index entry, so diff them against nothing
  if (status.startsWith("A") && git(repo, "ls-files", "--", path).trim() === "") {
    return git(repo, "diff", "--no-index", "--", "/dev/null", path);
  }
  return git(repo, "diff", "--", path);
};

/** the file's whole before and after, for monaco's diff editor to work from */
const sidesFor = (repo: string, options: Options, path: string): { before: string; after: string } => {
  if (options.mode === "commit") {
    return {
      before: gitShow(repo, `${options.ref}^:${path}`),
      after: gitShow(repo, `${options.ref}:${path}`),
    };
  }
  if (options.mode === "pr") {
    return {
      before: gitShow(repo, `${options.base}:${path}`),
      after: gitShow(repo, `${options.head}:${path}`),
    };
  }
  const onDisk = join(repo, path);
  return {
    before: gitShow(repo, `HEAD:${path}`),
    after: existsSync(onDisk) && statSync(onDisk).isFile() ? readFileSync(onDisk, "utf8") : "",
  };
};

const slug = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);

/**
 * what this review *is*, as a directory name.
 *
 * Derived from the scope rather than from where the html happens to be written,
 * so the same review rebuilt tomorrow - a fresh scratchpad, another port - finds
 * the ticks and notes it already has. The scope deliberately excludes the file
 * list: a pr picking up another commit is still that pr, and the reader's
 * progress through it should survive
 */
const reviewId = (repo: string, options: Options): string => {
  if (options.id !== undefined) {
    return options.id;
  }

  const scope =
    options.mode === "commit" ? `commit-${options.ref}`
    : options.mode === "pr" ?
      options.pr !== undefined ?
        `pr-${options.pr}`
      : `pr-${options.base}-${options.head}`
    : `worktree-${git(repo, "rev-parse", "--abbrev-ref", "HEAD").trim()}`;

  // the repository, not this checkout of it: a pr reviewed from a worktree and
  // from the main checkout is the same review, and should resume as one
  const common = git(repo, "rev-parse", "--path-format=absolute", "--git-common-dir").trim();
  const home = common === "" ? resolve(repo) : dirname(common);

  // the hash disambiguates two repos of the same name; the readable half is for
  // whoever is looking at the directory
  const name = home.slice(home.lastIndexOf("/") + 1);
  return `${slug(name)}-${slug(scope)}-${sha256(`${home}|${scope}`).slice(0, 8)}`;
};

/** where this change can be read on the forge, from the origin remote */
const webUrl = (repo: string, options: Options): string | undefined => {
  if (options.github === "none" || options.mode === "worktree") {
    return undefined;
  }
  if (options.github !== undefined) {
    return options.github;
  }

  const remote = git(repo, "remote", "get-url", "origin").trim();
  // git@host:owner/name.git, https://host/owner/name.git, ssh://git@host/owner/name
  const match = /(?:@|\/\/)(?<host>[^/:]+)[/:](?<owner>[^/]+)\/(?<name>.+?)(?:\.git)?$/.exec(remote);
  if (match?.groups === undefined || !match.groups.host?.includes("github")) {
    // every other forge anchors its diffs differently; the page carries the
    // diffs anyway, so no link is better than a wrong one
    return undefined;
  }

  const base = `https://${match.groups.host}/${match.groups.owner}/${match.groups.name}`;
  if (options.pr !== undefined) {
    return `${base}/pull/${options.pr}/files`;
  }
  if (options.mode === "commit") {
    return `${base}/commit/${options.ref}`;
  }
  return `${base}/compare/${options.base}...${options.head}`;
};

/** a trailing newline ends the last line rather than starting an empty one */
const linesOf = (text: string): string[] => {
  const lines = text.split("\n");
  return lines.at(-1) === "" ? lines.slice(0, -1) : lines;
};

/** drop everything before the first hunk - the path is already on the row */
const stripHeader = (diff: string): string => {
  const lines = linesOf(diff);
  const firstHunk = lines.findIndex((line) => line.startsWith("@@"));
  if (firstHunk !== -1) {
    return lines.slice(firstHunk).join("\n");
  }
  // no hunks (mode change, pure rename): keep whatever git said
  return lines.filter((line) => !line.startsWith("index ")).join("\n");
};

const counts = (diff: string): [number, number] => {
  const lines = linesOf(diff);
  return [
    lines.filter((line) => line.startsWith("+") && !line.startsWith("+++")).length,
    lines.filter((line) => line.startsWith("-") && !line.startsWith("---")).length,
  ];
};

const truncate = (diff: string, limit: number): string => {
  const lines = linesOf(diff);
  if (lines.length <= limit) {
    return diff;
  }
  const dropped = lines.length - limit;
  return [
    ...lines.slice(0, limit),
    `… ${dropped} more lines - read this one in the file itself`,
  ].join("\n");
};

const page = (payload: ReviewPayload, script: string, css: string): string =>
  // no literal `<` reaches the document: `</script>` would close the block
  // early, and a reviewed file that quotes serve.ts's `<!--REVIEW_SERVER-->`
  // marker would otherwise have a script injected into the middle of the
  // payload. \u003c is a valid json escape, so the parser undoes this for free
  [
    // without the charset (and utf-8 in and out of every file here) a file://
    // open guesses windows-1252, and every dash and arrow turns to mojibake
    `<meta charset="utf-8" />`,
    `<title>guided review</title>`,
    `<style>${css}</style>`,
    `<div id="app"></div>`,
    // serve.ts replaces this with the page's window.__reviewServer bootstrap
    `<!--REVIEW_SERVER-->`,
    `<script type="application/json" id="payload">${JSON.stringify(payload).replaceAll("<", "\\u003c")}</script>`,
    `<script type="module">${script}</script>`,
    "",
  ].join("\n");

const main = async (): Promise<void> => {
  const options = parseOptions();
  const repo = options.repo ?? git(process.cwd(), "rev-parse", "--show-toplevel").trim();

  const authored = JSON.parse(readFileSync(options.groups, "utf8")) as {
    meta?: ReviewMeta;
    groups: ReviewGroup[];
  };
  const {groups} = authored;
  const meta = authored.meta ?? { title: "guided review" };

  const diffs: Record<string, string> = {};
  const sides: Record<string, Side> = {};
  const stats: Record<string, [number, number]> = {};
  const links: Record<string, string> = {};
  const empty: string[] = [];
  const forge = webUrl(repo, options);

  for (const group of groups) {
    for (const item of group.items) {
      const { path, status } = item;
      const body = stripHeader(diffFor(repo, options, path, status));
      if (body.trim() === "") {
        empty.push(path);
      }
      stats[path] = counts(body);
      diffs[path] = truncate(body, options.maxDiffLines);

      // whole-file sides feed monaco's diff editor; past the cap it is cheaper
      // (and no less readable) to leave that file on the patch
      const side = sidesFor(repo, options, path);
      const longest = Math.max(
        side.before.split("\n").length - 1,
        side.after.split("\n").length - 1,
      );
      if (longest <= options.maxSideLines) {
        // the hash lets a served page refuse to save over a file that moved on
        // disk after the review was built
        sides[path] = { ...side, sha: sha256(side.after) };
      }

      if (forge !== undefined) {
        links[path] = `${forge}#diff-${sha256(path)}`;
      }
    }
  }

  const fontPath = options.font ?? join(repo, defaultFont);
  const font = existsSync(fontPath) ? readFileSync(fontPath).toString("base64") : "";

  const id = reviewId(repo, options);
  const { script, css } = await buildPage();
  const html = page({ id, meta, groups, diffs, sides, stats, links }, script, css.replace("FONT_B64", font));

  writeFileSync(options.out, html, "utf8");

  const totals = Object.values(stats).reduce(
    ([added, removed], [fileAdded, fileRemoved]) => [added + fileAdded, removed + fileRemoved],
    [0, 0],
  );
  console.log(`${Object.keys(diffs).length} files  +${totals[0]} −${totals[1]}`);
  console.log(`wrote ${options.out}  (${Math.round(Buffer.byteLength(html) / 1_024)} KiB)`);
  console.log(`links   ${forge ?? "none (nothing to link to)"}`);
  console.log(`id      ${id}  (ticks and notes live in a directory of this name)`);
  if (empty.length > 0) {
    console.error(`warning: no diff found for ${empty.length} file(s):`);
    for (const path of empty) {
      console.error(`  ${path}`);
    }
  }
};

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
