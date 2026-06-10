import { produce } from "immer";
import { expect, test } from "vitest";

import {
  type EditorJsonItemUnion,
  type EditorRoomItemId,
} from "../../editorTypes";
import { type ActivationState } from "../../itemActivation";
import { selectCurrentRoomFromLevelEditorState } from "../levelEditorSelectors";
import {
  type LevelEditorState,
  setSelectedItemsActivation,
  setSelectedItemsInRoom,
} from "../levelEditorSlice";
import {
  editorStateWithOneRoomWithNoItems,
  reduceLevelEditorActions,
  testRoomId,
} from "./__test__/storeStates";

const stateWithItem = (item: EditorJsonItemUnion): LevelEditorState =>
  produce(editorStateWithOneRoomWithNoItems, (draft) => {
    draft.campaignInProgress.rooms[testRoomId].items["i" as EditorRoomItemId] =
      item;
  });

const setActivation = (
  item: EditorJsonItemUnion,
  activation: ActivationState,
): EditorJsonItemUnion =>
  selectCurrentRoomFromLevelEditorState(
    reduceLevelEditorActions(
      stateWithItem(item),
      setSelectedItemsInRoom({ jsonItemIds: ["i" as EditorRoomItemId] }),
      setSelectedItemsActivation({ activation, timestamp: 0 }),
    ),
  ).items["i" as EditorRoomItemId];

test("disabling a deadlyBlock sets config.disabled", () => {
  expect(
    setActivation(
      {
        type: "deadlyBlock",
        config: { style: "toaster" },
        position: { x: 0, y: 0, z: 0 },
      },
      "disabled",
    ),
  ).toEqual({
    type: "deadlyBlock",
    config: { style: "toaster", disabled: true },
    position: { x: 0, y: 0, z: 0 },
  });
});

test("enabling a deadlyBlock removes the disabled key (the default)", () => {
  expect(
    setActivation(
      {
        type: "deadlyBlock",
        config: { style: "toaster", disabled: true },
        position: { x: 0, y: 0, z: 0 },
      },
      "enabled",
    ),
  ).toEqual({
    type: "deadlyBlock",
    config: { style: "toaster" },
    position: { x: 0, y: 0, z: 0 },
  });
});

const cyberman: EditorJsonItemUnion = {
  type: "monster",
  config: {
    which: "cyberman",
    activated: "on",
    movement: "towards-on-shortest-axis-xy4",
    startDirection: "towards",
  },
  position: { x: 0, y: 0, z: 0 },
};

test("waking a cyberman sets activated to after-player-near", () => {
  expect(setActivation(cyberman, "enabledOnPlayerNear")).toMatchObject({
    config: { activated: "after-player-near" },
  });
});

test("disabling a cyberman sets activated to off", () => {
  expect(setActivation(cyberman, "disabled")).toMatchObject({
    config: { activated: "off" },
  });
});

test("disabling a charles sets activated false", () => {
  expect(
    setActivation(
      { type: "charles", config: {}, position: { x: 0, y: 0, z: 0 } },
      "disabled",
    ),
  ).toEqual({
    type: "charles",
    config: { activated: false },
    position: { x: 0, y: 0, z: 0 },
  });
});

test("enabling a charles removes the activated key (the default)", () => {
  expect(
    setActivation(
      {
        type: "charles",
        config: { activated: false },
        position: { x: 0, y: 0, z: 0 },
      },
      "enabled",
    ),
  ).toEqual({
    type: "charles",
    config: {},
    position: { x: 0, y: 0, z: 0 },
  });
});
