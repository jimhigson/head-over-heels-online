import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { type EditorRoomId } from "../editorTypes";

export type RoomPreview =
  | { readonly status: "error" }
  | { readonly status: "ready"; readonly dataUrl: string }
  | { readonly status: "rendering" }
  | { readonly status: "requested" };

export type RoomPreviewSliceState = {
  byRoomId: Partial<Record<EditorRoomId, RoomPreview>>;
};

const initialState: RoomPreviewSliceState = { byRoomId: {} };

export const editorRoomPreviewSlice = createSlice({
  name: "editorRoomPreview",
  initialState,
  reducers: {
    /**
     * a component would like a preview of this room. Only transitions
     * absent → requested so a repeated request can never reset work that is
     * already in progress or done.
     */
    roomPreviewRequested(
      state,
      { payload: roomId }: PayloadAction<EditorRoomId>,
    ) {
      if (state.byRoomId[roomId] === undefined) {
        state.byRoomId[roomId] = { status: "requested" };
      }
    },
    roomPreviewRenderingStarted(
      state,
      { payload: roomId }: PayloadAction<EditorRoomId>,
    ) {
      state.byRoomId[roomId] = { status: "rendering" };
    },
    roomPreviewReady(
      state,
      {
        payload: { roomId, dataUrl },
      }: PayloadAction<{ roomId: EditorRoomId; dataUrl: string }>,
    ) {
      state.byRoomId[roomId] = { status: "ready", dataUrl };
    },
    roomPreviewFailed(state, { payload: roomId }: PayloadAction<EditorRoomId>) {
      state.byRoomId[roomId] = { status: "error" };
    },
    /**
     * the room's json changed or it was removed from the campaign - drop the
     * cached preview so it will be re-rendered when next requested
     */
    roomPreviewInvalidated(
      state,
      { payload: roomId }: PayloadAction<EditorRoomId>,
    ) {
      delete state.byRoomId[roomId];
    },
  },
});

export const {
  roomPreviewRequested,
  roomPreviewRenderingStarted,
  roomPreviewReady,
  roomPreviewFailed,
  roomPreviewInvalidated,
} = editorRoomPreviewSlice.actions;
