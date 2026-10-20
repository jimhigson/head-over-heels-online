import { Color } from "pixi.js";

import { type ZxSpectrumRoomColour } from "../../../originalGame";
import { type SpritesheetMetadata } from "../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { type SpriteOption } from "../../../store/slices/userSettings/userSettingsSlice";
import { getRoomColorScheme } from "../gameColours/colourScheme";
import {
  replacementColour,
  toppyReplacementColour,
} from "../gameColours/gameColours";
import { zxSpectrumPixiColor } from "../palette/zxSpectrumPixiColours";

const noTint = new Color(0xff_ff_ff);

export const tintForHudIfUncolourised = (
  spriteOption: SpriteOption,
  roomColor: ZxSpectrumRoomColour,
  active: boolean,
): Color =>
  spriteOption.uncolourised ?
    zxSpectrumPixiColor(
      getRoomColorScheme(roomColor).hud[active ? "brightHue" : "dimmedHue"],
    )
  : noTint;

export const tintForHud = (
  spriteOption: SpriteOption,
  roomColor: ZxSpectrumRoomColour,
  active: boolean,
  spritesheetMeta: SpritesheetMetadata,
): Color => {
  const colorScheme = getRoomColorScheme(roomColor);
  const hudHue = colorScheme.hud[active ? "brightHue" : "dimmedHue"];

  if (spriteOption.uncolourised) {
    return zxSpectrumPixiColor(hudHue);
  }
  if (spriteOption.name === "Toppy") {
    return toppyReplacementColour(hudHue);
  }
  if (spriteOption.name === "Debug") {
    return noTint;
  }
  spriteOption.name satisfies "BlockStack";
  return replacementColour(
    hudHue,
    false,
    spritesheetMeta.paletteDim !== undefined && roomColor.shade === "dimmed",
  );
};

export const tintForIcon = (
  spriteOption: SpriteOption,
  roomColor: ZxSpectrumRoomColour,
): Color => {
  const colorScheme = getRoomColorScheme(roomColor);
  const iconHue = colorScheme.hud.icons;

  if (spriteOption.uncolourised) {
    return zxSpectrumPixiColor(iconHue);
  }
  if (spriteOption.name === "Toppy") {
    return toppyReplacementColour(iconHue);
  }
  if (spriteOption.name === "Debug") {
    return noTint;
  }
  spriteOption.name satisfies "BlockStack";
  return replacementColour(iconHue, false, roomColor.shade === "dimmed");
};
