import {
  type PayloadAction,
  type SliceCaseReducers,
  type SliceSelectors,
} from "@reduxjs/toolkit";

import { emptyArray } from "../../../utils/empty";
import { type EditorRoomId } from "../../editorTypes";
import { focusTabInPlace } from "../inPlaceMutators/changeCurrentRoomInPlace";
import { commitPendingNudgeInPlace } from "../inPlaceMutators/commitPendingNudgeInPlace";
import { type LevelEditorState } from "../levelEditorSlice";
import {
  closeTabInPlace,
  deleteLayoutNodesInPlace,
  detachTabInPlace,
  existingLayoutNode,
  findLayoutNode,
  findRoomTab,
  frontTab,
  layoutNodesOfType,
  neighbourTabId,
  newOpenRoomInPlace,
  newTabGroupInPlace,
  newTabInPlace,
  type PaneSide,
  type PaneSplitId,
  putTabGroupBesideInPlace,
  selectFrontOpenRoomFromLevelEditorState,
  type TabGroupId,
  tabGroupsIter,
  type TabInGroup,
  tabOpenRoom,
} from "../PaneLayout";

export const roomTabsReducers = {
  /**
   * bring a tab to the front of its pane, and focus the pane
   */
  roomTabSelected(
    _state,
    { payload: { tabGroupId, tabId } }: PayloadAction<TabInGroup>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    focusTabInPlace(state, tabGroupId, tabId);
  },

  /**
   * a pane was used, so commands and browsing act in it from now on
   */
  tabGroupFocused(_state, { payload: tabGroupId }: PayloadAction<TabGroupId>) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    if (state.focusedTabGroupId !== tabGroupId) {
      focusTabInPlace(
        state,
        tabGroupId,
        existingLayoutNode(state.layout, tabGroupId).frontTabId,
      );
    }
  },

  /**
   * close a tab. The last tab of all can't be closed; closing the cursor
   * room's tab moves the cursor to the tab after it (or before it, if it was
   * the last) - or to another pane, if it was its pane's only tab
   */
  closeRoomTab(_state, { payload: tabInGroup }: PayloadAction<TabInGroup>) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    const { layout } = state;
    const { tabGroupId, tabId } = tabInGroup;

    if (layoutNodesOfType(layout, "tab").drop(1).next().done) {
      return;
    }

    const tabGroup = existingLayoutNode(layout, tabGroupId);
    const isCursorTab =
      tabGroupId === state.focusedTabGroupId && tabId === tabGroup.frontTabId;
    if (isCursorTab) {
      // move off first, so the closing room isn't the cursor room any more -
      // to the tab taking its place in the pane, if any:
      const maybeNeighbourTabId = neighbourTabId(tabGroup, tabId);
      if (maybeNeighbourTabId !== undefined) {
        focusTabInPlace(state, tabGroupId, maybeNeighbourTabId);
      } else {
        const [otherTabGroup] = tabGroupsIter(layout).filter(
          ({ id }) => id !== tabGroupId,
        );
        focusTabInPlace(state, otherTabGroup.id, otherTabGroup.frontTabId);
      }
    }

    closeTabInPlace(state, tabGroupId, tabId);
  },

  /**
   * close every tab in a pane but this one, focusing it
   */
  closeOtherRoomTabs(
    _state,
    { payload: tabInGroup }: PayloadAction<TabInGroup>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    const { tabGroupId, tabId } = tabInGroup;

    focusTabInPlace(state, tabGroupId, tabId);
    for (const otherTabId of existingLayoutNode(
      state.layout,
      tabGroupId,
    ).children.filter((id) => id !== tabId)) {
      closeTabInPlace(state, tabGroupId, otherTabId);
    }
  },

  /**
   * keep a tab open when other rooms are browsed to
   */
  pinRoomTab(_state, { payload: { tabId } }: PayloadAction<TabInGroup>) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    existingLayoutNode(state.layout, tabId).isPreview = false;
  },

  /**
   * rooms were edited, so their tabs, in every pane, stay open when other
   * rooms are browsed to
   */
  editedRoomsTabsPinned(
    _state,
    { payload: editedRoomIds }: PayloadAction<EditorRoomId[]>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    const { layout } = state;
    for (const tab of layoutNodesOfType(layout, "tab").filter(
      (tab) =>
        tab.isPreview &&
        editedRoomIds.includes(tabOpenRoom(layout, tab).roomId),
    )) {
      tab.isPreview = false;
    }
  },

  /**
   * a tab was dragged to a place among a pane's tabs - its own pane's, or
   * another's. A pane that already has a tab on the room keeps that one
   * instead. The pane it lands in is focused
   */
  roomTabMoved(
    _state,
    {
      payload: { tabInGroup, toTabGroupId, toIndex },
    }: PayloadAction<{
      tabInGroup: TabInGroup;
      toTabGroupId: TabGroupId;
      /**
       * where among the destination pane's tabs, before it moves
       */
      toIndex: number;
    }>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    const { layout } = state;
    const { tabGroupId: fromTabGroupId, tabId } = tabInGroup;
    const toTabGroup = existingLayoutNode(layout, toTabGroupId);

    if (fromTabGroupId === toTabGroupId) {
      const fromIndex = toTabGroup.children.indexOf(tabId);
      toTabGroup.children.splice(fromIndex, 1);
      toTabGroup.children.splice(
        fromIndex < toIndex ? toIndex - 1 : toIndex,
        0,
        tabId,
      );
      return;
    }

    // nudges being previewed are of the room in the pane being left:
    commitPendingNudgeInPlace(state);
    const tab = detachTabInPlace(state, fromTabGroupId, tabId);
    const roomTabAlreadyThere = findRoomTab(
      layout,
      toTabGroup,
      tabOpenRoom(layout, tab).roomId,
    );
    if (roomTabAlreadyThere !== undefined) {
      // the moved tab, with its open room, is dropped in favour of this one:
      deleteLayoutNodesInPlace(layout, tabId);
      focusTabInPlace(state, toTabGroupId, roomTabAlreadyThere.id);
      return;
    }
    toTabGroup.children.splice(toIndex, 0, tabId);
    focusTabInPlace(state, toTabGroupId, tabId);
  },

  /**
   * a tab was dragged to a side of a pane: it gets a pane of its own there,
   * splitting the space, and focused
   */
  roomTabDroppedBesidePane(
    _state,
    {
      payload: { tabInGroup, besideTabGroupId, side },
    }: PayloadAction<{
      tabInGroup: TabInGroup;
      besideTabGroupId: TabGroupId;
      side: PaneSide;
    }>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    const { tabGroupId: fromTabGroupId, tabId } = tabInGroup;

    if (
      fromTabGroupId === besideTabGroupId &&
      existingLayoutNode(state.layout, fromTabGroupId).children.length === 1
    ) {
      // splitting a pane's only tab off from itself leaves it as it was
      return;
    }

    // nudges being previewed are of the room in the pane being left:
    commitPendingNudgeInPlace(state);
    detachTabInPlace(state, fromTabGroupId, tabId);
    const { id: newTabGroupId } = newTabGroupInPlace(state, tabId);
    putTabGroupBesideInPlace(state, besideTabGroupId, side, newTabGroupId);
    focusTabInPlace(state, newTabGroupId, tabId);
  },

  /**
   * open a tab's room again in a new pane beside its own, viewed from the
   * same angle, and focus it
   */
  roomTabSplit(
    _state,
    {
      payload: { tabInGroup, side },
    }: PayloadAction<{ tabInGroup: TabInGroup; side: PaneSide }>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    const { tabGroupId, tabId } = tabInGroup;
    const { roomId, subRoomId, cameraAngle } = tabOpenRoom(
      state.layout,
      existingLayoutNode(state.layout, tabId),
    );
    const { id: openRoomId } = newOpenRoomInPlace(
      state,
      roomId,
      subRoomId,
      cameraAngle,
    );
    const { id: newTabId } = newTabInPlace(state, openRoomId, false);
    const { id: newTabGroupId } = newTabGroupInPlace(state, newTabId);
    putTabGroupBesideInPlace(state, tabGroupId, side, newTabGroupId);
    focusTabInPlace(state, newTabGroupId, newTabId);
  },

  /**
   * the panes of a split were resized
   */
  paneSplitResized(
    _state,
    {
      payload: { paneSplitId, sizes },
    }: PayloadAction<{
      paneSplitId: PaneSplitId;
      /**
       * each child's share of the split, in percent, in child order
       */
      sizes: number[];
    }>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    existingLayoutNode(state.layout, paneSplitId).sizes = sizes;
  },
} satisfies SliceCaseReducers<LevelEditorState>;

