import { type UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import { cameraAngleBase } from "../../../utils/vectors/rotateXy";
import { addXyz, type Xy } from "../../../utils/vectors/vectors";
import {
  CellIndex,
  type Indexable,
  makeCellKey,
  type XyCellKey,
} from "../../physics/gridSpace/CellIndex";
import { blockSizePx } from "../../physics/mechanicsConstants";
import { worldBoxToCameraSpace } from "../projections";
import { projectAabbAxes, type ProjectionOnAxes } from "./projectAabbCorners";

// like the cuboid index, the multipliers are a balance between each item being in
// more cells (because smaller cells) and having to do more of the fine
// comparisons (because cells are big and have a lot of items in them)
const projCellDepth = blockSizePx.x * 2;
const projCellWidth = blockSizePx.x * 2;

/**
 * Indexes each item by where it draws on screen: an item projects to a hexagon,
 * bounded on three screen axes (the projections of the world x, y and z axes).
 * Two hexagons overlap only if they overlap on all three - but the cells bucket by
 * only two of them (the x and y projections), so a neighbourhood lookup is a cheap
 * 2D broad-phase that slightly over-returns; the third (z) axis is confirmed in the
 * fine overlap test (visuallyOverlaps). Used for draw-order edge finding.
 *
 * The projection depends on the camera angle, unlike the world-space SpatialIndex.
 */
export class VisualIndex<Item extends Indexable = UnionOfAllItemInPlayTypes> {
  #cells = new CellIndex<Item>();

  /** cache of where each item projects to on the on-screen axes (x,y,z)(min,max) */
  #itemToProjectionAxesMap = new Map<Item, ProjectionOnAxes>();

  /** the camera rotation the projections are computed for; fixed for the index's life */
  readonly cameraAngle: Xy;

  constructor(
    /** Optional iterable of items to initially populate the index */
    items?: Iterable<Item>,
    cameraAngle: Xy = cameraAngleBase,
  ) {
    this.cameraAngle = cameraAngle;
    if (items) {
      for (const item of items) {
        this.addItem(item);
      }
    }
  }

  #upsertAxesProjections(i: Item): ProjectionOnAxes {
    const pos =
      i.renderAabbOffset ?
        addXyz(i.state.position, i.renderAabbOffset)
      : i.state.position;
    const bb = i.renderAabb || i.aabb;

    // rotate the box into camera space so projectAabbAxes (fixed-camera maths) is
    // correct for the current rotation:
    const { position: cameraPos, aabb: cameraBb } = worldBoxToCameraSpace(
      pos,
      bb,
      this.cameraAngle,
    );

    const existing = this.#itemToProjectionAxesMap.get(i);

    if (existing !== undefined) {
      // write into the existing object to avoid malloc
      projectAabbAxes(existing, cameraPos, cameraBb);
      return existing;
    }
    // don't already have in the cache so will have to create a new object
    const allAxesProjections = projectAabbAxes({}, cameraPos, cameraBb);
    this.#itemToProjectionAxesMap.set(i, allAxesProjections);
    return allAxesProjections;
  }

  /**
   * the cells the item's projected hexagon occupies. The hexagons we render to,
   * with a fixed camera angle, always use the same slope/angle of their lines (z is
   * vertical, x and y are 2:1 diagonal lines). Therefore, any two hexagons overlap
   * if they overlap on all three of these axes - so it is like a 3d overlapping
   * problem, but for the 2d projections of the 3d axes.
   */
  *#iterateProjectionCellKeys(i: Item): Generator<XyCellKey> {
    const projectionAxes = this.#itemToProjectionAxesMap.get(i);

    if (projectionAxes === undefined) {
      throw new Error("projectionAxes not calculated for " + i.id);
    }

    const {
      xAxisProjectionMin,
      xAxisProjectionMax,
      yAxisProjectionMin,
      yAxisProjectionMax,
    } = projectionAxes;

    const minCellX = Math.floor(xAxisProjectionMin / projCellWidth);
    const minCellY = Math.floor(yAxisProjectionMin / projCellDepth);
    const maxCellX = Math.floor(xAxisProjectionMax / projCellWidth);
    const maxCellY = Math.floor(yAxisProjectionMax / projCellDepth);

    for (let x = minCellX; x <= maxCellX; x++) {
      for (let y = minCellY; y <= maxCellY; y++) {
        yield makeCellKey(x, y);
      }
    }
  }

  /** add an item, computing its projection */
  addItem(item: Item): void {
    this.#upsertAxesProjections(item);
    this.#cells.add(item, this.#iterateProjectionCellKeys(item));
  }

  /** remove an item, discarding its cached projection */
  removeItem(item: Item): void {
    this.#cells.remove(item);
    this.#itemToProjectionAxesMap.delete(item);
  }

  /** whether the item is currently in the index */
  has(item: Item): boolean {
    return this.#cells.has(item);
  }

  /** every item currently in the index */
  items(): IterableIterator<Item> {
    return this.#cells.items();
  }

  /**
   * Update an item's projection in the index. After this, z-edge graph updates
   * should work.
   */
  updateItemProjectedIndex(item: Item): void {
    this.#upsertAxesProjections(item);
    this.#cells.update(item, this.#iterateProjectionCellKeys(item));
  }

  /**
   * Get all items whose projected hexagon shares a cell with the given item's. Each
   * item appears only once in the returned set.
   *
   * The item *must* be in the index, and be up to date (this does not re-project
   * it first).
   */
  getProjectedNeighbourhood(
    /** The item whose projection neighbourhood to check */
    item: Item,
    /** Optional item to exclude from results (usually the querying item) */
    excludeItem?: Item,
  ): Set<Item> {
    const neighbours = new Set<Item>();

    for (const cellKey of this.#iterateProjectionCellKeys(item)) {
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

  getItemProjectedNeighbourhood(item: Item): Set<Item> {
    return this.getProjectedNeighbourhood(item, item);
  }

  /**
   * Get the cached axes projections for an item in the index. Returns undefined if
   * the item is not in the index.
   */
  getItemAxesProjections(item: Item): ProjectionOnAxes | undefined {
    return this.#itemToProjectionAxesMap.get(item);
  }
}
