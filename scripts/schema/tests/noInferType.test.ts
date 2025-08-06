import { describe, it, expect } from "vitest";
import { flattenFixture } from "./testHelper.js";
import { timeout } from "./timeout.js";

describe("noInferType", { timeout }, () => {
  it("should handle NoInfer wrapper types", { timeout }, async () => {
    expect(await flattenFixture("noInferType", "TestType")).toBe("string");
  });
});
