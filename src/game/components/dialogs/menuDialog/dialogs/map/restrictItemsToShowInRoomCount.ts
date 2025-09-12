import { objectValues, roundRobin, take } from "iter-tools-es";

/**
 * the room layout can't show an infinite number of item
 * - if there are too many, select the ones to show
 */
export const restrictItemsToShowInRoomCount = <
  Item extends { type: string },
  ItemId extends string,
>(
  items: Record<ItemId, Item>,
  maximumItems: number,
): Record<ItemId, Item> => {
  const originalEntries = Object.entries(items) as [ItemId, Item][];

  if (originalEntries.length <= maximumItems) {
    return items; // no need to restrict
  }

  // let through at least one of each kind, up to the max
  const groups = Object.groupBy(originalEntries, (item) => item[1].type);

  const newItemsEntries = take(
    maximumItems,
    // round robin will continue getting items up to the max if the number of
    // groups is less than the max:
    roundRobin(...objectValues(groups)),
  );

  return Object.fromEntries(newItemsEntries) as Record<ItemId, Item>;
};
