import { expect, test } from "vitest";

import type { FreeItem } from "../physics/itemPredicates";

import { snapFreeItemToPixelGrid } from "./snapInactiveItemsToPixelGrid";

const createMockItem = ({
  position,
  actedOnAt,
}: {
  position: { x: number; y: number; z: number };
  actedOnAt: {
    roomTime: number;
    actedInXY: boolean;
    actedInZ: boolean;
  };
}) =>
  ({
    state: {
      position,
      actedOnAt: {
        ...actedOnAt,
        by: {},
      },
    },
  }) as FreeItem<string, string>;

test("returns undefined when acted on in XY this tick", () => {
  const item = createMockItem({
    position: { x: 1.5, y: 2.5, z: 3.5 },
    actedOnAt: { roomTime: 100, actedInXY: true, actedInZ: false },
  });

  expect(snapFreeItemToPixelGrid(item, 100)).toBeUndefined();
});

test("snaps XY only when acted on in Z this tick", () => {
  const item = createMockItem({
    position: { x: 1.5, y: 2.5, z: 3.5 },
    actedOnAt: { roomTime: 100, actedInXY: false, actedInZ: true },
  });

  expect(snapFreeItemToPixelGrid(item, 100)).toEqual({ x: 2, y: 3, z: 3.5 });
});

test("snaps XYZ when not acted on this tick", () => {
  const item = createMockItem({
    position: { x: 1.5, y: 2.5, z: 3.5 },
    actedOnAt: { roomTime: 50, actedInXY: true, actedInZ: true },
  });

  expect(snapFreeItemToPixelGrid(item, 100)).toEqual({ x: 2, y: 3, z: 4 });
});

test("returns undefined when position is already on pixel grid", () => {
  const item = createMockItem({
    position: { x: 1, y: 2, z: 3 },
    actedOnAt: { roomTime: 50, actedInXY: false, actedInZ: false },
  });

  expect(snapFreeItemToPixelGrid(item, 100)).toBeUndefined();
});

test("snaps only XY when Z is already integer and acted on in Z", () => {
  const item = createMockItem({
    position: { x: 1.5, y: 2.5, z: 3 },
    actedOnAt: { roomTime: 100, actedInXY: false, actedInZ: true },
  });

  expect(snapFreeItemToPixelGrid(item, 100)).toEqual({ x: 2, y: 3, z: 3 });
});

test("snaps Z when XY is already integer", () => {
  const item = createMockItem({
    position: { x: 1, y: 2, z: 3.5 },
    actedOnAt: { roomTime: 50, actedInXY: false, actedInZ: false },
  });

  expect(snapFreeItemToPixelGrid(item, 100)).toEqual({ x: 1, y: 2, z: 4 });
});

test("rounds down when fractional part is less than 0.5", () => {
  const item = createMockItem({
    position: { x: 1.4, y: 2.4, z: 3.4 },
    actedOnAt: { roomTime: 50, actedInXY: false, actedInZ: false },
  });

  expect(snapFreeItemToPixelGrid(item, 100)).toEqual({ x: 1, y: 2, z: 3 });
});

test("returns undefined when XY is integer and Z fractional but acted on in Z", () => {
  const item = createMockItem({
    position: { x: 1, y: 2, z: 3.5 },
    actedOnAt: { roomTime: 100, actedInXY: false, actedInZ: true },
  });

  // XY is already integer, Z is fractional but we're not snapping Z
  expect(snapFreeItemToPixelGrid(item, 100)).toBeUndefined();
});
