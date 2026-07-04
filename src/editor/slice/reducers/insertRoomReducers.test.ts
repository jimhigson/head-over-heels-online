import { produce } from "immer";
import { describe, expect, test } from "vitest";

import { exitGameRoomId } from "../../../model/json/ItemConfigMap";
import { roomGridPositions } from "../../../model/map/roomGridPositions";
import { subRoomById } from "../../../model/RoomJson";
import {
  type EditorJsonItem,
  type EditorRoomId,
  type EditorRoomItemId,
} from "../../editorTypes";
import { selectCursorRoom, selectCursorRoomId } from "../levelEditorSelectors";
import {
  addRoom,
  applyItemTool,
  changeToRoom,
  insertRoom,
  type LevelEditorState,
  removeRoom,
  setTool,
} from "../levelEditorSlice";
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

  test("a single door link is made without a redundant toDoor", () => {
    const result = reduceLevelEditorActions(
      stateWithFloor,
      insertRoom({ direction: "left" }),
    );

    const currentRoom = result.campaignInProgress.rooms[testRoomId];
    const [[, outDoorRaw]] = Object.entries(currentRoom.items).filter(
      ([, item]) => item.type === "door",
    );
    const outDoor = outDoorRaw as DoorItem;

    const newRoomId = outDoor.config.toRoom as EditorRoomId;
    const newRoom = result.campaignInProgress.rooms[newRoomId];
    const [returnDoor] = Object.values(newRoom.items).filter(
      (item): item is DoorItem =>
        item.type === "door" && item.config.toRoom === testRoomId,
    );

    // only one door links the two rooms, so the link resolves by direction
    // alone and neither end carries a (redundant) toDoor
    expect(returnDoor.config.toRoom).toBe(testRoomId);
    expect(outDoor.config.toDoor).toBeUndefined();
    expect(returnDoor.config.toDoor).toBeUndefined();
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

    expect(selectCursorRoomId(result)).not.toBe(testRoomId);
    expect(
      result.campaignInProgress.rooms[selectCursorRoomId(result)],
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

  test("splicing into a chain links by toRoom and clears now-redundant toDoors", () => {
    const result = reduceLevelEditorActions(
      stateWithDoorToB,
      insertRoom({ direction: "left" }),
    );

    const currentDoor = result.campaignInProgress.rooms[testRoomId].items[
      door1
    ] as DoorItem;
    const newRoomId = currentDoor.config.toRoom as EditorRoomId;
    const newRoom = result.campaignInProgress.rooms[newRoomId];
    const roomBDoor = result.campaignInProgress.rooms[roomB].items[
      door2
    ] as DoorItem;

    // every segment of the spliced chain is a single link, so the doors' stale
    // toDoors (from when they linked directly) are cleared and no redundant new
    // ones are added:
    expect(currentDoor.config.toDoor).toBeUndefined();
    expect(roomBDoor.config.toDoor).toBeUndefined();
    expect(
      Object.values(newRoom.items)
        .filter((item): item is DoorItem => item.type === "door")
        .every((door) => door.config.toDoor === undefined),
    ).toBe(true);

    // ...but the chain is still correctly connected through the new room:
    expect(currentDoor.config.toRoom).toBe(newRoomId);
    expect(roomBDoor.config.toRoom).toBe(newRoomId);
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

    expect(selectCursorRoomId(result)).toBe(roomD);
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
              physicalPosition: { from: { x: 0, y: 0 }, to: { x: 8, y: 8 } },
            },
            "1": {
              gridPosition: { x: 1, y: 0 },
              physicalPosition: {
                from: { x: 8, y: 0 },
                to: { x: 16, y: 8 },
              },
            },
          },
        },
      };
      draft.selectedRoomIds = [testRoomId];
      draft.cursorRoom = { roomId: testRoomId, subRoomId: "0" };
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
      draft.selectedRoomIds = [testRoomId];
      draft.cursorRoom = { roomId: testRoomId, subRoomId: "1" };
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
      draft.selectedRoomIds = [testRoomId];
      draft.cursorRoom = { roomId: testRoomId, subRoomId: "left" };
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

describe("insertRoom from a subroom that does not touch the room outer wall", () => {
  const stateWithFourChunks: LevelEditorState = produce(
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
          ["floor3" as EditorRoomItemId]: {
            type: "floor",
            config: {
              floorType: "standable",
              scenery: "blacktooth",
              times: { x: 12, y: 4 },
            },
            position: { x: 10, y: 0, z: 0 },
          },
        },
        meta: {
          subRooms: {
            "3": {
              gridPosition: { x: 1, y: -1 },
              physicalPosition: {
                from: { x: 10, y: 0 },
                to: { x: 17, y: 4 },
              },
            },
            "4": {
              gridPosition: { x: 2, y: -1 },
              physicalPosition: {
                from: { x: 17, y: 0 },
                to: { x: 22, y: 4 },
              },
            },
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
      draft.selectedRoomIds = [testRoomId];
      draft.cursorRoom = { roomId: testRoomId, subRoomId: "3" };
    },
  );

  test("door is placed at the subroom boundary, not the room outer wall", () => {
    const result = reduceLevelEditorActions(
      stateWithFourChunks,
      insertRoom({ direction: "right" }),
    );

    const doors = Object.values(
      result.campaignInProgress.rooms[testRoomId].items,
    ).filter((item): item is EditorJsonItem<"door"> => item.type === "door");

    expect(doors).toHaveLength(1);
    expect(doors[0].position.x).toBe(10);
  });

  test("door from subroom 'left' going left is at subroom boundary, not room outer wall", () => {
    const stateOnLeft = produce(stateWithFourChunks, (draft) => {
      draft.selectedRoomIds = [testRoomId];
      draft.cursorRoom = { roomId: testRoomId, subRoomId: "left" };
    });

    const result = reduceLevelEditorActions(
      stateOnLeft,
      insertRoom({ direction: "left" }),
    );

    const doors = Object.values(
      result.campaignInProgress.rooms[testRoomId].items,
    ).filter((item): item is EditorJsonItem<"door"> => item.type === "door");

    expect(doors).toHaveLength(1);
    expect(doors[0].position.x).toBe(17);
  });

  test("door from subroom 'right' going towards is at subroom boundary, not room outer wall", () => {
    const stateOnRight = produce(stateWithFourChunks, (draft) => {
      draft.selectedRoomIds = [testRoomId];
      draft.cursorRoom = { roomId: testRoomId, subRoomId: "right" };
    });

    const result = reduceLevelEditorActions(
      stateOnRight,
      insertRoom({ direction: "towards" }),
    );

    const doors = Object.values(
      result.campaignInProgress.rooms[testRoomId].items,
    ).filter((item): item is EditorJsonItem<"door"> => item.type === "door");

    expect(doors).toHaveLength(1);
    expect(doors[0].position.y).toBe(4);
  });
});

describe("adding a door from a single-chunk room back to a multi-chunk room", () => {
  const multiChunkRoomId = "room_0" as EditorRoomId;

  /* create a setup like:
   *
   *           /\
   *          / 1\
   *         /    \  <- big triple room
   *        /0 /\ 2\
   *        \ d  d /
   *         \/  \/
   *          \  /   <- small single room
   *           \/
   */
  const buildState = () =>
    reduceLevelEditorActions(
      editorStateWithOneRoomWithNoItems,
      addRoom({
        roomSize: { x: 8, y: 8 },
        gridPositions: [
          { x: 0, y: 0 },
          { x: 0, y: 1 },
          { x: -1, y: 1 },
        ],
      }),
      changeToRoom({ roomId: multiChunkRoomId, subRoomId: "0" }),
      insertRoom({ direction: "right" }),
      insertRoom({ direction: "away" }),
    );

  test("does not crash when roomGridPositions traverses the result", () => {
    const result = buildState();
    const { roomId, subRoomId } = selectCursorRoom(result);

    const positions = [
      ...roomGridPositions({
        campaign: result.campaignInProgress,
        roomId,
        subRoomId,
      }).keys(),
    ];

    expect(positions.length).toBeGreaterThan(0);
  });

  test("return door in the multi-chunk room is within the target subroom bounds", () => {
    const result = buildState();
    const multiChunkRoom = result.campaignInProgress.rooms[multiChunkRoomId];

    const subRoom2 = subRoomById(multiChunkRoom, "2")!;

    const returnDoors = Object.values(multiChunkRoom.items).filter(
      (item): item is EditorJsonItem<"door"> =>
        item.type === "door" && item.config.direction === "towards",
    );

    expect(returnDoors).toHaveLength(1);
    const [returnDoor] = returnDoors;

    expect(returnDoor.position.x).toBeGreaterThanOrEqual(
      subRoom2.physicalPosition.from.x,
    );
    expect(returnDoor.position.x).toBeLessThan(subRoom2.physicalPosition.to.x);
    expect(returnDoor.position.y).toBeGreaterThanOrEqual(
      subRoom2.physicalPosition.from.y,
    );
    expect(returnDoor.position.y).toBeLessThan(subRoom2.physicalPosition.to.y);
  });
});

describe("placing a door tool in a non-origin subroom of a multi-chunk room", () => {
  const multiChunkRoomId = "room_0" as EditorRoomId;

  const buildState = () =>
    reduceLevelEditorActions(
      editorStateWithOneRoomWithNoItems,
      addRoom({
        roomSize: { x: 8, y: 8 },
        gridPositions: [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
        ],
      }),
      changeToRoom({ roomId: multiChunkRoomId, subRoomId: "1" }),
      setTool({
        type: "item",
        item: {
          type: "door",
          config: { direction: "away", toRoom: "+" },
        },
      }),
      applyItemTool({
        blockPosition: { x: 11, y: 0, z: 1 },
        pointedAtItemJson: {
          type: "wall",
          config: {
            direction: "towards",
            tiles: Array(16).fill("plain"),
          },
          position: { x: 0, y: 0, z: 0 },
        },
        preview: false,
        timestamp: 0,
      }),
    );

  test("return door in the new room has x within [0, 8)", () => {
    const result = buildState();

    const newRoomId = Object.keys(result.campaignInProgress.rooms).find(
      (id) => id !== testRoomId && id !== multiChunkRoomId,
    ) as EditorRoomId;
    const newRoom = result.campaignInProgress.rooms[newRoomId];

    const returnDoors = Object.values(newRoom.items).filter(
      (item): item is EditorJsonItem<"door"> => item.type === "door",
    );

    expect(returnDoors).toHaveLength(1);
    const [returnDoor] = returnDoors;

    expect(returnDoor.position.x).toBeGreaterThanOrEqual(0);
    expect(returnDoor.position.x).toBeLessThan(8);
  });
});

describe("removeRoom cleans up doors and heals walls", () => {
  const roomWithWallsId = "room_0" as EditorRoomId;

  const stateWithWalledRoom = reduceLevelEditorActions(
    editorStateWithOneRoomWithNoItems,
    addRoom({ roomSize: { x: 8, y: 8 } }),
  );

  test("inserting then removing a room restores the original room to its prior state", () => {
    const originalRoom =
      stateWithWalledRoom.campaignInProgress.rooms[roomWithWallsId];

    const afterRemove = reduceLevelEditorActions(
      stateWithWalledRoom,
      insertRoom({ direction: "left" }),
      removeRoom(),
    );

    const restoredRoom = afterRemove.campaignInProgress.rooms[roomWithWallsId];

    const doors = Object.values(restoredRoom.items).filter(
      (item) => item.type === "door",
    );
    expect(doors).toHaveLength(0);

    const originalWalls = Object.values(originalRoom.items)
      .filter((item) => item.type === "wall")
      .map(({ type, config, position }) => ({ type, config, position }));
    const restoredWalls = Object.values(restoredRoom.items)
      .filter((item) => item.type === "wall")
      .map(({ type, config, position }) => ({ type, config, position }));

    expect(restoredWalls).toEqual(expect.arrayContaining(originalWalls));
    expect(restoredWalls).toHaveLength(originalWalls.length);
  });
});
