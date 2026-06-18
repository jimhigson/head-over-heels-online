import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import { type DirectionXy8 } from "../../../utils/vectors/vectors";
import { setItemDirectionInPlace } from "../../itemDirection";
import { type LevelEditorState } from "../levelEditorSlice";
import { mutateSelectedItemsInPlace } from "./mutateSelectedItemsInPlace";

export const startDirectionReducers = {
  /**
   * set the facing direction of every selected item that has one - writing the
   * monster's `startDirection` or the lamp's beam `direction` as appropriate
   */
  setSelectedItemsStartDirection(
    state,
    {
      payload: { startDirection, timestamp },
    }: PayloadAction<{ startDirection: DirectionXy8; timestamp: number }>,
  ) {
    mutateSelectedItemsInPlace(
      state,
      { verb: "Direction", timestamp },
      (item) => setItemDirectionInPlace(item, startDirection),
    );
  },
} satisfies SliceCaseReducers<LevelEditorState>;
