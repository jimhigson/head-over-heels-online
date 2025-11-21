import { describe, expect, test } from "vitest";

import { rotatingSceneryTiles } from "./rotatingSceneryTiles";

describe("rotatingSceneryTiles", () => {
  describe("blacktooth scenery", () => {
    // The blacktooth pattern is: ["plain", "plain", "armour", "shield", "shield", "armour"]

    test("returns correct number of tiles", () => {
      const tiles = [...rotatingSceneryTiles("blacktooth", 3)];

      expect(tiles).toHaveLength(3);
    });

    test("returns tiles in correct order from start", () => {
      const tiles = [...rotatingSceneryTiles("blacktooth", 6)];

      expect(tiles).toEqual([
        "plain",
        "plain",
        "armour",
        "shield",
        "shield",
        "armour",
      ]);
    });

    test("cycles through pattern when requesting more tiles than pattern length", () => {
      const tiles = [...rotatingSceneryTiles("blacktooth", 10)];

      expect(tiles).toEqual([
        "plain",
        "plain",
        "armour",
        "shield",
        "shield",
        "armour",
        "plain", // cycle starts again
        "plain",
        "armour",
        "shield",
      ]);
    });

    test("starts at correct ordinal position", () => {
      const tiles = [...rotatingSceneryTiles("blacktooth", 4, 2)];

      // Starting at index 2 (zero-based), so starts with "armour"

      expect(tiles).toEqual(["armour", "shield", "shield", "armour"]);
    });

    test("wraps around when starting ordinal is beyond pattern length", () => {
      // Pattern length is 6, starting at position 7 should wrap to position 1
      const tiles = [...rotatingSceneryTiles("blacktooth", 3, 7)];

      expect(tiles).toEqual([
        "plain", // position 7 % 6 = 1
        "armour",
        "shield",
      ]);
    });

    test("handles large number of tiles", () => {
      const tiles = [...rotatingSceneryTiles("blacktooth", 64)];

      expect(tiles).toHaveLength(64);
      // Check it's cycling correctly by verifying a few positions
      expect(tiles[0]).toBe("plain");
      expect(tiles[6]).toBe("plain"); // Should cycle back
      expect(tiles[12]).toBe("plain"); // Another full cycle
    });

    test("handles starting at a negative index", () => {
      const tiles = [...rotatingSceneryTiles("blacktooth", 8, -4)];

      expect(tiles).toHaveLength(8);

      // -4 with pattern length 6 normalizes to position 2
      // So starts with "armour" (index 2)
      expect(tiles[0]).toBe("armour");
      expect(tiles[4]).toBe("plain");
      expect(tiles[6]).toBe("armour");
    });

    test("handles getting a large number of tiles starting at a negative index", () => {
      const tiles = [...rotatingSceneryTiles("blacktooth", 100, -4)];

      expect(tiles).toHaveLength(100);
    });

    test("handles getting tiles entirely at negative indexes", () => {
      const tiles = [...rotatingSceneryTiles("blacktooth", 2, -4)];

      expect(tiles).toHaveLength(2);
    });
  });
});
