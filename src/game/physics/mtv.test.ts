import { describe, expect, test } from "vitest";

import type { Xyz } from "../../utils/vectors/vectors";

import {
  dotProductXyz,
  lengthXyz,
  unitVector,
} from "../../utils/vectors/vectors";
import { mtv, mtvAlongVector } from "./mtv";

// Custom matcher for testing vector alignment
declare module "vitest" {
  interface Assertion {
    toBeAlignedWith(vector: Xyz): void;
  }
}

expect.extend({
  toBeAlignedWith(received: Xyz, expectedDirection: Xyz) {
    // Normalize both vectors
    const receivedLength = lengthXyz(received);
    const expectedLength = lengthXyz(expectedDirection);

    // If received is zero vector, it's not aligned with anything
    if (receivedLength < 0.0001) {
      return {
        pass: false,
        message: () =>
          `Expected vector to be aligned with direction, but received vector is zero`,
      };
    }

    // If expected is zero vector, invalid test
    if (expectedLength < 0.0001) {
      return {
        pass: false,
        message: () => `Expected direction vector cannot be zero`,
      };
    }

    const receivedNorm = unitVector(received);
    const expectedNorm = unitVector(expectedDirection);

    // Check if vectors are parallel (dot product should be ±1)
    const dot = dotProductXyz(receivedNorm, expectedNorm);
    const isAligned = Math.abs(Math.abs(dot) - 1) < 0.0001;

    return {
      pass: isAligned,
      message: () =>
        isAligned ?
          `Expected vector not to be aligned with direction`
        : `Expected vector to be aligned with direction\nReceived: ${JSON.stringify(received)}\nDirection: ${JSON.stringify(expectedDirection)}\nDot product: ${dot}`,
      actual: received,
      expected: expectedDirection,
    };
  },
});

