import { produce } from "immer";
import { describe, expect, test } from "vitest";

import {
  iterateRoomJsonItemsWithIds,
  roomJsonItemsIterable,
} from "../../../model/RoomJson";
import {
  type EditorJsonItem,
  type EditorJsonItemUnion,
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
} from "../../editorTypes";
import { selectCurrentRoomFromLevelEditorState } from "../levelEditorSelectors";
import {
  applyItemTool,
  deleteSelected,
  type LevelEditorState,
  roomJsonEdited,
  setRoomAboveOrBelow,
  setSelectedItemsInRoom,
  setTool,
} from "../levelEditorSlice";
import {
  doorItemToolWithAutoAddRooms,
  editorStateWithOneRoomWithNoItems,
  editorStateWithOneRoomWithOneAwayWall,
  reduceLevelEditorActions,
  testRoomId,
  wallItemId,
} from "./__test__/storeStates";

test('deleting a door "heals" the void where the door once stood by extending and joining existing walls', () => {
  const state0 = editorStateWithOneRoomWithOneAwayWall;

  const state1 = reduceLevelEditorActions(
    state0,
    setTool(doorItemToolWithAutoAddRooms),
    // cut hole in the middle of a door:
    applyItemTool({
      blockPosition: { x: 2, y: 5, z: 0 },
      pointedAtItemJson: editorStateWithOneRoomWithOneAwayWall
        .campaignInProgress.rooms[testRoomId].items[
        wallItemId
      ] as EditorJsonItemUnion,
      preview: false,
    }),
    // then, delete the door:
    (state) => {
      const doorEntry = iterateRoomJsonItemsWithIds(
        selectCurrentRoomFromLevelEditorState(state).items,
      ).find(([_id, i]) => i.type === "door");

      if (doorEntry === undefined) {
        expect.fail("no door in room");
      }

      return setSelectedItemsInRoom({
        jsonItemIds: [doorEntry[0]],
      });
    },
    deleteSelected(),
  );

  const state0RoomItems = Object.values(
    state0.campaignInProgress.rooms[testRoomId].items,
  );
  const state1RoomItems = Object.values(
    state1.campaignInProgress.rooms[testRoomId].items,
  );

  // the room that had the door added and removed again should be identical to when it started:
  // NOTE: there is still an extra room that was created with the door and didn't get deleted!
  expect(state0RoomItems).toEqual(
    // can appear in any order, so long as contents are the same. Also, item ids
    // don't matter, so long as the items are the same
    expect.arrayContaining(state1RoomItems),
  );
});

