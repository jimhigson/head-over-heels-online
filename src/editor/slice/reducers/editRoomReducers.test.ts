import { produce } from "immer";
import { first } from "iter-tools-es";
import { describe, expect, test } from "vitest";

import type {
  EditorJsonItemUnion,
  EditorRoomId,
  EditorRoomItemId,
  EditorRoomJson,
} from "../../editorTypes";
import type { LevelEditorState } from "../levelEditorSlice";

import { iterateRoomJsonItemsWithIds } from "../../../model/RoomJson";
import { selectCurrentRoomFromLevelEditorState } from "../levelEditorSelectors";
import {
  applyItemTool,
  deleteSelected,
  roomJsonEdited,
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
    const doorItem = first(
      iterateRoomJsonItemsWithIds(otherRoom.items, "door"),
    )?.[1];

    expect(doorItem && doorItem.config.toRoom).toBe(newRoomId);
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
    const teleporterItem = first(
      iterateRoomJsonItemsWithIds(otherRoom.items, "teleporter"),
    )?.[1];

    expect(teleporterItem && teleporterItem.config.toRoom).toBe(newRoomId);
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
    const portableTeleporterItem = first(
      iterateRoomJsonItemsWithIds(otherRoom.items, "portableTeleporter"),
    )?.[1];

    expect(portableTeleporterItem && portableTeleporterItem.config.toRoom).toBe(
      newRoomId,
    );
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
