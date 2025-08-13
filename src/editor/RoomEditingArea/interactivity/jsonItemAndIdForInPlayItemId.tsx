import type {
  EditorRoomState,
  EditorRoomItemId,
  EditorJsonItemUnion,
} from "../../editorTypes";
import { selectItemInLevelEditorState } from "../../slice/levelEditorSelectors";
import type { RootStateWithLevelEditorSlice } from "../../slice/levelEditorSlice";

export const jsonItemAndIdForInPlayItemId = (
  { levelEditor: levelEditorState }: RootStateWithLevelEditorSlice,
  roomState: EditorRoomState,
  itemId: EditorRoomItemId,
): [EditorRoomItemId, EditorJsonItemUnion] | undefined => {
  const jsonItemId = roomState.items[itemId]?.jsonItemId;
  if (jsonItemId === undefined) {
    return undefined;
  }
  const jsonItem = selectItemInLevelEditorState(levelEditorState, jsonItemId);
  if (jsonItem === undefined) {
    return undefined;
  }
  return [jsonItemId, jsonItem];
};
