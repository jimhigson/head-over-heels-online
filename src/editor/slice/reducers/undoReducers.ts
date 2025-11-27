import type { SliceSelectors } from "@reduxjs/toolkit";

import { current, type SliceCaseReducers } from "@reduxjs/toolkit";

import type { EditorRoomJson } from "../../editorTypes";
import type { LevelEditorState } from "../levelEditorSlice";

import { selectCurrentRoomFromLevelEditorState } from "../levelEditorSelectors";
import { removeNonExistingItemsFromSelection } from "./selectionsReducers";

// to be called from other reducers when they are ready to do something
// that should be undoable, e.g. adding an item to the room
export const pushUndoInPlace = (state: LevelEditorState) => {
  const previousRoom = structuredClone(
    current(selectCurrentRoomFromLevelEditorState(state)),
  );
  const { history } = state;

  // remove any 'redo' state that is now invalid since we forked to a new branch
  history.redo = [];

  history.undo.push(previousRoom);
};

export const undoReducers = {
  undo(_state) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;

    const {
      campaignInProgress,
      history: { undo, redo },
      currentlyEditingRoomId,
    } = state;

    if (undo.length === 0) {
      // no undo available
      return;
    }

    // store the current state in case we want to redo later:
    redo.push(
      campaignInProgress.rooms[currentlyEditingRoomId] as EditorRoomJson,
    );

    campaignInProgress.rooms[currentlyEditingRoomId] = undo.pop()!;

    // undoing may have deleted a selected item: remove from selection if so:
    removeNonExistingItemsFromSelection(state);
  },

  redo(_state) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;

    const {
      campaignInProgress,
      history: { redo, undo },
      currentlyEditingRoomId,
    } = state;

    if (redo.length === 0) {
      // no redo available
      return;
    }

    undo.push(
      campaignInProgress.rooms[currentlyEditingRoomId] as EditorRoomJson,
    );

    campaignInProgress.rooms[currentlyEditingRoomId] = redo.pop()!;

    // redoing may have deleted a selected item: remove from selection if so:
    removeNonExistingItemsFromSelection(state);
  },
} satisfies SliceCaseReducers<LevelEditorState>;

export const undoSelectors = {
  selectCanUndo: (state: LevelEditorState) => state.history.undo.length > 0,
  selectCanRedo: (state: LevelEditorState) => state.history.redo.length > 0,
} satisfies SliceSelectors<LevelEditorState>;
