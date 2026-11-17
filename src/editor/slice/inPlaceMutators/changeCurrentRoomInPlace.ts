import { type EditorRoomId } from "../../editorTypes";
import { selectCursorRoomIdFromLevelEditorState } from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";
import {
  existingLayoutNode,
  findRoomTab,
  frontTab,
  layoutNodesOfType,
  showRoomInFrontTabInPlace,
  type TabGroup,
  type TabGroupId,
  tabGroupsIter,
  type TabId,
  tabOpenRoom,
} from "../PaneLayout";
import { clearContextMenuXyInPlace } from "../reducers/contextMenuReducers";
import { commitPendingNudgeInPlace } from "./commitPendingNudgeInPlace";
import { firstSubRoomId } from "./firstSubRoomId";

/**
 * the cursor moving to another room, or to another pane: `show` puts the room
 * in front in its pane, then the room becomes the map's selection
 */
const moveCursorInPlace = (
  state: LevelEditorState,
  roomId: EditorRoomId,
  noPushToHistory: boolean,
  show: () => void,
) => {
  // nudges being previewed are of the room being left:
  commitPendingNudgeInPlace(state);

  if (!noPushToHistory) {
    state.editingRoomIdHistory.back.push(
      selectCursorRoomIdFromLevelEditorState(state),
    );
  }
  for (const openRoom of layoutNodesOfType(state.layout, "openRoom")) {
    openRoom.clickableAnnotationHovered = false;
    openRoom.hoveredItem = undefined;
  }
  show();
  state.selectedRoomIds = [roomId];
  state.hoveredUndoIndex = 0;
  clearContextMenuXyInPlace(state);
};

export const changeCurrentRoomInPlace = (
  state: LevelEditorState,
  roomId: EditorRoomId,
  subRoomId?: string,
  noPushToHistory = false,
) => {
  const roomJson = state.campaignInProgress.rooms[roomId];
  if (!roomJson) {
    console.warn(`can't change to room ${roomId} - it doesn't exist`);
    return;
  }

  const resolvedSubRoomId = subRoomId ?? firstSubRoomId(roomJson);

  if (subRoomId !== undefined && subRoomId !== "*") {
    const subRooms = roomJson.meta?.subRooms;
    if (!subRooms || !(subRoomId in subRooms)) {
      throw new Error(
        `subRoom "${subRoomId}" does not exist in room "${roomId}"`,
      );
    }
  }

  const { layout } = state;
  const showsRoomInFront = (tabGroup: TabGroup) =>
    tabOpenRoom(layout, frontTab(layout, tabGroup)).roomId === roomId;
  const hasRoomTab = (tabGroup: TabGroup) =>
    findRoomTab(layout, tabGroup, roomId) !== undefined;
  const focusedTabGroup = existingLayoutNode(layout, state.focusedTabGroupId);
  const focusedPaneFirst = (predicate: (tabGroup: TabGroup) => boolean) =>
    predicate(focusedTabGroup) ? focusedTabGroup : (
      tabGroupsIter(layout).find(predicate)
    );
  // a room already open in a tab is switched to, not opened again - a pane
  // already showing it first, then any pane with a tab for it:
  const tabGroupWithRoom =
    focusedPaneFirst(showsRoomInFront) ?? focusedPaneFirst(hasRoomTab);
  moveCursorInPlace(state, roomId, noPushToHistory, () => {
    if (tabGroupWithRoom !== undefined) {
      state.focusedTabGroupId = tabGroupWithRoom.id;
    }
    showRoomInFrontTabInPlace(state, roomId, resolvedSubRoomId);
  });
};

/**
 * bring a tab to the front of its pane, and focus the pane - its room
 * becomes the cursor room
 */
export const focusTabInPlace = (
  state: LevelEditorState,
  tabGroupId: TabGroupId,
  tabId: TabId,
) => {
  const { layout } = state;
  const tabGroup = existingLayoutNode(layout, tabGroupId);
  const { roomId } = tabOpenRoom(layout, existingLayoutNode(layout, tabId));
  // moving between panes on the same room isn't a step in the room history:
  const isSameRoom = roomId === selectCursorRoomIdFromLevelEditorState(state);
  moveCursorInPlace(state, roomId, isSameRoom, () => {
    state.focusedTabGroupId = tabGroupId;
    tabGroup.frontTabId = tabId;
  });
};
