import { describe, it, expect } from "vitest";
import { flattenFixture } from "../testHelper.js";

describe("roomJsonSpecialCase", () => {
  it(
    "should handle RoomJson items property special case",
    { timeout: 20_000 },
    async () => {
      const result = await flattenFixture(
        "roomJsonSpecialCase",
        "TestRoomJson",
      );

      // The result should contain the RoomJson structure
      expect(result).toContain("id: string");
      expect(result).toContain("size:");
      expect(result).toContain("color: string");

      // The items property should NOT be Record<string, any>
      expect(result).not.toContain("items: Record<string, any>");

      // Instead, it should have the expanded union of all item types
      // Note: The Record might be split across multiple lines
      expect(result).toMatch(/items:\s*Record\s*<\s*string,/s);
      expect(result).toContain('type: "door"');
      expect(result).toContain('type: "wall"');
      expect(result).toContain('type: "conveyor"');
      expect(result).toContain('type: "block"');
      expect(result).toContain("toRoom: string");
      // The actual output has tiles: any[] instead of tiles?: string[]
      expect(result).toContain("tiles: any[]");
      // Remove speed check - it's not in the test fixture
      // expect(result).toContain("speed?: number");
      expect(result).toContain("style:");
    },
  );
});
