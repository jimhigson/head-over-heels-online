import type { PayloadAction } from "@reduxjs/toolkit";
import { type SliceCaseReducers } from "@reduxjs/toolkit";
import type { HoveredItem, LevelEditorState } from "../levelEditorSlice";
import type { EditorRoomItemId } from "../../editorTypes";

export const selectionsReducers = {
  /** set (or unset) the selection */
  setSelectedItemInRoom(
    state,
    {
      payload: { jsonItemId, additive = false },
    }: PayloadAction<{
      jsonItemId: EditorRoomItemId | undefined;
      /** if true, will toggle the given ids to the current selection instead of replacing it
       * this is used for multi-select */
      additive?: boolean;
    }>,
  ) {
    if (additive) {
      if (jsonItemId === undefined) {
        // if no item is given, clear the selection
        state.selectedJsonItemIds = [];
      } else {
        // toggle the given item id in the selection
        const index = state.selectedJsonItemIds.indexOf(jsonItemId);
        if (index === -1) {
          // not selected, add it
          state.selectedJsonItemIds.push(jsonItemId);
        } else {
          // already selected, remove it
          state.selectedJsonItemIds.splice(index, 1);
        }
      }
    } else {
      state.selectedJsonItemIds = jsonItemId === undefined ? [] : [jsonItemId];
    }
  },

  setHoveredItemInRoom(state, action: PayloadAction<HoveredItem | undefined>) {
    state.hoveredItem = action.payload;
  },
  setClickableAnnotationHovered(state, action: PayloadAction<boolean>) {
    state.clickableAnnotationHovered = action.payload;
  },
} satisfies SliceCaseReducers<LevelEditorState>;
