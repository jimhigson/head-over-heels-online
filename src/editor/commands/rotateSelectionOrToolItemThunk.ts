import { type EditorRootState, type EditorThunk } from "../../store/store";
import { type EditorJsonItemUnion } from "../editorTypes";
import { isRotatable, type RotationSense } from "../itemRotation";
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
    selectedItems.every((item) => item !== undefined && isRotatable(item))
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
 * turns the selected items a quarter-turn - or, with nothing rotatable
 * selected, the item the current tool will place
 */
export const rotateSelectionOrToolItemThunk =
  (sense: RotationSense): EditorThunk =>
  (dispatch, getState) => {
    if (selectSelectionIsRotatable(getState())) {
      dispatch(rotateSelectedItems({ sense, timestamp: Date.now() }));
    } else {
      dispatch(rotateCurrentToolItem({ sense }));
    }
  };
