import { describe, expect, it } from "vitest";

import { flattenFixture } from "./testHelper.js";
import { timeout } from "./timeout.js";

describe("consolidatableIntersection", () => {
  it(
    "should handle consolidatable intersection pattern",
    { timeout },
    async () => {
      const result = await flattenFixture(
        "consolidatableIntersection",
        "TestConfig",
      );
      expect(result).toContain("times?:");
      expect(result).toContain("x?: number");
      expect(result).toContain("y?: number");
      expect(result).toContain("z?: number");
      expect(result).toContain('direction: "down" | "left" | "right" | "up"');
    },
  );
});
