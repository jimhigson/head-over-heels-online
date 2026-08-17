/* Everything mechanical about collecting one review and assembling the page,
 * shared by build.ts (one review, possibly aware of its stack) and
 * buildStack.ts (every authored review of a stack in one page).
 */

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { imageMimeOf, isImagePath } from "./src/imagePaths.ts";
import {
  type ImageRow,
  type ImageVersion,
  type ReviewGroup,
  type ReviewMeta,
  type ReviewPayload,
  type ReviewShell,
} from "./src/ReviewPayload.ts";

/** the reviewed repo's own pixel font, if it has one - harmless if absent */
export const defaultFont = "src/_generated/font/blockstack-head-over-heels.woff2";

export type Mode = "commit" | "pr" | "worktree";

/** what collecting one review needs to know; build.ts's CLI maps onto this */
export type ReviewOptions = {
  mode: Mode;
  ref?: string;
  base?: string;
  head?: string;
  pr?: string;
  github?: string;
  id?: string;
  maxSideLines: number;
  maxImages: number;
};

export const git = (repo: string, ...args: string[]): string => {
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

export const sha256 = (text: string): string =>
  createHash("sha256").update(text, "utf8").digest("hex");

/** the raw bytes of a path at a rev, or undefined when it didn't exist there */
const gitShowBytes = (repo: string, spec: string): Buffer | undefined => {
  try {
    return execFileSync("git", ["show", spec], {
      cwd: repo,
      maxBuffer: 512 * 1_024 * 1_024,
      stdio: ["ignore", "pipe", "ignore"],
    });
  } catch {
    return undefined;
  }
};

/** where an image version's bytes come from, per chooser column */
type ImageVersionSource = {
  label: string;
  description: string;
  bytesOf: (path: string) => Buffer | undefined;
};

export const shortRef = (ref: string): string => {
  // the fetched head of a stacked pr reads better as its number
  const pulledPr = /^refs\/review\/pr(?<number>\d+)$/.exec(ref);
  if (pulledPr?.groups?.number !== undefined) {
    return `#${pulledPr.groups.number}`;
  }
  return ref.replace(/^origin\//, "");
};

/**
 * The comparable versions of every image in this review, oldest first, plus
 * which columns a comparison starts on. The production column is the latest
 * release tag wherever one exists; the rest follow the mode - a pr compares
 * its base to its head, a commit its parent to itself, and a working tree
 * HEAD to the index and the disk.
 */
const imageVersionSources = (
  repo: string,
  options: ReviewOptions,
): { sources: ImageVersionSource[]; fromLabel: string; toLabel: string } => {
  const sources: ImageVersionSource[] = [];
  const atRef =
    (ref: string) =>
    (path: string): Buffer | undefined =>
      gitShowBytes(repo, `${ref}:${path}`);

  const [productionTag] = git(repo, "tag", "--sort=-v:refname").split("\n").filter(Boolean);
  if (productionTag !== undefined) {
    sources.push({
      label: "production",
      description: `the latest release tag (${productionTag})`,
      bytesOf: atRef(productionTag),
    });
  }

  if (options.mode === "pr") {
    const base = options.base ?? "";
    const head = options.head ?? "";
    sources.push(
      {
        label: shortRef(base),
        description: `the pr base (${base})`,
        bytesOf: atRef(base),
      },
      {
        label: "branch",
        description: `the pr head (${head})`,
        bytesOf: atRef(head),
      },
    );
    return { sources, fromLabel: shortRef(base), toLabel: "branch" };
  }

  // origin/main earns a column of its own in the modes whose scope doesn't
  // already include it
  if (git(repo, "rev-parse", "--verify", "--quiet", "origin/main").trim() !== "") {
    sources.push({
      label: "main",
      description: "the local origin/main ref",
      bytesOf: atRef("origin/main"),
    });
  }

  if (options.mode === "commit") {
    const ref = options.ref ?? "";
    sources.push(
      {
        label: "parent",
        description: `the commit's parent (${ref}^)`,
        bytesOf: atRef(`${ref}^`),
      },
      {
        label: "commit",
        description: `the reviewed commit (${ref})`,
        bytesOf: atRef(ref),
      },
    );
    return { sources, fromLabel: "parent", toLabel: "commit" };
  }

  sources.push(
    { label: "head", description: "the HEAD commit", bytesOf: atRef("HEAD") },
    {
      label: "stage",
      description: "the git index (staged content)",
      bytesOf: (path) => gitShowBytes(repo, `:${path}`),
    },
    {
      label: "working",
      description: "the file on disk in the working tree",
      bytesOf(path) {
        const onDisk = join(repo, path);
        return existsSync(onDisk) && statSync(onDisk).isFile() ? readFileSync(onDisk) : undefined;
      },
    },
  );
  return { sources, fromLabel: "head", toLabel: "working" };
};

/**
 * one image's chooser columns and their distinct blobs: byte-identical
 * versions share a blob, so a version that didn't change costs nothing extra
 */
const imageRowFor = (
  sources: ImageVersionSource[],
  fromLabel: string,
  toLabel: string,
  path: string,
  blockId: string,
): { row: ImageRow; blobs: Buffer[] } => {
  const blobs: Buffer[] = [];
  const versions: ImageVersion[] = [];
  for (const source of sources) {
    const bytes = source.bytesOf(path);
    if (bytes === undefined || bytes.length === 0) {
      continue;
    }
    const existing = blobs.findIndex((blob) => blob.equals(bytes));
    versions.push({
      label: source.label,
      description: source.description,
      blob: existing === -1 ? blobs.push(bytes) - 1 : existing,
      bytes: bytes.length,
    });
  }

  const indexOfLabel = (label: string): number =>
    versions.findIndex((version) => version.label === label);
  const explicitTo = indexOfLabel(toLabel);
  // a deleted file has no newest version; the last one it did have stands in
  const to = explicitTo !== -1 ? explicitTo : versions.length - 1;
  const explicitFrom = indexOfLabel(fromLabel);
  const from =
    explicitFrom !== -1 && explicitFrom !== to ? explicitFrom
    : to > 0 ? to - 1
    : to;

  return { row: { block: blockId, versions, from, to }, blobs };
};

const diffFor = (repo: string, options: ReviewOptions, path: string, status: string): string => {
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
const sidesFor = (
  repo: string,
  options: ReviewOptions,
  path: string,
): { before: string; after: string } => {
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
export const reviewId = (repo: string, options: ReviewOptions): string => {
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
export const webUrl = (repo: string, options: ReviewOptions): string | undefined => {
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

/** json escaped to sit inside an inline script block: no literal `<` survives,
    so a reviewed file can never close the block early or inject into it */
export const jsonBlock = (elementId: string, value: unknown): string =>
  `<script type="application/json" id="${elementId}">${JSON.stringify(value).replaceAll("<", "\\u003c")}</script>`;

export type AuthoredGroups = {
  meta?: ReviewMeta;
  groups: ReviewGroup[];
};

export type CollectedReview = {
  payload: ReviewPayload;
  /** one inert block per embedded image, ids under `imageBlockPrefix` */
  imageBlocks: string[];
  forge: string | undefined;
  /** paths whose diff came back empty - usually a stale path in the groups */
  empty: string[];
  imageBytes: number;
  imagesOmitted: number;
};

/** every mechanical part of one review: diffs, sides, stats, links, images */
export const collectReview = (
  repo: string,
  options: ReviewOptions,
  authored: AuthoredGroups,
  /** unique per review in the page, so image block ids can't collide */
  imageBlockPrefix: string,
): CollectedReview => {
  const { groups } = authored;
  const meta = authored.meta ?? { title: "guided review" };

  const sides: Record<string, ReviewPayload["sides"][string]> = {};
  const stats: Record<string, [number, number]> = {};
  const links: Record<string, string> = {};
  const images: Record<string, ImageRow> = {};
  const imageBlocks: string[] = [];
  const empty: string[] = [];
  let imagesOmitted = 0;
  let imageBytes = 0;
  const forge = webUrl(repo, options);
  const imageSources = imageVersionSources(repo, options);

  for (const group of groups) {
    for (const item of group.items) {
      const { path, status } = item;

      if (isImagePath(path)) {
        stats[path] = [0, 0];
        if (forge !== undefined) {
          links[path] = `${forge}#diff-${sha256(path)}`;
        }
        if (imageBlocks.length >= options.maxImages) {
          imagesOmitted += 1;
          images[path] = { block: "", versions: [], from: 0, to: 0 };
          continue;
        }
        const blockId = `${imageBlockPrefix}-${imageBlocks.length}`;
        const { row, blobs } = imageRowFor(
          imageSources.sources,
          imageSources.fromLabel,
          imageSources.toLabel,
          path,
          blockId,
        );
        images[path] = row;
        const uris = blobs.map(
          (blob) => `data:${imageMimeOf(path)};base64,${blob.toString("base64")}`,
        );
        imageBytes += blobs.reduce((sum, blob) => sum + blob.length, 0);
        imageBlocks.push(jsonBlock(blockId, uris));
        continue;
      }

      const body = stripHeader(diffFor(repo, options, path, status));
      if (body.trim() === "") {
        empty.push(path);
      }
      stats[path] = counts(body);

      // whole-file sides feed monaco's diff editor; past the cap the row says
      // to read the file in the tree instead
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

  return {
    payload: { id: reviewId(repo, options), meta, groups, sides, stats, links, images },
    imageBlocks,
    forge,
    empty,
    imageBytes,
    imagesOmitted,
  };
};

/** resolveStack.ts's output - the stack file both builders read */
export type ResolvedStack = {
  current: number;
  entries: { number: number; title: string; url: string; base: string; head: string }[];
};

export const readResolvedStack = (path: string): ResolvedStack =>
  JSON.parse(readFileSync(path, "utf8")) as ResolvedStack;

export const page = (
  shell: ReviewShell,
  /** the carried reviews' payload blocks, each followed by its image blocks */
  reviewBlocks: string[],
  script: string,
  css: string,
): string =>
  [
    // without the charset (and utf-8 in and out of every file here) a file://
    // open guesses windows-1252, and every dash and arrow turns to mojibake
    `<meta charset="utf-8" />`,
    `<title>guided review</title>`,
    `<style>${css}</style>`,
    `<div id="app"></div>`,
    // serve.ts replaces this with the page's window.__reviewServer bootstrap
    `<!--REVIEW_SERVER-->`,
    jsonBlock("shell", shell),
    // review payloads and image data stay out of the executable script, one
    // inert block each, parsed only when needed
    ...reviewBlocks,
    `<script type="module">${script}</script>`,
    "",
  ].join("\n");

/** the block element id a carried review's payload lives at */
export const reviewBlockId = (number: number): string => `review-${number}`;

export const readFont = (repo: string, fontOption: string | undefined): string => {
  const fontPath = fontOption ?? join(repo, defaultFont);
  return existsSync(fontPath) ? readFileSync(fontPath).toString("base64") : "";
};

/** the contents tree's file-type icons come from this skill's own
    bootstrap-icons install - a dependency, so its absence is a build failure */
export const readIconFont = (): string => {
  const iconFontPath = join(
    dirname(fileURLToPath(import.meta.url)),
    "node_modules",
    "bootstrap-icons",
    "font",
    "fonts",
    "bootstrap-icons.woff2",
  );
  if (!existsSync(iconFontPath)) {
    throw new Error(
      `bootstrap-icons is not installed at ${iconFontPath} - run \`pnpm install --ignore-workspace\` in the skill directory`,
    );
  }
  return readFileSync(iconFontPath).toString("base64");
};

/** fills both font placeholders the stylesheet carries */
export const finishCss = (css: string, repo: string, fontOption: string | undefined): string =>
  css.replace("FONT_B64", readFont(repo, fontOption)).replace("ICONFONT_B64", readIconFont());
