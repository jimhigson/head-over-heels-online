import { describe, expect, it } from "vitest";

import { flattenFixture } from "./testHelper.js";
import { timeout } from "./timeout.js";

describe("jsonItemUnionPattern", { timeout }, () => {
  it("should handle json item union pattern", { timeout }, async () => {
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
