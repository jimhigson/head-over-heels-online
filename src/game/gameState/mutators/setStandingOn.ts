import type { FreeItem } from "../../physics/itemPredicates";
import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";

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
  below.state.stoodOnBy[above.id] = true;
};
