import { type EditorThunk } from "../../../store/store";
import { editorLoadedRoom } from "../../editorLoadedRoom";
import { fitEditorRoomView } from "../../slice/EditorRoomView";
import {
  cursorRoomViewChanged,
  selectEditorCameraAngle,
  selectRoomPaneSize,
} from "../../slice/levelEditorSlice";
import { editorRoomRenderDimensions } from "../editorRoomRenderDimensions";

/** breathing room around a fitted room, per side */
const fitMarginFraction = 0.1;

/**
 * zoom and pan the cursor room's view so the room fits the pane, centred,
 * with a 10%-per-side margin of breathing room
 */
export const fitCursorRoomInViewThunk =
  (): EditorThunk => (dispatch, getState) => {
    const state = getState();
    dispatch(
      cursorRoomViewChanged(
        fitEditorRoomView(
          editorRoomRenderDimensions(
            editorLoadedRoom.getRoomState(),
            selectEditorCameraAngle(state),
          ),
          selectRoomPaneSize(state),
          fitMarginFraction,
        ),
      ),
    );
  };
