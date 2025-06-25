import { describe, it, expect } from "vitest";
import { flattenFixture } from "../testHelper.js";

describe("unresolvableType", () => {
  it("should handle unresolvable types", { timeout: 20_000 }, async () => {
    // Should not crash
    expect(() => flattenFixture("unresolvableType", "Test")).not.toThrow();
  });
});
