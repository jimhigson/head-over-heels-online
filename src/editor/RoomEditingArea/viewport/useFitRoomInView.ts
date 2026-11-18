import { useEffect } from "preact/hooks";

import { startEditorListening } from "../../../store/listenerMiddleware";
import { selectPaneSize, selectPaneView } from "../../slice/levelEditorSlice";
import { useEditorPane } from "../pane/EditorPaneProvider";
import { fitPaneRoomInViewThunk } from "./fitPaneRoomInViewThunk";

/**
 * fits the pane's room in the pane whenever it has no view - a newly opened
 * tab, or after rotating - once the pane has a size
 */
export const useFitRoomInView = () => {
  const { paneId } = useEditorPane();
  useEffect(
    () =>
      startEditorListening({
        predicate(_action, state) {
          const paneSize = selectPaneSize(state, paneId);
          // check pane wasn't closed (in case we have a stale paneId reference)
          if (paneSize === undefined) {
            return false;
          }
          return (
            selectPaneView(state, paneId) === undefined &&
            paneSize.x > 0 &&
            paneSize.y > 0
          );
        },
        effect(_action, { dispatch }) {
          dispatch(fitPaneRoomInViewThunk(paneId));
        },
      }),
    [paneId],
  );
};
