import { expectTypeOf, test } from "vitest";

import type { VelocitiesForItem } from "../MechanicResult";

test("implies velocities on mechanics from allowed velocities on item", () => {
  expectTypeOf<VelocitiesForItem<"head">>().toEqualTypeOf<
    "gravity" | "movingFloor" | "walking"
  >();

  expectTypeOf<VelocitiesForItem<"pickup">>().toEqualTypeOf<
    "gravity" | "movingFloor"
  >();

  expectTypeOf<VelocitiesForItem<"lift">>().toEqualTypeOf<"lift">();
});
