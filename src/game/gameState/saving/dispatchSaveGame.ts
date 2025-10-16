import type { AppStore } from "../../../store/store";
import type { GameState } from "../GameState";

import { saveGame } from "../../../store/slices/gameMenus/gameMenusSlice";
import { createSavedGame } from "./createSavedGame";

/**
 * save the game right away - should be called on unload of the app and after any
 * significant event, in case the game later fails to load back again.
 *
 * It is especially important to save in Tauri, since closing the window saves,
 * but exiting the app does not have enough time to save (on mac, cmd-w saves, but
 * cmd-q doesn't). Saving frequently reduces the rewind after app quitting.
 */
export const dispatchSaveGame = (gameState: GameState, store: AppStore) => {
  const savedGame = createSavedGame(gameState, store.getState());
  const saveGameAction = saveGame(savedGame);
  store.dispatch(saveGameAction);
};
