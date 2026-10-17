import { type UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlayNarrowedUnions";
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
 * spatial index in step.
 *
 * Deliberately does NOT test the given box against the current one first, replaces
 * even if identical
 *
 * After calling this, you probably want to also call @see {@link stampWithMovedProgression}
 */
export const updateItemBox = <RoomId extends string, RoomItemId extends string>(
  room: RoomState<RoomId, RoomItemId>,
  item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  newBox: Readonly<XyzBox>,
) => {
  item.state.box = newBox;
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

/**
 * stamp an item as moved (or resized) on the room's progression count
 */
export const stampWithMovedProgression = <
  RoomId extends string,
  RoomItemId extends string,
>(
  room: RoomState<RoomId, RoomItemId>,
  item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
) => {
  item.state.movedOrResizedOnProgression = ++room.progression as Progression;
};
