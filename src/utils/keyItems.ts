import type { JsonItem, JsonItemUnion } from "../model/json/JsonItem";

/** for a given item in the game, auto-produce a unique id for it */
export const keyItems = <RoomId extends string>(
  items: Array<JsonItemUnion<RoomId> & { id?: string }>,
): Record<string, JsonItemUnion<RoomId>> => {
  return Object.fromEntries(
    items.map(
      (item) =>
        [itemKey<RoomId>(item, items), item] as [string, JsonItemUnion<RoomId>],
    ),
  );
};

export const itemKey = <RoomId extends string>(
  item: JsonItemUnion<RoomId> & { id?: string },
  items: Array<JsonItemUnion<RoomId>>,
): string => {
  if (item.id) {
    return item.id;
  }

  // only walls can be the same type and position, ie the towards and right walls both sit at 0,0,0:
  // but extend into different directions - in this case, add the direction to their id:
  const needsExtraId = (i: typeof item): i is JsonItem<"wall"> =>
    i.type === "wall" &&
    items.some(
      (otherItem) =>
        otherItem !== item &&
        otherItem.type === "wall" &&
        otherItem.position.x === item.position.x &&
        otherItem.position.y === item.position.y &&
        otherItem.position.z === item.position.z,
    );

  return needsExtraId(item) ?
      `${item.type}(${item.config.direction})@${item.position.x},${item.position.y},${item.position.z}`
    : `${item.type}@${item.position.x},${item.position.y},${item.position.z}`;
};
