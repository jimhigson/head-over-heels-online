import type { FreeItem } from "../game/physics/itemPredicates";
import { iterate } from "../utils/iterate";
import type { UnionOfAllItemInPlayTypes } from "./ItemInPlay";
import type { RoomState } from "./RoomState";

/**
 * iterate stood on by, while giving the item objects, not the item ids that are stored on the
 * item that is stood on
 */

export const iterateStoodOnByItems = <
  RoomId extends string,
  RoomItemId extends string,
>(
  stoodOnBy: Set<RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
) => {
  return iterate(stoodOnBy).map(
    (stoodOnByItemId) => room.items[stoodOnByItemId],
  ) as IteratorObject<FreeItem<RoomId, RoomItemId>>; // cast: we know that only free items can stand on something:
};
/** utility to get the item object of standing on */

export function stoodOnItem<RoomId extends string, RoomItemId extends string>(
  standingOnItemId: RoomItemId,
  room: RoomState<RoomId, RoomItemId>,
): UnionOfAllItemInPlayTypes<RoomId, RoomItemId>;
export function stoodOnItem<RoomId extends string, RoomItemId extends string>(
  standingOnItemId: RoomItemId | null,
  room: RoomState<RoomId, RoomItemId>,
): UnionOfAllItemInPlayTypes<RoomId, RoomItemId> | null;
export function stoodOnItem<RoomId extends string, RoomItemId extends string>(
  standingOnItemId: RoomItemId | null,
  room: RoomState<RoomId, RoomItemId>,
) {
  return standingOnItemId === null ?
      // cast makes compatible with non-nullable overload signature
      (null as unknown as UnionOfAllItemInPlayTypes<RoomId, RoomItemId>)
    : room.items[standingOnItemId];
}
