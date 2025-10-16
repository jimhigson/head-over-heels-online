import { useEffect } from "react";

import { useMaybeGameApi } from "../../game/components/GameApiContext";
import { dispatchSaveGame } from "../../game/gameState/saving/dispatchSaveGame";
import { isInPlaytestMode } from "../../game/isInPlaytestMode";
import { useAppStore } from "../hooks";
import { holdPressed } from "../slices/gameMenus/gameMenusSlice";

export const useHoldOnWindowHidden = (): void => {
  const store = useAppStore();
  const gameApi = useMaybeGameApi();

  useEffect(() => {
    if (gameApi === undefined) {
      return;
    }

    const handleVisibilityChangeByHolding = () => {
      if (document.visibilityState === "hidden") {
        store.dispatch(holdPressed("hold"));

        if (!isInPlaytestMode()) {
          // probably a good time to save:
          dispatchSaveGame(gameApi.gameState, store);
        }
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChangeByHolding,
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChangeByHolding,
      );
    };
  }, [gameApi, store]);
};
