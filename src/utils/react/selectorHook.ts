import type { RootState } from "../../store/store";

import { useAppSelector } from "../../store/hooks";

/**
 * for the sake of the hooks made here, I'm going to assume all slices are loaded, and
 * that you're only calling selectors on loaded slices. This is unsafe if they are not
 * actually loaded.
 */
type RootStateWithAllSlices = Required<RootState>;

/**
 * convenience higher-order function to make a hook that returns the result of a
 * selector function over the store, and nothing else
 */
export const selectorHook = <T>(
  selector: (state: RootStateWithAllSlices) => T,
) => {
  const useThiSelector = (): T => {
    return useAppSelector(selector);
  };
  return useThiSelector;
};
