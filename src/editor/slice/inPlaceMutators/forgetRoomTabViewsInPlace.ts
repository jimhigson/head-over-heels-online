import { type LevelEditorState } from "../levelEditorSlice";

/**
 * drop every tab's framing of its room, so each is fitted afresh when next
 * shown - eg after rotating, which moves the rooms' projected extents
 */
export const forgetRoomTabViewsInPlace = (state: LevelEditorState) => {
  for (const roomTab of state.openRoomTabs) {
    roomTab.view = undefined;
  }
};
