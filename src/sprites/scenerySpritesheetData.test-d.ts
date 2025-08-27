import { expectTypeOf, test } from "vitest";

import type { BackgroundTextureId } from "./scenerySpritesheetData";

test("generating frame number types", () => {
  type Blacktooth = BackgroundTextureId<"blacktooth", "">;
  type EgyptusDark = BackgroundTextureId<"egyptus", ".dark">;

  expectTypeOf<Blacktooth>().toEqualTypeOf<
    | "blacktooth.floor"
    | "blacktooth.wall.armour.away"
    | "blacktooth.wall.armour.left"
    | "blacktooth.wall.plain.away"
    | "blacktooth.wall.plain.left"
    | "blacktooth.wall.shield.away"
    | "blacktooth.wall.shield.left"
  >();

  expectTypeOf<EgyptusDark>().toEqualTypeOf<
    | "egyptus.dark.floor"
    | "egyptus.dark.wall.hieroglyphics.away"
    | "egyptus.dark.wall.hieroglyphics.left"
    | "egyptus.dark.wall.sarcophagus.away"
    | "egyptus.dark.wall.sarcophagus.left"
  >();
});
