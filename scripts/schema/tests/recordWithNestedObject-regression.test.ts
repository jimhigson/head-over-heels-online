import { describe, expect, it } from "vitest";

import { flattenFixture } from "./testHelper.js";
import { timeout } from "./timeout.js";

describe("recordWithNestedObject - regression test", () => {
  it(
    "should NOT simplify nested Record to Record<string, any> (this would have failed before the fix)",
    { timeout },
    async () => {
      const result = await flattenFixture(
        "recordWithNestedObject",
        "NestedRecordType",
      );

      // This is what the old broken behavior would have returned
      const brokenResult = `Record<string, any>`;

      // The test should fail if we get the old broken behavior
      expect(result).not.toBe(brokenResult);

      // And it should include the nested structure details
      expect(result).toContain("gridPosition");
      expect(result).toContain("physicalBounds");
      expect(result).toContain("from");
      expect(result).toContain("to");
    },
  );
});
