import { useActionInput } from "@/game/components/dialogs/useActionInput";
import { useAppDispatch } from "../hooks";
import { onHoldPressed } from "../gameMenusSlice";

export const useGoOnHold = () => {
  const dispatch = useAppDispatch();

  useActionInput({
    action: ["hold", "windowBlurred"],
    onAction() {
      dispatch(onHoldPressed());
    },
  });
};
