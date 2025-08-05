import { describe, it, expect } from "vitest";
import { flattenFixture } from "./testHelper.js";
import { timeout } from "./timeout.js";

describe("customArrayTypes", () => {
  it("should handle arrays with custom types", { timeout }, async () => {
    expect(await flattenFixture("customArrayTypes", "ItemIdArray")).toBe(
      "string[]",
    );
  });
});
