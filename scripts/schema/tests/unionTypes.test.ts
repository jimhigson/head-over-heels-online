import { describe, it, expect } from "vitest";
import { flattenFixture } from "./testHelper.js";

describe("unionTypes", () => {
  it("should handle literal unions", { timeout: 20_000 }, async () => {
    expect(await flattenFixture("unionTypes", "Direction")).toBe(
      '"left" | "right" | "up" | "down"',
    );
  });
});
