import { type UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import {
  type Progression,
  roomSpatialIndexKey,
  type RoomState,
} from "../../../model/RoomState";
import {
  boxAt,
  type Xyz,
  type XyzBox,
  xyzEqual,
} from "../../../utils/vectors/vectors";

/**
 * THE way an in-play item's box changes (moves and/or resizes): keeps the
 * spatial index in step and stamps the item as moved on the room's
 * progression count.
 *
 * Deliberately does NOT test the given box against the current one first. Such
 * a test costs six comparisons on every call - this is the physics hot path,
 * called hundreds of thousands of times in half a minute of play - and buys
 * nothing here: {@link updateItemPosition} has already rejected a standstill
 * before it builds a box, and a caller that re-derives a box from scratch each
 * tick can compare far more cheaply on its own terms than every mover pays for
 * it. So the contract is that the box given really is a new one.
 *
 * Note that a movement blocked by an obstacle is NOT a standstill: a mover
 * that applies its whole delta and then backs off out of the obstacle passes
 * two boxes, each genuinely different from the one before it.
 */
export const updateItemBox = <RoomId extends string, RoomItemId extends string>(
  room: RoomState<RoomId, RoomItemId>,
  item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  newBox: Readonly<XyzBox>,
) => {
  item.state.box = newBox;
  item.state.movedOrResizedOnProgression = ++room.progression as Progression;
  room[roomSpatialIndexKey].updateItemSpatialIndex(item);
};

/**
 * move an item without resizing it - see {@link updateItemBox}, which this
 * funnels through.
 *
 * A standstill IS worth rejecting here, unlike in {@link updateItemBox}: it
 * costs three comparisons rather than six, movers genuinely do ask for a
 * position they are already at, and rejecting it saves building a box that
 * would only be thrown away
 */
export const updateItemPosition = <
  RoomId extends string,
  RoomItemId extends string,
>(
  room: RoomState<RoomId, RoomItemId>,
  item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  newPosition: Xyz,
) => {
  if (xyzEqual(item.state.box, newPosition)) {
    return;
  }

  updateItemBox(room, item, boxAt(newPosition, item.state.box));
};
