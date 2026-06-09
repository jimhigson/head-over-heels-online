import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import { type JsonMovement } from "../../../model/json/utilityJsonConfigTypes";
import { type LevelEditorState } from "../levelEditorSlice";
import { mutateSelectedItemsInPlace } from "./mutateSelectedItemsInPlace";

export const monsterMovementReducers = {
  /** set the movement of every selected monster */
  setSelectedMonstersMovement(
    state,
    {
      payload: { movement, timestamp },
    }: PayloadAction<{ movement: JsonMovement; timestamp: number }>,
  ) {
    mutateSelectedItemsInPlace(
      state,
      { verb: "Movement", timestamp },
      (item) => {
        if (item.type === "monster") {
          // the menu only offers movements valid for every selected monster, so the
          // cast past the per-monster movement union is safe:
          (item.config as { movement: JsonMovement }).movement = movement;
        }
      },
    );
  },
} satisfies SliceCaseReducers<LevelEditorState>;
