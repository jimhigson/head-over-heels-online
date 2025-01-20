import type { FreeItem } from "../../physics/itemPredicates";
import type { UnknownItemInPlay } from "../../../model/ItemInPlay";
import type { SceneryName } from "../../../sprites/planets";

export const removeStandingOn = <RoomId extends string>(
  item: FreeItem<SceneryName, RoomId>,
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
  above: FreeItem<SceneryName, RoomId>;
  below: UnknownItemInPlay<RoomId>;
}) => {
  above.state.standingOn = below;
  below.state.stoodOnBy.add(above);
};
