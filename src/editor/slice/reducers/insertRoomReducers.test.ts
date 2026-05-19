import { produce } from "immer";
import { describe, expect, test } from "vitest";

import type {
  EditorJsonItem,
  EditorRoomId,
  EditorRoomItemId,
} from "../../editorTypes";

import { exitGameRoomId } from "../../../model/json/ItemConfigMap";
import { insertRoom, type LevelEditorState } from "../levelEditorSlice";
import {
  editorStateWithOneRoomWithNoItems,
  reduceLevelEditorActions,
  testRoomId,
} from "./__test__/storeStates";

type DoorItem = EditorJsonItem<"door">;

const roomB = "roomB" as EditorRoomId;
const door1 = "door1" as EditorRoomItemId;
const door2 = "door2" as EditorRoomItemId;

const stateWithFloor: LevelEditorState = produce(
  editorStateWithOneRoomWithNoItems,
  (draft) => {
    draft.campaignInProgress.rooms[testRoomId].items[
      "floor0" as EditorRoomItemId
    ] = {
      type: "floor",
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
    };
  },
);

const stateWithFloorAndRoomB: LevelEditorState = produce(
  stateWithFloor,
  (draft) => {
    draft.campaignInProgress.rooms[roomB] = {
      id: roomB,
      planet: "blacktooth",
      color: { hue: "cyan", shade: "basic" },
      items: {
        ["floor0" as EditorRoomItemId]: {
          type: "floor",
          config: {
            floorType: "standable",
            scenery: "blacktooth",
            times: { x: 8, y: 8 },
          },
          position: { x: 0, y: 0, z: 0 },
        },
      },
    };
  },
);

describe("insertRoom with no existing doors", () => {
  test("creates a new room in the campaign", () => {
    const result = reduceLevelEditorActions(
      stateWithFloor,
      insertRoom({ direction: "left" }),
    );

    const roomIds = Object.keys(result.campaignInProgress.rooms);
    expect(roomIds).toHaveLength(2);
  });

  test("adds a door in the given direction to the current room", () => {
    const result = reduceLevelEditorActions(
      stateWithFloor,
      insertRoom({ direction: "left" }),
    );

    const currentRoomItems = Object.values(
      result.campaignInProgress.rooms[testRoomId].items,
    );
    const doors = currentRoomItems.filter(
      (item): item is EditorJsonItem<"door"> => item.type === "door",
    );

    expect(doors).toHaveLength(1);
    expect(doors[0].config).toMatchObject({ direction: "left" });
  });

  test("the new door points to the newly created room", () => {
    const result = reduceLevelEditorActions(
      stateWithFloor,
      insertRoom({ direction: "left" }),
    );

    const currentRoomItems = Object.values(
      result.campaignInProgress.rooms[testRoomId].items,
    );
    const [door] = currentRoomItems.filter(
      (item): item is EditorJsonItem<"door"> => item.type === "door",
    );
    const newRoomId = door.config.toRoom as EditorRoomId;

    expect(result.campaignInProgress.rooms[newRoomId]).toBeDefined();
  });

  test("the new room has a return door pointing back", () => {
    const result = reduceLevelEditorActions(
      stateWithFloor,
      insertRoom({ direction: "left" }),
    );

    const currentRoomItems = Object.values(
      result.campaignInProgress.rooms[testRoomId].items,
    );
    const [door] = currentRoomItems.filter(
      (item): item is EditorJsonItem<"door"> => item.type === "door",
    );
    const newRoomId = door.config.toRoom as EditorRoomId;
    const newRoomItems = Object.values(
      result.campaignInProgress.rooms[newRoomId].items,
    );
    const returnDoors = newRoomItems.filter(
      (item): item is EditorJsonItem<"door"> =>
        item.type === "door" && item.config.direction === "right",
    );

    expect(returnDoors).toHaveLength(1);
    expect(returnDoors[0].config.toRoom).toBe(testRoomId);
  });

  test("doors are cross-linked with toDoor", () => {
    const result = reduceLevelEditorActions(
      stateWithFloor,
      insertRoom({ direction: "left" }),
    );

    const currentRoom = result.campaignInProgress.rooms[testRoomId];
    const currentRoomDoorEntries = Object.entries(currentRoom.items).filter(
      ([, item]) => item.type === "door",
    );
    const [[outDoorId, outDoorRaw]] = currentRoomDoorEntries;
    const outDoor = outDoorRaw as DoorItem;

    const newRoomId = outDoor.config.toRoom as EditorRoomId;
    const newRoom = result.campaignInProgress.rooms[newRoomId];
    const returnDoor = newRoom.items[
      outDoor.config.toDoor! as EditorRoomItemId
    ] as DoorItem;

    expect(returnDoor).toBeDefined();
    expect(returnDoor.config.toDoor).toBe(outDoorId);
  });

  test("centres the door on an 8-unit wall with 3 units on each side", () => {
    const result = reduceLevelEditorActions(
      stateWithFloor,
      insertRoom({ direction: "left" }),
    );

    const currentRoomItems = Object.values(
      result.campaignInProgress.rooms[testRoomId].items,
    );
    const [door] = currentRoomItems.filter(
      (item): item is EditorJsonItem<"door"> => item.type === "door",
    );

    expect(door.position).toEqual({ x: 8, y: 3, z: 0 });
  });

  test("navigates to the newly created room after insertion", () => {
    const result = reduceLevelEditorActions(
      stateWithFloor,
      insertRoom({ direction: "away" }),
    );

    expect(result.currentlyEditing.roomId).not.toBe(testRoomId);
    expect(
      result.campaignInProgress.rooms[result.currentlyEditing.roomId],
    ).toBeDefined();
  });
});

