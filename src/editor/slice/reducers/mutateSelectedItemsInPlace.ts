import { type EditorJsonItemUnion } from "../../editorTypes";
import { selectCurrentRoomJsonFromLevelEditorState } from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";
import { clearContextMenuXyInPlace } from "./contextMenuReducers";
import { type UndoItemEntry } from "./undoDescription";
import { pushUndoInPlace } from "./undoReducers";

/**
 * Apply an in-place change to every selected item: snapshots the selected items
 * for undo (labelled `verb`), runs `mutate` on each, then closes the context
 * menu. The shared body of the per-config-property reducers.
 */
export const mutateSelectedItemsInPlace = (
  state: LevelEditorState,
  { verb, timestamp }: { verb: string; timestamp: number },
  mutate: (item: EditorJsonItemUnion) => void,
) => {
  const roomJson = selectCurrentRoomJsonFromLevelEditorState(state);

  const items: UndoItemEntry[] = state.selectedJsonItemIds.map((id) => [
    id,
    roomJson.items[id],
  ]);
  pushUndoInPlace(state, { kind: "itemAction", verb, items }, timestamp);

  for (const id of state.selectedJsonItemIds) {
    const item = roomJson.items[id];
    if (item !== undefined) {
      mutate(item);
    }
  }

  clearContextMenuXyInPlace(state);
};
