import { type ValueOf } from "type-fest";

import { type SceneryName } from "../sprites/planets";
import { objectEntriesIter, valuesIter } from "../utils/entries";
import { type ItemInPlay } from "./ItemInPlay";
import { type UnionOfAllItemInPlayTypes } from "./ItemInPlayNarrowedUnions";
import { type RoomStateItems } from "./RoomState";

export const roomItemsArray = <
  RoomId extends string,
  RoomItemId extends string,
  ScN extends SceneryName = SceneryName,
>(
  roomItems: RoomStateItems<RoomId, RoomItemId, ScN>,
): Array<ValueOf<typeof roomItems>> => {
  return Object.values(roomItems);
};
/** Re-export of valuesIter under a more convenient type specialised for room items */

export const roomItemsIterable = valuesIter as <
  RoomId extends string,
  RoomItemId extends string,
  ScN extends SceneryName = SceneryName,
>(
  roomItems: RoomStateItems<RoomId, RoomItemId, ScN>,
) => IterableIterator<UnionOfAllItemInPlayTypes<RoomId, RoomItemId, ScN>>;

/**
 * call back once per room item. Allocates no iterator, so prefer this over
 * {@link roomItemsIterable} in per-tick code
 */
export const forEachRoomItem = <
  RoomId extends string,
  RoomItemId extends string,
  ScN extends SceneryName = SceneryName,
>(
  roomItems: RoomStateItems<RoomId, RoomItemId, ScN>,
  callback: (item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId, ScN>) => void,
): void => {
  for (const itemId in roomItems) {
    callback(roomItems[itemId]);
  }
};

export const iterateRoomItemEntries = <
  RoomId extends string,
  RoomItemId extends string,
  ScN extends SceneryName = SceneryName,
>(
  roomItems: RoomStateItems<RoomId, RoomItemId, ScN>,
) => {
  return objectEntriesIter(
    roomItems as Partial<Record<RoomItemId, ValueOf<typeof roomItems>>>,
  ) as IterableIterator<[RoomItemId, ValueOf<typeof roomItems>]>;
};
/**
 * @deprecated - marked as deprecated only to remind that...
 * TODO: this would be unecessary if *RoomItemId extends KnownRoomItemIds (everywhere!)* was
 * implemented
 */

export const playablesInRoom = <
  RoomId extends string,
  RoomItemId extends string,
  ScN extends SceneryName = SceneryName,
>(
  roomItems: RoomStateItems<RoomId, RoomItemId, ScN>,
) => {
  return {
    head: roomItems["head" as RoomItemId] as
      ItemInPlay<"head", RoomId, RoomItemId, RoomItemId, ScN> | undefined,
    heels: roomItems["heels" as RoomItemId] as
      ItemInPlay<"heels", RoomId, RoomItemId, RoomItemId, ScN> | undefined,
    headOverHeels: roomItems["headOverHeels" as RoomItemId] as
      | ItemInPlay<"headOverHeels", RoomId, RoomItemId, RoomItemId, ScN>
      | undefined,
  };
};
