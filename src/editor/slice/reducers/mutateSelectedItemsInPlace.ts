import { type EditorJsonItemUnion } from "../../editorTypes";
import {
  selectCurrentCommittedRoomJsonFromLevelEditorState,
  selectCursorRoomSelectedJsonItemIdsFromLevelEditorState,
} from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";
import { type UndoItemEntry } from "./undoDescription";
import { pushUndoToCursorRoomInPlace } from "./undoReducers";

/**
 * Apply an in-place change to every selected item: snapshots the selected items
 * for undo (labelled `verb`), then runs `mutate` on each. The shared body of
 * the per-config-property reducers.
 */
export const mutateSelectedItemsInPlace = (
  state: LevelEditorState,
  { verb, timestamp }: { verb: string; timestamp: number },
  mutate: (item: EditorJsonItemUnion) => void,
) => {
  const roomJson = selectCurrentCommittedRoomJsonFromLevelEditorState(state);

  const items: UndoItemEntry[] =
    selectCursorRoomSelectedJsonItemIdsFromLevelEditorState(state).map((id) => [
      id,
      roomJson.items[id],
    ]);
  pushUndoToCursorRoomInPlace(
    state,
    { kind: "itemAction", verb, items },
    timestamp,
  );

  for (const id of selectCursorRoomSelectedJsonItemIdsFromLevelEditorState(
    state,
  )) {
    const item = roomJson.items[id];
    if (item !== undefined) {
      mutate(item);
    }
  }
};
