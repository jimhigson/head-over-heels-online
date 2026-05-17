import { type EditorRootState } from "../../../store/store";
import {
  type EditorJsonItemUnion,
  type EditorRoomItemId,
  type EditorRoomState,
} from "../../editorTypes";
import { selectItemInLevelEditorState } from "../../slice/levelEditorSelectors";

export const jsonItemAndIdForInPlayItemId = (
  { levelEditor: levelEditorState }: EditorRootState,
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
