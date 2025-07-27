import { expect, test } from "vitest";
import {
  applyItemTool,
  deleteSelected,
  setSelectedItemsInRoom,
  setTool,
} from "../levelEditorSlice";
import {
  editorStateWithOneRoomWithOneAwayWall,
  doorItemToolWithAutoAddRooms,
  applyLevelEditorActions,
  wallItemId,
  testRoomId,
} from "./__test__/storeStates";
import type { EditorJsonItemUnion } from "../../editorTypes";
import { selectCurrentRoomFromLevelEditorState } from "../levelEditorSliceSelectors";
import { iterateRoomJsonItemsWithIds } from "../../../model/RoomJson";

test('deleting a door "heals" the void where the door once stood by extending and joining existing walls', () => {
  const state0 = editorStateWithOneRoomWithOneAwayWall;

  const state1 = applyLevelEditorActions(
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
