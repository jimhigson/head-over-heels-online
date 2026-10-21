import {
  current,
  type PayloadAction,
  type SliceCaseReducers,
  type SliceSelectors,
} from "@reduxjs/toolkit";

import { emptyObject } from "../../../utils/empty";
import { type EditorRoomId, type EditorRoomJson } from "../../editorTypes";
import { changeIdOfCurrentRoomInPlace } from "../inPlaceMutators/changeIdOfCurrentRoomInPlace";
import { commitPendingNudgeInPlace } from "../inPlaceMutators/commitPendingNudgeInPlace";
import {
  pushUndoEntryInPlace,
  roomHistory,
} from "../inPlaceMutators/pushUndoEntryInPlace";
import {
  selectCurrentCommittedRoomJsonFromLevelEditorState,
  selectCursorRoomIdFromLevelEditorState,
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

export const snapshotRoomForUndo = (state: LevelEditorState): EditorRoomJson =>
  structuredClone(
    current(selectCurrentCommittedRoomJsonFromLevelEditorState(state)),
  );

/**
 * push an undo entry for any room, not necessarily the current one - after
 * committing any nudges still being previewed, which come first
 */
export const pushUndoForRoomInPlace = (
  state: LevelEditorState,
  roomId: EditorRoomId,
  description: UndoDescription,
  timestamp: number,
) => {
  commitPendingNudgeInPlace(state);
  pushUndoEntryInPlace(state, roomId, description, timestamp);
};

export const pushUndoToCursorRoomInPlace = (
  state: LevelEditorState,
  description: UndoDescription,
  timestamp: number,
) =>
  pushUndoForRoomInPlace(
    state,
    selectCursorRoomIdFromLevelEditorState(state),
    description,
    timestamp,
  );

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
    // nudges still being previewed are the newest edit, so are committed to
    // be what's undone or redone from:
    commitPendingNudgeInPlace(state);

    const { campaignInProgress } = state;
    const currentlyEditingRoomId =
      selectCursorRoomIdFromLevelEditorState(state);
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
    // nudges still being previewed are the newest edit, so are committed to
    // be what's undone or redone from:
    commitPendingNudgeInPlace(state);

    const { campaignInProgress } = state;
    const currentlyEditingRoomId =
      selectCursorRoomIdFromLevelEditorState(state);
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

const emptyUndoEntries: UndoEntry[] = [];

// the entries themselves (seen only as history items), so each keeps its
// identity as the history grows, and what draws it needn't redraw:
export const undoSelectors = {
  selectUndoHistory: (state: LevelEditorState): UndoHistoryItem[] =>
    state.history[selectCursorRoomIdFromLevelEditorState(state)]?.undo ??
    emptyUndoEntries,
  selectRedoHistory: (state: LevelEditorState): UndoHistoryItem[] =>
    state.history[selectCursorRoomIdFromLevelEditorState(state)]?.redo ??
    emptyUndoEntries,
} satisfies SliceSelectors<LevelEditorState>;
