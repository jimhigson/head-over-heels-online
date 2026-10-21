import { type EditorThunk } from "../../store/store";
import { type AxisXyz, originXyz, type Xyz } from "../../utils/vectors/vectors";
import { type EditorRoomState } from "../editorTypes";
import { itemMoveOrResizeWouldCollide } from "../RoomEditingArea/cursor/editWouldCollide";
import { selectCurrentEditingRoomJsonWithPreviews } from "../slice/levelEditorSelectors";
import {
  nudgeSelectedItems,
  selectCursorRoomSelectedJsonItemIds,
} from "../slice/levelEditorSlice";
import { snapGridResolution } from "../snapGridResolution";
import { type NudgeArgs } from "../toolbar/buttons/nudgeDirections";

/**
 * how far to move from `position` to the next line of the grid along each
 * axis of `direction` - a whole step when already on the grid, less when
 * between its lines
 */
const deltaToNextGridLine = (
  position: Xyz,
  /**
   * a world unit vector
   */
  direction: Xyz,
  /**
   * the grid's spacing along each axis
   */
  step: Xyz,
): Xyz => {
  const deltaOnAxis = (axis: AxisXyz) => {
    const gridLine = position[axis] / step[axis];
    return (
      (direction[axis] > 0 ? (Math.floor(gridLine) + 1) * step[axis]
      : direction[axis] < 0 ? (Math.ceil(gridLine) - 1) * step[axis]
      : position[axis]) - position[axis]
    );
  };
  return { x: deltaOnAxis("x"), y: deltaOnAxis("y"), z: deltaOnAxis("z") };
};

/**
 * moves and/or resizes the selected items one step, adding to the nudges
 * being previewed - unless that would make them collide. Moves snap the first selected item to the
 * next line of the grid, and the others move with it
 */
export const nudgeSelectedItemsThunk =
  (
    { posVector = originXyz, timesDelta }: NudgeArgs,
    /**
     * the loaded cursor room, to check the nudge for collisions in
     */
    roomState: EditorRoomState,
  ): EditorThunk =>
  (dispatch, getState) => {
    const editorState = getState();
    const jsonItemIds = selectCursorRoomSelectedJsonItemIds(editorState);
    if (jsonItemIds.length === 0) {
      return;
    }
    // nudges still being previewed are built on:
    const roomJson = selectCurrentEditingRoomJsonWithPreviews(editorState);
    const step = snapGridResolution(
      editorState.levelEditor.gridResolution,
      jsonItemIds
        .map((jsonItemId) => roomJson.items[jsonItemId])
        .filter((jsonItem) => jsonItem !== undefined)
        .map(({ type }) => type),
    );

    const [leadJsonItemId] = jsonItemIds;
    const positionDelta =
      timesDelta ? posVector : (
        deltaToNextGridLine(
          roomJson.items[leadJsonItemId].position,
          posVector,
          {
            x: step,
            y: step,
            z: 1,
          },
        )
      );
    const fullTimesDelta = { ...originXyz, ...timesDelta };

    const collides = itemMoveOrResizeWouldCollide({
      roomState,
      roomJson,
      jsonItemIds,
      blockPositionDelta: positionDelta,
      timesDelta: fullTimesDelta,
    });

    if (collides) {
      console.warn("nudge would collide");
      return;
    }

    dispatch(
      nudgeSelectedItems({
        positionDelta,
        timesDelta: fullTimesDelta,
        timestamp: Date.now(),
      }),
    );
  };
