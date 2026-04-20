import { Ticker } from "pixi.js";
import { useEffect } from "react";

import { HookComponent } from "../../utils/react/HookComponent";
import { useAppSelector } from "../hooks";
import { selectGameSpeed } from "../slices/gameMenus/gameMenusSelectors";

const useSetSpeedOnSharedTickerFromStore = () => {
  const gameSpeed = useAppSelector(selectGameSpeed);
  useEffect(() => {
    Ticker.shared.speed = gameSpeed;
  }, [gameSpeed]);
};

export const SetSpeedOnSharedTickerFromStore = HookComponent(
  useSetSpeedOnSharedTickerFromStore,
);
