import { describe, it, expect } from "vitest";
import { flattenFixture } from "./testHelper.js";
import { timeout } from "./timeout.js";

describe("itemConfigMapPattern", { timeout }, () => {
  it("should handle item config map pattern", { timeout }, async () => {
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
