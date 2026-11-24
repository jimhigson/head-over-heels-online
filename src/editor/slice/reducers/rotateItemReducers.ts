import type { PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";

import {
  isPlacedItemRotatable,
  rotatePlacedItemInPlace,
  rotateToolItemsInPlace,
  type RotationSense,
} from "../../itemRotation";
import { selectCurrentCommittedRoomJsonFromLevelEditorState } from "../levelEditorSelectors";
import type { LevelEditorState } from "../levelEditorSlice";
import { applyItemToolInPlace } from "./applyItemToolReducers";
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
   * rotate the items held by the current item-placement tool as a whole, so the
   * next placement faces the new way. Also makes the hover preview (if any)
   * again from the rotated tool, so it keeps matching it. No-op unless an item
   * tool is active.
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
    rotateToolItemsInPlace(state.tool.items, sense);

    if (state.pendingEdits?.madeBy.type === "itemTool") {
      applyItemToolInPlace(state, state.pendingEdits.madeBy.placement);
    }
  },
} satisfies SliceCaseReducers<LevelEditorState>;
