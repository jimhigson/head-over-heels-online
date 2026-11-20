import type { PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";

import type { EditorJsonItemUnion } from "../../editorTypes";
import {
  isPlacedItemRotatable,
  rotateItemInPlace,
  rotatePlacedItemInPlace,
  type RotationSense,
} from "../../itemRotation";
import { selectCurrentCommittedRoomJsonFromLevelEditorState } from "../levelEditorSelectors";
import type { LevelEditorState } from "../levelEditorSlice";
import { previewedItemsIter } from "../previewedItemsIter";
import { clearContextMenuXyInPlace } from "./contextMenuReducers";
import { mutateSelectedItemsInPlace } from "./mutateSelectedItemsInPlace";

export const rotateItemReducers = {
  /** rotate every selected item a quarter-turn (undoable, like the context menu) */
  rotateSelectedItems(
    state,
    {
      payload: { sense, timestamp },
    }: PayloadAction<{ sense: RotationSense; timestamp: number }>,
  ) {
    const roomJson = selectCurrentCommittedRoomJsonFromLevelEditorState(state);
    mutateSelectedItemsInPlace(state, { verb: "Rotate", timestamp }, (item) => {
      if (isPlacedItemRotatable(roomJson, item)) {
        rotatePlacedItemInPlace(item, sense);
      }
    });
    clearContextMenuXyInPlace(state);
  },

  /**
   * rotate the item held by the current item-placement tool, so the next
   * placement faces the new way. Also rotates the hover preview (if any) so it
   * keeps matching the tool. No-op unless an item tool is active.
   */
  rotateCurrentToolItem(
    _state,
    { payload: { sense } }: PayloadAction<{ sense: RotationSense }>,
  ) {
    // see setTool for why the WritableDraft<> wrapper is cast away here:
    const state = _state as LevelEditorState;

    if (state.tool.type !== "item") {
      return;
    }
    // ItemTool is {type, config} with no position; EditorJsonItemUnion is
    // assignable to it, so this is a plain cast (the mutator only reads the
    // type and reads/writes the config):
    rotateItemInPlace(state.tool.item as EditorJsonItemUnion, sense);

    // hover preview is built from the tool, which just changed, so rotate the
    // preview itself too to match the updated tool.
    // Rotating in-place keeps any preview-only config (eg a cyberman placed on
    // a toaster starts deactivated). rotateItemInPlace no-ops on non-rotatable
    // entries, so iterating them all is safe:
    // IT MAY BE BETTER: to re-apply the tool again, rather than modifying the tool's
    // already-created preview
    if (state.pendingEdits?.madeBy.type === "itemTool") {
      for (const itemPreview of previewedItemsIter(state.pendingEdits)) {
        rotateItemInPlace(itemPreview, sense);
      }
    }
  },
} satisfies SliceCaseReducers<LevelEditorState>;
