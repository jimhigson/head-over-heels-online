import { createSelector } from "@reduxjs/toolkit";
import { selectorHook } from "../../utils/react/selectorHook";
import type { RootStateWithLevelEditorSlice } from "./levelEditorSlice";
import { selectCurrentEditingRoomJson } from "./levelEditorSlice";
import type { EditorRoomItemId, EditorRoomJson } from "../editorTypes";
import { objectEntries } from "iter-tools";
import { produce } from "immer";
import type { ValueOf } from "type-fest";

export const useCurrentEditingRoomJson = selectorHook(
  selectCurrentEditingRoomJson,
);

/**
 * gets the current editing room json with temporary previews applied on
 * top of it
 */
export const selectCurrentEditingRoomJsonWithPreviews = createSelector(
  [
    selectCurrentEditingRoomJson,
    (state: RootStateWithLevelEditorSlice) => state.levelEditor.previewedEdits,
  ],
  (roomJson, previewedEdits): EditorRoomJson => {
    // apply previews on top of the current room:
    return produce(roomJson, (draftRoomJson) => {
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
    });
  },
);
