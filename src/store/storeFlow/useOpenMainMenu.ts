import { store } from "../store";
import { menuPressed } from "../gameMenusSlice";
import { useActionInput } from "../../game/components/dialogs/useActionInput";

export const useOpenMainMenu = () => {
  useActionInput({
    action: "menu",
    onAction() {
      store.dispatch(menuPressed());
    },
  });
};
