import { type Tagged } from "type-fest";

import { emptyArray } from "../../utils/empty";
import { entries, keys, valuesIter } from "../../utils/entries";
import { type Xy } from "../../utils/vectors/vectors";
import { type EditorRoomId, type EditorRoomItemId } from "../editorTypes";
import { type EditorRoomView } from "./EditorRoomView";
import { firstSubRoomId } from "./inPlaceMutators/firstSubRoomId";
import { type HoveredItem, type LevelEditorState } from "./levelEditorSlice";
import { type DragInProgress } from "./reducers/dragToMoveReducers";
import { startingRoomId } from "./startingRoomId";

/**
 * identifies an open room - the same room can be open more than once (eg in a
 * tab and in a dialog), each with its own framing and selection
 */
export type OpenRoomId = Tagged<string, "OpenRoomId">;

export type TabId = Tagged<string, "TabId">;

/**
 * a room open for viewing (and maybe editing): what is selected and hovered in
 * it, and how it is framed. Kept whether or not anything is drawing it now
 */
export type OpenRoom = {
  roomId: EditorRoomId;
  subRoomId: string;
  /**
   * whether it edits its room. Commands acting on the selection only act on
   * an editable open room's
   */
  editable: boolean;
  selectedJsonItemIds: EditorRoomItemId[];
  hoveredItem: HoveredItem | undefined;
  clickableAnnotationHovered: boolean;
  /**
   * what the pointer is dragging in it, if anything
   */
  dragInProgress: DragInProgress | undefined;
  /**
   * when set, the item context menu is shown at this position (scaled pixels,
   * in the room's projected screen space)
   */
  contextMenuXy: undefined | Xy;
  /**
   * the size of the pane drawing it, in css px
   */
  paneSize: Xy;
  /**
   * how the room is framed; undefined until it is first fitted
   */
  view: EditorRoomView | undefined;
};

/**
 * a tab of the room editing area, showing an open room
 */
export type Tab = {
  id: TabId;
  /**
   * opened by browsing to the room - the next room browsed to replaces it,
   * until the room is edited or the tab is pinned
   */
  isPreview: boolean;
  openRoomId: OpenRoomId;
};

export const newOpenRoom = (
  roomId: EditorRoomId,
  subRoomId: string,
  editable: boolean,
  selectedJsonItemIds: EditorRoomItemId[] = [],
): OpenRoom => ({
  roomId,
  subRoomId,
  editable,
  selectedJsonItemIds,
  hoveredItem: undefined,
  clickableAnnotationHovered: false,
  dragInProgress: undefined,
  contextMenuXy: undefined,
  paneSize: { x: 0, y: 0 },
  view: undefined,
});

/**
 * keep an open room in the store, under a new id
 */
export const addOpenRoomInPlace = (
  state: LevelEditorState,
  openRoom: OpenRoom,
): OpenRoomId => {
  const openRoomId = `openRoom${state.nextIdNumber++}` as OpenRoomId;
  state.openRooms[openRoomId] = openRoom;
  return openRoomId;
};

/**
 * an open room that must exist - its id comes from code that only runs while
 * it is open
 */
export const existingOpenRoom = (
  state: LevelEditorState,
  openRoomId: OpenRoomId,
): OpenRoom => {
  const openRoom = state.openRooms[openRoomId];
  if (import.meta.env.DEV && openRoom === undefined) {
    throw new Error(`room ${openRoomId} is not open`);
  }
  return openRoom;
};

/**
 * the cursor room's tab
 */
export const selectFrontTabFromLevelEditorState = (
  state: LevelEditorState,
): Tab => {
  const maybeFrontTab = findRoomTab(state, state.cursorRoomId);
  if (import.meta.env.DEV && maybeFrontTab === undefined) {
    throw new Error(`cursor room ${state.cursorRoomId} has no tab`);
  }
  return maybeFrontTab!;
};

/**
 * the open room of the front tab - the cursor room's
 */
export const selectFrontOpenRoomFromLevelEditorState = (
  state: LevelEditorState,
): OpenRoom =>
  existingOpenRoom(state, selectFrontTabFromLevelEditorState(state).openRoomId);

/**
 * the open rooms not shown in a tab - eg the teleporter dialog's
 */
const untabbedOpenRoomIds = (state: LevelEditorState): OpenRoomId[] => {
  const tabbedOpenRoomIds = new Set(
    state.tabs.map(({ openRoomId }) => openRoomId),
  );
  return keys(state.openRooms).filter(
    (openRoomId) => !tabbedOpenRoomIds.has(openRoomId),
  );
};

/**
 * the open room that commands and pointing act on: one open outside the tabs
 * (in a dialog, over the tabs) if there is one, otherwise the front tab's
 */
export const selectActiveOpenRoomIdFromLevelEditorState = (
  state: LevelEditorState,
): OpenRoomId =>
  untabbedOpenRoomIds(state).at(-1) ??
  selectFrontTabFromLevelEditorState(state).openRoomId;

export const selectActiveOpenRoomFromLevelEditorState = (
  state: LevelEditorState,
): OpenRoom =>
  existingOpenRoom(state, selectActiveOpenRoomIdFromLevelEditorState(state));

/**
 * the active open room, if it is the front tab's and edits its room
 */
