import type { AnyItemInPlay } from "../../../model/ItemInPlay";
import type { RoomState } from "../../../model/RoomState";
import { iterateStoodOnByItems } from "../../../model/stoodOnItemsLookup";
import { isFreeItem } from "../../physics/itemPredicates";
import { removeStandingOn } from "./modifyStandingOn";

export const deleteItemFromRoom = <
  RoomId extends string,
  ItemId extends string,
>({
  room,
  item: itemParam,
}: {
  room: RoomState<RoomId, ItemId>;
  item: AnyItemInPlay<RoomId, ItemId> | ItemId;
}) => {
  const item =
    typeof itemParam === "string" ? room.items[itemParam] : itemParam;

  if (typeof itemParam === "string") {
    delete room.items[itemParam];
  } else {
    type K = keyof typeof room.items;
    delete room.items[item.id as K];
  }

  // whatever the deleted item was standing on, it aim't no more:
  if (isFreeItem(item)) {
    removeStandingOn(item, room);
  }
  // and nothing can be stood on us either:
  for (const standerOn of iterateStoodOnByItems(item.state.stoodOnBy, room)) {
    removeStandingOn(standerOn, room);
  }
};
