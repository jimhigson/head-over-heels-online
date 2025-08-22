import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { SetRequired, ValueOf } from "type-fest";
import type {
  EditorCampaign,
  EditorRoomJson,
  EditorRoomJsonItems,
} from "../editorTypes";
import { type EditorRoomId, type EditorRoomItemId } from "../editorTypes";
import type { Tool } from "../Tool";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { applyItemToolReducers } from "./reducers/applyItemToolReducers";
import {
  selectCurrentRoomFromLevelEditorState,
  selectItemInLevelEditorState,
  selectItemIsSelectedInLevelEditorState,
} from "./levelEditorSelectors";
import { undoReducers, undoSelectors } from "./reducers/undoReducers";
import { dragToMoveReducers } from "./reducers/dragToMoveReducers";
import { editorSettingsReducers } from "./reducers/editorSettingsReducers";
import { selectionsReducers } from "./reducers/selectionsReducers";
import { moveOrResizeItemPreviewReducers } from "./reducers/moveOrResizeItemPreviewReducers";
import type { PointingAtOnItem } from "../RoomEditingArea/cursor/PointingAt";
import { editRoomReducers } from "./reducers/editRoomReducers";
import { itemPreviewReducers } from "./reducers/itemPreviewReducers";
import { saveAndLoadReducers } from "./reducers/saveAndLoadReducers";
import { initialLevelEditorSliceState } from "./initialLevelEditorSliceState";
import { addOrRemoveRoomReducers } from "./reducers/addOrRemoveRoomReducers";
import { changeRoomReducers } from "./reducers/changeRoomReducers";
import { campaignManagementReducers } from "./reducers/campaignManagementReducers";

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
  currentlyEditingRoomId: EditorRoomId;
  editingRoomIdHistory: {
    back: EditorRoomId[];
    forward: EditorRoomId[];
  };
  /**
   * room edits that are for the current cursor's position, which are not yet
   * committed to the room.
   *
   * Can be null, which means the item is deleted in the preview
   */
  previewedEdits: PreviewedRoomItemEdits;
  tool: Tool;
  hoveredItem?: HoveredItem;
  clickableAnnotationHovered: boolean;
  selectedJsonItemIds: Array<EditorRoomItemId>;
  gridResolution: GridResolution;
  autoCoalesce: boolean;
  wallsFloorsLocked: boolean;
  dragInProgress?: boolean;
  history: {
    undo: Array<EditorRoomJson>;
    redo: Array<EditorRoomJson>;
  };
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

    /**
     * noop reducer to force the store to give this slice its initial value in the store, since this slice is lazy-loaded.
     * Dispatching anything would also have this effect, we just need the reducer to run so it can give the initial state
     */
    injected() {},

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
    ...campaignManagementReducers,
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
  },
});

export type LevelEditorSlice = typeof levelEditorSlice;

export type LevelEditorSliceAction = ReturnType<
  ValueOf<typeof levelEditorSlice.actions>
>;

export type LevelEditorSliceActionCreator = ValueOf<
  typeof levelEditorSlice.actions
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
  injected,
  loadCampaign,
  moveOrResizeItemAsPreview,
  redo,
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
  setRemoteCampaign,
  setRoomAboveOrBelow,
  setSelectedItemsInRoom,
  setTool,
  toggleSelectedItemInRoom,
  undo,
} = levelEditorSlice.actions;
export const {
  selectCanRedo,
  selectCanUndo,
  selectCurrentCampaignInProgress,
  selectCurrentEditingRoomColour,
  selectCurrentEditingRoomJson,
  selectCurrentEditingRoomScenery,
  selectHoveredItem,
  selectItem,
  selectItemIsSelected,
  selectSelectedJsonItemIds,
  selectTool,
} = levelEditorSlice.selectors;

export type RootStateWithLevelEditorSlice = SetRequired<
  RootState,
  "levelEditor"
>;

/** special useSelector for when we know the level editor slice is loaded */
export const useAppSelectorWithLevelEditorSlice =
  useSelector.withTypes<RootStateWithLevelEditorSlice>();
