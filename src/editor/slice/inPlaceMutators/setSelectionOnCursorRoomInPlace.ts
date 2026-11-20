import { type LevelEditorState } from "../levelEditorSlice";
import { selectActiveCursorRoomEditingOpenRoomFromLevelEditorState } from "../PaneLayout";
import { type SelectionEntry } from "../SelectionEntry";

/**
 * set what is selected in the cursor room - a no-op unless the active
 * open room is the front tab's (eg not while a dialog's is active)
 */
export const setSelectionOnCursorRoomInPlace = (
  state: LevelEditorState,
  selection: SelectionEntry[],
) => {
  const openRoom =
    selectActiveCursorRoomEditingOpenRoomFromLevelEditorState(state);
  if (openRoom !== undefined) {
    openRoom.selection = selection;
  }
};
