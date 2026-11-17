import {
  type PayloadAction,
  type SliceCaseReducers,
  type SliceSelectors,
} from "@reduxjs/toolkit";

import { type EditorRoomId } from "../../editorTypes";
import { changeCurrentRoomInPlace } from "../inPlaceMutators/changeCurrentRoomInPlace";
import { selectCursorRoomIdFromLevelEditorState } from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";

export const changeRoomReducers = {
  changeToRoom(
    _state,
    {
      payload,
    }: PayloadAction<
      { roomId: EditorRoomId; subRoomId?: string } | EditorRoomId
    >,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    const { roomId, subRoomId } =
      typeof payload === "string" ?
        { roomId: payload, subRoomId: undefined }
      : payload;
    changeCurrentRoomInPlace(state, roomId, subRoomId);
  },

  roomBack(_state, { payload: n = 1 }: PayloadAction<number | undefined>) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;

    const { editingRoomIdHistory } = state;
    if (editingRoomIdHistory.back.length < n) {
      return;
    }

    editingRoomIdHistory.forward.push(
      selectCursorRoomIdFromLevelEditorState(state),
    );
    for (let i = 0; i < n - 1; i++) {
      editingRoomIdHistory.forward.push(
        editingRoomIdHistory.back.pop() as EditorRoomId,
      );
    }
    const targetRoomId = editingRoomIdHistory.back.pop() as EditorRoomId;
    changeCurrentRoomInPlace(state, targetRoomId);
  },

  roomForward(_state, { payload: n = 1 }: PayloadAction<number | undefined>) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;

    const { editingRoomIdHistory } = state;
    if (editingRoomIdHistory.forward.length < n) {
      return;
    }

    editingRoomIdHistory.back.push(
      selectCursorRoomIdFromLevelEditorState(state),
    );
    for (let i = 0; i < n - 1; i++) {
      editingRoomIdHistory.back.push(
        editingRoomIdHistory.forward.pop() as EditorRoomId,
      );
    }
    const targetRoomId = editingRoomIdHistory.forward.pop() as EditorRoomId;
    changeCurrentRoomInPlace(state, targetRoomId);
  },

  /**
   * the cursor moved from this room to another - a step in the room history,
   * so anything that was forward of it no longer is
   */
  roomHistoryRecorded(
    state,
    { payload: leftRoomId }: PayloadAction<EditorRoomId>,
  ) {
    state.editingRoomIdHistory.back.push(leftRoomId);
    state.editingRoomIdHistory.forward = [];
  },
} satisfies SliceCaseReducers<LevelEditorState>;

export const changeRoomSelectors = {
  selectHistoryRoomsBackwards: (state: LevelEditorState) =>
    state.editingRoomIdHistory.back,
  selectHistoryRoomsForwards: (state: LevelEditorState) =>
    state.editingRoomIdHistory.forward,
} satisfies SliceSelectors<LevelEditorState>;
