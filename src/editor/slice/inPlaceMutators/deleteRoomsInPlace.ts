import { type EditorRoomId } from "../../editorTypes";
import { type LevelEditorState } from "../levelEditorSlice";

/**
 * remove rooms from the campaign, with the editor state kept about them: undo
 * history, back/forward history, tabs and item selections
 */
export const deleteRoomsInPlace = (
  state: LevelEditorState,
  roomIds: ReadonlySet<EditorRoomId>,
) => {
  for (const roomId of roomIds) {
    delete state.campaignInProgress.rooms[roomId];
    delete state.history[roomId];
    delete state.selectedJsonItemIdsByRoom[roomId];
  }

  const isNotDeleted = (id: EditorRoomId) => !roomIds.has(id);
  state.editingRoomIdHistory.back =
    state.editingRoomIdHistory.back.filter(isNotDeleted);
  state.editingRoomIdHistory.forward =
    state.editingRoomIdHistory.forward.filter(isNotDeleted);
  state.openRoomTabs = state.openRoomTabs.filter(({ roomId }) =>
    isNotDeleted(roomId),
  );
};
