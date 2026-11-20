import { produce } from "immer";
import { expect, test } from "vitest";

import {
  type EditorJsonItemUnion,
  type EditorRoomItemId,
} from "../../editorTypes";
import { selectCurrentCommittedRoomJsonFromLevelEditorState } from "../levelEditorSelectors";
import {
  setSelectedBlocksDeadly,
  setSelectedItemsInRoom,
  setSelectedItemsSubtype,
  undo,
} from "../levelEditorSlice";
import {
  editorStateWithOneRoomWithNoItems,
  reduceLevelEditorActions,
  testRoomId,
} from "./__test__/storeStates";

test("makes an organic block a deadly volcano, keeping its times", () => {
  const state0WithBlock = produce(
    editorStateWithOneRoomWithNoItems,
    (draft) => {
      draft.campaignInProgress.rooms[testRoomId].items[
        "i" as EditorRoomItemId
      ] = {
        type: "block",
        config: {
          style: "organic",
          times: { x: 2 },
          disappearing: { on: "stand" },
        },
        position: { x: 0, y: 0, z: 0 },
      };
    },
  );
  const state1AfterMakeDeadly = reduceLevelEditorActions(
    state0WithBlock,
    setSelectedItemsInRoom({ jsonItemIds: ["i" as EditorRoomItemId] }),
    setSelectedBlocksDeadly({ makeDeadly: true, timestamp: 0 }),
  );

  expect<EditorJsonItemUnion | undefined>(
    selectCurrentCommittedRoomJsonFromLevelEditorState(state1AfterMakeDeadly)
      .items["i" as EditorRoomItemId],
  ).toEqual<EditorJsonItemUnion>({
    type: "deadlyBlock",
    config: { style: "volcano", times: { x: 2 } },
    position: { x: 0, y: 0, z: 0 },
  });
});

test("makes a deadly toaster a safe artificial block, dropping disabled", () => {
  const state0WithDeadly = produce(
    editorStateWithOneRoomWithNoItems,
    (draft) => {
      draft.campaignInProgress.rooms[testRoomId].items[
        "i" as EditorRoomItemId
      ] = {
        type: "deadlyBlock",
        config: { style: "toaster", disabled: true },
        position: { x: 0, y: 0, z: 0 },
      };
    },
  );
  const state1AfterMakeSafe = reduceLevelEditorActions(
    state0WithDeadly,
    setSelectedItemsInRoom({ jsonItemIds: ["i" as EditorRoomItemId] }),
    setSelectedBlocksDeadly({ makeDeadly: false, timestamp: 0 }),
  );

  expect<EditorJsonItemUnion | undefined>(
    selectCurrentCommittedRoomJsonFromLevelEditorState(state1AfterMakeSafe)
      .items["i" as EditorRoomItemId],
  ).toEqual<EditorJsonItemUnion>({
    type: "block",
    config: { style: "artificial" },
    position: { x: 0, y: 0, z: 0 },
  });
});

test("undo restores a block made deadly", () => {
  const state0WithBlock = produce(
    editorStateWithOneRoomWithNoItems,
    (draft) => {
      draft.campaignInProgress.rooms[testRoomId].items[
        "i" as EditorRoomItemId
      ] = {
        type: "block",
        config: { style: "book" },
        position: { x: 0, y: 0, z: 0 },
      };
    },
  );
  const state1AfterMakeDeadlyAndUndo = reduceLevelEditorActions(
    state0WithBlock,
    setSelectedItemsInRoom({ jsonItemIds: ["i" as EditorRoomItemId] }),
    setSelectedBlocksDeadly({ makeDeadly: true, timestamp: 0 }),
    undo(),
  );

  expect<EditorJsonItemUnion | undefined>(
    selectCurrentCommittedRoomJsonFromLevelEditorState(
      state1AfterMakeDeadlyAndUndo,
    ).items["i" as EditorRoomItemId],
  ).toEqual<EditorJsonItemUnion>({
    type: "block",
    config: { style: "book" },
    position: { x: 0, y: 0, z: 0 },
  });
});

