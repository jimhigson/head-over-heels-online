import type { PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";

import { exitGameRoomId } from "../../../model/json/ItemConfigMap";
import type { LevelEditorState } from "../levelEditorSlice";
import { clearContextMenuXyInPlace } from "./contextMenuReducers";
import { mutateSelectedItemsInPlace } from "./mutateSelectedItemsInPlace";

export const doorGameEndReducers = {
  /**
   * make every selected door end the game. Which door or sub-room it led
   * into no longer applies, so is dropped
   */
  setSelectedDoorsToGameEnd(
    state,
    { payload: { timestamp } }: PayloadAction<{ timestamp: number }>,
  ) {
    mutateSelectedItemsInPlace(
      state,
      { verb: "Make game end", timestamp },
      (item) => {
        if (item.type === "door") {
          const {
            config: { direction },
          } = item;
          item.config = { direction, toRoom: exitGameRoomId };
        }
      },
    );
    clearContextMenuXyInPlace(state);
  },
} satisfies SliceCaseReducers<LevelEditorState>;
