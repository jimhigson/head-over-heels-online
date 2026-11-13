import { type Tagged } from "type-fest";

import { emptyArray } from "../../utils/empty";
import { valuesIter } from "../../utils/entries";
import { omit } from "../../utils/pick";
import { type EditorRoomId, type EditorRoomItemId } from "../editorTypes";
import { firstSubRoomId } from "./inPlaceMutators/firstSubRoomId";
import { newIdInPlace } from "./inPlaceMutators/newIdInPlace";
import { type LevelEditorState } from "./levelEditorSlice";
import { type OpenRoom, openRoomDefaults, type OpenRoomId } from "./OpenRoom";
import { startingRoomId } from "./startingRoomId";

export type TabId = Tagged<`tab-${string}`, "TabId">;
export type TabGroupId = Tagged<`tabGroup-${string}`, "TabGroupId">;
export type PaneSplitId = Tagged<`split-${string}`, "PaneSplitId">;

/**
 * a tab of the room editing area, showing an open room
 */
export type Tab = {
  type: "tab";
  id: TabId;
  /**
   * opened by browsing to the room - the next room browsed to replaces it,
   * until the room is edited or the tab is pinned
   */
  isPreview: boolean;
  /**
   * the open room the tab shows - a tab always shows exactly one
   */
  children: [OpenRoomId];
};

/**
 * a pane of the room editing area: a row of tabs, one of them in front and
 * drawn. A room has at most one tab in a group
 */
export type TabGroup = {
  type: "tabGroup";
  id: TabGroupId;
  children: TabId[];
  frontTabId: TabId;
};

/**
 * how a split lays out its children, drawn as the divider between them:
 *
 * "|" side by side
 * "-" one above another
 */
export type SplitDirection = "-" | "|";

/**
 * part of the room editing area divided between two or more panes (or
 * further splits)
 */
export type PaneSplit = {
  type: "split";
  id: PaneSplitId;
  direction: SplitDirection;
  children: PaneLayoutNodeId[];
  /**
   * each child's share of the split, in percent, in child order
   */
  sizes: number[];
};

/**
 * a node dividing the room editing area: a split, or a pane
 */
export type PaneLayoutNode = PaneSplit | TabGroup;
export type PaneLayoutNodeId = PaneLayoutNode["id"];

export type LayoutNode = OpenRoom | PaneLayoutNode | Tab;
export type LayoutNodeId = LayoutNode["id"];
/**
 * the type of node an id is tagged for
 */
type LayoutNodeForId<Id extends LayoutNodeId> = Extract<LayoutNode, { id: Id }>;

/**
 * how the room editing area is divided into panes, and the open rooms shown
 * in them (or by themselves, eg in a dialog). Nodes refer to their children by
 * id, so a change to one node leaves every other node as it was
 */
export type PaneLayout = {
  rootId: PaneLayoutNodeId;
  nodes: Record<LayoutNodeId, LayoutNode>;
};

/**
 * the side of a pane something is put beside
 */
export type PaneSide = "bottom" | "left" | "right" | "top";

/**
 * a tab, and the pane (tab group) it is in
 */
export type TabInGroup = { tabGroupId: TabGroupId; tabId: TabId };

/**
 * a node - undefined once it has left the layout (in case we have a stale id
 * reference)
 */
export const findLayoutNode = <Id extends LayoutNodeId>(
  { nodes }: PaneLayout,
  id: Id,
): LayoutNodeForId<Id> | undefined =>
  // nodes are kept under their own id, which is tagged for their type:
  nodes[id] as LayoutNodeForId<Id> | undefined;

/**
 * a node that must exist - its id comes from code that only runs while it is
 * in the layout
 */
export const existingLayoutNode = <Id extends LayoutNodeId>(
  layout: PaneLayout,
  id: Id,
): LayoutNodeForId<Id> => {
  const maybeNode = findLayoutNode(layout, id);
  if (import.meta.env.DEV && maybeNode === undefined) {
    throw new Error(`${id} is not in the layout`);
  }
  return maybeNode!;
};

