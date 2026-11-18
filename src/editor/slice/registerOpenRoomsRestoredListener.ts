import { startAppListening } from "../../store/listenerMiddleware";
import { levelEditorPersistKey } from "../../store/persist/levelEditorPersist";
import { isRehydrateFor } from "../../utils/redux/isRehydrateFor";
import { openRoomsRestored } from "./levelEditorSlice";

/**
 * once the editor's state is restored from storage, bring its open rooms and
 * tabs in line with the restored campaign - before anything draws them
 */
export const registerOpenRoomsRestoredListener = () => {
  startAppListening({
    matcher: isRehydrateFor(levelEditorPersistKey),
    effect(_action, { dispatch }) {
      dispatch(openRoomsRestored());
    },
  });
};
