import { describe, it, expect } from "vitest";
import { flattenFixture } from "./testHelper.js";
import { timeout } from "./timeout.js";

describe("recordType", () => {
  it("should handle Record types", { timeout }, async () => {
    const result = await flattenFixture("recordType", "ItemMap");

    // With our fix, Record types now properly expand their nested object structure
    const expected = `Record<
  string,
  {
    name: string;
    value: number;
  }
>`;

    expect(result).toBe(expected);
  });
});
