import { ShowBoundingBoxSelect } from "../../game/debug/ShowBoundingBoxSelect";
import { activeOpenRoomLoadedRoom } from "../loadedRoomCache/loadedRoomCaches";

export const EditorShowBoundingBoxSelect = () => (
  <ShowBoundingBoxSelect
    getCurrentRoomItems={() => activeOpenRoomLoadedRoom()?.getRoomState().items}
  />
);
