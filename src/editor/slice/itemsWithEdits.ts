import { entries } from "../../utils/entries";
import { type EditorRoomJsonItems } from "../editorTypes";
import { type PreviewedRoomItemEdits } from "./levelEditorSlice";

/**
 * a room's items as they would be with the edits applied - edited items
 * replaced, deleted ones (null) removed
 */
export const itemsWithEdits = (
  items: EditorRoomJsonItems,
  edits: PreviewedRoomItemEdits,
): EditorRoomJsonItems => {
  const editedItems: EditorRoomJsonItems = { ...items };
  for (const [id, item] of entries(edits)) {
    if (item === null) {
      delete editedItems[id];
    } else {
      editedItems[id] = item;
    }
  }
  return editedItems;
};
