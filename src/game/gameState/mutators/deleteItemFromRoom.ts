import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import type { UnindexedRoomState } from "../saving/SavedGameState";

import { roomSpatialIndexKey, type RoomState } from "../../../model/RoomState";
import { iterateStoodOnByItems } from "../../../model/stoodOnItemsLookup";
import { isFreeItem } from "../../physics/itemPredicates";
import { removeStandingOn } from "./removeStandingOn";

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
  // same as removing from an unindexed room, except we also remove from the index
  const item = deleteItemFromUnindexedRoom({ room, item: itemParam });
  const spatialIndex = room[roomSpatialIndexKey];

  spatialIndex.removeItem(item);
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

  // whatever the deleted item was standing on, it aim't no more:
  if (isFreeItem(item)) {
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
