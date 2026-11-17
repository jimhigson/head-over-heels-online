import { useMapContext } from "./MapContext";

/**
 * whether the cell is in the current room, and whether it is the current
 * sub-room
 */
export const useIsCurrentCell = <RoomId extends string>(
  roomId: RoomId,
  subRoomId: string,
): { isCurrentRoom: boolean; isCurrentSubRoom: boolean } => {
  const { useCurRoomId, useCurSubRoomId } = useMapContext<RoomId>();
  const curRoomId = useCurRoomId();
  const curSubRoomId = useCurSubRoomId();
  const isCurrentRoom = curRoomId === roomId;
  return {
    isCurrentRoom,
    isCurrentSubRoom: isCurrentRoom && curSubRoomId === subRoomId,
  };
};