describe("changing the id of the current room updates all references to that room in other rooms", () => {
  const otherRoomId = "otherRoom" as EditorRoomId;
  const newRoomId = "renamedRoom" as EditorRoomId;

  const stateWithTwoRooms: LevelEditorState = produce(
    editorStateWithOneRoomWithNoItems,
    (draft) => {
      draft.campaignInProgress.rooms[otherRoomId] = {
        id: otherRoomId,
        planet: "blacktooth",
        color: { hue: "cyan", shade: "basic" },
        items: {},
      };
    },
  );

  test("doors that reference the old room id in their config", () => {
    // add a door to our editor state linking back to the test room:
    const state1 = produce(stateWithTwoRooms, (draft) => {
      draft.campaignInProgress.rooms[otherRoomId].items[
        "door1" as EditorRoomItemId
      ] = {
        type: "door",
        position: { x: 0, y: 0, z: 0 },
        config: {
          direction: "towards",
          toRoom: testRoomId,
        },
      };
    });

    const currentRoom = state1.campaignInProgress.rooms[
      testRoomId
    ] as EditorRoomJson;

    const state2 = reduceLevelEditorActions(
      state1,
      roomJsonEdited({ ...currentRoom, id: newRoomId }),
    );

    const otherRoom = state2.campaignInProgress.rooms[otherRoomId];
    const [doorItem] = iterateRoomJsonItemsWithIds(otherRoom.items, "door");

    expect(doorItem && doorItem[1].config.toRoom).toBe(newRoomId);
  });
  test("teleporters that reference the old room id in their config", () => {
    const state1 = produce(stateWithTwoRooms, (draft) => {
      draft.campaignInProgress.rooms[otherRoomId].items[
        "teleporter1" as EditorRoomItemId
      ] = {
        type: "teleporter",
        position: { x: 0, y: 0, z: 0 },
        config: {
          toRoom: testRoomId,
        },
      };
    });

    const currentRoom = state1.campaignInProgress.rooms[
      testRoomId
    ] as EditorRoomJson;

    const state2 = reduceLevelEditorActions(
      state1,
      roomJsonEdited({ ...currentRoom, id: newRoomId }),
    );

    const otherRoom = state2.campaignInProgress.rooms[otherRoomId];
    const [teleporterItem] = iterateRoomJsonItemsWithIds(
      otherRoom.items,
      "teleporter",
    );

    expect(teleporterItem && teleporterItem[1].config.toRoom).toBe(newRoomId);
  });

  test("portableTeleporters that reference the old room id in their config", () => {
    const state1 = produce(stateWithTwoRooms, (draft) => {
      draft.campaignInProgress.rooms[otherRoomId].items[
        "portableTeleporter1" as EditorRoomItemId
      ] = {
        type: "portableTeleporter",
        position: { x: 0, y: 0, z: 0 },
        config: {
          toRoom: testRoomId,
        },
      };
    });

    const currentRoom = state1.campaignInProgress.rooms[
      testRoomId
    ] as EditorRoomJson;

    const state2 = reduceLevelEditorActions(
      state1,
      roomJsonEdited({ ...currentRoom, id: newRoomId }),
    );

    const otherRoom = state2.campaignInProgress.rooms[otherRoomId];
    const [portableTeleporterItem] = iterateRoomJsonItemsWithIds(
      otherRoom.items,
      "portableTeleporter",
    );

    expect(
      portableTeleporterItem && portableTeleporterItem[1].config.toRoom,
    ).toBe(newRoomId);
  });

  test("above/below room references that reference the old room id", () => {
    const state1 = produce(stateWithTwoRooms, (draft) => {
      draft.campaignInProgress.rooms[otherRoomId].roomAbove = testRoomId;
      draft.campaignInProgress.rooms[otherRoomId].roomBelow = testRoomId;
    });

    const currentRoom = state1.campaignInProgress.rooms[
      testRoomId
    ] as EditorRoomJson;

    const state2 = reduceLevelEditorActions(
      state1,
      roomJsonEdited({ ...currentRoom, id: newRoomId }),
    );

    const otherRoom = state2.campaignInProgress.rooms[otherRoomId];

    expect(otherRoom.roomAbove).toBe(newRoomId);
    expect(otherRoom.roomBelow).toBe(newRoomId);
  });

  test("non-contiguous relationships that reference the old room id", () => {
    const state1 = produce(stateWithTwoRooms, (draft) => {
      draft.campaignInProgress.rooms[otherRoomId].meta = {
        nonContiguousRelationship: {
          with: { room: testRoomId },
          gridOffset: { x: 1, y: 0, z: 0 },
        },
      };
    });

    const currentRoom = state1.campaignInProgress.rooms[
      testRoomId
    ] as EditorRoomJson;

    const state2 = reduceLevelEditorActions(
      state1,
      roomJsonEdited({ ...currentRoom, id: newRoomId }),
    );

    const otherRoom = state2.campaignInProgress.rooms[otherRoomId];

    expect(otherRoom.meta?.nonContiguousRelationship?.with.room).toBe(
      newRoomId,
    );
  });
});

