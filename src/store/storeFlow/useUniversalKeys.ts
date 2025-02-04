import { store } from "../store";
import {
  holdPressed,
  menuOpenOrExitPressed,
  toggleColourise,
} from "../gameMenusSlice";
import { useActionTap } from "../../game/components/dialogs/useActionInput";
import { useAppSelector } from "../hooks";
import { useCallback } from "react";

export const useUniversalKeys = () => {
  const assigningKeys = useAppSelector(
    (store) => store.assigningInput !== undefined,
  );

  useActionTap({
    action: "menu_openOrExit",
    handler: useCallback(() => {
      store.dispatch(menuOpenOrExitPressed());
    }, []),
    disabled: assigningKeys,
  });

  useActionTap({
    action: "hold",
    handler: useCallback(() => {
      store.dispatch(holdPressed("toggle"));
    }, []),
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
    handler: useCallback(() => {
      store.dispatch(toggleColourise());
    }, []),
    disabled: assigningKeys,
  });
};
