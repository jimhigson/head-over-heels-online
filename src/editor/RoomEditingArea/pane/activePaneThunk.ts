import { type EditorThunk } from "../../../store/store";
import { type EditorPaneId } from "../../slice/EditorPane";
import { selectActivePaneId } from "../../slice/levelEditorSlice";

/**
 * a thunk that dispatches the one made for the active pane - a no-op while no
 * pane is mounted
 */
export const activePaneThunk =
  (thunkForPane: (paneId: EditorPaneId) => EditorThunk): EditorThunk =>
  (dispatch, getState) => {
    const activePaneId = selectActivePaneId(getState());
    if (activePaneId !== undefined) {
      dispatch(thunkForPane(activePaneId));
    }
  };
