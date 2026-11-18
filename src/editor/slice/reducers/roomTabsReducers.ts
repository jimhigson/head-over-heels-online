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
import {
  closeTabInPlace,
  existingOpenRoom,
  findRoomTab,
  selectFrontTabFromLevelEditorState,
} from "../OpenRoom";

export const roomTabsReducers = {
  /**
   * close a room's tab. The last tab can't be closed; closing the front one
   * moves to the tab after it, or before it if it was the last
   */
  closeRoomTab(_state, { payload: roomId }: PayloadAction<EditorRoomId>) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;

    const closingTab = findRoomTab(state, roomId);
    if (closingTab === undefined || state.tabs.length === 1) {
      return;
    }

    if (roomId === state.cursorRoomId) {
      // move off first, so the closing room isn't the cursor room any more:
      const closingIndex = state.tabs.indexOf(closingTab);
      const neighbourTab =
        state.tabs[closingIndex + 1] ?? state.tabs[closingIndex - 1];
      changeCurrentRoomInPlace(
        state,
        existingOpenRoom(state, neighbourTab.openRoomId).roomId,
      );
    }

    closeTabInPlace(state, closingTab.id);
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
    for (const otherTab of state.tabs.filter(
      ({ openRoomId }) =>
        existingOpenRoom(state, openRoomId).roomId !== state.cursorRoomId,
    )) {
      closeTabInPlace(state, otherTab.id);
    }
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
  selectFrontOpenRoomId: (state: LevelEditorState) =>
    selectFrontTabFromLevelEditorState(state).openRoomId,
  selectTabs: (state: LevelEditorState) => state.tabs,
  /**
   * the room each tab shows, in tab order - a new array every call, so
   * compare by value when subscribing
   */
  selectTabRoomIds: (state: LevelEditorState): EditorRoomId[] =>
    state.tabs.map(
      ({ openRoomId }) => existingOpenRoom(state, openRoomId).roomId,
    ),
} satisfies SliceSelectors<LevelEditorState>;
