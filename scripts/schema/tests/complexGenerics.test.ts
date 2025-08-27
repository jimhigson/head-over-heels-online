import { describe, expect, it } from "vitest";

import { flattenFixture } from "./testHelper.js";
import { timeout } from "./timeout.js";

describe("complexGenerics", () => {
  it(
    "should handle type aliases with complex generics",
    { timeout },
    async () => {
      const result = await flattenFixture("complexGenerics", "MyConfig");
      // With our fix, Record types now properly expand their nested object structure
      // instead of being simplified to Record<string, any>
      const expected = `Record<
  string,
  {
    type: string;
    config: any;
  }
>`;
      expect(result).toBe(expected);
    },
  );
});
