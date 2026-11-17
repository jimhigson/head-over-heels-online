import { configureStore } from "@reduxjs/toolkit";
import { produce } from "immer";
import { afterEach, beforeEach, expect, test } from "vitest";

import { listenerMiddleware } from "../../store/listenerMiddleware";
import { originXyz } from "../../utils/vectors/vectors";
import {
  type EditorJsonItemUnion,
  type EditorRoomId,
  type EditorRoomItemId,
} from "../editorTypes";
import {
  applyItemTool,
  changeToRoom,
  deleteSelected,
  levelEditorSlice,
  type LevelEditorSliceAction,
  setSelectedItemsInRoom,
  setTool,
} from "./levelEditorSlice";
import { layoutNodesOfType, tabOpenRoom } from "./PaneLayout";
import {
  editorStateWithOneRoomWithNoItems,
  testRoomId,
} from "./reducers/__test__/storeStates";
import { registerPinEditedRoomsTabsListener } from "./registerPinEditedRoomsTabsListener";

const roomB = "roomB" as EditorRoomId;
const blockId = "block" as EditorRoomItemId;

const block: EditorJsonItemUnion = {
  type: "block",
  config: { style: "organic" },
  position: { x: 1, y: 1, z: 0 },
};

const floor: EditorJsonItemUnion = {
  type: "floor",
  config: {
    floorType: "standable",
    scenery: "blacktooth",
    times: { x: 8, y: 8 },
  },
  position: originXyz,
};

const baseState = produce(editorStateWithOneRoomWithNoItems, (draft) => {
  const { rooms } = draft.campaignInProgress;
  rooms[roomB] = { ...rooms[testRoomId], id: roomB };
  rooms[roomB].items[blockId] = block;
});

/**
 * whether roomB's tab is a preview, once it is browsed to and the actions run
 */
const isRoomBTabPreviewAfter = (...actions: LevelEditorSliceAction[]) => {
  const levelEditorStore = configureStore({
    reducer: { levelEditor: levelEditorSlice.reducer },
    preloadedState: { levelEditor: baseState },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  });
  levelEditorStore.dispatch(changeToRoom(roomB));
  for (const action of actions) {
    levelEditorStore.dispatch(action);
  }
  const {
    levelEditor: { layout },
  } = levelEditorStore.getState();
  return layoutNodesOfType(layout, "tab").find(
    (tab) => tabOpenRoom(layout, tab).roomId === roomB,
  )?.isPreview;
};

let unsubscribe: () => void;
beforeEach(() => {
  unsubscribe = registerPinEditedRoomsTabsListener();
});
afterEach(() => {
  unsubscribe();
});

test("a room's preview tab is kept once the room is edited", () => {
  expect(
    isRoomBTabPreviewAfter(
      setSelectedItemsInRoom({ jsonItemIds: [blockId] }),
      deleteSelected({ timestamp: 0 }),
    ),
  ).toBe(false);
});

test("putting an item in a room keeps its preview tab", () => {
  expect(
    isRoomBTabPreviewAfter(
      setTool({
        type: "item",
        item: { type: "block", config: { style: "organic" } },
      }),
      applyItemTool({
        roomId: roomB,
        blockPosition: { x: 3, y: 3, z: 0 },
        pointedAtItemJson: floor,
        preview: false,
        timestamp: 0,
      }),
    ),
  ).toBe(false);
});

test("previewing an item in a room leaves its tab a preview", () => {
  expect(
    isRoomBTabPreviewAfter(
      setTool({
        type: "item",
        item: { type: "block", config: { style: "organic" } },
      }),
      applyItemTool({
        roomId: roomB,
        blockPosition: { x: 3, y: 3, z: 0 },
        pointedAtItemJson: floor,
        preview: true,
        timestamp: 0,
      }),
    ),
  ).toBe(true);
});
