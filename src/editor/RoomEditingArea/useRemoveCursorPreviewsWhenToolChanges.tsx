import { useEffect } from "preact/hooks";

import { startAppListening } from "../../store/listenerMiddleware";
import { resetPreviewedEdits, setTool } from "../slice/levelEditorSlice";

export const useRemoveCursorPreviewsWhenToolChanges = () => {
  useEffect(() => {
    return startAppListening({
      actionCreator: setTool,
      effect(_action, { dispatch }) {
        dispatch(resetPreviewedEdits());
      },
    });
  });
};
