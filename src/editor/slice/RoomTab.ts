import { type EditorRoomId } from "../editorTypes";

export type RoomTab = {
  roomId: EditorRoomId;
  /**
   * opened by browsing to the room - the next room browsed to replaces it,
   * until the room is edited or the tab is pinned
   */
  isPreview: boolean;
};
