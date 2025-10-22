import { describe, expect, test } from "vitest";

import {
  rotateInputVector45,
  rotateInputVector45InPlace,
} from "./analogueControlAdjustments";

describe("rotateInputVector45", () => {
  test("input vector is not mutated", () => {
    const input = { x: 3, y: 4, z: 0 };
    rotateInputVector45(input);
    expect(input).toEqual({ x: 3, y: 4, z: 0 });
  });
});

describe("rotateInputVector45InPlace", () => {
  test("input vector is mutated and returned", () => {
    const input = { x: 1, y: 0, z: 0 };
    const result = rotateInputVector45InPlace(input);
    expect(result).toBe(input);
    expect(input.x).toBeCloseTo(Math.SQRT1_2);
    expect(input.y).toBeCloseTo(-Math.SQRT1_2);
    expect(input.z).toBe(0);
  });

  test("produces same result as non-in-place version", () => {
    const vector = { x: 3, y: 4, z: 0 };
    const nonInPlace = rotateInputVector45(vector);
    const inPlace = rotateInputVector45InPlace({ ...vector });
    expect(inPlace.x).toBeCloseTo(nonInPlace.x);
    expect(inPlace.y).toBeCloseTo(nonInPlace.y);
    expect(inPlace.z).toBe(nonInPlace.z);
  });

  test("north rotated -45° clockwise gives north-west", () => {
    const input = { x: 0, y: -1, z: 0 };
    const result = rotateInputVector45InPlace(input);
    expect(result.x).toBeCloseTo(-Math.SQRT1_2);
    expect(result.y).toBeCloseTo(-Math.SQRT1_2);
    expect(result.z).toBe(0);
  });

  test("east rotated -45° clockwise gives north-east", () => {
    const input = { x: 1, y: 0, z: 0 };
    const result = rotateInputVector45InPlace(input);
    expect(result.x).toBeCloseTo(Math.SQRT1_2);
    expect(result.y).toBeCloseTo(-Math.SQRT1_2);
    expect(result.z).toBe(0);
  });

  test("south rotated -45° clockwise gives south-east", () => {
    const input = { x: 0, y: 1, z: 0 };
    const result = rotateInputVector45InPlace(input);
    expect(result.x).toBeCloseTo(Math.SQRT1_2);
    expect(result.y).toBeCloseTo(Math.SQRT1_2);
    expect(result.z).toBe(0);
  });

  test("west rotated -45° clockwise gives south-west", () => {
    const input = { x: -1, y: 0, z: 0 };
    const result = rotateInputVector45InPlace(input);
    expect(result.x).toBeCloseTo(-Math.SQRT1_2);
    expect(result.y).toBeCloseTo(Math.SQRT1_2);
    expect(result.z).toBe(0);
  });

  test("north-east rotated -45° clockwise gives north", () => {
    const input = {
      x: Math.SQRT1_2,
      y: -Math.SQRT1_2,
      z: 0,
    };
    const result = rotateInputVector45InPlace(input);
    expect(result.x).toBeCloseTo(0);
    expect(result.y).toBeCloseTo(-1);
    expect(result.z).toBe(0);
  });

  test("zero vector gives zero vector", () => {
    const input = { x: 0, y: 0, z: 0 };
    const result = rotateInputVector45InPlace(input);
    expect(result).toEqual({ x: 0, y: 0, z: 0 });
  });

  test("magnitude is preserved", () => {
    const input = { x: 3, y: 4, z: 0 };
    const originalMagnitude = Math.sqrt(3 * 3 + 4 * 4);
    const result = rotateInputVector45InPlace(input);
    const resultMagnitude = Math.sqrt(
      result.x * result.x + result.y * result.y,
    );
    expect(resultMagnitude).toBeCloseTo(originalMagnitude);
  });

  test("north rotated -45° clockwise gives north-west", () => {
    const result = rotateInputVector45({ x: 0, y: -1, z: 0 });
    expect(result.x).toBeCloseTo(-Math.SQRT1_2);
    expect(result.y).toBeCloseTo(-Math.SQRT1_2);
    expect(result.z).toBe(0);
  });

  test("east rotated -45° clockwise gives north-east", () => {
    const result = rotateInputVector45({ x: 1, y: 0, z: 0 });
    expect(result.x).toBeCloseTo(Math.SQRT1_2);
    expect(result.y).toBeCloseTo(-Math.SQRT1_2);
    expect(result.z).toBe(0);
  });

  test("south rotated -45° clockwise gives south-east", () => {
    const result = rotateInputVector45({ x: 0, y: 1, z: 0 });
    expect(result.x).toBeCloseTo(Math.SQRT1_2);
    expect(result.y).toBeCloseTo(Math.SQRT1_2);
    expect(result.z).toBe(0);
  });

  test("west rotated -45° clockwise gives south-west", () => {
    const result = rotateInputVector45({ x: -1, y: 0, z: 0 });
    expect(result.x).toBeCloseTo(-Math.SQRT1_2);
    expect(result.y).toBeCloseTo(Math.SQRT1_2);
    expect(result.z).toBe(0);
  });

  test("north-east rotated -45° clockwise gives north", () => {
    const result = rotateInputVector45({
      x: Math.SQRT1_2,
      y: -Math.SQRT1_2,
      z: 0,
    });
    expect(result.x).toBeCloseTo(0);
    expect(result.y).toBeCloseTo(-1);
    expect(result.z).toBe(0);
  });

  test("zero vector gives zero vector", () => {
    const result = rotateInputVector45({ x: 0, y: 0, z: 0 });
    expect(result).toEqual({ x: 0, y: 0, z: 0 });
  });

  test("magnitude is preserved", () => {
    const vector = { x: 3, y: 4, z: 0 };
    const originalMagnitude = Math.sqrt(3 * 3 + 4 * 4);
    const result = rotateInputVector45(vector);
    const resultMagnitude = Math.sqrt(
      result.x * result.x + result.y * result.y,
    );
    expect(resultMagnitude).toBeCloseTo(originalMagnitude);
  });

  test("z coordinate is always 0", () => {
    const result = rotateInputVector45({ x: 1, y: 1, z: 999 });
    expect(result.z).toBe(0);
  });
});
