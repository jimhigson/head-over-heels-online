import type { ValueOf } from "type-fest";

import type { EditorRoomItemId, EditorRoomJson } from "../editorTypes";
import type { PreviewedRoomItemEdits } from "./levelEditorSlice";

import { objectEntriesIter } from "../../utils/entries";

export const applyPreviewedEditsInPlace = (
  draftRoomJson: EditorRoomJson,
  previewedEdits: PreviewedRoomItemEdits,
) => {
  const previewedEditsEntryIter = objectEntriesIter(
    previewedEdits as Partial<
      Record<EditorRoomItemId, ValueOf<typeof previewedEdits>>
    >,
  );

  for (const [itemId, itemPreview] of previewedEditsEntryIter) {
    if (itemPreview === null) {
      delete draftRoomJson.items[itemId];
    } else {
      draftRoomJson.items[itemId] = itemPreview;
    }
  }
};
