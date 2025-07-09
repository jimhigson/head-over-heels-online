import type { EditorRoomId, EditorRoomJson } from "../EditorRoomId";
import type { LevelEditorState } from "./levelEditorSlice";

export const selectCurrentRoomFromLevelEditorState = (
  state: LevelEditorState,
) =>
  state.campaignInProgress.rooms[
    state.currentlyEditingRoomId
  ] as EditorRoomJson;

export const selectRoomFromLevelEditorState = (
  state: LevelEditorState,
  roomId: EditorRoomId,
) => state.campaignInProgress.rooms[roomId] as EditorRoomJson | undefined;
