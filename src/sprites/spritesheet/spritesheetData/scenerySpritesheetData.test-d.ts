/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, test } from "vitest";

import { type DoorFrameTextureName } from "./doorSpritesheetData";
import { type BackgroundTextureId } from "./scenerySpritesheetData";

describe("generating frame string union type", () => {
  test("blacktooth", () => {
    type Blacktooth = BackgroundTextureId<"blacktooth", "">;
    type BlacktoothExpected =
      | "blacktooth.floor"
      | "blacktooth.wall.armour.d0"
      | "blacktooth.wall.armour.d2"
      | "blacktooth.wall.plain.d0"
      | "blacktooth.wall.plain.d2"
      | "blacktooth.wall.shield.d0"
      | "blacktooth.wall.shield.d2";

    const _1: BlacktoothExpected = {} as Blacktooth;
    const _2: Blacktooth = {} as BlacktoothExpected;
  });

  test("egyptus dark", () => {
    type EgyptusDark = BackgroundTextureId<"egyptus", ".dark">;
    type EgyptusDarkExpected =
      | "egyptus.dark.floor"
      | "egyptus.dark.wall.hieroglyphics.d0"
      | "egyptus.dark.wall.hieroglyphics.d2"
      | "egyptus.dark.wall.sarcophagus.d0"
      | "egyptus.dark.wall.sarcophagus.d2";

    const _1: EgyptusDarkExpected = {} as EgyptusDark;
    const _2: EgyptusDark = {} as EgyptusDarkExpected;
  });

  test("moonbase", () => {
    type Moonbase = BackgroundTextureId<"moonbase", "">;
    type MoonbaseExpected =
      | "moonbase.floor"
      | "moonbase.wall.coil.d0"
      | "moonbase.wall.coil.d2"
      | "moonbase.wall.window-clear.d0"
      | "moonbase.wall.window-clear.d2"
      | "moonbase.wall.window1.d0"
      | "moonbase.wall.window1.d2"
      | "moonbase.wall.window2.d0"
      | "moonbase.wall.window2.d2"
      | "moonbase.wall.window3.d0"
      | "moonbase.wall.window3.d2"
      | DoorFrameTextureName<"moonbase">;

    const _1: MoonbaseExpected = {} as Moonbase;
    const _2: Moonbase = {} as MoonbaseExpected;
  });

  test("moonbase dark", () => {
    type MoonbaseDark = BackgroundTextureId<"moonbase", ".dark">;
    type MoonbaseDarkExpected =
      | "moonbase.dark.floor"
      | "moonbase.dark.wall.coil.d0"
      | "moonbase.dark.wall.coil.d2"
      | "moonbase.dark.wall.window-clear.d0"
      | "moonbase.dark.wall.window-clear.d2"
      | "moonbase.dark.wall.window1.d0"
      | "moonbase.dark.wall.window1.d2"
      | "moonbase.dark.wall.window2.d0"
      | "moonbase.dark.wall.window2.d2"
      | "moonbase.dark.wall.window3.d0"
      | "moonbase.dark.wall.window3.d2"
      | DoorFrameTextureName<"moonbase.dark">;

    const _1: MoonbaseDarkExpected = {} as MoonbaseDark;
    const _2: MoonbaseDark = {} as MoonbaseDarkExpected;
  });
});
