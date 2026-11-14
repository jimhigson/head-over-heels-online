import { produce } from "immer";
import { expect, test } from "vitest";

import { type EditorRoomItemId } from "../../editorTypes";
import { selectCurrentCommittedRoomJsonFromLevelEditorState } from "../levelEditorSelectors";
import {
  setSelectedItemsInRoom,
  setSelectedItemsStartDirection,
} from "../levelEditorSlice";
import {
  editorStateWithOneRoomWithNoItems,
  reduceLevelEditorActions,
  testRoomId,
} from "./__test__/storeStates";

const state0PlatformPlayerAndBlock = produce(
  editorStateWithOneRoomWithNoItems,
  (draft) => {
    const { items } = draft.campaignInProgress.rooms[testRoomId];
    items["platform" as EditorRoomItemId] = {
      type: "movingPlatform",
      config: {
        movement: "back-forth",
        activated: "on",
        startDirection: "away",
      },
      position: { x: 0, y: 0, z: 0 },
    };
    items["player" as EditorRoomItemId] = {
      type: "sceneryPlayer",
      config: { which: "head", startDirection: "awayRight" },
      position: { x: 1, y: 0, z: 0 },
    };
    items["block" as EditorRoomItemId] = {
      type: "block",
      config: { style: "artificial" },
      position: { x: 2, y: 0, z: 0 },
    };
  },
);

const state1DirectionSet = reduceLevelEditorActions(
  state0PlatformPlayerAndBlock,
  setSelectedItemsInRoom({
    jsonItemIds: ["platform", "player", "block"] as EditorRoomItemId[],
  }),
  setSelectedItemsStartDirection({ startDirection: "left", timestamp: 0 }),
);

const setDirection =
  selectCurrentCommittedRoomJsonFromLevelEditorState(state1DirectionSet).items;

test("sets the start direction on a movingPlatform", () => {
  expect(setDirection["platform" as EditorRoomItemId]).toEqual({
    type: "movingPlatform",
    config: { movement: "back-forth", activated: "on", startDirection: "left" },
    position: { x: 0, y: 0, z: 0 },
  });
});

test("sets the start direction on a sceneryPlayer", () => {
  expect(setDirection["player" as EditorRoomItemId]).toEqual({
    type: "sceneryPlayer",
    config: { which: "head", startDirection: "left" },
    position: { x: 1, y: 0, z: 0 },
  });
});

test("leaves items without a start direction untouched", () => {
  expect(setDirection["block" as EditorRoomItemId]).toEqual({
    type: "block",
    config: { style: "artificial" },
    position: { x: 2, y: 0, z: 0 },
  });
});

const state0Lamp = produce(editorStateWithOneRoomWithNoItems, (draft) => {
  draft.campaignInProgress.rooms[testRoomId].items["lamp" as EditorRoomItemId] =
    {
      type: "lamp",
      config: { direction: "towards", activated: true },
      position: { x: 0, y: 0, z: 0 },
    };
});

const state1LampDirectionSet = reduceLevelEditorActions(
  state0Lamp,
  setSelectedItemsInRoom({ jsonItemIds: ["lamp"] as EditorRoomItemId[] }),
  setSelectedItemsStartDirection({ startDirection: "left", timestamp: 0 }),
);

const lampSetDirection = selectCurrentCommittedRoomJsonFromLevelEditorState(
  state1LampDirectionSet,
).items;

test("sets a lamp's beam direction (its `direction` field, not startDirection)", () => {
  expect(lampSetDirection["lamp" as EditorRoomItemId]).toEqual({
    type: "lamp",
    config: { direction: "left", activated: true },
    position: { x: 0, y: 0, z: 0 },
  });
});
