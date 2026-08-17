/* inline or side-by-side, for every diff on the page at once.
   Remembered per reader rather than per review - which way you read a diff is
   a habit, not something to re-choose for each change. */

import { makeStore } from "./stores.ts";

export type DiffView = "inline" | "sideBySide";

const storageKey = "guidedReviewDiffView";

const remembered = (): DiffView => {
  try {
    return localStorage.getItem(storageKey) === "sideBySide" ? "sideBySide" : "inline";
  } catch {
    return "inline";
  }
};

export const diffViewStore = makeStore<DiffView>(remembered());

export const setDiffView = (view: DiffView): void => {
  try {
    localStorage.setItem(storageKey, view);
  } catch {
    /* storage unavailable - the choice just won't outlive the page */
  }
  diffViewStore.set(view);
};

export const showsBothSides = (view: DiffView): boolean => view === "sideBySide";
