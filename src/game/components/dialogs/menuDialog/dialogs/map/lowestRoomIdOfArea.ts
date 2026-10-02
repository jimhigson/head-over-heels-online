import { type RoomNode } from "../../../../../../model/map/roomGridPositions";
import { type SortedObjectOfRoomGridPositionSpecs } from "../../../../../../model/map/sortRoomGridPositions";
import { valuesIter } from "../../../../../../utils/entries";
import { naturalCompare } from "../../../../../../utils/naturalCompare";

/** an area's first room, by the room ids' natural sort order */
export const lowestRoomIdOfArea = <RoomId extends string>(
  gridPositions: SortedObjectOfRoomGridPositionSpecs<RoomId>,
): RoomId =>
  valuesIter<RoomNode<RoomId>>(gridPositions)
    .map(({ roomId }) => roomId)
    .reduce((lowest, roomId) =>
      naturalCompare(roomId, lowest) < 0 ? roomId : lowest,
    );
