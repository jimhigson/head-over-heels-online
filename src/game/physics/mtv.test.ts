import { describe, expect, test } from "vitest";
import { mtv } from "./mtv";
import { lengthXyz } from "../../utils/vectors/vectors";

test("same-size overlapping items, overlapping slightly in y", () => {
  const unitCubeBB = { x: 1, y: 1, z: 1 };
  const result = mtv(
    { x: 0, y: 0, z: 0 },
    unitCubeBB,
    { x: 0, y: 0.9, z: 0 },
    unitCubeBB,
  );

  expect(result).toMatchObject({
    x: expect.closeTo(0),
    y: expect.closeTo(-0.1),
    z: expect.closeTo(0),
  });
});

test("two items not overlapping gives non-zero response", () => {
  const unitCubeBB = { x: 1, y: 1, z: 1 };
  const result = mtv(
    { x: 0, y: 0, z: 0 },
    unitCubeBB,
    { x: 0, y: 5, z: 0 },
    unitCubeBB,
  );

  expect(result).toMatchObject({
    x: expect.closeTo(0),
    y: expect.closeTo(0),
    z: expect.closeTo(-1),
  });
});
describe("touching but not overlapping", () => {
  test("touching in y", () => {
    const unitCubeBB = { x: 1, y: 1, z: 1 };
    const result = mtv(
      { x: 0, y: 0, z: 0 },
      unitCubeBB,
      { x: 0, y: 1, z: 0 },
      unitCubeBB,
    );

    expect(result).toMatchObject({
      x: expect.closeTo(0),
      y: expect.closeTo(0),
      z: expect.closeTo(0),
    });
  });
  test("touching in x", () => {
    const unitCubeBB = { x: 1, y: 1, z: 1 };
    const result = mtv(
      { x: 0, y: 0, z: 0 },
      unitCubeBB,
      { x: 1, y: 0, z: 0 },
      unitCubeBB,
    );

    expect(lengthXyz(result)).toBeCloseTo(0);
  });
  test("touching in z", () => {
    const unitCubeBB = { x: 1, y: 1, z: 1 };
    const result = mtv(
      { x: 0, y: 0, z: 0 },
      unitCubeBB,
      { x: 0, y: 0, z: 1 },
      unitCubeBB,
    );

    expect(lengthXyz(result)).toBeCloseTo(0);
  });
  test("touching in multiple axes", () => {
    // this only slightly touches near one corner:
    const unitCubeBB = { x: 1, y: 0.9, z: 1 };
    const result = mtv(
      { x: 0, y: 0, z: 0 },
      unitCubeBB,
      { x: 0, y: 0, z: 1 },
      unitCubeBB,
    );

    expect(lengthXyz(result)).toBeCloseTo(0);
  });
});
