import { describe, it, expect } from "vitest";
import { flattenFixture } from "./testHelper.js";
import { timeout } from "./timeout.js";

describe("unresolvableType", () => {
  it("should handle unresolvable types", { timeout }, async () => {
    // Should not crash
    expect(() => flattenFixture("unresolvableType", "Test")).not.toThrow();
  });
});
