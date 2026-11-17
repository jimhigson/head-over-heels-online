import { type EditorRoomItemId } from "../../editorTypes";
import { type LevelEditorState } from "../levelEditorSlice";
import { selectActiveCursorRoomEditingOpenRoomFromLevelEditorState } from "../OpenRoom";

/**
 * set which items are selected in the cursor room - a no-op unless the active
 * open room is the front tab's (eg not while a dialog's is active)
 */
export const setSelectedJsonItemIdsOnCursorRoomInPlace = (
  state: LevelEditorState,
  jsonItemIds: EditorRoomItemId[],
) => {
  const openRoom =
    selectActiveCursorRoomEditingOpenRoomFromLevelEditorState(state);
  if (openRoom !== undefined) {
    openRoom.selectedJsonItemIds = jsonItemIds;
  }
};
