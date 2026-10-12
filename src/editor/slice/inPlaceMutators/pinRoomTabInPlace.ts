import { type EditorRoomId } from "../../editorTypes";
import { type LevelEditorState } from "../levelEditorSlice";

/** keep the room's tab open when other rooms are browsed to */
export const pinRoomTabInPlace = (
  state: LevelEditorState,
  roomId: EditorRoomId,
) => {
  const roomTab = state.openRoomTabs.find(
    (openRoomTab) => openRoomTab.roomId === roomId,
  );
  if (roomTab !== undefined) {
    roomTab.isPreview = false;
  }
};
