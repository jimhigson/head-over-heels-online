import type {
  EditorJsonItemUnion,
  EditorRoomItemId,
  EditorRoomState,
} from "../../editorTypes";
import type { RootStateWithLevelEditorSlice } from "../../slice/levelEditorSlice";

import { selectItemInLevelEditorState } from "../../slice/levelEditorSelectors";

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
