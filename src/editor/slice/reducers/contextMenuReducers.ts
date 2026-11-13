import {
  type PayloadAction,
  type SliceCaseReducers,
  type SliceSelectors,
} from "@reduxjs/toolkit";

import { type Xy } from "../../../utils/vectors/vectors";
import { type LevelEditorState } from "../levelEditorSlice";
import { type OpenRoomId } from "../OpenRoom";
import {
  existingLayoutNode,
  findLayoutNode,
  layoutNodesOfType,
  selectOpenRoomSelectedJsonItemIdsFromLevelEditorState,
} from "../PaneLayout";

/**
 * Clear any open item context menu, in every open room. Guarded so that immer does
 * not register a state change when there is nothing to clear.
 */
export const clearContextMenuXyInPlace = (state: LevelEditorState) => {
  for (const openRoom of layoutNodesOfType(state.layout, "openRoom")) {
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
    const openRoom = existingLayoutNode(state.layout, openRoomId);
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
    const openRoom = findLayoutNode(state.layout, openRoomId);
    // check the room wasn't closed (in case we have a stale openRoomId reference)
    if (openRoom === undefined) {
      return undefined;
    }
    return openRoom.contextMenuXy;
  },
} satisfies SliceSelectors<LevelEditorState>;
