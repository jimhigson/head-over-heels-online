import { createSlice } from "@reduxjs/toolkit";
import type { ValueOf } from "type-fest";

import { clearAllData } from "../../store/slices/clearAllData";
import type { Xyz } from "../../utils/vectors/vectors";
import type {
  EditorCampaign,
  EditorRoomId,
  EditorRoomJsonItems,
} from "../editorTypes";
import type { PlaytestOptions } from "../PlaytestOptions";
import type { PointingAtOnItem } from "../RoomEditingArea/cursor/PointingAt";
import type { ItemTool, Tool } from "../RoomEditingArea/interactivity/Tool";
import { initialLevelEditorSliceState } from "./initialLevelEditorSliceState";
import {
  selectCampaignHasUnsavedChangesFromLevelEditorState,
  selectCurrentCommittedRoomJsonFromLevelEditorState,
  selectCursorRoomFromLevelEditorState,
  selectCursorRoomIdFromLevelEditorState,
  selectCursorSubRoomIdFromLevelEditorState,
  selectItemInLevelEditorState,
  selectRoomFromLevelEditorState,
  selectRoomHasUnsavedChangesFromLevelEditorState,
} from "./levelEditorSelectors";
import type { OpenRoomId } from "./OpenRoom";
import type { PaneLayout, TabGroupId } from "./PaneLayout";
import { addOrRemoveRoomReducers } from "./reducers/addOrRemoveRoomReducers";
import { applyItemToolReducers } from "./reducers/applyItemToolReducers";
import { blockDeadlinessAndStyleReducers } from "./reducers/blockDeadlinessAndStyleReducers";
import { campaignManagementReducers } from "./reducers/campaignManagementReducers";
import {
  changeRoomReducers,
  changeRoomSelectors,
} from "./reducers/changeRoomReducers";
import {
  cmdKSearchReducers,
  cmdKSearchSelectors,
} from "./reducers/cmdKSearchReducers";
import { coalesceItemsReducers } from "./reducers/coalesceItemsReducers";
import { coalesceRoomsReducers } from "./reducers/coalesceRoomsReducers";
import {
  contextMenuReducers,
  contextMenuSelectors,
} from "./reducers/contextMenuReducers";
import { disappearingReducers } from "./reducers/disappearingReducers";
import { doorGameEndReducers } from "./reducers/doorGameEndReducers";
import {
  dragToMoveReducers,
  dragToMoveSelectors,
} from "./reducers/dragToMoveReducers";
import {
  editorSettingsReducers,
  editorSettingsSelectors,
} from "./reducers/editorSettingsReducers";
import { editRoomReducers } from "./reducers/editRoomReducers";
import { explodeItemsReducers } from "./reducers/explodeItemsReducers";
import { floorReducers } from "./reducers/floorReducers";
import { itemActivationReducers } from "./reducers/itemActivationReducers";
import { type ItemGrab, itemGrabReducers } from "./reducers/itemGrabReducers";
import { itemPreviewReducers } from "./reducers/itemPreviewReducers";
import { mirrorOrientationReducers } from "./reducers/mirrorOrientationReducers";
import { monsterMovementReducers } from "./reducers/monsterMovementReducers";
import { moveItemsToRoomReducers } from "./reducers/moveItemsToRoomReducers";
import { multiplyItemsReducers } from "./reducers/multiplyItemsReducers";
import { nudgeReducers } from "./reducers/nudgeReducers";
import {
  openRoomsReducers,
  openRoomsSelectors,
} from "./reducers/openRoomsReducers";
import {
  playtestOptionsReducers,
  playtestOptionsSelectors,
} from "./reducers/playtestOptionsReducers";
import { roomSelectionReducers } from "./reducers/roomSelectionReducers";
import {
  roomTabsReducers,
  roomTabsSelectors,
} from "./reducers/roomTabsReducers";
import {
  roomViewReducers,
  roomViewSelectors,
} from "./reducers/roomViewReducers";
import { rotateItemReducers } from "./reducers/rotateItemReducers";
import {
  rotateViewReducers,
  rotateViewSelectors,
} from "./reducers/rotateViewReducers";
import { saveAndLoadReducers } from "./reducers/saveAndLoadReducers";
import {
  selectionsReducers,
  selectionsSelectors,
} from "./reducers/selectionsReducers";
import { setToolReducers, setToolSelectors } from "./reducers/setToolReducers";
import { snapToGridReducers } from "./reducers/snapToGridReducers";
import { startDirectionReducers } from "./reducers/startDirectionReducers";
import { teleporterDestinationReducers } from "./reducers/teleporterDestinationReducers";
import type { UndoDescription } from "./reducers/undoDescription";
import {
  type UndoEntry,
  undoReducers,
  undoSelectors,
} from "./reducers/undoReducers";
import type { SelectionEntry } from "./SelectionEntry";

