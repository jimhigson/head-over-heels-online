import { describe, it, expect } from "vitest";
import { flattenFixture } from "./testHelper.js";
import { timeout } from "./timeout.js";

describe("complexGenerics", () => {
  it(
    "should handle type aliases with complex generics",
    { timeout },
    async () => {
      const result = await flattenFixture("complexGenerics", "MyConfig");
      // TypeScript may simplify generic Record types when the type argument is too broad
      // In this case, ConfigMap<string> with string as the generic parameter
      // may result in Record<string, any> due to type erasure
      expect(result).toBe("Record<string, any>");
    },
  );
});
