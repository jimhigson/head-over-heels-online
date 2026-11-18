import { type SliceCaseReducers } from "@reduxjs/toolkit";

import { coalesceRoomsInPlace } from "../inPlaceMutators/coalesceRoomsInPlace";
import { commitPendingNudgeInPlace } from "../inPlaceMutators/commitPendingNudgeInPlace";
import { type LevelEditorState } from "../levelEditorSlice";

export const coalesceRoomsReducers = {
  coalesceSelectedRooms(_state) {
    const state = _state as LevelEditorState;
    // nudges still being previewed are keyed by ids the merge can change:
    commitPendingNudgeInPlace(state);
    coalesceRoomsInPlace(state);
  },
} satisfies SliceCaseReducers<LevelEditorState>;
