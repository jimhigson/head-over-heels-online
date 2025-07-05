import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { SetRequired, ValueOf } from "type-fest";
import type { Campaign } from "../../model/modelTypes";
import { starterRoom } from "./createStarterRoom";
import type { EditorRoomJson } from "../EditorRoomId";
import { type EditorRoomId, type EditorRoomItemId } from "../EditorRoomId";
import type { Tool } from "../Tool";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import type { ZxSpectrumRoomColour } from "../../originalGame";
import { type SceneryName } from "../../sprites/planets";
import { applyToolReducers } from "./reducers/applyToolToRoomJson";
import { selectCurrentRoomFromLevelEditorState } from "./levelEditorSliceSelectors";
import {
  pushUndoInPlace,
  undoReducers,
  undoSelectors,
} from "./reducers/undoReducers";
import { changeRoomSceneryInPlace } from "./changeRoomSceneryInPlace";
import { addXyz, type Xyz } from "../../utils/vectors/vectors";
import { keysIter } from "../../utils/entries";

export type LevelEditorState = {
  /** the campaign the user is currently editing */
  campaignInProgress: Campaign<EditorRoomId>;
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

    changeRoomColour(
      _state,
      { payload: colour }: PayloadAction<Partial<ZxSpectrumRoomColour>>,
    ) {
      // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
      // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
      // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
      const state = _state as LevelEditorState;

      const target =
        state.campaignInProgress.rooms[state.currentlyEditingRoomId].color;

      pushUndoInPlace(state);
      Object.assign(target, colour);
    },
    changeRoomScenery(
      _state,
      { payload: sceneryName }: PayloadAction<SceneryName>,
    ) {
      // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
      // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
      // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
      const state = _state as LevelEditorState;

      const roomJson = selectCurrentRoomFromLevelEditorState(state);
      pushUndoInPlace(state);
      changeRoomSceneryInPlace(roomJson, sceneryName);
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

    roomJsonEdited(
      _state,
      { payload: roomJson }: PayloadAction<EditorRoomJson>,
    ) {
      // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
      // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
      // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
      const state = _state as LevelEditorState;
      state.campaignInProgress.rooms[state.currentlyEditingRoomId] = roomJson;
    },

    setHoveredItemInRoom(
      state,
      action: PayloadAction<EditorRoomItemId | undefined>,
    ) {
      state.hoveredJsonItemId = action.payload;
    },
    setClickableAnnotationHovered(state, action: PayloadAction<boolean>) {
      state.clickableAnnotationHovered = action.payload;
    },

    /** set (or unset) the selection */
    setSelectedItemInRoom(
      state,
      {
        payload: { jsonItemId, additive = false },
      }: PayloadAction<{
        jsonItemId: EditorRoomItemId | undefined;
        /** if true, will toggle the given ids to the current selection instead of replacing it
         * this is used for multi-select */
        additive?: boolean;
      }>,
    ) {
      if (additive) {
        if (jsonItemId === undefined) {
          // if no item is given, clear the selection
          state.selectedJsonItemIds = [];
        } else {
          // toggle the given item id in the selection
          const index = state.selectedJsonItemIds.indexOf(jsonItemId);
          if (index === -1) {
            // not selected, add it
            state.selectedJsonItemIds.push(jsonItemId);
          } else {
            // already selected, remove it
            state.selectedJsonItemIds.splice(index, 1);
          }
        }
      } else {
        state.selectedJsonItemIds =
          jsonItemId === undefined ? [] : [jsonItemId];
      }
    },

    moveItemInRoom(
      _state,
      {
        payload: { jsonItemId, positionDelta },
      }: PayloadAction<{
        jsonItemId: EditorRoomItemId;
        positionDelta: Xyz;
      }>,
    ) {
      // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
      // down specifically to the WritableDraft<> type here - immer was making ts slow when we
      // assigned to the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed
      // anyway
      const state = _state as LevelEditorState;
      const roomJson = selectCurrentRoomFromLevelEditorState(state);
      pushUndoInPlace(state);
      const item = roomJson.items[jsonItemId];
      item.position = addXyz(
        roomJson.items[jsonItemId].position,
        positionDelta,
      );
    },

    deleteSelected(_state) {
      // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
      // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
      // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
      const state = _state as LevelEditorState;

      const roomJson = selectCurrentRoomFromLevelEditorState(state);

      pushUndoInPlace(state);

      state.selectedJsonItemIds.forEach((id) => {
        delete roomJson.items[id];
      });

      state.selectedJsonItemIds = [];
    },
    clearRoom(_state) {
      // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
      // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
      // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
      const state = _state as LevelEditorState;

      const roomJson = selectCurrentRoomFromLevelEditorState(state);

      pushUndoInPlace(state);

      for (const k of keysIter(roomJson.items)) {
        const item = roomJson.items[k];
        if (
          item.type !== "floor" &&
          item.type !== "wall" &&
          item.type !== "door"
        ) {
          // remove all items except the floor and walls
          delete roomJson.items[k];
          state.selectedJsonItemIds = state.selectedJsonItemIds.filter(
            (id) => id !== k,
          );
        }
      }
    },

    /**
     * noop reducer to force the store to give this slice its initial value in the store, since this slice is lazy-loaded.
     * Dispatching anything would also have this effect, we just need the reducer to run so it can give the initial state
     */
    injected() {},

    changeGridResolution(
      state,
      { payload: halfGridResolution }: PayloadAction<boolean>,
    ) {
      // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
      // down specifically to the WritableDraft<> type here - immer was making ts slow when we
      // assigned to the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed
      // anyway
      const levelEditorState = state as LevelEditorState;
      levelEditorState.halfGridResolution = halfGridResolution;
    },
    changeWallsFloorsLocked(
      state,
      { payload: wallsFloorsLocked }: PayloadAction<boolean>,
    ) {
      // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
      // down specifically to the WritableDraft<> type here - immer was making ts slow when we
      // assigned to the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed
      // anyway
      const levelEditorState = state as LevelEditorState;
      levelEditorState.wallsFloorsLocked = wallsFloorsLocked;
    },
    changeDragInProgress(
      state,
      { payload: dragInProgress }: PayloadAction<boolean>,
    ) {
      // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
      // down specifically to the WritableDraft<> type here - immer was making ts slow when we
      // assigned to the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed
      // anyway
      const levelEditorState = state as LevelEditorState;
      levelEditorState.dragInProgress = dragInProgress;
    },

    ...undoReducers,
    ...applyToolReducers,
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
