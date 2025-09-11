import { useEffect } from "react";

import { useMaybeGameApi } from "../../game/components/GameApiContext";
import { HookComponent } from "../../utils/react/HookComponent";
import { useAppSelector } from "../hooks";
import { selectGameSpeed } from "../selectors";

const useSetSpeedOnGameApiFromStore = () => {
  const gameSpeed = useAppSelector(selectGameSpeed);
  const gameApi = useMaybeGameApi();
  useEffect(() => {
    if (gameApi !== undefined) {
      gameApi.gameState.gameSpeed = gameSpeed;
    }
  }, [gameApi, gameSpeed]);
};

export const SetSpeedOnGameApiFromStore = HookComponent(
  useSetSpeedOnGameApiFromStore,
);