export const selectActiveCursorRoomEditingOpenRoomFromLevelEditorState = (
  state: LevelEditorState,
): OpenRoom | undefined => {
  const activeOpenRoomId = selectActiveOpenRoomIdFromLevelEditorState(state);
  const activeOpenRoom = existingOpenRoom(state, activeOpenRoomId);
  return (
      activeOpenRoom.editable &&
        activeOpenRoomId ===
          selectFrontTabFromLevelEditorState(state).openRoomId
    ) ?
      activeOpenRoom
    : undefined;
};

export const selectOpenRoomSelectedJsonItemIdsFromLevelEditorState = (
  state: LevelEditorState,
  openRoomId: OpenRoomId,
): EditorRoomItemId[] => {
  const openRoom = state.openRooms[openRoomId];
  // check the room wasn't closed (in case we have a stale openRoomId reference)
  if (openRoom === undefined) {
    return emptyArray;
  }
  return openRoom.selectedJsonItemIds;
};

/**
 * the tabs' open rooms, in tab order
 */
export const tabOpenRoomsIter = (state: LevelEditorState) =>
  Iterator.from(state.tabs).map(({ openRoomId }) =>
    existingOpenRoom(state, openRoomId),
  );

/**
 * the tab showing a room, if it has one
 */
export const findRoomTab = (
  state: LevelEditorState,
  roomId: EditorRoomId,
): Tab | undefined =>
  state.tabs.find(
    ({ openRoomId }) => existingOpenRoom(state, openRoomId).roomId === roomId,
  );

/**
 * show a room in the front tab: its own tab if it has one, otherwise it takes
 * over the preview tab, or gets a new preview tab just after the front one
 */
export const showRoomInFrontTabInPlace = (
  state: LevelEditorState,
  roomId: EditorRoomId,
  subRoomId: string,
) => {
  const roomTab = findRoomTab(state, roomId);
  if (roomTab !== undefined) {
    existingOpenRoom(state, roomTab.openRoomId).subRoomId = subRoomId;
    state.cursorRoomId = roomId;
    return;
  }

  const openRoomId = addOpenRoomInPlace(
    state,
    newOpenRoom(roomId, subRoomId, true),
  );

  const previewTab = state.tabs.find(({ isPreview }) => isPreview);
  if (previewTab !== undefined) {
    delete state.openRooms[previewTab.openRoomId];
    previewTab.openRoomId = openRoomId;
    state.cursorRoomId = roomId;
    return;
  }

  const frontIndex = state.tabs.indexOf(
    selectFrontTabFromLevelEditorState(state),
  );
  const tab: Tab = {
    id: `tab${state.nextIdNumber++}` as TabId,
    isPreview: true,
    openRoomId,
  };
  state.tabs.splice(frontIndex + 1, 0, tab);
  state.cursorRoomId = roomId;
};

/**
 * open only this room, in a single pinned tab, closing every other
 */
export const openOnlyRoomInPlace = (
  state: LevelEditorState,
  roomId: EditorRoomId,
  subRoomId: string,
) => {
  state.openRooms = {};
  const openRoomId = addOpenRoomInPlace(
    state,
    newOpenRoom(roomId, subRoomId, true),
  );
  const tab: Tab = {
    id: `tab${state.nextIdNumber++}` as TabId,
    isPreview: false,
    openRoomId,
  };
  state.tabs = [tab];
  state.cursorRoomId = roomId;
};

/**
 * close a tab and the open room it shows; closing the front tab brings the
 * tab after it to the front, or before it if it was the last
 */
export const closeTabInPlace = (state: LevelEditorState, tabId: TabId) => {
  const closingIndex = state.tabs.findIndex(({ id }) => id === tabId);
  if (closingIndex === -1) {
    return;
  }
  const [closingTab] = state.tabs.splice(closingIndex, 1);
  const closingRoomId = existingOpenRoom(state, closingTab.openRoomId).roomId;
  delete state.openRooms[closingTab.openRoomId];
  if (state.cursorRoomId === closingRoomId) {
    const neighbourTab =
      state.tabs[closingIndex] ?? state.tabs[closingIndex - 1];
    if (neighbourTab !== undefined) {
      state.cursorRoomId = existingOpenRoom(
        state,
        neighbourTab.openRoomId,
      ).roomId;
    }
  }
};

/**
 * close the open rooms (and tabs) of rooms no longer in the campaign. With no
 * tab left, the campaign's starting room opens
 */
export const closeRoomsNotInCampaignInPlace = (state: LevelEditorState) => {
  const { rooms } = state.campaignInProgress;
  for (const tab of state.tabs.filter(
    ({ openRoomId }) => !(existingOpenRoom(state, openRoomId).roomId in rooms),
  )) {
    closeTabInPlace(state, tab.id);
  }
  for (const [openRoomId, openRoom] of entries(state.openRooms)) {
    if (!(openRoom.roomId in rooms)) {
      delete state.openRooms[openRoomId];
    }
  }
  if (state.tabs.length === 0) {
    const roomId = startingRoomId(state.campaignInProgress);
    openOnlyRoomInPlace(state, roomId, firstSubRoomId(rooms[roomId]));
  }
};

/**
 * clear what every open room has selected, hovered or open - eg after
 * restoring them from storage, where none of that is current
 */
export const resetOpenRoomsInteractionInPlace = (state: LevelEditorState) => {
  for (const openRoom of valuesIter(state.openRooms)) {
    openRoom.selectedJsonItemIds = [];
    openRoom.hoveredItem = undefined;
    openRoom.clickableAnnotationHovered = false;
    openRoom.dragInProgress = undefined;
    openRoom.contextMenuXy = undefined;
  }
};
