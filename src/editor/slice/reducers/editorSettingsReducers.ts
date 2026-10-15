import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import { doorItemTool } from "../../RoomEditingArea/interactivity/doorItemTool";
import {
  type GridResolution,
  type LevelEditorState,
} from "../levelEditorSlice";

export const editorSettingsReducers = {
  changeGridResolution(state, { payload: res }: PayloadAction<GridResolution>) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we
    // assigned to the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed
    // anyway
    const levelEditorState = state as LevelEditorState;
    levelEditorState.gridResolution = res;
  },
  /** whether placing a door also adds a room beyond it */
  changeDoorAutoAddsRoom(
    state,
    { payload: doorAutoAddsRoom }: PayloadAction<boolean>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we
    // assigned to the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed
    // anyway
    const levelEditorState = state as LevelEditorState;
    levelEditorState.doorAutoAddsRoom = doorAutoAddsRoom;
    // a selected door tool becomes the door tool for the new setting:
    if (
      levelEditorState.tool.type === "item" &&
      levelEditorState.tool.item.type === "door"
    ) {
      levelEditorState.tool = {
        type: "item",
        item: doorItemTool(doorAutoAddsRoom),
      };
    }
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
} satisfies SliceCaseReducers<LevelEditorState>;
