import type { Campaign } from "../model/modelTypes";

import { campaignsApiSlice } from "../store/slices/campaigns/campaignsApiSlice";
import { gameStarted } from "../store/slices/gameMenus/gameMenusSlice";
import { store } from "../store/store";

export const resetStore = () => {
  store.dispatch({ type: "@@_RESET_FOR_TESTS" });
};
export const gameStartedWithCampaign = (campaign: Campaign<string>) => {
  // Use upsertQueryEntries for synchronous cache insertion
  // upsertQueryData goes through async flow which creates a pending state first
  store.dispatch(
    campaignsApiSlice.util.upsertQueryEntries([
      {
        endpointName: "getCampaign",
        arg: campaign.locator,
        value: campaign,
      },
    ]),
  );
  // start a game with our campaign
  store.dispatch(gameStarted({ campaignLocator: campaign.locator }));
};
