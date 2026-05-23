import { produce } from "immer";
import { expect, test } from "vitest";

import { type EditorRoomId, type EditorRoomItemId } from "../../editorTypes";
import { type LevelEditorState, removeRoom } from "../levelEditorSlice";
import {
  editorStateWithOneRoomWithNoItems,
  reduceLevelEditorActions,
  testRoomId,
} from "./__test__/storeStates";
import { type UndoDescription } from "./undoDescription";

const roomA = "roomA" as EditorRoomId;
const roomB = "roomB" as EditorRoomId;
const door1 = "door1" as EditorRoomItemId;
const teleporter1 = "teleporter1" as EditorRoomItemId;

const addRooms = (draft: LevelEditorState) => {
  draft.campaignInProgress.rooms[roomA] = {
    id: roomA,
    planet: "blacktooth",
    color: { hue: "cyan", shade: "basic" },
    items: {},
  };
  draft.campaignInProgress.rooms[roomB] = {
    id: roomB,
    planet: "blacktooth",
    color: { hue: "cyan", shade: "basic" },
    items: {},
  };
  draft.currentlyEditing.roomId = roomA;
};

test("removeRoom filters the deleted room from editingRoomIdHistory", () => {
  const state: LevelEditorState = structuredClone(
    produce(editorStateWithOneRoomWithNoItems, (draft) => {
      addRooms(draft);
      draft.editingRoomIdHistory = {
        back: [testRoomId, roomB, testRoomId, roomA],
        forward: [roomA, roomB],
      };
    }),
  );

  const result = reduceLevelEditorActions(state, removeRoom());

  expect(result.campaignInProgress.rooms[roomA]).toBeUndefined();
  expect(result.editingRoomIdHistory.back).not.toContain(roomA);
  expect(result.editingRoomIdHistory.forward).not.toContain(roomA);
});

test("removeRoom deletes the deleted room's undo/redo history", () => {
  const state: LevelEditorState = structuredClone(
    produce(editorStateWithOneRoomWithNoItems, (draft) => {
      addRooms(draft);
      draft.history[roomA] = {
        undo: [
          {
            room: {
              id: roomA,
              planet: "blacktooth",
              color: { hue: "cyan", shade: "basic" },
              items: {},
            },
            description: { kind: "clearRoom" } satisfies UndoDescription,
            timestamp: 0,
          },
        ],
        redo: [],
      };
    }),
  );

  const result = reduceLevelEditorActions(state, removeRoom());

  expect(result.history[roomA]).toBeUndefined();
});

test("removeRoom deletes doors referencing deleted room", () => {
  const state: LevelEditorState = structuredClone(
    produce(editorStateWithOneRoomWithNoItems, (draft) => {
      addRooms(draft);
      draft.campaignInProgress.rooms[roomB].items[door1] = {
        type: "door",
        config: { toRoom: roomA, direction: "towards" },
        position: { x: 0, y: 0, z: 0 },
      };
    }),
  );

  const result = reduceLevelEditorActions(state, removeRoom());

  expect(result.campaignInProgress.rooms[roomB].items[door1]).toBeUndefined();
});

test("removeRoom removes toRoom from teleporters referencing deleted room", () => {
  const state: LevelEditorState = structuredClone(
    produce(editorStateWithOneRoomWithNoItems, (draft) => {
      addRooms(draft);
      draft.campaignInProgress.rooms[roomB].items[teleporter1] = {
        type: "teleporter",
        config: { toRoom: roomA, toPosition: { x: 0, y: 0, z: 0 } },
        position: { x: 0, y: 0, z: 0 },
      };
    }),
  );

  const result = reduceLevelEditorActions(state, removeRoom());

  const teleporter = result.campaignInProgress.rooms[roomB].items[teleporter1];
  expect(teleporter.config).not.toHaveProperty("toRoom");
});

test("removeRoom clears roomAbove/roomBelow referencing deleted room", () => {
  const state: LevelEditorState = structuredClone(
    produce(editorStateWithOneRoomWithNoItems, (draft) => {
      addRooms(draft);
      draft.campaignInProgress.rooms[roomB].roomAbove = roomA;
      draft.campaignInProgress.rooms[roomB].roomBelow = roomA;
    }),
  );

  const result = reduceLevelEditorActions(state, removeRoom());

  expect(result.campaignInProgress.rooms[roomB]).not.toHaveProperty(
    "roomAbove",
  );
  expect(result.campaignInProgress.rooms[roomB]).not.toHaveProperty(
    "roomBelow",
  );
});

test("removeRoom deletes NCR referencing deleted room, keeping other meta fields", () => {
  const state: LevelEditorState = structuredClone(
    produce(editorStateWithOneRoomWithNoItems, (draft) => {
      addRooms(draft);
      draft.campaignInProgress.rooms[roomB].meta = {
        nonContiguousRelationship: {
          with: { room: roomA },
          gridOffset: { x: 1, y: 0, z: 0 },
        },
        label: { gridOffset: { x: 0, y: 0 }, text: "test", align: "left" },
      };
    }),
  );

  const result = reduceLevelEditorActions(state, removeRoom());

  expect(result.campaignInProgress.rooms[roomB].meta).toBeDefined();
  expect(result.campaignInProgress.rooms[roomB].meta).not.toHaveProperty(
    "nonContiguousRelationship",
  );
  expect(result.campaignInProgress.rooms[roomB].meta).toHaveProperty("label");
});

test("removeRoom deletes meta entirely when NCR was the only field", () => {
  const state: LevelEditorState = structuredClone(
    produce(editorStateWithOneRoomWithNoItems, (draft) => {
      addRooms(draft);
      draft.campaignInProgress.rooms[roomB].meta = {
        nonContiguousRelationship: {
          with: { room: roomA },
          gridOffset: { x: 1, y: 0, z: 0 },
        },
      };
    }),
  );

  const result = reduceLevelEditorActions(state, removeRoom());

  expect(result.campaignInProgress.rooms[roomB]).not.toHaveProperty("meta");
});
