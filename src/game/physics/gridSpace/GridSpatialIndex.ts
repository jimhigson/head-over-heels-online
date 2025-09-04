import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import type { Xy, Xyz } from "../../../utils/vectors/vectors";

import { blockSizePx } from "../../../sprites/spritePivots";
import { addXyz } from "../../../utils/vectors/vectors";
import { projectAabbCorners } from "../../render/sortZ/projectAabbCorners";

// these multiplications empirically give good performance in larger rooms.
// if the cells are too fine, the search for shadow-casters has to visit a
// n^3 number of cells - best to keep this small. Nothing else seems to mind
// the multiplication very much perf-wise, since the number of items in any
// given cell remains very small
const cellDepth = blockSizePx.w * 2;
const cellWidth = blockSizePx.w * 2;
const cellHeight = blockSizePx.h * 4;

const rectGridWidth = cellWidth * 2;
const rectGridHeight = cellHeight;

type CellKey = `${number},${number},${number}`;
type RectKey = `${number},${number}`;

type MinimumRequiredItem = {
  id: string;
  state: {
    position: Xyz;
  };
  aabb: Xyz;
  renderAabb?: Xyz;
  renderAabbOffset?: Xyz;
};

/**
 * Spatial indexing system that divides the game world into a 3D grid of cells.
 * Each cell contains a Set of items that occupy that space.
 * Uses a sparse Map structure to efficiently handle any coordinate range.
 */
export class GridSpatialIndex<
  RoomId extends string = string,
  RoomItemId extends string = string,
  Item extends MinimumRequiredItem = UnionOfAllItemInPlayTypes<
    RoomId,
    RoomItemId
  >,
  Bin extends Set<Item> = Set<Item>,