test("restyles a z-repeating block as a tower", () => {
  const state0WithBlock = produce(
    editorStateWithOneRoomWithNoItems,
    (draft) => {
      draft.campaignInProgress.rooms[testRoomId].items[
        "i" as EditorRoomItemId
      ] = {
        type: "block",
        config: { style: "organic", times: { x: 1, z: 3 } },
        position: { x: 0, y: 0, z: 0 },
      };
    },
  );
  const state1AfterTower = reduceLevelEditorActions(
    state0WithBlock,
    setSelectedItemsInRoom({ jsonItemIds: ["i" as EditorRoomItemId] }),
    setSelectedItemsSubtype({
      itemType: "block",
      subtype: "tower",
      timestamp: 0,
    }),
  );

  expect<EditorJsonItemUnion | undefined>(
    selectCurrentCommittedRoomJsonFromLevelEditorState(state1AfterTower).items[
      "i" as EditorRoomItemId
    ],
  ).toEqual<EditorJsonItemUnion>({
    type: "block",
    config: { style: "tower", times: { z: 3 } },
    position: { x: 0, y: 0, z: 0 },
  });
});

test("does not make an x-repeating block a tower", () => {
  const state0WithBlock = produce(
    editorStateWithOneRoomWithNoItems,
    (draft) => {
      draft.campaignInProgress.rooms[testRoomId].items[
        "i" as EditorRoomItemId
      ] = {
        type: "block",
        config: { style: "organic", times: { x: 2 } },
        position: { x: 0, y: 0, z: 0 },
      };
    },
  );
  const state1AfterTower = reduceLevelEditorActions(
    state0WithBlock,
    setSelectedItemsInRoom({ jsonItemIds: ["i" as EditorRoomItemId] }),
    setSelectedItemsSubtype({
      itemType: "block",
      subtype: "tower",
      timestamp: 0,
    }),
  );

  expect<EditorJsonItemUnion | undefined>(
    selectCurrentCommittedRoomJsonFromLevelEditorState(state1AfterTower).items[
      "i" as EditorRoomItemId
    ],
  ).toEqual<EditorJsonItemUnion>({
    type: "block",
    config: { style: "organic", times: { x: 2 } },
    position: { x: 0, y: 0, z: 0 },
  });
});

test("restyles a deadly block", () => {
  const state0WithDeadly = produce(
    editorStateWithOneRoomWithNoItems,
    (draft) => {
      draft.campaignInProgress.rooms[testRoomId].items[
        "i" as EditorRoomItemId
      ] = {
        type: "deadlyBlock",
        config: { style: "toaster" },
        position: { x: 0, y: 0, z: 0 },
      };
    },
  );
  const state1AfterVolcano = reduceLevelEditorActions(
    state0WithDeadly,
    setSelectedItemsInRoom({ jsonItemIds: ["i" as EditorRoomItemId] }),
    setSelectedItemsSubtype({
      itemType: "deadlyBlock",
      subtype: "volcano",
      timestamp: 0,
    }),
  );

  expect<EditorJsonItemUnion | undefined>(
    selectCurrentCommittedRoomJsonFromLevelEditorState(state1AfterVolcano)
      .items["i" as EditorRoomItemId],
  ).toEqual<EditorJsonItemUnion>({
    type: "deadlyBlock",
    config: { style: "volcano" },
    position: { x: 0, y: 0, z: 0 },
  });
});

test("restyles a portable block", () => {
  const state0WithPortable = produce(
    editorStateWithOneRoomWithNoItems,
    (draft) => {
      draft.campaignInProgress.rooms[testRoomId].items[
        "i" as EditorRoomItemId
      ] = {
        type: "portableBlock",
        config: { style: "cube" },
        position: { x: 0, y: 0, z: 0 },
      };
    },
  );
  const state1AfterDrum = reduceLevelEditorActions(
    state0WithPortable,
    setSelectedItemsInRoom({ jsonItemIds: ["i" as EditorRoomItemId] }),
    setSelectedItemsSubtype({
      itemType: "portableBlock",
      subtype: "drum",
      timestamp: 0,
    }),
  );

  expect<EditorJsonItemUnion | undefined>(
    selectCurrentCommittedRoomJsonFromLevelEditorState(state1AfterDrum).items[
      "i" as EditorRoomItemId
    ],
  ).toEqual<EditorJsonItemUnion>({
    type: "portableBlock",
    config: { style: "drum" },
    position: { x: 0, y: 0, z: 0 },
  });
});
