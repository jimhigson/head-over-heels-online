import { describe, it, expect } from "vitest";
import { flattenFixture } from "../testHelper.js";

describe("circularReference", () => {
  it(
    "should handle circular references gracefully",
    { timeout: 20_000 },
    async () => {
      const result = await flattenFixture("circularReference", "Node");
      expect(result).toContain("value: string");
      expect(result).toContain("children:");
    },
  );
});
