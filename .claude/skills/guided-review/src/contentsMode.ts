/* guided order, fs tree, or diff size, for the contents sidebar. Remembered
   per reader rather than per review - which way you browse the contents is a
   habit. */

import { makeStore } from "./stores.ts";

export type ContentsMode = "guided" | "size" | "tree";

const storageKey = "guidedReviewContentsMode";

const isContentsMode = (value: null | string): value is ContentsMode =>
  value === "tree" || value === "size";

const remembered = (): ContentsMode => {
  try {
    const stored = localStorage.getItem(storageKey);
    return isContentsMode(stored) ? stored : "guided";
  } catch {
    return "guided";
  }
};

export const contentsModeStore = makeStore<ContentsMode>(remembered());

export const setContentsMode = (mode: ContentsMode): void => {
  try {
    localStorage.setItem(storageKey, mode);
  } catch {
    /* storage unavailable - the choice just won't outlive the page */
  }
  contentsModeStore.set(mode);
};
