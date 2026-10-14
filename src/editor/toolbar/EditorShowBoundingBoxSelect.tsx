import { ShowBoundingBoxSelect } from "../../game/debug/ShowBoundingBoxSelect";
import { editorLoadedRoom } from "../editorLoadedRoom";

export const EditorShowBoundingBoxSelect = () => (
  <ShowBoundingBoxSelect
    getCurrentRoomItems={() => editorLoadedRoom.getRoomState().items}
  />
);