describe('editing a door\'s "toRoom" config provides convenience methods to maintain symmetry', () => {
  const otherRoomId = "otherRoom" as EditorRoomId;

  const stateWithTwoRooms: LevelEditorState = produce(
    editorStateWithOneRoomWithNoItems,
    (draft) => {
      // add a door in the test room pointing to nowhere:
      draft.campaignInProgress.rooms[testRoomId].items[
        "door1" as EditorRoomItemId
      ] = {
        type: "door",
        position: { x: 0, y: 0, z: 0 },
        config: {
          direction: "towards",
          toRoom: "nowhere" as EditorRoomId,
        },
      };
      // add a second empty room:
      draft.campaignInProgress.rooms[otherRoomId] = {
        id: otherRoomId,
        planet: "blacktooth",
        color: { hue: "cyan", shade: "basic" },
        items: {},
      };
    },
  );

  test("changing toRoom to an existing room creates a return door in that room", () => {
    const editedRoom = structuredClone(
      produce(
        stateWithTwoRooms.campaignInProgress.rooms[
          testRoomId
        ] as EditorRoomJson,
        (draft) => {
          (
            draft.items["door1" as EditorRoomItemId] as {
              config: { toRoom: EditorRoomId };
            }
          ).config.toRoom = otherRoomId;
        },
      ),
    );

    const result = reduceLevelEditorActions(
      stateWithTwoRooms,
      roomJsonEdited(editedRoom),
    );

    const otherRoom = result.campaignInProgress.rooms[otherRoomId];
    const returnDoors = roomJsonItemsIterable(otherRoom)
      .filter(
        (item): item is EditorJsonItem<"door"> =>
          item.type === "door" && item.config.toRoom === testRoomId,
      )
      .toArray();

    expect(returnDoors).toHaveLength(1);
    const [returnDoor] = returnDoors;
    expect(returnDoor.config.direction).toBe("away");
  });

  test("changing toRoom repurposes an existing opposite-direction door in the target room", () => {
    const existingReturnDoorId = "existingReturnDoor" as EditorRoomItemId;

    const stateWithExistingDoor: LevelEditorState = produce(
      stateWithTwoRooms,
      (draft) => {
        draft.campaignInProgress.rooms[otherRoomId].items[
          existingReturnDoorId
        ] = {
          type: "door",
          position: { x: 3, y: 0, z: 0 },
          config: {
            direction: "away",
            toRoom: "nowhere" as EditorRoomId,
          },
        };
      },
    );

    const editedRoom = structuredClone(
      produce(
        stateWithExistingDoor.campaignInProgress.rooms[
          testRoomId
        ] as EditorRoomJson,
        (draft) => {
          (
            draft.items["door1" as EditorRoomItemId] as {
              config: { toRoom: EditorRoomId };
            }
          ).config.toRoom = otherRoomId;
        },
      ),
    );

    const result = reduceLevelEditorActions(
      stateWithExistingDoor,
      roomJsonEdited(editedRoom),
    );

    const otherRoom = result.campaignInProgress.rooms[otherRoomId];
    const returnDoor = otherRoom.items[
      existingReturnDoorId
    ] as EditorJsonItem<"door">;

    expect(returnDoor.config.toRoom).toBe(testRoomId);
    expect(returnDoor.position).toEqual({ x: 3, y: 0, z: 0 });
  });

  test("does not repurpose a door that is not in the opposite direction", () => {
    const sameDirDoorId = "sameDirDoor" as EditorRoomItemId;

    const stateWithSameDirDoor: LevelEditorState = produce(
      stateWithTwoRooms,
      (draft) => {
        draft.campaignInProgress.rooms[otherRoomId].items[sameDirDoorId] = {
          type: "door",
          position: { x: 3, y: 0, z: 0 },
          config: {
            direction: "towards",
            toRoom: "nowhere" as EditorRoomId,
          },
        };
      },
    );

    const editedRoom = structuredClone(
      produce(
        stateWithSameDirDoor.campaignInProgress.rooms[
          testRoomId
        ] as EditorRoomJson,
        (draft) => {
          (
            draft.items["door1" as EditorRoomItemId] as {
              config: { toRoom: EditorRoomId };
            }
          ).config.toRoom = otherRoomId;
        },
      ),
    );

    const result = reduceLevelEditorActions(
      stateWithSameDirDoor,
      roomJsonEdited(editedRoom),
    );

    const otherRoom = result.campaignInProgress.rooms[otherRoomId];
    const sameDirDoor = otherRoom.items[
      sameDirDoorId
    ] as EditorJsonItem<"door">;

    expect(sameDirDoor.config.toRoom).toBe("nowhere");
  });

  test("does not overwrite a return door that already correctly points back", () => {
    // Before (incorrect geometry — A left wrongly points to C):
    //
    //      ┌───────┐       ┌───────┐       ┌───────┐
    //      │       │ right │       │ right │       │
    //      │   C   ├───────┤   B   ├───────┤   A   │
    //      │       │       │       │       │       │
    //      └───┬───┘       └───────┘       └───┬───┘
    //          │                 left           │
    //          └────────────────────────────────┘
    //               A left → C (wrong!)
    //
    // After (user corrects A left → B):
    //
    //      ┌───────┐       ┌───────┐       ┌───────┐
    //      │       │ right │       │ right │       │
    //      │   C   ├───────┤   B   ├───────┤   A   │
    //      │       │  left │       │  left │       │
    //      └───────┘       └───────┘       └───────┘
    //
    //      A left → B  ✓ (user's edit)
    //      B right → A ✓ (already correct, should NOT be touched)
    //      B left → C  ✓ (should NOT be touched)
    //      C right → B ✓ (should NOT be touched)

    const roomA = "roomA" as EditorRoomId;
    const roomB = "roomB" as EditorRoomId;
    const roomC = "roomC" as EditorRoomId;

    const aLeftDoorId = "aLeftDoor" as EditorRoomItemId;
    const bRightDoorId = "bRightDoor" as EditorRoomItemId;
    const bLeftDoorId = "bLeftDoor" as EditorRoomItemId;
    const cRightDoorId = "cRightDoor" as EditorRoomItemId;

    const state: LevelEditorState = {
      ...editorStateWithOneRoomWithNoItems,
      currentlyEditing: { roomId: roomA, subRoomId: "*" },
      campaignInProgress: {
        ...editorStateWithOneRoomWithNoItems.campaignInProgress,
        rooms: {
          [roomA]: {
            id: roomA,
            planet: "blacktooth",
            color: { hue: "cyan", shade: "basic" },
            items: {
              [aLeftDoorId]: {
                type: "door",
                position: { x: 0, y: 0, z: 0 },
                config: { direction: "left", toRoom: roomC },
              },
            },
          },
          [roomB]: {
            id: roomB,
            planet: "blacktooth",
            color: { hue: "cyan", shade: "basic" },
            items: {
              [bRightDoorId]: {
                type: "door",
                position: { x: 5, y: 0, z: 0 },
                config: {
                  direction: "right",
                  toRoom: roomA,
                  toDoor: aLeftDoorId,
                },
              },
              [bLeftDoorId]: {
                type: "door",
                position: { x: 0, y: 0, z: 0 },
                config: { direction: "left", toRoom: roomC },
              },
            },
          },
          [roomC]: {
            id: roomC,
            planet: "blacktooth",
            color: { hue: "cyan", shade: "basic" },
            items: {
              [cRightDoorId]: {
                type: "door",
                position: { x: 5, y: 0, z: 0 },
                config: { direction: "right", toRoom: roomB },
              },
            },
          },
        },
      },
    };

    const editedRoomA = structuredClone(
      produce(
        state.campaignInProgress.rooms[roomA] as EditorRoomJson,
        (draft) => {
          (
            draft.items[aLeftDoorId] as {
              config: { toRoom: EditorRoomId };
            }
          ).config.toRoom = roomB;
        },
      ),
    );

    const result = reduceLevelEditorActions(state, roomJsonEdited(editedRoomA));

    const resultA = result.campaignInProgress.rooms[roomA];
    const aLeftDoor = resultA.items[aLeftDoorId] as EditorJsonItem<"door">;

    const resultB = result.campaignInProgress.rooms[roomB];
    const bRightDoor = resultB.items[bRightDoorId] as EditorJsonItem<"door">;
    const bLeftDoor = resultB.items[bLeftDoorId] as EditorJsonItem<"door">;

    const resultC = result.campaignInProgress.rooms[roomC];
    const cRightDoor = resultC.items[cRightDoorId] as EditorJsonItem<"door">;

    // A's left door should now point to B (the user's edit):
    expect(aLeftDoor.config.toRoom).toBe(roomB);
    expect(aLeftDoor.config.direction).toBe("left");

    // B's right door should not have been modified — it already pointed to A:
    expect(bRightDoor.config.toRoom).toBe(roomA);
    expect(bRightDoor.config.toDoor).toBe(aLeftDoorId);
    expect(bRightDoor.config.direction).toBe("right");

    // B's left door should not have been modified:
    expect(bLeftDoor.config.toRoom).toBe(roomC);
    expect(bLeftDoor.config.direction).toBe("left");

    // C's right door should not have been modified:
    expect(cRightDoor.config.toRoom).toBe(roomB);
    expect(cRightDoor.config.direction).toBe("right");
  });
});

