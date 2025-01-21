import { useEffect } from "react";
import { useIsOnHold, useMenus } from "../selectors";
import { useGameApi } from "../../game/components/GameApiContext";

export const useZeroGameSpeedWhenDialogsOpen = () => {
  const gameApi = useGameApi();
  const isOnHold = useIsOnHold();
  const menus = useMenus();

  const open = menus.length > 0 || isOnHold;

  useEffect(() => {
    if (open) {
      gameApi.gameState.gameSpeed = 0;
    } else {
      gameApi.gameState.gameSpeed = 1;
    }
  }, [gameApi, open]);
};
