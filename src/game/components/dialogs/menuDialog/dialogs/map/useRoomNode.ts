import { type RoomNode } from "../../../../../../model/map/roomGridPositions";
import { useMapContext } from "./MapContext";

/**
 * Get the @see RoomNode for any cell, describing where it will be drawn and
 * what edges it has to link to other rooms
 */
export const useRoomNode = <RoomId extends string>(
  roomId: RoomId,
  subRoomId: string,
): RoomNode<RoomId> =>
  useMapContext<RoomId>().useShownArea().gridPositions[
    `${roomId}/${subRoomId}`
  ];
