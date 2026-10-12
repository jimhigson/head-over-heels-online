import {
  type PayloadAction,
  type SliceCaseReducers,
  type SliceSelectors,
} from "@reduxjs/toolkit";

import { type EditorRoomId } from "../../editorTypes";
import { changeCurrentRoomInPlace } from "../inPlaceMutators/changeCurrentRoomInPlace";
import { pinRoomTabInPlace } from "../inPlaceMutators/pinRoomTabInPlace";
import { selectCursorRoomIdFromLevelEditorState } from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";

export const roomTabsReducers = {
  /**
   * close a room's tab. The last tab can't be closed; closing the active one
   * moves to the tab after it, or before it if it was the last
   */
  closeRoomTab(_state, { payload: roomId }: PayloadAction<EditorRoomId>) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;

    const roomTabs = state.openRoomTabs;
    const closingIndex = roomTabs.findIndex(
      (roomTab) => roomTab.roomId === roomId,
    );
    if (closingIndex === -1 || roomTabs.length === 1) {
      return;
    }

    if (roomId === selectCursorRoomIdFromLevelEditorState(state)) {
      // move off first, so the closing room isn't the cursor room any more:
      const neighbourTab =
        roomTabs[closingIndex + 1] ?? roomTabs[closingIndex - 1];
      changeCurrentRoomInPlace(state, neighbourTab.roomId);
    }

    state.openRoomTabs = state.openRoomTabs.filter(
      (roomTab) => roomTab.roomId !== roomId,
    );
    delete state.selectedJsonItemIdsByRoom[roomId];
  },

  /** close every tab but the room's own, moving to it if needed */
  closeOtherRoomTabs(_state, { payload: roomId }: PayloadAction<EditorRoomId>) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;

    if (roomId !== selectCursorRoomIdFromLevelEditorState(state)) {
      changeCurrentRoomInPlace(state, roomId);
    }
    for (const { roomId: otherRoomId } of state.openRoomTabs) {
      if (otherRoomId !== roomId) {
        delete state.selectedJsonItemIdsByRoom[otherRoomId];
      }
    }
    state.openRoomTabs = state.openRoomTabs.filter(
      (roomTab) => roomTab.roomId === roomId,
    );
  },

  /** keep a room's tab open when other rooms are browsed to */
  pinRoomTab(_state, { payload: roomId }: PayloadAction<EditorRoomId>) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    pinRoomTabInPlace(state, roomId);
  },
} satisfies SliceCaseReducers<LevelEditorState>;

export const roomTabsSelectors = {
  selectOpenRoomTabs: (state: LevelEditorState) => state.openRoomTabs,
} satisfies SliceSelectors<LevelEditorState>;
