import { describe, it, expect } from "vitest";
import { flattenFixture } from "../testHelper.js";

describe("consolidatableIntersection", () => {
  it(
    "should handle consolidatable intersection pattern",
    { timeout: 20_000 },
    async () => {
      const result = await flattenFixture(
        "consolidatableIntersection",
        "TestConfig",
      );
      expect(result).toContain("times?:");
      expect(result).toContain("x?: number");
      expect(result).toContain("y?: number");
      expect(result).toContain("z?: number");
      expect(result).toContain('direction: "left" | "right" | "up" | "down"');
    },
  );
});
