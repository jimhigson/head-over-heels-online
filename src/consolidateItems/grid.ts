import type { Xyz } from "../utils/vectors/vectors";
import type { ConsolidatableItemWithId } from "./consolidateItems";

import { getJsonItemTimes } from "../model/times";

export class Grid<T> {
  #cells: Set<T>[][][];
  #offset: Xyz;
  #size: Xyz;

  constructor(minBounds: Xyz, maxBounds: Xyz) {
    // Calculate offsets (negative of min bounds)
    this.#offset = {
      x: -minBounds.x,
      y: -minBounds.y,
      z: -minBounds.z,
    };

    // Calculate size
    this.#size = {
      x: maxBounds.x - minBounds.x + 1,
      y: maxBounds.y - minBounds.y + 1,
      z: maxBounds.z - minBounds.z + 1,
    };

    // Initialize the 3D array of sets
    this.#cells = Array.from({ length: this.#size.x }, () =>
      Array.from({ length: this.#size.y }, () =>
        Array.from({ length: this.#size.z }, () => new Set<T>()),
      ),
    );
  }

  /**
   * Create a Grid from a collection of consolidatable items
   */
  static fromItems(
    items: Iterable<ConsolidatableItemWithId>,
  ): Grid<ConsolidatableItemWithId> {
    // First pass: determine bounds
    let minX = Infinity;
    let minY = Infinity;
    let minZ = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    let maxZ = -Infinity;

    const itemsArray = [...items];

    for (const [, item] of itemsArray) {
      const { x, y, z } = item.position;
      const times = getJsonItemTimes(item);

      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      minZ = Math.min(minZ, z);

      maxX = Math.max(maxX, x + times.x - 1);
      maxY = Math.max(maxY, y + times.y - 1);
      maxZ = Math.max(maxZ, z + times.z - 1);
    }

    // Handle empty items case
    if (itemsArray.length === 0) {
      return new Grid({ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 });
    }

    // Create grid with proper bounds
    const grid = new Grid<ConsolidatableItemWithId>(
      { x: minX, y: minY, z: minZ },
      { x: maxX, y: maxY, z: maxZ },
    );

    // Populate the grid
    for (const itemWithId of itemsArray) {
      const [, item] = itemWithId;
      const { x, y, z } = item.position;
      const times = getJsonItemTimes(item);

      // Place the item in all cells it occupies
      for (let dx = 0; dx < times.x; dx++) {
        for (let dy = 0; dy < times.y; dy++) {
          for (let dz = 0; dz < times.z; dz++) {
            grid.add({ x: x + dx, y: y + dy, z: z + dz }, itemWithId);
          }
        }
      }
    }

    return grid;
  }

  /**
   * Get the set at a specific position
   */
  get(position: Xyz): Set<T> | undefined {
    const x = position.x + this.#offset.x;
    const y = position.y + this.#offset.y;
    const z = position.z + this.#offset.z;

    if (this.#isInBounds(x, y, z)) {
      return this.#cells[x][y][z];
    }
    return undefined;
  }

  /**
   * Set the set at a specific position
   */
  set(position: Xyz, value: Set<T>): void {
    const x = position.x + this.#offset.x;
    const y = position.y + this.#offset.y;
    const z = position.z + this.#offset.z;

    if (this.#isInBounds(x, y, z)) {
      this.#cells[x][y][z] = value;
    }
  }

  /**
   * Add an item to the set at a specific position
   */
  add(position: Xyz, item: T): void {
    const set = this.get(position);
    if (set) {
      set.add(item);
    }
  }

  /**
   * Remove an item from the set at a specific position
   */
  remove(position: Xyz, item: T): void {
    const set = this.get(position);
    if (set) {
      set.delete(item);
    }
  }

  /**
   * Get the size of the grid
   */
  get size(): Xyz {
    return { ...this.#size };
  }

  /**
   * Get the minimum bounds (world coordinates)
   */
  get minBounds(): Xyz {
    return {
      x: -this.#offset.x,
      y: -this.#offset.y,
      z: -this.#offset.z,
    };
  }

  /**
   * Get the maximum bounds (world coordinates)
   */
  get maxBounds(): Xyz {
    const min = this.minBounds;
    return {
      x: min.x + this.#size.x - 1,
      y: min.y + this.#size.y - 1,
      z: min.z + this.#size.z - 1,
    };
  }

  /**
   * Iterate through all cells in the grid
   */
  *iterate(): Generator<[Xyz, Set<T>]> {
    const { minBounds } = this;

    for (let x = 0; x < this.#size.x; x++) {
      for (let y = 0; y < this.#size.y; y++) {
        for (let z = 0; z < this.#size.z; z++) {
          const worldPos: Xyz = {
            x: x + minBounds.x,
            y: y + minBounds.y,
            z: z + minBounds.z,
          };
          yield [worldPos, this.#cells[x][y][z]];
        }
      }
    }
  }

  /**
   * Extract all unique items from the grid
   */
  extractUniqueItems(): T[] {
    const seenItems = new Set<T>();
    const result: T[] = [];

    for (const [, set] of this.iterate()) {
      for (const item of set) {
        if (!seenItems.has(item)) {
          seenItems.add(item);
          result.push(item);
        }
      }
    }

    return result;
  }

  #isInBounds(x: number, y: number, z: number): boolean {
    return (
      x >= 0 &&
      x < this.#size.x &&
      y >= 0 &&
      y < this.#size.y &&
      z >= 0 &&
      z < this.#size.z
    );
  }
}
