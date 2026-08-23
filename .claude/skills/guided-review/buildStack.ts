#!/usr/bin/env node
/* Build ONE page holding the guided reviews of a whole PR stack.
 *
 *   node buildStack.ts --dir <stackDir> --out <review.html> [--current <pr>]
 *                      [--repo <dir>] [--font <woff2>]
 *                      [--max-diff-lines <n>] [--max-side-lines <n>] [--max-images <n>]
 *
 * The stack directory is the coordination point between however many agents
 * contribute:
 *
 *   <stackDir>/stack.json              resolveStack.ts output - the chain
 *   <stackDir>/<pr>.groups.json        that PR's authored groups (one author each)
 *   <stackDir>/<pr>.instructions.md    optional: a request for another agent to
 *                                      write the groups json above
 *
 * Every PR with a groups json is collected into the page; PRs without one
 * appear in the stack bar as not-yet-reviewed (marked as awaiting contribution
 * when an instructions file exists). Contributing is: write your PR's groups
 * json into the directory and re-run this build - the serving process picks up
 * the overwritten html without restarting.
 *
 * Refs are fetched from refs/pull/<n>/head (matching resolvePr.sh), and each
 * mid-stack PR is diffed against the fetched head of the PR below it - exactly
 * the range GitHub shows for a stacked PR.
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parseArgs } from "node:util";

import { buildPage } from "./buildPage.ts";
import {
  type AuthoredGroups,
  collectReview,
  finishCss,
  git,
  jsonBlock,
  page,
  readResolvedStack,
  reviewBlockId,
} from "./reviewAssembly.ts";
import { type ReviewShell, type ShellReview } from "./src/ReviewPayload.ts";

const { values } = parseArgs({
  options: {
    dir: { type: "string" },
    out: { type: "string" },
    current: { type: "string" },
    repo: { type: "string" },
    font: { type: "string" },
    "max-side-lines": { type: "string", default: "2000" },
    "max-images": { type: "string", default: "100" },
  },
});

if (values.dir === undefined || values.out === undefined) {
  console.log(
    "buildStack.ts --dir <stackDir> --out <review.html> [--current <pr>] [--repo <dir>] [--font <woff2>]",
  );
  process.exit(1);
}
const stackDir = values.dir;
const outPath = values.out;

const repo = values.repo ?? git(process.cwd(), "rev-parse", "--show-toplevel").trim();
const stack = readResolvedStack(join(stackDir, "stack.json"));

/** the fetched, local name of a PR's head - resolvePr.sh's convention */
const headRefOf = (prNumber: number): string => `refs/review/pr${prNumber}`;

const fetchRefs = (): void => {
  const [trunkEntry] = stack.entries;
  if (trunkEntry === undefined) {
    throw new Error("stack.json has no entries");
  }
  try {
    git(repo, "fetch", "--quiet", "origin", `${trunkEntry.base}:refs/remotes/origin/${trunkEntry.base}`);
  } catch {
    git(repo, "fetch", "--quiet", "origin", trunkEntry.base);
  }
  for (const entry of stack.entries) {
    try {
      git(repo, "fetch", "--quiet", "--force", "origin", `refs/pull/${entry.number}/head:${headRefOf(entry.number)}`);
    } catch (error) {
      // offline is survivable if an earlier fetch left the ref behind
      if (git(repo, "rev-parse", "--verify", "--quiet", headRefOf(entry.number)).trim() === "") {
        throw new Error(`could not fetch pr ${entry.number} and no ${headRefOf(entry.number)} exists locally`, {
          cause: error,
        });
      }
      console.error(`warning: fetching pr ${entry.number} failed; using the existing local ref`);
    }
  }
};

const main = async (): Promise<void> => {
  fetchRefs();

  const reviews: ShellReview[] = [];
  const reviewBlocks: string[] = [];
  const carried: number[] = [];

  for (const [index, entry] of stack.entries.entries()) {
    const groupsPath = join(stackDir, `${entry.number}.groups.json`);
    const bare: ShellReview = {
      number: entry.number,
      title: entry.title,
      url: entry.url,
      head: entry.head,
    };

    if (!existsSync(groupsPath)) {
      const instructions = existsSync(join(stackDir, `${entry.number}.instructions.md`));
      reviews.push(instructions ? { ...bare, awaitingContribution: true } : bare);
      continue;
    }

    const previousEntry = stack.entries[index - 1];
    const collected = collectReview(
      repo,
      {
        mode: "pr",
        // a stacked PR's base branch is the head of the PR below it, so the
        // fetched sibling head is the exact base ref
        base: previousEntry === undefined ? `origin/${entry.base}` : headRefOf(previousEntry.number),
        head: headRefOf(entry.number),
        pr: String(entry.number),
        maxSideLines: Number(values["max-side-lines"]),
        maxImages: Number(values["max-images"]),
      },
      JSON.parse(readFileSync(groupsPath, "utf8")) as AuthoredGroups,
      `img-${entry.number}`,
    );

    reviews.push({ ...bare, block: reviewBlockId(entry.number), reviewId: collected.payload.id });
    reviewBlocks.push(
      jsonBlock(reviewBlockId(entry.number), collected.payload),
      ...collected.imageBlocks,
    );
    carried.push(entry.number);

    console.log(
      `#${entry.number}  ${Object.keys(collected.payload.stats).length} files, ${collected.imageBlocks.length} images  (${collected.payload.id})`,
    );
    for (const path of collected.empty) {
      console.error(`  warning: no diff found for ${path}`);
    }
  }

  const [firstCarried] = carried;
  if (firstCarried === undefined) {
    throw new Error(`no <pr>.groups.json found in ${stackDir} - nothing to build`);
  }

  const requestedCurrent = values.current === undefined ? undefined : Number(values.current);
  const current =
    requestedCurrent !== undefined && carried.includes(requestedCurrent) ? requestedCurrent
    : carried.includes(stack.current) ? stack.current
    : firstCarried;

  const shell: ReviewShell = { reviews, current };
  const { script, css } = await buildPage();
  const html = page(shell, reviewBlocks, script, finishCss(css, repo, values.font));
  writeFileSync(outPath, html, "utf8");

  console.log(
    `stack   ${reviews.map((review) => (review.number === current ? `[#${review.number}]` : review.block === undefined ? `(#${review.number})` : `#${review.number}`)).join(" → ")}   (parens = not yet reviewed)`,
  );
  console.log(`wrote ${outPath}  (${Math.round(Buffer.byteLength(html) / 1_024)} KiB)`);
};

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
