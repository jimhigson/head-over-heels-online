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
export const setStandingOn = <RoomId extends string>({
  above,
  below,
}: {
  above: FreeItem<PlanetName, RoomId>;
  below: UnknownItemInPlay<RoomId>;
}) => {
  above.state.standingOn = below;
  below.state.stoodOnBy.add(above);
};
