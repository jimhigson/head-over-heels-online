/* the guided order's files, run-length grouped by directory - so a chapter
   that visits the same directory for several files in a row states that
   directory once, without touching the authored order. Only truly adjacent
   files merge: the same directory visited again later, after the order moves
   elsewhere, starts a new run and is stated again. */

import { dirname } from "./paths.ts";
import { type ReviewFile } from "./ReviewPayload.ts";

export type PathRun = { path: string; files: ReviewFile[] };

export const runsByPath = (orderedFiles: ReviewFile[]): PathRun[] => {
  const runs: PathRun[] = [];
  for (const file of orderedFiles) {
    const path = dirname(file.path);
    const lastRun = runs.at(-1);
    if (lastRun !== undefined && lastRun.path === path) {
      lastRun.files.push(file);
    } else {
      runs.push({ path, files: [file] });
    }
  }
  return runs;
};
