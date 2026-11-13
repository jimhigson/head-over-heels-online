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
import {
  selectCursorRoomFromLevelEditorState,
  selectCursorRoomIdFromLevelEditorState,
} from "../levelEditorSelectors";
import {
  addRoom,
  addRoomToSelection,
  applyItemTool,
  changeToRoom,
  insertRoom,
  type LevelEditorState,
  removeRoom,
  setTool,
} from "../levelEditorSlice";
import { existingLayoutNode } from "../PaneLayout";
import {
  editorStateWithOneRoomWithNoItems,
  reduceLevelEditorActions,
  testOpenRoomId,
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
  test("writes only what json can hold - no key is left undefined", () => {
    const state0 = stateWithFloor;
    const state1 = reduceLevelEditorActions(
      state0,
      insertRoom({ direction: "left" }),
    );

    const undefinedPaths: string[] = [];
    const collectUndefinedPaths = (value: unknown, path: string) => {
      if (typeof value !== "object" || value === null) {
        return;
      }
      for (const [key, child] of Object.entries(value)) {
        if (child === undefined) {
          undefinedPaths.push(`${path}.${key}`);
        } else {
          collectUndefinedPaths(child, `${path}.${key}`);
        }
      }
    };
    collectUndefinedPaths(state1.campaignInProgress.rooms, "rooms");

    expect(undefinedPaths).toEqual([]);
  });

  test("creates a new room in the campaign", () => {
    const state0 = stateWithFloor;
    const state1 = reduceLevelEditorActions(
      state0,
      insertRoom({ direction: "left" }),
    );

    const roomIds = Object.keys(state1.campaignInProgress.rooms);
    expect(roomIds).toHaveLength(2);
  });

  test("adds a door in the given direction to the current room", () => {
    const state0 = stateWithFloor;
    const state1 = reduceLevelEditorActions(
      state0,
      insertRoom({ direction: "left" }),
    );

    const currentRoomItems = Object.values(
      state1.campaignInProgress.rooms[testRoomId].items,
    );
    const doors = currentRoomItems.filter(
      (item): item is EditorJsonItem<"door"> => item.type === "door",
    );

    expect(doors).toHaveLength(1);
    expect(doors[0].config).toMatchObject({ direction: "left" });
  });

  test("the new door points to the newly created room", () => {
    const state0 = stateWithFloor;
    const state1 = reduceLevelEditorActions(
      state0,
      insertRoom({ direction: "left" }),
    );

    const currentRoomItems = Object.values(
      state1.campaignInProgress.rooms[testRoomId].items,
    );
    const [door] = currentRoomItems.filter(
      (item): item is EditorJsonItem<"door"> => item.type === "door",
    );
    const newRoomId = door.config.toRoom as EditorRoomId;

    expect(state1.campaignInProgress.rooms[newRoomId]).toBeDefined();
  });

  test("the new room has a return door pointing back", () => {
    const state0 = stateWithFloor;
    const state1 = reduceLevelEditorActions(
      state0,
      insertRoom({ direction: "left" }),
    );

    const currentRoomItems = Object.values(
      state1.campaignInProgress.rooms[testRoomId].items,
    );
    const [door] = currentRoomItems.filter(
      (item): item is EditorJsonItem<"door"> => item.type === "door",
    );
    const newRoomId = door.config.toRoom as EditorRoomId;
    const newRoomItems = Object.values(
      state1.campaignInProgress.rooms[newRoomId].items,
    );
    const returnDoors = newRoomItems.filter(
      (item): item is EditorJsonItem<"door"> =>
        item.type === "door" && item.config.direction === "right",
    );

    expect(returnDoors).toHaveLength(1);
    expect(returnDoors[0].config.toRoom).toBe(testRoomId);
  });

  test("a single door link is made without a redundant toDoor", () => {
    const state0 = stateWithFloor;
    const state1 = reduceLevelEditorActions(
      state0,
      insertRoom({ direction: "left" }),
    );

    const currentRoom = state1.campaignInProgress.rooms[testRoomId];
    const [[, outDoorRaw]] = Object.entries(currentRoom.items).filter(
      ([, item]) => item.type === "door",
    );
    const outDoor = outDoorRaw as DoorItem;

    const newRoomId = outDoor.config.toRoom as EditorRoomId;
    const newRoom = state1.campaignInProgress.rooms[newRoomId];
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
    const state0 = stateWithFloor;
    const state1 = reduceLevelEditorActions(
      state0,
      insertRoom({ direction: "left" }),
    );

    const currentRoomItems = Object.values(
      state1.campaignInProgress.rooms[testRoomId].items,
    );
    const [door] = currentRoomItems.filter(
      (item): item is EditorJsonItem<"door"> => item.type === "door",
    );

    expect(door.position).toEqual({ x: 8, y: 3, z: 0 });
  });

  test("navigates to the newly created room after insertion", () => {
    const state0 = stateWithFloor;
    const state1 = reduceLevelEditorActions(
      state0,
      insertRoom({ direction: "away" }),
    );

    expect(selectCursorRoomIdFromLevelEditorState(state1)).not.toBe(testRoomId);
    expect(
      state1.campaignInProgress.rooms[
        selectCursorRoomIdFromLevelEditorState(state1)
      ],
    ).toBeDefined();
  });
});

