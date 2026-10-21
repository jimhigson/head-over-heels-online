import { applyPatch, compare, type Operation } from "fast-json-patch";
import createTransform from "redux-persist/es/createTransform";

import {
  type EditorRoomId,
  type EditorRoomJson,
} from "../../editor/editorTypes";
import { type LevelEditorState } from "../../editor/slice/levelEditorSlice";
import {
  type RoomUndoHistory,
  type UndoEntry,
} from "../../editor/slice/reducers/undoReducers";
import { entries, fromAllEntries } from "../../utils/entries";

type History = LevelEditorState["history"];

/**
 * an undo or redo stack as stored: the newest entry's room in full, and every
 * other entry as the patch that turns the room of the entry after it into its
 * own - consecutive rooms in a stack differ by one edit, so the patches are
 * small where the rooms are not
 */
type StoredUndoStack = {
  newestRoom: EditorRoomJson | undefined;
  entries: Array<
    Omit<UndoEntry, "room"> & {
      /**
       * empty for the newest entry, whose room is stored in full
       */
      patchFromNext: Operation[];
    }
  >;
};

type StoredRoomUndoHistory = {
  undo: StoredUndoStack;
  redo: StoredUndoStack;
};

/**
 * the older stored form of a room's history: every entry with its room in
 * full. Read back as it is
 */
type LegacyStoredRoomUndoHistory = RoomUndoHistory;

type StoredHistory = Record<
  EditorRoomId,
  LegacyStoredRoomUndoHistory | StoredRoomUndoHistory
>;

// stacks only grow and shrink at their newest end, so every other pair of
// neighbouring rooms is the same objects from one save to the next:
const patchCache = new WeakMap<
  EditorRoomJson,
  WeakMap<EditorRoomJson, Operation[]>
>();

const patchBetween = (
  from: EditorRoomJson,
  to: EditorRoomJson,
): Operation[] => {
  const patchesFrom = patchCache.getOrInsertComputed(from, () => new WeakMap());
  return patchesFrom.getOrInsertComputed(to, () => compare(from, to));
};

const storedUndoStack = (stack: UndoEntry[]): StoredUndoStack => ({
  newestRoom: stack.at(-1)?.room,
  entries: stack.map(({ room, ...entry }, index) => {
    const next = stack[index + 1];
    return {
      ...entry,
      patchFromNext: next === undefined ? [] : patchBetween(next.room, room),
    };
  }),
});

const undoStackFromStored = ({
  newestRoom,
  entries: storedEntries,
}: StoredUndoStack): UndoEntry[] => {
  if (storedEntries.length === 0) {
    return [];
  }
  if (import.meta.env.DEV && newestRoom === undefined) {
    throw new Error("a stored undo stack with entries had no newest room");
  }
  const stack: UndoEntry[] = [];
  let nextRoom = newestRoom!;
  for (let index = storedEntries.length - 1; index >= 0; index--) {
    const { patchFromNext, ...entry } = storedEntries[index];
    const room =
      patchFromNext.length === 0 ?
        nextRoom
      : (applyPatch(nextRoom, patchFromNext, false, false)
          .newDocument as EditorRoomJson);
    stack[index] = { ...entry, room };
    nextRoom = room;
  }
  return stack;
};

const isLegacyStoredRoomUndoHistory = (
  roomHistory: LegacyStoredRoomUndoHistory | StoredRoomUndoHistory,
): roomHistory is LegacyStoredRoomUndoHistory =>
  Array.isArray(roomHistory.undo);

/**
 * stores the editor's undo history as patches between neighbouring rooms
 * rather than every room in full, so it fits in local storage
 */
export const levelEditorHistoryTransform = createTransform<
  History,
  StoredHistory
>(
  (history) =>
    fromAllEntries(
      entries(history).map(([roomId, { undo, redo }]) => [
        roomId,
        { undo: storedUndoStack(undo), redo: storedUndoStack(redo) },
      ]),
    ),
  (storedHistory) =>
    fromAllEntries(
      entries(storedHistory).map(([roomId, roomHistory]) => [
        roomId,
        isLegacyStoredRoomUndoHistory(roomHistory) ? roomHistory : (
          {
            undo: undoStackFromStored(roomHistory.undo),
            redo: undoStackFromStored(roomHistory.redo),
          }
        ),
      ]),
    ),
  { whitelist: ["history"] },
);