/**
 * a node and every node under it, depth first - from the root by default
 */
export function* layoutNodesIter(
  layout: PaneLayout,
  nodeId: LayoutNodeId = layout.rootId,
): Generator<LayoutNode, undefined, unknown> {
  const node = existingLayoutNode(layout, nodeId);
  yield node;
  if (node.type !== "openRoom") {
    for (const childId of node.children) {
      yield* layoutNodesIter(layout, childId);
    }
  }
}

/**
 * the tab groups under a node (from the root by default), in layout order
 */
export const tabGroupsIter = (
  layout: PaneLayout,
  nodeId: LayoutNodeId = layout.rootId,
): IteratorObject<TabGroup, undefined, unknown> =>
  layoutNodesIter(layout, nodeId).filter(
    (node): node is TabGroup => node.type === "tabGroup",
  );

/**
 * every node of a type, in no particular order - for open rooms, those open by
 * themselves (eg for a dialog) too
 */
export const layoutNodesOfType = <Type extends LayoutNode["type"]>(
  { nodes }: PaneLayout,
  type: Type,
): IteratorObject<Extract<LayoutNode, { type: Type }>, undefined, unknown> =>
  valuesIter(nodes).filter(
    (node): node is Extract<LayoutNode, { type: Type }> => node.type === type,
  );

export const selectOpenRoomSelectedJsonItemIdsFromLevelEditorState = (
  state: LevelEditorState,
  openRoomId: OpenRoomId,
): EditorRoomItemId[] =>
  // check the room wasn't closed (in case we have a stale openRoomId reference)
  findLayoutNode(state.layout, openRoomId)?.selectedJsonItemIds ?? emptyArray;

/**
 * return every open room's selection, hover, drag, context menu, size and
 * framing to how they were newly opened, keeping the angle it is viewed from -
 * eg after restoring them from storage, where none of those is current
 */
export const resetOpenRoomsInPlace = (state: LevelEditorState) => {
  for (const openRoom of layoutNodesOfType(state.layout, "openRoom")) {
    Object.assign(openRoom, omit(openRoomDefaults, "cameraAngle"));
  }
};

/**
 * a tab group's tabs, in order
 */
export const tabGroupTabs = (layout: PaneLayout, tabGroup: TabGroup): Tab[] =>
  tabGroup.children.map((tabId) => existingLayoutNode(layout, tabId));

/**
 * the open room a tab shows
 */
export const tabOpenRoom = (
  layout: PaneLayout,
  { children: [openRoomId] }: Tab,
): OpenRoom => existingLayoutNode(layout, openRoomId);

export const frontTab = (layout: PaneLayout, tabGroup: TabGroup): Tab =>
  existingLayoutNode(layout, tabGroup.frontTabId);

/**
 * the pane commands and browsing act in
 */
/**
 * the open room of the focused pane's front tab - the cursor room's
 */
export const selectFrontOpenRoomFromLevelEditorState = ({
  layout,
  focusedTabGroupId,
}: LevelEditorState): OpenRoom =>
  tabOpenRoom(
    layout,
    frontTab(layout, existingLayoutNode(layout, focusedTabGroupId)),
  );

/**
 * the tab showing a room in a tab group, if it has one
 */
export const findRoomTab = (
  layout: PaneLayout,
  tabGroup: TabGroup,
  roomId: EditorRoomId,
): Tab | undefined =>
  tabGroupTabs(layout, tabGroup).find(
    (tab) => tabOpenRoom(layout, tab).roomId === roomId,
  );

/**
 * the open room that commands and pointing act on: one open by itself (in a
 * dialog, over the tabs) if there is one, otherwise the focused pane's front
 * tab's
 */
