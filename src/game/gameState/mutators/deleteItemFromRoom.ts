import type { AnyItemInPlay } from "@/model/ItemInPlay";
import type { RoomState } from "@/model/modelTypes";
import type { PlanetName } from "@/sprites/planets";
import { isFreeItem } from "@/game/physics/itemPredicates";

export const deleteItemFromRoom = <RoomId extends string>({
  room,
  item,
}: {
  room: RoomState<PlanetName, RoomId>;
  item: AnyItemInPlay;
}) => {
  // ain't in that room no more:
  delete room.items[item.id];

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
