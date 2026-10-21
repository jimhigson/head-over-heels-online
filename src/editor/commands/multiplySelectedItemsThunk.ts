import {
  isItemOverFloor,
  needsFloorUnder,
} from "../../model/json/verification/helpers/isItemOverFloor";
import { floorSquares } from "../../model/json/verification/helpers/roomPerimeter";
import { type EditorThunk } from "../../store/store";
import { addXyz, originXyz, type Xyz } from "../../utils/vectors/vectors";
import { type EditorRoomItemId, type EditorRoomState } from "../editorTypes";
import {
  addingItemWouldCollide,
  itemMoveOrResizeWouldCollide,
} from "../RoomEditingArea/cursor/editWouldCollide";
import { selectCurrentEditingRoomJsonWithPreviews } from "../slice/levelEditorSelectors";
import {
  multiplySelectedItems,
  selectCursorRoomSelectedJsonItemIds,
} from "../slice/levelEditorSlice";
import { multiplyPlan, type MultiplyType } from "../slice/multiplyPlan";
import { growArgs } from "../toolbar/buttons/nudgeDirections";

const noPreviewOnlyJsonItemIds: ReadonlySet<EditorRoomItemId> = new Set();

/**
 * multiplies (or shrinks) the selected items one block in a world direction,
 * adding to the nudges being previewed. A copy that would collide or hang off
 * the floor is left out, and the others still made
 */
export const multiplySelectedItemsThunk =
  (
    /**
     * a world unit vector
     */
    direction: Xyz,
    multiplyType: MultiplyType,
    /**
     * the loaded cursor room, to check the copies and growth for collisions in
     */
    roomState: EditorRoomState,
  ): EditorThunk =>
  (dispatch, getState) => {
    const editorState = getState();
    // nudges still being previewed are built on:
    const roomJson = selectCurrentEditingRoomJsonWithPreviews(editorState);
    const plan = multiplyPlan(
      roomJson,
      selectCursorRoomSelectedJsonItemIds(editorState),
      direction,
      multiplyType,
    );

    const { posVector = originXyz, timesDelta } = growArgs(direction);
    const growthCollides =
      multiplyType === "multiply" &&
      itemMoveOrResizeWouldCollide({
        roomState,
        roomJson,
        jsonItemIds: plan.resizedItemIds,
        blockPositionDelta: posVector,
        timesDelta: { ...originXyz, ...timesDelta },
      });

    const roomFloorSquares = floorSquares(roomJson);
    const copiedItemIds = plan.copiedItemIds.filter((copiedItemId) => {
      const copiedItem = roomJson.items[copiedItemId];
      const { type, config } = copiedItem;
      const copy = {
        ...copiedItem,
        position: addXyz(copiedItem.position, direction),
      };
      return (
        (!needsFloorUnder(roomJson, copy) ||
          isItemOverFloor(roomFloorSquares, copy)) &&
        !addingItemWouldCollide({
          roomState,
          blockPosition: copy.position,
          itemTool: { type, config },
          previewOnlyJsonItemIds: noPreviewOnlyJsonItemIds,
        })
      );
    });

    dispatch(
      multiplySelectedItems({
        direction,
        multiplyType,
        plan: {
          ...plan,
          resizedItemIds: growthCollides ? [] : plan.resizedItemIds,
          copiedItemIds,
        },
        timestamp: Date.now(),
      }),
    );
  };
