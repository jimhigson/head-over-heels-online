import type { UnknownJsonItem } from "../model/json/JsonItem";
import shortHash from "shorthash2";
import { canonicalize } from "json-canonicalize";

/** for a given item in the game, auto-produce a unique id for it */
export const keyItems = <RoomId extends string>(
  items: Array<UnknownJsonItem<RoomId> & { id?: string }>,
): Record<string, UnknownJsonItem<RoomId>> => {
  return Object.fromEntries(
    items.map(
      (item) =>
        [itemKey<RoomId>(item, items), item] as [
          string,
          UnknownJsonItem<RoomId>,
        ],
    ),
  );
};

export const itemKey = <RoomId extends string>(
  item: UnknownJsonItem<RoomId> & { id?: string },
  items: Array<UnknownJsonItem<RoomId>>,
): string => {
  if (item.id) {
    return item.id;
  }

  // we include a hash of the config only if there is another item of the same type on the same square:
  const needsHash = items.some(
    (otherItem) =>
      otherItem.type === item.type &&
      otherItem.position.x === item.position.x &&
      otherItem.position.y === item.position.y &&
      otherItem.position.z === item.position.z &&
      otherItem !== item,
  );

  const typeAndPositionId = `${item.type}@${item.position.x},${item.position.y},${item.position.z}`;

  return needsHash ?
      `${typeAndPositionId}:${shortHash(canonicalize(item.config))}`
    : typeAndPositionId;
};
