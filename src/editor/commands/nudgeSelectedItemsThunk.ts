import { type EditorThunk } from "../../store/store";
import { elementWiseProductXyz, originXyz } from "../../utils/vectors/vectors";
import { editorLoadedRoom } from "../editorLoadedRoom";
import { itemMoveOrResizeWouldCollide } from "../RoomEditingArea/cursor/editWouldCollide";
import {
  commitCurrentPreviewedEdits,
  moveOrResizeItemAsPreview,
  selectCursorRoomSelectedJsonItemIds,
} from "../slice/levelEditorSlice";
import { type NudgeArgs } from "../toolbar/buttons/nudgeDirections";

/**
 * moves and/or resizes the selected items one step, as one edit - unless
 * that would make them collide
 */
export const nudgeSelectedItemsThunk =
  ({ posVector = originXyz, timesDelta }: NudgeArgs): EditorThunk =>
  (dispatch, getState) => {
    const editorState = getState();
    const { gridResolution } = editorState.levelEditor;
    const jsonItemIds = selectCursorRoomSelectedJsonItemIds(editorState);

    // scale the position vector by grid resolution in all directions but z:
    const positionDelta =
      timesDelta ? posVector : (
        elementWiseProductXyz(posVector, {
          x: gridResolution,
          y: gridResolution,
          z: 1,
        })
      );
    const fullTimesDelta = { ...originXyz, ...timesDelta };

    const collides = itemMoveOrResizeWouldCollide({
      roomState: editorLoadedRoom.getRoomState(),
      jsonItemIds,
      blockPositionDelta: positionDelta,
      timesDelta: fullTimesDelta,
    });

    if (collides) {
      console.warn("nudge would collide");
      return;
    }

    dispatch(
      moveOrResizeItemAsPreview({
        jsonItemIds,
        positionDelta,
        timesDelta: fullTimesDelta,
        timestamp: Date.now(),
      }),
    );
    dispatch(commitCurrentPreviewedEdits());
  };
