import { type EditorRootState } from "../../../store/store";
import {
  type EditorJsonItemUnion,
  type EditorRoomItemId,
  type EditorUnionOfAllItemInPlayTypes,
} from "../../editorTypes";
import { selectItemInLevelEditorState } from "../../slice/levelEditorSelectors";

/**
 * for a given in-play item, do the reverse-lookup back to the entry of the json
 * item it came from
 */
export const jsonItemAndIdForInPlayItem = (
  { levelEditor: levelEditorState }: EditorRootState,
  inPlayItem: EditorUnionOfAllItemInPlayTypes | undefined,
): [EditorRoomItemId, EditorJsonItemUnion] | undefined => {
  const jsonItemId = inPlayItem?.jsonItemId;
  if (jsonItemId === undefined) {
    return undefined;
  }
  const jsonItem = selectItemInLevelEditorState(levelEditorState, jsonItemId);
  if (jsonItem === undefined) {
    return undefined;
  }
  return [jsonItemId, jsonItem];
};
