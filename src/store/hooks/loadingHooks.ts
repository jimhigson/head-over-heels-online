import { selectorHook } from "../../utils/react/selectorHook";
import { selectIsLoading } from "../selectors/loadingSelectors";

/**
 * Hook to check if any RTK Query operations are currently loading
 */
export const useIsLoading = selectorHook(selectIsLoading);
