import { type UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import { type XyzBox } from "../../../utils/vectors/vectors";
import { blockSizePx } from "../mechanicsConstants";

/** two cell coords packed into one 32-bit int (16 bits each) - see {@link makeCellKey} */
type XyCellKey = number;

/**
 * Pack cell coordinates into a single integer key. 16 bits per axis, masked so a
 * negative coord doesn't bleed into the other half - rooms are far smaller than
 * the ±32767-cell range this allows.
 */
const makeCellKey = (x: number, y: number): XyCellKey =>
  ((x & 0xff_ff) << 16) | (y & 0xff_ff);

/** the (x, y) cell coordinates packed into a key by {@link makeCellKey} */
const decodeCellKey = (key: XyCellKey): { x: number; y: number } =>
  // sign-extend each 16-bit half back to a signed coordinate:
  ({ x: key >> 16, y: (key << 16) >> 16 });

/**
 * The shape an item needs to be indexed: a stable identity and a world box
 * (position plus dimensions).
 */
export type Indexable = {
  id: string;
  state: {
    box: Readonly<XyzBox>;
  };
};

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
  /** cell key → the set of items occupying that cell. Sparse: empty cells aren't stored. */
  #cells = new Map<XyCellKey, Set<Item>>();
  /**
   * item → the set of cell keys it currently occupies. This reverse mapping makes
   * update/remove O(cells-of-item) rather than a scan of the whole grid. Held
   * alongside {@link #cells} so the two can never desync
   */
  #itemToCellKeys = new Map<Item, Set<XyCellKey>>();

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

  *#iterateCuboidCellKeys(box: Readonly<XyzBox>): Generator<XyCellKey> {
    // Calculate which cells this cuboid occupies (only x,y)
    const minCellX = Math.floor(box.x / cellWidth);
    const minCellY = Math.floor(box.y / cellDepth);
    const maxCellX = Math.floor((box.x + box.xd) / cellWidth);
    const maxCellY = Math.floor((box.y + box.yd) / cellDepth);

    for (let x = minCellX; x <= maxCellX; x++) {
      for (let y = minCellY; y <= maxCellY; y++) {
        yield makeCellKey(x, y);
      }
    }
  }

  #ensureCell(cellKey: XyCellKey): Set<Item> {
    let cell = this.#cells.get(cellKey);
    if (!cell) {
      cell = new Set();
      this.#cells.set(cellKey, cell);
    }
    return cell;
  }

  /** put an item into all the given cells */
  #addToCells(item: Item, cellKeys: Iterable<XyCellKey>): void {
    const occupiedCells = new Set<XyCellKey>();
    for (const cellKey of cellKeys) {
      this.#ensureCell(cellKey).add(item);
      occupiedCells.add(cellKey);
    }
    this.#itemToCellKeys.set(item, occupiedCells);
  }

  /** take an item out of every cell it is in, dropping any it leaves empty */
  #removeFromCells(item: Item): void {
    const occupiedCells = this.#itemToCellKeys.get(item);
    this.#itemToCellKeys.delete(item);

    if (!occupiedCells) {
      return;
    }

    for (const cellKey of occupiedCells) {
      const cell = this.#cells.get(cellKey);
      if (cell) {
        cell.delete(item);
        if (cell.size === 0) {
          this.#cells.delete(cellKey);
        }
      }
    }
  }

  /**
   * move an item to a new set of cells, touching only the cells that actually
   * changed. The item must already be in the index.
   */
  #moveToCells(item: Item, cellKeys: Iterable<XyCellKey>): void {
    const oldCellKeys = this.#itemToCellKeys.get(item);
    if (!oldCellKeys) {
      throw new Error(`Item not in index`);
    }

    const newCellKeys = new Set<XyCellKey>(cellKeys);
    let deleted = false;
    let added = false;

    // Remove from old cells that are not in new cells
    for (const cellKey of oldCellKeys) {
      if (!newCellKeys.has(cellKey)) {
        const cell = this.#cells.get(cellKey);
        if (cell) {
          deleted = true;
          cell.delete(item);
        }
      }
    }

    // Add to new cells that were not in old cells
    for (const cellKey of newCellKeys) {
      if (!oldCellKeys.has(cellKey)) {
        this.#ensureCell(cellKey).add(item);
        added = true;
      }
    }

    // Clean up empty cells
    if (deleted) {
      for (const cellKey of oldCellKeys) {
        const cell = this.#cells.get(cellKey);
        if (cell && cell.size === 0) {
          this.#cells.delete(cellKey);
        }
      }
    }

    // Update tracking
    if (deleted || added) {
      this.#itemToCellKeys.set(item, newCellKeys);
    } else {
      newCellKeys.clear();
    }
  }

  /** Add an item to the grid at its current position. */
  addItem(item: Item): void {
    if (this.#itemToCellKeys.has(item)) {
      throw new Error(`Item ${item.id} is already in the spatial index`);
    }
    this.#addToCells(item, this.#iterateCuboidCellKeys(item.state.box));
    this.#cuboidCellExtentDirty = true;
  }

  /** Remove an item from the grid. */
  removeItem(item: Item): void {
    if (!this.#itemToCellKeys.has(item)) {
      throw new Error(`Item ${item.id} is not in the spatial index`);
    }
    this.#removeFromCells(item);
    this.#cuboidCellExtentDirty = true;
  }

  /**
   * Update an item's position in the spatial index. After this, collision
   * detection should work.
   */
  updateItemSpatialIndex(item: Item): void {
    this.#moveToCells(item, this.#iterateCuboidCellKeys(item.state.box));
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
    return this.#cells.get(makeCellKey(cellX, cellY));
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
      for (const key of this.#cells.keys()) {
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
    /** The cuboid region (position + dimensions) to check */
    box: Readonly<XyzBox>,
    /** Optional item to exclude from results (usually the querying item) */
    excludeItem?: Indexable,
  ): Set<Item> {
    const neighbours = new Set<Item>();

    for (const cellKey of this.#iterateCuboidCellKeys(box)) {
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
   * Get all items that share at least one cuboid cell with the given item. There
   * is no requirement for this item to actually be in the index itself.
   */
  getItemCuboidNeighbourhood(item: Indexable): Set<Item> {
    return this.getCuboidNeighbourhood(item.state.box, item);
  }

  /**
   * a human-readable dump of every occupied cell and the item ids in it, for the
   * cheats panel.
   */
  debugToString(): string {
    const sortedCellKeys = Array.from(this.#cells.keys()).sort((a, b) => a - b);

    const cellEntries = sortedCellKeys.map((cellKey) => {
      const cell = this.#cells.get(cellKey)!;
      const itemIds = Array.from(cell).map((item) => item.id);
      const { x, y } = decodeCellKey(cellKey);
      return `  (${x},${y}) [raw ${cellKey}] => [${itemIds.join(", ")}]`;
    });

    return `SpatialIndex (${sortedCellKeys.length} cells) {\n${cellEntries.join(",\n")}\n}`;
  }
}
