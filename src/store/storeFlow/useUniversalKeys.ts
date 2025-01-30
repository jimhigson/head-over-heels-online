import { store } from "../store";
import {
  holdPressed,
  menuOpenOrExitPressed,
  toggleColourise,
} from "../gameMenusSlice";
import { useActionInput } from "../../game/components/dialogs/useActionInput";
import { useAppSelector } from "../hooks";
import { useCallback } from "react";

export const useUniversalKeys = () => {
  const assigningKeys = useAppSelector(
    (store) => store.assigningInput !== undefined,
  );

  useActionInput({
    action: "menu_openOrExit",
    onAction: useCallback(() => {
      console.log("universal keys: menu_openOrExit");
      store.dispatch(menuOpenOrExitPressed());
    }, []),
    disabled: assigningKeys,
  });

  useActionInput({
    action: "hold",
    onAction: useCallback(() => {
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

  useActionInput({
    action: "toggleColourisation",
    onAction: useCallback(() => {
      store.dispatch(toggleColourise());
    }, []),
    disabled: assigningKeys,
  });
};
