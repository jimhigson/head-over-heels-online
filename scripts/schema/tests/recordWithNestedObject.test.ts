import { describe, expect, it } from "vitest";

import { flattenFixture } from "./testHelper.js";
import { timeout } from "./timeout.js";

describe("recordWithNestedObject", () => {
  it(
    "should properly expand Record types with nested object values",
    { timeout },
    async () => {
      const result = await flattenFixture(
        "recordWithNestedObject",
        "NestedRecordType",
      );

      // Before the fix, this would have returned: Record<string, any>
      // After the fix, it should properly expand the nested structure
      const expected = `Record<
  string,
  {
    /**
     * the position in the grid
     */
    gridPosition: {
      x: number;
      y: number;
    };
    /**
     * physical bounds of the area
     */
    physicalBounds: {
      from: {
        x: number;
        y: number;
      };
      to: {
        x: number;
        y: number;
      };
    };
  }
>`;

      expect(result).toBe(expected);
    },
  );

  it(
    "should handle inline nested Record definitions",
    { timeout },
    async () => {
      const result = await flattenFixture(
        "recordWithNestedObject",
        "InlineNestedRecord",
      );

      const expected = `Record<
  string,
  {
    /**
     * primary location
     */
    location: {
      x: number;
      y: number;
    };
    /**
     * metadata about the item
     */
    metadata: {
      name: string;
      tags: string[];
      config: {
        enabled: boolean;
        value: number;
      };
    };
  }
>`;

      expect(result).toBe(expected);
    },
  );
});
