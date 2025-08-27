import { describe, expect, it } from "vitest";

import { flattenFixture } from "./testHelper.js";
import { timeout } from "./timeout.js";

describe("unionTypes", () => {
  it("should handle literal unions", { timeout }, async () => {
    expect(await flattenFixture("unionTypes", "Direction")).toBe(
      '"down" | "left" | "right" | "up"',
    );
  });
});
