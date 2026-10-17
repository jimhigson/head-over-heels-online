import { expect, test } from "vitest";

import { setJsonPattern, type SetJsonPatternResult } from "./setJsonPattern";

const items = {
  door1: { type: "door", config: { toRoom: "nowhere" } },
  door2: { type: "door", config: { toRoom: "room_3" } },
  block: { type: "block", config: { style: "book" } },
};

test("replaces a value at an exact path", () => {
  expect<SetJsonPatternResult<typeof items>>(
    setJsonPattern(items, "door2.config.toRoom", "room_4"),
  ).toEqual<SetJsonPatternResult<typeof items>>({
    root: { ...items, door2: { type: "door", config: { toRoom: "room_4" } } },
    paths: ["door2.config.toRoom"],
  });
});

test("sets a value under every item an attribute selector matches", () => {
  expect(
    setJsonPattern(items, "[config.toRoom=nowhere].config.toRoom", "$$nowhere")
      .root,
  ).toEqual({
    ...items,
    door1: { type: "door", config: { toRoom: "$$nowhere" } },
  });
});

test("inserts a named key that isn't there yet", () => {
  expect(setJsonPattern(items, "block.config.times", { x: 2 }).root).toEqual({
    ...items,
    block: { type: "block", config: { style: "book", times: { x: 2 } } },
  });
});

test("a wildcard last part replaces only keys already there", () => {
  expect(setJsonPattern(items, "door*", null).paths).toEqual([
    "door1",
    "door2",
  ]);
});

test("leaves the original untouched", () => {
  setJsonPattern(items, "door1.config.toRoom", "room_9");
  expect(items.door1.config.toRoom).toBe("nowhere");
});
