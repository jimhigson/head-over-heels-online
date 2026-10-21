import { current } from "@reduxjs/toolkit";

import { type EditorRoomId, type EditorRoomJson } from "../../editorTypes";
import { selectCursorRoomIdFromLevelEditorState } from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";
import { type UndoDescription } from "../reducers/undoDescription";
import { type RoomUndoHistory } from "../reducers/undoReducers";
import { pinRoomTabInPlace } from "./pinRoomTabInPlace";

export const roomHistory = (
  state: LevelEditorState,
  roomId: EditorRoomId = selectCursorRoomIdFromLevelEditorState(state),
): RoomUndoHistory => {
  state.history[roomId] ??= { undo: [], redo: [] };
  return state.history[roomId];
};

/**
 * push an undo entry for the room as it is now, for any room - nothing
 * pending is committed first
 */
export const pushUndoEntryInPlace = (
  state: LevelEditorState,
  roomId: EditorRoomId,
  description: UndoDescription,
  timestamp: number,
) => {
  const previousRoom = structuredClone(
    current(state.campaignInProgress.rooms[roomId] as EditorRoomJson),
  );
  const { undo, redo } = roomHistory(state, roomId);

  // remove any 'redo' state that is now invalid since we forked to a new branch
  redo.length = 0;
  state.hoveredUndoIndex = 0;

  undo.push({ room: previousRoom, description, timestamp });
  // an edited room's tab stays open:
  pinRoomTabInPlace(state, roomId);
};
