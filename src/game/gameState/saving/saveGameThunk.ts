import type { AppThunk } from "../../../store/store";
import type { GameState } from "../GameState";

import { saveGameRecorded } from "../../../store/slices/savedGames/savedGamesSlice";
import { isInPlaytestMode } from "../../isInPlaytestMode";
import { createSavedGame } from "./createSavedGame";

/**
 * Save the game right away — should be called on unload of the app and
 * after any significant event, in case the game later fails to load back
 * again.
 *
 * It is especially important to save in Tauri, since closing the window
 * saves, but exiting the app does not have enough time to save (on mac,
 * cmd-w saves, but cmd-q doesn't). Saving frequently reduces the rewind
 * after app quitting.
 *
 * No-ops in playtest mode since playtest state should not be persisted.
 *
 * Dispatched as a thunk: `store.dispatch(saveGameThunk(gameState))`.
 */
export const saveGameThunk =
  (gameState: GameState): AppThunk =>
  (dispatch, getState) => {
    if (isInPlaytestMode()) return;

    const storeState = getState();
    const { campaignLocator } = storeState.gameInPlay.gameInPlay;
    if (campaignLocator === undefined) {
      throw new Error(
        "trying to save a game, but seems like there's no campaign to save against",
      );
    }
    const savedGame = createSavedGame(gameState, storeState);
    dispatch(saveGameRecorded({ save: savedGame, campaignLocator }));
  };
