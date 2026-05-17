import {
  createAction,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { canonicalize } from "json-canonicalize";

import {
  type SavedGame,
  type SavedStoreGameInPlay,
} from "../../../game/gameState/saving/SavedGameState";
import { type CampaignLocator } from "../../../model/modelTypes";
import { pick } from "../../../utils/pick";
import { clearAllData } from "../clearAllData";

/**
 * Compose a stable string key from a CampaignLocator. Saves are keyed by
 * (userId, campaignName); version is intentionally excluded so a new version
 * of a campaign keeps its existing saves.
 */
export const gameStateLocatorKey = (campaignLocator: CampaignLocator) =>
  canonicalize(pick(campaignLocator, "userId", "campaignName"));

export type SavedGamesSliceState = {
  saves: { [campaignLocatorFlat: string]: SavedGame };
  /**
   * Locator of the most-recently-saved campaign. The app auto-restores from
   * this on reload (the locator must exist as a key in `saves`).
   */
  lastSavedCampaignLocator?: CampaignLocator;
};

const initialSavedGamesSliceState: SavedGamesSliceState = {
  saves: {},
};

/**
 * Persist key for this slice's redux-persist storage (localStorage). Used by
 * `persist.ts` for the persistConfig and by listener middleware to filter
 * REHYDRATE actions to this slice.
 */
export const savedGamesPersistKey = "hohol/savedGames";

const sliceName = "savedGames" as const;

/**
 * Signals that a saved game has been loaded at app start and the game
 * should be set up to play it. Dispatched by savedGamesListener after
 * redux-persist rehydrates this slice and the URL/lastSaved decision
 * picks a save (or starts a fresh gameInPlay for a URL-named campaign).
 *
 * No state changes in savedGames itself — other slices subscribe via
 * `extraReducers`:
 *   - gameInPlaySlice writes gameInPlay + sets gameRunning=true
 *   - gameMenusSlice opens the hold (paused) menu
 */
export const savedGameLoadedOnAppLoad = createAction<SavedStoreGameInPlay>(
  `${sliceName}/savedGameLoadedOnAppLoad`,
);

export const savedGamesSlice = createSlice({
  name: sliceName,
  initialState: initialSavedGamesSliceState,
  reducers: {
    /**
     * Record a save against a campaign. Caller supplies the locator (read
     * from gameInPlay.campaignLocator at dispatch site) so this reducer
     * stays intra-slice.
     */
    saveGameRecorded(
      state,
      {
        payload: { save, campaignLocator },
      }: PayloadAction<{ save: SavedGame; campaignLocator: CampaignLocator }>,
    ) {
      const key = gameStateLocatorKey(campaignLocator);
      state.saves[key] = save;
      state.lastSavedCampaignLocator = campaignLocator;
    },
    /**
     * Remove the save for a given campaign. If the removed save was the
     * `lastSavedCampaignLocator`, clear that field too.
     */
    savedGameRemoved(
      state,
      { payload: campaignLocator }: PayloadAction<CampaignLocator>,
    ) {
      const key = gameStateLocatorKey(campaignLocator);
      delete state.saves[key];
      if (
        state.lastSavedCampaignLocator !== undefined &&
        gameStateLocatorKey(state.lastSavedCampaignLocator) === key
      ) {
        delete state.lastSavedCampaignLocator;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(clearAllData, () => initialSavedGamesSliceState);
  },
  selectors: {
    selectSaveForCampaign(
      state: SavedGamesSliceState,
      campaignLocator: CampaignLocator,
    ) {
      return state.saves[gameStateLocatorKey(campaignLocator)];
    },
  },
});

export const { saveGameRecorded, savedGameRemoved } = savedGamesSlice.actions;

// typed variant so callers don't need to cast for RoomId
export const selectSaveForCampaign = savedGamesSlice.selectors
  .selectSaveForCampaign as <RoomId extends string>(
  state: { savedGames: SavedGamesSliceState },
  campaignLocator: CampaignLocator,
) => SavedGame<RoomId>;
