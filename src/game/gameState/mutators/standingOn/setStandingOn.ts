import type { UnionOfAllItemInPlayTypes } from "../../../../model/ItemInPlay";
import type { FreeItem } from "../../../physics/itemPredicates";

/**
 * WARN: calling this could cause inconsistent state if the item
 * above was already standing on something - if this is possible,
 * it must be removed first
 */
export const setStandingOnWithoutRemovingOldFirst = <
  RoomId extends string,
  RoomItemId extends string,
>({
  above,
  below,
}: {
  above: FreeItem<RoomId, RoomItemId>;
  below: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>;
}) => {
  const belowStoodOnBy = below.state.stoodOnBy;

  if (!Object.isExtensible(belowStoodOnBy)) {
    throw new Error(
      `${above.id} can't stand on ${below.id} - its standingOn is not extensible`,
    );
  }

  above.state.standingOnItemId = below.id;
  belowStoodOnBy[above.id] = true;
};
