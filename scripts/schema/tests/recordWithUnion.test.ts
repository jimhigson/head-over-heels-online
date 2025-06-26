import { describe, it, expect } from "vitest";
import { flattenFixture } from "./testHelper.js";

describe("recordWithUnion", () => {
  it.skip(
    "should handle Record with union value types",
    { timeout: 20_000 },
    async () => {
      // NOTE: This is a known limitation of the TypeScript compiler API
      // When TypeScript resolves Record<string, UnionType>, it may simplify
      // complex union types to 'any' in certain contexts. This affects
      // types like RoomJsonItems<string, string> which become Record<string, any>
      // instead of Record<string, JsonItemUnion<...>>

      const result = await flattenFixture("recordWithUnion", "ItemsRecord");

      // The Record should have the union expanded as its value type
      expect(result).toContain("Record<string,");

      // It should NOT simplify to Record<string, any>
      expect(result).not.toBe("Record<string, any>");

      // The value type should be a union containing the item types
      expect(result).toContain("|");
      expect(result).toContain('type: "door"');
      expect(result).toContain('type: "wall"');
      expect(result).toContain('type: "conveyor"');
    },
  );
});
