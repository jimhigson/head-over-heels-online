import type { UnionOfAllItemInPlayTypes } from "../../model/ItemInPlay";
import type { RoomState } from "../../model/RoomState";
import type { FreeItem } from "./itemPredicates";

export const recordActedOnBy = <
  RoomId extends string,
  RoomItemId extends string,
>(
  /** the item pushing or otherwise controlling the other item */
  actingItem: UnionOfAllItemInPlayTypes<RoomId, RoomItemId> | undefined,
  subjectItem: FreeItem<RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
) => {
  const { actedOnAt } = subjectItem.state;
  // it isn't clear why subjectItem would ever *not* be a freeItem
  if (actedOnAt.roomTime === room.roomTime) {
    if (actingItem) {
      actedOnAt.by[actingItem.id] = true;
    }
  } else {
    actedOnAt.by = (actingItem ? { [actingItem.id]: true } : {}) as Record<
      RoomItemId,
      true
    >;
    actedOnAt.roomTime = room.roomTime;
  }
};
