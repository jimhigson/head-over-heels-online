import { Color } from "pixi.js";

import { type ZxSpectrumRoomColour } from "../../../originalGame";
import { type SpritesheetMetadata } from "../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { getRoomColorScheme } from "../gameColours/colourScheme";
import {
  blockstackReplacementColour,
  toppyReplacementColour,
} from "../gameColours/gameColours";
import { zxSpectrumPixiColor } from "../palette/zxSpectrumPixiColours";

const noTint = new Color(0xff_ff_ff);

export const tintForHudIfUncolourised = (
  spritesheetMeta: SpritesheetMetadata,
  roomColor: ZxSpectrumRoomColour,
  active: boolean,
): Color =>
  spritesheetMeta.isUncolourisedOf !== undefined ?
    zxSpectrumPixiColor(
      getRoomColorScheme(roomColor).hud[active ? "brightHue" : "dimmedHue"],
    )
  : noTint;

export const tintForHud = (
  spritesheetMeta: SpritesheetMetadata,
  roomColor: ZxSpectrumRoomColour,
  active: boolean,
): Color => {
  const colorScheme = getRoomColorScheme(roomColor);
  const hudHue = colorScheme.hud[active ? "brightHue" : "dimmedHue"];

  switch (spritesheetMeta.name) {
    case "speccy":
      return zxSpectrumPixiColor(hudHue);
    case "toppy":
      return toppyReplacementColour(hudHue);
    case "debug":
      return noTint;
    case "blockstack":
      return blockstackReplacementColour(
        hudHue,
        false,
        spritesheetMeta.palettes.dim !== undefined &&
          roomColor.shade === "dimmed",
      );
    default:
      spritesheetMeta.name satisfies never;
      throw new Error(`unknown spritesheet "${spritesheetMeta.name}"`);
  }
};

export const tintForIcon = (
  spritesheetMeta: SpritesheetMetadata,
  roomColor: ZxSpectrumRoomColour,
): Color => {
  const colorScheme = getRoomColorScheme(roomColor);
  const iconHue = colorScheme.hud.icons;

  switch (spritesheetMeta.name) {
    case "speccy":
      return zxSpectrumPixiColor(iconHue);
    case "toppy":
      return toppyReplacementColour(iconHue);
    case "debug":
      return noTint;
    case "blockstack":
      return blockstackReplacementColour(
        iconHue,
        false,
        roomColor.shade === "dimmed",
      );
    default:
      spritesheetMeta.name satisfies never;
      throw new Error(`unknown spritesheet "${spritesheetMeta.name}"`);
  }
};
