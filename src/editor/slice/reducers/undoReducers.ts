import {
  createSelector,
  current,
  type PayloadAction,
  type SliceCaseReducers,
  type SliceSelectors,
} from "@reduxjs/toolkit";

import { emptyObject } from "../../../utils/empty";
import { type EditorRoomId, type EditorRoomJson } from "../../editorTypes";
import { changeIdOfCurrentRoomInPlace } from "../inPlaceMutators/changeIdOfCurrentRoomInPlace";
import {
  selectCurrentRoomFromLevelEditorState,
  selectCursorRoomId,
} from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";
import { removeNonExistingItemsFromSelection } from "./selectionsReducers";
import { type UndoDescription } from "./undoDescription";

export type UndoEntry = {
  room: EditorRoomJson;
  description: UndoDescription;
  timestamp: number;
};

export type RoomUndoHistory = {
  undo: Array<UndoEntry>;
  redo: Array<UndoEntry>;
};

export type UndoRedoPayload = {
  /** how many steps to undo/redo — defaults to 1 if not provided */
  steps?: number;
};

const roomHistory = (state: LevelEditorState): RoomUndoHistory => {
  const roomId = selectCursorRoomId(state);
  state.history[roomId] ??= { undo: [], redo: [] };
  return state.history[roomId];
};

export const snapshotRoomForUndo = (state: LevelEditorState): EditorRoomJson =>
  structuredClone(current(selectCurrentRoomFromLevelEditorState(state)));

export const pushUndoInPlace = (
  state: LevelEditorState,
  description: UndoDescription,
  timestamp: number,
) => {
  const previousRoom = snapshotRoomForUndo(state);
  const { undo, redo } = roomHistory(state);

  // remove any 'redo' state that is now invalid since we forked to a new branch
  redo.length = 0;
  state.hoveredUndoIndex = 0;

  undo.push({ room: previousRoom, description, timestamp });
};

export const undoReducers = {
  undoHovered(state, { payload: index }: PayloadAction<number>) {
    const { undo, redo } = roomHistory(state);
    if (index > 0 && index > undo.length) {
      throw new Error(
        `hoveredUndoIndex ${index} out of bounds for undo stack of length ${undo.length}`,
      );
    }
    if (index < 0 && -index > redo.length) {
      throw new Error(
        `hoveredUndoIndex ${index} out of bounds for redo stack of length ${redo.length}`,
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

    const { campaignInProgress } = state;
    const currentlyEditingRoomId = selectCursorRoomId(state);
    const { undo, redo } = roomHistory(state);

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

      if (entry.room.id !== currentlyEditingRoomId) {
        changeIdOfCurrentRoomInPlace(state, entry.room.id as EditorRoomId);
      }
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

    const { campaignInProgress } = state;
    const currentlyEditingRoomId = selectCursorRoomId(state);
    const { undo, redo } = roomHistory(state);

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

      if (entry.room.id !== currentlyEditingRoomId) {
        changeIdOfCurrentRoomInPlace(state, entry.room.id as EditorRoomId);
      }
    }

    state.hoveredUndoIndex = 0;

    // redoing may have deleted a selected item: remove from selection if so:
    removeNonExistingItemsFromSelection(state);
  },
} satisfies SliceCaseReducers<LevelEditorState>;

export type UndoHistoryItem = Pick<UndoEntry, "description" | "timestamp">;

const extractHistoryItems = (entries: UndoEntry[]): UndoHistoryItem[] =>
  entries.map(({ description, timestamp }) => ({ description, timestamp }));

const emptyUndoEntries: UndoEntry[] = [];

export const undoSelectors = {
  selectUndoHistory: createSelector(
    (state: LevelEditorState) =>
      state.history[selectCursorRoomId(state)]?.undo ?? emptyUndoEntries,
    extractHistoryItems,
  ),
  selectRedoHistory: createSelector(
    (state: LevelEditorState) =>
      state.history[selectCursorRoomId(state)]?.redo ?? emptyUndoEntries,
    extractHistoryItems,
  ),
} satisfies SliceSelectors<LevelEditorState>;
