import {
  type PayloadAction,
  type SliceCaseReducers,
  type SliceSelectors,
} from "@reduxjs/toolkit";

import { type LevelEditorState } from "../levelEditorSlice";
import { type OpenRoomId } from "../OpenRoom";
import {
  existingLayoutNode,
  selectActiveOpenRoomFromLevelEditorState,
} from "../PaneLayout";

/** a drag of the selected items, rather than of the view */
export type ItemsDrag = "moveItems" | "resizeItems";

export type DragInProgress = "pan" | ItemsDrag;

export const dragToMoveReducers = {
  changeDragInProgress(
    state,
    {
      payload: { openRoomId, dragInProgress },
    }: PayloadAction<{
      openRoomId: OpenRoomId;
      dragInProgress: DragInProgress | undefined;
    }>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we
    // assigned to the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed
    // anyway
    const openRoom = existingLayoutNode(state.layout, openRoomId);
    openRoom.dragInProgress = dragInProgress;
  },
} satisfies SliceCaseReducers<LevelEditorState>;

export const dragToMoveSelectors = {
  selectOpenRoomDragInProgress(
    state: LevelEditorState,
    openRoomId: OpenRoomId,
  ) {
    return existingLayoutNode(state.layout, openRoomId).dragInProgress;
  },
  selectActiveOpenRoomDragInProgress: (state: LevelEditorState) =>
    selectActiveOpenRoomFromLevelEditorState(state)?.dragInProgress,
} satisfies SliceSelectors<LevelEditorState>;
