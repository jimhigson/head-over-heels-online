import type { EditorRoomJson } from "../EditorRoomId";
import type { LevelEditorState } from "./levelEditorSlice";

export const selectCurrentRoomFromLevelEditorState = (
  state: LevelEditorState,
) =>
  state.campaignInProgress.rooms[
    state.currentlyEditingRoomId
  ] as EditorRoomJson;