> {
  /**
   * Map from cell coordinates (as "x,y,z" string) to Sets of items in that cell
   * Provides true sparse storage - only cells with items exist
   */
  #cells = new Map<CellKey, Bin>();

  /**
   * Map from cell coordinates (as "x,y" string) to Sets of items projected to that
   * rectangle on screen.
   * Provides true sparse storage - only cells with items exist
   */
  #rects = new Map<RectKey, Bin>();

  /**
   * Map from each item to the set of cell keys it currently occupies.
   * This reverse mapping is essential for O(1) operations:
   * - When updating: know which old cells to remove the item from
   * - When removing: know exactly which cells contain the item
   * - For existence checks: quickly verify if an item is in the index
   * Without this, we'd have to search the entire grid for these operations.
   */
  #itemToCellKeys = new Map<Item, Set<CellKey>>();

  /**
   * Map from each item to the set of rect keys it currently occupies.
   * This reverse mapping is essential for O(1) operations in 2D space:
   * - When updating: know which old rects to remove the item from
   * - When removing: know exactly which rects contain the item
   * Without this, we'd have to search the entire 2D grid for these operations.
   */
  #itemToRectKeys = new Map<Item, Set<RectKey>>();

  constructor(
    /** Optional iterable of items to initially populate the grid */
    items?: Iterable<Item>,
  ) {
    if (items) {
      for (const item of items) {
        this.addItem(item);
      }
    }
  }

  /**
   * Add an item to the 3D cuboid index.
   */
  #addItemCuboid(
    /** The item to add */
    item: Item,
  ): void {
    const occupiedCells = new Set<CellKey>();

    for (const cellKey of this.#iterateCuboidCellKeys(
      item.state.position,
      item.aabb,
    )) {
      const cell = this.#ensureCell(cellKey);
      // Add item to this cell
      cell.add(item);

      // Track that this item occupies this cell
      occupiedCells.add(cellKey);
    }

    // Store which cells this item occupies
    this.#itemToCellKeys.set(item, occupiedCells);
  }

  /**
   * Add an item to the 2D rect index.
   */
  #addItemRect(
    /** The item to add */
    item: Item,
  ): void {
    const occupiedRects = new Set<RectKey>();
    const [topLeft, bottomRight] = this.#itemRectangle(item);

    for (const rectKey of this.#iterateRectCellKeys(topLeft, bottomRight)) {
      const rect = this.#ensureRect(rectKey);
      // Add item to this rect
      rect.add(item);

      // Track that this item occupies this rect
      occupiedRects.add(rectKey);
    }

    // Store which rects this item occupies
    this.#itemToRectKeys.set(item, occupiedRects);
  }

  /**
   * Add an item to the grid at its current position.
   */
  addItem(
    /** The item to add to the grid */
    item: Item,
  ): void {
    // Check if item is already in the grid
    if (this.#itemToCellKeys.has(item)) {
      throw new Error("Item is already in the spatial index");
    }

    this.#addItemCuboid(item);
    this.#addItemRect(item);
  }

  /**
   * Create a string key from cell coordinates
   */
  #makeCellKey(x: number, y: number, z: number): CellKey {
    return `${x},${y},${z}`;
  }

  /**
   * Create a string key from rect coordinates
   */
  #makeRectKey(x: number, y: number): RectKey {
    return `${x},${y}`;
  }

  /**
   * Ensure a cell exists, creating it if necessary
   */
  #ensureCell(cellKey: CellKey): Bin {
    let cell = this.#cells.get(cellKey);
    if (!cell) {
      cell = new Set() as Bin;
      this.#cells.set(cellKey, cell);
    }
    return cell;
  }

  /**
   * Ensure a rect exists, creating it if necessary
   */
  #ensureRect(rectKey: RectKey): Bin {
    let rect = this.#rects.get(rectKey);
    if (!rect) {
      rect = new Set() as Bin;
      this.#rects.set(rectKey, rect);
    }
    return rect;
  }

  *#iterateCuboidCellKeys(
    /** The position of the cuboid */
    position: Xyz,
    /** The size of the cuboid */
    size: Xyz,
  ): Generator<CellKey> {
    const minCorner = position;
    const maxCorner = addXyz(position, size);

    // Calculate which cells this cuboid occupies (cells are 16x16x12 units)
    const minCellX = Math.floor(minCorner.x / cellWidth);
    const minCellY = Math.floor(minCorner.y / cellDepth);
    const minCellZ = Math.floor(minCorner.z / cellHeight);
    const maxCellX = Math.floor(maxCorner.x / cellWidth);
    const maxCellY = Math.floor(maxCorner.y / cellDepth);
    const maxCellZ = Math.floor(maxCorner.z / cellHeight);

    // Yield all cell keys the item occupies
    for (let x = minCellX; x <= maxCellX; x++) {
      for (let y = minCellY; y <= maxCellY; y++) {
        for (let z = minCellZ; z <= maxCellZ; z++) {
          yield this.#makeCellKey(x, y, z);
        }
      }
    }
  }

  *#iterateRectCellKeys(
    /** Top-left corner of the rectangle */
    topLeft: Xy,
    /** Bottom-right corner of the rectangle */
    bottomRight: Xy,
  ): Generator<RectKey> {
    // Calculate which rect cells this rectangle occupies (cells are 32x12 units)
    const minRectX = Math.floor(topLeft.x / rectGridWidth);
    const minRectY = Math.floor(topLeft.y / rectGridHeight);
    const maxRectX = Math.floor(bottomRight.x / rectGridWidth);
    const maxRectY = Math.floor(bottomRight.y / rectGridHeight);

    // Yield all rect keys the item occupies
    for (let x = minRectX; x <= maxRectX; x++) {
      for (let y = minRectY; y <= maxRectY; y++) {
        yield this.#makeRectKey(x, y);
      }
    }
  }

  /**
   * Remove an item from the 3D cuboid index.
   */
  #removeItemCuboid(
    /** The item to remove */
    item: Item,
  ): void {
    // Get the cells this item currently occupies
    const occupiedCells = this.#itemToCellKeys.get(item);
    if (!occupiedCells) {
      return;
    }

    // Remove from all occupied 3D cells
    for (const cellKey of occupiedCells) {
      const cell = this.#cells.get(cellKey);
      if (cell) {
        cell.delete(item);

        // If cell is now empty, remove it from the map
        if (cell.size === 0) {
          this.#cells.delete(cellKey);
        }
      }
    }

    // Remove item from 3D tracking
    this.#itemToCellKeys.delete(item);
  }

  /**
   * Remove an item from the 2D rect index.
   */
  #removeItemRect(
    /** The item to remove */
    item: Item,
  ): void {
    // Get the rects this item currently occupies
    const occupiedRects = this.#itemToRectKeys.get(item);
    if (!occupiedRects) {
      return;
    }

    // Remove from all occupied 2D rects
    for (const rectKey of occupiedRects) {
      const rect = this.#rects.get(rectKey);
      if (rect) {
        rect.delete(item);

        // If rect is now empty, remove it from the map
        if (rect.size === 0) {
          this.#rects.delete(rectKey);
        }
      }
    }

    // Remove item from 2D tracking
    this.#itemToRectKeys.delete(item);
  }

  /**
   * Remove an item from the grid.
   * Cleans up empty cells to maintain sparse storage.
   */
  removeItem(
    /** The item to remove from the grid */
    item: Item,
  ): void {
    // Check if item is in the grid
    if (!this.#itemToCellKeys.has(item)) {
      throw new Error(`Item ${item.id} is not in the spatial index`);
    }

    this.#removeItemCuboid(item);
    this.#removeItemRect(item);
  }

  /**
   * project an item to a rectangle that will contain its rendering on the
   * screen
   */
  #itemRectangle(i: Item): [Xy, Xy] {
    const pos =
      i.renderAabbOffset ?
        addXyz(i.state.position, i.renderAabbOffset)
      : i.state.position;
    const bb = i.renderAabb || i.aabb;

    const { left, right, top, bottom } = projectAabbCorners(pos, bb);
    return [
      { x: left, y: top },
      { x: right, y: bottom },
    ];
  }

  /**
   * Update an item's position in the grid.
   */
  #updateItemCuboid(
    /** The item to update */
    item: Item,
  ): void {
    // Get current cells
    const oldCellKeys = this.#itemToCellKeys.get(item);
    if (!oldCellKeys) {
      throw new Error("Item not in grid");
    }

    const newCellKeys = new Set<CellKey>(
      this.#iterateCuboidCellKeys(item.state.position, item.aabb),
    );

    // Track if has deleted from any cell. Large majority of updates will not.
    let deleted = false;
    let added = false;

    // Remove from all old cells
    for (const cellKey of oldCellKeys) {
      const cell = this.#cells.get(cellKey);
      if (cell && !newCellKeys.has(cellKey)) {
        deleted = true;
        cell.delete(item);
      }
    }

    // Add to all new cells
    for (const cellKey of newCellKeys) {
      if (oldCellKeys.has(cellKey)) {
        // already have it, no need to add
        continue;
      }

      const cell = this.#ensureCell(cellKey);
      cell.add(item);
      added = true;
    }

    // Clean up any empty cells from the old position
    if (deleted) {
      for (const cellKey of oldCellKeys) {
        const cell = this.#cells.get(cellKey);
        if (cell && cell.size === 0) {
          this.#cells.delete(cellKey);
        }
      }
    }

    // Update tracking only if there was a change - this prevents new-generation
    // object newCellKeys from transitioning to old-generation unnecessarily
    if (deleted || added) {
      this.#itemToCellKeys.set(item, newCellKeys);
    } else {
      // help gc by emptying set that will never be used again:
      newCellKeys.clear();
    }
  }

  /**
   * Update an item's position in the 2D rect grid.
   */
  #updateItemRect(
    /** The item to update */
    item: Item,
  ): void {
    // Get current rects
    const oldRectKeys = this.#itemToRectKeys.get(item);
    if (!oldRectKeys) {
      throw new Error("Item not in rect grid");
    }

    const [topLeft, bottomRight] = this.#itemRectangle(item);
    const newRectKeys = new Set<RectKey>(
      this.#iterateRectCellKeys(topLeft, bottomRight),
    );

    // Track if has deleted from any rect. Large majority of updates will not.
    let deleted = false;
    let added = false;

    // Remove from all old rects
    for (const rectKey of oldRectKeys) {
      const rect = this.#rects.get(rectKey);
      if (rect && !newRectKeys.has(rectKey)) {
        deleted = true;
        rect.delete(item);
      }
    }

    // Add to all new rects
    for (const rectKey of newRectKeys) {
      if (oldRectKeys.has(rectKey)) {
        // already have it, no need to add
        continue;
      }

      const rect = this.#ensureRect(rectKey);
      rect.add(item);
      added = true;
    }

    // Clean up any empty rects from the old position
    if (deleted) {
      for (const rectKey of oldRectKeys) {
        const rect = this.#rects.get(rectKey);
        if (rect && rect.size === 0) {
          this.#rects.delete(rectKey);
        }
      }
    }

    // Update tracking only if there was a change
    if (deleted || added) {
      this.#itemToRectKeys.set(item, newRectKeys);
    } else {
      // help gc by emptying set that will never be used again:
      newRectKeys.clear();
    }
  }

  /**
   * Update an item's position in the grid.
   */
  updateItem(
    /** The item to update */
    item: Item,
  ): void {
    this.#updateItemCuboid(item);
    this.#updateItemRect(item);
  }

  /**
   * Iterate over all items that occupy cells within the given cuboid region.
   * Each item is yielded only once, even if it shares multiple cells.
   */
  *iterateCuboidNeighbourhood(
    /** The position of the cuboid to check */
    position: Xyz,
    /** The size of the cuboid to check */
    size: Xyz,
    /** Optional item to exclude from results (usually the querying item) */
    excludeItem?: MinimumRequiredItem,
  ): Generator<Item> {
    // Track items we've already yielded to avoid duplicates
    const yielded = new Set<Item>();

    for (const cellKey of this.#iterateCuboidCellKeys(position, size)) {
      const cell = this.#cells.get(cellKey);
      if (cell) {
        // Yield each item in this cell (once only)
        for (const neighbour of cell) {
          if (neighbour !== excludeItem && !yielded.has(neighbour)) {
            yielded.add(neighbour);
            yield neighbour;
          }
        }
      }
    }

    // Clear to aid garbage collection
    yielded.clear();
  }

  /**
   * Iterate over all items that occupy rect cells within the given rectangle region.
   * Each item is yielded only once, even if it shares multiple cells.
   */
  *iterateRectNeighbourhood(
    /** Top-left corner of the rectangle to check */
    topLeft: Xy,
    /** Bottom-right corner of the rectangle to check */
    bottomRight: Xy,
    /** Optional item to exclude from results (usually the querying item) */
    excludeItem?: Item,
  ): Generator<Item> {
    // Track items we've already yielded to avoid duplicates
    const yielded = new Set<Item>();

    for (const rectKey of this.#iterateRectCellKeys(topLeft, bottomRight)) {
      const rect = this.#rects.get(rectKey);
      if (rect) {
        // Yield each item in this rect (once only)
        for (const neighbour of rect) {
          if (neighbour !== excludeItem && !yielded.has(neighbour)) {
            yielded.add(neighbour);
            yield neighbour;
          }
        }
      }
    }

    // Clear to aid garbage collection
    yielded.clear();
  }

  /**
   * Iterate over all items that share at least one cell with the given item.
   * Each item is yielded only once, even if it shares multiple cells.
   */
  iterateItemCuboidNeighbourhood(
    /**
     * NOTE: - there is no requirement for this item to actually be in the index itself
     */
    item: MinimumRequiredItem,
  ): Generator<Item> {
    return this.iterateCuboidNeighbourhood(
      item.state.position,
      item.aabb,
      item,
    );
  }

  iterateItemRectNeighbourhood(
    /**
     * NOTE: - there is no requirement for this item to actually be in the index itself
     */
    item: Item,
  ): Generator<Item> {
    const [topLeft, bottomRight] = this.#itemRectangle(item);
    return this.iterateRectNeighbourhood(topLeft, bottomRight, item);
  }

  /**
   * return the item id for every item in every well in a Map-like notation
   *  eg:
   *     { (0,0,0) => [item1, item2, item3], (0,0,1) => ... }
   */
  debugToString(): string {
    // Sort cell keys for consistent output
    const sortedCellKeys = Array.from(this.#cells.keys()).sort();

    const cellEntries = sortedCellKeys.map((cellKey) => {
      const cell = this.#cells.get(cellKey)!;
      const itemIds = Array.from(cell).map((item) => item.id);
      return `  (${cellKey}) => [${itemIds.join(", ")}]`;
    });

    // Sort rect keys for consistent output
    const sortedRectKeys = Array.from(this.#rects.keys()).sort();

    const rectEntries = sortedRectKeys.map((rectKey) => {
      const rect = this.#rects.get(rectKey)!;
      const itemIds = Array.from(rect).map((item) => item.id);
      return `  (${rectKey}) => [${itemIds.join(", ")}]`;
    });

    return `GridSpatialIndex (${this.#cells.size} 3D cells, ${this.#rects.size} 2D rects, ${this.#itemToCellKeys.size} items) {
  3D Cells:
${cellEntries.join(",\n")}
  2D Rects:
${rectEntries.join(",\n")}
}`;
  }
}
