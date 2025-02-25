import { expectTypeOf, test } from "vitest";
import type { BackgroundTextureId } from "./scenerySpritesheetData";

test("generating frame number types", () => {
  type Blacktooth = BackgroundTextureId<"blacktooth", "">;
  type EgyptusDark = BackgroundTextureId<"egyptus", ".dark">;

  expectTypeOf<Blacktooth>().toEqualTypeOf<
    | "blacktooth.wall.armour.left"
    | "blacktooth.wall.shield.left"
    | "blacktooth.wall.plain.left"
    | "blacktooth.wall.armour.away"
    | "blacktooth.wall.shield.away"
    | "blacktooth.wall.plain.away"
    | "blacktooth.floor"
  >();

  expectTypeOf<EgyptusDark>().toEqualTypeOf<
    | "egyptus.dark.wall.sarcophagus.left"
    | "egyptus.dark.wall.hieroglyphics.left"
    | "egyptus.dark.wall.sarcophagus.away"
    | "egyptus.dark.wall.hieroglyphics.away"
    | "egyptus.dark.floor"
  >();
});
