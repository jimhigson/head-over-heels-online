import { describe, expect, test } from "vitest";
import { addXyz, vectorClosestDirectionXy8 } from "./vectors";

describe("addXyz", () => {
  test("addXyz should add two vectors correctly", () => {
    const vector1 = { x: 1, y: 2, z: 3 };
    const vector2 = { x: 4, y: 5, z: 6 };
    const result = addXyz(vector1, vector2);
    expect(result).toEqual({ x: 5, y: 7, z: 9 });
  });

  test("addXyz should handle partial vectors", () => {
    const vector1 = { x: 1, y: 2, z: 3 };
    const vector2 = { x: 4 };
    const result = addXyz(vector1, vector2);
    expect(result).toEqual({ x: 5, y: 2, z: 3 });
  });

  test("addXyz should handle multiple vectors", () => {
    const vector1 = { x: 1, y: 2, z: 3 };
    const vector2 = { x: 4, y: 5, z: 6 };
    const vector3 = { x: 7, y: 8, z: 9 };
    const result = addXyz(vector1, vector2, vector3);
    expect(result).toEqual({ x: 12, y: 15, z: 18 });
  });

  test("addXyz should handle empty input", () => {
    const result = addXyz();
    expect(result).toEqual({ x: 0, y: 0, z: 0 });
  });

  test("addXyz should handle single vector input", () => {
    const vector = { x: 1, y: 2, z: 3 };
    const result = addXyz(vector);
    expect(result).toEqual(vector);
  });

  test("addXyz should handle single partial vector input", () => {
    const vector = { x: 1 };
    const result = addXyz(vector);
    expect(result).toEqual({ x: 1, y: 0, z: 0 });
  });
});

describe("vectorClosestDirectionXy8", () => {
  test.each([
    [{ x: -1, y: 0 }, "right"],
    [{ x: -1, y: -1 }, "towardsRight"],
    [{ x: 0, y: -1 }, "towards"],
    [{ x: 1, y: -1 }, "towardsLeft"],
    [{ x: 1, y: 0 }, "left"],
    [{ x: 1, y: 1 }, "awayLeft"],
    [{ x: 0, y: 1 }, "away"],
    [{ x: -1, y: 1 }, "awayRight"],
    [{ x: -0.707, y: -0.707 }, "towardsRight"], // Close to 45 degrees
    [{ x: 0.707, y: -0.707 }, "towardsLeft"], // Close to 135 degrees
    [{ x: 0.707, y: 0.707 }, "awayLeft"], // Close to 225 degrees
    [{ x: -0.707, y: 0.707 }, "awayRight"], // Close to 315 degrees
  ])("given input %o, returns %s", (input, expected) => {
    expect(vectorClosestDirectionXy8(input)).toBe(expected);
  });
});
