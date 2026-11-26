import type { PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";

import type { FloorType } from "../../../model/json/ItemConfigMap";
import type { SceneryName } from "../../../sprites/planets";
import { selectCurrentCommittedRoomJsonFromLevelEditorState } from "../levelEditorSelectors";
import type { LevelEditorState } from "../levelEditorSlice";
import { clearContextMenuXyInPlace } from "./contextMenuReducers";
import { mutateSelectedItemsInPlace } from "./mutateSelectedItemsInPlace";

export const floorReducers = {
  /**
   * make every selected floor deadly, standable or fallable (`none`). A floor
   * newly made standable takes the room's planet as its scenery
   */
  setSelectedFloorsType(
    state,
    {
      payload: { floorType, timestamp },
    }: PayloadAction<{ floorType: FloorType; timestamp: number }>,
  ) {
    const { planet } =
      selectCurrentCommittedRoomJsonFromLevelEditorState(state);
    mutateSelectedItemsInPlace(
      state,
      { verb: "Floor type", timestamp },
      (item) => {
        if (item.type !== "floor" || item.config.floorType === floorType) {
          return;
        }
        const {
          config: { times },
        } = item;
        item.config =
          floorType === "standable" ?
            { floorType, scenery: planet, times }
          : { floorType, times };
      },
    );
    clearContextMenuXyInPlace(state);
  },
  /**
   * set the scenery of every selected standable floor
   */
  setSelectedFloorsScenery(
    state,
    {
      payload: { scenery, timestamp },
    }: PayloadAction<{ scenery: SceneryName; timestamp: number }>,
  ) {
    mutateSelectedItemsInPlace(
      state,
      { verb: "Floor scenery", timestamp },
      (item) => {
        if (item.type === "floor" && item.config.floorType === "standable") {
          item.config.scenery = scenery;
        }
      },
    );
  },
} satisfies SliceCaseReducers<LevelEditorState>;