describe("insertRoom with existing door in that direction", () => {
  const stateWithDoorToB: LevelEditorState = produce(
    stateWithFloorAndRoomB,
    (draft) => {
      draft.campaignInProgress.rooms[testRoomId].items[door1] = {
        type: "door",
        config: { toRoom: roomB, direction: "left" },
        position: { x: 8, y: 4, z: 0 },
      };
      draft.campaignInProgress.rooms[roomB].items[door2] = {
        type: "door",
        config: { toRoom: testRoomId, direction: "right", toDoor: door1 },
        position: { x: 0, y: 4, z: 0 },
      };
      (
        draft.campaignInProgress.rooms[testRoomId].items[door1] as DoorItem
      ).config.toDoor = door2;
    },
  );

  test("re-points the current room door to the new room", () => {
    const result = reduceLevelEditorActions(
      stateWithDoorToB,
      insertRoom({ direction: "left" }),
    );

    const currentDoor = result.campaignInProgress.rooms[testRoomId].items[
      door1
    ] as DoorItem;
    expect(currentDoor.config.toRoom).not.toBe(roomB);

    const newRoomId = currentDoor.config.toRoom as EditorRoomId;
    expect(result.campaignInProgress.rooms[newRoomId]).toBeDefined();
  });

  test("re-points the inbound door from roomB to the new room", () => {
    const result = reduceLevelEditorActions(
      stateWithDoorToB,
      insertRoom({ direction: "left" }),
    );

    const roomBDoor = result.campaignInProgress.rooms[roomB].items[
      door2
    ] as DoorItem;
    expect(roomBDoor.config.toRoom).not.toBe(testRoomId);

    const newRoomId = roomBDoor.config.toRoom as EditorRoomId;
    expect(result.campaignInProgress.rooms[newRoomId]).toBeDefined();
  });

  test("the new room has a return door to the current room and a forward door to roomB", () => {
    const result = reduceLevelEditorActions(
      stateWithDoorToB,
      insertRoom({ direction: "left" }),
    );

    const currentDoor = result.campaignInProgress.rooms[testRoomId].items[
      door1
    ] as DoorItem;
    const newRoomId = currentDoor.config.toRoom as EditorRoomId;
    const newRoomItems = Object.values(
      result.campaignInProgress.rooms[newRoomId].items,
    );
    const newRoomDoors = newRoomItems.filter(
      (item): item is EditorJsonItem<"door"> => item.type === "door",
    );

    const returnDoor = newRoomDoors.find(
      (d) => d.config.toRoom === testRoomId && d.config.direction === "right",
    );
    const forwardDoor = newRoomDoors.find(
      (d) => d.config.toRoom === roomB && d.config.direction === "left",
    );

    expect(returnDoor).toBeDefined();
    expect(forwardDoor).toBeDefined();
  });

  test("toDoor cross-links are maintained through the new room", () => {
    const result = reduceLevelEditorActions(
      stateWithDoorToB,
      insertRoom({ direction: "left" }),
    );

    const currentDoor = result.campaignInProgress.rooms[testRoomId].items[
      door1
    ] as DoorItem;
    const newRoomId = currentDoor.config.toRoom as EditorRoomId;
    const newRoom = result.campaignInProgress.rooms[newRoomId];

    const returnDoorId = currentDoor.config.toDoor! as EditorRoomItemId;
    const returnDoor = newRoom.items[returnDoorId] as DoorItem;
    expect(returnDoor.config.toDoor).toBe(door1);

    const roomBDoor = result.campaignInProgress.rooms[roomB].items[
      door2
    ] as DoorItem;
    const forwardDoorId = roomBDoor.config.toDoor! as EditorRoomItemId;
    const forwardDoor = newRoom.items[forwardDoorId] as DoorItem;
    expect(forwardDoor.config.toDoor).toBe(door2);
  });
});

