import { produce } from "immer";
import { expect, test } from "vitest";

import { type EditorRoomItemId } from "../../editorTypes";
import {
  selectCurrentCommittedRoomJsonFromLevelEditorState,
  selectCursorRoomSelectedJsonItemIdsFromLevelEditorState,
} from "../levelEditorSelectors";
import {
  coalesceSelectedItems,
  type LevelEditorState,
  setSelectedItemsInRoom,
  undo,
} from "../levelEditorSlice";
import {
  editorStateWithOneRoomWithNoItems,
  reduceLevelEditorActions,
  testRoomId,
} from "./__test__/storeStates";

const state0WithTwoAdjacentBlocks = produce(
  editorStateWithOneRoomWithNoItems,
  (draft) => {
    const { items } = draft.campaignInProgress.rooms[testRoomId];
    items["b0" as EditorRoomItemId] = {
      type: "block",
      config: { style: "artificial" },
      position: { x: 0, y: 0, z: 0 },
    };
    items["b1" as EditorRoomItemId] = {
      type: "block",
      config: { style: "artificial" },
      position: { x: 1, y: 0, z: 0 },
    };
  },
);

const coalesceBothBlocks = (): LevelEditorState =>
  reduceLevelEditorActions(
    state0WithTwoAdjacentBlocks,
    setSelectedItemsInRoom({ jsonItemIds: ["b0", "b1"] as EditorRoomItemId[] }),
    coalesceSelectedItems({ timestamp: 0 }),
  );

test("coalesces two adjacent matching blocks into a single multiplied item", () => {
  const state1 = coalesceBothBlocks();
  const { items } = selectCurrentCommittedRoomJsonFromLevelEditorState(state1);

  expect(Object.values(items)).toEqual([
    {
      type: "block",
      config: { style: "artificial", times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
    },
  ]);
});

test("selects the resulting coalesced item", () => {
  const state1 = coalesceBothBlocks();

  expect(
    selectCursorRoomSelectedJsonItemIdsFromLevelEditorState(state1),
  ).toHaveLength(1);
});

test("coalescing is undoable", () => {
  const state1 = coalesceBothBlocks();
  const state2Undone = reduceLevelEditorActions(state1, undo());

  expect(
    selectCurrentCommittedRoomJsonFromLevelEditorState(state2Undone).items,
  ).toEqual(
    selectCurrentCommittedRoomJsonFromLevelEditorState(
      state0WithTwoAdjacentBlocks,
    ).items,
  );
});
