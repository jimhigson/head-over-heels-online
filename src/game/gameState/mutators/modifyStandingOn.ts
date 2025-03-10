import type { FreeItem } from "../../physics/itemPredicates";
import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import type { SceneryName } from "../../../sprites/planets";

export const removeStandingOn = <RoomId extends string>(
  item: FreeItem<SceneryName, RoomId>,
) => {
  if (item.state.standingOnItemId !== null) {
    item.state.standingOnItemId.state.stoodOnBy.delete(item);
  }
  item.state.standingOnItemId = null;
};
export const setStandingOn = <
  RoomId extends string,
  RoomItemId extends string,
>({
  above,
  below,
}: {
  above: FreeItem<RoomId, RoomItemId>;
  below: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>;
}) => {
  above.state.standingOnItemId = below.id;
  below.state.stoodOnBy.add(above.id);
};
