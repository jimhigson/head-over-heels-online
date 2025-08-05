import { describe, it, expect } from "vitest";
import { flattenFixture } from "./testHelper.js";
import { timeout } from "./timeout.js";

describe("conveyorIntersection", () => {
  it("should handle conveyor intersection pattern", { timeout }, async () => {
    const result = await flattenFixture(
      "conveyorIntersection",
      "ConveyorConfig",
    );
    expect(result).toContain("times?:");
    expect(result).toContain("direction:");
    expect(result).toContain('"left" | "right" | "up" | "down"');
    expect(result).toContain("disappearing?:");
    expect(result).toContain("on:");
    expect(result).toContain('"stand"');
  });
});
