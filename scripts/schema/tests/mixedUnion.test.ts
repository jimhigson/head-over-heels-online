import { describe, expect, it } from "vitest";

import { flattenFixture } from "./testHelper.js";
import { timeout } from "./timeout.js";

describe("mixedUnion", () => {
  it("should handle mixed unions", { timeout }, async () => {
    const result = await flattenFixture("mixedUnion", "MixedUnion");
    // Check that all three types are present, regardless of order
    expect(result).toContain("string");
    expect(result).toContain("number");
    expect(result).toContain("undefined");
    expect(result.split(" | ").length).toBe(3);
  });
});
