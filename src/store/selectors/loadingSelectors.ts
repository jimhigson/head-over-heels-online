import type { RootState } from "../store";

import { originalCampaignLocator } from "../../model/modelTypes";
import { campaignsApiSlice } from "../slices/campaigns/campaignsApiSlice";
import { selectGameAssetsLoadingCount } from "../slices/gameAssetsLoadingSlice";

/**
 * Check if any RTK Query queries or game assets loading operations are currently in progress
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

  // Check if game assets are loading
  const hasGameAssetsLoading = selectGameAssetsLoadingCount(state) > 0;

  return hasLoadingQueries || hasLoadingMutations || hasGameAssetsLoading;
};

const selectCampaignQueryStatus =
  campaignsApiSlice.endpoints.getCampaign.select;

/**
 * Check if game assets or the current campaign are loading.
 * Unlike selectIsLoading, this excludes background preloads
 * like the community campaigns list.
 */
export const selectIsGameLoading = (state: RootState): boolean => {
  // Check if game assets are loading
  const hasGameAssetsLoading = selectGameAssetsLoadingCount(state) > 0;
  if (hasGameAssetsLoading) {
    return true;
  }

  // Check if the current campaign is still loading
  const { campaignLocator } = state.gameMenus.gameInPlay;
  if (
    campaignLocator !== undefined &&
    // the original campaign is loaded via game assets, not the db:
    campaignLocator !== originalCampaignLocator
  ) {
    const campaignQueryResult =
      selectCampaignQueryStatus(campaignLocator)(state);
    if (campaignQueryResult.status === "pending") {
      return true;
    }
  }

  return false;
};
