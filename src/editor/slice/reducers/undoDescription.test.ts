import { describe, expect, test } from "vitest";

import { type Xyz } from "../../../utils/vectors/vectors";
import {
  type EditorJsonItemUnion,
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
} from "../../editorTypes";
import {
  describeRoomJsonEdit,
  moveVerb,
  type UndoDescription,
} from "./undoDescription";

const item = (
  type: string,
  config: Record<string, unknown> = {},
): EditorJsonItemUnion =>
  ({
    type,
    config,
    position: { x: 0, y: 0, z: 0 },
  }) as EditorJsonItemUnion;

const id = (s: string) => s as EditorRoomItemId;

describe("moveVerb", () => {
  test.for([
    [{ x: -1, y: 0, z: 0 }, "↘ Move"],
    [{ x: 1, y: 0, z: 0 }, "↖ Move"],
    [{ x: 0, y: 1, z: 0 }, "↗ Move"],
    [{ x: 0, y: -1, z: 0 }, "↙ Move"],
    [{ x: 0, y: 0, z: 1 }, "⬆ Move"],
    [{ x: 0, y: 0, z: -1 }, "⬇ Move"],
    [{ x: 1, y: 1, z: 0 }, "Move"],
    [{ x: -1, y: 0, z: 1 }, "Move"],
  ] as [Xyz, string][])("%j => %s", ([delta, expected]) => {
    expect(moveVerb(delta)).toBe(expected);
  });

  test("throws for zero movement", () => {
    expect(() => moveVerb({ x: 0, y: 0, z: 0 })).toThrow();
  });
});

const baseRoom: EditorRoomJson = {
  id: "room1" as EditorRoomId,
  planet: "blacktooth",
  color: { hue: "cyan", shade: "basic" },
  items: {
    [id("pi1")]: item("pickup", { gives: "bag" }),
    [id("m1")]: item("monster", { which: "dalek" }),
  },
};

describe("describeRoomJsonEdit", () => {
  test("no changes", () => {
    expect<UndoDescription>(describeRoomJsonEdit(baseRoom, baseRoom)).toEqual({
      kind: "editRoomJson",
    });
  });

  test("colour change", () => {
    const next = {
      ...baseRoom,
      color: { hue: "magenta" as const, shade: "basic" as const },
    };
    expect<UndoDescription>(describeRoomJsonEdit(baseRoom, next)).toEqual({
      kind: "editRoomProperty",
      property: "color",
    });
  });

  test("planet change", () => {
    const next = { ...baseRoom, planet: "egyptus" as const };
    expect<UndoDescription>(describeRoomJsonEdit(baseRoom, next)).toEqual({
      kind: "editRoomProperty",
      property: "planet",
    });
  });

  test("single item changed stores item with id", () => {
    const changedPickup = item("pickup", { gives: "hooter" });
    const next = {
      ...baseRoom,
      items: {
        ...baseRoom.items,
        [id("pi1")]: changedPickup,
      },
    };
    const result = describeRoomJsonEdit(baseRoom, next);
    expect(result).toEqual<UndoDescription>({
      kind: "editItems",
      items: [[id("pi1"), changedPickup]],
    });
  });

  test("single item added stores item with id", () => {
    const newBlock = item("block", { style: "organic" });
    const next = {
      ...baseRoom,
      items: {
        ...baseRoom.items,
        [id("b1")]: newBlock,
      },
    };
    const result = describeRoomJsonEdit(baseRoom, next);
    expect(result).toEqual<UndoDescription>({
      kind: "editItems",
      items: [[id("b1"), newBlock]],
    });
  });

  test("multiple items changed", () => {
    const next = {
      ...baseRoom,
      items: {
        [id("pi1")]: item("pickup", { gives: "hooter" }),
        [id("m1")]: item("monster", { which: "elephant" }),
      },
    };
    const result = describeRoomJsonEdit(baseRoom, next);
    expect(result.kind).toBe("editItems");
    if (result.kind === "editItems") {
      expect(result.items).toHaveLength(2);
      expect(result.items.map(([itemId]) => itemId)).toContain(id("pi1"));
      expect(result.items.map(([itemId]) => itemId)).toContain(id("m1"));
    }
  });

  test("multiple top-level keys changed", () => {
    const next = {
      ...baseRoom,
      planet: "egyptus" as const,
      color: { hue: "magenta" as const, shade: "basic" as const },
    };
    expect<UndoDescription>(describeRoomJsonEdit(baseRoom, next)).toEqual({
      kind: "editRoomJson",
    });
  });
});
