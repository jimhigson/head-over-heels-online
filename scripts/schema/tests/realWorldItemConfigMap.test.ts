import { describe, it, expect } from "vitest";
import { flattenFixture } from "./testHelper.js";

describe("realWorldItemConfigMap", { timeout: 20_000 }, () => {
  it(
    "should handle real world item config map",
    { timeout: 20_000 },
    async () => {
      // Test the TestUnion type which is the union of all item types
      const result = await flattenFixture(
        "realWorldItemConfigMap",
        "TestUnion",
      );

      // The union should contain multiple object types with door, conveyor, etc.
      expect(result).toContain("type:");
      expect(result).toContain("position:");
      expect(result).toContain("config:");

      // Since it's a union, it should have multiple alternatives separated by |
      // The regex needs to handle newlines and nested objects
      expect(result).toContain(" | ");
    },
  );
});