export const roomTabsSelectors = {
  selectFrontOpenRoomId: (state: LevelEditorState) =>
    selectFrontOpenRoomFromLevelEditorState(state).id,
  /**
   * the node the layout divides from - its one pane, or its outermost split
   */
  selectPaneLayoutRootId: ({ layout: { rootId } }: LevelEditorState) => rootId,
  /**
   * whether the room editing area is a single pane, undivided
   */
  selectIsOnlyPane: ({ layout }: LevelEditorState) =>
    existingLayoutNode(layout, layout.rootId).type === "tabGroup",
  /**
   * every pane's tab group, in layout order - a new array every call
   */
  selectTabGroups: ({ layout }: LevelEditorState) =>
    tabGroupsIter(layout).toArray(),
  selectFocusedTabGroupId: ({ focusedTabGroupId }: LevelEditorState) =>
    focusedTabGroupId,
  /**
   * the open room in front of a pane - undefined once the pane has left the
   * layout (in case we have a stale tabGroupId reference)
   */
  selectTabGroupFrontOpenRoomId(
    { layout }: LevelEditorState,
    tabGroupId: TabGroupId,
  ) {
    const tabGroup = findLayoutNode(layout, tabGroupId);
    if (tabGroup === undefined) {
      return undefined;
    }
    const {
      children: [frontOpenRoomId],
    } = frontTab(layout, tabGroup);
    return frontOpenRoomId;
  },
  /**
   * the room each of a pane's tabs shows, in tab order - a new array every
   * call, so compare by value when subscribing
   */
  selectTabGroupRoomIds(
    { layout }: LevelEditorState,
    tabGroupId: TabGroupId,
  ): EditorRoomId[] {
    const tabGroup = findLayoutNode(layout, tabGroupId);
    // check the pane wasn't closed (in case we have a stale tabGroupId reference)
    if (tabGroup === undefined) {
      return emptyArray;
    }
    return tabGroup.children.map(
      (tabId) => tabOpenRoom(layout, existingLayoutNode(layout, tabId)).roomId,
    );
  },
} satisfies SliceSelectors<LevelEditorState>;
