import type { UnknownItemInPlay } from "@/model/ItemInPlay";
import type { PlanetName } from "@/sprites/planets";
import type { FreeItem } from "../../physics/itemPredicates";

export const removeStandingOn = <RoomId extends string>(
  item: FreeItem<PlanetName, RoomId>,
) => {
  if (item.state.standingOn !== null) {
    item.state.standingOn.state.stoodOnBy.delete(item);
  }
  item.state.standingOn = null;
};
export const setStandingOn = <RoomId extends string>(
  item: FreeItem<PlanetName, RoomId>,
  standingOn: UnknownItemInPlay<RoomId>,
) => {
  console.log("standing on changed:", item.id, "is now on", standingOn.id);

  item.state.standingOn = standingOn;
  standingOn.state.stoodOnBy.add(item);
};
