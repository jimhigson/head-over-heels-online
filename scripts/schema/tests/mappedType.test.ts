import { describe, expect, it } from "vitest";

import { flattenFixture } from "./testHelper.js";
import { timeout } from "./timeout.js";

describe("mappedType", () => {
  it("should handle mapped types", { timeout }, async () => {
    const result = await flattenFixture("mappedType", "ItemUnion");
    expect(result).toContain("|");
    expect(result).toContain('type: "door"');
    expect(result).toContain('type: "wall"');
    expect(result).toContain('type: "floor"');
  });
});
