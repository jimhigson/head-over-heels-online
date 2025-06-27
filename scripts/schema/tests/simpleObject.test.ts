import { describe, it, expect } from "vitest";
import { flattenFixture } from "./testHelper.js";

describe("simpleObject", () => {
  it("should handle simple objects", { timeout: 20_000 }, async () => {
    const result = await flattenFixture("simpleObject", "Position");

    // Check the entire normalized output
    const expected = `{
  x: number;
  y: number;
}`;

    expect(result).toBe(expected);
  });
});
