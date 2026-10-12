import { type EditorRoomItemId } from "../../editorTypes";
import { selectCursorRoomIdFromLevelEditorState } from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";

/** set which items are selected in the cursor room */
export const setSelectedJsonItemIdsOnCursorRoomInPlace = (
  state: LevelEditorState,
  jsonItemIds: EditorRoomItemId[],
) => {
  state.selectedJsonItemIdsByRoom[
    selectCursorRoomIdFromLevelEditorState(state)
  ] = jsonItemIds;
};
