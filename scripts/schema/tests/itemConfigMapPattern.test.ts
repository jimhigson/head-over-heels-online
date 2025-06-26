import { describe, it, expect } from "vitest";
import { flattenFixture } from "./testHelper.js";

describe("itemConfigMapPattern", { timeout: 20_000 }, () => {
  it("should handle item config map pattern", { timeout: 20_000 }, async () => {
    const doorResult = await flattenFixture(
      "itemConfigMapPattern",
      "DoorConfig",
    );
    expect(doorResult).toContain("toRoom: string");
    expect(doorResult).toContain("direction:");
    expect(doorResult).toContain('"left" | "right" | "up" | "down"');

    const wallResult = await flattenFixture(
      "itemConfigMapPattern",
      "WallConfig",
    );
    expect(wallResult).toContain("direction:");
    expect(wallResult).toContain("tiles?: string[]");

    const blockResult = await flattenFixture(
      "itemConfigMapPattern",
      "BlockConfig",
    );
    // EmptyObject from type-fest resolves to Record<string, any> in our flattener
    expect(blockResult).toBe("Record<string, any>");
  });
});
