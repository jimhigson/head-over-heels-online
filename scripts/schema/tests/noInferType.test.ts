import { describe, it, expect } from "vitest";
import { flattenFixture } from "./testHelper.js";

describe("noInferType", { timeout: 20_000 }, () => {
  it("should handle NoInfer wrapper types", { timeout: 20_000 }, async () => {
    expect(await flattenFixture("noInferType", "TestType")).toBe("string");
  });
});
