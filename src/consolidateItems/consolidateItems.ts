import { canonicalize } from "json-canonicalize";
import { type Xyz } from "../utils/vectors/vectors";
import { omit } from "../utils/pick";
import type { SceneryName } from "../sprites/planets";
import type {
  RightWallConfig,
  TowardsWallConfig,
  WallJsonConfigWithTiles,
} from "../model/json/WallJsonConfig";
import type { ConsolidatableJsonItem } from "./ConsolidatableJsonItem";
import {
  isConsolidatable,
  getConsolidatableVector,
} from "./ConsolidatableJsonItem";
import type { JsonItemUnion } from "../model/json/JsonItem";
import { getJsonItemTimes, optimiseTimesXyz } from "../model/times";
import { Grid } from "./grid";

export type ItemWithId = [itemId: string, item: JsonItemUnion];
export type ConsolidatableItemWithId = [
  itemId: string,
  item: ConsolidatableJsonItem,
];

// Generate a stable hash key for the visited map
const hashItem = (o: ConsolidatableJsonItem): string => {
  return (
    o.type === "wall" ? `wall/${o.config.direction}`
    : o.type === "teleporter" ?
      // for teleporters, the toPosition will always be different so it can't be used to decide consolidatability
      // also exclude times as it represents extent, not type
      canonicalize({
        type: o.type,
        config: omit(o.config, "toPosition", "times"),
      })
      // for other items, exclude times as it represents extent, not type
    : canonicalize({ type: o.type, config: omit(o.config, "times") })
  );
};

const isConsolidatableItemWithId = (
  input: ItemWithId,
): input is ConsolidatableItemWithId => {
  return isConsolidatable(input[1]);
};

export const consolidateItems = (
  items: Iterable<ItemWithId>,
): Iterable<ItemWithId> => {
  let currentItems = [...items];
  let previousItemCount = currentItems.length;

  // Run consolidation iteratively until no more consolidations occur
  while (true) {
    const consolidatedItems = [...consolidateItemsSinglePass(currentItems)];

    // If the number of items didn't change, we're done
    if (consolidatedItems.length === previousItemCount) {
      return consolidatedItems;
    }

    // Otherwise, prepare for another iteration
    previousItemCount = consolidatedItems.length;
    currentItems = consolidatedItems;
  }
};

