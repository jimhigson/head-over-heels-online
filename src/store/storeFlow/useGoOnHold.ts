import { useAppDispatch } from "../hooks";
import { onHoldPressed } from "../gameMenusSlice";
import { useActionInput } from "../../game/components/dialogs/useActionInput";
import { useCallback } from "react";

export const useGoOnHold = () => {
  const dispatch = useAppDispatch();

  useActionInput({
    action: ["hold", "windowBlurred"],
    onAction: useCallback(() => {
      dispatch(onHoldPressed());
    }, [dispatch]),
  });
};
