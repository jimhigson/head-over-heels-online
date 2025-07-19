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
  const belowStoodOnBy = below.state.stoodOnBy;

  // TODO: this kind of protection could be hidden behind a macro etc
  if (!Object.isExtensible(belowStoodOnBy)) {
    throw new Error(
      `${above.id} can't stand on ${below.id} - its standingOn is not extensible`,
    );
  }

  above.state.standingOnItemId = below.id;
  belowStoodOnBy[above.id] = true;
};
