import { describe, it, expect } from "vitest";
import { flattenFixture } from "../testHelper";

describe("emitterType", { timeout: 20_000 }, () => {
  it("should flatten emitter type with correct emits union", async () => {
    const result = await flattenFixture("emitterType", "TestEmitter");

    console.log("Full result:", result);

    // The emits property should be a union of objects with type and config
    expect(result).toContain("emits:");
    expect(result).toContain('type: "pickup"');
    expect(result).toContain('type: "spring"');
    expect(result).toContain('type: "block"');
    expect(result).toContain('gives: "shield" | "extra-life"');
    expect(result).toContain('style: "organic" | "artificial"');

    // Check that the union is structured correctly with type and config in each branch
    expect(result).toMatch(/\|\s*{\s*type:\s*"pickup";\s*config:\s*{/);
    expect(result).toMatch(/\|\s*{\s*type:\s*"spring";\s*config:\s*Record/);
    expect(result).toMatch(/\|\s*{\s*type:\s*"block";\s*config:\s*{/);

    expect(result).toContain("period: number;");
    expect(result).toContain("maximum: null | number;");
  });
});
