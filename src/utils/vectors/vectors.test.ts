import { describe, it, expect } from "vitest";
import { addXyz } from "./vectors";

describe("addXyz", () => {
  it("addXyz should add two vectors correctly", () => {
    const vector1 = { x: 1, y: 2, z: 3 };
    const vector2 = { x: 4, y: 5, z: 6 };
    const result = addXyz(vector1, vector2);
    expect(result).toEqual({ x: 5, y: 7, z: 9 });
  });

  it("addXyz should handle partial vectors", () => {
    const vector1 = { x: 1, y: 2, z: 3 };
    const vector2 = { x: 4 };
    const result = addXyz(vector1, vector2);
    expect(result).toEqual({ x: 5, y: 2, z: 3 });
  });

  it("addXyz should handle multiple vectors", () => {
    const vector1 = { x: 1, y: 2, z: 3 };
    const vector2 = { x: 4, y: 5, z: 6 };
    const vector3 = { x: 7, y: 8, z: 9 };
    const result = addXyz(vector1, vector2, vector3);
    expect(result).toEqual({ x: 12, y: 15, z: 18 });
  });

  it("addXyz should handle empty input", () => {
    const result = addXyz();
    expect(result).toEqual({ x: 0, y: 0, z: 0 });
  });

  it("addXyz should handle single vector input", () => {
    const vector = { x: 1, y: 2, z: 3 };
    const result = addXyz(vector);
    expect(result).toEqual(vector);
  });

  it("addXyz should handle single partial vector input", () => {
    const vector = { x: 1 };
    const result = addXyz(vector);
    expect(result).toEqual({ x: 1, y: 0, z: 0 });
  });
});
