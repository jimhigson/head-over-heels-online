import { describe, it, expect } from "vitest";
import { flattenFixture } from "./testHelper.js";
import { timeout } from "./timeout.js";

describe("unionTypes", () => {
  it("should handle literal unions", { timeout }, async () => {
    expect(await flattenFixture("unionTypes", "Direction")).toBe(
      '"left" | "right" | "up" | "down"',
    );
  });
});