export const selectActiveOpenRoomFromLevelEditorState = (
  state: LevelEditorState,
): OpenRoom => {
  const dialogOpenRoomId = state.dialogOpenRoomIds.at(-1);
  return dialogOpenRoomId === undefined ?
      selectFrontOpenRoomFromLevelEditorState(state)
    : existingLayoutNode(state.layout, dialogOpenRoomId);
};

/**
 * the active open room, if it is the focused pane's front tab's and edits its
 * room
 */
export const selectActiveCursorRoomEditingOpenRoomFromLevelEditorState = (
  state: LevelEditorState,
): OpenRoom | undefined => {
  const activeOpenRoom = selectActiveOpenRoomFromLevelEditorState(state);
  return (
      activeOpenRoom.editable &&
        activeOpenRoom === selectFrontOpenRoomFromLevelEditorState(state)
    ) ?
      activeOpenRoom
    : undefined;
};

/**
 * a new editable open room, put in the layout's nodes
 */
export const newOpenRoomInPlace = (
  state: LevelEditorState,
  roomId: EditorRoomId,
  subRoomId: string,
  cameraAngle: OpenRoom["cameraAngle"],
): OpenRoom => {
  const openRoom: OpenRoom = {
    ...openRoomDefaults,
    id: newIdInPlace<OpenRoomId>(state, "openRoom"),
    roomId,
    subRoomId,
    editable: true,
    cameraAngle,
  };
  state.layout.nodes[openRoom.id] = openRoom;
  return openRoom;
};

/**
 * a new tab showing an open room, put in the layout's nodes
 */
export const newTabInPlace = (
  state: LevelEditorState,
  openRoomId: OpenRoomId,
  isPreview: boolean,
): Tab => {
  const tab: Tab = {
    type: "tab",
    id: newIdInPlace<TabId>(state, "tab"),
    isPreview,
    children: [openRoomId],
  };
  state.layout.nodes[tab.id] = tab;
  return tab;
};

/**
 * a new tab group with one tab, put in the layout's nodes
 */
export const newTabGroupInPlace = (
  state: LevelEditorState,
  tabId: TabId,
): TabGroup => {
  const tabGroup: TabGroup = {
    type: "tabGroup",
    id: newIdInPlace<TabGroupId>(state, "tabGroup"),
    children: [tabId],
    frontTabId: tabId,
  };
  state.layout.nodes[tabGroup.id] = tabGroup;
  return tabGroup;
};

/**
 * take a node, and every node under it, out of the layout's nodes
 */
export const deleteLayoutNodesInPlace = (
  layout: PaneLayout,
  nodeId: LayoutNodeId,
) => {
  // gathered first, since deleting a node loses the way to its children:
  for (const { id } of layoutNodesIter(layout, nodeId).toArray()) {
    delete layout.nodes[id];
  }
};

/**
 * where a layout node sits in its parent split - undefined for the root
 */
const findParentSplit = (
  layout: PaneLayout,
  nodeId: PaneLayoutNodeId,
): { parent: PaneSplit; index: number } | undefined => {
  for (const paneSplit of layoutNodesOfType(layout, "split")) {
    const index = paneSplit.children.indexOf(nodeId);
    if (index !== -1) {
      return { parent: paneSplit, index };
    }
  }
  return undefined;
};

/**
 * put a node where another one is in the layout
 */
const replaceLayoutNodeInPlace = (
  layout: PaneLayout,
  nodeId: PaneLayoutNodeId,
  replacementId: PaneLayoutNodeId,
) => {
  const place = findParentSplit(layout, nodeId);
  if (place === undefined) {
    layout.rootId = replacementId;
  } else {
    place.parent.children[place.index] = replacementId;
  }
};

/**
 * take an empty tab group out of the layout, its share of the split going to
 * its neighbour - no other child's size changes. A split left with one child
 * becomes that child. The root group stays, even empty
 */
