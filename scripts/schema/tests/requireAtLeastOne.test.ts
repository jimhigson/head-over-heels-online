import { describe, expect, it } from "vitest";

import { flattenFixture } from "./testHelper.js";
import { timeout } from "./timeout.js";

describe("requireAtLeastOne", () => {
  it(
    "should flatten NonEmptyRecord (aliased as TestRequireAtLeastOne) to Record",
    { timeout },
    async () => {
      const result = await flattenFixture(
        "requireAtLeastOne",
        "TestRequireAtLeastOne",
      );

      // NonEmptyRecord should be flattened to a simple Record for schema generation
      const expected = `Record<
  string,
  {
    gridPosition: {
      x: number;
      y: number;
    };
    physicalPosition: {
      from: {
        x: number;
        y: number;
      };
      to: {
        x: number;
        y: number;
      };
    };
  }
>`;

      expect(result).toBe(expected);
    },
  );
});
