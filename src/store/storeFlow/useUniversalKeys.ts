import { store } from "../store";
import { holdPressed, menuPressed, toggleColourise } from "../gameMenusSlice";
import { useActionInput } from "../../game/components/dialogs/useActionInput";
import { useAppSelector } from "../hooks";
import { useCallback } from "react";

export const useUniversalKeys = () => {
  const assigningKeys = useAppSelector(
    (store) => store.assigningInput !== undefined,
  );

  useActionInput({
    action: "menu",
    onAction: useCallback(() => {
      store.dispatch(menuPressed());
    }, []),
    disabled: assigningKeys,
  });

  useActionInput({
    action: ["hold"],
    onAction: useCallback(() => {
      store.dispatch(holdPressed("toggle"));
    }, []),
  });

  useActionInput({
    action: ["windowBlurred"],
    onAction: useCallback(() => {
      store.dispatch(holdPressed("hold"));
    }, []),
  });

  useActionInput({
    action: ["toggleColourisation"],
    onAction: useCallback(() => {
      store.dispatch(toggleColourise());
    }, []),
  });
};
