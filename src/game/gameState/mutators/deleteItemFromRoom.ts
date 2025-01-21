import type { AnyItemInPlay } from "../../../model/ItemInPlay";
import type { RoomState } from "../../../model/modelTypes";
import type { SceneryName } from "../../../sprites/planets";
import { isFreeItem } from "../../physics/itemPredicates";

export const deleteItemFromRoom = <
  RoomId extends string,
  ItemId extends string,
>({
  room,
  item: itemParam,
}: {
  room: RoomState<SceneryName, RoomId, ItemId>;
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

  // whatever the deleted item had standing on it, it ain't no more:
  for (const s of item.state.stoodOnBy) {
    s.state.standingOn = null;
  }

  // whatever the deleted item was standing on, it aim't no more:
  if (isFreeItem(item) && item.state.standingOn !== null) {
    item.state.standingOn.state.stoodOnBy.delete(item);
    item.state.standingOn = null;
  }
};