describe("setRoomAboveOrBelow", () => {
  test("createNew with no existing room above creates and links bidirectionally", () => {
    const result = reduceLevelEditorActions(
      editorStateWithOneRoomWithNoItems,
      setRoomAboveOrBelow({ direction: "above", createNew: true }),
    );

    const originalRoom = result.campaignInProgress.rooms[testRoomId];
    const newRoomId = originalRoom.roomAbove!;
    const newRoom = result.campaignInProgress.rooms[newRoomId];

    expect(newRoom).toBeDefined();
    expect(newRoom.roomBelow).toBe(testRoomId);
  });

  test("createNew navigates to the newly created room", () => {
    const result = reduceLevelEditorActions(
      editorStateWithOneRoomWithNoItems,
      setRoomAboveOrBelow({ direction: "above", createNew: true }),
    );

    expect(result.currentlyEditing.roomId).not.toBe(testRoomId);
    const originalRoom = result.campaignInProgress.rooms[testRoomId];
    expect(result.currentlyEditing.roomId).toBe(originalRoom.roomAbove);
  });

  test("createNew splices between existing rooms", () => {
    const roomB = "roomB" as EditorRoomId;
    const stateWithRoomAbove: LevelEditorState = produce(
      editorStateWithOneRoomWithNoItems,
      (draft) => {
        draft.campaignInProgress.rooms[roomB] = {
          id: roomB,
          planet: "blacktooth",
          color: { hue: "cyan", shade: "basic" },
          items: {},
          roomBelow: testRoomId,
        };
        draft.campaignInProgress.rooms[testRoomId].roomAbove = roomB;
      },
    );

    const result = reduceLevelEditorActions(
      stateWithRoomAbove,
      setRoomAboveOrBelow({ direction: "above", createNew: true }),
    );

    const originalRoom = result.campaignInProgress.rooms[testRoomId];
    const newRoomId = originalRoom.roomAbove!;
    const newRoom = result.campaignInProgress.rooms[newRoomId];
    const roomBResult = result.campaignInProgress.rooms[roomB];

    expect(newRoom.roomBelow).toBe(testRoomId);
    expect(newRoom.roomAbove).toBe(roomB);
    expect(roomBResult.roomBelow).toBe(newRoomId);
  });

  test("createNew gives the new sandwiched room a 'none' floor", () => {
    const result = reduceLevelEditorActions(
      editorStateWithOneRoomWithNoItems,
      setRoomAboveOrBelow({ direction: "below", createNew: true }),
    );

    const originalRoom = result.campaignInProgress.rooms[testRoomId];
    const floors = [...roomJsonItemsIterable(originalRoom)].filter(
      (item) => item.type === "floor",
    );

    expect(floors.every((f) => f.config.floorType === "none")).toBe(true);
  });
});
