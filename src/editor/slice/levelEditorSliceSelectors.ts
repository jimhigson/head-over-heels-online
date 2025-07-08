import type {
  EditorJsonItemUnion,
  EditorRoomId,
  EditorRoomItemId,
  EditorRoomJson,
} from "../EditorRoomId";
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

export const selectItemFromLevelEditorState = (
  state: LevelEditorState,
  roomId: EditorRoomId,
  itemId: EditorRoomItemId,
) =>
  state.campaignInProgress.rooms[roomId]?.items[itemId] as
    | EditorJsonItemUnion
    | undefined;

export const selectItemInCurrentRoomFromLevelEditorState = (
  state: LevelEditorState,
  itemId: EditorRoomItemId,
) =>
  state.campaignInProgress.rooms[state.currentlyEditingRoomId]?.items[
    itemId
  ] as EditorJsonItemUnion | undefined;
