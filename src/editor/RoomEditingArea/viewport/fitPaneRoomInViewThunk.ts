import { type EditorThunk } from "../../../store/store";
import { paneLoadedRooms } from "../../paneLoadedRooms";
import { type EditorPaneId } from "../../slice/EditorPane";
import { fitEditorRoomView } from "../../slice/EditorRoomView";
import {
  paneViewChanged,
  selectEditorCameraAngle,
  selectPaneSize,
} from "../../slice/levelEditorSlice";
import { editorRoomRenderDimensions } from "../editorRoomRenderDimensions";

/** breathing room around a fitted room, per side */
const fitMarginFraction = 0.1;

/**
 * zoom and pan a pane's view so its room fits the pane, centred, with a
 * 10%-per-side margin of breathing room
 */
export const fitPaneRoomInViewThunk =
  (paneId: EditorPaneId): EditorThunk =>
  (dispatch, getState) => {
    const state = getState();
    const loadedRoom = paneLoadedRooms.get(paneId);
    const paneSize = selectPaneSize(state, paneId);
    // check pane wasn't closed (in case we have a stale paneId reference)
    if (loadedRoom === undefined || paneSize === undefined) {
      return;
    }
    dispatch(
      paneViewChanged({
        paneId,
        view: fitEditorRoomView(
          editorRoomRenderDimensions(
            loadedRoom.getRoomState(),
            selectEditorCameraAngle(state),
          ),
          paneSize,
          fitMarginFraction,
        ),
      }),
    );
  };
