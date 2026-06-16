import { originalCampaignLocator } from "../../gameInfo";
import { selectAssetsLoadingCount } from "../slices/assetsLoading/assetsLoadingSlice";
import { campaignsApiSlice } from "../slices/campaigns/campaignsApiSlice";
import { type RootState } from "../store";

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
  const hasAssetsLoading = selectAssetsLoadingCount(state) > 0;

  return hasLoadingQueries || hasLoadingMutations || hasAssetsLoading;
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
  const hasAssetsLoading = selectAssetsLoadingCount(state) > 0;
  if (hasAssetsLoading) {
    return true;
  }

  // Check if the current campaign is still loading
  const { campaignLocator } = state.gameInPlay.gameInPlay;
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