const consolidateItemsSinglePass = (
  items: Iterable<ItemWithId>,
): Iterable<ItemWithId> => {
  // Separate consolidatable and non-consolidatable items
  const consolidatableItems: ConsolidatableItemWithId[] = [];
  const nonConsolidatable: ItemWithId[] = [];

  for (const itemWithId of items) {
    if (isConsolidatableItemWithId(itemWithId)) {
      consolidatableItems.push(itemWithId);
    } else {
      nonConsolidatable.push(itemWithId);
    }
  }

  // Create grid from consolidatable items
  const grid = Grid.fromItems(consolidatableItems);
  const gridSize = grid.size;
  const { minBounds } = grid;

  // To track visited cells for each item
  const visited: Map<string, boolean[][][]> = new Map();

  // Initialize visited map for each unique item type/config combination
  // First, collect all unique item types
  const uniqueItems = new Map<string, ConsolidatableJsonItem>();
  for (const [, cell] of grid.iterate()) {
    for (const [, item] of cell) {
      const key = hashItem(item);
      if (!uniqueItems.has(key)) {
        uniqueItems.set(key, item);
      }
    }
  }

  // Initialize visited arrays for each unique item type
  for (const [key] of uniqueItems) {
    visited.set(
      key,
      Array.from({ length: gridSize.x }, () =>
        Array.from({ length: gridSize.y }, () => Array(gridSize.z).fill(false)),
      ),
    );
  }

  // Find the largest cuboidal region for a specific item
  const findCuboid = (start: Xyz, item: ConsolidatableJsonItem): Xyz => {
    // Start with the full extent of the initial item
    const itemTimes = getJsonItemTimes(item);
    const end: Xyz = {
      x: start.x + itemTimes.x - 1,
      y: start.y + itemTimes.y - 1,
      z: start.z + itemTimes.z - 1,
    };
    const consolidatableVector = getConsolidatableVector(item);
    const key = hashItem(item);

    // Track all items we've found in our expanding region
    const allItemsInExpandedRegion = new Set<ConsolidatableJsonItem>();
    allItemsInExpandedRegion.add(item);

    // Helper to check if expansion is valid
    const canExpandTo = (newEnd: Xyz): boolean => {
      // Collect all unique items of our type in the entire expanded region
      const itemsInNewRegion = new Set<ConsolidatableJsonItem>();
      let foundBlockingItem = false;

      for (let { x } = start; x <= newEnd.x; x++) {
        for (let { y } = start; y <= newEnd.y; y++) {
          for (let { z } = start; z <= newEnd.z; z++) {
            const cell = grid.get({ x, y, z });

            // Check if this cell would block our consolidation
            let hasMatchingItem = false;
            let hasBlockingItem = false;

            if (cell) {
              for (const [, cellItem] of cell) {
                if (hashItem(cellItem) === key) {
                  hasMatchingItem = true;
                  itemsInNewRegion.add(cellItem);
                } else if (
                  isConsolidatable(cellItem) &&
                  cellItem.type !== "wall"
                ) {
                  // Non-wall consolidatable items block expansion
                  hasBlockingItem = true;
                }
                // Walls with different directions don't block each other
              }
            }

            // If cell has a blocking item and no matching item, we can't expand
            if (hasBlockingItem && !hasMatchingItem) {
              foundBlockingItem = true;
            }

            // If cell is empty (no items at all), we can't expand
            // Every cell in the consolidation region must contain a matching item
            if (!cell || cell.size === 0) {
              foundBlockingItem = true;
            }

            // CRITICAL: Every cell must have a matching item for valid consolidation
            // If this cell doesn't have our item type, we cannot expand through it
            if (!hasMatchingItem) {
              foundBlockingItem = true;
            }
          }
        }
      }

      if (foundBlockingItem) return false;

      // Check if we found any new items beyond what we already have
      let hasNewItems = false;
      for (const regionItem of itemsInNewRegion) {
        if (!allItemsInExpandedRegion.has(regionItem)) {
          hasNewItems = true;
          allItemsInExpandedRegion.add(regionItem);
        }
      }

      // Can only expand if we found new items to consolidate
      if (!hasNewItems) return false;

      // For each unique item in the region, verify we have all its cells
      for (const regionItem of itemsInNewRegion) {
        const times = getJsonItemTimes(regionItem);
        const itemEnd = {
          x: regionItem.position.x + times.x - 1,
          y: regionItem.position.y + times.y - 1,
          z: regionItem.position.z + times.z - 1,
        };

        // Check if any part of this item extends outside our region
        if (
          regionItem.position.x < start.x ||
          regionItem.position.y < start.y ||
          regionItem.position.z < start.z ||
          itemEnd.x > newEnd.x ||
          itemEnd.y > newEnd.y ||
          itemEnd.z > newEnd.z
        ) {
          return false;
        }

        // Item is fully within bounds
      }

      return true;
    };

    // Try to expand in each allowed direction
    let expanded = true;
    while (expanded) {
      expanded = false;

      // Try x expansion
      if (consolidatableVector.x > 0 && end.x + 1 < minBounds.x + gridSize.x) {
        // Look for items that start at or cross the boundary
        let maxX = end.x;
        for (let { y } = start; y <= end.y; y++) {
          for (let { z } = start; z <= end.z; z++) {
            const cell = grid.get({ x: end.x + 1, y, z });
            if (cell) {
              for (const [, cellItem] of cell) {
                if (hashItem(cellItem) === key) {
                  const times = getJsonItemTimes(cellItem);
                  const itemEndX = cellItem.position.x + times.x - 1;
                  maxX = Math.max(maxX, itemEndX);
                }
              }
            }
          }
        }
        if (maxX > end.x && canExpandTo({ ...end, x: maxX })) {
          end.x = maxX;
          expanded = true;
        }
      }

      // Try y expansion
      if (consolidatableVector.y > 0 && end.y + 1 < minBounds.y + gridSize.y) {
        // Look for items that start at or cross the boundary
        let maxY = end.y;
        for (let { x } = start; x <= end.x; x++) {
          for (let { z } = start; z <= end.z; z++) {
            const cell = grid.get({ x, y: end.y + 1, z });
            if (cell) {
              for (const [, cellItem] of cell) {
                if (hashItem(cellItem) === key) {
                  const times = getJsonItemTimes(cellItem);
                  const itemEndY = cellItem.position.y + times.y - 1;
                  maxY = Math.max(maxY, itemEndY);
                }
              }
            }
          }
        }
        if (maxY > end.y && canExpandTo({ ...end, y: maxY })) {
          end.y = maxY;
          expanded = true;
        }
      }

      // Try z expansion
      if (consolidatableVector.z > 0 && end.z + 1 < minBounds.z + gridSize.z) {
        // Look for items that start at or cross the boundary
        let maxZ = end.z;
        for (let { x } = start; x <= end.x; x++) {
          for (let { y } = start; y <= end.y; y++) {
            const cell = grid.get({ x, y, z: end.z + 1 });
            if (cell) {
              for (const [, cellItem] of cell) {
                if (hashItem(cellItem) === key) {
                  const times = getJsonItemTimes(cellItem);
                  const itemEndZ = cellItem.position.z + times.z - 1;
                  maxZ = Math.max(maxZ, itemEndZ);
                }
              }
            }
          }
        }
        if (maxZ > end.z && canExpandTo({ ...end, z: maxZ })) {
          end.z = maxZ;
          expanded = true;
        }
      }
    }

    return end;
  };

  const combineInto = (
    target: ConsolidatableJsonItem,
    joiner: ConsolidatableJsonItem,
  ): ConsolidatableJsonItem => {
    if (target.type === "wall") {
      if (joiner.type !== "wall") {
        throw new Error("only walls can join walls");
      }
      if (target.config.direction !== joiner.config.direction) {
        throw new Error("walls must have the same direction to join");
      }
      if (
        target.config.direction === "right" ||
        target.config.direction === "towards"
      ) {
        // these directions do not have the tiles attribute
        return target;
      }
      // Create a new wall object with combined tiles
      return {
        ...target,
        config: {
          ...target.config,
          tiles: [
            // needs cast here because we know these are right/towards, but ts doesn't
            ...(target.config as WallJsonConfigWithTiles<SceneryName>).tiles,
            ...(joiner.config as WallJsonConfigWithTiles<SceneryName>).tiles,
          ],
        },
      };
    }
    return target;
  };

  // Mark cells as visited and consolidate the region in the grid
  const consolidateRegion = (
    { x: startX, y: startY, z: startZ }: Xyz,
    { x: endX, y: endY, z: endZ }: Xyz,
    itemWithId: ConsolidatableItemWithId,
  ): ConsolidatableItemWithId => {
    const [itemId, originalItem] = itemWithId;
    const key = hashItem(originalItem);

    const xTimes = endX - startX + 1;
    const yTimes = endY - startY + 1;
    const zTimes = endZ - startZ + 1;

    // Create a new item with updated times (don't mutate the original)
    let consolidatedItem: ConsolidatableJsonItem = originalItem;

    // Update repetitions for the consolidated item
    if (xTimes + yTimes + zTimes > 3) {
      // Create a new config object to avoid mutation
      const newConfig = { ...originalItem.config };

      if (originalItem.type === "wall") {
        switch (originalItem.config.direction) {
          case "away":
          case "left":
            // these walls have size defined by tile count - no need to set times
            break;
          case "towards":
            if (xTimes !== 1)
              (newConfig as TowardsWallConfig).times = { x: xTimes };
            break;
          case "right":
            if (yTimes !== 1)
              (newConfig as RightWallConfig).times = { y: yTimes };
            break;
        }
      } else {
        const newTimes = {
          ...optimiseTimesXyz(getJsonItemTimes(originalItem)),
        } as Xyz;
        if (xTimes !== 1) newTimes.x = xTimes;
        if (yTimes !== 1) newTimes.y = yTimes;
        if (zTimes !== 1) newTimes.z = zTimes;
        (newConfig as { times: Xyz }).times = newTimes;
      }

      // Create a new item object with the new config
      consolidatedItem = {
        ...originalItem,
        config: newConfig,
      } as ConsolidatableJsonItem;
    }

    // Clear the consolidated item from all other cells
    for (let i = startX; i <= endX; i++) {
      for (let j = startY; j <= endY; j++) {
        for (let k = startZ; k <= endZ; k++) {
          visited.get(key)![i - minBounds.x][j - minBounds.y][k - minBounds.z] =
            true;
          if (i !== startX || j !== startY || k !== startZ) {
            const cell = grid.get({ x: i, y: j, z: k });
            if (cell) {
              removeItemFromCell: for (const cellItemWithId of cell) {
                const [, cellItem] = cellItemWithId;
                const cellItemHash = hashItem(cellItem);
                if (cellItemHash === key) {
                  // Only combine if this is the base position of the cell item
                  if (
                    cellItem.position.x === i &&
                    cellItem.position.y === j &&
                    cellItem.position.z === k
                  ) {
                    consolidatedItem = combineInto(consolidatedItem, cellItem);
                  }
                  grid.remove({ x: i, y: j, z: k }, cellItemWithId);
                  break removeItemFromCell;
                }
              }
            }
          }
        }
      }
    }

    return [itemId, consolidatedItem];
  };

  // Iterate through all cells in the grid
  for (const [position, cell] of grid.iterate()) {
    for (const itemWithId of cell) {
      const [, item] = itemWithId;

      // Only process each item once, from its base position
      if (
        item.position.x === position.x &&
        item.position.y === position.y &&
        item.position.z === position.z
      ) {
        const key = hashItem(item);
        const visitedForKey = visited.get(key);
        const relX = position.x - minBounds.x;
        const relY = position.y - minBounds.y;
        const relZ = position.z - minBounds.z;

        if (visitedForKey && !visitedForKey[relX][relY][relZ]) {
          const end = findCuboid(position, item);
          const consolidatedItemWithId = consolidateRegion(
            position,
            end,
            itemWithId,
          );
          // Replace the original item with the consolidated one
          grid.remove(position, itemWithId);
          grid.add(position, consolidatedItemWithId);
        }
      }
    }
  }

  return [...grid.extractUniqueItems(), ...nonConsolidatable];
};

/** convenience for when you have a map of items to consolidate, not a raw entries iterable */
export const consolidateItemsMap = <T extends Record<string, JsonItemUnion>>(
  items: T,
): T => {
  return Object.fromEntries(
    consolidateItems(Object.entries(items) as Iterable<ItemWithId>),
  ) as T;
};
