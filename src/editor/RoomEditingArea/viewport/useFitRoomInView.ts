import { useEffect } from "preact/hooks";

import { startEditorListening } from "../../../store/listenerMiddleware";
import {
  selectCursorRoomView,
  selectRoomPaneSize,
} from "../../slice/levelEditorSlice";
import { fitCursorRoomInViewThunk } from "./fitCursorRoomInViewThunk";

/**
 * fits the cursor room in the pane whenever its tab has no view of its own -
 * a newly opened tab, or after rotating - once the pane has a size
 */
export const useFitRoomInView = () => {
  useEffect(
    () =>
      startEditorListening({
        predicate(_action, state) {
          const paneSize = selectRoomPaneSize(state);
          return (
            selectCursorRoomView(state) === undefined &&
            paneSize.x > 0 &&
            paneSize.y > 0
          );
        },
        effect(_action, { dispatch }) {
          dispatch(fitCursorRoomInViewThunk());
        },
      }),
    [],
  );
};
