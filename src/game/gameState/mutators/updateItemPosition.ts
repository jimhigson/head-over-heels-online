import { type UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import { roomSpatialIndexKey, type RoomState } from "../../../model/RoomState";
import { type Xyz, xyzEqual } from "../../../utils/vectors/vectors";

/**
 * THE way an in-play item's position changes: keeps the spatial index in
 * step and stamps the item as moved on the room's progression count.
 * A no-op (equal) position is skipped entirely, so a fully-blocked movement
 * neither churns the index nor counts as movement
 */
export const updateItemPosition = <
  RoomId extends string,
  RoomItemId extends string,
>(
  room: RoomState<RoomId, RoomItemId>,
  item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  newPosition: Xyz,
) => {
  if (xyzEqual(item.state.position, newPosition)) {
    return;
  }

  item.state.position = newPosition;
  item.state.movedOrResizedOnProgression = ++room.progression;
  room[roomSpatialIndexKey].updateItemSpatialIndex(item);
};
