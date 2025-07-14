import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { SetRequired, ValueOf } from "type-fest";
import { starterRoom } from "./createStarterRoom";
import type { EditorCampaign, EditorRoomJson } from "../editorTypes";
import { type EditorRoomId, type EditorRoomItemId } from "../editorTypes";
import type { Tool } from "../Tool";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { applyItemToolReducers } from "./reducers/applyToolToRoomJson";
import {
  selectCurrentRoomFromLevelEditorState,
  selectItemInLevelEditorState,
} from "./levelEditorSliceSelectors";
import { undoReducers, undoSelectors } from "./reducers/undoReducers";
import { dragToMoveReducers } from "./reducers/dragToMoveReducers";
import { editorSettingsReducers } from "./reducers/editorSettingsReducers";
import { selectionsReducers } from "./reducers/selectionsReducers";
import { editItemReducers } from "./reducers/editItemReducers";
import type { PointingAtOnItem } from "../RoomEditingArea/cursor/PointingAt";
import { editRoomReducers } from "./reducers/editRoomReducers";

export type HoveredItem = {
  jsonItemId: EditorRoomItemId;
  pointingAtOnItem: PointingAtOnItem;
};

export type LevelEditorState = {
  /** the campaign the user is currently editing */
  campaignInProgress: EditorCampaign;
  currentlyEditingRoomId: EditorRoomId;
  nextRoomId: number;
  tool: Tool;
  hoveredItem?: HoveredItem;
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
  hoveredItem: undefined,
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
      state.hoveredItem = undefined;
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
    ...applyItemToolReducers,
    ...dragToMoveReducers,
    ...selectionsReducers,
    ...editRoomReducers,
    ...editItemReducers,
  },
  selectors: {
    selectCurrentEditingRoomJson: selectCurrentRoomFromLevelEditorState,
    selectItem: selectItemInLevelEditorState,
    selectCurrentEditingRoomColour: (state) =>
      selectCurrentRoomFromLevelEditorState(state).color,
    selectCurrentEditingRoomScenery: (state) =>
      selectCurrentRoomFromLevelEditorState(state).planet,
    selectTool: (state) => state.tool,
    selectSelectedJsonItemIds: (state) => state.selectedJsonItemIds,
    selectHoveredItem: (state) => state.hoveredItem,
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
  applyItemTool,
  changeDragInProgress,
  changeGridResolution,
  changeRoomColour,
  changeRoomScenery,
  changeToRoom,
  changeWallsFloorsLocked,
  clearRoom,
  deleteSelected,
  injected,
  redo,
  moveOrResizeItem,
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
  selectItem,
  selectCurrentEditingRoomScenery,
  selectHoveredItem,
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
