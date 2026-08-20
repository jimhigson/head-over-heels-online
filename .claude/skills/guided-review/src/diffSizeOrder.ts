/* files ordered by how much changed rather than by where they sit in the
   reading order or the tree - biggest diff first. Images have no line count
   to compare by, so they sort ahead of every text file instead. */

import { isImagePath } from "./imagePaths.ts";
import { stats } from "./payload.ts";
import { type ReviewFile } from "./ReviewPayload.ts";

const diffSizeOf = (file: ReviewFile): number => {
  const [added, removed] = stats[file.path] ?? [0, 0];
  return added + removed;
};

export const sortByDiffSize = (unsorted: ReviewFile[]): ReviewFile[] =>
  [...unsorted].sort((left, right) => {
    const leftImage = isImagePath(left.path);
    const rightImage = isImagePath(right.path);
    if (leftImage !== rightImage) {
      return leftImage ? -1 : 1;
    }
    return diffSizeOf(right) - diffSizeOf(left);
  });
