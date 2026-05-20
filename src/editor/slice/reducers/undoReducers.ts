import {
  createSelector,
  current,
  type PayloadAction,
  type SliceCaseReducers,
  type SliceSelectors,
} from "@reduxjs/toolkit";

import { emptyObject } from "../../../utils/empty";
import { type EditorRoomJson } from "../../editorTypes";
import { selectCurrentRoomFromLevelEditorState } from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";
import { removeNonExistingItemsFromSelection } from "./selectionsReducers";
import { type UndoDescription } from "./undoDescription";

export type UndoEntry = {
  room: EditorRoomJson;
  description: UndoDescription;
  timestamp: number;
};

export type UndoRedoPayload = {
  /** how many steps to undo/redo — defaults to 1 if not provided */
  steps?: number;
};

export const snapshotRoomForUndo = (state: LevelEditorState): EditorRoomJson =>
  structuredClone(current(selectCurrentRoomFromLevelEditorState(state)));

export const pushUndoInPlace = (
  state: LevelEditorState,
  description: UndoDescription,
  timestamp: number,
) => {
  const previousRoom = snapshotRoomForUndo(state);
  const { history } = state;

  // remove any 'redo' state that is now invalid since we forked to a new branch
  history.redo = [];
  state.hoveredUndoIndex = 0;

  history.undo.push({ room: previousRoom, description, timestamp });
};

export const undoReducers = {
  undoHovered(state, { payload: index }: PayloadAction<number>) {
    if (index > 0 && index > state.history.undo.length) {
      throw new Error(
        `hoveredUndoIndex ${index} out of bounds for undo stack of length ${state.history.undo.length}`,
      );
    }
    if (index < 0 && -index > state.history.redo.length) {
      throw new Error(
        `hoveredUndoIndex ${index} out of bounds for redo stack of length ${state.history.redo.length}`,
      );
    }
    state.hoveredUndoIndex = index;
  },

  undo(
    _state,
    {
      payload: { steps: n = 1 } = emptyObject,
    }: PayloadAction<undefined | UndoRedoPayload>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;

    const {
      campaignInProgress,
      history: { undo, redo },
      currentlyEditing: { roomId: currentlyEditingRoomId },
    } = state;

    for (let i = 0; i < n; i++) {
      if (undo.length === 0) {
        break;
      }

      const entry = undo.pop()!;

      // store the current state in case we want to redo later:
      redo.push({
        room: campaignInProgress.rooms[
          currentlyEditingRoomId
        ] as EditorRoomJson,
        description: entry.description,
        timestamp: entry.timestamp,
      });

      campaignInProgress.rooms[currentlyEditingRoomId] = entry.room;
    }

    state.hoveredUndoIndex = 0;

    // undoing may have deleted a selected item: remove from selection if so:
    removeNonExistingItemsFromSelection(state);
  },

  redo(
    _state,
    {
      payload: { steps: n = 1 } = emptyObject,
    }: PayloadAction<undefined | UndoRedoPayload>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;

    const {
      campaignInProgress,
      history: { redo, undo },
      currentlyEditing: { roomId: currentlyEditingRoomId },
    } = state;

    for (let i = 0; i < n; i++) {
      if (redo.length === 0) {
        break;
      }

      const entry = redo.pop()!;

      undo.push({
        room: campaignInProgress.rooms[
          currentlyEditingRoomId
        ] as EditorRoomJson,
        description: entry.description,
        timestamp: entry.timestamp,
      });

      campaignInProgress.rooms[currentlyEditingRoomId] = entry.room;
    }

    state.hoveredUndoIndex = 0;

    // redoing may have deleted a selected item: remove from selection if so:
    removeNonExistingItemsFromSelection(state);
  },
} satisfies SliceCaseReducers<LevelEditorState>;

export type UndoHistoryItem = Pick<UndoEntry, "description" | "timestamp">;

const extractHistoryItems = (entries: UndoEntry[]): UndoHistoryItem[] =>
  entries.map(({ description, timestamp }) => ({ description, timestamp }));

export const undoSelectors = {
  selectUndoHistory: createSelector(
    (state: LevelEditorState) => state.history.undo,
    extractHistoryItems,
  ),
  selectRedoHistory: createSelector(
    (state: LevelEditorState) => state.history.redo,
    extractHistoryItems,
  ),
} satisfies SliceSelectors<LevelEditorState>;
