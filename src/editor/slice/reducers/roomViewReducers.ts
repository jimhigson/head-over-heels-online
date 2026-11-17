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
import { type LevelEditorState } from "../levelEditorSlice";
import { existingOpenRoom, type OpenRoomId } from "../OpenRoom";

export const roomViewReducers = {
  /**
   * frame an open room's room with this view
   */
  openRoomViewChanged(
    _state,
    {
      payload: { openRoomId, view },
    }: PayloadAction<{ openRoomId: OpenRoomId; view: EditorRoomView }>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    existingOpenRoom(state, openRoomId).view = view;
  },

  /**
   * pan an open room's view by css px; no-op until it has been framed
   */
  openRoomViewPanned(
    _state,
    {
      payload: { openRoomId, delta },
    }: PayloadAction<{ openRoomId: OpenRoomId; delta: Xy }>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    const openRoom = existingOpenRoom(state, openRoomId);
    if (openRoom.view !== undefined) {
      openRoom.view = panEditorRoomView(openRoom.view, delta);
    }
  },

  /**
   * zoom an open room's view, keeping the pane point (css px) over the same part of
   * the room; no-op until it has been framed
   */
  openRoomViewZoomed(
    _state,
    {
      payload: { openRoomId, zoom, fixedPanePoint },
    }: PayloadAction<{
      openRoomId: OpenRoomId;
      zoom: number;
      fixedPanePoint: Xy;
    }>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    const openRoom = existingOpenRoom(state, openRoomId);
    if (openRoom.view !== undefined) {
      openRoom.view = zoomEditorRoomView(openRoom.view, zoom, fixedPanePoint);
    }
  },

  /**
   * the pane drawing an open room took a new size (css px)
   */
  openRoomPaneResized(
    _state,
    {
      payload: { openRoomId, paneSize },
    }: PayloadAction<{ openRoomId: OpenRoomId; paneSize: Xy }>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    existingOpenRoom(state, openRoomId).paneSize = paneSize;
  },
} satisfies SliceCaseReducers<LevelEditorState>;

export const roomViewSelectors = {
  /**
   * undefined until the room has been framed
   */
  selectOpenRoomView(state: LevelEditorState, openRoomId: OpenRoomId) {
    const openRoom = state.openRooms[openRoomId];
    // check the room wasn't closed (in case we have a stale openRoomId reference)
    if (openRoom === undefined) {
      return undefined;
    }
    return openRoom.view;
  },
  selectOpenRoomPaneSize(state: LevelEditorState, openRoomId: OpenRoomId) {
    const openRoom = state.openRooms[openRoomId];
    // check the room wasn't closed (in case we have a stale openRoomId reference)
    if (openRoom === undefined) {
      return undefined;
    }
    return openRoom.paneSize;
  },
} satisfies SliceSelectors<LevelEditorState>;
