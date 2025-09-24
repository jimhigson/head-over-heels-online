import { useEffect } from "react";

import { useMaybeGameApi } from "../../game/components/GameApiContext";
import { createSavedGame } from "../../game/gameState/saving/createSavedGame";
import { isInPlaytestMode } from "../../game/isInPlaytestMode";
import { useAppDispatch } from "../hooks";
import { holdPressed, saveGame } from "../slices/gameMenus/gameMenusSlice";
import { persistor, store } from "../store";

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

    const maybeSave = () => {
      if (isInPlaytestMode()) {
        // we don't save while playtesting
        return;
      }

      dispatch(saveGame(createSavedGame(gameApi.gameState, store.getState())));
      // we might not have long before the page goes away so we can't wait for redux-persist's throttled/debounced
      // updates to write:
      persistor.flush();
    };
    const hold = () => {
      if (document.visibilityState === "hidden") {
        dispatch(holdPressed("hold"));
        // this is also a good time to save since the user might not come back:
        maybeSave();
      }
    };
    document.addEventListener("visibilitychange", hold);
    window.addEventListener("beforeunload", maybeSave);

    return () => {
      document.removeEventListener("visibilitychange", hold);
      window.removeEventListener("beforeunload", maybeSave);
    };
  }, [dispatch, gameApi]);
};
