import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import { type MirrorOrientation } from "../../../model/MirrorOrientation";
import { type LevelEditorState } from "../levelEditorSlice";
import { mutateSelectedItemsInPlace } from "./mutateSelectedItemsInPlace";

export const mirrorOrientationReducers = {
  /** set the pane orientation of every selected mirror */
  setSelectedItemsMirrorOrientation(
    state,
    {
      payload: { orientation, timestamp },
    }: PayloadAction<{ orientation: MirrorOrientation; timestamp: number }>,
  ) {
    mutateSelectedItemsInPlace(
      state,
      { verb: "Orientation", timestamp },
      (item) => {
        if (item.type === "mirror") {
          item.config.orientation = orientation;
        }
      },
    );
  },
} satisfies SliceCaseReducers<LevelEditorState>;
