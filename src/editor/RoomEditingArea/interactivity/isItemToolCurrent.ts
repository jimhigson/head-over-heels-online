import nanoEqual from "nano-equal";

import { originXyz, xyzEqual } from "../../../utils/vectors/vectors";
import type { ItemToolItem, ItemToolItems, Tool } from "./Tool";

const isSameItem = (itemA: ItemToolItem, itemB: ItemToolItem): boolean =>
  itemA.type === itemB.type &&
  nanoEqual(itemA.config, itemB.config) &&
  xyzEqual(itemA.position ?? originXyz, itemB.position ?? originXyz);

/**
 * whether the tool is the item tool that puts down these items, in any order
 */
export const isItemToolCurrent = (
  tool: Tool,
  items: ItemToolItems,
): boolean => {
  if (tool.type !== "item" || tool.items.length !== items.length) {
    return false;
  }
  // each of the tool's items is matched with a different one of the items:
  const matchedIndexes = new Set<number>();
  return tool.items.every((toolItem) => {
    const matchIndex = items.findIndex(
      (item, index) => !matchedIndexes.has(index) && isSameItem(toolItem, item),
    );
    if (matchIndex === -1) {
      return false;
    }
    matchedIndexes.add(matchIndex);
    return true;
  });
};
