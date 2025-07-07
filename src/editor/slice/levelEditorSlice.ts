import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { SetRequired, ValueOf } from "type-fest";
import { starterRoom } from "./createStarterRoom";
import type { EditorCampaign, EditorRoomJson } from "../EditorRoomId";
import { type EditorRoomId, type EditorRoomItemId } from "../EditorRoomId";
import type { Tool } from "../Tool";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { applyToolReducers } from "./reducers/applyToolToRoomJson";
import { selectCurrentRoomFromLevelEditorState } from "./levelEditorSliceSelectors";
import { undoReducers, undoSelectors } from "./reducers/undoReducers";
import { dragToMoveReducers } from "./reducers/dragToMoveReducers";
import { editorSettingsReducers } from "./reducers/editorSettingsReducers";
import { selectionsReducers } from "./reducers/selectionsReducers";
import { editRoomReducers } from "./reducers/editRoomReducers";

export type LevelEditorState = {
  /** the campaign the user is currently editing */
  campaignInProgress: EditorCampaign;
  currentlyEditingRoomId: EditorRoomId;
  nextRoomId: number;
  tool: Tool;
  hoveredJsonItemId?: EditorRoomItemId;
  clickableAnnotationHovered: boolean;
  selectedJsonItemIds: Array<EditorRoomItemId>;
  halfGridResolution: boolean;
  wallsFloorsLocked: boolean;
  dragInProgress?: boolean;
  history: {
    undo: Array<EditorRoomJson>;
    redo: Array<EditorRoomJson>;
  };
};

const initialRoomId = "room_0" as EditorRoomId;
const initialRoom = { id: initialRoomId, ...starterRoom({ x: 8, y: 8 }) };
export const initialLevelEditorSliceState: LevelEditorState = {
  campaignInProgress: {
    name: "new campaign",
    rooms: {
      [initialRoomId]: initialRoom,
    },
  },
  nextRoomId: 1,
  currentlyEditingRoomId: initialRoomId,
  tool: { type: "pointer" },
  hoveredJsonItemId: undefined,
  clickableAnnotationHovered: false,
  selectedJsonItemIds: [],
  halfGridResolution: false,
  wallsFloorsLocked: true,
  dragInProgress: false,
  history: {
    undo: [],
    redo: [],
  },
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
      }

      state.tool = tool;
    },

    changeToRoom(_state, { payload: roomId }: PayloadAction<EditorRoomId>) {
      // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
      // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
      // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
      const state = _state as LevelEditorState;

      if (!state.campaignInProgress.rooms[roomId]) {
        console.warn(`can't change to room ${roomId} - it doesn't exist`);
        // If the room doesn't exist, we can't change to it
        return;
      }

      state.currentlyEditingRoomId = roomId;

      state.clickableAnnotationHovered = false;
      state.hoveredJsonItemId = undefined;
      state.selectedJsonItemIds = [];

      // clear undo/redo history when changing room:
      state.history = initialLevelEditorSliceState.history;
    },

    /**
     * noop reducer to force the store to give this slice its initial value in the store, since this slice is lazy-loaded.
     * Dispatching anything would also have this effect, we just need the reducer to run so it can give the initial state
     */
    injected() {},

    ...editorSettingsReducers,
    ...undoReducers,
    ...applyToolReducers,
    ...dragToMoveReducers,
    ...selectionsReducers,
    ...editRoomReducers,
  },
  selectors: {
    selectCurrentEditingRoomJson: selectCurrentRoomFromLevelEditorState,
    selectCurrentEditingRoomColour: (state) =>
      selectCurrentRoomFromLevelEditorState(state).color,
    selectCurrentEditingRoomScenery: (state) =>
      selectCurrentRoomFromLevelEditorState(state).planet,
    selectTool: (state) => state.tool,
    selectSelectedJsonItemIds: (state) => state.selectedJsonItemIds,
    selectHoveredJsonItemId: (state) => state.hoveredJsonItemId,
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
  applyToolToRoomJson,
  changeDragInProgress,
  changeGridResolution,
  changeRoomColour,
  changeRoomScenery,
  changeToRoom,
  changeWallsFloorsLocked,
  clearRoom,
  deleteSelected,
  injected,
  moveItemInRoom,
  redo,
  roomJsonEdited,
  setClickableAnnotationHovered,
  setHoveredItemInRoom,
  setRoomAboveOrBelow,
  setSelectedItemInRoom,
  setTool,
  undo,
} = levelEditorSlice.actions;
export const {
  selectCanRedo,
  selectCanUndo,
  selectCurrentEditingRoomColour,
  selectCurrentEditingRoomJson,
  selectCurrentEditingRoomScenery,
  selectHoveredJsonItemId,
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
