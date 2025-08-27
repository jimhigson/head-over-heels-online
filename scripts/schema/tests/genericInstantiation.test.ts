import { describe, expect, it } from "vitest";

import { flattenFixture } from "./testHelper.js";
import { timeout } from "./timeout.js";

describe("genericInstantiation", () => {
  it("should handle generic type instantiations", { timeout }, async () => {
    const result = await flattenFixture(
      "genericInstantiation",
      "StringContainer",
    );
    expect(result).toContain("value: string");
    expect(result).toContain("items: string[]");
  });
});
