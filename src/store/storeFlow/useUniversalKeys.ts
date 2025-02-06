import {
  holdPressed,
  menuOpenOrExitPressed,
  toggleBoolean,
} from "../gameMenusSlice";
import { useActionTap } from "../../game/components/dialogs/useActionInput";
import { useAppSelector } from "../hooks";
import { useDispatchActionCallback } from "../useDispatchCallback";

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

  /*
  useActionInput({
    action: ["windowBlurred"],
    onAction: useCallback(() => {
      store.dispatch(holdPressed("hold"));
    }, []),
  });
  */

  useActionTap({
    action: "toggleColourisation",
    handler: useDispatchActionCallback(
      toggleBoolean,
      "userSettings.displaySettings.colourise",
    ),
    disabled: assigningKeys,
  });
};
