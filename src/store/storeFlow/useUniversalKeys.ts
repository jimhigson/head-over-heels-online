import {
  holdPressed,
  menuOpenOrExitPressed,
  toggleBoolean,
} from "../gameMenusSlice";
import { useActionTap } from "../../game/components/dialogs/useActionTap";
import { useAppSelector } from "../hooks";
import { useDispatchActionCallback } from "../useDispatchCallback";
import { useEffect } from "react";

export const useUniversalKeys = () => {
  const assigningKeys = useAppSelector(
    (store) => store.assigningInput !== undefined,
  );
  const menuOpen = useAppSelector((store) => store.openMenus.length > 0);

  useActionTap({
    action: "menu_openOrExit",
    handler: useDispatchActionCallback(menuOpenOrExitPressed),
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
      "userSettings.displaySettings.colourise",
    ),
    disabled: assigningKeys,
  });
};
