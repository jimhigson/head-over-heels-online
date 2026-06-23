import { type UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import { addXyz, type Xyz } from "../../../utils/vectors/vectors";
import { blockSizePx } from "../mechanicsConstants";
import {
  CellIndex,
  decodeCellKey,
  type Indexable,
  makeCellKey,
  type XyCellKey,
} from "./CellIndex";

export { type Indexable } from "./CellIndex";

// these multiplications empirically give good performance in larger rooms.
// if the cells are too fine, the search for shadow-casters has to visit
// many cells - best to keep this small. Nothing else seems to mind
// the multiplication very much perf-wise, since the number of items in any
// given cell remains very small
const cellDepth = blockSizePx.x * 2;
const cellWidth = blockSizePx.x * 2;

type CuboidCellExtent = {
  minCellX: number;
  maxCellX: number;
  minCellY: number;
  maxCellY: number;
};

/**
 * The cuboid (world-space) half of the room's spatial index: divides the world
 * into a 2D grid of cells (x,y only - infinite vertical columns) and tracks which
 * items occupy each cell, for collision and neighbourhood queries.
 *
 * Indexing in x,y only is based on the assumption that there will be lots of items
 * overlapping in x and y, but few vertically above or below. The trade off is a
 * simpler index, for considering more cells for collisions. This also allows us to
 * make 'infinitely high' (or just very high) walls since they still don't need to
 * occupy a huge number of 3d cells extending vertically.
 *
 * This is purely world-space and so is unaffected by the camera angle - it is
 * owned by the room model.
 */
export class SpatialIndex<
  RoomId extends string = string,
  RoomItemId extends string = string,
  Item extends Indexable = UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
> {
  #cells = new CellIndex<Item>();

  /**
   * cached occupied-cell extent of the cuboid index (x/y cells only - the index
   * has no z partition), with a dirty flag set on every mutation. Recomputed
   * lazily on read by one pass over the cell keys: cheaper than maintaining
   * min/max incrementally, which would need a full scan on removal-of-an-extreme
   * anyway. Used to bound the light-beam cell-march so it cannot walk forever in a
   * room with an open (wall-less) edge.
   */
  #cuboidCellExtent: CuboidCellExtent | undefined = undefined;
  #cuboidCellExtentDirty = true;

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

  *#iterateCuboidCellKeys(
    /** The position of the cuboid */
    position: Xyz,
    /** The size of the cuboid */
    size: Xyz,
  ): Generator<XyCellKey> {
    const minCorner = position;
    const maxCorner = addXyz(position, size);

    // Calculate which cells this cuboid occupies (only x,y)
    const minCellX = Math.floor(minCorner.x / cellWidth);
    const minCellY = Math.floor(minCorner.y / cellDepth);
    const maxCellX = Math.floor(maxCorner.x / cellWidth);
    const maxCellY = Math.floor(maxCorner.y / cellDepth);

    for (let x = minCellX; x <= maxCellX; x++) {
      for (let y = minCellY; y <= maxCellY; y++) {
        yield makeCellKey(x, y);
      }
    }
  }

  /** Add an item to the grid at its current position. */
  addItem(item: Item): void {
    if (this.#cells.has(item)) {
      throw new Error(`Item ${item.id} is already in the spatial index`);
    }
    this.#cells.add(
      item,
      this.#iterateCuboidCellKeys(item.state.position, item.aabb),
    );
    this.#cuboidCellExtentDirty = true;
  }

  /** Remove an item from the grid. */
  removeItem(item: Item): void {
    if (!this.#cells.has(item)) {
      throw new Error(`Item ${item.id} is not in the spatial index`);
    }
    this.#cells.remove(item);
    this.#cuboidCellExtentDirty = true;
  }

  /**
   * Update an item's position in the spatial index. After this, collision
   * detection should work.
   */
  updateItemSpatialIndex(item: Item): void {
    this.#cells.update(
      item,
      this.#iterateCuboidCellKeys(item.state.position, item.aabb),
    );
    this.#cuboidCellExtentDirty = true;
  }

  /** world x → cuboid cell x (same flooring as the cell-key generator) */
  worldXToCellX(worldX: number): number {
    return Math.floor(worldX / cellWidth);
  }
  /** world y → cuboid cell y (same flooring as the cell-key generator) */
  worldYToCellY(worldY: number): number {
    return Math.floor(worldY / cellDepth);
  }

  /**
   * The live Set of items occupying one cuboid cell, by integer cell coords.
   * Returns the stored Set itself (no copy) — the caller must NOT mutate it, and
   * should not retain it across index mutations. undefined when the cell is empty.
   * Cheaper than getCuboidNeighbourhood, which allocates a fresh Set; intended for
   * hot per-cell walks.
   */
  getCellByCellCoords(
    cellX: number,
    cellY: number,
  ): ReadonlySet<Item> | undefined {
    return this.#cells.getCell(makeCellKey(cellX, cellY));
  }

  /**
   * Min/max occupied cuboid cell in x and y (the index has no z partition, so no z
   * extent). undefined when the index is empty. Recomputed lazily on read when
   * dirty by one pass over the cell keys.
   */
  getOccupiedCuboidCellExtent(): CuboidCellExtent | undefined {
    if (this.#cuboidCellExtentDirty) {
      let minCellX = Infinity;
      let maxCellX = -Infinity;
      let minCellY = Infinity;
      let maxCellY = -Infinity;
      for (const key of this.#cells.occupiedCellKeys()) {
        const { x: cx, y: cy } = decodeCellKey(key);
        minCellX = Math.min(minCellX, cx);
        maxCellX = Math.max(maxCellX, cx);
        minCellY = Math.min(minCellY, cy);
        maxCellY = Math.max(maxCellY, cy);
      }
      this.#cuboidCellExtent =
        maxCellX === -Infinity ? undefined : (
          { minCellX, maxCellX, minCellY, maxCellY }
        );
      this.#cuboidCellExtentDirty = false;
    }
    return this.#cuboidCellExtent;
  }

  /**
   * Get all items that occupy cells within the given cuboid region. Each item
   * appears only once in the returned set.
   */
  getCuboidNeighbourhood(
    /** The position of the cuboid to check */
    position: Xyz,
    /** The size of the cuboid to check */
    size: Xyz,
    /** Optional item to exclude from results (usually the querying item) */
    excludeItem?: Indexable,
  ): Set<Item> {
    const neighbours = new Set<Item>();

    for (const cellKey of this.#iterateCuboidCellKeys(position, size)) {
      const cell = this.#cells.getCell(cellKey);
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
   * Get all items that share at least one cuboid cell with the given item. There
   * is no requirement for this item to actually be in the index itself.
   */
  getItemCuboidNeighbourhood(item: Indexable): Set<Item> {
    return this.getCuboidNeighbourhood(item.state.position, item.aabb, item);
  }

  /**
   * a human-readable dump of every occupied cell and the item ids in it, for the
   * cheats panel.
   */
  debugToString(): string {
    const sortedCellKeys = Array.from(this.#cells.occupiedCellKeys()).sort(
      (a, b) => a - b,
    );

    const cellEntries = sortedCellKeys.map((cellKey) => {
      const cell = this.#cells.getCell(cellKey)!;
      const itemIds = Array.from(cell).map((item) => item.id);
      const { x, y } = decodeCellKey(cellKey);
      return `  (${x},${y}) [raw ${cellKey}] => [${itemIds.join(", ")}]`;
    });

    return `SpatialIndex (${sortedCellKeys.length} cells) {\n${cellEntries.join(",\n")}\n}`;
  }
}
