import { useActionInput } from "@/game/components/dialogs/useActionInput";
import { store } from "../store";
import { menuPressed } from "../gameMenusSlice";

export const useOpenMainMenu = () => {
  useActionInput({
    action: "menu",
    onAction() {
      store.dispatch(menuPressed());
    },
  });
};
