import { type SliceCaseReducers } from "@reduxjs/toolkit";

import { coalesceRoomsInPlace } from "../inPlaceMutators/coalesceRoomsInPlace";
import { type LevelEditorState } from "../levelEditorSlice";

export const coalesceRoomsReducers = {
  coalesceSelectedRooms(_state) {
    coalesceRoomsInPlace(_state as LevelEditorState);
  },
} satisfies SliceCaseReducers<LevelEditorState>;
