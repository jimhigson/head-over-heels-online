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
  type LevelEditorState,
  pinRoomTab,
  removeRoom,
  roomTabDroppedBesidePane,
  roomTabMoved,
  roomTabSplit,
  setSelectedItemsInRoom,
  tabGroupFocused,
} from "../levelEditorSlice";
import {
  existingLayoutNode,
  frontTab,
  layoutNodesOfType,
  type SplitDirection,
  tabGroupsIter,
  tabGroupTabs,
  type TabInGroup,
  tabOpenRoom,
} from "../PaneLayout";
import {
  editorStateWithOneRoomWithNoItems,
  reduceLevelEditorActions,
  testRoomId,
  testTabGroupId,
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

/**
 * the focused pane's tabs
 */
const tabsOf = ({
  layout,
  focusedTabGroupId,
}: LevelEditorState): TabSummary[] =>
  tabGroupTabs(layout, existingLayoutNode(layout, focusedTabGroupId)).map(
    (tab) => ({
      roomId: tabOpenRoom(layout, tab).roomId,
      isPreview: tab.isPreview,
    }),
  );

/**
 * the tab showing a room in the focused pane
 */
const focusedPaneTabOf = (
  { layout, focusedTabGroupId }: LevelEditorState,
  roomId: EditorRoomId,
): TabInGroup => {
  const [tab] = tabGroupTabs(
    layout,
    existingLayoutNode(layout, focusedTabGroupId),
  ).filter((tab) => tabOpenRoom(layout, tab).roomId === roomId);
  return { tabGroupId: focusedTabGroupId, tabId: tab.id };
};

type LayoutSummary = {
  direction: SplitDirection | undefined;
  /**
   * each pane's tabs' rooms, in layout order
   */
  paneRoomIds: EditorRoomId[][];
};

const layoutOf = ({ layout }: LevelEditorState): LayoutSummary => {
  const root = existingLayoutNode(layout, layout.rootId);
  return {
    direction: root.type === "split" ? root.direction : undefined,
    paneRoomIds: tabGroupsIter(layout)
      .map((tabGroup) =>
        tabGroupTabs(layout, tabGroup).map(
          (tab) => tabOpenRoom(layout, tab).roomId,
        ),
      )
      .toArray(),
  };
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
  const state1 = reduceLevelEditorActions(state0, changeToRoom(roomB));
  const state2 = reduceLevelEditorActions(
    state1,
    pinRoomTab(focusedPaneTabOf(state1, roomB)),
    changeToRoom(roomC),
  );

  expect(tabsOf(state2).map(({ roomId }) => roomId)).toEqual([
    testRoomId,
    roomB,
    roomC,
  ]);
});

test("closing the active tab moves to the tab after it", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(state0, changeToRoom(roomB));
  const state2 = reduceLevelEditorActions(
    state1,
    pinRoomTab(focusedPaneTabOf(state1, roomB)),
    changeToRoom(roomC),
    changeToRoom(roomB),
  );
  const state3 = reduceLevelEditorActions(
    state2,
    closeRoomTab(focusedPaneTabOf(state2, roomB)),
  );

  expect(selectCursorRoomIdFromLevelEditorState(state3)).toBe(roomC);
});

test("closing the active tab keeps focus in its pane, though another pane shows the next tab's room", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(state0, changeToRoom(roomB));
  const state2 = reduceLevelEditorActions(
    state1,
    pinRoomTab(focusedPaneTabOf(state1, roomB)),
    changeToRoom(testRoomId),
  );
  const state3 = reduceLevelEditorActions(
    state2,
    roomTabSplit({
      tabInGroup: focusedPaneTabOf(state2, roomB),
      side: "right",
    }),
    tabGroupFocused(testTabGroupId),
  );
  const state4 = reduceLevelEditorActions(
    state3,
    closeRoomTab(focusedPaneTabOf(state3, testRoomId)),
  );

  expect({
    isOriginalPaneFocused: state4.focusedTabGroupId === testTabGroupId,
    cursorRoomId: selectCursorRoomIdFromLevelEditorState(state4),
  }).toEqual({ isOriginalPaneFocused: true, cursorRoomId: roomB });
});

