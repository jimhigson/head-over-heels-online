import { itemBehaviourKey } from "../../../model/ItemInPlay";
import { type UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlayNarrowedUnions";
import { roomSpatialIndexKey, type RoomState } from "../../../model/RoomState";
import {
  itemIsStandingOnSomething,
  iterateStoodOnByItems,
} from "../../../model/stoodOnItemsLookup";
import { type UnindexedRoomState } from "../saving/SavedGameState";
import { removeStandingOn } from "./standingOn/removeStandingOn";

export const deleteItemFromRoom = <
  RoomId extends string,
  ItemId extends string,
>({
  room,
  item: itemParam,
}: {
  room: RoomState<RoomId, ItemId>;
  item: ItemId | UnionOfAllItemInPlayTypes<RoomId, ItemId>;
}) => {
  const item = deleteItemFromUnindexedRoom({ room, item: itemParam });
  if (!item[itemBehaviourKey].isPositionless(item)) {
    const spatialIndex = room[roomSpatialIndexKey];
    spatialIndex.removeItem(item);
  }
};

/**
 * @return the item that was deleted
 */
export const deleteItemFromUnindexedRoom = <
  RoomId extends string,
  ItemId extends string,
>({
  room,
  item: itemParam,
}: {
  room: UnindexedRoomState<RoomId, ItemId>;
  item: ItemId | UnionOfAllItemInPlayTypes<RoomId, ItemId>;
}): UnionOfAllItemInPlayTypes<RoomId, ItemId> => {
  const item =
    typeof itemParam === "string" ? room.items[itemParam] : itemParam;

  // whatever the deleted item was standing on, it aim't no more. The room may be
  // a saved copy, whose items have no behaviours, so this can't ask the behaviour:
  if (itemIsStandingOnSomething(item)) {
    removeStandingOn(item, room);
  }
  // and nothing can be stood on us either:
  for (const standerOn of iterateStoodOnByItems(item.state.stoodOnBy, room)) {
    removeStandingOn(standerOn, room);
  }

  if (typeof itemParam === "string") {
    delete room.items[itemParam];
  } else {
    type K = keyof typeof room.items;
    delete room.items[item.id as K];
  }

  return item;
};
