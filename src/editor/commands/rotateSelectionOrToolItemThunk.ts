import { produce } from "immer";

import { getJsonItemTimes } from "../../model/times";
import { type EditorRootState, type EditorThunk } from "../../store/store";
import { fromEntries } from "../../utils/entries";
import { subXyz } from "../../utils/vectors/vectors";
import { type EditorJsonItemUnion, type EditorRoomState } from "../editorTypes";
import {
  isPlacedItemRotatable,
  isRotatable,
  rotatePlacedItemInPlace,
  type RotationSense,
} from "../itemRotation";
import {
  type ItemMoveOrResize,
  itemMoveOrResizeWouldCollide,
} from "../RoomEditingArea/cursor/editWouldCollide";
import { selectCurrentEditingRoomJsonWithPreviews } from "../slice/levelEditorSelectors";
import {
  rotateCurrentToolItem,
  rotateSelectedItems,
  selectCurrentCommittedRoomJson,
  selectCursorRoomSelectedJsonItemIds,
  selectTool,
} from "../slice/levelEditorSlice";

const selectSelectionIsRotatable = (state: EditorRootState): boolean => {
  const roomJson = selectCurrentCommittedRoomJson(state);
  const selectedItems = selectCursorRoomSelectedJsonItemIds(state).map(
    (jsonItemId) => roomJson.items[jsonItemId],
  );
  return (
    selectedItems.length > 0 &&
    selectedItems.every(
      (item) => item !== undefined && isPlacedItemRotatable(roomJson, item),
    )
  );
};

const selectToolItemIsRotatable = (state: EditorRootState): boolean => {
  const tool = selectTool(state);
  // ItemTool is {type, config}; EditorJsonItemUnion is assignable to it, so the
  // cast just gives isRotatable the discriminated view it expects:
  return tool.type === "item" && isRotatable(tool.item as EditorJsonItemUnion);
};

/** whether there is anything to rotate: the selection, or else the tool's item */
export const selectSelectionOrToolItemIsRotatable = (
  state: EditorRootState,
): boolean =>
  selectSelectionIsRotatable(state) || selectToolItemIsRotatable(state);

/**
 * how turning a placed item moves and resizes it - a turn is, to collision, a
 * move plus a resize
 */
const rotationAsMoveOrResize = (
  item: EditorJsonItemUnion,
  sense: RotationSense,
): ItemMoveOrResize => {
  const rotatedItem = produce(item, (draftItem) => {
    rotatePlacedItemInPlace(draftItem, sense);
  });
  return {
    blockPositionDelta: subXyz(rotatedItem.position, item.position),
    timesDelta: subXyz(getJsonItemTimes(rotatedItem), getJsonItemTimes(item)),
  };
};

/**
 * turns the selected items a quarter-turn - or, with nothing rotatable
 * selected, the item the current tool will place. The selection is left as it
 * is if any of it would turn into something
 */
export const rotateSelectionOrToolItemThunk =
  (
    sense: RotationSense,
    /**
     * the loaded cursor room, to check the turned items for collisions in -
     * undefined while it isn't loaded, when the selection can't be turned
     */
    roomState: EditorRoomState | undefined,
  ): EditorThunk =>
  (dispatch, getState) => {
    const state = getState();
    if (!selectSelectionIsRotatable(state)) {
      dispatch(rotateCurrentToolItem({ sense }));
      return;
    }
    if (roomState === undefined) {
      return;
    }
    // previewed nudges are built on:
    const roomJson = selectCurrentEditingRoomJsonWithPreviews(state);
    // the items all turn together, so are checked together:
    const wouldCollide = itemMoveOrResizeWouldCollide({
      roomState,
      roomJson,
      movesOrResizes: fromEntries(
        selectCursorRoomSelectedJsonItemIds(state).map((jsonItemId) => [
          jsonItemId,
          rotationAsMoveOrResize(roomJson.items[jsonItemId], sense),
        ]),
      ),
    });
    if (!wouldCollide) {
      dispatch(rotateSelectedItems({ sense, timestamp: Date.now() }));
    }
  };
