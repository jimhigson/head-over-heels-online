import type { RootState } from "../store";

import { campaignsApiSlice } from "../slices/campaigns/campaignsApiSlice";
import { selectManualLoadingCount } from "../slices/manualLoadingSlice";

/**
 * Check if any RTK Query queries or manual loading operations are currently in progress
 */
export const selectIsLoading = (state: RootState): boolean => {
  const { queries } = state[campaignsApiSlice.reducerPath];
  const { mutations } = state[campaignsApiSlice.reducerPath];

  // Check if any queries are pending
  const hasLoadingQueries = Object.values(queries ?? {}).some(
    (query) => query?.status === "pending",
  );

  // Check if any mutations are pending
  const hasLoadingMutations = Object.values(mutations ?? {}).some(
    (mutation) => mutation?.status === "pending",
  );

  // Check if any manual loading operations are in progress
  const hasManualLoading = selectManualLoadingCount(state) > 0;

  return hasLoadingQueries || hasLoadingMutations || hasManualLoading;
};