const removeTabGroupInPlace = (
  state: LevelEditorState,
  tabGroupId: TabGroupId,
) => {
  const { layout } = state;
  const place = findParentSplit(layout, tabGroupId);
  if (place === undefined) {
    return;
  }
  const { parent, index } = place;
  delete layout.nodes[tabGroupId];
  parent.children.splice(index, 1);
  const [removedSize] = parent.sizes.splice(index, 1);
  const neighbourIndex = Math.min(index, parent.children.length - 1);
  parent.sizes[neighbourIndex] += removedSize;
  const neighbourId = parent.children[neighbourIndex];
  if (parent.children.length === 1) {
    replaceLayoutNodeInPlace(layout, parent.id, neighbourId);
    delete layout.nodes[parent.id];
  }
  if (state.focusedTabGroupId === tabGroupId) {
    const [neighbourTabGroup] = tabGroupsIter(layout, neighbourId);
    state.focusedTabGroupId = neighbourTabGroup.id;
  }
};

/**
 * put a tab group beside one already in the layout - in the same split if it
 * runs the same way, taking half the existing group's share; otherwise in a
 * new split taking the existing group's place. No other child's size changes
 */
export const putTabGroupBesideInPlace = (
  state: LevelEditorState,
  besideTabGroupId: TabGroupId,
  side: PaneSide,
  tabGroupId: TabGroupId,
) => {
  const { layout } = state;
  const direction: SplitDirection =
    side === "left" || side === "right" ? "|" : "-";
  const isAfter = side === "right" || side === "bottom";
  const place = findParentSplit(layout, besideTabGroupId);
  if (place !== undefined && place.parent.direction === direction) {
    const { parent, index } = place;
    const halfSize = parent.sizes[index] / 2;
    parent.sizes[index] = halfSize;
    const insertIndex = isAfter ? index + 1 : index;
    parent.children.splice(insertIndex, 0, tabGroupId);
    parent.sizes.splice(insertIndex, 0, halfSize);
    return;
  }
  const paneSplit: PaneSplit = {
    type: "split",
    id: newIdInPlace<PaneSplitId>(state, "split"),
    direction,
    children:
      isAfter ? [besideTabGroupId, tabGroupId] : [tabGroupId, besideTabGroupId],
    sizes: [50, 50],
  };
  layout.nodes[paneSplit.id] = paneSplit;
  if (place === undefined) {
    layout.rootId = paneSplit.id;
  } else {
    place.parent.children[place.index] = paneSplit.id;
  }
};

/**
 * the tab that comes to the front in a tab's place when it leaves its group:
 * the one after it, or before it if it is last - undefined if it is the only
 * tab
 */
export const neighbourTabId = (
  tabGroup: TabGroup,
  tabId: TabId,
): TabId | undefined => {
  const tabIndex = tabGroup.children.indexOf(tabId);
  return tabGroup.children[tabIndex + 1] ?? tabGroup.children[tabIndex - 1];
};

/**
 * take a tab, with its open room, out of its group - it stays in the layout's
 * nodes, to be put elsewhere. The tab after it (or before, if it was last)
 * comes to the front in its place, and a group left with no tabs leaves the
 * layout
 */
export const detachTabInPlace = (
  state: LevelEditorState,
  tabGroupId: TabGroupId,
  tabId: TabId,
): Tab => {
  const { layout } = state;
  const tabGroup = existingLayoutNode(layout, tabGroupId);
  const tab = existingLayoutNode(layout, tabId);
  const maybeNeighbourTabId = neighbourTabId(tabGroup, tabId);
  tabGroup.children.splice(tabGroup.children.indexOf(tabId), 1);
  if (maybeNeighbourTabId === undefined) {
    removeTabGroupInPlace(state, tabGroupId);
    return tab;
  }
  if (tabGroup.frontTabId === tabId) {
    tabGroup.frontTabId = maybeNeighbourTabId;
  }
  return tab;
};

/**
 * close a tab and the open room it shows
 */
