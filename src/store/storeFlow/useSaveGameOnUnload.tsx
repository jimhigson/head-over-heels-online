import { useEffect } from "react";
import { useAppDispatch } from "../hooks";
import { createSavedGame } from "../../game/gameState/saving/createSavedGame";
import { useMaybeGameApi } from "../../game/components/GameApiContext";
import { persistor, store } from "../store";
import { holdPressed, saveCurrentGame } from "../slices/gameMenusSlice";

export const useSaveGameOnUnload = (): void => {
  const dispatch = useAppDispatch();
  const gameApi = useMaybeGameApi();

  // any time the page hides, we save to the store, which should be picked up by redux-persist
  useEffect(() => {
    if (gameApi === undefined) {
      // if there is no game, there is nothing to save. Ie, page unloads from main menu without
      // starting a game
      return;
    }

    const save = () => {
      console.log("saving current game");

      dispatch(
        saveCurrentGame(createSavedGame(gameApi.gameState, store.getState())),
      );
      // we might not have long before the page goes away so we can't wait for redux-persist's throttled/debounced
      // updates to write:
      persistor.flush();
    };
    const hold = () => {
      if (document.visibilityState === "hidden") {
        console.log("holding due to visibilityState=hidden");
        dispatch(holdPressed("hold"));
        // this is also a good time to save since the user might not come back:
        save();
      }
    };
    document.addEventListener("visibilitychange", hold);
    window.addEventListener("beforeunload", save);
    return () => {
      document.removeEventListener("visibilitychange", hold);
      window.removeEventListener("beforeunload", save);
    };
  }, [dispatch, gameApi]);
};
