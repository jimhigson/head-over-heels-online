import { selectorHook } from "../../utils/react/selectorHook";
import {
  selectIsGameLoading,
  selectIsLoading,
} from "../selectors/loadingSelectors";

/**
 * Hook to check if any RTK Query operations are currently loading
 */
export const useIsLoading = selectorHook(selectIsLoading);

/**
 * Hook to check if game assets or the current campaign are loading.
 * Unlike useIsLoading, this excludes background preloads like the community campaigns list.
 */
export const useIsGameLoading = selectorHook(selectIsGameLoading);
