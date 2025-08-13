import type { PayloadAction } from "@reduxjs/toolkit";
import { type SliceCaseReducers } from "@reduxjs/toolkit";
import type { LevelEditorState } from "../levelEditorSlice";
import type { EditorRoomId } from "../../editorTypes";
import { changeRoomInPlace } from "../inPlaceMutators/changeRoomInPlace";

export const changeRoomReducers = {
  changeToRoom(_state, { payload: roomId }: PayloadAction<EditorRoomId>) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    changeRoomInPlace(state, roomId);
  },

  roomBack(_state) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;

    const { editingRoomIdHistory } = state;
    if (editingRoomIdHistory.back.length === 0) {
      // no back history available
      return;
    }
    const previousRoomId = editingRoomIdHistory.back.pop() as EditorRoomId;
    changeRoomInPlace(state, previousRoomId, true);
    editingRoomIdHistory.forward.push(state.currentlyEditingRoomId);
  },

  roomForward(_state) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;

    const { editingRoomIdHistory } = state;
    if (editingRoomIdHistory.forward.length === 0) {
      // no forward history available
      return;
    }
    const nextRoomId = editingRoomIdHistory.forward.pop() as EditorRoomId;
    changeRoomInPlace(state, nextRoomId, true);
    editingRoomIdHistory.back.push(state.currentlyEditingRoomId);
  },
} satisfies SliceCaseReducers<LevelEditorState>;
