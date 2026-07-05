import { expect, test } from "vitest";

import { getAtPath, setAtPath } from "./getAtPath";

/**
 * an RFC 6901 JSON Pointer splitter: strips the leading `/` and decodes the
 * `~1`/`~0` escapes, so a key containing a slash survives. Used to exercise the
 * injectable split strategy.
 */
const jsonPointer = (pointer: string): string[] =>
  pointer === "" ?
    []
  : pointer
      .slice(1)
      .split("/")
      .map((token) => token.replace(/~1/g, "/").replace(/~0/g, "~"));

test("getAtPath reads a nested value with the default dot splitter", () => {
  expect<number>(getAtPath({ a: { b: { c: 3 } } }, "a.b.c")).toBe(3);
});

test("getAtPath reads a top-level value", () => {
  expect<number>(getAtPath({ a: 1 }, "a")).toBe(1);
});

test("getAtPath returns undefined for a missing leaf", () => {
  expect(getAtPath({ a: {} } as { a: { b?: number } }, "a.b")).toBeUndefined();
});

test("getAtPath returns undefined (rather than throwing) at a missing intermediate", () => {
  expect(
    getAtPath({ a: undefined } as { a?: { b: number } }, "a.b"),
  ).toBeUndefined();
});

test("getAtPath reads through an injected JSON Pointer splitter, decoding a slash key", () => {
  const room = { items: { "w2/afterDoor": { direction: "left" } } };
  expect(
    getAtPath(
      room as Record<string, unknown>,
      "/items/w2~1afterDoor/direction",
      jsonPointer,
    ),
  ).toBe("left");
});

test("getAtPath reads an array index via the injected splitter", () => {
  const room = { tiles: ["a", "b", "c"] };
  expect(
    getAtPath(room as Record<string, unknown>, "/tiles/1", jsonPointer),
  ).toBe("b");
});

test("setAtPath writes a nested value with the default dot splitter", () => {
  const obj = { a: { b: { c: 1 } } };
  setAtPath(obj, "a.b.c", 9);
  expect<number>(obj.a.b.c).toBe(9);
});

test("setAtPath writes a top-level value", () => {
  const obj = { a: 1 };
  setAtPath(obj, "a", 2);
  expect<number>(obj.a).toBe(2);
});

test("setAtPath writes through an injected JSON Pointer splitter, decoding a slash key", () => {
  const room = { items: { "w2/afterDoor": { direction: "left" } } };
  setAtPath(
    room as Record<string, unknown>,
    "/items/w2~1afterDoor/direction",
    "right",
    jsonPointer,
  );
  expect<string>(room.items["w2/afterDoor"].direction).toBe("right");
});

test("setAtPath writes an array index via the injected splitter", () => {
  const room = { tiles: ["a", "b", "c"] };
  setAtPath(room as Record<string, unknown>, "/tiles/1", "B", jsonPointer);
  expect<string>(room.tiles[1]).toBe("B");
});
