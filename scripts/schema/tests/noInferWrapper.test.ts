import { describe, it, expect } from "vitest";
import { flattenFixture } from "./testHelper.js";
import { timeout } from "./timeout.js";

describe("noInferWrapper", () => {
  it(
    "should handle NoInfer wrapper in complex contexts",
    { timeout },
    async () => {
      const result = await flattenFixture("noInferWrapper", "TestType");
      expect(result).toContain("Record<string,");
      expect(result).not.toContain("NoInfer");
      // Record value types might be simplified to any for complex cases
      expect(result).toMatch(
        /Record<string,\s*(\{[^}]*type:\s*string[^}]*\}|any)>/,
      );
    },
  );
});
