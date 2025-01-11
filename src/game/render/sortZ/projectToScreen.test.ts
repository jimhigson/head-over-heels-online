import { describe, expect, test } from "vitest";
import { projectWorldXyzToScreenXy } from "../projectToScreen";

describe("projectWorldXyzToScreenXy", () => {
  test("projects floats to floats", () => {
    expect(projectWorldXyzToScreenXy({ x: 0.25, y: 0.25, z: 0 }))
      .toMatchInlineSnapshot(`
      {
        "x": 0,
        "y": -0.25,
      }
    `);
  });
  test("projects integers (no rounding required to integers)", () => {
    expect(projectWorldXyzToScreenXy({ x: 1, y: 1, z: 0 })).toEqual({
      x: 0,
      // -(x + y)/2 =
      // -(1 + 1)/2 =
      // -1
      y: -1,
    });
  });
  test("projects almost-integers integers (only slight rounding-down required to integers)", () => {
    expect(projectWorldXyzToScreenXy({ x: 1, y: 1.000_001, z: 0 })).toEqual({
      x: 0,
      // -(x + y)/2 =
      // -(1 + 1)/2 =
      // -1 + ε
      y: -1,
    });
  });
  test("projects almost-integers integers (only slight rounding-up required to integers)", () => {
    expect(projectWorldXyzToScreenXy({ x: 1, y: 0.999_999, z: 0 })).toEqual({
      x: 0,
      // -(x + y)/2 =
      // -(1 + 1)/2 =
      // -1 + ε
      y: -1,
    });
  });
  test("projects integers rounding down", () => {
    expect(projectWorldXyzToScreenXy({ x: 1, y: 2, z: 0 })).toEqual({
      // y-x = 2-1 = 1
      x: 1,
      // -(x + y)/2 =
      // -(1 + 2)/2 =
      // -1.5 =
      // rounded down to -2
      y: -2,
    });
  });

  test("projects almost integers (slightly more) rounding down", () => {
    expect(projectWorldXyzToScreenXy({ x: 1, y: 2.000_001, z: 0 })).toEqual({
      // y-x = 2-1 = 1
      x: 1,
      // -(x + y)/2 =
      // -(1 + 2+ε)/2 =
      // -1.500_0001 = (1.5 + ε) =
      // (still) rounded down to -2
      y: -2,
    });
  });

  test("projects almost integers rounding down", () => {
    expect(projectWorldXyzToScreenXy({ x: 1, y: 1.999_999, z: 0 })).toEqual({
      // y-x = 2-1 = 1
      x: 1,
      // -(x + y)/2 =
      // -(1 + 2+ε)/2 =
      // -1.499_999 = (1.5 - ε) =
      // (still) rounded down to -2
      y: -2,
    });
  });
});
