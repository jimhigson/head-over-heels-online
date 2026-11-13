import { type EditorThunk } from "../../../store/store";
import { findLoadedRoomCache } from "../../loadedRoomCache/loadedRoomCaches";
import { fitEditorRoomView } from "../../slice/EditorRoomView";
import {
  openRoomViewChanged,
  selectOpenRoomCameraAngle,
  selectOpenRoomPaneSize,
} from "../../slice/levelEditorSlice";
import { type OpenRoomId } from "../../slice/OpenRoom";
import { editorRoomRenderDimensions } from "../editorRoomRenderDimensions";

/**
 * breathing room around a fitted room, per side
 */
const fitMarginFraction = 0.1;

/**
 * zoom and pan an open room's view so its room fits the pane, centred, with a
 * 10%-per-side margin of breathing room
 */
export const fitOpenRoomInViewThunk =
  (openRoomId: OpenRoomId): EditorThunk =>
  (dispatch, getState) => {
    const state = getState();
    const loadedRoom = findLoadedRoomCache(openRoomId);
    const paneSize = selectOpenRoomPaneSize(state, openRoomId);
    // check the open room wasn't closed (in case we have a stale openRoomId reference)
    if (loadedRoom === undefined || paneSize === undefined) {
      return;
    }
    dispatch(
      openRoomViewChanged({
        openRoomId,
        view: fitEditorRoomView(
          editorRoomRenderDimensions(
            loadedRoom.getRoomState(),
            selectOpenRoomCameraAngle(state, openRoomId),
          ),
          paneSize,
          fitMarginFraction,
        ),
      }),
    );
  };
