import { describe, it, expect } from "vitest";
import { flattenFixture } from "./testHelper.js";
import { timeout } from "./timeout.js";

describe("noInferWrapper", () => {
  it(
    "should handle NoInfer wrapper in complex contexts",
    { timeout },
    async () => {
      const result = await flattenFixture("noInferWrapper", "TestType");
      // With our fix, Record types now properly expand their nested object structure
      const expected = `Record<
  string,
  {
    type: string;
    config: any;
  }
>`;
      expect(result).toBe(expected);
      // Verify NoInfer was properly unwrapped
      expect(result).not.toContain("NoInfer");
    },
  );
});
