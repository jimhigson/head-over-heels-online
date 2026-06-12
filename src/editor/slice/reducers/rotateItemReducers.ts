import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import { valuesIter } from "../../../utils/entries";
import { type EditorJsonItemUnion } from "../../editorTypes";
import { rotateItemInPlace, type RotationSense } from "../../itemRotation";
import { type LevelEditorState } from "../levelEditorSlice";
import { mutateSelectedItemsInPlace } from "./mutateSelectedItemsInPlace";

export const rotateItemReducers = {
  /** rotate every selected item a quarter-turn (undoable, like the context menu) */
  rotateSelectedItems(
    state,
    {
      payload: { sense, timestamp },
    }: PayloadAction<{ sense: RotationSense; timestamp: number }>,
  ) {
    mutateSelectedItemsInPlace(state, { verb: "Rotate", timestamp }, (item) =>
      rotateItemInPlace(item, sense),
    );
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

    // the hover preview is built from the tool, so rotate its item(s) too -
    // rotating in place keeps any preview-only config (eg a cyberman placed on
    // a toaster starts deactivated). rotateItemInPlace no-ops on non-rotatable
    // entries, so iterating them all is safe:
    if (state.pendingEdits !== undefined) {
      for (const itemPreview of valuesIter(state.pendingEdits.edits)) {
        if (itemPreview !== null) {
          rotateItemInPlace(itemPreview, sense);
        }
      }
    }
  },
} satisfies SliceCaseReducers<LevelEditorState>;
