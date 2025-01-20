import { store } from "../store";
import { menuPressed } from "../gameMenusSlice";
import { useActionInput } from "../../game/components/dialogs/useActionInput";
import { useAppSelector } from "../hooks";
import { useCallback } from "react";

export const useOpenMainMenu = () => {
  const assigningKeys = useAppSelector(
    (store) => store.actionBeingAssignedKeys !== undefined,
  );

  useActionInput({
    action: "menu",
    onAction: useCallback(() => {
      store.dispatch(menuPressed());
    }, []),
    disabled: assigningKeys,
  });
};
