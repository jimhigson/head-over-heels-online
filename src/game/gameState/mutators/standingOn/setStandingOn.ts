import type { UnionOfAllItemInPlayTypes } from "../../../../model/ItemInPlay";
import type { FreeItem } from "../../../physics/itemPredicates";

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

  console.log(
    "⭐️ setStandingOn :: setting standing on; above=",
    above.id,
    "; below=",
    below.id,
  );

  // TODO: this kind of protection could be hidden behind a macro etc
  if (!Object.isExtensible(belowStoodOnBy)) {
    throw new Error(
      `${above.id} can't stand on ${below.id} - its standingOn is not extensible`,
    );
  }

  above.state.standingOnItemId = below.id;
  belowStoodOnBy[above.id] = true;
};
