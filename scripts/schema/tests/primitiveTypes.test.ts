import { describe, it, expect } from "vitest";
import { flattenFixture } from "./testHelper.js";

describe("primitiveTypes", () => {
  it("should handle primitive types", { timeout: 20_000 }, async () => {
    expect(await flattenFixture("primitiveTypes", "TestString")).toBe("string");
    expect(await flattenFixture("primitiveTypes", "TestNumber")).toBe("number");
    expect(await flattenFixture("primitiveTypes", "TestBoolean")).toBe(
      "boolean",
    );
  });
});
