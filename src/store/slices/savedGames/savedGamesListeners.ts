import { startAppListening } from "../../listenerMiddleware";
import { gameOver } from "../gameInPlay/gameInPlaySlice";
import { savedGameRemoved } from "./savedGamesSlice";

export const registerSavedGamesListeners = () => {
  /**
   * `gameOver` → delete the save for the just-ended game.
   */
  startAppListening({
    actionCreator: gameOver,
    effect(_action, { dispatch, getState }) {
      const { campaignLocator } = getState().gameInPlay.gameInPlay;
      if (campaignLocator !== undefined) {
        dispatch(savedGameRemoved(campaignLocator));
      }
    },
  });
};
