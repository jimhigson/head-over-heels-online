import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import type { Xyz } from "../../../utils/vectors/vectors";
import type { ProjectionOnAxes } from "../../render/sortZ/projectAabbCorners";

import { blockSizePx } from "../../../sprites/spritePivots";
import { addXyz } from "../../../utils/vectors/vectors";
import { projectAabbAxes } from "../../render/sortZ/projectAabbCorners";

// these multiplications empirically give good performance in larger rooms.
// if the cells are too fine, the search for shadow-casters has to visit a
// n^3 number of cells - best to keep this small. Nothing else seems to mind
// the multiplication very much perf-wise, since the number of items in any
// given cell remains very small
const cellDepth = blockSizePx.w * 2;
const cellWidth = blockSizePx.w * 2;
const cellHeight = blockSizePx.h * 4;

// like above, the multipliers are a balance between each item being in
// more cells (because smaller cells) and having to do more of the fine
// comparisons (because cells are big and have a lot of items in them)
const projCellDepth = blockSizePx.w * 2;
const projCellWidth = blockSizePx.w * 2;
const projCellHeight = blockSizePx.h * 2;

type CellKey = `${number},${number},${number}`;

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
   * Map from cell coordinates (as "x,y,z" string) to Sets of items projected to that
   * hexagon on screen.
   * Provides true sparse storage - only cells with items exist
   */
  #projectedCells = new Map<CellKey, Bin>();

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
   * Map from each item to the set of projected cell keys it currently occupies.
   * This reverse mapping is essential for O(1) operations in projection space:
   * - When updating: know which old projected cells to remove the item from
   * - When removing: know exactly which projected cells contain the item
   * Without this, we'd have to search the entire projection grid for these operations.
   */
  #itemToProjectedCellKeys = new Map<Item, Set<CellKey>>();

  #itemToProjectionAxesMap = new Map<Item, ProjectionOnAxes>();

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
   * Generic helper to add an item to an index.
   */
  #addToIndex(
    item: Item,
    cellIterator: Generator<CellKey>,
    cellMap: Map<CellKey, Bin>,
    itemToCellsMap: Map<Item, Set<CellKey>>,
    ensureCell: (cellKey: CellKey) => Bin,
  ): void {
    const occupiedCells = new Set<CellKey>();

    for (const cellKey of cellIterator) {
      const cell = ensureCell(cellKey);
      cell.add(item);
      occupiedCells.add(cellKey);
    }

    itemToCellsMap.set(item, occupiedCells);
  }

  /**
   * Generic helper to remove an item from an index.
   */
  #removeFromIndex(
    item: Item,
    cellMap: Map<CellKey, Bin>,
    itemToCellsMap: Map<Item, Set<CellKey>>,
  ): void {
    const occupiedCells = itemToCellsMap.get(item);
    if (!occupiedCells) {
      return;
    }

    for (const cellKey of occupiedCells) {
      const cell = cellMap.get(cellKey);
      if (cell) {
        cell.delete(item);
        if (cell.size === 0) {
          cellMap.delete(cellKey);
        }
      }
    }

    itemToCellsMap.delete(item);
  }

  /**
   * Generic helper to update an item's position in an index.
   */
  #updateInIndex(
    item: Item,
    cellIterator: Generator<CellKey>,
    cellMap: Map<CellKey, Bin>,
    itemToCellsMap: Map<Item, Set<CellKey>>,
    ensureCell: (cellKey: CellKey) => Bin,
  ): void {
    const oldCellKeys = itemToCellsMap.get(item);
    if (!oldCellKeys) {
      throw new Error("Item not in index");
    }

    const newCellKeys = new Set<CellKey>(cellIterator);
    let deleted = false;
    let added = false;

    // Remove from old cells that are not in new cells
    for (const cellKey of oldCellKeys) {
      if (!newCellKeys.has(cellKey)) {
        const cell = cellMap.get(cellKey);
        if (cell) {
          deleted = true;
          cell.delete(item);
        }
      }
    }

    // Add to new cells that were not in old cells
    for (const cellKey of newCellKeys) {
      if (!oldCellKeys.has(cellKey)) {
        const cell = ensureCell(cellKey);
        cell.add(item);
        added = true;
      }
    }

    // Clean up empty cells
    if (deleted) {
      for (const cellKey of oldCellKeys) {
        const cell = cellMap.get(cellKey);
        if (cell && cell.size === 0) {
          cellMap.delete(cellKey);
        }
      }
    }

    // Update tracking
    if (deleted || added) {
      itemToCellsMap.set(item, newCellKeys);
    } else {
      newCellKeys.clear();
    }
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

    // Add to cuboid index
    this.#addToIndex(
      item,
      this.#iterateCuboidCellKeys(item.state.position, item.aabb),
      this.#cells,
      this.#itemToCellKeys,
      (cellKey) => this.#ensureCell(cellKey),
    );

    // Add to projected cell index
    this.#upsertAxesProjections(item);
    this.#addToIndex(
      item,
      this.#iterateProjectionCellKeys(item),
      this.#projectedCells,
      this.#itemToProjectedCellKeys,
      (cellKey) => this.#ensureProjectedCell(cellKey),
    );
  }

  /**
   * Create a string key from cell coordinates
   */
  #makeCellKey(x: number, y: number, z: number): CellKey {
    return `${x},${y},${z}`;
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
   * Ensure a projected cell exists, creating it if necessary
   */
  #ensureProjectedCell(cellKey: CellKey): Bin {
    let cell = this.#projectedCells.get(cellKey);
    if (!cell) {
      cell = new Set() as Bin;
      this.#projectedCells.set(cellKey, cell);
    }
    return cell;
  }

  *#iterateCuboidCellKeys(
    /** The position of the cuboid */
    position: Xyz,
    /** The size of the cuboid */
    size: Xyz,
  ): Generator<CellKey> {
    const minCorner = position;
    const maxCorner = addXyz(position, size);

    // Calculate which cells this cuboid occupies
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

  #upsertAxesProjections(i: Item): ProjectionOnAxes {
    const pos =
      i.renderAabbOffset ?
        addXyz(i.state.position, i.renderAabbOffset)
      : i.state.position;
    const bb = i.renderAabb || i.aabb;

    const existing = this.#itemToProjectionAxesMap.get(i);

    if (existing !== undefined) {
      // write into the existing object to avoid malloc
      projectAabbAxes(existing, pos, bb);
      return existing;
    } else {
      // don't already have in the cache so will have to create a new object
      const allAxesProjections = projectAabbAxes({}, pos, bb);
      this.#itemToProjectionAxesMap.set(i, allAxesProjections);
      return allAxesProjections;
    }
  }

  /**
   * project an item to a hexagon, but treat that hexagon as an object 3-dimensional
   * space. Where the projections of the aabb on the three world axes, onto the
   * screen axes, are taken as the ordinals.
   *
   * The hexagons we render to, with a fixed camera angle, are always using the
   * same slope/angle of their lines (z is vertical, x and y are 2:1 diagonal lines).
   * Therefore, any two hexagons overlap if they overlap on all three of these axes.
   * So, it is like a 3d overlapping problem, but for the 2d projections of the 3d axes.
   */
  *#iterateProjectionCellKeys(i: Item): Generator<CellKey> {
    const projectionAxes = this.#itemToProjectionAxesMap.get(i);

    if (projectionAxes === undefined) {
      throw new Error("projectionAxes not calculated for " + i.id);
    }

    const {
      xAxisProjectionMin,
      xAxisProjectionMax,
      yAxisProjectionMin,
      yAxisProjectionMax,
      zAxisProjectionMin,
      zAxisProjectionMax,
    } = projectionAxes;

    // Calculate which cells this cuboid occupies
    const minCellX = Math.floor(xAxisProjectionMin / projCellWidth);
    const minCellY = Math.floor(yAxisProjectionMin / projCellDepth);
    const minCellZ = Math.floor(zAxisProjectionMin / projCellHeight);
    const maxCellX = Math.floor(xAxisProjectionMax / projCellWidth);
    const maxCellY = Math.floor(yAxisProjectionMax / projCellDepth);
    const maxCellZ = Math.floor(zAxisProjectionMax / projCellHeight);

    // Yield all cell keys the projection occupies
    for (let x = minCellX; x <= maxCellX; x++) {
      for (let y = minCellY; y <= maxCellY; y++) {
        for (let z = minCellZ; z <= maxCellZ; z++) {
          yield this.#makeCellKey(x, y, z);
        }
      }
    }
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

    // Remove from cuboid index
    this.#removeFromIndex(item, this.#cells, this.#itemToCellKeys);

    // Remove from projected cell index
    this.#removeFromIndex(
      item,
      this.#projectedCells,
      this.#itemToProjectedCellKeys,
    );
  }

  /**
   * Update an item's position in the spatial index. After this,
   * collision detection should work
   */
  updateItemSpatialIndex(
    /** The item to update */
    item: Item,
  ): void {
    // Update in cuboid index
    this.#updateInIndex(
      item,
      this.#iterateCuboidCellKeys(item.state.position, item.aabb),
      this.#cells,
      this.#itemToCellKeys,
      (cellKey) => this.#ensureCell(cellKey),
    );
  }
  /**
   * Update an item's position in the grid. After this, z-edge graph
   * updates should work.
   */
  updateItemProjectedIndex(
    /** The item to update */
    item: Item,
  ): void {
    // Update in projected cell index
    this.#upsertAxesProjections(item);
    this.#updateInIndex(
      item,
      this.#iterateProjectionCellKeys(item),
      this.#projectedCells,
      this.#itemToProjectedCellKeys,
      (cellKey) => this.#ensureProjectedCell(cellKey),
    );
  }

  /**
   * Get all items that occupy cells within the given cuboid region.
   * Each item appears only once in the returned set.
   */
  getCuboidNeighbourhood(
    /** The position of the cuboid to check */
    position: Xyz,
    /** The size of the cuboid to check */
    size: Xyz,
    /** Optional item to exclude from results (usually the querying item) */
    excludeItem?: MinimumRequiredItem,
  ): Set<Item> {
    const neighbours = new Set<Item>();

    for (const cellKey of this.#iterateCuboidCellKeys(position, size)) {
      const cell = this.#cells.get(cellKey);
      if (cell) {
        for (const neighbour of cell) {
          if (neighbour !== excludeItem) {
            neighbours.add(neighbour);
          }
        }
      }
    }

    return neighbours;
  }

  /**
   * Get all items that occupy projected cells overlapping with the given item.
   * Each item appears only once in the returned set.
   *
   * The item *must* be in the index
   */
  getProjectedNeighbourhood(
    /** The item whose projection neighbourhood to check */
    item: Item,
    /** Optional item to exclude from results (usually the querying item) */
    excludeItem?: Item,
  ): Set<Item> {
    const neighbours = new Set<Item>();

    // note we don't call this:
    // this.#upsertAxesProjections(item);
    // so it is required the item be in the index, and be up to date
    for (const cellKey of this.#iterateProjectionCellKeys(item)) {
      const cell = this.#projectedCells.get(cellKey);
      if (cell) {
        for (const neighbour of cell) {
          if (neighbour !== excludeItem) {
            neighbours.add(neighbour);
          }
        }
      }
    }

    return neighbours;
  }

  /**
   * Get all items that share at least one cell with the given item.
   * Each item appears only once in the returned set.
   */
  getItemCuboidNeighbourhood(
    /**
     * NOTE: - there is no requirement for this item to actually be in the index itself
     */
    item: MinimumRequiredItem,
  ): Set<Item> {
    return this.getCuboidNeighbourhood(item.state.position, item.aabb, item);
  }

  getItemProjectedNeighbourhood(
    /**
     * NOTE: - there is no requirement for this item to actually be in the index itself
     */
    item: Item,
  ): Set<Item> {
    return this.getProjectedNeighbourhood(item, item);
  }

  /**
   * Get the cached axes projections for an item in the index.
   * Returns undefined if the item is not in the index.
   */
  getItemAxesProjections(item: Item): ProjectionOnAxes | undefined {
    return this.#itemToProjectionAxesMap.get(item);
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

    // Sort projected cell keys for consistent output
    const sortedProjectedCellKeys = Array.from(
      this.#projectedCells.keys(),
    ).sort();

    const projectedCellEntries = sortedProjectedCellKeys.map((cellKey) => {
      const cell = this.#projectedCells.get(cellKey)!;
      const itemIds = Array.from(cell).map((item) => item.id);
      return `  (${cellKey}) => [${itemIds.join(", ")}]`;
    });

    return `GridSpatialIndex (${this.#cells.size} 3D cells, ${this.#projectedCells.size} projected cells, ${this.#itemToCellKeys.size} items) {
  3D Cells:
${cellEntries.join(",\n")}
  Projected Cells:
${projectedCellEntries.join(",\n")}
}`;
  }
}
