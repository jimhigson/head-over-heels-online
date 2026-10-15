import { type SceneryName } from "../sprites/planets";
import { objectEntriesIter, valuesIter } from "../utils/entries";
import { type JsonItemType, type JsonItemUnion } from "./json/JsonItem";
import { type RoomJson, type RoomJsonItems } from "./RoomJson";

/** Iterate over items in a room, optionally filtering to specific item types */
export const roomJsonItemsIterable = <
  RoomId extends string,
  RoomItemId extends string,
  ScN extends SceneryName = SceneryName,
  Types extends JsonItemType = JsonItemType,
>(
  roomJson: Pick<RoomJson<RoomId, RoomItemId, ScN>, "items">,
  ...types: Types[]
) => {
  const allItems = valuesIter(roomJson.items) as IterableIterator<
    JsonItemUnion<RoomId, RoomItemId>
  >;

  if (types.length === 0) {
    return allItems as IterableIterator<
      JsonItemUnion<RoomId, RoomItemId, Types>
    >;
  }

  return allItems.filter((item) =>
    types.includes(item.type as Types),
  ) as IterableIterator<JsonItemUnion<RoomId, RoomItemId, Types>>;
};

/** Re-export of objectEntriesIter under a more convenient type specialised for room JSON items */
export const roomJsonItemsEntriesIterable = objectEntriesIter as <
  RoomId extends string,
  RoomItemId extends string,
>(
  roomJsonItems: RoomJsonItems<RoomItemId, RoomId>,
) => IterableIterator<[RoomItemId, JsonItemUnion<RoomId, RoomItemId>]>;

export const iterateRoomJsonItemsWithIds = <
  RoomId extends string,
  RoomItemId extends string,
  Types extends JsonItemType = JsonItemType,
>(
  roomJsonItems: RoomJsonItems<RoomItemId, RoomId>,
  /**
   * if given, will filter to just these types, since needing to consider just some types
   * is a common use case
   */
  ...types: Types[]
): IterableIterator<[RoomItemId, JsonItemUnion<RoomId, RoomItemId, Types>]> => {
  const allItemsItr = roomJsonItemsEntriesIterable(roomJsonItems);

  if (types.length === 0) {
    return allItemsItr as IterableIterator<
      [RoomItemId, JsonItemUnion<RoomId, RoomItemId, Types>]
    >;
  }

  return allItemsItr.filter(([, item]) =>
    types.includes(item.type as Types),
  ) as IterableIterator<[RoomItemId, JsonItemUnion<RoomId, RoomItemId, Types>]>;
};

/** the ids of the items, optionally filtered to the given types */
export const iterateRoomJsonItemIds = <
  RoomId extends string,
  RoomItemId extends string,
>(
  roomJsonItems: RoomJsonItems<RoomItemId, RoomId>,
  ...types: JsonItemType[]
): IteratorObject<RoomItemId> =>
  iterateRoomJsonItemsWithIds(roomJsonItems, ...types).map(
    ([itemId]) => itemId,
  );
