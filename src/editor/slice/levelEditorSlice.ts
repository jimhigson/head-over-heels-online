import { createSlice } from "@reduxjs/toolkit";
import { type ValueOf } from "type-fest";

import { clearAllData } from "../../store/slices/clearAllData";
import { type Xy, type Xyz } from "../../utils/vectors/vectors";
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
import {
  type EditorPane,
  type EditorPaneId,
  resetPanesInPlace,
} from "./EditorPane";
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
import { panesReducers, panesSelectors } from "./reducers/panesReducers";
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
import { type RoomTab } from "./RoomTab";

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
  cursorRoom: { roomId: EditorRoomId; subRoomId: string };
  /**
   * the rooms open in the editing pane's tabs, in order. The cursor room's tab
   * is the front tab
   */
  openRoomTabs: RoomTab[];
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
  /**
   * the mounted room panes, by the ids they were given on mounting
   */
  panes: Record<EditorPaneId, EditorPane>;
  /**
   * the pane last interacted with - commands acting on the selection act on
   * its selection. Undefined while no pane is mounted
   */
  activePaneId: EditorPaneId | undefined;
  gridResolution: GridResolution;
  /** the 90°-increment camera rotation the editor is viewing the room from */
  cameraAngle: Xy;
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
    ...panesReducers,
  },
  extraReducers(builder) {
    builder.addCase(clearAllData, ({ panes, activePaneId }) => {
      // the panes reflect the DOM, so keep them until the DOM nodes are unmounted, which will cause this state to go:
      const clearedState: LevelEditorState = {
        ...structuredClone(initialLevelEditorSliceState),
        panes,
        activePaneId,
      };
      resetPanesInPlace(clearedState);
      return clearedState;
    });
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
    ...panesSelectors,
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
  editorPaneActivated,
  editorPaneMounted,
  editorPaneUnmounted,
  paneViewChanged,
  paneViewPanned,
  paneViewZoomed,
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
  paneResized,
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
  selectPaneContextMenuXy,
  selectPaneSelectedJsonItemIds,
  selectPaneDragInProgress,
  selectActivePaneId,
  selectActivePaneDragInProgress,
  selectCurrentCampaignInProgress,
  selectCurrentCampaignVersion,
  selectCurrentEditingRoomColour,
  selectCurrentCommittedRoomJson,
  selectCurrentEditingRoomScenery,
  selectCursorRoom,
  selectCursorRoomId,
  selectCursorSubRoomId,
  selectPaneView,
  selectDoorAutoAddsRoom,
  selectEditorCameraAngle,
  selectForwardRooms,
  selectPaneHoveredItem,
  selectItem,
  selectOpenRoomTabs,
  selectRedoHistory,
  selectCampaignHasUnsavedChanges,
  selectRoom,
  selectRoomHasUnsavedChanges,
  selectPaneSize,
  selectCursorRoomSelectedJsonItemIds,
  selectTool,
  selectUndoHistory,
} = levelEditorSlice.selectors;
