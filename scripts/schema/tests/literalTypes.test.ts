import { describe, it, expect } from "vitest";
import { flattenFixture } from "./testHelper.js";

describe("literalTypes", { timeout: 20_000 }, () => {
  it("should handle literal types", { timeout: 20_000 }, async () => {
    expect(await flattenFixture("literalTypes", "TestStringLiteral")).toBe(
      '"hello"',
    );
    expect(await flattenFixture("literalTypes", "TestNumberLiteral")).toBe(
      "42",
    );
    expect(await flattenFixture("literalTypes", "TestBooleanLiteral")).toBe(
      "true",
    );
  });
});
