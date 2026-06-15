import { produce } from "immer";
import { expect, test } from "vitest";

import {
  roomNonContiguousRelationship,
  roomVerticalLinkHolders,
} from "../../../model/RoomJson";
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
  draft.selectedRoomIds = [roomA];
  draft.cursorRoom = { roomId: roomA, subRoomId: "*" };
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
      draft.campaignInProgress.rooms[roomB].meta = {
        subRooms: {
          "*": { above: { room: roomA }, below: { room: roomA } },
        },
      };
    }),
  );

  const result = reduceLevelEditorActions(state, removeRoom());

  const remainingLinks = roomVerticalLinkHolders(
    result.campaignInProgress.rooms[roomB],
  ).some((holder) => holder.above !== undefined || holder.below !== undefined);
  expect(remainingLinks).toBe(false);
});

test("removeRoom deletes NCR referencing deleted room, keeping other meta fields", () => {
  const state: LevelEditorState = structuredClone(
    produce(editorStateWithOneRoomWithNoItems, (draft) => {
      addRooms(draft);
      draft.campaignInProgress.rooms[roomB].meta = {
        subRooms: {
          "*": {
            nonContiguousRelationship: {
              with: { room: roomA },
              gridOffset: { x: 1, y: 0, z: 0 },
            },
          },
        },
        label: { direction: "away", text: "test" },
      };
    }),
  );

  const result = reduceLevelEditorActions(state, removeRoom());

  expect(
    roomNonContiguousRelationship(result.campaignInProgress.rooms[roomB]),
  ).toBeUndefined();
  expect(result.campaignInProgress.rooms[roomB].meta).toHaveProperty("label");
});

test("removeRoom removes the NCR referencing the deleted room", () => {
  const state: LevelEditorState = structuredClone(
    produce(editorStateWithOneRoomWithNoItems, (draft) => {
      addRooms(draft);
      draft.campaignInProgress.rooms[roomB].meta = {
        subRooms: {
          "*": {
            nonContiguousRelationship: {
              with: { room: roomA },
              gridOffset: { x: 1, y: 0, z: 0 },
            },
          },
        },
      };
    }),
  );

  const result = reduceLevelEditorActions(state, removeRoom());

  expect(
    roomNonContiguousRelationship(result.campaignInProgress.rooms[roomB]),
  ).toBeUndefined();
});
