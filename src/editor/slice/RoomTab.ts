import { type EditorRoomId } from "../editorTypes";
import { type EditorRoomView } from "./EditorRoomView";

export type RoomTab = {
  roomId: EditorRoomId;
  /**
   * opened by browsing to the room - the next room browsed to replaces it,
   * until the room is edited or the tab is pinned
   */
  isPreview: boolean;
  /** how the room is framed in the pane; undefined until it is first fitted */
  view: EditorRoomView | undefined;
};
