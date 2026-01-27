/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, test } from "vitest";

import type { DoorFrameTextureName } from "./doorSpritesheetData";
import type { BackgroundTextureId } from "./scenerySpritesheetData";

describe("generating frame string union type", () => {
  test("blacktooth", () => {
    type Blacktooth = BackgroundTextureId<"blacktooth", "">;
    type BlacktoothExpected =
      | "blacktooth.floor"
      | "blacktooth.wall.armour.away"
      | "blacktooth.wall.armour.left"
      | "blacktooth.wall.plain.away"
      | "blacktooth.wall.plain.left"
      | "blacktooth.wall.shield.away"
      | "blacktooth.wall.shield.left";

    const _1: BlacktoothExpected = {} as Blacktooth;
    const _2: Blacktooth = {} as BlacktoothExpected;
  });

  test("egyptus dark", () => {
    type EgyptusDark = BackgroundTextureId<"egyptus", ".dark">;
    type EgyptusDarkExpected =
      | "egyptus.dark.floor"
      | "egyptus.dark.wall.hieroglyphics.away"
      | "egyptus.dark.wall.hieroglyphics.left"
      | "egyptus.dark.wall.sarcophagus.away"
      | "egyptus.dark.wall.sarcophagus.left";

    const _1: EgyptusDarkExpected = {} as EgyptusDark;
    const _2: EgyptusDark = {} as EgyptusDarkExpected;
  });

  test("moonbase", () => {
    type Moonbase = BackgroundTextureId<"moonbase", "">;
    type MoonbaseExpected =
      | "moonbase.floor"
      | "moonbase.wall.coil.away"
      | "moonbase.wall.coil.left"
      | "moonbase.wall.window-clear.away"
      | "moonbase.wall.window-clear.left"
      | "moonbase.wall.window1.away"
      | "moonbase.wall.window1.left"
      | "moonbase.wall.window2.away"
      | "moonbase.wall.window2.left"
      | "moonbase.wall.window3.away"
      | "moonbase.wall.window3.left"
      | DoorFrameTextureName<"moonbase">;

    const _1: MoonbaseExpected = {} as Moonbase;
    const _2: Moonbase = {} as MoonbaseExpected;
  });

  test("moonbase dark", () => {
    type MoonbaseDark = BackgroundTextureId<"moonbase", ".dark">;
    type MoonbaseDarkExpected =
      | "moonbase.dark.floor"
      | "moonbase.dark.wall.coil.away"
      | "moonbase.dark.wall.coil.left"
      | "moonbase.dark.wall.window-clear.away"
      | "moonbase.dark.wall.window-clear.left"
      | "moonbase.dark.wall.window1.away"
      | "moonbase.dark.wall.window1.left"
      | "moonbase.dark.wall.window2.away"
      | "moonbase.dark.wall.window2.left"
      | "moonbase.dark.wall.window3.away"
      | "moonbase.dark.wall.window3.left"
      | DoorFrameTextureName<"moonbase.dark">;

    const _1: MoonbaseDarkExpected = {} as MoonbaseDark;
    const _2: MoonbaseDark = {} as MoonbaseDarkExpected;
  });
});
