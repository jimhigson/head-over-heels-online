import { useCallback, useEffect } from "react";

import { useActionTap } from "../../game/components/dialogs/useActionTap";
import { isInPlaytestMode } from "../../game/isInPlaytestMode";
import { useAppSelector } from "../hooks";
import {
  holdPressed,
  mapPressed,
  menuOpenOrExitPressed,
  setEmulatedResolution,
  toggleBoolean,
} from "../slices/gameMenusSlice";
import { store } from "../store";
import { useDispatchActionCallback } from "../useDispatchActionCallback";

export const useUniversalKeys = () => {
  const assigningKeys = useAppSelector(
    (store) => store.gameMenus.assigningInput !== undefined,
  );
  const menuOpen = useAppSelector(
    (store) => store.gameMenus.openMenus.length > 0,
  );

  useActionTap({
    action: "menu_openOrExit",
    handler: useCallback(() => {
      if (isInPlaytestMode()) {
        // when playtesting, don't show a menu, just close the window
        window.close();
      }
      store.dispatch(menuOpenOrExitPressed());
    }, []),
    disabled: assigningKeys,
  });

  useActionTap({
    action: "menu_exit",
    handler: useDispatchActionCallback(menuOpenOrExitPressed),
    disabled: !menuOpen,
  });

  useActionTap({
    action: "toggleShowFps",
    handler: useDispatchActionCallback(toggleBoolean, "userSettings.showFps"),
    disabled: menuOpen,
  });

  useActionTap({
    action: "hold",
    handler: useDispatchActionCallback(holdPressed, "toggle"),
    disabled: assigningKeys,
  });

  useActionTap({
    action: "map",
    handler: useDispatchActionCallback(mapPressed),
    disabled: assigningKeys,
  });

  useEffect(() => {
    const handleWindowBlur = (): void => {
      //store.dispatch(holdPressed("hold"));
    };
    window.addEventListener("blur", handleWindowBlur, false);
    return () => {
      window.removeEventListener("blur", handleWindowBlur, false);
    };
  });

  useActionTap({
    action: "toggleColourisation",
    handler: useDispatchActionCallback(
      toggleBoolean,
      "userSettings.displaySettings.uncolourised",
    ),
    disabled: assigningKeys,
  });

  useActionTap({
    action: "cycleResolution",
    handler: useDispatchActionCallback(
      setEmulatedResolution,
      /* undefined means cycle*/ undefined,
    ),
    disabled: assigningKeys,
  });
};
