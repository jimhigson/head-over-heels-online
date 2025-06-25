import { describe, it, expect } from "vitest";
import { flattenFixture } from "../testHelper.js";

describe("arrayTypes", () => {
  it("should handle simple arrays", { timeout: 20_000 }, async () => {
    expect(await flattenFixture("arrayTypes", "StringArray")).toBe("string[]");
    expect(await flattenFixture("arrayTypes", "NumberArray")).toBe("number[]");
  });
});
