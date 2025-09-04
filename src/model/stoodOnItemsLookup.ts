import type { UnindexedRoomState } from "../game/gameState/saving/SavedGameState";
import type { FreeItem } from "../game/physics/itemPredicates";
import type { UnionOfAllItemInPlayTypes } from "./ItemInPlay";
import type { StoodOnBy } from "./StoodOnBy";

import { keysIter } from "../utils/entries";
import { iterate } from "../utils/iterate";

/**
 * iterate stood on by, while giving the item objects, not the item ids that are stored on the
 * item that is stood on
 */

export const iterateStoodOnByItems = <
  RoomId extends string,
  RoomItemId extends string,
>(
  stoodOnBy: StoodOnBy<RoomItemId>,
  room: UnindexedRoomState<RoomId, RoomItemId>,
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
  room: UnindexedRoomState<RoomId, RoomItemId>,
): UnionOfAllItemInPlayTypes<RoomId, RoomItemId>;
export function stoodOnItem<RoomId extends string, RoomItemId extends string>(
  // if standingOnItemId is nullable, result is nullable
  standingOnItemId: null | RoomItemId,
  room: UnindexedRoomState<RoomId, RoomItemId>,
): null | UnionOfAllItemInPlayTypes<RoomId, RoomItemId>;
export function stoodOnItem<RoomId extends string, RoomItemId extends string>(
  standingOnItemId: null | RoomItemId,
  room: UnindexedRoomState<RoomId, RoomItemId>,
) {
  return standingOnItemId === null ?
      // ugly cast makes compatible with non-nullable overload signature
      (null as unknown as UnionOfAllItemInPlayTypes<RoomId, RoomItemId>)
    : room.items[standingOnItemId];
}
