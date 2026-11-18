import { type EditorRoomItemId } from "../../editorTypes";
import { selectActiveCursorRoomEditingPaneFromLevelEditorState } from "../EditorPane";
import { selectCursorRoomIdFromLevelEditorState } from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";

/**
 * set which items are selected in the cursor room, by the active pane - a
 * no-op unless the active pane edits the cursor room
 */
export const setSelectedJsonItemIdsOnCursorRoomInPlace = (
  state: LevelEditorState,
  jsonItemIds: EditorRoomItemId[],
) => {
  const pane = selectActiveCursorRoomEditingPaneFromLevelEditorState(state);
  if (pane !== undefined) {
    pane.selectedJsonItemIdsByRoom[
      selectCursorRoomIdFromLevelEditorState(state)
    ] = jsonItemIds;
  }
};