/**
 * the item (or one of its editor ghosts) the pointer is over, and where on it
 */
export type HoveredItem = SelectionEntry & {
  pointingAtOnItem: PointingAtOnItem;
};

export type PreviewedRoomItemEdits = {
  [k in keyof EditorRoomJsonItems]: EditorRoomJsonItems[k] | null;
};

/**
 * the kinds of nudge (from the keys or toolbar buttons)
 */
export const nudgeKinds = ["move", "multiplyOrGrow", "removeOrShrink"] as const;
export type NudgeKind = (typeof nudgeKinds)[number];

/**
 * pendingEdits is one preview slot shared by the item tool's inline 'ghost' preview render, drags and
 * nudges, and each is ended differently - eg a held key's nudges build one
 * preview that becomes one undo entry, while the item tool's 'ghost' preview follows
 * the tool. This type says which kind the current preview is
 */
type PendingEditsMadeBy =
  | { type: "drag" }
  | { type: "itemTool" }
  | {
      type: "nudge";
      kind: NudgeKind;
      /**
       * the total move of the nudges so far, for the edit's description
       */
      positionDelta: Xyz;
    };

/**
 * previewed edits, to each room they touch. Most edits will only populate this for
 * a single room, but it is possible to impact multiple together -
 * eg. dragging items from one room to another
 */
export type PreviewedEditsByRoom = Partial<
  Record<EditorRoomId, PreviewedRoomItemEdits>
>;

export type PendingEdits = {
  /**
   * the rooms the edits are to - not always the cursor room: the item tool
   * previews in whichever pane the pointer is over, but having a preview isn't
   * enough to make it the cursor room.
   */
  edits: PreviewedEditsByRoom;
  description: UndoDescription;
  timestamp: number;
  madeBy: PendingEditsMadeBy;
};

export const gridResolutions = [1, 0.5, 0.125] as const;
export type GridResolution = (typeof gridResolutions)[number];

export type LevelEditorState = {
  /** the campaign the user is currently editing */
  campaignInProgress: EditorCampaign;
  /** the campaign in the db (as far as we know) - can be used to check if we have edits since the last save */
  remoteCampaign: EditorCampaign | undefined;
  selectedRoomIds: EditorRoomId[];
  /**
   * rooms open by themselves, outside the layout's tabs - for picking items in
   * a dialog. The last opened is the active one
   */
  dialogOpenRoomIds: OpenRoomId[];
  /**
   * how the room editing area is divided into panes, each with its own tabs,
   * and every open room - in a tab or by itself
   */
  layout: PaneLayout;
  /**
   * the pane commands and browsing act in - its front tab's room is the
   * current (cursor) room, which the map highlights
   */
  focusedTabGroupId: TabGroupId;

  /**
   * numbers the next open room, tab, tab group, split or undo link id. We never recycle id numbers to avoid
   * remove-and-replace inside the same reduction
   */
  nextIdNumber: number;
  editingRoomIdHistory: {
    back: EditorRoomId[];
    forward: EditorRoomId[];
  };
  /**
   * room edits that are for the current cursor's position, which are not yet
   * committed to the room. When present, both the edits and a label describing
   * the action are required together.
   */
  pendingEdits?: PendingEdits;
  /**
   * the pointer pressed on items in an open room, to drag them
   */
  itemGrab: ItemGrab | undefined;
  tool: Tool;
  /**
   * the item tool most recently chosen, so we can switch to the pointer and later switch back
   */
  lastItemTool: ItemTool | undefined;
  /** the text currently typed into the cmd-k menu's search input, retained while the menu is closed */
  cmdKSearch: string;
  gridResolution: GridResolution;
  autoCoalesce: boolean;
  wallsFloorsLocked: boolean;
  /** whether placing a door also adds a room beyond it */
  doorAutoAddsRoom: boolean;
  /** how the playtest button and menu open the game */
  playtestOptions: PlaytestOptions;
  /**
   * Index into the undo/redo history for hover preview.
   * Positive = undo stack index (1-based), negative = redo stack index (-1-based), 0 = none.
   */
  hoveredUndoIndex: number;
  history: Record<
    EditorRoomId,
    {
      undo: Array<UndoEntry>;
      redo: Array<UndoEntry>;
    }
  >;
};

