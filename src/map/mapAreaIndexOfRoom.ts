import { type RoomNode } from "../model/map/roomGridPositions";
import { valuesIter } from "../utils/entries";
import { type MapArea } from "./MapData";

/** which of the map's areas holds the room */
export const mapAreaIndexOfRoom = <RoomId extends string>(
  areas: ReadonlyArray<MapArea<RoomId>>,
  roomId: RoomId,
): number => {
  const maybeAreaIndex = areas.findIndex((area) =>
    valuesIter<RoomNode<RoomId>>(area.gridPositions).some(
      (roomNode) => roomNode.roomId === roomId,
    ),
  );
  if (import.meta.env.DEV && maybeAreaIndex === -1) {
    throw new Error(`room "${roomId}" is in none of the map's areas`);
  }
  return maybeAreaIndex;
};
