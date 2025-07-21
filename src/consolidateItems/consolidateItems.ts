import { canonicalize } from "json-canonicalize";
import { unitXyz, type Xyz } from "../utils/vectors/vectors";
import { omit } from "../utils/pick";
import type { SceneryName } from "../sprites/planets";
import type { WallJsonConfigWithTiles } from "../model/json/WallJsonConfig";
import type { ConsolidatableJsonItem } from "./ConsolidatableJsonItem";
import {
  isConsolidatable,
  getConsolidatableVector,
} from "./ConsolidatableJsonItem";
import type { JsonItemUnion } from "../model/json/JsonItem";
import {
  completeTimesXyz,
  wallTimes,
} from "../game/collision/boundingBoxTimes";

export type ItemWithId = [itemId: string, item: JsonItemUnion];
export type ConsolidatableItemWithId = [
  itemId: string,
  item: ConsolidatableJsonItem,
];

// 3d grid to keep the items in
type Grid = Set<ConsolidatableItemWithId>[][][];

const getJsonItemTimes = (item: JsonItemUnion): Xyz => {
  const isMultipliedItem = (
    item: JsonItemUnion,
  ): item is JsonItemUnion & { config: { times: Partial<Xyz> } } => {
    type ItemConfigMaybeWithMultiplication = {
      times?: undefined | Partial<Xyz>;
    };

    return (
      (item.config as ItemConfigMaybeWithMultiplication).times !== undefined
    );
  };

  return (
    item.type === "wall" ? completeTimesXyz(wallTimes(item.config))
    : isMultipliedItem(item) ? completeTimesXyz(item.config.times)
    : unitXyz
  );
};

// Generate a stable hash key for the visited map
const hashItem = (o: ConsolidatableJsonItem): string => {
  return (
    o.type === "wall" ? `wall/${o.config.direction}`
    : o.type === "teleporter" ?
      // for teleporters, the toPosition will always be different so it can't be used to decide consolidatability
      canonicalize({ type: o.type, config: omit(o.config, "toPosition") })
    : canonicalize({ type: o.type, config: o.config })
  );
};

const isConsolidatableItemWithId = (
  input: ItemWithId,
): input is ConsolidatableItemWithId => {
  return isConsolidatable(input[1]);
};

const createGrid = (
  items: Iterable<ItemWithId>,
): {
  consolidatableGrid: Grid;
  nonConsolidatable: ItemWithId[];
} => {
  const nonConsolidatable: ItemWithId[] = [];

  // Determine the grid size by finding the max x, y, z values
  // Need to account for items that occupy multiple cells
  let maxX = 0;
  let maxY = 0;
  let maxZ = 0;

  for (const [, item] of items) {
    const { x, y, z } = item.position;
    const times = getJsonItemTimes(item);
    const xExtent = times.x;
    const yExtent = times.y;
    const zExtent = times.z;

    maxX = Math.max(maxX, x + xExtent - 1);
    maxY = Math.max(maxY, y + yExtent - 1);
    maxZ = Math.max(maxZ, z + zExtent - 1);
  }

  // Initialize the grid (3D array of sets)
  const grid: Grid = Array.from({ length: maxX + 1 }, () =>
    Array.from({ length: maxY + 1 }, () =>
      Array.from(
        { length: maxZ + 1 },
        () => new Set<ConsolidatableItemWithId>(),
      ),
    ),
  );

  // Populate the grid with items
  for (const itemWithId of items) {
    if (!isConsolidatableItemWithId(itemWithId)) {
      nonConsolidatable.push(itemWithId);
    } else {
      const [, item] = itemWithId;
      const { x, y, z } = item.position;

      // Calculate the extent of this item based on its times property
      const times = getJsonItemTimes(item);
      const xExtent = times.x;
      const yExtent = times.y;
      const zExtent = times.z;

      // Place the item in all cells it occupies
      for (let dx = 0; dx < xExtent; dx++) {
        for (let dy = 0; dy < yExtent; dy++) {
          for (let dz = 0; dz < zExtent; dz++) {
            const cellX = x + dx;
            const cellY = y + dy;
            const cellZ = z + dz;

            // Make sure we're within grid bounds
            if (
              cellX < grid.length &&
              cellY < grid[cellX].length &&
              cellZ < grid[cellX][cellY].length
            ) {
              grid[cellX][cellY][cellZ].add(itemWithId);
            }
          }
        }
      }
    }
  }

  return { consolidatableGrid: grid, nonConsolidatable };
};

const flattenGrid = (grid: Grid): ConsolidatableItemWithId[] => {
  const flatList: ConsolidatableItemWithId[] = [];
  const seenItemIds = new Set<string>();

  for (const xLayer of grid) {
    for (const yLayer of xLayer) {
      for (const cell of yLayer) {
        for (const itemWithId of cell) {
          const [itemId] = itemWithId;
          if (!seenItemIds.has(itemId)) {
            seenItemIds.add(itemId);
            flatList.push(itemWithId);
          }
        }
      }
    }
  }

  return flatList;
};

