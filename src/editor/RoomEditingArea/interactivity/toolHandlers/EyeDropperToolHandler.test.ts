import { produce } from "immer";
import { expect, test } from "vitest";

import { toolItemMatchers } from "../__test__/toolItemMatchers";
import type { EditorRoomItemId, EditorRoomJson } from "../../../editorTypes";
import {
  type LevelEditorState,
  selectOpenRoomSelectionJsonItemIdsWithoutEditorGhostSelections,
  setSelectedItemsInRoom,
} from "../../../slice/levelEditorSlice";
import { loadEditorRoom } from "../../../slice/loadEditorRoom";
import {
  editorStateWithOneRoomWithNoItems,
  reduceLevelEditorActions,
  testOpenRoomId,
  testRoomId,
} from "../../../slice/reducers/__test__/storeStates";
import type { PointingAtItem } from "../../cursor/PointingAt";
import type { EditorViewport } from "../../viewport/EditorViewport";
import { EyeDropperToolHandler } from "./EyeDropperToolHandler";

expect.extend(toolItemMatchers);

const blockAId = "blockA" as EditorRoomItemId;
const blockBId = "blockB" as EditorRoomItemId;
const blockCId = "blockC" as EditorRoomItemId;

const state0EyeDropperWithThreeBlocks: LevelEditorState = produce(
  editorStateWithOneRoomWithNoItems,
  (draft) => {
    const { items } = draft.campaignInProgress.rooms[testRoomId];
    items["floor" as EditorRoomItemId] = {
      type: "floor",
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
    };
    items[blockAId] = {
      type: "block",
      config: { style: "organic" },
      position: { x: 1, y: 1, z: 0 },
    };
    items[blockBId] = {
      type: "block",
      config: { style: "artificial" },
      position: { x: 4, y: 2, z: 0 },
    };
    items[blockCId] = {
      type: "block",
      config: { style: "tower" },
      position: { x: 6, y: 6, z: 0 },
    };
    draft.tool = { type: "eyeDropper" };
  },
);

const roomState = loadEditorRoom(
  testRoomId,
  state0EyeDropperWithThreeBlocks.campaignInProgress.rooms[
    testRoomId
  ] as EditorRoomJson,
);

const selecting = (state: LevelEditorState, ...itemIds: EditorRoomItemId[]) =>
  reduceLevelEditorActions(
    state,
    setSelectedItemsInRoom({
      selection: itemIds.map((jsonItemId) => ({
        jsonItemId,
        whichEditorGhost: undefined,
      })),
    }),
  );

const clicking = (
  state: LevelEditorState,
  itemId: EditorRoomItemId,
  mouseEvent: Pick<MouseEvent, "ctrlKey" | "metaKey">,
) => {
  const pointingAt: PointingAtItem = {
    roomId: testRoomId,
    scrXy: { x: 0, y: 0 },
    world: {
      itemId,
      position: { x: 0, y: 0, z: 0 },
      onItem: { face: { x: 0, y: 0, z: 1 } },
    },
  };
  return reduceLevelEditorActions(
    state,
    new EyeDropperToolHandler().handleMouseUp({
      openRoomId: testOpenRoomId,
      roomState,
      mouseEvent: mouseEvent as MouseEvent,
      viewport: {} as EditorViewport,
      pointingAt,
      isClick: true,
    }),
  );
};

const selectedIds = (state: LevelEditorState) =>
  selectOpenRoomSelectionJsonItemIdsWithoutEditorGhostSelections(
    { levelEditor: state },
    testOpenRoomId,
  );

test.for<["cmd" | "ctrl", Pick<MouseEvent, "ctrlKey" | "metaKey">]>([
  ["ctrl", { ctrlKey: true, metaKey: false }],
  ["cmd", { ctrlKey: false, metaKey: true }],
])("%s-clicking an item adds it to the selection", ([, mouseEvent]) => {
  const state1 = clicking(
    selecting(state0EyeDropperWithThreeBlocks, blockAId),
    blockBId,
    mouseEvent,
  );

  expect(selectedIds(state1)).toEqual([blockAId, blockBId]);
});

test("ctrl-clicking an item doesn't change the tool", () => {
  const state1 = clicking(state0EyeDropperWithThreeBlocks, blockAId, {
    ctrlKey: true,
    metaKey: false,
  });

  expect(state1.tool).toEqual({ type: "eyeDropper" });
});

test("clicking an item in the selection takes all of the selection, each relative to the one clicked", () => {
  const state1 = clicking(
    selecting(state0EyeDropperWithThreeBlocks, blockAId, blockBId, blockCId),
    blockBId,
    { ctrlKey: false, metaKey: false },
  );

  expect(state1.tool).toEqualToolItems([
    {
      type: "block",
      config: { style: "artificial" },
    },
    {
      type: "block",
      config: { style: "organic" },
      position: { x: -3, y: -1, z: 0 },
    },
    {
      type: "block",
      config: { style: "tower" },
      position: { x: 2, y: 4, z: 0 },
    },
  ]);
});

test("clicking an item that isn't in the selection takes only that item", () => {
  const state1 = clicking(
    selecting(state0EyeDropperWithThreeBlocks, blockAId, blockBId),
    blockCId,
    { ctrlKey: false, metaKey: false },
  );

  expect(state1.tool).toEqualToolItems([
    {
      type: "block",
      config: { style: "tower" },
    },
  ]);
});
