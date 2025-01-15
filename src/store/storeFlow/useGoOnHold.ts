import { useActionInput } from "@/game/components/dialogs/useActionInput";
import { onHoldPressed } from "../store";
import { useAppDispatch } from "../hooks";

export const useGoOnHold = () => {
  const dispatch = useAppDispatch();

  useActionInput({
    action: ["hold", "windowBlurred"],
    onAction() {
      dispatch(onHoldPressed());
    },
  });
};
