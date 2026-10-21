import { createSelectorCreator, lruMemoize } from "@reduxjs/toolkit";

import { replaceEqualDeep } from "../replaceEqualDeep";

/**
 * memoises like `lruMemoize`, and when it does recompute, gives back as much
 * of its last result as is unchanged
 */
const structurallySharingMemoize = <Args extends unknown[], Result>(
  func: (...args: Args) => Result,
) => {
  let lastResult: Result | undefined;
  return lruMemoize((...args: Args): Result => {
    lastResult = replaceEqualDeep(lastResult, func(...args));
    return lastResult;
  });
};

/**
 * like `createSelector`, but a recomputed result keeps the identity of every
 * part of it that is deep-equal to the last result - so selectors and
 * memoised components built on its parts only see the parts that changed
 */
export const createStructurallySharedSelector = createSelectorCreator({
  memoize: structurallySharingMemoize,
});
