import { type ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import { type UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlayNarrowedUnions";
import { store } from "../../../store/store";
import { getAtPath } from "../../../utils/getAtPath";

/** whether the item is a teleporter, fixed or portable - whether active or not */
export const isTeleporter = <RoomId extends string, RoomItemId extends string>(
  item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
) => item.type === "teleporter" || item.type === "portableTeleporter";

export const teleporterIsActive = <
  RoomId extends string,
  RoomItemId extends string,
>({
  config: { activatedOnStoreValue },
}: ItemTypeUnion<
  "portableTeleporter" | "teleporter",
  RoomId,
  RoomItemId
>): boolean => {
  return activatedOnStoreValue === undefined ? true : (
      !!getAtPath(store.getState().gameInPlay.gameInPlay, activatedOnStoreValue)
    );
};
