import { produce } from "immer";
import { expect, test } from "vitest";

import {
  type EditorJsonItem,
  type EditorJsonItemUnion,
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
} from "../../editorTypes";
import { dropItemsOnRoomThunk } from "../dropItemsOnRoomThunk";
import {
  selectCursorRoomIdFromLevelEditorState,
  selectCursorRoomSelectedJsonItemIdsFromLevelEditorState,
} from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";
import {
  editorStateWithOneRoomWithNoItems,
  reduceLevelEditorActions,
  testRoomId,
} from "./__test__/storeStates";

const roomB = "roomB" as EditorRoomId;
const roomC = "roomC" as EditorRoomId;
const roomD = "roomD" as EditorRoomId;

const blockId = "block" as EditorRoomItemId;
const joystickId = "joystick" as EditorRoomItemId;
const teleporterId = "teleporter" as EditorRoomItemId;
const floorId = "floor" as EditorRoomItemId;

const roomWithFloor = (
  roomId: EditorRoomId,
  items: Record<string, EditorJsonItemUnion> = {},
  floorSize = 8,
): EditorRoomJson => ({
  id: roomId,
  planet: "blacktooth",
  color: { hue: "cyan", shade: "basic" },
  items: {
    [floorId]: {
      type: "floor",
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: floorSize, y: floorSize },
      },
      position: { x: 0, y: 0, z: 0 },
    },
    ...items,
  } as EditorRoomJson["items"],
});

const block = (x: number, y: number): EditorJsonItemUnion => ({
  type: "block",
  config: { style: "organic" },
  position: { x, y, z: 0 },
});

const teleporterTo = (toRoom: EditorRoomId): EditorJsonItemUnion => ({
  type: "teleporter",
  config: { toRoom },
  position: { x: 5, y: 1, z: 0 },
});

const stateWithRooms = (...rooms: EditorRoomJson[]): LevelEditorState =>
  produce(editorStateWithOneRoomWithNoItems, (draft) => {
    for (const room of rooms) {
      draft.campaignInProgress.rooms[room.id] = room;
    }
  });

const baseState = stateWithRooms(
  roomWithFloor(testRoomId, {
    [blockId]: block(2, 2),
    [joystickId]: {
      type: "joystick",
      config: { controls: [blockId] },
      position: { x: 5, y: 5, z: 0 },
    },
    [teleporterId]: teleporterTo(roomC),
  }),
  roomWithFloor(roomB, { [blockId]: block(2, 2) }),
  roomWithFloor(roomC, { [teleporterId]: teleporterTo(testRoomId) }),
);

const jsonItemFromRoom = (
  state: LevelEditorState,
  roomId: EditorRoomId,
  itemId: string,
) => state.campaignInProgress.rooms[roomId]?.items[itemId as EditorRoomItemId];

test("removes the item from the room it was in", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(
    state0,
    dropItemsOnRoomThunk({
      itemIds: [blockId],
      toRoomId: roomB,
      toSubRoomId: "*",
    }),
  );
  expect(jsonItemFromRoom(state1, testRoomId, blockId)).toBe(undefined);
});

test("gives the item a new id when its id is taken in the destination", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(
    state0,
    dropItemsOnRoomThunk({
      itemIds: [blockId],
      toRoomId: roomB,
      toSubRoomId: "*",
    }),
  );
  expect(jsonItemFromRoom(state1, roomB, "block1")?.type).toBe("block");
});

test("moves the item to the nearest whole block clear of collisions", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(
    state0,
    dropItemsOnRoomThunk({
      itemIds: [blockId],
      toRoomId: roomB,
      toSubRoomId: "*",
    }),
  );
  expect(jsonItemFromRoom(state1, roomB, "block1")?.position).toEqual({
    x: 2,
    y: 1,
    z: 0,
  });
});

test("prefers moving sideways to stacking up", () => {
  const state0 = produce(baseState, (draft) => {
    const roomBItems = draft.campaignInProgress.rooms[roomB].items;
    for (const [x, y] of [
      [1, 2],
      [3, 2],
      [2, 1],
      [2, 3],
    ]) {
      roomBItems[`b${x}${y}` as EditorRoomItemId] = block(x, y);
    }
  });
  const state1 = reduceLevelEditorActions(
    state0,
    dropItemsOnRoomThunk({
      itemIds: [blockId],
      toRoomId: roomB,
      toSubRoomId: "*",
    }),
  );
  // nothing one block away, so two across (cost 2) beats one up (cost 4):
  expect(jsonItemFromRoom(state1, roomB, "block1")?.position.z).toBe(0);
});

test("makes the destination the current room", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(
    state0,
    dropItemsOnRoomThunk({
      itemIds: [blockId],
      toRoomId: roomB,
      toSubRoomId: "*",
    }),
  );
  expect(selectCursorRoomIdFromLevelEditorState(state1)).toBe(roomB);
});

test("selects the moved items in the destination", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(
    state0,
    dropItemsOnRoomThunk({
      itemIds: [blockId],
      toRoomId: roomB,
      toSubRoomId: "*",
    }),
  );
  expect(
    selectCursorRoomSelectedJsonItemIdsFromLevelEditorState(state1),
  ).toEqual(["block1"]);
});

