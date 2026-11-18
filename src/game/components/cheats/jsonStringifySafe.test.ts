import { expect, test } from "vitest";

import { jsonStringifySafe } from "./jsonStringifySafe";

test("writes out an object referenced from two places in full both times", () => {
  const shared = { x: 1 };

  expect(JSON.parse(jsonStringifySafe({ a: shared, b: shared }))).toEqual({
    a: { x: 1 },
    b: { x: 1 },
  });
});

test("marks an object that contains itself as circular", () => {
  const looped: { name: string; child: { parent?: unknown } } = {
    name: "looped",
    child: {},
  };
  looped.child.parent = looped;

  expect(JSON.parse(jsonStringifySafe(looped))).toEqual({
    name: "looped",
    child: { parent: "[circular]" },
  });
});

test("writes out an object in sibling arrays in full", () => {
  const shared = { x: 1 };

  expect(JSON.parse(jsonStringifySafe([[shared], [shared]]))).toEqual([
    [{ x: 1 }],
    [{ x: 1 }],
  ]);
});
