import { describe, it, expect } from "vitest";
import { flattenFixture } from "../testHelper.js";

describe("customArrayTypes", () => {
  it(
    "should handle arrays with custom types",
    { timeout: 20_000 },
    async () => {
      expect(await flattenFixture("customArrayTypes", "ItemIdArray")).toBe(
        "string[]",
      );
    },
  );
});
