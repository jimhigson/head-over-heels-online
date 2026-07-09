import { type Xyz } from "../../../utils/vectors/vectors";

/** two cell coords packed into one 32-bit int (16 bits each) - see {@link makeCellKey} */
export type XyCellKey = number;

/**
 * Pack cell coordinates into a single integer key. 16 bits per axis, masked so a
 * negative coord doesn't bleed into the other half - rooms are far smaller than
 * the ±32767-cell range this allows.
 */
export const makeCellKey = (x: number, y: number): XyCellKey =>
  ((x & 0xff_ff) << 16) | (y & 0xff_ff);

/** the (x, y) cell coordinates packed into a key by {@link makeCellKey} */
export const decodeCellKey = (key: XyCellKey): { x: number; y: number } =>
  // sign-extend each 16-bit half back to a signed coordinate:
  ({ x: key >> 16, y: (key << 16) >> 16 });

/**
 * The shape an item needs to be indexed: a stable identity, a world position, and
 * a bounding box (optionally a separate render box used for the visual/projected
 * index).
 */
export type Indexable = {
  id: string;
  state: {
    position: Xyz;
  };
  aabb: Xyz;
};

/**
 * A sparse 2D grid that maps cells to the items occupying them, and each item back
 * to the cells it occupies. The two maps are held together here so they can never
 * desync, and add/remove/update operate over a caller-supplied set of cell keys.
 *
 * This is the shared bookkeeping behind both spatial indexes: the cuboid (world)
 * index and the projected (screen) index each compose one of these with their own
 * cell-key generator.
 */
export class CellIndex<Item> {
  /** cell key → the set of items occupying that cell. Sparse: empty cells aren't stored. */
  #cells = new Map<XyCellKey, Set<Item>>();
  /**
   * item → the set of cell keys it currently occupies. This reverse mapping makes
   * update/remove O(cells-of-item) rather than a scan of the whole grid.
   */
  #itemToCellKeys = new Map<Item, Set<XyCellKey>>();

  #ensureCell(cellKey: XyCellKey): Set<Item> {
    let cell = this.#cells.get(cellKey);
    if (!cell) {
      cell = new Set();
      this.#cells.set(cellKey, cell);
    }
    return cell;
  }

  /** whether the item is currently in the index */
  has(item: Item): boolean {
    return this.#itemToCellKeys.has(item);
  }

  /** every item currently in the index */
  items(): IterableIterator<Item> {
    return this.#itemToCellKeys.keys();
  }

  /** every occupied cell key (only cells with items exist) */
  occupiedCellKeys(): IterableIterator<XyCellKey> {
    return this.#cells.keys();
  }

  /**
   * The live Set of items occupying one cell. Returns the stored Set itself (no
   * copy) — the caller must NOT mutate it, and should not retain it across index
   * mutations. undefined when the cell is empty.
   */
  getCell(cellKey: XyCellKey): ReadonlySet<Item> | undefined {
    return this.#cells.get(cellKey);
  }

  /** add an item to all the given cells */
  add(item: Item, cellKeys: Iterable<XyCellKey>): void {
    const occupiedCells = new Set<XyCellKey>();
    for (const cellKey of cellKeys) {
      this.#ensureCell(cellKey).add(item);
      occupiedCells.add(cellKey);
    }
    this.#itemToCellKeys.set(item, occupiedCells);
  }

  /** remove an item from the index, cleaning up any cells it leaves empty */
  remove(item: Item): void {
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
  update(item: Item, cellKeys: Iterable<XyCellKey>): void {
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
}
