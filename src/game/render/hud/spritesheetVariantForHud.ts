import { Color } from "pixi.js";

import type { ZxSpectrumRoomColour } from "../../../originalGame";
import type { SpritesheetMetaData } from "../../../sprites/spritesheet/spritesheetData/spritesheetMetas";
import type { SpritesheetVariant } from "../../../sprites/spritesheet/variants/SpritesheetVariant";
import type { SpriteOption } from "../../../store/slices/gameMenus/gameMenusSlice";

import { zxSpectrumColor } from "../../../originalGame";
import { getRoomColorScheme } from "../gameColours/colourScheme";
import { replacementColour } from "../gameColours/gameColours";

const noTint = new Color(0xffffff);

export const spritesheetVariantForHud = (
  spriteOption: SpriteOption,
  active: boolean = true,
): SpritesheetVariant =>
  spriteOption === "Speccy" ? "uncolourised"
  : active ? "for-current-room"
  : "deactivated";

export const tintForHudIfUncolourised = (
  spriteOption: SpriteOption,
  roomColor: ZxSpectrumRoomColour,
  active: boolean,
): Color =>
  spriteOption === "Speccy" ?
    zxSpectrumColor(
      getRoomColorScheme(roomColor).hud[active ? "brightHue" : "dimmedHue"],
    )
  : noTint;

export const tintForHud = (
  spriteOption: SpriteOption,
  roomColor: ZxSpectrumRoomColour,
  active: boolean,
  spritesheetMeta: SpritesheetMetaData,
): Color => {
  const colorScheme = getRoomColorScheme(roomColor);

  return spriteOption === "Speccy" ?
      zxSpectrumColor(colorScheme.hud[active ? "brightHue" : "dimmedHue"])
    : replacementColour(
        colorScheme.hud[active ? "brightHue" : "dimmedHue"],
        false,
        spritesheetMeta.useAltPaletteInDimmedRoom === true &&
          roomColor.shade === "dimmed",
      );
};

export const tintForIcon = (
  spriteOption: SpriteOption,
  roomColor: ZxSpectrumRoomColour,
): Color => {
  const colorScheme = getRoomColorScheme(roomColor);

  return spriteOption === "Speccy" ?
      zxSpectrumColor(colorScheme.hud.icons)
    : replacementColour(
        colorScheme.hud.icons,
        false,
        roomColor.shade === "dimmed",
      );
};
