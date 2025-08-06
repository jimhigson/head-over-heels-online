import { describe, it, expect } from "vitest";
import { flattenFixture } from "./testHelper.js";
import { timeout } from "./timeout.js";

describe("conditionalType", { timeout }, () => {
  it("should handle conditional types", { timeout }, async () => {
    expect(await flattenFixture("conditionalType", "Test")).toBe("true");
  });
});
