import { produce } from "immer";
import { expect, test } from "vitest";

import { type EditorRoomItemId } from "../../editorTypes";
import {
  selectCurrentCommittedRoomJsonFromLevelEditorState,
  selectCursorRoomSelectedJsonItemIdsFromLevelEditorState,
} from "../levelEditorSelectors";
import {
  explodeSelectedItems,
  openItemContextMenu,
  setSelectedItemsInRoom,
} from "../levelEditorSlice";
import { existingLayoutNode } from "../PaneLayout";
import {
  editorStateWithOneRoomWithNoItems,
  editorStateWithOneRoomWithOneAwayWall,
  reduceLevelEditorActions,
  testOpenRoomId,
  testRoomId,
  wallItemId,
} from "./__test__/storeStates";

const state0MultipliedBlock = produce(
  editorStateWithOneRoomWithNoItems,
  (draft) => {
    draft.autoCoalesce = true;
    draft.campaignInProgress.rooms[testRoomId].items["bm" as EditorRoomItemId] =
      {
        type: "block",
        config: { style: "artificial", times: { x: 2 } },
        position: { x: 0, y: 0, z: 0 },
      };
  },
);

const state1ExplodedBlock = reduceLevelEditorActions(
  state0MultipliedBlock,
  setSelectedItemsInRoom({ jsonItemIds: ["bm"] as EditorRoomItemId[] }),
  openItemContextMenu({ openRoomId: testOpenRoomId, scrXy: { x: 1, y: 1 } }),
  explodeSelectedItems({ timestamp: 0 }),
);

test("explodes a multiplied block into its separate single parts", () => {
  expect(
    selectCurrentCommittedRoomJsonFromLevelEditorState(state1ExplodedBlock)
      .items,
  ).toEqual({
    bm: {
      type: "block",
      config: { style: "artificial" },
      position: { x: 0, y: 0, z: 0 },
    },
    bm1: {
      type: "block",
      config: { style: "artificial" },
      position: { x: 1, y: 0, z: 0 },
    },
  });
});

test("turns off auto-coalesce so the parts do not re-join", () => {
  expect(state1ExplodedBlock.autoCoalesce).toBe(false);
});

test("selects the exploded parts", () => {
  expect(
    selectCursorRoomSelectedJsonItemIdsFromLevelEditorState(
      state1ExplodedBlock,
    ),
  ).toEqual(["bm", "bm1"]);
});

test("closes the context menu", () => {
  expect(
    existingLayoutNode(state1ExplodedBlock.layout, testOpenRoomId)
      .contextMenuXy,
  ).toBeUndefined();
});

const state1ExplodedWall = reduceLevelEditorActions(
  editorStateWithOneRoomWithOneAwayWall,
  setSelectedItemsInRoom({ jsonItemIds: [wallItemId] }),
  explodeSelectedItems({ timestamp: 0 }),
);

test("explodes a tiled away-wall into one single-tile wall per tile", () => {
  const walls = Object.values(
    selectCurrentCommittedRoomJsonFromLevelEditorState(state1ExplodedWall)
      .items,
  );

  expect(
    walls.map((wall) => ({
      x: wall.position.x,
      tiles: (wall.config as { tiles?: unknown[] }).tiles?.length,
    })),
  ).toEqual([
    { x: 0, tiles: 1 },
    { x: 1, tiles: 1 },
    { x: 2, tiles: 1 },
    { x: 3, tiles: 1 },
    { x: 4, tiles: 1 },
  ]);
});
