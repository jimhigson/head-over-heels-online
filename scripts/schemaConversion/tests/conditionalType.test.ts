import { describe, it, expect } from "vitest";
import { flattenFixture } from "../testHelper.js";

describe("conditionalType", { timeout: 20_000 }, () => {
  it("should handle conditional types", { timeout: 20_000 }, async () => {
    expect(await flattenFixture("conditionalType", "Test")).toBe("true");
  });
});
