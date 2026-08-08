import { type UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import {
  type Progression,
  roomSpatialIndexKey,
  type RoomState,
} from "../../../model/RoomState";
import { type Xyz, xyzEqual } from "../../../utils/vectors/vectors";

/**
 * THE way an in-play item's position changes: keeps the spatial index
 * up to date and assign the item to the room's (incremented) progression count.
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
    // skip updating the index or progression
    // TODO: can we statically  experimentally verify anything actually does zero movements?
    return;
  }

  item.state.position = newPosition;
  item.state.movedOrResizedOnProgression = ++room.progression as Progression;
  room[roomSpatialIndexKey].updateItemSpatialIndex(item);
};
