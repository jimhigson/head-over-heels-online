import type { ValueOf } from "type-fest";

import { objectEntries } from "iter-tools";

import type { EditorRoomItemId, EditorRoomJson } from "../editorTypes";
import type { PreviewedRoomItemEdits } from "./levelEditorSlice";

export const applyPreviewedEditsInPlace = (
  draftRoomJson: EditorRoomJson,
  previewedEdits: PreviewedRoomItemEdits,
) => {
  const previewedEditsEntryIter = objectEntries(previewedEdits) as Iterable<
    [EditorRoomItemId, ValueOf<typeof previewedEdits>]
  >;

  for (const [itemId, itemPreview] of previewedEditsEntryIter) {
    if (itemPreview === null) {
      delete draftRoomJson.items[itemId];
    } else {
      draftRoomJson.items[itemId] = itemPreview;
    }
  }
};
