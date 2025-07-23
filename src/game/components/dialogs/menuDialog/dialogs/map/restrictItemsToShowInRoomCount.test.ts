import { describe, expect, test } from "vitest";
import { restrictItemsToShowInRoomCount } from "./restrictItemsToShowInRoomCount";

describe("restrictItemsToShowInRoomCount", () => {
  test("returns all items when count is below maximum", () => {
    const items = {
      door1: { type: "door" },
      door2: { type: "door" },
      monster1: { type: "monster" },
    };

    const result = restrictItemsToShowInRoomCount(items, 5);

    expect(result).toEqual({
      door1: { type: "door" },
      door2: { type: "door" },
      monster1: { type: "monster" },
    });
  });

  test("returns exactly maximum items when count equals maximum", () => {
    const items = {
      door1: { type: "door" },
      door2: { type: "door" },
      monster1: { type: "monster" },
    };

    const result = restrictItemsToShowInRoomCount(items, 3);

    expect(result).toEqual({
      door1: { type: "door" },
      door2: { type: "door" },
      monster1: { type: "monster" },
    });
  });

  test("restricts items using round-robin when exceeding maximum", () => {
    const items = {
      door1: { type: "door" },
      door2: { type: "door" },
      door3: { type: "door" },
      monster1: { type: "monster" },
      monster2: { type: "monster" },
      pickup1: { type: "pickup" },
    };

    const result = restrictItemsToShowInRoomCount(items, 4);

    // Round-robin order: door1, monster1, pickup1, door2
    expect(result).toEqual({
      door1: { type: "door" },
      monster1: { type: "monster" },
      pickup1: { type: "pickup" },
      door2: { type: "door" },
    });
  });

  test("handles single type gracefully", () => {
    const items = {
      door1: { type: "door" },
      door2: { type: "door" },
      door3: { type: "door" },
      door4: { type: "door" },
      door5: { type: "door" },
    };

    const result = restrictItemsToShowInRoomCount(items, 3);

    expect(result).toEqual({
      door1: { type: "door" },
      door2: { type: "door" },
      door3: { type: "door" },
    });
  });

  test("preserves item IDs when restricting", () => {
    const items = {
      specialDoor: { type: "door", special: true },
      normalDoor: { type: "door", special: false },
      bigMonster: { type: "monster", size: "large" },
    };

    const result = restrictItemsToShowInRoomCount(items, 2);

    // Round-robin: first door, first monster
    expect(result).toEqual({
      specialDoor: { type: "door", special: true },
      bigMonster: { type: "monster", size: "large" },
    });
  });

  test("selects fairly with uneven distribution and specific order", () => {
    // Testing the specific case: [door, door, monster, door] with max 3
    const items = {
      door1: { type: "door" },
      door2: { type: "door" },
      monster1: { type: "monster" },
      door3: { type: "door" },
    };

    const result = restrictItemsToShowInRoomCount(items, 3);

    // Round-robin: door1 (first door), monster1 (first monster), door2 (second door)
    expect(result).toEqual({
      door1: { type: "door" },
      monster1: { type: "monster" },
      door2: { type: "door" },
    });
  });
});
