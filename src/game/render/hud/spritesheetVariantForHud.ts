import { Color } from "pixi.js";

import {
  zxSpectrumColor,
  type ZxSpectrumRoomColour,
} from "../../../originalGame";
import { type SpritesheetMetadata } from "../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { type SpriteOption } from "../../../store/slices/userSettings/userSettingsSlice";
import { getRoomColorScheme } from "../gameColours/colourScheme";
import {
  replacementColour,
  toppyReplacementColour,
} from "../gameColours/gameColours";

const noTint = new Color(0xff_ff_ff);

export const tintForHudIfUncolourised = (
  spriteOption: SpriteOption,
  roomColor: ZxSpectrumRoomColour,
  active: boolean,
): Color =>
  spriteOption.uncolourised ?
    zxSpectrumColor(
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
    return zxSpectrumColor(hudHue);
  }
  if (spriteOption.name === "Toppy") {
    return toppyReplacementColour(hudHue);
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
    return zxSpectrumColor(iconHue);
  }
  if (spriteOption.name === "Toppy") {
    return toppyReplacementColour(iconHue);
  }
  spriteOption.name satisfies "BlockStack";
  return replacementColour(iconHue, false, roomColor.shade === "dimmed");
};
