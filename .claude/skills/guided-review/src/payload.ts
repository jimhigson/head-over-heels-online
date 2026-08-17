/* reads this page's own payload out of the DOM, and the derived values every
   component works from */

import { type ReviewFile, type ReviewPayload } from "./ReviewPayload.ts";

const payloadElement = document.getElementById("payload");
if (payloadElement === null) {
  throw new Error("the page carries no payload - rebuild it with the current build.ts");
}

export const payload = JSON.parse(payloadElement.textContent ?? "{}") as ReviewPayload;

export const { id: reviewId, meta, groups, diffs, sides, stats, links } = payload;

export const files: ReviewFile[] = groups.flatMap((group, groupIndex) =>
  group.items.map((item, itemIndex) => ({
    ...item,
    groupIndex,
    id: `${groupIndex}-${itemIndex}`,
  })),
);

export const total = files.length;

export const server = window.__reviewServer;

export const statusLabel: Record<string, string> = {
  A: "New",
  M: "Modified",
  D: "Deleted",
  R: "Renamed",
};

export const filesInGroup = (groupIndex: number): ReviewFile[] =>
  files.filter((file) => file.groupIndex === groupIndex);