/**
 * a slice for all the state that is controlled in react-land
 * (most state is controlled in the game itself and not touched here)
 */
export const levelEditorSlice = createSlice({
  name: "levelEditor",
  initialState: initialLevelEditorSliceState,
  reducers: {
    ...cmdKSearchReducers,
    ...setToolReducers,
    ...rotateViewReducers,
    ...editorSettingsReducers,
    ...undoReducers,
    ...applyItemToolReducers,
    ...dragToMoveReducers,
    ...selectionsReducers,
    ...editRoomReducers,
    ...itemPreviewReducers,
    ...saveAndLoadReducers,
    ...addOrRemoveRoomReducers,
    ...changeRoomReducers,
    ...roomTabsReducers,
    ...roomViewReducers,
    ...roomSelectionReducers,
    ...coalesceRoomsReducers,
    ...coalesceItemsReducers,
    ...explodeItemsReducers,
    ...itemActivationReducers,
    ...disappearingReducers,
    ...blockDeadlinessAndStyleReducers,
    ...floorReducers,
    ...itemGrabReducers,
    ...monsterMovementReducers,
    ...moveItemsToRoomReducers,
    ...multiplyItemsReducers,
    ...nudgeReducers,
    ...teleporterDestinationReducers,
    ...doorGameEndReducers,
    ...startDirectionReducers,
    ...mirrorOrientationReducers,
    ...snapToGridReducers,
    ...rotateItemReducers,
    ...campaignManagementReducers,
    ...contextMenuReducers,
    ...playtestOptionsReducers,
    ...openRoomsReducers,
  },
  extraReducers(builder) {
    builder.addCase(clearAllData, () =>
      structuredClone(initialLevelEditorSliceState),
    );
  },
  selectors: {
    selectCursorRoom: selectCursorRoomFromLevelEditorState,
    selectCursorRoomId: selectCursorRoomIdFromLevelEditorState,
    selectCursorSubRoomId: selectCursorSubRoomIdFromLevelEditorState,
    selectCurrentCampaignInProgress: (state) => state.campaignInProgress,
    selectCurrentCampaignVersion: (state) =>
      state.campaignInProgress.locator.version,
    selectCurrentCommittedRoomJson:
      selectCurrentCommittedRoomJsonFromLevelEditorState,
    selectItem: selectItemInLevelEditorState,
    selectCurrentEditingRoomColour: (state) =>
      selectCurrentCommittedRoomJsonFromLevelEditorState(state).color,
    selectCurrentEditingRoomScenery: (state) =>
      selectCurrentCommittedRoomJsonFromLevelEditorState(state).planet,
    selectCampaignHasUnsavedChanges:
      selectCampaignHasUnsavedChangesFromLevelEditorState,
    selectRoom: selectRoomFromLevelEditorState,
    selectRoomHasUnsavedChanges:
      selectRoomHasUnsavedChangesFromLevelEditorState,
    ...undoSelectors,
    ...changeRoomSelectors,
    ...roomTabsSelectors,
    ...roomViewSelectors,
    ...cmdKSearchSelectors,
    ...setToolSelectors,
    ...rotateViewSelectors,
    ...playtestOptionsSelectors,
    ...editorSettingsSelectors,
    ...openRoomsSelectors,
    ...selectionsSelectors,
    ...contextMenuSelectors,
    ...dragToMoveSelectors,
  },
});

export type LevelEditorSliceAction = ReturnType<
  ValueOf<typeof levelEditorSlice.actions>
>;

