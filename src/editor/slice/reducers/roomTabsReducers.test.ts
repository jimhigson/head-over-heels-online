import { produce } from "immer";
import { expect, test } from "vitest";

import {
  type EditorJsonItemUnion,
  type EditorRoomId,
  type EditorRoomItemId,
} from "../../editorTypes";
import { selectCursorRoomSelectedJsonItemIdsFromLevelEditorState } from "../levelEditorSelectors";
import {
  changeToRoom,
  closeOtherRoomTabs,
  closeRoomTab,
  deleteSelected,
  type LevelEditorState,
  pinRoomTab,
  removeRoom,
  selectOpenRoomTabs,
  setSelectedItemsInRoom,
} from "../levelEditorSlice";
import { type RoomTab } from "../RoomTab";
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

const tabsOf = (state: LevelEditorState): RoomTab[] =>
  selectOpenRoomTabs({ levelEditor: state });

test("browsing to a room opens it in a preview tab after the current one", () => {
  const state = reduceLevelEditorActions(baseState, changeToRoom(roomB));

  expect<RoomTab[]>(tabsOf(state)).toEqual([
    { roomId: testRoomId, isPreview: false, view: undefined },
    { roomId: roomB, isPreview: true, view: undefined },
  ]);
});

test("browsing to another room replaces the preview tab", () => {
  const state = reduceLevelEditorActions(
    baseState,
    changeToRoom(roomB),
    changeToRoom(roomC),
  );

  expect<RoomTab[]>(tabsOf(state)).toEqual([
    { roomId: testRoomId, isPreview: false, view: undefined },
    { roomId: roomC, isPreview: true, view: undefined },
  ]);
});

test("browsing to an open room switches to its tab", () => {
  const state = reduceLevelEditorActions(
    baseState,
    changeToRoom(roomB),
    changeToRoom(testRoomId),
  );

  expect(tabsOf(state).map(({ roomId }) => roomId)).toEqual([
    testRoomId,
    roomB,
  ]);
});

test("a pinned tab stays when browsing on", () => {
  const state = reduceLevelEditorActions(
    baseState,
    changeToRoom(roomB),
    pinRoomTab(roomB),
    changeToRoom(roomC),
  );

  expect(tabsOf(state).map(({ roomId }) => roomId)).toEqual([
    testRoomId,
    roomB,
    roomC,
  ]);
});

test("editing a room pins its tab", () => {
  const state = reduceLevelEditorActions(
    produce(baseState, (draft) => {
      draft.campaignInProgress.rooms[roomB].items[blockId] = block;
    }),
    changeToRoom(roomB),
    setSelectedItemsInRoom({ jsonItemIds: [blockId] }),
    deleteSelected({ timestamp: 0 }),
  );

  expect(tabsOf(state).find(({ roomId }) => roomId === roomB)?.isPreview).toBe(
    false,
  );
});

test("closing the active tab moves to the tab after it", () => {
  const state = reduceLevelEditorActions(
    baseState,
    changeToRoom(roomB),
    pinRoomTab(roomB),
    changeToRoom(roomC),
    changeToRoom(roomB),
    closeRoomTab(roomB),
  );

  expect(state.cursorRoom.roomId).toBe(roomC);
});

test("closing the last tab moves to the tab before it", () => {
  const state = reduceLevelEditorActions(
    baseState,
    changeToRoom(roomB),
    closeRoomTab(roomB),
  );

  expect(state.cursorRoom.roomId).toBe(testRoomId);
});

test("the only tab can't be closed", () => {
  const state = reduceLevelEditorActions(baseState, closeRoomTab(testRoomId));

  expect(tabsOf(state).map(({ roomId }) => roomId)).toEqual([testRoomId]);
});

test("each room keeps its own selection", () => {
  const state = reduceLevelEditorActions(
    baseState,
    setSelectedItemsInRoom({ jsonItemIds: [blockId] }),
    changeToRoom(roomB),
    changeToRoom(testRoomId),
  );

  expect(
    selectCursorRoomSelectedJsonItemIdsFromLevelEditorState(state),
  ).toEqual([blockId]);
});

test("deleting a room closes its tab", () => {
  const state = reduceLevelEditorActions(
    baseState,
    changeToRoom(roomB),
    pinRoomTab(roomB),
    changeToRoom(testRoomId),
    removeRoom({ roomId: roomB }),
  );

  expect(tabsOf(state).map(({ roomId }) => roomId)).toEqual([testRoomId]);
});

test("closing other tabs leaves just the room's own, switched to", () => {
  const state = reduceLevelEditorActions(
    baseState,
    changeToRoom(roomB),
    pinRoomTab(roomB),
    changeToRoom(roomC),
    closeOtherRoomTabs(roomB),
  );

  expect({
    cursorRoomId: state.cursorRoom.roomId,
    tabRoomIds: tabsOf(state).map(({ roomId }) => roomId),
  }).toEqual({ cursorRoomId: roomB, tabRoomIds: [roomB] });
});
