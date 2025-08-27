import { describe, expect, it } from "vitest";

import { flattenFixture } from "./testHelper.js";
import { timeout } from "./timeout.js";

describe("primitiveTypes", () => {
  it("should handle primitive types", { timeout }, async () => {
    expect(await flattenFixture("primitiveTypes", "TestString")).toBe("string");
    expect(await flattenFixture("primitiveTypes", "TestNumber")).toBe("number");
    expect(await flattenFixture("primitiveTypes", "TestBoolean")).toBe(
      "boolean",
    );
  });
});
