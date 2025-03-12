import { useEffect } from "react";
import { useAppDispatch } from "../hooks";
import { saveStateOnExit } from "../slices/savedGamesSlice";
import { createSavableReincarnationPoint } from "../../game/gameState/saving/createSavableReincarnationPoint";
import { useMaybeGameApi } from "../../game/components/GameApiContext";
import { store } from "../store";
import { holdPressed } from "../slices/gameMenusSlice";

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

    const saveIfHidden = () => {
      if (document.visibilityState === "hidden") {
        dispatch(
          saveStateOnExit(
            createSavableReincarnationPoint(
              gameApi.gameState,
              store.getState(),
            ),
          ),
        );
        // also show the menu to pause the game (if not already showing a menu)
        // - in case the user comes back to the page (eg, leaves to another tab, when they come back this tab
        // is showing the menus)
        dispatch(holdPressed("hold"));
      }
    };
    document.addEventListener("visibilitychange", saveIfHidden);
    return () => {
      document.removeEventListener("visibilitychange", saveIfHidden);
    };
  }, [dispatch, gameApi]);
};
