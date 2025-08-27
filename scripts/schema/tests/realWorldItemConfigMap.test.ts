import { describe, expect, it } from "vitest";

import { flattenFixture } from "./testHelper.js";
import { timeout } from "./timeout.js";

describe("realWorldItemConfigMap", { timeout }, () => {
  it("should handle real world item config map", { timeout }, async () => {
    // Test the TestUnion type which is the union of all item types
    const result = await flattenFixture("realWorldItemConfigMap", "TestUnion");

    // The union should contain multiple object types with door, conveyor, etc.
    expect(result).toContain("type:");
    expect(result).toContain("position:");
    expect(result).toContain("config:");

    // Since it's a union, it should have multiple alternatives separated by |
    // The regex needs to handle newlines and nested objects
    expect(result).toContain(" | ");
  });
});
