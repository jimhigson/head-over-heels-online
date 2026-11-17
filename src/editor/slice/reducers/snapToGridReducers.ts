import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import { snappedToGridXy } from "../../snappedToGridXy";
import {
  type GridResolution,
  type LevelEditorState,
} from "../levelEditorSlice";
import { mutateSelectedItemsInPlace } from "./mutateSelectedItemsInPlace";

export const snapToGridReducers = {
  /**
   * move every selected item across to the nearest point on the grid
   */
  snapSelectedItemsToGrid(
    state,
    {
      payload: { gridResolution, timestamp },
    }: PayloadAction<{ gridResolution: GridResolution; timestamp: number }>,
  ) {
    mutateSelectedItemsInPlace(state, { verb: "Snap", timestamp }, (item) => {
      item.position = snappedToGridXy(item.position, gridResolution);
    });
  },
} satisfies SliceCaseReducers<LevelEditorState>;
