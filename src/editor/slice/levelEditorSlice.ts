import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type ValueOf } from "type-fest";

import { clearAllData } from "../../store/slices/clearAllData";
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
  selectCurrentRoomFromLevelEditorState,
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
import { dragToMoveReducers } from "./reducers/dragToMoveReducers";
import { editorSettingsReducers } from "./reducers/editorSettingsReducers";
import { editRoomReducers } from "./reducers/editRoomReducers";
import { itemPreviewReducers } from "./reducers/itemPreviewReducers";
import { moveOrResizeItemPreviewReducers } from "./reducers/moveOrResizeItemPreview/moveOrResizeItemPreviewReducers";
import { roomSelectionReducers } from "./reducers/roomSelectionReducers";
import { saveAndLoadReducers } from "./reducers/saveAndLoadReducers";
import { selectionsReducers } from "./reducers/selectionsReducers";
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
  /** must never be empty — the last element is the cursor room */
  selectedRooms: Array<{
    roomId: EditorRoomId;
    subRoomId: string;
  }>;
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
  hoveredItem?: HoveredItem;
  clickableAnnotationHovered: boolean;
  selectedJsonItemIds: Array<EditorRoomItemId>;
  gridResolution: GridResolution;
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
      }

      state.tool = tool;
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
    ...campaignManagementReducers,
  },
  extraReducers(builder) {
    builder.addCase(clearAllData, () =>
      structuredClone(initialLevelEditorSliceState),
    );
  },
  selectors: {
    selectCurrentCampaignInProgress: (state) => state.campaignInProgress,
    selectCurrentEditingRoomJson: selectCurrentRoomFromLevelEditorState,
    selectItem: selectItemInLevelEditorState,
    selectCurrentEditingRoomColour: (state) =>
      selectCurrentRoomFromLevelEditorState(state).color,
    selectCurrentEditingRoomScenery: (state) =>
      selectCurrentRoomFromLevelEditorState(state).planet,
    selectTool: (state) => state.tool,
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
  applyItemTool,
  changeDragInProgress,
  changeGridResolution,
  changeRoomColour,
  changeRoomScenery,
  changeToRoom,
  changeWallsFloorsLocked,
  clearRoom,
  commitCurrentPreviewedEdits,
  deleteSelected,
  insertRoom,
  loadCampaign,
  moveOrResizeItemAsPreview,
  newCampaign,
  redo,
  addRoomToSelection,
  removeRoom,
  resetPreviewedEdits,
  roomBack,
  roomForward,
  roomJsonEdited,
  setAutoCoalesce,
  setCampaignName,
  setCampaignPublished,
  setCampaignUserId,
  setClickableAnnotationHovered,
  setHoveredItemInRoom,
  undoHovered,
  setRemoteCampaign,
  setRoomAboveOrBelow,
  setSelectedItemsInRoom,
  setTool,
  toggleRoomInSelection,
  toggleSelectedItemInRoom,
  undo,
} = levelEditorSlice.actions;
export const {
  selectBackRooms,
  selectCurrentCampaignInProgress,
  selectCurrentEditingRoomColour,
  selectCurrentEditingRoomJson,
  selectCurrentEditingRoomScenery,
  selectForwardRooms,
  selectHoveredItem,
  selectItem,
  selectItemIsSelected,
  selectRedoHistory,
  selectSelectedJsonItemIds,
  selectTool,
  selectUndoHistory,
} = levelEditorSlice.selectors;
