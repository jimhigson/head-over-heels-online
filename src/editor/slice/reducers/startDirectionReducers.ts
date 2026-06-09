import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import { type DirectionXy8 } from "../../../utils/vectors/vectors";
import { type LevelEditorState } from "../levelEditorSlice";
import { mutateSelectedItemsInPlace } from "./mutateSelectedItemsInPlace";

export const startDirectionReducers = {
  /** set the start direction of every selected item that has one */
  setSelectedItemsStartDirection(
    state,
    {
      payload: { startDirection, timestamp },
    }: PayloadAction<{ startDirection: DirectionXy8; timestamp: number }>,
  ) {
    mutateSelectedItemsInPlace(
      state,
      { verb: "Direction", timestamp },
      (item) => {
        if ("startDirection" in item.config) {
          // the menu only offers directions valid for every selected item, so the
          // cast past the per-item direction type is safe:
          (item.config as { startDirection: DirectionXy8 }).startDirection =
            startDirection;
        }
      },
    );
  },
} satisfies SliceCaseReducers<LevelEditorState>;
