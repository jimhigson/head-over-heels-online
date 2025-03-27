import { describe, expect, test } from "vitest";
import {
  addXyz,
  vectorClosestDirectionXy4,
  vectorClosestDirectionXy8,
  xyzSnapIfCloseToIntegers,
} from "./vectors";

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
    [{ x: 1, y: 0 }, "left"],
    [{ x: 1, y: 1 }, "awayLeft"],
    [{ x: 0, y: 1 }, "away"],
    [{ x: -1, y: 1 }, "awayRight"],

    // not quite a limit:
    [{ x: -0.7, y: 0 }, "right"],
    [{ x: -0.7, y: -0.7 }, "towardsRight"],
    [{ x: 0, y: -0.7 }, "towards"],
    [{ x: 0.7, y: -0.7 }, "towardsLeft"],
    [{ x: 0.7, y: 0 }, "left"],
    [{ x: 0.7, y: 0 }, "left"],
    [{ x: 0.7, y: 0.7 }, "awayLeft"],
    [{ x: 0, y: 0.7 }, "away"],
    [{ x: -0.7, y: 0.7 }, "awayRight"],

    // smaller signal
    [{ x: -0.1, y: 0 }, "right"],
    [{ x: -0.1, y: -0.1 }, "towardsRight"],
    [{ x: 0, y: -0.1 }, "towards"],
    [{ x: 0.1, y: -0.1 }, "towardsLeft"],
    [{ x: 0.1, y: 0 }, "left"],
    [{ x: 0.1, y: 0 }, "left"],
    [{ x: 0.1, y: 0.1 }, "awayLeft"],
    [{ x: 0, y: 0.1 }, "away"],
    [{ x: -0.1, y: 0.1 }, "awayRight"],

    [{ x: 0, y: 0 }, undefined],
    // eg: floating point errors:
    [{ x: 10e-7, y: 10e-7 }, undefined],
    [{ x: -10e-7, y: -10e-7 }, undefined],
  ] satisfies Array<
    [
      Parameters<typeof vectorClosestDirectionXy8>[0],
      ReturnType<typeof vectorClosestDirectionXy8>,
    ]
  >)("given input %o, returns %s", (input, expected) => {
    expect(vectorClosestDirectionXy8(input)).toBe(expected);
  });
});

describe("vectorClosestDirectionXy4", () => {
  test.each([
    [{ x: -1, y: 0 }, "right"],
    [{ x: 1, y: 0 }, "left"],
    [{ x: 1, y: 0 }, "left"],
    [{ x: 0, y: 1 }, "away"],

    // strong signal in a secondary direction:
    [{ x: -1, y: 0.8 }, "right"],
    [{ x: 1, y: 0.8 }, "left"],
    [{ x: 0.8, y: 1 }, "away"],
    [{ x: 0.8, y: -1 }, "towards"],

    // not quite a limit:
    [{ x: -0.7, y: 0 }, "right"],
    [{ x: 0, y: -0.7 }, "towards"],
    [{ x: 0.7, y: 0 }, "left"],
    [{ x: 0.7, y: 0 }, "left"],
    [{ x: 0, y: 0.7 }, "away"],

    // smaller signal
    [{ x: -0.1, y: 0 }, "right"],
    [{ x: 0, y: -0.1 }, "towards"],
    [{ x: 0.1, y: 0 }, "left"],
    [{ x: 0, y: 0.1 }, "away"],

    [{ x: 0, y: 0 }, undefined],
    // eg: floating point errors:
    [{ x: 0.0000001, y: 0.0000001 }, undefined],
    [{ x: -0.0000001, y: -0.0000001 }, undefined],
  ] satisfies Array<
    [
      Parameters<typeof vectorClosestDirectionXy4>[0],
      ReturnType<typeof vectorClosestDirectionXy4>,
    ]
  >)("given input %o, returns %s", (input, expected) => {
    expect(vectorClosestDirectionXy4(input)).toBe(expected);
  });
});

describe("xyzSnapIfCloseToIntegers", () => {
  test("does not snap if not very close", () => {
    const input = { x: 0, y: 59.835000000000036, z: 0 };
    const result = xyzSnapIfCloseToIntegers(input);
    expect(result).toEqual(input);
  });

  test("can snap one ordinal and not the others", () => {
    const input = { x: 0.000001, y: 59.835000000000036, z: 0 };
    const result = xyzSnapIfCloseToIntegers(input);
    expect(result).toEqual({ x: 0, y: 59.835000000000036, z: 0 });
  });
});
