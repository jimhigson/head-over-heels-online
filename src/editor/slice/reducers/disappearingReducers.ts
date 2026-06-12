import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import { type LevelEditorState } from "../levelEditorSlice";
import { mutateSelectedItemsInPlace } from "./mutateSelectedItemsInPlace";

export const disappearingReducers = {
  /** add or remove "disappear on stand" on every selected block/conveyor */
  setSelectedItemsDisappearing(
    state,
    {
      payload: { disappearing, timestamp },
    }: PayloadAction<{ disappearing: boolean; timestamp: number }>,
  ) {
    mutateSelectedItemsInPlace(
      state,
      { verb: "Disappearing", timestamp },
      (item) => {
        if (item.type === "block" || item.type === "conveyor") {
          if (disappearing) {
            item.config.disappearing = { on: "stand" };
          } else {
            delete item.config.disappearing;
          }
        }
      },
    );
  },
} satisfies SliceCaseReducers<LevelEditorState>;