describe("insertRoom with door to $$final", () => {
  const stateWithFinalDoor: LevelEditorState = produce(
    stateWithFloor,
    (draft) => {
      draft.campaignInProgress.rooms[testRoomId].items[door1] = {
        type: "door",
        config: { toRoom: exitGameRoomId, direction: "away" },
        position: { x: 4, y: 8, z: 0 },
      };
    },
  );

  test("re-points the current room door to the new room", () => {
    const result = reduceLevelEditorActions(
      stateWithFinalDoor,
      insertRoom({ direction: "away" }),
    );

    const currentDoor = result.campaignInProgress.rooms[testRoomId].items[
      door1
    ] as DoorItem;
    expect(currentDoor.config.toRoom).not.toBe(exitGameRoomId);
  });

  test("the new room gets a door pointing to $$final", () => {
    const result = reduceLevelEditorActions(
      stateWithFinalDoor,
      insertRoom({ direction: "away" }),
    );

    const currentDoor = result.campaignInProgress.rooms[testRoomId].items[
      door1
    ] as DoorItem;
    const newRoomId = currentDoor.config.toRoom as EditorRoomId;
    const newRoomItems = Object.values(
      result.campaignInProgress.rooms[newRoomId].items,
    );
    const finalDoor = newRoomItems.find(
      (item): item is EditorJsonItem<"door"> =>
        item.type === "door" && item.config.toRoom === exitGameRoomId,
    );

    expect(finalDoor).toBeDefined();
    expect(finalDoor!.config.direction).toBe("away");
  });
});

describe("insertRoom with multiple doors in same direction", () => {
  const stateWithTwoDoors: LevelEditorState = produce(
    stateWithFloorAndRoomB,
    (draft) => {
      draft.campaignInProgress.rooms[testRoomId].items[door1] = {
        type: "door",
        config: { toRoom: roomB, direction: "towards" },
        position: { x: 2, y: 0, z: 0 },
      };
      draft.campaignInProgress.rooms[testRoomId].items[door2] = {
        type: "door",
        config: { toRoom: roomB, direction: "towards" },
        position: { x: 5, y: 0, z: 0 },
      };
    },
  );

  test("creates return doors for each outgoing door", () => {
    const result = reduceLevelEditorActions(
      stateWithTwoDoors,
      insertRoom({ direction: "towards" }),
    );

    const d1 = result.campaignInProgress.rooms[testRoomId].items[
      door1
    ] as DoorItem;
    const newRoomId = d1.config.toRoom as EditorRoomId;
    const newRoomItems = Object.values(
      result.campaignInProgress.rooms[newRoomId].items,
    );
    const returnDoors = newRoomItems.filter(
      (item): item is EditorJsonItem<"door"> =>
        item.type === "door" && item.config.toRoom === testRoomId,
    );

    expect(returnDoors).toHaveLength(2);
  });
});

