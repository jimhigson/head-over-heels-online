import type { FreeItem } from "../game/physics/itemPredicates";
import { iterate } from "../utils/iterate";
import type { UnionOfAllItemInPlayTypes } from "./ItemInPlay";
import type { StoodOnBy } from "./StoodOnBy";
import type { RoomState } from "./RoomState";
import { keysIter } from "../utils/entries";

/**
 * iterate stood on by, while giving the item objects, not the item ids that are stored on the
 * item that is stood on
 */

export const iterateStoodOnByItems = <
  RoomId extends string,
  RoomItemId extends string,
>(
  stoodOnBy: StoodOnBy<RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
) => {
  return iterate(keysIter(stoodOnBy)).map((stoodOnByItemId) => {
    const standingItem = room.items[stoodOnByItemId];
    if (standingItem === undefined) {
      throw new Error(
        `item in stoodOnBy "${stoodOnByItemId}" is not in the room`,
      );
    }
    return standingItem;
  }) as IteratorObject<FreeItem<RoomId, RoomItemId>>; // cast: we know that only free items can stand on something:
};

/**
 * utility to get the item object of standing on
 * TODO: - really, just gets from room.items - why is this needed/useful?
 */
export function stoodOnItem<RoomId extends string, RoomItemId extends string>(
  // if standingOnItemId not nullable, result not nullable
  standingOnItemId: RoomItemId,
  room: RoomState<RoomId, RoomItemId>,
): UnionOfAllItemInPlayTypes<RoomId, RoomItemId>;
export function stoodOnItem<RoomId extends string, RoomItemId extends string>(
  // if standingOnItemId is nullable, result is nullable
  standingOnItemId: RoomItemId | null,
  room: RoomState<RoomId, RoomItemId>,
): UnionOfAllItemInPlayTypes<RoomId, RoomItemId> | null;
export function stoodOnItem<RoomId extends string, RoomItemId extends string>(
  standingOnItemId: RoomItemId | null,
  room: RoomState<RoomId, RoomItemId>,
) {
  return standingOnItemId === null ?
      // ugly cast makes compatible with non-nullable overload signature
      (null as unknown as UnionOfAllItemInPlayTypes<RoomId, RoomItemId>)
    : room.items[standingOnItemId];
}
