import { describe, it, expect } from "vitest";
import { flattenFixture } from "./testHelper";
import { timeout } from "./timeout";

describe("emitterRealCase", { timeout }, () => {
  it("should flatten emitter with EmittableItemRecipe as union", async () => {
    const result = await flattenFixture("emitterRealCase", "TestEmitterReal");

    // The emits property should be a union of objects with type and config
    // NOT an object with separate type and config properties
    expect(result).toContain("emits:");

    // Should have union structure
    expect(result).toMatch(/emits:\s*\|/);

    // Each union member should have both type and config
    // The fix generates emittable items, not just the test fixture items
    expect(result).toMatch(/\|\s*{\s*type:\s*"pickup";\s*config:/);
    expect(result).toMatch(/\|\s*{\s*type:\s*"spring";\s*config:\s*Record/);
    expect(result).toMatch(/\|\s*{\s*type:\s*"portableBlock";\s*config:\s*{/);

    // Should NOT have separate type and config properties like:
    // emits: { type: "pickup" | "spring" | "block"; config: ... }
    expect(result).not.toMatch(/emits:\s*{\s*type:\s*\|/);
  });
});
