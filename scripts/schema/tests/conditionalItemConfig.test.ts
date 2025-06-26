import { describe, it, expect } from "vitest";
import { flattenFixture } from "./testHelper.js";

describe("conditionalItemConfig", () => {
  it(
    "should handle conditional item config pattern",
    { timeout: 20_000 },
    async () => {
      const doorResult = await flattenFixture(
        "conditionalItemConfig",
        "DoorConfig",
      );
      expect(doorResult).toContain("toRoom: string");
      expect(doorResult).toContain("direction: string");

      const conveyorResult = await flattenFixture(
        "conditionalItemConfig",
        "ConveyorConfig",
      );
      expect(conveyorResult).toContain("direction: string");
      expect(conveyorResult).toContain("speed?: number");

      const unknownResult = await flattenFixture(
        "conditionalItemConfig",
        "UnknownConfig",
      );
      // EmptyObject types resolve to Record<string, any> which is fine for JSON schema
      expect(unknownResult).toBe("Record<string, any>");
    },
  );
});
