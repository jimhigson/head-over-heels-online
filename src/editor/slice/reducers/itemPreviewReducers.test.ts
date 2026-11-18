import { produce } from "immer";
import { expect, test } from "vitest";

import {
  type EditorJsonItemUnion,
  type EditorRoomId,
  type EditorRoomItemId,
} from "../../editorTypes";
import {
  commitCurrentPreviewedEdits,
  type LevelEditorState,
} from "../levelEditorSlice";
import {
  editorStateWithOneRoomWithNoItems,
  reduceLevelEditorActions,
  testRoomId,
} from "./__test__/storeStates";

const roomB = "roomB" as EditorRoomId;
const blockId = "block" as EditorRoomItemId;

const block: EditorJsonItemUnion = {
  type: "block",
  config: { style: "organic" },
  position: { x: 1, y: 1, z: 0 },
};

// a block previewed as moved out of the test room and into room b:
const state0BlockPreviewedMovingRooms: LevelEditorState = produce(
  editorStateWithOneRoomWithNoItems,
  (draft) => {
    const { rooms } = draft.campaignInProgress;
    rooms[testRoomId].items[blockId] = block;
    rooms[roomB] = { ...rooms[testRoomId], items: {} };
    draft.pendingEdits = {
      edits: {
        [testRoomId]: { [blockId]: null },
        [roomB]: { [blockId]: block },
      },
      description: { kind: "editRoomJson" },
      timestamp: 0,
      madeBy: { type: "drag" },
    };
  },
);

const state1Committed = reduceLevelEditorActions(
  state0BlockPreviewedMovingRooms,
  commitCurrentPreviewedEdits(),
);

test("committing edits to two rooms takes the item out of the room it was in", () => {
  expect(
    state1Committed.campaignInProgress.rooms[testRoomId].items[blockId],
  ).toBeUndefined();
});

test("committing edits to two rooms puts the item in the other room", () => {
  expect(
    state1Committed.campaignInProgress.rooms[roomB].items[blockId],
  ).toEqual(block);
});

test("committing edits to two rooms gives each room an undo entry", () => {
  expect({
    [testRoomId]: state1Committed.history[testRoomId]?.undo.length,
    [roomB]: state1Committed.history[roomB]?.undo.length,
  }).toEqual({ [testRoomId]: 1, [roomB]: 1 });
});
