import shortHash from "shorthash2";
import { canonicalize } from "json-canonicalize";
import type { Xyz } from "../../utils/vectors/vectors";
import nanoEqual from "nano-equal";
import type { JsonItemType, JsonItemUnion } from "../../model/json/JsonItem";

export const consolidatableJsonItemTypes = [
  "block",
  "deadlyBlock",
  "barrier",
  "conveyor",
  "hushPuppy",
] as const satisfies JsonItemType[];
export type ConsolidatableJsonItemType =
  (typeof consolidatableJsonItemTypes)[number];
export type ConsolidatableJsonItem = Extract<
  JsonItemUnion,
  { type: ConsolidatableJsonItemType }
>;

const isConsolidatable = (
  jsonItem: JsonItemUnion,
): jsonItem is ConsolidatableJsonItem => {
  return (consolidatableJsonItemTypes as JsonItemType[]).includes(
    jsonItem.type,
  );
};

// 3d grid to keep the items in
type Grid = Set<ConsolidatableJsonItem>[][][];

// Generate a stable hash key for the visited map
const hashItem = (o: { type: string; config: object }): string =>
  shortHash(canonicalize(o));

const createGrid = (
  items: Iterable<JsonItemUnion>,
): { consolidatableGrid: Grid; nonConsolidatable: JsonItemUnion[] } => {
  const nonConsolidatable: JsonItemUnion[] = [];

  // Determine the grid size by finding the max x, y, z values
  let maxX = 0;
  let maxY = 0;
  let maxZ = 0;

  for (const item of items) {
    const { x, y, z } = item.position;
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
    maxZ = Math.max(maxZ, z);
  }

  // Initialize the grid (3D array of sets)
  const grid: Grid = Array.from({ length: maxX + 1 }, () =>
    Array.from({ length: maxY + 1 }, () =>
      Array.from({ length: maxZ + 1 }, () => new Set<ConsolidatableJsonItem>()),
    ),
  );

  // Populate the grid with items
  for (const item of items) {
    if (!isConsolidatable(item)) {
      nonConsolidatable.push(item);
    } else {
      const { x, y, z } = item.position;
      grid[x][y][z].add(item);
    }
  }

  return { consolidatableGrid: grid, nonConsolidatable };
};

const flattenGrid = (grid: Grid): ConsolidatableJsonItem[] => {
  const flatList: ConsolidatableJsonItem[] = [];

  for (const xLayer of grid) {
    for (const yLayer of xLayer) {
      for (const cell of yLayer) {
        flatList.push(...cell);
      }
    }
  }

  return flatList;
};

export const consolidateItems = (
  items: Iterable<JsonItemUnion>,
): Iterable<JsonItemUnion> => {
  const { consolidatableGrid: grid, nonConsolidatable } = createGrid(items);

  const gridSize: Xyz = {
    x: grid.length,
    y: grid[0].length,
    z: grid[0][0].length,
  };

  // To track visited cells for each item
  const visited: Map<string, boolean[][][]> = new Map();

  // Initialize visited map for each item
  for (let x = 0; x < gridSize.x; x++) {
    for (let y = 0; y < gridSize.y; y++) {
      for (let z = 0; z < gridSize.z; z++) {
        for (const item of grid[x][y][z]) {
          const key = hashItem({ type: item.type, config: item.config });
          if (!visited.has(key)) {
            visited.set(
              key,
              Array.from({ length: gridSize.x }, () =>
                Array.from({ length: gridSize.y }, () =>
                  Array(gridSize.z).fill(false),
                ),
              ),
            );
          }
        }
      }
    }
  }

  // Check if a cell contains an item matching the given item's type and config, and hasn't been visited
  const isCellValid = (
    { x, y, z }: Xyz,
    item: ConsolidatableJsonItem,
  ): boolean => {
    const key = hashItem({ type: item.type, config: item.config });
    return (
      !visited.get(key)![x][y][z] &&
      Array.from(grid[x][y][z]).some(
        (cellItem) =>
          cellItem.type === item.type &&
          nanoEqual(cellItem.config, item.config),
      )
    );
  };

  // Find the largest cuboidal region for a specific item
  const findCuboid = (start: Xyz, item: ConsolidatableJsonItem): Xyz => {
    const end: Xyz = { ...start };

    // Expand in x direction
    while (
      end.x + 1 < gridSize.x &&
      isCellValid({ ...end, x: end.x + 1 }, item)
    )
      end.x++;

    // Expand in y direction
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

    // Expand in z direction
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

    return end;
  };

  // Mark cells as visited and consolidate the region in the grid
  const consolidateRegion = (
    { x: startX, y: startY, z: startZ }: Xyz,
    { x: endX, y: endY, z: endZ }: Xyz,
    item: ConsolidatableJsonItem,
  ): void => {
    const key = hashItem({ type: item.type, config: item.config });

    const xTimes = endX - startX + 1;
    const yTimes = endY - startY + 1;
    const zTimes = endZ - startZ + 1;
    // Update repetitions for the consolidated item
    if (xTimes + yTimes + zTimes > 3) {
      item.config.times = {};
      if (xTimes !== 1) item.config.times.x = xTimes;
      if (yTimes !== 1) item.config.times.y = yTimes;
      if (zTimes !== 1) item.config.times.z = zTimes;
    }

    // Clear the consolidated item from all other cells
    for (let i = startX; i <= endX; i++) {
      for (let j = startY; j <= endY; j++) {
        for (let k = startZ; k <= endZ; k++) {
          visited.get(key)![i][j][k] = true;
          if (i !== startX || j !== startY || k !== startZ) {
            const cell = grid[i][j][k];
            removeItemFromCell: for (const cellItem of cell) {
              const cellItemHash = hashItem({
                type: cellItem.type,
                config: cellItem.config,
              });
              if (cellItemHash === key) {
                cell.delete(cellItem);
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
        for (const item of grid[x][y][z]) {
          const key = hashItem({ type: item.type, config: item.config });
          if (!visited.get(key)![x][y][z]) {
            const end = findCuboid({ x, y, z }, item);

            consolidateRegion({ x, y, z }, end, item);
          }
        }
      }
    }
  }

  return [...flattenGrid(grid), ...nonConsolidatable];
};
