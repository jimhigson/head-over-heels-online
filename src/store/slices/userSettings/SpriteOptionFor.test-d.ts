import { expectTypeOf, test } from "vitest";

import { type SpriteOptionFor } from "./userSettingsSlice";

test("a sheet supporting uncolourised yields both colourised and uncolourised", () => {
  expectTypeOf<SpriteOptionFor<"Foo", true>>().toEqualTypeOf<
    { name: "Foo"; uncolourised: false } | { name: "Foo"; uncolourised: true }
  >();
});

test("a sheet not supporting uncolourised yields only the colourised form", () => {
  expectTypeOf<SpriteOptionFor<"Bar", false>>().toEqualTypeOf<{
    name: "Bar";
    uncolourised: false;
  }>();
});
