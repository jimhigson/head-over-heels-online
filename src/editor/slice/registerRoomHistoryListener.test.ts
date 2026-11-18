import { configureStore } from "@reduxjs/toolkit";
import { produce } from "immer";
import { afterEach, beforeEach, expect, test } from "vitest";

import { listenerMiddleware } from "../../store/listenerMiddleware";
import { type EditorRoomId } from "../editorTypes";
import {
  changeToRoom,
  levelEditorSlice,
  roomBack,
  roomTabDropped,
  roomTabSelected,
  roomTabSplit,
  selectHistoryRoomsBackwards,
  selectHistoryRoomsForwards,
} from "./levelEditorSlice";
import {
  layoutNodesOfType,
  type TabGroupId,
  tabGroupsIter,
  type TabInGroup,
  tabOpenRoom,
} from "./PaneLayout";
import {
  editorStateWithOneRoomWithNoItems,
  testRoomId,
} from "./reducers/__test__/storeStates";
import { registerRoomHistoryListener } from "./registerRoomHistoryListener";

const roomB = "roomB" as EditorRoomId;
const roomC = "roomC" as EditorRoomId;

const baseState = produce(editorStateWithOneRoomWithNoItems, (draft) => {
  const { rooms } = draft.campaignInProgress;
  for (const roomId of [roomB, roomC]) {
    rooms[roomId] = { ...rooms[testRoomId], id: roomId };
  }
});

const newStore = () =>
  configureStore({
    reducer: { levelEditor: levelEditorSlice.reducer },
    preloadedState: { levelEditor: baseState },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  });

/**
 * the tab showing a room, in the pane that isn't `notInTabGroupId` (if given)
 */
const roomTab = (
  store: ReturnType<typeof newStore>,
  roomId: EditorRoomId,
  notInTabGroupId?: TabGroupId,
): TabInGroup => {
  const { layout } = store.getState().levelEditor;
  for (const tabGroup of tabGroupsIter(layout)) {
    if (tabGroup.id === notInTabGroupId) {
      continue;
    }
    const tab = layoutNodesOfType(layout, "tab").find(
      (candidate) =>
        tabGroup.children.includes(candidate.id) &&
        tabOpenRoom(layout, candidate).roomId === roomId,
    );
    if (tab !== undefined) {
      return { tabGroupId: tabGroup.id, tabId: tab.id };
    }
  }
  throw new Error(`no tab for ${roomId}`);
};

let unsubscribe: () => void;
beforeEach(() => {
  unsubscribe = registerRoomHistoryListener();
});
afterEach(() => {
  unsubscribe();
});

test("changing room records the room left", () => {
  const store = newStore();

  store.dispatch(changeToRoom(roomB));

  expect(selectHistoryRoomsBackwards(store.getState())).toEqual([testRoomId]);
});

test("changing room again after going back leaves nothing forward", () => {
  const store = newStore();
  store.dispatch(changeToRoom(roomB));
  store.dispatch(roomBack());

  store.dispatch(changeToRoom(roomC));

  expect(selectHistoryRoomsForwards(store.getState())).toEqual([]);
});

test("dragging the focused pane's front tab into another pane leaves the room history as it was", () => {
  const store = newStore();
  // pane A: the test room and roomB; pane B, split off: roomB again:
  store.dispatch(changeToRoom(roomB));
  store.dispatch(
    roomTabSplit({ tabInGroup: roomTab(store, roomB), side: "right" }),
  );
  // the split pane is focused:
  const paneB = store.getState().levelEditor.focusedTabGroupId;
  // back to the test room, in front of pane A:
  store.dispatch(roomTabSelected(roomTab(store, testRoomId, paneB)));

  // the test room's tab, dragged into pane B - still showing the test room:
  store.dispatch(
    roomTabDropped({
      dragged: { type: "tab", tabInGroup: roomTab(store, testRoomId, paneB) },
      toTabGroupId: paneB,
      toIndex: 0,
    }),
  );

  expect(selectHistoryRoomsBackwards(store.getState())).toEqual([
    testRoomId,
    roomB,
  ]);
});
