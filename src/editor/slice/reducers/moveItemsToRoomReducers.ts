import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import {
  moveItemsToRoomInPlace,
  type MoveItemsToRoomPayload,
} from "../inPlaceMutators/moveItemsToRoomInPlace";
import { type LevelEditorState } from "../levelEditorSlice";

export const moveItemsToRoomReducers = {
  moveItemsToRoom(state, { payload }: PayloadAction<MoveItemsToRoomPayload>) {
    moveItemsToRoomInPlace(state as LevelEditorState, payload);
  },
} satisfies SliceCaseReducers<LevelEditorState>;
