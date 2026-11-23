import type { PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";

import type { DirectionXyz8 } from "../../../utils/vectors/vectors";
import { setItemDirectionInPlace } from "../../itemDirection";
import type { LevelEditorState } from "../levelEditorSlice";
import { mutateSelectedItemsInPlace } from "./mutateSelectedItemsInPlace";

export const startDirectionReducers = {
  /**
   * set the facing direction of every selected item that has one - writing the
   * monster's `startDirection`, or the `direction` of a lamp's beam or a
   * conveyor, as appropriate
   */
  setSelectedItemsStartDirection(
    state,
    {
      payload: { startDirection, timestamp },
    }: PayloadAction<{ startDirection: DirectionXyz8; timestamp: number }>,
  ) {
    mutateSelectedItemsInPlace(
      state,
      { verb: "Direction", timestamp },
      (item) => setItemDirectionInPlace(item, startDirection),
    );
  },
} satisfies SliceCaseReducers<LevelEditorState>;
