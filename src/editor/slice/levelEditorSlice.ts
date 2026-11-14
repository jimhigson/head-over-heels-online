import { createSlice } from "@reduxjs/toolkit";
import { type ValueOf } from "type-fest";

import { clearAllData } from "../../store/slices/clearAllData";
import { type Xyz } from "../../utils/vectors/vectors";
import {
  type EditorCampaign,
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJsonItems,
} from "../editorTypes";
import { type PlaytestOptions } from "../PlaytestOptions";
import { type PointingAtOnItem } from "../RoomEditingArea/cursor/PointingAt";
import {
  type ItemTool,
  type Tool,
} from "../RoomEditingArea/interactivity/Tool";
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
import { type OpenRoom, type OpenRoomId, type Tab } from "./OpenRoom";
import { addOrRemoveRoomReducers } from "./reducers/addOrRemoveRoomReducers";
import { applyItemToolReducers } from "./reducers/applyItemToolReducers";
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
import { itemActivationReducers } from "./reducers/itemActivationReducers";
import { itemPreviewReducers } from "./reducers/itemPreviewReducers";
import { mirrorOrientationReducers } from "./reducers/mirrorOrientationReducers";
import { monsterMovementReducers } from "./reducers/monsterMovementReducers";
import { moveItemsToRoomReducers } from "./reducers/moveItemsToRoomReducers";
import { moveOrResizeItemPreviewReducers } from "./reducers/moveOrResizeItemPreview/moveOrResizeItemPreviewReducers";
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
import { startDirectionReducers } from "./reducers/startDirectionReducers";
import { teleporterDestinationReducers } from "./reducers/teleporterDestinationReducers";
import { type UndoDescription } from "./reducers/undoDescription";
import {
  type UndoEntry,
  undoReducers,
  undoSelectors,
} from "./reducers/undoReducers";

export type HoveredItem = {
  jsonItemId: EditorRoomItemId;
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

export type PendingEdits = {
  edits: PreviewedRoomItemEdits;
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
   * the current room (must be one of the rooms in selectedRoomIds)
   * - the map highlights it, and its tab is in front
   */
  cursorRoomId: EditorRoomId;
  /**
   * the rooms open for viewing and editing, being rendered by the game engine
   * embedded into the editor, in tabs or elsewhere (eg a dialog), by their own ids
   */
  openRooms: Record<OpenRoomId, OpenRoom>;
  /**
   * the room editing area's tabs, in order. Currently, will correlate to an
   * open room in `.openRooms`, since we only support open rooms in tabs
   */
  tabs: Tab[];

  /**
   * numbers the next open room or tab id. We never recycle id numbers to avoid
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
    ...moveOrResizeItemPreviewReducers,
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
    ...monsterMovementReducers,
    ...moveItemsToRoomReducers,
    ...multiplyItemsReducers,
    ...nudgeReducers,
    ...teleporterDestinationReducers,
    ...doorGameEndReducers,
    ...startDirectionReducers,
    ...mirrorOrientationReducers,
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
  moveOrResizeItemAsPreview,
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
  roomJsonEdited,
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
  setSelectedItemsInRoom,
  setSelectedItemsMirrorOrientation,
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
  selectBackRooms,
  selectPlaytestOptions,
  selectCmdKSearch,
  selectOpenRoomContextMenuXy,
  selectOpenRoomSelectedJsonItemIds,
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
  selectForwardRooms,
  selectOpenRoomHoveredItem,
  selectItem,
  selectFrontOpenRoomId,
  selectTabs,
  selectTabRoomIds,
  selectRedoHistory,
  selectCampaignHasUnsavedChanges,
  selectRoom,
  selectRoomHasUnsavedChanges,
  selectOpenRoomPaneSize,
  selectCursorRoomSelectedJsonItemIds,
  selectTool,
  selectUndoHistory,
} = levelEditorSlice.selectors;
