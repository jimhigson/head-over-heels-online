import { loadGameState } from "../game/gameState/loadGameState";
import { createSavedGame } from "../game/gameState/saving/createSavedGame";
import { type Campaign } from "../model/modelTypes";
import { gameRestoreFromSave } from "../store/slices/gameInPlay/gameInPlaySlice";
import { store } from "../store/store";
import { type TestRoomId } from "./basicRoom";
import { gameStartedWithCampaign, resetStore } from "./initStoreForTests";
import {
  type GameStateWithMockInput,
  MockInputStateTracker,
} from "./MockInputStateTracker";

/**
 * as if the page were reloaded: save the game, start over with a fresh store,
 * and load the game back from the save. The returned game state replaces the
 * given one for the rest of the test.
 *
 * Does not go through browser storage, so persist migrations are not run
 */
export const reloadFromSave = (
  gameState: GameStateWithMockInput,
  campaign: Campaign<TestRoomId>,
): GameStateWithMockInput => {
  const savedGame = createSavedGame(gameState, store.getState());

  resetStore();
  gameStartedWithCampaign(campaign);

  const reloadedGameState = loadGameState({
    campaign,
    inputStateTracker: new MockInputStateTracker(),
    savedGame,
  }) as GameStateWithMockInput;
  store.dispatch(gameRestoreFromSave(savedGame.gameInPlay));

  return reloadedGameState;
};
