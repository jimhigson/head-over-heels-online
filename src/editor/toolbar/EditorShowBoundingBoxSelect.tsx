import { ShowBoundingBoxSelect } from "../../game/debug/ShowBoundingBoxSelect";
import { activePaneLoadedRoom } from "../paneLoadedRooms";

export const EditorShowBoundingBoxSelect = () => (
  <ShowBoundingBoxSelect
    getCurrentRoomItems={() => activePaneLoadedRoom()?.getRoomState().items}
  />
);
