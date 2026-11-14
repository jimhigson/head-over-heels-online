import { valuesIter } from "../../../utils/entries";
import { type LevelEditorState } from "../levelEditorSlice";

/**
 * drop every open room's framing, so each is fitted afresh when next shown -
 * eg after rotating, which moves the rooms' projected extents
 */
export const forgetOpenRoomViewsInPlace = (state: LevelEditorState) => {
  for (const openRoom of valuesIter(state.openRooms)) {
    openRoom.view = undefined;
  }
};
