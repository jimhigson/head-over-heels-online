import { describe, it, expect } from "vitest";
import { flattenFixture } from "./testHelper.js";
import { timeout } from "./timeout.js";

describe("simpleObject", () => {
  it("should handle simple objects", { timeout }, async () => {
    const result = await flattenFixture("simpleObject", "Position");

    // Check the entire normalized output
    const expected = `{
  x: number;
  y: number;
}`;

    expect(result).toBe(expected);
  });
});
