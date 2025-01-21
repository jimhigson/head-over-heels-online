import { useEffect } from "react";
import { useMenus } from "../selectors";
import { useGameApi } from "../../game/components/GameApiContext";

export const useZeroGameSpeedWhenDialogsOpen = () => {
  const gameApi = useGameApi();
  const menus = useMenus();

  const showingAMenu = menus.length > 0;

  useEffect(() => {
    if (showingAMenu) {
      gameApi.gameState.gameSpeed = 0;
    } else {
      gameApi.gameState.gameSpeed = 1;
    }
  }, [gameApi, showingAMenu]);
};
