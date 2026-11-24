import { expect, it } from "vitest";

import { flattenFixture } from "./testHelper.js";
import { timeout } from "./timeout.js";

it(
  "flattens a non-empty tuple of primitives to a tuple with a rest element",
  { timeout },
  async () => {
    expect(await flattenFixture("nonEmptyTuple", "NonEmptyStrings")).toBe(
      "[string, ...string[]]",
    );
  },
);

it("flattens a non-empty tuple of objects", { timeout }, async () => {
  expect(await flattenFixture("nonEmptyTuple", "NonEmptyObjects")).toBe(
    [
      "[",
      "  {",
      "    a: number;",
      "    b?: string;",
      "  },",
      "  ...{",
      "    a: number;",
      "    b?: string;",
      "  }[],",
      "]",
    ].join("\n"),
  );
});

it("flattens a non-empty tuple of a union", { timeout }, async () => {
  expect(await flattenFixture("nonEmptyTuple", "NonEmptyUnions")).toBe(
    [
      "[",
      "  (",
      "    | {",
      '        type: "x";',
      "      }",
      "    | {",
      '        type: "y";',
      "      }",
      "  ),",
      "  ...(",
      "    | {",
      '        type: "x";',
      "      }",
      "    | {",
      '        type: "y";',
      "      }",
      "  )[],",
      "]",
    ].join("\n"),
  );
});

it("flattens a non-empty tuple property", { timeout }, async () => {
  expect(await flattenFixture("nonEmptyTuple", "HoldsNonEmpty")).toBe(
    ["{", "  items: [string, ...string[]];", "  other: number;", "}"].join(
      "\n",
    ),
  );
});

it("flattens a writable non-empty tuple", { timeout }, async () => {
  expect(await flattenFixture("nonEmptyTuple", "WritableNonEmptyStrings")).toBe(
    "[string, ...string[]]",
  );
});

it("flattens a tuple with an optional element", { timeout }, async () => {
  expect(await flattenFixture("nonEmptyTuple", "OptionalElementTuple")).toBe(
    "[string, number?]",
  );
});
