import { type FreeItem } from "../../model/ItemInPlayNarrowedUnions";
import { type RoomState } from "../../model/RoomState";
import { epsilon } from "../../utils/epsilon";

/**
 * the vertical speed (px/ms) the item was carried at by what it stood on, if
 * it was carried this tick or the last one - otherwise 0, since it was not
 * being carried
 */
export const liftVelZ = <RoomId extends string, RoomItemId extends string>(
  item: FreeItem<RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  deltaMS: number,
): number => {
  const { liftVel } = item.state;
  return liftVel.atRoomTime >= room.roomTime - deltaMS - epsilon ?
      liftVel.z
    : 0;
};
