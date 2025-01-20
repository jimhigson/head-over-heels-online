import { useAppDispatch } from "../hooks";
import { onHoldPressed } from "../gameMenusSlice";
import { useActionInput } from "../../game/components/dialogs/useActionInput";

export const useGoOnHold = () => {
  const dispatch = useAppDispatch();

  useActionInput({
    action: ["hold", "windowBlurred"],
    onAction() {
      dispatch(onHoldPressed());
    },
  });
};