export const {
  addRoom,
  addRoomToSelection,
  applyItemTool,
  campaignJsonAutoFixed,
  changeDragInProgress,
  changeGridResolution,
  changeRoomColour,
  changeRoomScenery,
  changeToRoom,
  changeDoorAutoAddsRoom,
  changeWallsFloorsLocked,
  clearRoom,
  closeOtherRoomTabs,
  closeRoomTab,
  editedRoomsTabsPinned,
  paneSplitResized,
  roomTabDroppedBesidePane,
  roomTabDropped,
  roomTabSelected,
  roomTabSplit,
  tabGroupFocused,
  closeItemContextMenu,
  dialogRoomClosed,
  dialogRoomOpened,
  openRoomsRestored,
  openRoomViewChanged,
  openRoomViewPanned,
  openRoomViewZoomed,
  coalesceSelectedItems,
  coalesceSelectedRooms,
  commitCurrentPreviewedEdits,
  deleteSelected,
  explodeSelectedItems,
  insertRoom,
  loadCampaign,
  moveItemsToRoom,
  multiplyCurrentToolItem,
  multiplySelectedItems,
  nudgeSelectedItems,
  commitPendingNudge,
  newCampaign,
  openItemContextMenu,
  redo,
  removeRoom,
  resetPreviewedEdits,
  roomBack,
  roomForward,
  roomHistoryRecorded,
  roomJsonEdited,
  renameRoom,
  openRoomPaneResized,
  rotateCurrentToolItem,
  rotateSelectedItems,
  rotateViewAnticlockwise,
  rotateViewClockwise,
  rotateViewTo,
  saveSuccessful,
  selectAllRooms,
  setAutoCoalesce,
  setPlaytestOptions,
  pinRoomTab,
  setCampaignName,
  setCampaignPublished,
  setCampaignUserId,
  setCampaignVersion,
  setClickableAnnotationHovered,
  setCmdKSearch,
  setHoveredItemInRoom,
  setRemoteCampaign,
  setRoomAboveOrBelow,
  makeHoleInSelectedFloor,
  setSelectedItemsActivation,
  setSelectedItemsDisappearing,
  setSelectedBlocksDeadly,
  setSelectedItemsSubtype,
  setSelectedFloorsScenery,
  setSelectedFloorsType,
  itemGrabDropped,
  itemGrabAbandoned,
  itemGrabOverOpenRoom,
  itemGrabPlaneChanged,
  itemGrabPointerDown,
  itemGrabPreviewedInto,
  itemGrabDragStarted,
  itemGrabRounded,
  selectAllOfTypeInCursorRoom,
  setSelectedItemsInRoom,
  setSelectedItemsMirrorOrientation,
  snapSelectedItemsToGrid,
  setSelectedItemsStartDirection,
  setSelectedMonstersMovement,
  setSelectedDoorsToGameEnd,
  setSelectedTeleportersDestination,
  setTool,
  resetTool,
  togglePointerTool,
  toggleRoomInSelection,
  toggleSelectedItemInRoom,
  undo,
  undoHovered,
} = levelEditorSlice.actions;
export const {
  selectHistoryRoomsBackwards,
  selectPlaytestOptions,
  selectCmdKSearch,
  selectOpenRoomContextMenuXy,
  selectOpenRoomSelectionJsonItemIdsWithoutEditorGhostSelections,
  selectOpenRoomSelection,
  selectOpenRoomDragInProgress,
  selectActiveOpenRoomId,
  selectActiveOpenRoomDragInProgress,
  selectCurrentCampaignInProgress,
  selectCurrentCampaignVersion,
  selectCurrentEditingRoomColour,
  selectCurrentCommittedRoomJson,
  selectCurrentEditingRoomScenery,
  selectCursorRoom,
  selectCursorRoomId,
  selectCursorSubRoomId,
  selectOpenRoomView,
  selectDoorAutoAddsRoom,
  selectOpenRoomCameraAngle,
  selectHistoryRoomsForwards,
  selectOpenRoomHoveredItem,
  selectItem,
  selectFrontOpenRoomId,
  selectIsOnlyPane,
  selectPaneLayoutRootId,
  selectFocusedTabGroupId,
  selectTabGroupFrontOpenRoomId,
  selectTabGroupRoomIds,
  selectTabGroups,
  selectRedoHistory,
  selectCampaignHasUnsavedChanges,
  selectRoom,
  selectRoomHasUnsavedChanges,
  selectOpenRoomPaneSize,
  selectCursorRoomSelectionJsonItemIdsWithoutEditorGhostSelections,
  selectCursorRoomSelectionJsonItemIdsIncludingEditorGhostOwners,
  selectCursorRoomSelection,
  selectTool,
  selectUndoHistory,
} = levelEditorSlice.selectors;
