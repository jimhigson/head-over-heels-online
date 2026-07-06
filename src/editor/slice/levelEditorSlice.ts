import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type ValueOf } from "type-fest";

import { clearAllData } from "../../store/slices/clearAllData";
import {
  quarterTurnAnticlockwise,
  quarterTurnClockwise,
  rotateXy,
  rotationVectorsByDirectionXy4,
} from "../../utils/vectors/rotateXy";
import { type DirectionXy4, type Xy } from "../../utils/vectors/vectors";
import {
  type EditorCampaign,
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJsonItems,
} from "../editorTypes";
import { type PointingAtOnItem } from "../RoomEditingArea/cursor/PointingAt";
import { type Tool } from "../RoomEditingArea/interactivity/Tool";
import { initialLevelEditorSliceState } from "./initialLevelEditorSliceState";
import {
  selectCurrentRoomJsonFromLevelEditorState,
  selectItemInLevelEditorState,
  selectItemIsSelectedInLevelEditorState,
} from "./levelEditorSelectors";
import { addOrRemoveRoomReducers } from "./reducers/addOrRemoveRoomReducers";
import { applyItemToolReducers } from "./reducers/applyItemToolReducers";
import { campaignManagementReducers } from "./reducers/campaignManagementReducers";
import {
  changeRoomReducers,
  changeRoomSelectors,
} from "./reducers/changeRoomReducers";
import { coalesceItemsReducers } from "./reducers/coalesceItemsReducers";
import { coalesceRoomsReducers } from "./reducers/coalesceRoomsReducers";
import {
  clearContextMenuXyInPlace,
  contextMenuReducers,
} from "./reducers/contextMenuReducers";
import { disappearingReducers } from "./reducers/disappearingReducers";
import { dragToMoveReducers } from "./reducers/dragToMoveReducers";
import { editorSettingsReducers } from "./reducers/editorSettingsReducers";
import { editRoomReducers } from "./reducers/editRoomReducers";
import { explodeItemsReducers } from "./reducers/explodeItemsReducers";
import { itemActivationReducers } from "./reducers/itemActivationReducers";
import { itemPreviewReducers } from "./reducers/itemPreviewReducers";
import { mirrorOrientationReducers } from "./reducers/mirrorOrientationReducers";
import { monsterMovementReducers } from "./reducers/monsterMovementReducers";
import { moveOrResizeItemPreviewReducers } from "./reducers/moveOrResizeItemPreview/moveOrResizeItemPreviewReducers";
import { roomSelectionReducers } from "./reducers/roomSelectionReducers";
import { rotateItemReducers } from "./reducers/rotateItemReducers";
import { saveAndLoadReducers } from "./reducers/saveAndLoadReducers";
import { selectionsReducers } from "./reducers/selectionsReducers";
import { startDirectionReducers } from "./reducers/startDirectionReducers";
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

export const gridResolutions = [1, 0.5, 0.125] as const;
export type GridResolution = (typeof gridResolutions)[number];