test("pushes an undo entry onto the destination room", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(
    state0,
    dropItemsOnRoomThunk({
      itemIds: [blockId],
      toRoomId: roomB,
      toSubRoomId: "*",
    }),
  );
  expect(state1.history[roomB]?.undo).toHaveLength(1);
});

test("pushes an undo entry onto the room moved from", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(
    state0,
    dropItemsOnRoomThunk({
      itemIds: [blockId],
      toRoomId: roomB,
      toSubRoomId: "*",
    }),
  );
  expect(state1.history[testRoomId]?.undo).toHaveLength(1);
});

test("leaves scenery behind", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(
    state0,
    dropItemsOnRoomThunk({
      itemIds: [blockId, floorId],
      toRoomId: roomB,
      toSubRoomId: "*",
    }),
  );
  expect(jsonItemFromRoom(state1, testRoomId, floorId)).toBeDefined();
});

test("does nothing when dropped on the room the items are in", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(
    state0,
    dropItemsOnRoomThunk({
      itemIds: [blockId],
      toRoomId: testRoomId,
      toSubRoomId: "*",
    }),
  );
  expect(state1).toBe(state0);
});

test("does nothing when the items fit nowhere in the destination", () => {
  const state0 = produce(baseState, (draft) => {
    draft.campaignInProgress.rooms[roomB] = roomWithFloor(roomB, {}, 1);
    draft.campaignInProgress.rooms[testRoomId].items[blockId] = {
      ...block(0, 0),
      config: { style: "organic", times: { x: 2 } },
    } as EditorJsonItemUnion;
  });
  const state1 = reduceLevelEditorActions(
    state0,
    dropItemsOnRoomThunk({
      itemIds: [blockId],
      toRoomId: roomB,
      toSubRoomId: "*",
    }),
  );
  expect(state1).toBe(state0);
});

test("keeps a reference between items that move together, under their new ids", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(
    state0,
    dropItemsOnRoomThunk({
      itemIds: [blockId, joystickId],
      toRoomId: roomB,
      toSubRoomId: "*",
    }),
  );
  expect(
    (jsonItemFromRoom(state1, roomB, joystickId) as EditorJsonItem<"joystick">)
      .config.controls,
  ).toEqual(["block1"]);
});

test("drops a reference from a moved item to one left behind", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(
    state0,
    dropItemsOnRoomThunk({
      itemIds: [joystickId],
      toRoomId: roomB,
      toSubRoomId: "*",
    }),
  );
  expect(
    (jsonItemFromRoom(state1, roomB, joystickId) as EditorJsonItem<"joystick">)
      .config.controls,
  ).toEqual([]);
});

test("drops a reference from an item left behind to a moved one", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(
    state0,
    dropItemsOnRoomThunk({
      itemIds: [blockId],
      toRoomId: roomB,
      toSubRoomId: "*",
    }),
  );
  expect(
    (
      jsonItemFromRoom(
        state1,
        testRoomId,
        joystickId,
      ) as EditorJsonItem<"joystick">
    ).config.controls,
  ).toEqual([]);
});

test("a teleporter that landed on a moved teleporter goes to its new room", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(
    state0,
    dropItemsOnRoomThunk({
      itemIds: [teleporterId],
      toRoomId: roomB,
      toSubRoomId: "*",
    }),
  );
  expect(
    (
      jsonItemFromRoom(
        state1,
        roomC,
        teleporterId,
      ) as EditorJsonItem<"teleporter">
    ).config,
  ).toEqual({ toRoom: roomB });
});

test("a teleporter that landed on a moved teleporter names it where the new room has several", () => {
  const state0 = produce(baseState, (draft) => {
    draft.campaignInProgress.rooms[roomB].items[teleporterId] =
      teleporterTo(roomD);
  });
  const state1 = reduceLevelEditorActions(
    state0,
    dropItemsOnRoomThunk({
      itemIds: [teleporterId],
      toRoomId: roomB,
      toSubRoomId: "*",
    }),
  );
  expect(
    (
      jsonItemFromRoom(
        state1,
        roomC,
        teleporterId,
      ) as EditorJsonItem<"teleporter">
    ).config,
  ).toEqual({ toRoom: roomB, toItemId: "teleporter1" });
});

test("a teleporter landing on the destination's only teleporter names it once there are several", () => {
  const state0 = produce(baseState, (draft) => {
    draft.campaignInProgress.rooms[roomB].items[teleporterId] =
      teleporterTo(roomD);
    draft.campaignInProgress.rooms[roomD] = roomWithFloor(roomD, {
      [teleporterId]: teleporterTo(roomB),
    });
  });
  const state1 = reduceLevelEditorActions(
    state0,
    dropItemsOnRoomThunk({
      itemIds: [teleporterId],
      toRoomId: roomB,
      toSubRoomId: "*",
    }),
  );
  expect(
    (
      jsonItemFromRoom(
        state1,
        roomD,
        teleporterId,
      ) as EditorJsonItem<"teleporter">
    ).config,
  ).toEqual({ toRoom: roomB, toItemId: teleporterId });
});
