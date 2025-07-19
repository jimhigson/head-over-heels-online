import { describe, it, expect } from "vitest";
import { flattenFixture } from "./testHelper.js";

describe("genericConstraints", () => {
  it(
    "should handle generic constraints pattern",
    { timeout: 20_000 },
    async () => {
      const doorResult = await flattenFixture(
        "genericConstraints",
        "DoorConfig",
      );
      expect(doorResult).toContain("toRoom:");
      expect(doorResult).toContain('"room1" | "room2"');
      expect(doorResult).toContain("direction: string");

      const switchResult = await flattenFixture(
        "genericConstraints",
        "SwitchConfig",
      );
      expect(switchResult).toContain("controls:");
      expect(switchResult).toContain('("item1" | "item2")[]');
      expect(switchResult).toContain('type: "local" | "global"');
    },
  );
});