describe("mtvAlongVector", () => {
  test("overlapping items with x-axis constraint", () => {
    const unitCubeBB = { x: 1, y: 1, z: 1 };
    const result = mtvAlongVector(
      { x: 0, y: 0, z: 0 },
      unitCubeBB,
      { x: 0.5, y: 0.5, z: 0 },
      unitCubeBB,
      { x: 1, y: 0, z: 0 }, // Constrain to x-axis
    );

    // Should move along x-axis to separate
    expect(result).toBeAlignedWith({ x: 1, y: 0, z: 0 });
    expect(result.x).toBeCloseTo(-0.5);
    expect(result.y).toBeCloseTo(0);
    expect(result.z).toBeCloseTo(0);
  });

  test("overlapping items with y-axis constraint", () => {
    const unitCubeBB = { x: 1, y: 1, z: 1 };
    const result = mtvAlongVector(
      { x: 0, y: 0, z: 0 },
      unitCubeBB,
      { x: 0.5, y: 0.5, z: 0 },
      unitCubeBB,
      { x: 0, y: 1, z: 0 }, // Constrain to y-axis
    );

    // Should move along y-axis to separate
    expect(result).toBeAlignedWith({ x: 0, y: 1, z: 0 });
    expect(result.x).toBeCloseTo(0);
    expect(result.y).toBeCloseTo(-0.5);
    expect(result.z).toBeCloseTo(0);
  });

  test("overlapping items with z-axis constraint", () => {
    const unitCubeBB = { x: 1, y: 1, z: 1 };
    const result = mtvAlongVector(
      { x: 0, y: 0, z: 0 },
      unitCubeBB,
      { x: 0.5, y: 0.5, z: 0.5 },
      unitCubeBB,
      { x: 0, y: 0, z: 1 }, // Constrain to z-axis
    );

    // Should move along z-axis to separate
    expect(result).toBeAlignedWith({ x: 0, y: 0, z: 1 });
    expect(result.x).toBeCloseTo(0);
    expect(result.y).toBeCloseTo(0);
    expect(result.z).toBeCloseTo(-0.5);
  });

  test("overlapping items with diagonal constraint", () => {
    const unitCubeBB = { x: 1, y: 1, z: 1 };
    const result = mtvAlongVector(
      { x: 0, y: 0, z: 0 },
      unitCubeBB,
      { x: 0.5, y: 0.5, z: 0 },
      unitCubeBB,
      { x: 1, y: 1, z: 0 }, // Constrain to diagonal
    );

    // Should move along diagonal to separate
    expect(result).toBeAlignedWith({ x: 1, y: 1, z: 0 });
    // Need to move sqrt(2)/2 ≈ 0.707 along the diagonal
    const expectedMagnitude = Math.sqrt(2) / 2;
    expect(lengthXyz(result)).toBeCloseTo(expectedMagnitude, 1);
  });

  test("non-overlapping items with constraint returns zero", () => {
    const unitCubeBB = { x: 1, y: 1, z: 1 };
    const result = mtvAlongVector(
      { x: 0, y: 0, z: 0 },
      unitCubeBB,
      { x: 2, y: 2, z: 0 },
      unitCubeBB,
      { x: 1, y: 0, z: 0 }, // Constrain to x-axis
    );

    expect(lengthXyz(result)).toBeCloseTo(0);
  });

  test("constraint chooses positive direction when closer", () => {
    const unitCubeBB = { x: 1, y: 1, z: 1 };
    const result = mtvAlongVector(
      { x: 0, y: 0, z: 0 },
      unitCubeBB,
      { x: -0.8, y: 0, z: 0 }, // Overlaps more on the left
      unitCubeBB,
      { x: 1, y: 0, z: 0 }, // Constrain to x-axis
    );

    // Should move in positive x direction (right) as it's shorter
    expect(result.x).toBeGreaterThan(0);
    expect(result.x).toBeCloseTo(0.2);
  });

  test("constraint chooses negative direction when closer", () => {
    const unitCubeBB = { x: 1, y: 1, z: 1 };
    const result = mtvAlongVector(
      { x: 0, y: 0, z: 0 },
      unitCubeBB,
      { x: 0.8, y: 0, z: 0 }, // Overlaps by 0.2 on the left
      unitCubeBB,
      { x: 1, y: 0, z: 0 }, // Constrain to x-axis
    );

    // Should move in negative x direction (left) as it's shorter
    expect(result.x).toBeLessThan(0);
    expect(result.x).toBeCloseTo(-0.2);
  });

  test("3D diagonal constraint", () => {
    const unitCubeBB = { x: 1, y: 1, z: 1 };
    const result = mtvAlongVector(
      { x: 0, y: 0, z: 0 },
      unitCubeBB,
      { x: 0.3, y: 0.3, z: 0.3 },
      unitCubeBB,
      { x: 1, y: 1, z: 1 }, // Constrain to 3D diagonal
    );

    // Should move along 3D diagonal to separate
    expect(result).toBeAlignedWith({ x: 1, y: 1, z: 1 });
    const expectedMagnitude = Math.sqrt(3) * 0.7; // Need to move 0.7 in each axis
    expect(lengthXyz(result)).toBeCloseTo(expectedMagnitude, 1);
  });

  test("zero constraint vector returns zero MTV", () => {
    const unitCubeBB = { x: 1, y: 1, z: 1 };
    const result = mtvAlongVector(
      { x: 0, y: 0, z: 0 },
      unitCubeBB,
      { x: 0.5, y: 0.5, z: 0 },
      unitCubeBB,
      { x: 0, y: 0, z: 0 }, // Zero constraint vector
    );

    expect(lengthXyz(result)).toBeCloseTo(0);
  });

  test("constraint with large overlap", () => {
    const unitCubeBB = { x: 1, y: 1, z: 1 };
    const result = mtvAlongVector(
      { x: 0, y: 0, z: 0 },
      unitCubeBB,
      { x: 0.1, y: 0.1, z: 0 }, // Almost completely overlapping
      unitCubeBB,
      { x: 1, y: 0, z: 0 }, // Constrain to x-axis
    );

    // Should move along x-axis to fully separate
    expect(result).toBeAlignedWith({ x: 1, y: 0, z: 0 });
    expect(result.x).toBeCloseTo(-0.9);
  });

  test("perpendicular constraint requires moving past the obstacle", () => {
    const unitCubeBB = { x: 1, y: 1, z: 1 };
    const result = mtvAlongVector(
      { x: 0, y: 0, z: 0 },
      unitCubeBB,
      { x: 0, y: 0.5, z: 0 }, // Overlaps in y, aligned in x
      unitCubeBB,
      { x: 1, y: 0, z: 0 }, // Constrain to x-axis (perpendicular to overlap)
    );

    // Can separate along x-axis by moving past the obstacle
    // Should move at least 1 unit (the width of the obstacle)
    expect(result).toBeAlignedWith({ x: 1, y: 0, z: 0 });
    expect(Math.abs(result.x)).toBeCloseTo(1.0, 1);
  });
});

describe("mtv (not along vector)", () => {
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

  test("standard MTV works as before", () => {
    const unitCubeBB = { x: 1, y: 1, z: 1 };

    // Test that omitting the vector parameter still works
    const result = mtv(
      { x: 0, y: 0, z: 0 },
      unitCubeBB,
      { x: 0.7, y: 0.8, z: 0 },
      unitCubeBB,
    );

    // Should choose the smallest axis-aligned separation (y-axis with 0.2 overlap)
    expect(result.x).toBeCloseTo(0);
    expect(result.y).toBeCloseTo(-0.2);
    expect(result.z).toBeCloseTo(0);
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
});