export const consolidateItems = (
  items: Iterable<ItemWithId>,
): Iterable<ItemWithId> => {
  const { consolidatableGrid: grid, nonConsolidatable } = createGrid(items);

  const gridSize: Xyz = {
    x: grid.length,
    y: grid[0].length,
    z: grid[0][0].length,
  };

  // To track visited cells for each item
  const visited: Map<string, boolean[][][]> = new Map();

  // Initialize visited map for each unique item type/config combination
  // First, collect all unique item types
  const uniqueItems = new Map<string, ConsolidatableJsonItem>();
  for (let x = 0; x < gridSize.x; x++) {
    for (let y = 0; y < gridSize.y; y++) {
      for (let z = 0; z < gridSize.z; z++) {
        for (const [, item] of grid[x][y][z]) {
          const key = hashItem(item);
          if (!uniqueItems.has(key)) {
            uniqueItems.set(key, item);
          }
        }
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

  // Check if a cell contains an item matching the given item's type and config, and hasn't been visited
  const isCellValid = (
    { x, y, z }: Xyz,
    item: ConsolidatableJsonItem,
  ): boolean => {
    const key = hashItem(item);
    return (
      !visited.get(key)![x][y][z] &&
      Array.from(grid[x][y][z]).some(
        ([, cellItem]) => hashItem(cellItem) === hashItem(item),
      )
    );
  };

  // Find the largest cuboidal region for a specific item
  const findCuboid = (start: Xyz, item: ConsolidatableJsonItem): Xyz => {
    const end: Xyz = { ...start };
    const consolidatableVector = getConsolidatableVector(item);

    // Expand in x direction (only if allowed)
    if (consolidatableVector.x > 0) {
      while (
        end.x + 1 < gridSize.x &&
        isCellValid({ ...end, x: end.x + 1 }, item)
      )
        end.x++;
    }

    // Expand in y direction (only if allowed)
    if (consolidatableVector.y > 0) {
      for (let i = start.x; i <= end.x; i++) {
        while (
          end.y + 1 < gridSize.y &&
          Array.from({ length: end.x - start.x + 1 }).every((_, dx) =>
            isCellValid({ x: start.x + dx, y: end.y + 1, z: start.z }, item),
          )
        ) {
          end.y++;
        }
      }
    }

    // Expand in z direction (only if allowed)
    if (consolidatableVector.z > 0) {
      for (let i = start.x; i <= end.x; i++) {
        for (let j = start.y; j <= end.y; j++) {
          while (
            end.z + 1 < gridSize.z &&
            Array.from({ length: end.x - start.x + 1 }).every((_, dx) =>
              Array.from({ length: end.y - start.y + 1 }).every((_, dy) =>
                isCellValid(
                  { x: start.x + dx, y: start.y + dy, z: end.z + 1 },
                  item,
                ),
              ),
            )
          ) {
            end.z++;
          }
        }
      }
    }

    return end;
  };

  const combineInto = (
    target: ConsolidatableJsonItem,
    joiner: ConsolidatableJsonItem,
  ) => {
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
        return;
      }
      target.config.tiles = [
        // needs cast here because we know these are right/towards, but ts doesn't
        ...(target.config as WallJsonConfigWithTiles<SceneryName>).tiles,
        ...(joiner.config as WallJsonConfigWithTiles<SceneryName>).tiles,
      ];
    }
  };

  // Mark cells as visited and consolidate the region in the grid
  const consolidateRegion = (
    { x: startX, y: startY, z: startZ }: Xyz,
    { x: endX, y: endY, z: endZ }: Xyz,
    itemWithId: ConsolidatableItemWithId,
  ): void => {
    const [, item] = itemWithId;
    const key = hashItem(item);

    const xTimes = endX - startX + 1;
    const yTimes = endY - startY + 1;
    const zTimes = endZ - startZ + 1;
    // Update repetitions for the consolidated item
    if (xTimes + yTimes + zTimes > 3) {
      if (item.type === "wall") {
        switch (item.config.direction) {
          case "away":
          case "left":
            // these walls have size defined by tile count - no need to set times
            break;
          case "towards":
            if (xTimes !== 1) item.config.times = { x: xTimes };
            break;
          case "right":
            if (yTimes !== 1) item.config.times = { y: yTimes };
            break;
        }
      } else {
        if (xTimes !== 1)
          item.config.times = { ...item.config.times, x: xTimes };
        if (yTimes !== 1)
          item.config.times = { ...item.config.times, y: yTimes };
        if (zTimes !== 1)
          item.config.times = { ...item.config.times, z: zTimes };
      }
    }

    // Clear the consolidated item from all other cells
    for (let i = startX; i <= endX; i++) {
      for (let j = startY; j <= endY; j++) {
        for (let k = startZ; k <= endZ; k++) {
          visited.get(key)![i][j][k] = true;
          if (i !== startX || j !== startY || k !== startZ) {
            const cell = grid[i][j][k];
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
                  combineInto(item, cellItem);
                }
                cell.delete(cellItemWithId);
                break removeItemFromCell;
              }
            }
          }
        }
      }
    }
  };

  // Iterate through all cells in the grid
  for (let x = 0; x < gridSize.x; x++) {
    for (let y = 0; y < gridSize.y; y++) {
      for (let z = 0; z < gridSize.z; z++) {
        for (const itemWithId of grid[x][y][z]) {
          const [, item] = itemWithId;

          // Only process each item once, from its base position
          if (
            item.position.x === x &&
            item.position.y === y &&
            item.position.z === z
          ) {
            const key = hashItem(item);
            const visitedForKey = visited.get(key);
            if (visitedForKey && !visitedForKey[x][y][z]) {
              const end = findCuboid({ x, y, z }, item);
              consolidateRegion({ x, y, z }, end, itemWithId);
            }
          }
        }
      }
    }
  }

  return [...flattenGrid(grid), ...nonConsolidatable];
};

/** convenience for when you have a map of items to consolidate, not a raw entries iterable */
export const consolidateItemsMap = <T extends Record<string, JsonItemUnion>>(
  items: T,
): T => {
  return Object.fromEntries(
    consolidateItems(Object.entries(items) as Iterable<ItemWithId>),
  ) as T;
};
