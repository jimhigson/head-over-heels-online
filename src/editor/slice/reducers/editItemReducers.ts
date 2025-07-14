import type { PayloadAction } from "@reduxjs/toolkit";
import { type SliceCaseReducers } from "@reduxjs/toolkit";
import { type LevelEditorState } from "../levelEditorSlice";

import type {
  EditorJsonItemWithTimes,
  EditorRoomItemId,
} from "../../editorTypes";
import type { Xyz } from "../../../utils/vectors/vectors";
import { selectItemInLevelEditorState } from "../levelEditorSliceSelectors";
import { pushUndoInPlace } from "./undoReducers";

export const editItemReducers = {
  /** add or remove the room above the current room */
  moveOrResizeItem(
    _state,
    {
      payload: { jsonItemId, newTimes, newPosition, startOfGesture },
    }: PayloadAction<{
      jsonItemId: EditorRoomItemId;
      newTimes?: Xyz;
      newPosition?: Xyz;
      startOfGesture: boolean;
    }>,
  ) {
    const state = _state as LevelEditorState;

    // we don't want to push an undo for every incremental change
    // that happens while the user is dragging with the mouse,
    // only at the start
    if (startOfGesture) pushUndoInPlace(state);

    const jsonItem = selectItemInLevelEditorState(state, jsonItemId);

    if (jsonItem === undefined) {
      console.warn("no json item found for resize", jsonItemId);
      return;
    }

    // TODO: for wall items, put extra tiles in for visible walls,
    // don't set the times property

    if (newTimes !== undefined) {
      const { config } = jsonItem as EditorJsonItemWithTimes;
      // minimally update, to not add properties that aren't needed. Not all
      // configs can accept all of x,y,z - so, need to be careful not to over-add
      // and break the json schema. This also keeps the json a tiny bit smaller.
      config.times = {
        ...(newTimes.x === 1 ? {} : { x: newTimes.x }),
        ...(newTimes.y === 1 ? {} : { y: newTimes.y }),
        ...(newTimes.z === 1 ? {} : { z: newTimes.z }),
      };
    }
    if (newPosition !== undefined) {
      jsonItem.position = newPosition;
    }
  },
} satisfies SliceCaseReducers<LevelEditorState>;
