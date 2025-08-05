import { describe, it, expect } from "vitest";
import { flattenFixture } from "./testHelper.js";
import { timeout } from "./timeout.js";

describe("recordType", () => {
  it("should handle Record types", { timeout }, async () => {
    const result = await flattenFixture("recordType", "ItemMap");

    // Check the entire normalized output
    // Note: Record types might not always be expanded
    const expected = `Record<string, any>`;

    expect(result).toBe(expected);
  });
});
