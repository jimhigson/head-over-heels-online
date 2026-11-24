import type { SetNonNullableDeep } from "type-fest";

import type { UnindexedRoomState } from "../game/gameState/saving/SavedGameState";
import { coyoteTime } from "../game/physics/mechanicsConstants";
import { itemBehaviourKey } from "./ItemInPlay";
import type {
  FreeItem,
  UnionOfAllItemInPlayTypes,
} from "./ItemInPlayNarrowedUnions";
import type { PlayableState } from "./ItemStateMap";
import type { RoomState } from "./RoomState";
import type { StoodOnBy } from "./StoodOnBy";

export const itemIsStandingOnSomething = <
  RoomId extends string,
  RoomItemId extends string,
>(
  item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
): item is SetNonNullableDeep<
  FreeItem<RoomId, RoomItemId>,
  "state.standingOnItemId"
> => {
  return !!(item.state as { standingOnItemId?: null | string })
    .standingOnItemId;
};

/**
 * the item object for an id in another item's stoodOnBy - loop over stoodOnBy
 * with for...in and look each up with this, which allocates nothing
 */
export const stoodOnByItem = <RoomId extends string, RoomItemId extends string>(
  /**
   * an id from the stood on item's stoodOnBy
   */
  standerId: RoomItemId,
  room: UnindexedRoomState<RoomId, RoomItemId>,
): FreeItem<RoomId, RoomItemId> => {
  const standingItem = room.items[standerId];
  if (standingItem === undefined) {
    throw new Error(`item ${standerId} in stoodOnBy is not in the room`);
  }
  // cast: we know that only free items can stand on something:
  return standingItem as FreeItem<RoomId, RoomItemId>;
};

/**
 * whether a playable character is standing on the item whose stoodOnBy this is
 */
export const isStoodOnByPlayable = <
  RoomId extends string,
  RoomItemId extends string,
>(
  stoodOnBy: StoodOnBy<RoomItemId>,
  room: UnindexedRoomState<RoomId, RoomItemId>,
): boolean => {
  for (const standerId in stoodOnBy) {
    const stander = stoodOnByItem(standerId, room);
    if (stander[itemBehaviourKey].isPlayable(stander)) {
      return true;
    }
  }
  return false;
};

/**
 * utility to get the item object of standing on
 * TODO: - really, just gets from room.items - why is this needed/useful?
 * this is more like a nullable getter
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

/**
 * get the id of what the player is effectively stood on for the sake of allowing a few
 * frames of grace after stepping off something
 */
export const getEffectivelyStandingOnItemIdForPlayable = <
  RoomItemId extends string,
>(
  room: RoomState<string, RoomItemId>,
  {
    standingOnItemId,
    standingOnUntilRoomTime,
    previousStandingOnItemId,
    jumped,
  }: PlayableState<RoomItemId>,
): null | RoomItemId => {
  return (
    standingOnItemId !== null ?
      // simple case - standing on something now
      standingOnItemId
    : (
      !jumped &&
      standingOnUntilRoomTime + coyoteTime > room.roomTime &&
      // the item has to still be in the room (ie, not a disappearing block we're jumping off of)
      room.items[previousStandingOnItemId!]
    ) ?
      // grace applies - consider to still be standing on the item we just left for a few frames:
      previousStandingOnItemId
      // not standing on anything and didn't stop standing on within grace period:
    : null
  );
};
