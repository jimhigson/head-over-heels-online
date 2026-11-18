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
   * drop the previewed edits - though pending nudges, which are debounced so that they are only
   * a preview until a pause in their movement (to prevent too many items in undo history for
   * a series of nudges), are committed rather than lost
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
   * commit the nudges being previewed, if there are any - runs on a debounce for the nudge
   * interactions so that a series of nudges counts as one undoable interaction
   */
  commitPendingNudge(_state) {
    commitPendingNudgeInPlace(_state as LevelEditorState);
  },
} satisfies SliceCaseReducers<LevelEditorState>;
