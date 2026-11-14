import {
  type PayloadAction,
  type SliceCaseReducers,
  type SliceSelectors,
} from "@reduxjs/toolkit";

import { type Xy } from "../../../utils/vectors/vectors";
import { type EditorPane, type EditorPaneId, requirePane } from "../EditorPane";
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

/** how a pane frames its room; undefined until it has been fitted */
const paneView = (
  state: LevelEditorState,
  pane: EditorPane,
): EditorRoomView | undefined =>
  pane.roomSource.type === "cursorRoom" ?
    cursorRoomTab(state).view
  : pane.fixedRoomView;

const setPaneViewInPlace = (
  state: LevelEditorState,
  pane: EditorPane,
  view: EditorRoomView,
) => {
  if (pane.roomSource.type === "cursorRoom") {
    cursorRoomTab(state).view = view;
  } else {
    pane.fixedRoomView = view;
  }
};

export const roomViewReducers = {
  /** frame a pane's room with this view */
  paneViewChanged(
    _state,
    {
      payload: { paneId, view },
    }: PayloadAction<{ paneId: EditorPaneId; view: EditorRoomView }>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    const pane = requirePane(state, paneId);
    setPaneViewInPlace(state, pane, view);
  },

  /** pan a pane's view by css px; no-op until it has been framed */
  paneViewPanned(
    _state,
    {
      payload: { paneId, delta },
    }: PayloadAction<{ paneId: EditorPaneId; delta: Xy }>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    const pane = requirePane(state, paneId);
    const view = paneView(state, pane);
    if (view !== undefined) {
      setPaneViewInPlace(state, pane, panEditorRoomView(view, delta));
    }
  },

  /**
   * zoom a pane's view, keeping the pane point (css px) over the same part of
   * the room; no-op until it has been framed
   */
  paneViewZoomed(
    _state,
    {
      payload: { paneId, zoom, fixedPanePoint },
    }: PayloadAction<{
      paneId: EditorPaneId;
      zoom: number;
      fixedPanePoint: Xy;
    }>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    const pane = requirePane(state, paneId);
    const view = paneView(state, pane);
    if (view !== undefined) {
      setPaneViewInPlace(
        state,
        pane,
        zoomEditorRoomView(view, zoom, fixedPanePoint),
      );
    }
  },

  /** a pane took a new size (css px) */
  paneResized(
    _state,
    {
      payload: { paneId, paneSize },
    }: PayloadAction<{ paneId: EditorPaneId; paneSize: Xy }>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    const pane = requirePane(state, paneId);
    pane.paneSize = paneSize;
  },
} satisfies SliceCaseReducers<LevelEditorState>;

export const roomViewSelectors = {
  /** undefined until the pane's room has been framed */
  selectPaneView(state: LevelEditorState, paneId: EditorPaneId) {
    const pane = state.panes[paneId];
    // check pane wasn't closed (in case we have a stale paneId reference)
    if (pane === undefined) {
      return undefined;
    }
    return paneView(state, pane);
  },
  selectPaneSize(state: LevelEditorState, paneId: EditorPaneId) {
    const pane = state.panes[paneId];
    // check pane wasn't closed (in case we have a stale paneId reference)
    if (pane === undefined) {
      return undefined;
    }
    return pane.paneSize;
  },
} satisfies SliceSelectors<LevelEditorState>;
