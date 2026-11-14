import { useEffect } from "preact/hooks";

import { startEditorListening } from "../../../store/listenerMiddleware";
import {
  selectOpenRoomPaneSize,
  selectOpenRoomView,
} from "../../slice/levelEditorSlice";
import { useOpenRoomPane } from "../useOpenRoomPane";
import { fitOpenRoomInViewThunk } from "./fitOpenRoomInViewThunk";

/**
 * fits the open room in its pane whenever it has no view - a newly opened
 * tab, or after rotating - once the pane has a size
 */
export const useFitRoomInView = () => {
  const { openRoomId } = useOpenRoomPane();
  useEffect(
    () =>
      startEditorListening({
        predicate(_action, state) {
          const paneSize = selectOpenRoomPaneSize(state, openRoomId);
          // check the open room wasn't closed (in case we have a stale openRoomId reference)
          if (paneSize === undefined) {
            return false;
          }
          return (
            selectOpenRoomView(state, openRoomId) === undefined &&
            paneSize.x > 0 &&
            paneSize.y > 0
          );
        },
        effect(_action, { dispatch }) {
          dispatch(fitOpenRoomInViewThunk(openRoomId));
        },
      }),
    [openRoomId],
  );
};
