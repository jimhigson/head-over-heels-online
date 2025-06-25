import { describe, it, expect } from "vitest";
import { flattenFixture } from "../testHelper";

describe("realWorldEmitter", { timeout: 20_000 }, () => {
  it("should correctly handle emitter emits property as union of objects", async () => {
    const result = await flattenFixture("realWorldEmitter", "TestEmitter");

    console.log("Full result:", result);

    // Should have emits as a union
    expect(result).toMatch(/emits:\s*\|/);

    // Each union member should have type and config
    expect(result).toMatch(/\|\s*{\s*type:\s*"head";\s*config:/);
    expect(result).toMatch(/\|\s*{\s*type:\s*"pickup";\s*config:/);

    // Should NOT collapse to { type: "head" | "pickup"; config: ... }
    expect(result).not.toMatch(/emits:\s*{\s*type:\s*"head"\s*\|\s*"pickup"/);
  });
});
