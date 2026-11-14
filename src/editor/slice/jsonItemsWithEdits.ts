import { entries } from "../../utils/entries";
import { type EditorRoomJsonItems } from "../editorTypes";
import { type PreviewedRoomItemEdits } from "./levelEditorSlice";

/**
 * create a copy of a room's items with edits applied
 */
export const jsonItemsWithEdits = (
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
