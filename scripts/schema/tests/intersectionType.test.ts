import { describe, expect, it } from "vitest";

import { flattenFixture } from "./testHelper.js";
import { timeout } from "./timeout.js";

describe("intersectionType", { timeout }, () => {
  it("should handle intersection types", { timeout }, async () => {
    const result = await flattenFixture("intersectionType", "ExtendedConfig");
    expect(result).toContain("id: string");
    expect(result).toContain("name: string");
    expect(result).toContain("value: number");
  });
});
