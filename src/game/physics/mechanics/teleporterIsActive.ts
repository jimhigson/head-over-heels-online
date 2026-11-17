import { type ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import { type UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlayNarrowedUnions";
import { type PlanetsLiberated } from "../../../store/slices/gameInPlay/gameInPlaySlice";

/** whether the item is a teleporter, fixed or portable - whether active or not */
export const isTeleporter = <RoomId extends string, RoomItemId extends string>(
  item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
) => item.type === "teleporter" || item.type === "portableTeleporter";

export const teleporterIsActive = <
  RoomId extends string,
  RoomItemId extends string,
>(
  {
    config: { activatedIfPlanetLiberated },
  }: ItemTypeUnion<"portableTeleporter" | "teleporter", RoomId, RoomItemId>,
  /**
   * which planets have been liberated so far
   */
  planetsLiberated: PlanetsLiberated,
): boolean =>
  activatedIfPlanetLiberated === undefined ||
  planetsLiberated[activatedIfPlanetLiberated];
