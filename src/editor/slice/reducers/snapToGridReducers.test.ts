import { produce } from "immer";
import { expect, test } from "vitest";

import { type EditorRoomItemId } from "../../editorTypes";
import { selectCurrentCommittedRoomJsonFromLevelEditorState } from "../levelEditorSelectors";
import {
  setSelectedItemsInRoom,
  snapSelectedItemsToGrid,
} from "../levelEditorSlice";
import {
  editorStateWithOneRoomWithNoItems,
  reduceLevelEditorActions,
  testRoomId,
} from "./__test__/storeStates";

test("snaps the selected items across to the nearest point on the half grid, leaving their height", () => {
  const state0 = produce(editorStateWithOneRoomWithNoItems, (draft) => {
    const { items } = draft.campaignInProgress.rooms[testRoomId];
    items["off" as EditorRoomItemId] = {
      type: "block",
      config: { style: "organic" },
      position: { x: 1.375, y: 2.875, z: 1 },
    };
    items["unselected" as EditorRoomItemId] = {
      type: "block",
      config: { style: "organic" },
      position: { x: 5.125, y: 5.125, z: 0 },
    };
  });

  const state1Snapped = reduceLevelEditorActions(
    state0,
    setSelectedItemsInRoom({
      selection: [
        { jsonItemId: "off" as EditorRoomItemId, whichEditorGhost: undefined },
      ],
    }),
    snapSelectedItemsToGrid({ gridResolution: 0.5, timestamp: 0 }),
  );

  expect(
    selectCurrentCommittedRoomJsonFromLevelEditorState(state1Snapped).items,
  ).toEqual({
    off: {
      type: "block",
      config: { style: "organic" },
      position: { x: 1.5, y: 3, z: 1 },
    },
    unselected: {
      type: "block",
      config: { style: "organic" },
      position: { x: 5.125, y: 5.125, z: 0 },
    },
  });
});
