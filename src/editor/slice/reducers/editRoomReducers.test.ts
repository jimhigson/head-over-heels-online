import { produce } from "immer";
import { describe, expect, test } from "vitest";

import { createNewRoom } from "../../../model/inPlaceMutators/createNewRoom";
import { nowhereRoomId } from "../../../model/json/ItemConfigMap";
import { type VerificationCampaign } from "../../../model/json/verification/verificationTypes";
import { verifyCampaign } from "../../../model/json/verification/verifyCampaign";
import {
  roomNonContiguousRelationship,
  roomVerticalLink,
  subRoomById,
  type SubRooms,
} from "../../../model/RoomJson";
import {
  iterateRoomJsonItemsWithIds,
  roomJsonItemsIterable,
} from "../../../model/RoomJsonItemIterators";
import { keys } from "../../../utils/entries";
import {
  type EditorJsonItem,
  type EditorJsonItemUnion,
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
} from "../../editorTypes";

/** the room id linked above/below a room's primary sub-room */
const roomAboveOf = <RoomId extends string>(room: {
  meta?: { subRooms?: SubRooms<RoomId> };
}): RoomId | undefined => roomVerticalLink(room, "above")?.room;
const roomBelowOf = <RoomId extends string>(room: {
  meta?: { subRooms?: SubRooms<RoomId> };
}): RoomId | undefined => roomVerticalLink(room, "below")?.room;
import { selectCursorRoomIdFromLevelEditorState } from "../levelEditorSelectors";
import {
  applyItemTool,
  deleteSelected,
  type LevelEditorState,
  makeHoleInSelectedFloor,
  roomJsonEdited,
  selectCurrentCommittedRoomJson,
  setRoomAboveOrBelow,
  setSelectedItemsInRoom,
  setTool,
} from "../levelEditorSlice";
import { existingLayoutNode } from "../PaneLayout";
import {
  doorItemToolWithAutoAddRooms,
  editorStateWithOneRoomWithNoItems,
  editorStateWithOneRoomWithOneAwayWall,
  reduceLevelEditorActions,
  testOpenRoomId,
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
      roomId: testRoomId,
      blockPosition: { x: 2, y: 5, z: 0 },
      pointedAtItemJson: editorStateWithOneRoomWithOneAwayWall
        .campaignInProgress.rooms[testRoomId].items[
        wallItemId
      ] as EditorJsonItemUnion,
      preview: false,
      timestamp: 0,
    }),
    // then, delete the door:
    (dispatch, getState) => {
      const doorEntry = iterateRoomJsonItemsWithIds(
        selectCurrentCommittedRoomJson(getState()).items,
      ).find(([_id, i]) => i.type === "door");

      if (doorEntry === undefined) {
        expect.fail("no door in room");
      }

      dispatch(
        setSelectedItemsInRoom({
          jsonItemIds: [doorEntry[0]],
        }),
      );
    },
    deleteSelected({ timestamp: 0 }),
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

  const state0WithTwoRooms: LevelEditorState = produce(
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

  test("the renamed room's own json id", () => {
    const currentRoom = state0WithTwoRooms.campaignInProgress.rooms[
      testRoomId
    ] as EditorRoomJson;

    const state1 = reduceLevelEditorActions(
      state0WithTwoRooms,
      roomJsonEdited({
        roomJson: { ...currentRoom, id: newRoomId },
        timestamp: 0,
      }),
    );

    expect(state1.campaignInProgress.rooms[newRoomId].id).toBe(newRoomId);
  });

  test("doors that reference the old room id in their config", () => {
    // add a door to our editor state linking back to the test room:
    const state1 = produce(state0WithTwoRooms, (draft) => {
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
      roomJsonEdited({
        roomJson: { ...currentRoom, id: newRoomId },
        timestamp: 0,
      }),
    );

    const otherRoom = state2.campaignInProgress.rooms[otherRoomId];
    const [doorItem] = iterateRoomJsonItemsWithIds(otherRoom.items, "door");

    expect(doorItem && doorItem[1].config.toRoom).toBe(newRoomId);
  });
  test("teleporters that reference the old room id in their config", () => {
    const state1 = produce(state0WithTwoRooms, (draft) => {
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
      roomJsonEdited({
        roomJson: { ...currentRoom, id: newRoomId },
        timestamp: 0,
      }),
    );

    const otherRoom = state2.campaignInProgress.rooms[otherRoomId];
    const [teleporterItem] = iterateRoomJsonItemsWithIds(
      otherRoom.items,
      "teleporter",
    );

    expect(teleporterItem && teleporterItem[1].config.toRoom).toBe(newRoomId);
  });

  test("portableTeleporters that reference the old room id in their config", () => {
    const state1 = produce(state0WithTwoRooms, (draft) => {
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
      roomJsonEdited({
        roomJson: { ...currentRoom, id: newRoomId },
        timestamp: 0,
      }),
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
    const state1 = produce(state0WithTwoRooms, (draft) => {
      draft.campaignInProgress.rooms[otherRoomId].meta = {
        subRooms: {
          "*": { above: { room: testRoomId }, below: { room: testRoomId } },
        },
      };
    });

    const currentRoom = state1.campaignInProgress.rooms[
      testRoomId
    ] as EditorRoomJson;

    const state2 = reduceLevelEditorActions(
      state1,
      roomJsonEdited({
        roomJson: { ...currentRoom, id: newRoomId },
        timestamp: 0,
      }),
    );

    const otherRoom = state2.campaignInProgress.rooms[otherRoomId];

    expect.soft(roomAboveOf(otherRoom)).toBe(newRoomId);
    expect.soft(roomBelowOf(otherRoom)).toBe(newRoomId);
  });

  test("non-contiguous relationships that reference the old room id", () => {
    const state1 = produce(state0WithTwoRooms, (draft) => {
      draft.campaignInProgress.rooms[otherRoomId].meta = {
        subRooms: {
          "*": {
            nonContiguousRelationship: {
              with: { room: testRoomId },
              gridOffset: { x: 1, y: 0, z: 0 },
            },
          },
        },
      };
    });

    const currentRoom = state1.campaignInProgress.rooms[
      testRoomId
    ] as EditorRoomJson;

    const state2 = reduceLevelEditorActions(
      state1,
      roomJsonEdited({
        roomJson: { ...currentRoom, id: newRoomId },
        timestamp: 0,
      }),
    );

    const otherRoom = state2.campaignInProgress.rooms[otherRoomId];

    expect(roomNonContiguousRelationship(otherRoom)?.with.room).toBe(newRoomId);
  });

  test("undo history migrates from old room id to new room id", () => {
    const state1WithHistory: LevelEditorState = produce(
      state0WithTwoRooms,
      (draft) => {
        draft.history[testRoomId] = {
          undo: [
            {
              room: {
                id: testRoomId,
                planet: "blacktooth",
                color: { hue: "cyan", shade: "basic" },
                items: {},
              },
              description: { kind: "changeColour" },
              timestamp: 0,
            },
          ],
          redo: [
            {
              room: {
                id: testRoomId,
                planet: "blacktooth",
                color: { hue: "magenta", shade: "basic" },
                items: {},
              },
              description: { kind: "changeColour" },
              timestamp: 0,
            },
          ],
        };
      },
    );

    const currentRoom = state1WithHistory.campaignInProgress.rooms[
      testRoomId
    ] as EditorRoomJson;

    const state2 = reduceLevelEditorActions(
      state1WithHistory,
      roomJsonEdited({
        roomJson: { ...currentRoom, id: newRoomId },
        timestamp: 0,
      }),
    );

    expect(state2.history[testRoomId]).toBeUndefined();
    expect(state2.history[newRoomId]).toBeDefined();
    expect(state2.history[newRoomId]!.undo.length).toBeGreaterThanOrEqual(1);
    expect(state2.history[newRoomId]!.undo[0].description.kind).toBe(
      "changeColour",
    );
    expect(state2.history[newRoomId]!.redo).toHaveLength(0);
  });
});

describe('editing a door\'s "toRoom" config provides convenience methods to maintain symmetry', () => {
  const otherRoomId = "otherRoom" as EditorRoomId;

  const state0WithTwoRooms: LevelEditorState = produce(
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
          toRoom: nowhereRoomId as EditorRoomId,
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
        state0WithTwoRooms.campaignInProgress.rooms[
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

    const state1 = reduceLevelEditorActions(
      state0WithTwoRooms,
      roomJsonEdited({
        roomJson: editedRoom,
        timestamp: 0,
      }),
    );

    const otherRoom = state1.campaignInProgress.rooms[otherRoomId];
    const returnDoors = roomJsonItemsIterable(otherRoom)
      .filter(
        (item): item is EditorJsonItem<"door"> =>
          item.type === "door" && item.config.toRoom === testRoomId,
      )
      .toArray();

    expect(returnDoors).toHaveLength(1);
    const [returnDoor] = returnDoors;
    expect(returnDoor.config.direction).toBe("away");
    // only one door links the two rooms, so neither end needs a toDoor (it
    // would be redundant and the verifier would just strip it)
    expect(returnDoor.config.toDoor).toBeUndefined();
    const outgoingDoor = state1.campaignInProgress.rooms[testRoomId].items[
      "door1" as EditorRoomItemId
    ] as EditorJsonItem<"door">;
    expect(outgoingDoor.config.toDoor).toBeUndefined();
  });

  test("adds a toDoor to disambiguate when more than one door links the two rooms", () => {
    const state1WithTwoDoors: LevelEditorState = produce(
      state0WithTwoRooms,
      (draft) => {
        const room = draft.campaignInProgress.rooms[testRoomId];
        // two doors from this room both lead to the other room, so a return
        // link can't be resolved by direction alone:
        room.items["door1" as EditorRoomItemId] = {
          type: "door",
          position: { x: 0, y: 0, z: 0 },
          config: { direction: "towards", toRoom: otherRoomId },
        };
        room.items["door2" as EditorRoomItemId] = {
          type: "door",
          position: { x: 3, y: 0, z: 0 },
          config: { direction: "towards", toRoom: otherRoomId },
        };
      },
    );

    const currentRoom = state1WithTwoDoors.campaignInProgress.rooms[
      testRoomId
    ] as EditorRoomJson;

    const state2 = reduceLevelEditorActions(
      state1WithTwoDoors,
      roomJsonEdited({ roomJson: structuredClone(currentRoom), timestamp: 0 }),
    );

    const otherRoom = state2.campaignInProgress.rooms[otherRoomId];
    const returnDoors = roomJsonItemsIterable(otherRoom)
      .filter(
        (item): item is EditorJsonItem<"door"> =>
          item.type === "door" && item.config.toRoom === testRoomId,
      )
      .toArray();

    // the link is ambiguous, so a toDoor is needed and gets set
    expect(returnDoors.length).toBeGreaterThanOrEqual(1);
    expect(returnDoors.some((door) => door.config.toDoor !== undefined)).toBe(
      true,
    );
  });

  test("changing toRoom repurposes an existing opposite-direction door in the target room", () => {
    const existingReturnDoorId = "existingReturnDoor" as EditorRoomItemId;

    const state1WithExistingDoor: LevelEditorState = produce(
      state0WithTwoRooms,
      (draft) => {
        draft.campaignInProgress.rooms[otherRoomId].items[
          existingReturnDoorId
        ] = {
          type: "door",
          position: { x: 3, y: 0, z: 0 },
          config: {
            direction: "away",
            toRoom: nowhereRoomId as EditorRoomId,
          },
        };
      },
    );

    const editedRoom = structuredClone(
      produce(
        state1WithExistingDoor.campaignInProgress.rooms[
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

    const state2 = reduceLevelEditorActions(
      state1WithExistingDoor,
      roomJsonEdited({
        roomJson: editedRoom,
        timestamp: 0,
      }),
    );

    const otherRoom = state2.campaignInProgress.rooms[otherRoomId];
    const returnDoor = otherRoom.items[
      existingReturnDoorId
    ] as EditorJsonItem<"door">;

    expect(returnDoor.config.toRoom).toBe(testRoomId);
    expect(returnDoor.position).toEqual({ x: 3, y: 0, z: 0 });
    // only one door links the two rooms, so the repurposed door needs no toDoor
    expect(returnDoor.config.toDoor).toBeUndefined();
  });

  test("does not repurpose a door that is not in the opposite direction", () => {
    const sameDirDoorId = "sameDirDoor" as EditorRoomItemId;

    const state1WithSameDirDoor: LevelEditorState = produce(
      state0WithTwoRooms,
      (draft) => {
        draft.campaignInProgress.rooms[otherRoomId].items[sameDirDoorId] = {
          type: "door",
          position: { x: 3, y: 0, z: 0 },
          config: {
            direction: "towards",
            toRoom: nowhereRoomId as EditorRoomId,
          },
        };
      },
    );

    const editedRoom = structuredClone(
      produce(
        state1WithSameDirDoor.campaignInProgress.rooms[
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

    const state2 = reduceLevelEditorActions(
      state1WithSameDirDoor,
      roomJsonEdited({ roomJson: editedRoom, timestamp: 0 }),
    );

    const otherRoom = state2.campaignInProgress.rooms[otherRoomId];
    const sameDirDoor = otherRoom.items[
      sameDirDoorId
    ] as EditorJsonItem<"door">;

    expect(sameDirDoor.config.toRoom).toBe(nowhereRoomId);
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

    const state0: LevelEditorState = produce(
      {
        ...editorStateWithOneRoomWithNoItems,
        selectedRoomIds: [roomA],
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
      },
      (draft) => {
        Object.assign(existingLayoutNode(draft.layout, testOpenRoomId), {
          roomId: roomA,
          subRoomId: "*",
        });
      },
    );

    const editedRoomA = structuredClone(
      produce(
        state0.campaignInProgress.rooms[roomA] as EditorRoomJson,
        (draft) => {
          (
            draft.items[aLeftDoorId] as {
              config: { toRoom: EditorRoomId };
            }
          ).config.toRoom = roomB;
        },
      ),
    );

    const state1 = reduceLevelEditorActions(
      state0,
      roomJsonEdited({ roomJson: editedRoomA, timestamp: 0 }),
    );

    const resultA = state1.campaignInProgress.rooms[roomA];
    const aLeftDoor = resultA.items[aLeftDoorId] as EditorJsonItem<"door">;

    const resultB = state1.campaignInProgress.rooms[roomB];
    const bRightDoor = resultB.items[bRightDoorId] as EditorJsonItem<"door">;
    const bLeftDoor = resultB.items[bLeftDoorId] as EditorJsonItem<"door">;

    const resultC = state1.campaignInProgress.rooms[roomC];
    const cRightDoor = resultC.items[cRightDoorId] as EditorJsonItem<"door">;

    // A's left door should now point to B (the user's edit):
    expect(aLeftDoor.config.toRoom).toBe(roomB);
    expect(aLeftDoor.config.direction).toBe("left");

    // B's right door still points to A (it was not repurposed to the wrong
    // room), but its toDoor is now redundant - only one door links A and B - so
    // it's cleaned up, matching what the verifier would do, instead of fought:
    expect(bRightDoor.config.toRoom).toBe(roomA);
    expect(bRightDoor.config.toDoor).toBeUndefined();
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
    const state0 = editorStateWithOneRoomWithNoItems;
    const state1 = reduceLevelEditorActions(
      state0,
      setRoomAboveOrBelow({ direction: "above", createNew: true }),
    );

    const originalRoom = state1.campaignInProgress.rooms[testRoomId];
    const newRoomId = roomAboveOf(originalRoom)!;
    const newRoom = state1.campaignInProgress.rooms[newRoomId];

    expect(newRoom).toBeDefined();
    expect(roomBelowOf(newRoom)).toBe(testRoomId);
  });

  test("createNew navigates to the newly created room", () => {
    const state0 = editorStateWithOneRoomWithNoItems;
    const state1 = reduceLevelEditorActions(
      state0,
      setRoomAboveOrBelow({ direction: "above", createNew: true }),
    );

    expect(selectCursorRoomIdFromLevelEditorState(state1)).not.toBe(testRoomId);
    const originalRoom = state1.campaignInProgress.rooms[testRoomId];
    expect(selectCursorRoomIdFromLevelEditorState(state1)).toBe(
      roomAboveOf(originalRoom),
    );
  });

  test("createNew splices between existing rooms", () => {
    const roomB = "roomB" as EditorRoomId;
    const state0WithRoomAbove: LevelEditorState = produce(
      editorStateWithOneRoomWithNoItems,
      (draft) => {
        draft.campaignInProgress.rooms[roomB] = {
          id: roomB,
          planet: "blacktooth",
          color: { hue: "cyan", shade: "basic" },
          items: {},
          meta: { subRooms: { "*": { below: { room: testRoomId } } } },
        };
        draft.campaignInProgress.rooms[testRoomId].meta = {
          subRooms: { "*": { above: { room: roomB } } },
        };
      },
    );

    const state1 = reduceLevelEditorActions(
      state0WithRoomAbove,
      setRoomAboveOrBelow({ direction: "above", createNew: true }),
    );

    const originalRoom = state1.campaignInProgress.rooms[testRoomId];
    const newRoomId = roomAboveOf(originalRoom)!;
    const newRoom = state1.campaignInProgress.rooms[newRoomId];
    const roomBResult = state1.campaignInProgress.rooms[roomB];

    expect.soft(roomBelowOf(newRoom)).toBe(testRoomId);
    expect.soft(roomAboveOf(newRoom)).toBe(roomB);
    expect.soft(roomBelowOf(roomBResult)).toBe(newRoomId);
  });

  test("createNew gives the new sandwiched room a 'none' floor", () => {
    const state0 = editorStateWithOneRoomWithNoItems;
    const state1 = reduceLevelEditorActions(
      state0,
      setRoomAboveOrBelow({ direction: "below", createNew: true }),
    );

    const originalRoom = state1.campaignInProgress.rooms[testRoomId];
    const floors = [...roomJsonItemsIterable(originalRoom)].filter(
      (item) => item.type === "floor",
    );

    expect(floors.every((f) => f.config.floorType === "none")).toBe(true);
  });
});

describe("undo descriptions for JSON edits", () => {
  const pickupId = "pi1" as EditorRoomItemId;
  const monsterId = "m1" as EditorRoomItemId;

  const state0WithItems: LevelEditorState = produce(
    editorStateWithOneRoomWithNoItems,
    (draft) => {
      const room = draft.campaignInProgress.rooms[testRoomId];
      room.items[pickupId] = {
        type: "pickup",
        config: { gives: "bag" },
        position: { x: 1, y: 1, z: 0 },
      };
      room.items[monsterId] = {
        type: "monster",
        config: {
          which: "dalek",
          movement: "patrol-randomly-diagonal",
          activated: "on",
        },
        position: { x: 3, y: 3, z: 0 },
      };
    },
  );

  test("editing a single item produces editItems with that item", () => {
    const currentRoom = state0WithItems.campaignInProgress.rooms[
      testRoomId
    ] as EditorRoomJson;

    const editedRoom = produce(currentRoom, (draft) => {
      (draft.items[pickupId] as EditorJsonItem<"pickup">).config.gives =
        "hooter";
    });

    const state1 = reduceLevelEditorActions(
      state0WithItems,
      roomJsonEdited({ roomJson: structuredClone(editedRoom), timestamp: 0 }),
    );

    expect(state1.history[testRoomId]!.undo).toHaveLength(1);
    const [{ description }] = state1.history[testRoomId]!.undo;
    expect(description.kind).toBe("editItems");
    if (description.kind === "editItems") {
      expect(description.items).toHaveLength(1);
      const [[editedId, editedItem]] = description.items;
      expect(editedId).toBe(pickupId);
      expect(editedItem.type).toBe("pickup");
    }
  });

  test("editing multiple items produces editItems with all affected items", () => {
    const currentRoom = state0WithItems.campaignInProgress.rooms[
      testRoomId
    ] as EditorRoomJson;

    const editedRoom = produce(currentRoom, (draft) => {
      (draft.items[pickupId] as EditorJsonItem<"pickup">).config.gives =
        "hooter";
      (draft.items[monsterId] as EditorJsonItem<"monster">).config.which =
        "elephant";
    });

    const state1 = reduceLevelEditorActions(
      state0WithItems,
      roomJsonEdited({ roomJson: structuredClone(editedRoom), timestamp: 0 }),
    );

    const [{ description }] = state1.history[testRoomId]!.undo;
    expect(description.kind).toBe("editItems");
    if (description.kind === "editItems") {
      expect(description.items).toHaveLength(2);
      const ids = description.items.map(([id]) => id);
      expect(ids).toContain(pickupId);
      expect(ids).toContain(monsterId);
    }
  });

  test("editing room colour produces editRoomProperty", () => {
    const currentRoom = state0WithItems.campaignInProgress.rooms[
      testRoomId
    ] as EditorRoomJson;

    const editedRoom = {
      ...currentRoom,
      color: { hue: "magenta" as const, shade: "basic" as const },
    };

    const state1 = reduceLevelEditorActions(
      state0WithItems,
      roomJsonEdited({ roomJson: structuredClone(editedRoom), timestamp: 0 }),
    );

    const [{ description }] = state1.history[testRoomId]!.undo;
    expect(description).toEqual({
      kind: "editRoomProperty",
      property: "color",
    });
  });

  test("editing multiple top-level keys produces editRoomJson", () => {
    const currentRoom = state0WithItems.campaignInProgress.rooms[
      testRoomId
    ] as EditorRoomJson;

    const editedRoom = {
      ...currentRoom,
      planet: "egyptus" as const,
      color: { hue: "magenta" as const, shade: "basic" as const },
    };

    const state1 = reduceLevelEditorActions(
      state0WithItems,
      roomJsonEdited({ roomJson: structuredClone(editedRoom), timestamp: 0 }),
    );

    const [{ description }] = state1.history[testRoomId]!.undo;
    expect(description).toEqual({ kind: "editRoomJson" });
  });
});

describe("makeHoleInSelectedFloor", () => {
  const floorId = "f" as EditorRoomItemId;
  const state0WithSelectedFloor: LevelEditorState = produce(
    editorStateWithOneRoomWithNoItems,
    (draft) => {
      draft.campaignInProgress.rooms[testRoomId].items[floorId] = {
        type: "floor",
        position: { x: 0, y: 0, z: 0 },
        config: {
          floorType: "standable",
          scenery: "blacktooth",
          times: { x: 6, y: 7 },
        },
      };
      existingLayoutNode(draft.layout, testOpenRoomId).selectedJsonItemIds = [
        floorId,
      ];
    },
  );

  test("splits the floor into a 2×2 'none' floor at its centre and the floors around it", () => {
    const state1 = reduceLevelEditorActions(
      state0WithSelectedFloor,
      makeHoleInSelectedFloor({ timestamp: 0 }),
    );

    const floors = roomJsonItemsIterable(
      state1.campaignInProgress.rooms[testRoomId],
    )
      .filter((item) => item.type === "floor")
      .map(({ position, config }) => ({
        position,
        times: config.times,
        floorType: config.floorType,
      }))
      .toArray();

    expect(floors).toEqual(
      expect.arrayContaining([
        {
          position: { x: 0, y: 0, z: 0 },
          times: { x: 6, y: 2 },
          floorType: "standable",
        },
        {
          position: { x: 0, y: 4, z: 0 },
          times: { x: 6, y: 3 },
          floorType: "standable",
        },
        {
          position: { x: 0, y: 2, z: 0 },
          times: { x: 2, y: 2 },
          floorType: "standable",
        },
        {
          position: { x: 4, y: 2, z: 0 },
          times: { x: 2, y: 2 },
          floorType: "standable",
        },
        {
          position: { x: 2, y: 2, z: 0 },
          times: { x: 2, y: 2 },
          floorType: "none",
        },
      ]),
    );
    expect(floors).toHaveLength(5);
  });

  test("links a newly created room below, both ways", () => {
    const state1 = reduceLevelEditorActions(
      state0WithSelectedFloor,
      makeHoleInSelectedFloor({ timestamp: 0 }),
    );

    const roomBelowId = roomBelowOf(
      state1.campaignInProgress.rooms[testRoomId],
    )!;
    expect(roomAboveOf(state1.campaignInProgress.rooms[roomBelowId])).toBe(
      testRoomId,
    );
  });

  test("the room created below has a floor the same size as the room", () => {
    const state1 = reduceLevelEditorActions(
      state0WithSelectedFloor,
      makeHoleInSelectedFloor({ timestamp: 0 }),
    );

    const roomBelowId = roomBelowOf(
      state1.campaignInProgress.rooms[testRoomId],
    )!;
    const floorsBelowTimes = roomJsonItemsIterable(
      state1.campaignInProgress.rooms[roomBelowId],
    )
      .filter((item) => item.type === "floor")
      .map(({ config }) => config.times)
      .toArray();
    expect(floorsBelowTimes).toEqual([{ x: 6, y: 7 }]);
  });

  test("a hole across all four sub-rooms of a divided room links each to the matching sub-room of one room below", () => {
    const cell = (x: number, y: number) => ({
      gridPosition: { x, y },
      physicalPosition: {
        from: { x: x * 8, y: y * 8 },
        to: { x: (x + 1) * 8, y: (y + 1) * 8 },
      },
    });
    const state0WithDividedRoom: LevelEditorState = produce(
      editorStateWithOneRoomWithNoItems,
      (draft) => {
        const room = draft.campaignInProgress.rooms[testRoomId];
        room.items[floorId] = {
          type: "floor",
          position: { x: -8, y: -8, z: 0 },
          config: {
            floorType: "standable",
            scenery: "blacktooth",
            times: { x: 16, y: 16 },
          },
        };
        room.meta = {
          subRooms: {
            a: cell(-1, -1),
            b: cell(0, -1),
            c: cell(-1, 0),
            d: cell(0, 0),
          },
        };
        existingLayoutNode(draft.layout, testOpenRoomId).subRoomId = "a";
        existingLayoutNode(draft.layout, testOpenRoomId).selectedJsonItemIds = [
          floorId,
        ];
      },
    );

    const state1 = reduceLevelEditorActions(
      state0WithDividedRoom,
      makeHoleInSelectedFloor({ timestamp: 0 }),
    );

    const room = state1.campaignInProgress.rooms[testRoomId];
    const linkedBelow = ["a", "b", "c", "d"].map((subRoomId) => {
      const below = roomVerticalLink(room, "below", subRoomId)!;
      const roomBelow = state1.campaignInProgress.rooms[below.room];
      return {
        room: below.room,
        gridPosition: subRoomById(roomBelow, below.subRoom!)?.gridPosition,
      };
    });
    const [{ room: roomBelowId }] = linkedBelow;
    expect(linkedBelow).toEqual([
      { room: roomBelowId, gridPosition: { x: 0, y: 0 } },
      { room: roomBelowId, gridPosition: { x: 1, y: 0 } },
      { room: roomBelowId, gridPosition: { x: 0, y: 1 } },
      { room: roomBelowId, gridPosition: { x: 1, y: 1 } },
    ]);
  });

  test("keeps an existing room below rather than creating another", () => {
    const roomB = "roomB" as EditorRoomId;
    const state1WithRoomBelow: LevelEditorState = produce(
      state0WithSelectedFloor,
      (draft) => {
        draft.campaignInProgress.rooms[roomB] = {
          id: roomB,
          planet: "blacktooth",
          color: { hue: "cyan", shade: "basic" },
          items: {},
          meta: { subRooms: { "*": { above: { room: testRoomId } } } },
        };
        draft.campaignInProgress.rooms[testRoomId].meta = {
          subRooms: { "*": { below: { room: roomB } } },
        };
      },
    );

    const state2 = reduceLevelEditorActions(
      state1WithRoomBelow,
      makeHoleInSelectedFloor({ timestamp: 0 }),
    );

    expect(keys(state2.campaignInProgress.rooms)).toEqual([testRoomId, roomB]);
  });
});

describe("makeHoleInSelectedFloor leaves the campaign without verification issues", () => {
  test.for([
    { roomShape: "undivided", gridPositions: [{ x: 0, y: 0 }] },
    {
      roomShape: "divided 2×2",
      gridPositions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
    },
  ])("$roomShape room", ({ gridPositions }) => {
    const roomId = "holed" as EditorRoomId;
    const room = createNewRoom<EditorRoomId, EditorRoomItemId>(
      roomId,
      { x: 8, y: 8 },
      { hue: "cyan", shade: "basic" },
      "blacktooth",
      gridPositions,
    );
    const [[floorId]] = iterateRoomJsonItemsWithIds(
      room.items,
      "floor",
    ).toArray();
    const state0: LevelEditorState = produce(
      {
        ...editorStateWithOneRoomWithNoItems,
        selectedRoomIds: [roomId],

        campaignInProgress: {
          ...editorStateWithOneRoomWithNoItems.campaignInProgress,
          rooms: {
            [roomId]: room,
          } as LevelEditorState["campaignInProgress"]["rooms"],
        },
      },
      (draft) => {
        Object.assign(existingLayoutNode(draft.layout, testOpenRoomId), {
          roomId,
          subRoomId: Object.keys(room.meta?.subRooms ?? { "*": {} })[0],
          selectedJsonItemIds: [floorId],
        });
      },
    );
    const issueMessages = (state: LevelEditorState) =>
      verifyCampaign(state.campaignInProgress as VerificationCampaign).map(
        ({ msg }) => msg,
      );
    const state1 = reduceLevelEditorActions(
      state0,
      makeHoleInSelectedFloor({ timestamp: 0 }),
    );

    // only the campaign-wide issues of a one-room campaign, from before:
    expect(issueMessages(state1)).toEqual(issueMessages(state0));
  });
});
