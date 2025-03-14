import type { FreeItem } from "../../physics/itemPredicates";
import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import { stoodOnItem } from "../../../model/stoodOnItemsLookup";
import type { RoomState } from "../../../model/RoomState";

export const removeStandingOn = <
  RoomId extends string,
  RoomItemId extends string,
>(
  item: FreeItem<RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
) => {
  if (item.state.standingOnItemId !== null) {
    const standingOn = stoodOnItem(item.state.standingOnItemId, room);
    delete standingOn.state.stoodOnBy[item.id];
    item.state.standingOnItemId = null;
  }
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
  below.state.stoodOnBy[above.id] = true;
};
