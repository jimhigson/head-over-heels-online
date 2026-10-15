import {
  type PayloadAction,
  type SliceCaseReducers,
  type SliceSelectors,
} from "@reduxjs/toolkit";

import { type Xy } from "../../../utils/vectors/vectors";
import {
  type EditorRoomView,
  panEditorRoomView,
  zoomEditorRoomView,
} from "../EditorRoomView";
import { selectCursorRoomIdFromLevelEditorState } from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";
import { type RoomTab } from "../RoomTab";

const cursorRoomTab = (state: LevelEditorState): RoomTab => {
  const cursorRoomId = selectCursorRoomIdFromLevelEditorState(state);
  const maybeCursorRoomTab = state.openRoomTabs.find(
    (roomTab) => roomTab.roomId === cursorRoomId,
  );
  if (import.meta.env.DEV && maybeCursorRoomTab === undefined) {
    throw new Error(`cursor room ${cursorRoomId} has no tab`);
  }
  return maybeCursorRoomTab!;
};

export const roomViewReducers = {
  /** frame the cursor room's tab with this view */
  cursorRoomViewChanged(
    _state,
    { payload: view }: PayloadAction<EditorRoomView>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    cursorRoomTab(state).view = view;
  },

  /** pan the cursor room's view by css px; no-op until it has been framed */
  cursorRoomViewPanned(_state, { payload: delta }: PayloadAction<Xy>) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    const roomTab = cursorRoomTab(state);
    if (roomTab.view !== undefined) {
      roomTab.view = panEditorRoomView(roomTab.view, delta);
    }
  },

  /**
   * zoom the cursor room's view, keeping the pane point (css px) over the same
   * part of the room; no-op until it has been framed
   */
  cursorRoomViewZoomed(
    _state,
    {
      payload: { zoom, fixedPanePoint },
    }: PayloadAction<{ zoom: number; fixedPanePoint: Xy }>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    const roomTab = cursorRoomTab(state);
    if (roomTab.view !== undefined) {
      roomTab.view = zoomEditorRoomView(roomTab.view, zoom, fixedPanePoint);
    }
  },

  /** the room editing pane took a new size (css px) */
  roomPaneResized(_state, { payload: paneSize }: PayloadAction<Xy>) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    state.roomPaneSize = paneSize;
  },
} satisfies SliceCaseReducers<LevelEditorState>;

export const roomViewSelectors = {
  /** undefined until the cursor room's tab has been framed */
  selectCursorRoomView: (state: LevelEditorState) => cursorRoomTab(state).view,
  selectRoomPaneSize: (state: LevelEditorState) => state.roomPaneSize,
} satisfies SliceSelectors<LevelEditorState>;
