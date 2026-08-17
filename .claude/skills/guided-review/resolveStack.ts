#!/usr/bin/env node
/* Resolve the PR stack a pull request belongs to, whichever repo it is in.
 *
 *   node resolveStack.ts 34
 *   node resolveStack.ts my-branch
 *   node resolveStack.ts https://github.com/owner/repo/pull/34
 *
 * A stack is a chain of open PRs where each one's base branch is the head
 * branch of the one below it. This walks the chain both ways from the given
 * PR and prints json:
 *
 *   { "current": 34, "entries": [ { number, title, url, base, head }, … ] }
 *
 * entries are in stack order, the PR nearest the trunk first. A PR that is in
 * no stack prints a single entry - callers should only pass the file to
 * `build.ts --stack` when there are two or more. The walk stops (with a note
 * on stderr) if a PR has more than one open PR based on its head, since the
 * chain above that point is ambiguous.
 */

import { execFileSync } from "node:child_process";

type OpenPr = {
  number: number;
  title: string;
  url: string;
  baseRefName: string;
  headRefName: string;
};

const [target] = process.argv.slice(2);
if (target === undefined) {
  console.error("usage: resolveStack.ts <number|branch|url>");
  process.exit(1);
}

const gh = (...args: string[]): string =>
  execFileSync("gh", args, { encoding: "utf8", maxBuffer: 16 * 1_024 * 1_024 });

const prFields = "number,title,url,baseRefName,headRefName";

const anchor = JSON.parse(gh("pr", "view", target, "--json", prFields)) as OpenPr;
const openPrs = JSON.parse(
  gh("pr", "list", "--state", "open", "--json", prFields, "--limit", "200"),
) as OpenPr[];

const byNumber = new Map(openPrs.map((pr) => [pr.number, pr]));
byNumber.set(anchor.number, anchor);

const prWithHead = (ref: string): OpenPr | undefined =>
  openPrs.find((pr) => pr.headRefName === ref && pr.number !== anchor.number);

const prsBasedOn = (ref: string): OpenPr[] =>
  [...byNumber.values()].filter((pr) => pr.baseRefName === ref);

/** the chain below the anchor: each PR's base is the head of the one before */
const below: OpenPr[] = [];
const seen = new Set([anchor.number]);
let walkDown: OpenPr | undefined = prWithHead(anchor.baseRefName);
while (walkDown !== undefined && !seen.has(walkDown.number)) {
  below.unshift(walkDown);
  seen.add(walkDown.number);
  walkDown = prWithHead(walkDown.baseRefName);
}

/** the chain above: PRs based on the current head, linearly */
const above: OpenPr[] = [];
let walkUp: OpenPr = anchor;
for (;;) {
  const children = prsBasedOn(walkUp.headRefName).filter((pr) => !seen.has(pr.number));
  if (children.length === 0) {
    break;
  }
  if (children.length > 1) {
    console.error(
      `stack forks above #${walkUp.number}: ${children.map((pr) => `#${pr.number}`).join(", ")} all base on ${walkUp.headRefName} - stopping there`,
    );
    break;
  }
  const [child] = children;
  if (child === undefined) {
    break;
  }
  above.push(child);
  seen.add(child.number);
  walkUp = child;
}

const entries = [...below, anchor, ...above].map(
  ({ number, title, url, baseRefName, headRefName }) => ({
    number,
    title,
    url,
    base: baseRefName,
    head: headRefName,
  }),
);

console.log(JSON.stringify({ current: anchor.number, entries }, null, 2));
console.error(
  entries.length > 1 ?
    `#${anchor.number} sits in a stack of ${entries.length}`
  : `#${anchor.number} is not part of a stack`,
);