export type LevelEditorState = {
  /** the campaign the user is currently editing */
  campaignInProgress: EditorCampaign;
  /** the campaign in the db (as far as we know) - can be used to check if we have edits since the last save */
  remoteCampaign: EditorCampaign | undefined;
  selectedRoomIds: EditorRoomId[];
  cursorRoom: { roomId: EditorRoomId; subRoomId: string };
  editingRoomIdHistory: {
    back: EditorRoomId[];
    forward: EditorRoomId[];
  };
  /**
   * room edits that are for the current cursor's position, which are not yet
   * committed to the room. When present, both the edits and a label describing
   * the action are required together.
   */
  pendingEdits?: {
    edits: PreviewedRoomItemEdits;
    description: UndoDescription;
    timestamp: number;
  };
  tool: Tool;
  /** the text currently typed into the cmd-k menu's search input, retained while the menu is closed */
  cmdKSearch: string;
  /**
   * when set, the item context menu is shown at this position (scaled pixels, in
   * the room's projected screen space). Undefined when no menu is open.
   */
  contextMenuXy?: Xy;
  hoveredItem?: HoveredItem;
  clickableAnnotationHovered: boolean;
  selectedJsonItemIds: Array<EditorRoomItemId>;
  gridResolution: GridResolution;
  /** the 90°-increment camera rotation the editor is viewing the room from */
  cameraAngle: Xy;
  autoCoalesce: boolean;
  wallsFloorsLocked: boolean;
  dragInProgress?: boolean;
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
    /**
     * set the tool that is currently selected
     */
    setTool(_state, { payload: tool }: PayloadAction<Tool>) {
      // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
      // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
      // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
      const state = _state as LevelEditorState;

      // unselect if using an item tool
      if (tool.type === "item") {
        state.selectedJsonItemIds = [];
        state.hoveredItem = undefined;
        clearContextMenuXyInPlace(state);
      }

      state.tool = tool;
    },

    /**
     * set the text typed into the cmd-k menu's search input
     */
    setCmdKSearch(state, { payload: search }: PayloadAction<string>) {
      state.cmdKSearch = search;
    },

    /** rotate the editor's view of the room a quarter-turn clockwise */
    rotateViewClockwise(state) {
      state.cameraAngle = rotateXy(state.cameraAngle, quarterTurnClockwise);
    },
    /** rotate the editor's view of the room a quarter-turn anticlockwise */
    rotateViewAnticlockwise(state) {
      state.cameraAngle = rotateXy(state.cameraAngle, quarterTurnAnticlockwise);
    },
    /**
     * rotate the editor's view to the angle named by where world "away"
     * appears on screen - the label the compass between the rotate buttons
     * shows (eg "away" = the base angle)
     */
    rotateViewTo(
      state,
      { payload: awayAppearsAs }: PayloadAction<DirectionXy4>,
    ) {
      state.cameraAngle = rotationVectorsByDirectionXy4[awayAppearsAs];
    },

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
    ...roomSelectionReducers,
    ...coalesceRoomsReducers,
    ...coalesceItemsReducers,
    ...explodeItemsReducers,
    ...itemActivationReducers,
    ...disappearingReducers,
    ...monsterMovementReducers,
    ...startDirectionReducers,
    ...mirrorOrientationReducers,
    ...rotateItemReducers,
    ...campaignManagementReducers,
    ...contextMenuReducers,
  },
  extraReducers(builder) {
    builder.addCase(clearAllData, () =>
      structuredClone(initialLevelEditorSliceState),
    );
  },
  selectors: {
    selectCurrentCampaignInProgress: (state) => state.campaignInProgress,
    selectCurrentCampaignVersion: (state) =>
      state.campaignInProgress.locator.version,
    selectCurrentEditingRoomJson: selectCurrentRoomJsonFromLevelEditorState,
    selectItem: selectItemInLevelEditorState,
    selectCurrentEditingRoomColour: (state) =>
      selectCurrentRoomJsonFromLevelEditorState(state).color,
    selectCurrentEditingRoomScenery: (state) =>
      selectCurrentRoomJsonFromLevelEditorState(state).planet,
    selectTool: (state) => state.tool,
    selectCmdKSearch: (state) => state.cmdKSearch,
    selectEditorCameraAngle: (state) => state.cameraAngle,
    selectContextMenuXy: (state) => state.contextMenuXy,
    selectSelectedJsonItemIds: (state) => state.selectedJsonItemIds,
    selectHoveredItem: (state) => state.hoveredItem,
    selectItemIsSelected: selectItemIsSelectedInLevelEditorState,
    ...undoSelectors,
    ...changeRoomSelectors,
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
  changeWallsFloorsLocked,
  clearRoom,
  closeItemContextMenu,
  coalesceSelectedItems,
  coalesceSelectedRooms,
  commitCurrentPreviewedEdits,
  deleteSelected,
  explodeSelectedItems,
  insertRoom,
  loadCampaign,
  moveOrResizeItemAsPreview,
  newCampaign,
  openItemContextMenu,
  redo,
  removeRoom,
  resetPreviewedEdits,
  roomBack,
  roomForward,
  roomJsonEdited,
  rotateCurrentToolItem,
  rotateSelectedItems,
  rotateViewAnticlockwise,
  rotateViewClockwise,
  rotateViewTo,
  saveSuccessful,
  selectAllRooms,
  setAutoCoalesce,
  setCampaignName,
  setCampaignPublished,
  setCampaignUserId,
  setCampaignVersion,
  setClickableAnnotationHovered,
  setCmdKSearch,
  setHoveredItemInRoom,
  setRemoteCampaign,
  setRoomAboveOrBelow,
  setSelectedItemsActivation,
  setSelectedItemsDisappearing,
  setSelectedItemsInRoom,
  setSelectedItemsMirrorOrientation,
  setSelectedItemsStartDirection,
  setSelectedMonstersMovement,
  setTool,
  toggleRoomInSelection,
  toggleSelectedItemInRoom,
  undo,
  undoHovered,
} = levelEditorSlice.actions;
export const {
  selectBackRooms,
  selectCmdKSearch,
  selectContextMenuXy,
  selectCurrentCampaignInProgress,
  selectCurrentCampaignVersion,
  selectCurrentEditingRoomColour,
  selectCurrentEditingRoomJson,
  selectCurrentEditingRoomScenery,
  selectEditorCameraAngle,
  selectForwardRooms,
  selectHoveredItem,
  selectItem,
  selectItemIsSelected,
  selectRedoHistory,
  selectSelectedJsonItemIds,
  selectTool,
  selectUndoHistory,
} = levelEditorSlice.selectors;
