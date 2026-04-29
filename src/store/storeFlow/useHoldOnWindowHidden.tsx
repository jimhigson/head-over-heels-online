import { useEffect } from "react";

import { useMaybeGameApi } from "../../game/components/GameApiContext";
import { saveGameThunk } from "../../game/gameState/saving/saveGameThunk";
import { useAppDispatch } from "../hooks";
import { holdPressed } from "../slices/gameMenus/gameMenusSlice";

export const useHoldOnWindowHidden = (): void => {
  const dispatch = useAppDispatch();
  const gameApi = useMaybeGameApi();

  useEffect(() => {
    if (gameApi === undefined) {
      return;
    }

    const handleVisibilityChangeByHolding = () => {
      if (document.visibilityState === "hidden") {
        dispatch(holdPressed("hold"));

        // probably a good time to save:
        dispatch(saveGameThunk(gameApi.gameState));
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
  }, [gameApi, dispatch]);
};
