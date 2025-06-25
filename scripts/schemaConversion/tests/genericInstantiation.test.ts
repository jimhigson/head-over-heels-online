import { describe, it, expect } from "vitest";
import { flattenFixture } from "../testHelper.js";

describe("genericInstantiation", () => {
  it(
    "should handle generic type instantiations",
    { timeout: 20_000 },
    async () => {
      const result = await flattenFixture(
        "genericInstantiation",
        "StringContainer",
      );
      expect(result).toContain("value: string");
      expect(result).toContain("items: string[]");
    },
  );
});
