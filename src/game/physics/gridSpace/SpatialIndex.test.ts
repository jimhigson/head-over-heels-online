import { expect, test } from "vitest";

import { boxWithSize, type Xyz } from "../../../utils/vectors/vectors";
import { type Indexable, SpatialIndex } from "./SpatialIndex";

const makeItem = (
  id: string,
  position: Xyz,
  size: Xyz = { x: 12, y: 12, z: 12 } as Xyz,
): Indexable => ({
  id,
  state: { box: boxWithSize(position, size) },
});

// cells are blockSizePx.x*2 = 32 world px wide/deep; placing an item at
// `cell*32 + 8` with an 8px aabb keeps it wholly inside cell (cx, cy), with no
// straddling - so it lands in exactly one cell, even for negative coords
const cellSizePx = 32;
const itemInCell = (id: string, cx: number, cy: number): Indexable =>
  makeItem(
    id,
    { x: cx * cellSizePx + 8, y: cy * cellSizePx + 8, z: 0 } as Xyz,
    { x: 8, y: 8, z: 8 } as Xyz,
  );

test("add and remove item with id=head", () => {
  const spatialIndex = new SpatialIndex<string, string, Indexable>();

  const headItem = makeItem("head", { x: 41, y: 41, z: 0 } as Xyz);

  // Add the item
  spatialIndex.addItem(headItem);

  // Remove the item
  spatialIndex.removeItem(headItem);

  // If we get here without throwing, the test passes
});

// cells are blockSizePx.x*2 = 32 world px wide/deep
test("worldXToCellX / worldYToCellY floor by cell size", () => {
  const idx = new SpatialIndex<string, string, Indexable>();
  expect(idx.worldXToCellX(0)).toBe(0);
  expect(idx.worldXToCellX(31)).toBe(0);
  expect(idx.worldXToCellX(32)).toBe(1);
  expect(idx.worldYToCellY(64)).toBe(2);
});

test("getCellByCellCoords returns the live bin for an occupied cell, undefined otherwise", () => {
  const idx = new SpatialIndex<string, string, Indexable>();
  const item = makeItem("a", { x: 41, y: 41, z: 0 } as Xyz); // cell (1,1)
  const cx = idx.worldXToCellX(41);
  const cy = idx.worldYToCellY(41);

  expect(idx.getCellByCellCoords(cx, cy)).toBeUndefined();
  idx.addItem(item);
  expect(idx.getCellByCellCoords(cx, cy)?.has(item)).toBe(true);
  expect(idx.getCellByCellCoords(99, 99)).toBeUndefined();
  idx.removeItem(item);
  expect(idx.getCellByCellCoords(cx, cy)).toBeUndefined();
});

test("a multi-cell item appears in every straddled cell", () => {
  const idx = new SpatialIndex<string, string, Indexable>();
  // x 10..90 spans cells 0,1,2 on x; y stays in cell 0
  const wide = makeItem(
    "wide",
    { x: 10, y: 10, z: 0 } as Xyz,
    {
      x: 80,
      y: 12,
      z: 12,
    } as Xyz,
  );
  idx.addItem(wide);

  expect(idx.getCellByCellCoords(0, 0)?.has(wide)).toBe(true);
  expect(idx.getCellByCellCoords(1, 0)?.has(wide)).toBe(true);
  expect(idx.getCellByCellCoords(2, 0)?.has(wide)).toBe(true);
});

test("getOccupiedCuboidCellExtent reflects adds, removal of an extreme, and moves", () => {
  const idx = new SpatialIndex<string, string, Indexable>();
  expect(idx.getOccupiedCuboidCellExtent()).toBeUndefined();

  const a = makeItem("a", { x: 10, y: 10, z: 0 } as Xyz); // cell (0,0)
  const b = makeItem("b", { x: 200, y: 130, z: 0 } as Xyz); // cell (6,4)
  idx.addItem(a);
  idx.addItem(b);
  expect(idx.getOccupiedCuboidCellExtent()).toEqual({
    minCellX: 0,
    maxCellX: 6,
    minCellY: 0,
    maxCellY: 4,
  });

  // removing the extreme item shrinks the extent (guards the dirty-recompute)
  idx.removeItem(b);
  expect(idx.getOccupiedCuboidCellExtent()).toEqual({
    minCellX: 0,
    maxCellX: 0,
    minCellY: 0,
    maxCellY: 0,
  });

  // moving an item to a new cell updates the extent
  a.state.box = boxWithSize(
    { x: 200, y: 200, z: 0 } as Xyz,
    {
      x: 12,
      y: 12,
      z: 12,
    } as Xyz,
  ); // cell (6,6)
  idx.updateItemSpatialIndex(a);
  expect(idx.getOccupiedCuboidCellExtent()).toEqual({
    minCellX: 6,
    maxCellX: 6,
    minCellY: 6,
    maxCellY: 6,
  });
});

test("indexes an item at a negative position into a negative cell", () => {
  const idx = new SpatialIndex<string, string, Indexable>();
  const item = itemInCell("neg", -2, -3);

  idx.addItem(item);
  expect(idx.getCellByCellCoords(-2, -3)?.has(item)).toBe(true);

  idx.removeItem(item);
  expect(idx.getCellByCellCoords(-2, -3)).toBeUndefined();
});

test("packs distinct cell keys across negative and large (<=512) coords", () => {
  const idx = new SpatialIndex<string, string, Indexable>();
  // (0,-1), (-1,0) and (-1,-1) would alias under a naive (x<<16)|y without the
  // low-half mask; the far-apart large cells exercise the ~512-wide range:
  const cells = [
    [0, -1],
    [-1, 0],
    [-1, -1],
    [512, 7],
    [-300, 511],
  ] as const;
  const items = cells.map(([cx, cy], i) => itemInCell(`i${i}`, cx, cy));
  for (const item of items) {
    idx.addItem(item);
  }

  for (const [i, [cx, cy]] of cells.entries()) {
    const bin = idx.getCellByCellCoords(cx, cy);
    // each item sits alone in its own cell - no key collisions:
    expect(bin?.has(items[i])).toBe(true);
    expect(bin?.size).toBe(1);
  }
});

test("getOccupiedCuboidCellExtent spans negative and large cells", () => {
  const idx = new SpatialIndex<string, string, Indexable>();
  idx.addItem(itemInCell("a", -300, -7));
  idx.addItem(itemInCell("b", 512, 511));

  // the extent decodes the packed keys back to coords - check it round-trips
  // both negative (sign-extended) and large halves:
  expect(idx.getOccupiedCuboidCellExtent()).toEqual({
    minCellX: -300,
    maxCellX: 512,
    minCellY: -7,
    maxCellY: 511,
  });
});
