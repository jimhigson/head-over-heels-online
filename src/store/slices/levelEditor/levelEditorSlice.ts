import { createSlice } from "@reduxjs/toolkit";
import type { ValueOf } from "type-fest";
import type { Campaign } from "../../../model/modelTypes";
import { createStarterRoom } from "./createStarterRoom";
import type { EditorRoomId } from "./EditorRoomId";

export type LevelEditorState = {
  /** the campaign the user is currently editing */
  campaignInProgress: Campaign<EditorRoomId>;
  currentlyEditingRoom: EditorRoomId;
};

const initialRoomName = "untitledRoom" as EditorRoomId;
export const initialLevelEditorSliceState: LevelEditorState = {
  campaignInProgress: {
    name: "new campaign",
    rooms: {
      [initialRoomName]: createStarterRoom(),
    },
  },
  currentlyEditingRoom: initialRoomName,
};

/**
 * a slice for all the state that is controlled in react-land
 * (most state is controlled in the game itself and not touched here)
 */
export const levelEditorSlice = createSlice({
  name: "levelEditor",
  initialState: initialLevelEditorSliceState,
  reducers: {
    placeholderActionDelete() {},
  },
});

export type LevelEditorSliceAction = ReturnType<
  ValueOf<typeof levelEditorSlice.actions>
>;

export type LevelEditorSliceActionCreator = ValueOf<
  typeof levelEditorSlice.actions
>;

export const { placeholderActionDelete } = levelEditorSlice.actions;

export const levelEditorSliceActions = levelEditorSlice.actions;
