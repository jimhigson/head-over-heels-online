import { describe, expect, expectTypeOf, test } from "vitest";
import { pick } from "./pick";

describe("simple pick", () => {
  test("can do a simple pick", () => {
    expect(pick({ a: 1, b: 2, c: "hi" }, "b", "c")).toEqual({ b: 2, c: "hi" });
  });

  test("infers types correctly", () => {
    expectTypeOf(pick({ a: 1, b: 2, c: "hi" }, "b", "c")).toMatchTypeOf<{
      b: number;
      c: string;
    }>();

    expectTypeOf(
      pick({ a: 1, b: 2, c: "hi" } as const, "b", "c"),
    ).toMatchTypeOf<{
      b: 2;
      c: "hi";
    }>();
  });
});

describe("pick of zero items", () => {
  test("returns empty object", () => {
    expect(pick({ a: 1, b: 2, c: "hi" })).toEqual({});
  });

  test("infers types correctly", () => {
    expectTypeOf(pick({ a: 1, b: 2, c: "hi" })).toMatchTypeOf<{
      [n in never]: never;
    }>();
  });
});
