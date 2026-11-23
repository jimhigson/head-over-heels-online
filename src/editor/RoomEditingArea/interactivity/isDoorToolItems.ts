import type { ItemToolItem, ItemToolItems } from "./Tool";

/**
 * whether the item tool's items are a door, which is only ever put down alone:
 * it goes in a wall, and cuts into it
 */
export const isDoorToolItems = (
  toolItems: ItemToolItems,
): toolItems is [ItemToolItem<"door">] => {
  const [firstItem] = toolItems;
  return toolItems.length === 1 && firstItem.type === "door";
};
