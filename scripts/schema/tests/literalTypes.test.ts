import { describe, it, expect } from "vitest";
import { flattenFixture } from "./testHelper.js";
import { timeout } from "./timeout.js";

describe("literalTypes", { timeout }, () => {
  it("should handle literal types", { timeout }, async () => {
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