describe("insertRoom when unconnected room already exists at target grid position", () => {
  const roomC = "roomC" as EditorRoomId;
  const roomD = "roomD" as EditorRoomId;
  const makeFloor = () =>
    ({
      type: "floor" as const,
      config: {
        floorType: "standable" as const,
        scenery: "blacktooth" as const,
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
    }) as const;

  const stateWithAdjacentUnconnectedRoom: LevelEditorState = produce(
    stateWithFloorAndRoomB,
    (draft) => {
      draft.campaignInProgress.rooms[roomC] = {
        id: roomC,
        planet: "blacktooth",
        color: { hue: "cyan", shade: "basic" },
        items: { ["f" as EditorRoomItemId]: makeFloor() },
      };
      draft.campaignInProgress.rooms[roomD] = {
        id: roomD,
        planet: "blacktooth",
        color: { hue: "cyan", shade: "basic" },
        items: { ["f" as EditorRoomItemId]: makeFloor() },
      };
      draft.campaignInProgress.rooms[testRoomId].items[door1] = {
        type: "door",
        config: { toRoom: roomB, direction: "left" },
        position: { x: 8, y: 3, z: 0 },
      };
      draft.campaignInProgress.rooms[roomB].items[door1] = {
        type: "door",
        config: { toRoom: testRoomId, direction: "right" },
        position: { x: 0, y: 3, z: 0 },
      };
      draft.campaignInProgress.rooms[roomB].items[door2] = {
        type: "door",
        config: { toRoom: roomC, direction: "away" },
        position: { x: 3, y: 8, z: 0 },
      };
      draft.campaignInProgress.rooms[roomC].items[door1] = {
        type: "door",
        config: { toRoom: roomB, direction: "towards" },
        position: { x: 3, y: 0, z: 0 },
      };
      draft.campaignInProgress.rooms[roomC].items[door2] = {
        type: "door",
        config: { toRoom: roomD, direction: "right" },
        position: { x: 0, y: 3, z: 0 },
      };
      draft.campaignInProgress.rooms[roomD].items[door1] = {
        type: "door",
        config: { toRoom: roomC, direction: "left" },
        position: { x: 8, y: 3, z: 0 },
      };
    },
  );

  test("connects to the existing room instead of creating a new one", () => {
    const before = Object.keys(
      stateWithAdjacentUnconnectedRoom.campaignInProgress.rooms,
    ).length;

    const result = reduceLevelEditorActions(
      stateWithAdjacentUnconnectedRoom,
      insertRoom({ direction: "away" }),
    );

    const after = Object.keys(result.campaignInProgress.rooms).length;
    expect(after).toBe(before);

    const currentRoomDoors = Object.values(
      result.campaignInProgress.rooms[testRoomId].items,
    ).filter((item): item is EditorJsonItem<"door"> => item.type === "door");
    const doorToD = currentRoomDoors.find((d) => d.config.toRoom === roomD);
    expect(doorToD).toBeDefined();
    expect(doorToD!.config.direction).toBe("away");
  });

  test("navigates to the existing room after connecting", () => {
    const result = reduceLevelEditorActions(
      stateWithAdjacentUnconnectedRoom,
      insertRoom({ direction: "away" }),
    );

    expect(result.currentlyEditing.roomId).toBe(roomD);
  });
});

describe("insertRoom from a subroom of a multi-chunk room", () => {
  const stateWithTwoChunkRoom: LevelEditorState = produce(
    editorStateWithOneRoomWithNoItems,
    (draft) => {
      draft.campaignInProgress.rooms[testRoomId] = {
        id: testRoomId,
        planet: "blacktooth",
        color: { hue: "cyan", shade: "basic" },
        items: {
          ["floor" as EditorRoomItemId]: {
            type: "floor",
            config: {
              floorType: "standable",
              scenery: "blacktooth",
              times: { x: 16, y: 8 },
            },
            position: { x: 0, y: 0, z: 0 },
          },
        },
        meta: {
          subRooms: {
            "0": {
              gridPosition: { x: 0, y: 0 },
              physicalPosition: { from: { x: 0, y: 0 }, to: { x: 7, y: 7 } },
            },
            "1": {
              gridPosition: { x: 1, y: 0 },
              physicalPosition: {
                from: { x: 8, y: 0 },
                to: { x: 15, y: 7 },
              },
            },
          },
        },
      };
      draft.currentlyEditing = { roomId: testRoomId, subRoomId: "0" };
    },
  );

  test("door is centred on the subroom, not the whole room", () => {
    const result = reduceLevelEditorActions(
      stateWithTwoChunkRoom,
      insertRoom({ direction: "away" }),
    );

    const doors = Object.values(
      result.campaignInProgress.rooms[testRoomId].items,
    ).filter((item): item is EditorJsonItem<"door"> => item.type === "door");

    expect(doors).toHaveLength(1);
    expect(doors[0].position.x).toBe(3);
    expect(doors[0].position.y).toBe(8);
  });

  test("inserting from subroom 1 centres the door on subroom 1", () => {
    const stateOnSubRoom1 = produce(stateWithTwoChunkRoom, (draft) => {
      draft.currentlyEditing = { roomId: testRoomId, subRoomId: "1" };
    });

    const result = reduceLevelEditorActions(
      stateOnSubRoom1,
      insertRoom({ direction: "away" }),
    );

    const doors = Object.values(
      result.campaignInProgress.rooms[testRoomId].items,
    ).filter((item): item is EditorJsonItem<"door"> => item.type === "door");

    expect(doors).toHaveLength(1);
    expect(doors[0].position.x).toBe(11);
    expect(doors[0].position.y).toBe(8);
  });
});

describe("insertRoom from a subroom where floor extends beyond subroom bounds", () => {
  const stateWithIrregularChunks: LevelEditorState = produce(
    editorStateWithOneRoomWithNoItems,
    (draft) => {
      draft.campaignInProgress.rooms[testRoomId] = {
        id: testRoomId,
        planet: "blacktooth",
        color: { hue: "cyan", shade: "basic" },
        items: {
          ["floor" as EditorRoomItemId]: {
            type: "floor",
            config: {
              floorType: "standable",
              scenery: "blacktooth",
              times: { x: 17, y: 8 },
            },
            position: { x: 0, y: 4, z: 0 },
          },
        },
        meta: {
          subRooms: {
            left: {
              gridPosition: { x: 1, y: 0 },
              physicalPosition: {
                from: { x: 10, y: 4 },
                to: { x: 17, y: 12 },
              },
            },
            right: {
              gridPosition: { x: 0, y: 0 },
              physicalPosition: {
                from: { x: 0, y: 4 },
                to: { x: 10, y: 12 },
              },
            },
          },
        },
      };
      draft.currentlyEditing = { roomId: testRoomId, subRoomId: "left" };
    },
  );

  test("door is placed at the room wall edge, not at subroom boundary", () => {
    const result = reduceLevelEditorActions(
      stateWithIrregularChunks,
      insertRoom({ direction: "away" }),
    );

    const doors = Object.values(
      result.campaignInProgress.rooms[testRoomId].items,
    ).filter((item): item is EditorJsonItem<"door"> => item.type === "door");

    expect(doors).toHaveLength(1);
    expect(doors[0].position.y).toBe(12);
  });

  test("door is centred within the subroom x range", () => {
    const result = reduceLevelEditorActions(
      stateWithIrregularChunks,
      insertRoom({ direction: "away" }),
    );

    const doors = Object.values(
      result.campaignInProgress.rooms[testRoomId].items,
    ).filter((item): item is EditorJsonItem<"door"> => item.type === "door");

    expect(doors).toHaveLength(1);
    expect(doors[0].position.x).toBe(12);
  });

  test("the new room has a return door", () => {
    const result = reduceLevelEditorActions(
      stateWithIrregularChunks,
      insertRoom({ direction: "away" }),
    );

    const doors = Object.values(
      result.campaignInProgress.rooms[testRoomId].items,
    ).filter((item): item is EditorJsonItem<"door"> => item.type === "door");

    const newRoomId = doors[0].config.toRoom as EditorRoomId;
    const newRoom = result.campaignInProgress.rooms[newRoomId];
    const returnDoors = Object.values(newRoom.items).filter(
      (item): item is EditorJsonItem<"door"> =>
        item.type === "door" && item.config.direction === "towards",
    );

    expect(returnDoors).toHaveLength(1);
    expect(returnDoors[0].config.toRoom).toBe(testRoomId);
    expect(returnDoors[0].position.x).toBe(2);
  });
});