describe("insertRoom with existing door in that direction", () => {
  const state0WithDoorToB: LevelEditorState = produce(
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
    const state1 = reduceLevelEditorActions(
      state0WithDoorToB,
      insertRoom({ direction: "left" }),
    );

    const currentDoor = state1.campaignInProgress.rooms[testRoomId].items[
      door1
    ] as DoorItem;
    expect(currentDoor.config.toRoom).not.toBe(roomB);

    const newRoomId = currentDoor.config.toRoom as EditorRoomId;
    expect(state1.campaignInProgress.rooms[newRoomId]).toBeDefined();
  });

  test("re-points the inbound door from roomB to the new room", () => {
    const state1 = reduceLevelEditorActions(
      state0WithDoorToB,
      insertRoom({ direction: "left" }),
    );

    const roomBDoor = state1.campaignInProgress.rooms[roomB].items[
      door2
    ] as DoorItem;
    expect(roomBDoor.config.toRoom).not.toBe(testRoomId);

    const newRoomId = roomBDoor.config.toRoom as EditorRoomId;
    expect(state1.campaignInProgress.rooms[newRoomId]).toBeDefined();
  });

  test("the new room has a return door to the current room and a forward door to roomB", () => {
    const state1 = reduceLevelEditorActions(
      state0WithDoorToB,
      insertRoom({ direction: "left" }),
    );

    const currentDoor = state1.campaignInProgress.rooms[testRoomId].items[
      door1
    ] as DoorItem;
    const newRoomId = currentDoor.config.toRoom as EditorRoomId;
    const newRoomItems = Object.values(
      state1.campaignInProgress.rooms[newRoomId].items,
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
    const state1 = reduceLevelEditorActions(
      state0WithDoorToB,
      insertRoom({ direction: "left" }),
    );

    const currentDoor = state1.campaignInProgress.rooms[testRoomId].items[
      door1
    ] as DoorItem;
    const newRoomId = currentDoor.config.toRoom as EditorRoomId;
    const newRoom = state1.campaignInProgress.rooms[newRoomId];
    const roomBDoor = state1.campaignInProgress.rooms[roomB].items[
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
  const state0WithFinalDoor: LevelEditorState = produce(
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
    const state1 = reduceLevelEditorActions(
      state0WithFinalDoor,
      insertRoom({ direction: "away" }),
    );

    const currentDoor = state1.campaignInProgress.rooms[testRoomId].items[
      door1
    ] as DoorItem;
    expect(currentDoor.config.toRoom).not.toBe(exitGameRoomId);
  });

  test("the new room gets a door pointing to $$final", () => {
    const state1 = reduceLevelEditorActions(
      state0WithFinalDoor,
      insertRoom({ direction: "away" }),
    );

    const currentDoor = state1.campaignInProgress.rooms[testRoomId].items[
      door1
    ] as DoorItem;
    const newRoomId = currentDoor.config.toRoom as EditorRoomId;
    const newRoomItems = Object.values(
      state1.campaignInProgress.rooms[newRoomId].items,
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
  const state0WithTwoDoors: LevelEditorState = produce(
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
    const state1 = reduceLevelEditorActions(
      state0WithTwoDoors,
      insertRoom({ direction: "towards" }),
    );

    const d1 = state1.campaignInProgress.rooms[testRoomId].items[
      door1
    ] as DoorItem;
    const newRoomId = d1.config.toRoom as EditorRoomId;
    const newRoomItems = Object.values(
      state1.campaignInProgress.rooms[newRoomId].items,
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

  const state0WithAdjacentUnconnectedRoom: LevelEditorState = produce(
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
      state0WithAdjacentUnconnectedRoom.campaignInProgress.rooms,
    ).length;

    const state1 = reduceLevelEditorActions(
      state0WithAdjacentUnconnectedRoom,
      insertRoom({ direction: "away" }),
    );

    const after = Object.keys(state1.campaignInProgress.rooms).length;
    expect(after).toBe(before);

    const currentRoomDoors = Object.values(
      state1.campaignInProgress.rooms[testRoomId].items,
    ).filter((item): item is EditorJsonItem<"door"> => item.type === "door");
    const doorToD = currentRoomDoors.find((d) => d.config.toRoom === roomD);
    expect(doorToD).toBeDefined();
    expect(doorToD!.config.direction).toBe("away");
  });

  test("navigates to the existing room after connecting", () => {
    const state1 = reduceLevelEditorActions(
      state0WithAdjacentUnconnectedRoom,
      insertRoom({ direction: "away" }),
    );

    expect(selectCursorRoomIdFromLevelEditorState(state1)).toBe(roomD);
  });
});

describe("insertRoom from a subroom of a multi-chunk room", () => {
  const state0WithTwoChunkRoom: LevelEditorState = produce(
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
      existingLayoutNode(draft.layout, testOpenRoomId).subRoomId = "0";
    },
  );

  test("door is centred on the subroom, not the whole room", () => {
    const state1 = reduceLevelEditorActions(
      state0WithTwoChunkRoom,
      insertRoom({ direction: "away" }),
    );

    const doors = Object.values(
      state1.campaignInProgress.rooms[testRoomId].items,
    ).filter((item): item is EditorJsonItem<"door"> => item.type === "door");

    expect(doors).toHaveLength(1);
    expect(doors[0].position.x).toBe(3);
    expect(doors[0].position.y).toBe(8);
  });

  test("inserting from subroom 1 centres the door on subroom 1", () => {
    const state0OnSubRoom1 = produce(state0WithTwoChunkRoom, (draft) => {
      draft.selectedRoomIds = [testRoomId];
      existingLayoutNode(draft.layout, testOpenRoomId).subRoomId = "1";
    });

    const state1 = reduceLevelEditorActions(
      state0OnSubRoom1,
      insertRoom({ direction: "away" }),
    );

    const doors = Object.values(
      state1.campaignInProgress.rooms[testRoomId].items,
    ).filter((item): item is EditorJsonItem<"door"> => item.type === "door");

    expect(doors).toHaveLength(1);
    expect(doors[0].position.x).toBe(11);
    expect(doors[0].position.y).toBe(8);
  });
});

describe("insertRoom from a subroom where floor extends beyond subroom bounds", () => {
  const state0WithIrregularChunks: LevelEditorState = produce(
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
      existingLayoutNode(draft.layout, testOpenRoomId).subRoomId = "left";
    },
  );

  test("door is placed at the room wall edge, not at subroom boundary", () => {
    const state1 = reduceLevelEditorActions(
      state0WithIrregularChunks,
      insertRoom({ direction: "away" }),
    );

    const doors = Object.values(
      state1.campaignInProgress.rooms[testRoomId].items,
    ).filter((item): item is EditorJsonItem<"door"> => item.type === "door");

    expect(doors).toHaveLength(1);
    expect(doors[0].position.y).toBe(12);
  });

  test("door is centred within the subroom x range", () => {
    const state1 = reduceLevelEditorActions(
      state0WithIrregularChunks,
      insertRoom({ direction: "away" }),
    );

    const doors = Object.values(
      state1.campaignInProgress.rooms[testRoomId].items,
    ).filter((item): item is EditorJsonItem<"door"> => item.type === "door");

    expect(doors).toHaveLength(1);
    expect(doors[0].position.x).toBe(12);
  });

  test("the new room has a return door", () => {
    const state1 = reduceLevelEditorActions(
      state0WithIrregularChunks,
      insertRoom({ direction: "away" }),
    );

    const doors = Object.values(
      state1.campaignInProgress.rooms[testRoomId].items,
    ).filter((item): item is EditorJsonItem<"door"> => item.type === "door");

    const newRoomId = doors[0].config.toRoom as EditorRoomId;
    const newRoom = state1.campaignInProgress.rooms[newRoomId];
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
  const state0WithFourChunks: LevelEditorState = produce(
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
      existingLayoutNode(draft.layout, testOpenRoomId).subRoomId = "3";
    },
  );

  test("door is placed at the subroom boundary, not the room outer wall", () => {
    const state1 = reduceLevelEditorActions(
      state0WithFourChunks,
      insertRoom({ direction: "right" }),
    );

    const doors = Object.values(
      state1.campaignInProgress.rooms[testRoomId].items,
    ).filter((item): item is EditorJsonItem<"door"> => item.type === "door");

    expect(doors).toHaveLength(1);
    expect(doors[0].position.x).toBe(10);
  });

  test("door from subroom 'left' going left is at subroom boundary, not room outer wall", () => {
    const state0OnLeft = produce(state0WithFourChunks, (draft) => {
      draft.selectedRoomIds = [testRoomId];
      existingLayoutNode(draft.layout, testOpenRoomId).subRoomId = "left";
    });

    const state1 = reduceLevelEditorActions(
      state0OnLeft,
      insertRoom({ direction: "left" }),
    );

    const doors = Object.values(
      state1.campaignInProgress.rooms[testRoomId].items,
    ).filter((item): item is EditorJsonItem<"door"> => item.type === "door");

    expect(doors).toHaveLength(1);
    expect(doors[0].position.x).toBe(17);
  });

  test("door from subroom 'right' going towards is at subroom boundary, not room outer wall", () => {
    const state0OnRight = produce(state0WithFourChunks, (draft) => {
      draft.selectedRoomIds = [testRoomId];
      existingLayoutNode(draft.layout, testOpenRoomId).subRoomId = "right";
    });

    const state1 = reduceLevelEditorActions(
      state0OnRight,
      insertRoom({ direction: "towards" }),
    );

    const doors = Object.values(
      state1.campaignInProgress.rooms[testRoomId].items,
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
    const state0 = buildState();
    const { roomId, subRoomId } = selectCursorRoomFromLevelEditorState(state0);

    const positions = roomGridPositions({
      campaign: state0.campaignInProgress,
      roomId,
      subRoomId,
    }).nodes;

    expect(positions.length).toBeGreaterThan(0);
  });

  test("return door in the multi-chunk room is within the target subroom bounds", () => {
    const state0 = buildState();
    const multiChunkRoom = state0.campaignInProgress.rooms[multiChunkRoomId];

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
        roomId: multiChunkRoomId,
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
    const state0 = buildState();

    const newRoomId = Object.keys(state0.campaignInProgress.rooms).find(
      (id) => id !== testRoomId && id !== multiChunkRoomId,
    ) as EditorRoomId;
    const newRoom = state0.campaignInProgress.rooms[newRoomId];

    const returnDoors = Object.values(newRoom.items).filter(
      (item): item is EditorJsonItem<"door"> => item.type === "door",
    );

    expect(returnDoors).toHaveLength(1);
    const [returnDoor] = returnDoors;

    expect(returnDoor.position.x).toBeGreaterThanOrEqual(0);
    expect(returnDoor.position.x).toBeLessThan(8);
  });
});

describe("insertRoom between a room and a non-origin subroom of a multi-chunk room", () => {
  const state0WithDoorToSubRoom1: LevelEditorState = produce(
    stateWithFloorAndRoomB,
    (draft) => {
      const roomBJson = draft.campaignInProgress.rooms[roomB];
      roomBJson.items["floor0" as EditorRoomItemId] = {
        type: "floor",
        config: {
          floorType: "standable",
          scenery: "blacktooth",
          times: { x: 16, y: 8 },
        },
        position: { x: 0, y: 0, z: 0 },
      };
      roomBJson.items[door2] = {
        type: "door",
        config: { toRoom: testRoomId, direction: "towards" },
        position: { x: 11, y: 0, z: 0 },
      };
      roomBJson.meta = {
        subRooms: {
          "0": {
            gridPosition: { x: 0, y: 0 },
            physicalPosition: { from: { x: 0, y: 0 }, to: { x: 8, y: 8 } },
          },
          "1": {
            gridPosition: { x: 1, y: 0 },
            physicalPosition: { from: { x: 8, y: 0 }, to: { x: 16, y: 8 } },
          },
        },
      };
      draft.campaignInProgress.rooms[testRoomId].items[door1] = {
        type: "door",
        config: { toRoom: roomB, direction: "away", meta: { toSubRoom: "1" } },
        position: { x: 3, y: 8, z: 0 },
      };
    },
  );

  test("the new room's door to the subroom is at the same offset along the wall as the subroom's door", () => {
    const state1 = reduceLevelEditorActions(
      state0WithDoorToSubRoom1,
      insertRoom({ direction: "away" }),
    );

    const newRoomId = (
      state1.campaignInProgress.rooms[testRoomId].items[door1] as DoorItem
    ).config.toRoom as EditorRoomId;
    const doorToRoomB = Object.values(
      state1.campaignInProgress.rooms[newRoomId].items,
    ).find(
      (item): item is DoorItem =>
        item.type === "door" && item.config.toRoom === roomB,
    );

    expect(doorToRoomB?.position).toEqual({ x: 3, y: 8, z: 0 });
  });
});

describe("removeRoom cleans up doors and heals walls", () => {
  const roomWithWallsId = "room_0" as EditorRoomId;

  const state0WithWalledRoom = reduceLevelEditorActions(
    editorStateWithOneRoomWithNoItems,
    addRoom({ roomSize: { x: 8, y: 8 } }),
  );

  test("inserting then removing a room restores the original room to its prior state", () => {
    const originalRoom =
      state0WithWalledRoom.campaignInProgress.rooms[roomWithWallsId];

    const state1AfterRemove = reduceLevelEditorActions(
      state0WithWalledRoom,
      insertRoom({ direction: "left" }),
      removeRoom(),
    );

    const restoredRoom =
      state1AfterRemove.campaignInProgress.rooms[roomWithWallsId];

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

test("inserting beside one room of a square of four is refused, but with the room beside it selected too makes a rectangle of six", () => {
  const state0 = stateWithFloor;
  // each insert moves the cursor to the room it adds (or links), which names it:
  const nearLeftRoomId = selectCursorRoomIdFromLevelEditorState(state0);
  const state1WithNearRight = reduceLevelEditorActions(
    state0,
    insertRoom({ direction: "right" }),
  );
  const nearRightRoomId =
    selectCursorRoomIdFromLevelEditorState(state1WithNearRight);
  const state2WithFarRight = reduceLevelEditorActions(
    state1WithNearRight,
    insertRoom({ direction: "away" }),
  );
  const farRightRoomId =
    selectCursorRoomIdFromLevelEditorState(state2WithFarRight);
  const state3WithFarLeft = reduceLevelEditorActions(
    state2WithFarRight,
    changeToRoom({ roomId: nearLeftRoomId }),
    insertRoom({ direction: "away" }),
  );
  const farLeftRoomId =
    selectCursorRoomIdFromLevelEditorState(state3WithFarLeft);
  // a door between the two far rooms closes the square into a loop:
  const state4Square = reduceLevelEditorActions(
    state3WithFarLeft,
    insertRoom({ direction: "right" }),
  );
  const startingRoomIds = roomGridPositions({
    campaign: state4Square.campaignInProgress,
    roomId: nearLeftRoomId,
    skipMissingRooms: true,
  }).nodes.map(({ roomId }) => roomId);

  // alone, the near-left room can't be split from the right column, which the
  // far rooms tie back round to it:
  const state5AfterInsertBesideOneRoom = reduceLevelEditorActions(
    state4Square,
    changeToRoom({ roomId: nearLeftRoomId }),
    insertRoom({ direction: "right" }),
  );
  expect(state5AfterInsertBesideOneRoom.campaignInProgress).toBe(
    state4Square.campaignInProgress,
  );

  const state6InsertedBesideLeftColumn = reduceLevelEditorActions(
    state5AfterInsertBesideOneRoom,
    addRoomToSelection({ roomId: farLeftRoomId, subRoomId: "*" }),
    insertRoom({ direction: "right" }),
  );

  expect(
    roomGridPositions({
      campaign: state6InsertedBesideLeftColumn.campaignInProgress,
      roomId: nearLeftRoomId,
      skipMissingRooms: true,
    })
      .nodes.map(({ roomId, gridPosition: { x, y } }) => ({
        roomId: startingRoomIds.includes(roomId) ? roomId : "inserted",
        x,
        y,
      }))
      .sort((a, b) => a.y - b.y || b.x - a.x),
  ).toEqual([
    // the left column stays put, the right column moves one further right,
    // and a new room sits between them in each row:
    { roomId: nearLeftRoomId, x: 0, y: 0 },
    { roomId: "inserted", x: -1, y: 0 },
    { roomId: nearRightRoomId, x: -2, y: 0 },
    { roomId: farLeftRoomId, x: 0, y: 1 },
    { roomId: "inserted", x: -1, y: 1 },
    { roomId: farRightRoomId, x: -2, y: 1 },
  ]);
});

test("inserting with two rooms of a square of four selected along the direction leaves the square unchanged, since the loop can't be split", () => {
  const state0 = stateWithFloor;
  // each insert moves the cursor to the room it adds (or links), which names it:
  const nearLeftRoomId = selectCursorRoomIdFromLevelEditorState(state0);
  const state1WithNearRight = reduceLevelEditorActions(
    state0,
    insertRoom({ direction: "right" }),
  );
  const nearRightRoomId =
    selectCursorRoomIdFromLevelEditorState(state1WithNearRight);
  const state2WithFarLeft = reduceLevelEditorActions(
    state1WithNearRight,
    insertRoom({ direction: "away" }),
    changeToRoom({ roomId: nearLeftRoomId }),
    insertRoom({ direction: "away" }),
  );
  // a door between the two far rooms closes the square into a loop:
  const state3Square = reduceLevelEditorActions(
    state2WithFarLeft,
    insertRoom({ direction: "right" }),
  );

  const state4AfterInsert = reduceLevelEditorActions(
    state3Square,
    changeToRoom({ roomId: nearLeftRoomId }),
    addRoomToSelection({ roomId: nearRightRoomId, subRoomId: "*" }),
    insertRoom({ direction: "right" }),
  );

  expect(state4AfterInsert.campaignInProgress).toBe(
    state3Square.campaignInProgress,
  );
});