test("closing the last tab moves to the tab before it", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(state0, changeToRoom(roomB));
  const state2 = reduceLevelEditorActions(
    state1,
    closeRoomTab(focusedPaneTabOf(state1, roomB)),
  );

  expect(selectCursorRoomIdFromLevelEditorState(state2)).toBe(testRoomId);
});

test("the only tab can't be closed", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(
    state0,
    closeRoomTab(focusedPaneTabOf(state0, testRoomId)),
  );

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
  const state1 = reduceLevelEditorActions(state0, changeToRoom(roomB));
  const state2 = reduceLevelEditorActions(
    state1,
    pinRoomTab(focusedPaneTabOf(state1, roomB)),
    changeToRoom(testRoomId),
    removeRoom({ roomId: roomB }),
  );

  expect(tabsOf(state2).map(({ roomId }) => roomId)).toEqual([testRoomId]);
});

test("closing other tabs leaves just the room's own, switched to", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(state0, changeToRoom(roomB));
  const state2 = reduceLevelEditorActions(
    state1,
    pinRoomTab(focusedPaneTabOf(state1, roomB)),
    changeToRoom(roomC),
  );
  const state3 = reduceLevelEditorActions(
    state2,
    closeOtherRoomTabs(focusedPaneTabOf(state2, roomB)),
  );

  expect({
    cursorRoomId: selectCursorRoomIdFromLevelEditorState(state3),
    tabRoomIds: tabsOf(state3).map(({ roomId }) => roomId),
  }).toEqual({ cursorRoomId: roomB, tabRoomIds: [roomB] });
});

test("splitting a tab opens its room again in a new pane beside it", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(
    state0,
    roomTabSplit({
      tabInGroup: focusedPaneTabOf(state0, testRoomId),
      side: "right",
    }),
  );

  expect<LayoutSummary>(layoutOf(state1)).toEqual<LayoutSummary>({
    direction: "|",
    paneRoomIds: [[testRoomId], [testRoomId]],
  });
});

test("a split pane has an open room of its own, and is focused", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(
    state0,
    setSelectedItemsInRoom({ jsonItemIds: [blockId] }),
    roomTabSplit({
      tabInGroup: focusedPaneTabOf(state0, testRoomId),
      side: "bottom",
    }),
  );

  expect({
    isOriginalPaneFocused: state1.focusedTabGroupId === testTabGroupId,
    cursorSelection:
      selectCursorRoomSelectedJsonItemIdsFromLevelEditorState(state1),
  }).toEqual({ isOriginalPaneFocused: false, cursorSelection: [] });
});

test("browsing opens rooms in the focused pane only", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(
    state0,
    roomTabSplit({
      tabInGroup: focusedPaneTabOf(state0, testRoomId),
      side: "right",
    }),
    changeToRoom(roomB),
  );

  expect<LayoutSummary>(layoutOf(state1)).toEqual<LayoutSummary>({
    direction: "|",
    paneRoomIds: [[testRoomId], [testRoomId, roomB]],
  });
});

test("focusing a pane makes its front tab's room the cursor room", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(
    state0,
    roomTabSplit({
      tabInGroup: focusedPaneTabOf(state0, testRoomId),
      side: "right",
    }),
    changeToRoom(roomB),
    tabGroupFocused(testTabGroupId),
  );

  expect(selectCursorRoomIdFromLevelEditorState(state1)).toBe(testRoomId);
});

test("browsing to a room in another pane's background tab switches to it there", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(state0, changeToRoom(roomB));
  const state2 = reduceLevelEditorActions(
    state1,
    pinRoomTab(focusedPaneTabOf(state1, roomB)),
    changeToRoom(testRoomId),
  );
  const state3 = reduceLevelEditorActions(
    state2,
    roomTabSplit({
      tabInGroup: focusedPaneTabOf(state2, testRoomId),
      side: "right",
    }),
    changeToRoom(roomB),
  );

  expect({
    isOriginalPaneFocused: state3.focusedTabGroupId === testTabGroupId,
    cursorRoomId: selectCursorRoomIdFromLevelEditorState(state3),
    layout: layoutOf(state3),
  }).toEqual({
    isOriginalPaneFocused: true,
    cursorRoomId: roomB,
    layout: {
      direction: "|",
      paneRoomIds: [[testRoomId, roomB], [testRoomId]],
    },
  });
});

