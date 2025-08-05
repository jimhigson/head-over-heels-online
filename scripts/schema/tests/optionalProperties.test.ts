import { describe, it, expect } from "vitest";
import { flattenFixture } from "./testHelper.js";
import { timeout } from "./timeout.js";

describe("optionalProperties", () => {
  it(
    "should handle objects with optional properties",
    { timeout },
    async () => {
      const result = await flattenFixture("optionalProperties", "Config");

      // Check the entire normalized output
      // Note: TypeScript may expand boolean to "false | true" in some cases
      const expected = `{
  name: string;
  value?: number;
  description?: string;
  enabled?: false | true;
}`;

      expect(result).toBe(expected);
    },
  );
});
