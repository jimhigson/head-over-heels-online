import { describe, it, expect } from "vitest";
import { flattenFixture } from "./testHelper.js";

describe("intersectionType", { timeout: 20_000 }, () => {
  it("should handle intersection types", { timeout: 20_000 }, async () => {
    const result = await flattenFixture("intersectionType", "ExtendedConfig");
    expect(result).toContain("id: string");
    expect(result).toContain("name: string");
    expect(result).toContain("value: number");
  });
});
