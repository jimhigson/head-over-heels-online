import { type Campaign } from "../model/modelTypes";
import { gameCampaignsApiSlice } from "../store/slices/campaigns/gameCampaignsApiSlice";
import { gameStarted } from "../store/slices/gameInPlay/gameInPlaySlice";
import { store } from "../store/store";

export const resetStore = () => {
  store.dispatch({ type: "@@_RESET_FOR_TESTS" });
};

/** fakes a remote campaign load and game state */
export const gameStartedWithCampaign = (campaign: Campaign<string>) => {
  // Use upsertQueryEntries for synchronous cache insertion
  // upsertQueryData goes through async flow which creates a pending state first
  store.dispatch(
    gameCampaignsApiSlice.util.upsertQueryEntries([
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
