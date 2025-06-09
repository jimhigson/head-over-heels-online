import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { SetRequired, ValueOf } from "type-fest";
import type { Campaign } from "../../model/modelTypes";
import { rotatingSceneryTiles, starterRoom } from "./createStarterRoom";
import { type EditorRoomId, type EditorRoomItemId } from "../EditorRoomId";
import type { Tool } from "../Tool";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import type { ZxSpectrumRoomColour } from "../../originalGame";
import { sceneryNames, type SceneryName } from "../../sprites/planets";
import { applyToolReducers } from "./reducers/applyToolToRoomJson";
import { selectCurrentRoomFromLevelEditorState } from "./levelEditorSliceSelectors";

export type LevelEditorState = {
  /** the campaign the user is currently editing */
  campaignInProgress: Campaign<EditorRoomId>;
  currentlyEditingRoomId: EditorRoomId;
  nextItemId: number;
  tool: Tool;
  selectedItem?: EditorRoomItemId;
};

const initialRoomId = "untitledRoom" as EditorRoomId;
const initialRoom = { ...starterRoom, id: initialRoomId };
export const initialLevelEditorSliceState: LevelEditorState = {
  campaignInProgress: {
    name: "new campaign",
    rooms: {
      [initialRoomId]: initialRoom,
    },
  },
  nextItemId: 0,
  currentlyEditingRoomId: initialRoomId,
  tool: { type: "pointer" },
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

      const roomJson =
        state.campaignInProgress.rooms[state.currentlyEditingRoomId];
      roomJson.planet = sceneryName;

      if ((sceneryNames as string[]).includes(roomJson.floor)) {
        roomJson.floor = sceneryName;
      }

      // reset the walls to tiles that are allowed in this scenery:
      for (const i of Object.values(roomJson.items)) {
        if (i.type === "wall") {
          if (i.config.direction === "away" || i.config.direction === "left") {
            i.config.tiles = rotatingSceneryTiles(
              sceneryName,
              i.config.tiles.length,
            );
          }
        }
      }
    },

    ...applyToolReducers,

    /**
     * noop reducer to force the store to give this slice its initial value in the store, since this slice is lazy-loaded.
     * Dispatching anything would also have this effect, we just need the reducer to run so it can give the initial state
     */
    injected() {},
  },
  selectors: {
    selectCurrentEditingRoomJson: selectCurrentRoomFromLevelEditorState,
    selectCurrentEditingRoomColour: (state) =>
      selectCurrentRoomFromLevelEditorState(state).color,
    selectCurrentEditingRoomScenery: (state) =>
      selectCurrentRoomFromLevelEditorState(state).planet,
    selectTool: (state) => state.tool,
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
  changeRoomColour,
  changeRoomScenery,
  injected,
  setTool,
} = levelEditorSlice.actions;
export const {
  selectCurrentEditingRoomJson,
  selectTool,
  selectCurrentEditingRoomColour,
  selectCurrentEditingRoomScenery,
} = levelEditorSlice.selectors;

export type RootStateWithLevelEditorSlice = SetRequired<
  RootState,
  "levelEditor"
>;

/** special useSelector for when we know the level editor slice is loaded */
export const useAppSelectorWithLevelEditorSlice =
  useSelector.withTypes<RootStateWithLevelEditorSlice>();
