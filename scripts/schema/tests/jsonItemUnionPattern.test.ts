import { describe, it, expect } from "vitest";
import { flattenFixture } from "./testHelper.js";

describe("jsonItemUnionPattern", { timeout: 20_000 }, () => {
  it("should handle json item union pattern", { timeout: 20_000 }, async () => {
    const result = await flattenFixture("jsonItemUnionPattern", "TestUnion");
    expect(result).toContain("|");
    expect(result).toContain('type: "door"');
    expect(result).toContain('type: "wall"');
    expect(result).toContain('type: "conveyor"');
    expect(result).toContain("toRoom: string");
    expect(result).toContain("tiles: string[]");
    expect(result).toContain("speed: number");
  });
});