export const closeTabInPlace = (
  state: LevelEditorState,
  tabGroupId: TabGroupId,
  tabId: TabId,
) => {
  detachTabInPlace(state, tabGroupId, tabId);
  deleteLayoutNodesInPlace(state.layout, tabId);
};

/**
 * show a room in the focused pane's front tab: its own tab there if it has
 * one, otherwise it takes over the pane's preview tab, or gets a new preview
 * tab just after the front one
 */
export const showRoomInFrontTabInPlace = (
  state: LevelEditorState,
  roomId: EditorRoomId,
  subRoomId: string,
) => {
  const { layout } = state;
  const tabGroup = existingLayoutNode(layout, state.focusedTabGroupId);
  const roomTab = findRoomTab(layout, tabGroup, roomId);
  if (roomTab !== undefined) {
    tabOpenRoom(layout, roomTab).subRoomId = subRoomId;
    tabGroup.frontTabId = roomTab.id;
    return;
  }

  // a room browsed to keeps the angle of the room browsed from:
  const { id: openRoomId } = newOpenRoomInPlace(
    state,
    roomId,
    subRoomId,
    selectFrontOpenRoomFromLevelEditorState(state).cameraAngle,
  );

  const previewTab = tabGroupTabs(layout, tabGroup).find(
    ({ isPreview }) => isPreview,
  );
  if (previewTab !== undefined) {
    deleteLayoutNodesInPlace(layout, previewTab.children[0]);
    previewTab.children = [openRoomId];
    tabGroup.frontTabId = previewTab.id;
    return;
  }

  const frontIndex = tabGroup.children.indexOf(tabGroup.frontTabId);
  const { id: tabId } = newTabInPlace(state, openRoomId, true);
  tabGroup.children.splice(frontIndex + 1, 0, tabId);
  tabGroup.frontTabId = tabId;
};

/**
 * open only this room, in a single pinned tab in a single pane, closing every
 * other
 */
export const openOnlyRoomInPlace = (
  state: LevelEditorState,
  roomId: EditorRoomId,
  subRoomId: string,
) => {
  state.layout.nodes = {};
  state.dialogOpenRoomIds = [];
  const { id: openRoomId } = newOpenRoomInPlace(
    state,
    roomId,
    subRoomId,
    openRoomDefaults.cameraAngle,
  );
  const { id: tabId } = newTabInPlace(state, openRoomId, false);
  const { id: tabGroupId } = newTabGroupInPlace(state, tabId);
  state.layout.rootId = tabGroupId;
  state.focusedTabGroupId = tabGroupId;
};

/**
 * close the tabs (and open rooms) of rooms no longer in the campaign. With no
 * tab left, the campaign's starting room opens
 */
export const closeRoomsNotInCampaignInPlace = (state: LevelEditorState) => {
  const { layout } = state;
  const { rooms } = state.campaignInProgress;
  const closingTabs = tabGroupsIter(layout)
    .flatMap((tabGroup) =>
      tabGroupTabs(layout, tabGroup)
        .filter((tab) => !(tabOpenRoom(layout, tab).roomId in rooms))
        .map(({ id: tabId }) => ({ tabGroupId: tabGroup.id, tabId })),
    )
    .toArray();
  for (const { tabGroupId, tabId } of closingTabs) {
    closeTabInPlace(state, tabGroupId, tabId);
  }
  for (const openRoomId of state.dialogOpenRoomIds) {
    if (!(existingLayoutNode(state.layout, openRoomId).roomId in rooms)) {
      delete layout.nodes[openRoomId];
    }
  }
  state.dialogOpenRoomIds = state.dialogOpenRoomIds.filter(
    (openRoomId) => openRoomId in layout.nodes,
  );
  if (layoutNodesOfType(layout, "tab").next().done) {
    const roomId = startingRoomId(state.campaignInProgress);
    openOnlyRoomInPlace(state, roomId, firstSubRoomId(rooms[roomId]));
  }
};
