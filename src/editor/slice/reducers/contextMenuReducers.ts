import {
  type PayloadAction,
  type SliceCaseReducers,
  type SliceSelectors,
} from "@reduxjs/toolkit";

import { valuesIter } from "../../../utils/entries";
import { type Xy } from "../../../utils/vectors/vectors";
import { type LevelEditorState } from "../levelEditorSlice";
import {
  existingOpenRoom,
  type OpenRoomId,
  selectOpenRoomSelectedJsonItemIdsFromLevelEditorState,
} from "../OpenRoom";

/**
 * Clear any open item context menu, in every open room. Guarded so that immer does
 * not register a state change when there is nothing to clear.
 */
export const clearContextMenuXyInPlace = (state: LevelEditorState) => {
  for (const openRoom of valuesIter(state.openRooms)) {
    if (openRoom.contextMenuXy !== undefined) {
      openRoom.contextMenuXy = undefined;
    }
  }
};

export const contextMenuReducers = {
  /**
   * open the item context menu in a openRoom at the given position (scaled pixels,
   * in the room's projected screen space - ie, the same space as
   * PointingAt.scrXy)
   */
  openItemContextMenu(
    state,
    {
      payload: { openRoomId, scrXy },
    }: PayloadAction<{ openRoomId: OpenRoomId; scrXy: Xy }>,
  ) {
    const openRoom = existingOpenRoom(state, openRoomId);
    // only show a context menu when there is a selection to provide context for:
    if (
      selectOpenRoomSelectedJsonItemIdsFromLevelEditorState(state, openRoomId)
        .length > 0
    ) {
      openRoom.contextMenuXy = scrXy;
    }
  },
  closeItemContextMenu(state) {
    clearContextMenuXyInPlace(state);
  },
} satisfies SliceCaseReducers<LevelEditorState>;

export const contextMenuSelectors = {
  selectOpenRoomContextMenuXy(state: LevelEditorState, openRoomId: OpenRoomId) {
    const openRoom = state.openRooms[openRoomId];
    // check the room wasn't closed (in case we have a stale openRoomId reference)
    if (openRoom === undefined) {
      return undefined;
    }
    return openRoom.contextMenuXy;
  },
} satisfies SliceSelectors<LevelEditorState>;
