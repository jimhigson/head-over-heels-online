import { it, expect } from "vitest";
import { flattenFixture } from "./testHelper.js";
import { timeout } from "./timeout.js";

it("should flatten NonEmptyRecord to Record", { timeout }, async () => {
  const result = await flattenFixture("nonEmptyRecord", "TestNonEmptyRecord");

  const expected = `Record<
  string,
  {
    name: string;
    value: number;
    nested: {
      x: number;
      y: number;
    };
  }
>`;

  expect(result).toBe(expected);
});
