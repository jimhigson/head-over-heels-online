import { describe, it, expect } from "vitest";
import { flattenFixture } from "./testHelper.js";
import { timeout } from "./timeout.js";

describe("arrayTypes", () => {
  it("should handle simple arrays", { timeout }, async () => {
    expect(await flattenFixture("arrayTypes", "StringArray")).toBe("string[]");
    expect(await flattenFixture("arrayTypes", "NumberArray")).toBe("number[]");
  });
});
