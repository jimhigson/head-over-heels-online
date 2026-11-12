import { type EditorRoomId } from "../../editorTypes";
import { type LevelEditorState } from "../levelEditorSlice";
import { closeRoomsNotInCampaignInPlace } from "../OpenRoom";

/**
 * remove rooms from the campaign, with the editor state kept about them: undo
 * history, back/forward history, and the open rooms (and tabs) showing them
 */
export const deleteRoomsInPlace = (
  state: LevelEditorState,
  roomIds: ReadonlySet<EditorRoomId>,
) => {
  for (const roomId of roomIds) {
    delete state.campaignInProgress.rooms[roomId];
    delete state.history[roomId];
  }

  const isNotDeleted = (id: EditorRoomId) => !roomIds.has(id);
  state.editingRoomIdHistory.back =
    state.editingRoomIdHistory.back.filter(isNotDeleted);
  state.editingRoomIdHistory.forward =
    state.editingRoomIdHistory.forward.filter(isNotDeleted);
  closeRoomsNotInCampaignInPlace(state);
};
