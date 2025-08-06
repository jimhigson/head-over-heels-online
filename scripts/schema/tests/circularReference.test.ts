import { describe, it, expect } from "vitest";
import { flattenFixture } from "./testHelper.js";
import { timeout } from "./timeout.js";

describe("circularReference", () => {
  it("should handle circular references gracefully", { timeout }, async () => {
    const result = await flattenFixture("circularReference", "Node");
    expect(result).toContain("value: string");
    expect(result).toContain("children:");
  });
});
