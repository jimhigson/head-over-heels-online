import { type MapArea } from "../../game/components/dialogs/menuDialog/dialogs/map/MapData";
import { type RoomNode } from "../../model/map/roomGridPositions";
import { valuesIter } from "../../utils/entries";
import { type EditorRoomId } from "../editorTypes";

/** which of the map's areas holds the room */
export const mapAreaIndexOfRoom = (
  areas: ReadonlyArray<MapArea<EditorRoomId>>,
  roomId: EditorRoomId,
): number => {
  const maybeAreaIndex = areas.findIndex((area) =>
    valuesIter<RoomNode<EditorRoomId>>(area.gridPositions).some(
      (roomNode) => roomNode.roomId === roomId,
    ),
  );
  if (import.meta.env.DEV && maybeAreaIndex === -1) {
    throw new Error(`room "${roomId}" is in none of the map's areas`);
  }
  return maybeAreaIndex;
};
