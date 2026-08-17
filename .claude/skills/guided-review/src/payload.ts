/* Reads the page's shell and the active review's payload out of the DOM.
 *
 * The page can carry several reviews (a PR stack); exactly one is active at a
 * time. These exports are live bindings onto the active review: selectReview
 * reassigns them, and main.tsx remounts the whole App keyed by review number,
 * so every component re-reads them on the next render. Nothing may cache them
 * across a switch.
 */

import {
  type ReviewFile,
  type ReviewPayload,
  type ReviewShell,
  type ShellReview,
} from "./ReviewPayload.ts";

const parseBlock = <Parsed,>(elementId: string): Parsed => {
  const element = document.getElementById(elementId);
  if (element === null) {
    throw new Error(`the page carries no ${elementId} block - rebuild it with the current build.ts`);
  }
  return JSON.parse(element.textContent ?? "{}") as Parsed;
};

export const shell = parseBlock<ReviewShell>("shell");

export const server = window.__reviewServer;

const carriedReview = (number: number): { review: ShellReview; block: string } => {
  const review = shell.reviews.find((candidate) => candidate.number === number);
  if (review === undefined || review.block === undefined) {
    throw new Error(`the page carries no review for pr ${number}`);
  }
  return { review, block: review.block };
};

export let activeReview: ShellReview;
export let payload: ReviewPayload;
export let reviewId: string;
export let meta: ReviewPayload["meta"];
export let groups: ReviewPayload["groups"];
export let sides: ReviewPayload["sides"];
export let stats: ReviewPayload["stats"];
export let links: ReviewPayload["links"];
export let images: ReviewPayload["images"];
export let files: ReviewFile[];
export let total: number;

export const selectReview = (number: number): void => {
  const { review, block } = carriedReview(number);
  activeReview = review;
  payload = parseBlock<ReviewPayload>(block);
  ({ id: reviewId, meta, groups, sides, stats, links, images } = payload);
  files = groups.flatMap((group, groupIndex) =>
    group.items.map((item, itemIndex) => ({
      ...item,
      groupIndex,
      id: `${groupIndex}-${itemIndex}`,
    })),
  );
  total = files.length;
};

selectReview(shell.current);

/** whether the active review's editors may write to the served checkout */
export const activeReviewIsEditable = (): boolean =>
  server !== undefined && server.editableReviewId === reviewId;

export const statusLabel: Record<string, string> = {
  A: "New",
  M: "Modified",
  D: "Deleted",
  R: "Renamed",
};

export const filesInGroup = (groupIndex: number): ReviewFile[] =>
  files.filter((file) => file.groupIndex === groupIndex);
