import { createSelectorCreator, lruMemoize } from "@reduxjs/toolkit";
import { shallowEqual } from "react-redux";

/**
 * like `createSelector`, but when a recomputed result is shallowly equal to
 * the last one, it gives back the last one - so its subscribers don't
 * re-render for store changes that leave what it selects the same
 */
export const createShallowStableSelector = createSelectorCreator({
  memoize: lruMemoize,
  memoizeOptions: { resultEqualityCheck: shallowEqual },
});
