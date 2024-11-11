import { expectTypeOf, test } from "vitest";
import type { EntriesOf } from "./entries";

test("entries of object with known keys", () => {
  type Actual = EntriesOf<{ a: number; b: string }>;
  type Expected = Array<["a", number] | ["b", string]>;

  expectTypeOf<Actual>().toMatchTypeOf<Expected>();
});

test("entries of Record", () => {
  type Actual = EntriesOf<Record<"a" | "b" | "c", number>>;
  type Expected = Array<["a" | "b" | "c", number]>;

  expectTypeOf<Actual>().toMatchTypeOf<Expected>();
});

/*
test("entries of Partial Record", () => {
  type Actual = EntriesOf<Partial<Record<"a" | "b" | "c", number>>>;
  type Expected = Array<["a" | "b" | "c", number | undefined]>;

  const actual: Actual = [
    ["a", 1],
    ["b", undefined],
    ["c", 3],
  ];
  actual satisfies Expected;

  expectTypeOf<Actual>().toMatchTypeOf<Expected>();
});
*/
