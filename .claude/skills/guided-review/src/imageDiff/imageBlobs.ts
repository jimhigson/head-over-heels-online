/* An image row's data uris, parsed out of its own inert json block. Keeping
   them out of the payload means evaluating the page never holds image data;
   parsing per row means only the rows actually looked at cost memory. */

import { images } from "../payload.ts";

const retained = new Map<string, string[]>();

const parseBlock = (blockId: string): string[] => {
  const element = document.getElementById(blockId);
  if (element === null) {
    throw new Error(`the page carries no image block ${blockId}`);
  }
  return JSON.parse(element.textContent ?? "[]") as string[];
};

/**
 * data uris of a path's distinct blobs, in the order the row's versions index
 * them. `retain: true` caches for a row being viewed; the one-pass stats sweep
 * passes false so its reads can be reclaimed as it moves on
 */
export const imageBlobUris = (
  path: string,
  retain: boolean,
): string[] => {
  const row = images[path];
  if (row === undefined || row.block === "") {
    throw new Error(`${path} has no embedded image versions`);
  }
  const cached = retained.get(row.block);
  if (cached !== undefined) {
    return cached;
  }
  const parsed = parseBlock(row.block);
  if (retain) {
    retained.set(row.block, parsed);
  }
  return parsed;
};
