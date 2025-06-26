import { describe, it, expect } from "vitest";
import { flattenFixture } from "./testHelper.js";

describe("mappedType", () => {
  it("should handle mapped types", { timeout: 20_000 }, async () => {
    const result = await flattenFixture("mappedType", "ItemUnion");
    expect(result).toContain("|");
    expect(result).toContain('type: "door"');
    expect(result).toContain('type: "wall"');
    expect(result).toContain('type: "floor"');
  });
});
