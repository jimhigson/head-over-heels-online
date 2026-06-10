import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import {
  activationLabel,
  type ActivationState,
  setItemActivationInPlace,
} from "../../itemActivation";
import { type LevelEditorState } from "../levelEditorSlice";
import { mutateSelectedItemsInPlace } from "./mutateSelectedItemsInPlace";

export const itemActivationReducers = {
  /** put all selected items into the given activation (enable/disable) state */
  setSelectedItemsActivation(
    state,
    {
      payload: { activation, timestamp },
    }: PayloadAction<{ activation: ActivationState; timestamp: number }>,
  ) {
    mutateSelectedItemsInPlace(
      state,
      { verb: activationLabel[activation], timestamp },
      (item) => setItemActivationInPlace(item, activation),
    );
  },
} satisfies SliceCaseReducers<LevelEditorState>;
