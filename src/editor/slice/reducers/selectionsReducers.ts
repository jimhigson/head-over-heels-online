import type { PayloadAction } from "@reduxjs/toolkit";
import { type SliceCaseReducers } from "@reduxjs/toolkit";
import type { HoveredItem, LevelEditorState } from "../levelEditorSlice";
import type { EditorRoomItemId } from "../../editorTypes";

export const selectionsReducers = {
  /** set (or unset) the selection */
  setSelectedItemsInRoom(
    state,
    {
      payload: { jsonItemIds },
    }: PayloadAction<{
      /** Sets the selection to the provided jsonItemIds, replacing any existing selection. */
      jsonItemIds: EditorRoomItemId[];
    }>,
  ) {
    state.selectedJsonItemIds = jsonItemIds;
  },

  /** toggle the selection of a single item */
  toggleSelectedItemInRoom(
    state,
    {
      payload: { jsonItemId },
    }: PayloadAction<{
      jsonItemId: EditorRoomItemId;
    }>,
  ) {
    const index = state.selectedJsonItemIds.indexOf(jsonItemId);
    if (index === -1) {
      // not selected, add it
      state.selectedJsonItemIds.push(jsonItemId);
    } else {
      // already selected, remove it
      state.selectedJsonItemIds.splice(index, 1);
    }
  },

  setHoveredItemInRoom(state, action: PayloadAction<HoveredItem | undefined>) {
    state.hoveredItem = action.payload;
  },
  setClickableAnnotationHovered(state, action: PayloadAction<boolean>) {
    state.clickableAnnotationHovered = action.payload;
  },
} satisfies SliceCaseReducers<LevelEditorState>;
