import { useActionInput } from "@/game/components/dialogs/useActionInput";
import { menuPressed, store } from "../store";

export const useOpenMainMenu = () => {
  useActionInput({
    action: "menu",
    onAction() {
      store.dispatch(menuPressed());
    },
  });
};
