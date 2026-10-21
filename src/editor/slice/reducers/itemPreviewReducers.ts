import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import {
  commitPendingEditsInPlace,
  commitPendingNudgeInPlace,
} from "../inPlaceMutators/commitPendingNudgeInPlace";
import { type LevelEditorState } from "../levelEditorSlice";

export const itemPreviewReducers = {
  setAutoCoalesce(_state: LevelEditorState, action: PayloadAction<boolean>) {
    _state.autoCoalesce = action.payload;
  },
  /**
   * drop the previewed edits - though nudges, which are only previewed until
   * they pause, are committed rather than lost
   */
  resetPreviewedEdits(_state) {
    const state = _state as LevelEditorState;
    commitPendingNudgeInPlace(state);
    state.pendingEdits = undefined;
  },
  /**
   * overwrite the permanent state of the current room by committing the previewed edits
   */
  commitCurrentPreviewedEdits(_state) {
    commitPendingEditsInPlace(_state as LevelEditorState);
  },
  /**
   * commit the nudges being previewed, if there are any - once they pause
   */
  commitPendingNudge(_state) {
    commitPendingNudgeInPlace(_state as LevelEditorState);
  },
} satisfies SliceCaseReducers<LevelEditorState>;
