import { type EditorRoomId } from "../../editorTypes";
import { type LevelEditorState } from "../levelEditorSlice";
import { findRoomTab } from "../OpenRoom";

/** keep the room's tab open when other rooms are browsed to */
export const pinRoomTabInPlace = (
  state: LevelEditorState,
  roomId: EditorRoomId,
) => {
  const roomTab = findRoomTab(state, roomId);
  if (roomTab !== undefined) {
    roomTab.isPreview = false;
  }
};
