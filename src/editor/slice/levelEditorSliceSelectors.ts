import type {
  EditorJsonItemUnion,
  EditorRoomId,
  EditorRoomItemId,
  EditorRoomJson,
} from "../editorTypes";
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

export const selectItemInLevelEditorState = (
  state: LevelEditorState,
  itemId: EditorRoomItemId,
  /** if not given, uses the room currently being edited */
  roomId?: EditorRoomId,
) =>
  state.campaignInProgress.rooms[roomId ?? state.currentlyEditingRoomId]?.items[
    itemId
  ] as EditorJsonItemUnion | undefined;
