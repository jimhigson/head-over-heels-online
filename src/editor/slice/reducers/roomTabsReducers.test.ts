import { produce } from "immer";
import { expect, test } from "vitest";

import {
  type EditorJsonItemUnion,
  type EditorRoomId,
  type EditorRoomItemId,
} from "../../editorTypes";
import {
  selectCursorRoomIdFromLevelEditorState,
  selectCursorRoomSelectedJsonItemIdsFromLevelEditorState,
} from "../levelEditorSelectors";
import {
  changeToRoom,
  closeOtherRoomTabs,
  closeRoomTab,
  deleteSelected,
  type LevelEditorState,
  pinRoomTab,
  removeRoom,
  selectTabRoomIds,
  selectTabs,
  setSelectedItemsInRoom,
} from "../levelEditorSlice";
import {
  editorStateWithOneRoomWithNoItems,
  reduceLevelEditorActions,
  testRoomId,
} from "./__test__/storeStates";

const roomB = "roomB" as EditorRoomId;
const roomC = "roomC" as EditorRoomId;
const blockId = "block" as EditorRoomItemId;

const block: EditorJsonItemUnion = {
  type: "block",
  config: { style: "organic" },
  position: { x: 1, y: 1, z: 0 },
};

const baseState = produce(editorStateWithOneRoomWithNoItems, (draft) => {
  const { rooms } = draft.campaignInProgress;
  rooms[testRoomId].items[blockId] = block;
  for (const roomId of [roomB, roomC]) {
    rooms[roomId] = { ...rooms[testRoomId], id: roomId };
  }
});

type TabSummary = { roomId: EditorRoomId; isPreview: boolean };

const tabsOf = (state: LevelEditorState): TabSummary[] => {
  const tabRoomIds = selectTabRoomIds({ levelEditor: state });
  return selectTabs({ levelEditor: state }).map(({ isPreview }, tabIndex) => ({
    roomId: tabRoomIds[tabIndex],
    isPreview,
  }));
};

test("browsing to a room opens it in a preview tab after the current one", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(state0, changeToRoom(roomB));

  expect<TabSummary[]>(tabsOf(state1)).toEqual([
    { roomId: testRoomId, isPreview: false },
    { roomId: roomB, isPreview: true },
  ]);
});

test("browsing to another room replaces the preview tab", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(
    state0,
    changeToRoom(roomB),
    changeToRoom(roomC),
  );

  expect<TabSummary[]>(tabsOf(state1)).toEqual([
    { roomId: testRoomId, isPreview: false },
    { roomId: roomC, isPreview: true },
  ]);
});

test("browsing to an open room switches to its tab", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(
    state0,
    changeToRoom(roomB),
    changeToRoom(testRoomId),
  );

  expect(tabsOf(state1).map(({ roomId }) => roomId)).toEqual([
    testRoomId,
    roomB,
  ]);
});

test("a pinned tab stays when browsing on", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(
    state0,
    changeToRoom(roomB),
    pinRoomTab(roomB),
    changeToRoom(roomC),
  );

  expect(tabsOf(state1).map(({ roomId }) => roomId)).toEqual([
    testRoomId,
    roomB,
    roomC,
  ]);
});

test("editing a room pins its tab", () => {
  const state0 = produce(baseState, (draft) => {
    draft.campaignInProgress.rooms[roomB].items[blockId] = block;
  });
  const state1 = reduceLevelEditorActions(
    state0,
    changeToRoom(roomB),
    setSelectedItemsInRoom({ jsonItemIds: [blockId] }),
    deleteSelected({ timestamp: 0 }),
  );

  expect(tabsOf(state1).find(({ roomId }) => roomId === roomB)?.isPreview).toBe(
    false,
  );
});

test("closing the active tab moves to the tab after it", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(
    state0,
    changeToRoom(roomB),
    pinRoomTab(roomB),
    changeToRoom(roomC),
    changeToRoom(roomB),
    closeRoomTab(roomB),
  );

  expect(selectCursorRoomIdFromLevelEditorState(state1)).toBe(roomC);
});

test("closing the last tab moves to the tab before it", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(
    state0,
    changeToRoom(roomB),
    closeRoomTab(roomB),
  );

  expect(selectCursorRoomIdFromLevelEditorState(state1)).toBe(testRoomId);
});

test("the only tab can't be closed", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(state0, closeRoomTab(testRoomId));

  expect(tabsOf(state1).map(({ roomId }) => roomId)).toEqual([testRoomId]);
});

test("each room keeps its own selection", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(
    state0,
    setSelectedItemsInRoom({ jsonItemIds: [blockId] }),
    changeToRoom(roomB),
    changeToRoom(testRoomId),
  );

  expect(
    selectCursorRoomSelectedJsonItemIdsFromLevelEditorState(state1),
  ).toEqual([blockId]);
});

test("deleting a room closes its tab", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(
    state0,
    changeToRoom(roomB),
    pinRoomTab(roomB),
    changeToRoom(testRoomId),
    removeRoom({ roomId: roomB }),
  );

  expect(tabsOf(state1).map(({ roomId }) => roomId)).toEqual([testRoomId]);
});

test("closing other tabs leaves just the room's own, switched to", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(
    state0,
    changeToRoom(roomB),
    pinRoomTab(roomB),
    changeToRoom(roomC),
    closeOtherRoomTabs(roomB),
  );

  expect({
    cursorRoomId: selectCursorRoomIdFromLevelEditorState(state1),
    tabRoomIds: tabsOf(state1).map(({ roomId }) => roomId),
  }).toEqual({ cursorRoomId: roomB, tabRoomIds: [roomB] });
});
