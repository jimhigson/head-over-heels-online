import type { ItemInPlayType } from "../../model/itemInPlay/ItemInPlay";
import type { UnionOfAllItemInPlayTypes } from "../../model/itemInPlay/ItemInPlayNarrowedUnions";
import type { RoomState } from "../../model/RoomState";

/**
 * whether the item is being acted on at the room's current time by an item of
 * the given type (eg, charles by a joystick)
 */
export const isActedOnNowByItemOfType = <
  RoomId extends string,
  RoomItemId extends string,
>(
  item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  actorType: ItemInPlayType,
): boolean => {
  const { actedOnAt } = item.state;
  if (actedOnAt.roomTime !== room.roomTime) {
    return false;
  }
  for (const actorId in actedOnAt.by) {
    if (room.items[actorId].type === actorType) {
      return true;
    }
  }
  return false;
};
