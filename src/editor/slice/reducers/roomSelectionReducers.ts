import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import { keys } from "../../../utils/entries";
import { type EditorRoomId } from "../../editorTypes";
import { firstSubRoomId } from "../inPlaceMutators/changeCurrentRoomInPlace";
import { type LevelEditorState } from "../levelEditorSlice";

export const roomSelectionReducers = {
  toggleRoomInSelection(
    _state,
    { payload }: PayloadAction<{ roomId: EditorRoomId; subRoomId: string }>,
  ) {
    const state = _state as LevelEditorState;
    const { roomId, subRoomId } = payload;

    const existingIndex = state.selectedRoomIds.indexOf(roomId);

    if (existingIndex !== -1) {
      if (state.selectedRoomIds.length > 1) {
        state.selectedRoomIds.splice(existingIndex, 1);
        if (state.cursorRoom.roomId === roomId) {
          const newCursorRoomId = state.selectedRoomIds.at(-1)!;
          const newCursorRoom = state.campaignInProgress.rooms[newCursorRoomId];
          state.cursorRoom = {
            roomId: newCursorRoomId,
            subRoomId: firstSubRoomId(newCursorRoom),
          };
        }
      }
    } else {
      state.selectedRoomIds.push(roomId);
      state.cursorRoom = { roomId, subRoomId };
    }
  },

  addRoomToSelection(
    _state,
    { payload }: PayloadAction<{ roomId: EditorRoomId; subRoomId: string }>,
  ) {
    const state = _state as LevelEditorState;
    const { roomId, subRoomId } = payload;

    if (!state.selectedRoomIds.includes(roomId)) {
      state.selectedRoomIds.push(roomId);
    }
    state.cursorRoom = { roomId, subRoomId };
  },

  selectAllRooms(_state) {
    const state = _state as LevelEditorState;
    const selectedSet = new Set(state.selectedRoomIds);

    for (const roomId of keys(state.campaignInProgress.rooms)) {
      if (!selectedSet.has(roomId)) {
        state.selectedRoomIds.push(roomId);
      }
    }
  },
} satisfies SliceCaseReducers<LevelEditorState>;