test("closing a pane's only tab removes the pane", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(
    state0,
    roomTabSplit({
      tabInGroup: focusedPaneTabOf(state0, testRoomId),
      side: "right",
    }),
  );
  const state2 = reduceLevelEditorActions(
    state1,
    closeRoomTab(focusedPaneTabOf(state1, testRoomId)),
  );

  expect<LayoutSummary>(layoutOf(state2)).toEqual<LayoutSummary>({
    direction: undefined,
    paneRoomIds: [[testRoomId]],
  });
});

test("dropping a tab beside a pane moves it to a new pane there", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(state0, changeToRoom(roomB));
  const state2 = reduceLevelEditorActions(
    state1,
    roomTabDroppedBesidePane({
      tabInGroup: focusedPaneTabOf(state1, roomB),
      besideTabGroupId: testTabGroupId,
      side: "bottom",
    }),
  );

  expect<LayoutSummary>(layoutOf(state2)).toEqual<LayoutSummary>({
    direction: "-",
    paneRoomIds: [[testRoomId], [roomB]],
  });
});

test("dropping a tab among another pane's tabs moves it there", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(state0, changeToRoom(roomB));
  const state2 = reduceLevelEditorActions(
    state1,
    roomTabDroppedBesidePane({
      tabInGroup: focusedPaneTabOf(state1, roomB),
      besideTabGroupId: testTabGroupId,
      side: "bottom",
    }),
  );
  const state3 = reduceLevelEditorActions(
    state2,
    roomTabMoved({
      tabInGroup: focusedPaneTabOf(state2, roomB),
      toTabGroupId: testTabGroupId,
      toIndex: 0,
    }),
  );

  expect<LayoutSummary>(layoutOf(state3)).toEqual<LayoutSummary>({
    direction: undefined,
    paneRoomIds: [[roomB, testRoomId]],
  });
});

test("dragging a tab along its own pane's tabs reorders them", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(state0, changeToRoom(roomB));
  const state2 = reduceLevelEditorActions(
    state1,
    pinRoomTab(focusedPaneTabOf(state1, roomB)),
    changeToRoom(roomC),
  );
  const state3 = reduceLevelEditorActions(
    state2,
    roomTabMoved({
      tabInGroup: focusedPaneTabOf(state2, roomC),
      toTabGroupId: testTabGroupId,
      toIndex: 0,
    }),
  );

  expect(tabsOf(state3).map(({ roomId }) => roomId)).toEqual([
    roomC,
    testRoomId,
    roomB,
  ]);
});

test("a pane already showing a room keeps its own tab when the room's tab is dropped among its tabs", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(
    state0,
    roomTabSplit({
      tabInGroup: focusedPaneTabOf(state0, testRoomId),
      side: "right",
    }),
  );
  const state2 = reduceLevelEditorActions(
    state1,
    roomTabMoved({
      tabInGroup: focusedPaneTabOf(state1, testRoomId),
      toTabGroupId: testTabGroupId,
      toIndex: 1,
    }),
  );

  expect({
    layout: layoutOf(state2),
    openRoomCount: layoutNodesOfType(state2.layout, "openRoom").toArray()
      .length,
  }).toEqual({
    layout: { direction: undefined, paneRoomIds: [[testRoomId]] },
    openRoomCount: 1,
  });
});

test("browsing to a room already in front of another pane focuses that pane, switching no tabs", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(
    state0,
    roomTabSplit({
      tabInGroup: focusedPaneTabOf(state0, testRoomId),
      side: "right",
    }),
    changeToRoom(roomB),
  );
  const { focusedTabGroupId: splitTabGroupId } = state1;
  const state2 = reduceLevelEditorActions(state1, changeToRoom(testRoomId));

  const { layout } = state2;
  const splitPaneFrontOpenRoom = tabOpenRoom(
    layout,
    frontTab(layout, existingLayoutNode(layout, splitTabGroupId)),
  );

  expect({
    focusedTabGroupId: state2.focusedTabGroupId,
    splitPaneFrontRoomId: splitPaneFrontOpenRoom.roomId,
  }).toEqual({
    focusedTabGroupId: testTabGroupId,
    splitPaneFrontRoomId: roomB,
  });
});
