import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import { type EditorRoomId } from "../../editorTypes";
import { type LevelEditorState } from "../levelEditorSlice";

export const roomSelectionReducers = {
  toggleRoomInSelection(
    _state,
    { payload }: PayloadAction<{ roomId: EditorRoomId; subRoomId: string }>,
  ) {
    const state = _state as LevelEditorState;
    const { roomId, subRoomId } = payload;

    const existingIndex = state.selectedRooms.findIndex(
      (s) => s.roomId === roomId && s.subRoomId === subRoomId,
    );

    if (existingIndex !== -1) {
      if (state.selectedRooms.length > 1) {
        state.selectedRooms.splice(existingIndex, 1);
      }
    } else {
      state.selectedRooms.push({ roomId, subRoomId });
    }
  },

  addRoomToSelection(
    _state,
    { payload }: PayloadAction<{ roomId: EditorRoomId; subRoomId: string }>,
  ) {
    const state = _state as LevelEditorState;
    const { roomId, subRoomId } = payload;

    const alreadySelected = state.selectedRooms.some(
      (s) => s.roomId === roomId && s.subRoomId === subRoomId,
    );

    if (!alreadySelected) {
      state.selectedRooms.push({ roomId, subRoomId });
    }
  },
} satisfies SliceCaseReducers<LevelEditorState>;
