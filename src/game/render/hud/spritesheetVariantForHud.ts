import { Color } from "pixi.js";

import type { ZxSpectrumRoomColour } from "../../../originalGame";
import type { SpritesheetVariant } from "../../../sprites/spritesheet/variants/SpritesheetVariant";

import { zxSpectrumColor } from "../../../originalGame";
import { getRoomColorScheme } from "../gameColours/colourScheme";
import { replacementColour } from "../gameColours/gameColours";

const noTint = new Color(0xffffff);

/**
 * Determines the spritesheet variant to use for HUD elements based on
 * colourisation mode and whether the item is active.
 */
export const spritesheetVariantForHud = (
  colourised: boolean,
  active: boolean = true,
): SpritesheetVariant =>
  colourised ?
    active ? "for-current-room"
    : "deactivated"
  : "uncolourised";

/**
 * Determines the tint to use for HUD elements
 *
 * Colourised -> no tint
 */
export const tintForHudIfUncolourised = (
  colourised: boolean,
  roomColor: ZxSpectrumRoomColour,
  active: boolean,
): Color =>
  colourised ? noTint : (
    zxSpectrumColor(
      getRoomColorScheme(roomColor).hud[active ? "brightHue" : "dimmedHue"],
    )
  );

export const tintForHud = (
  colourised: boolean,
  roomColor: ZxSpectrumRoomColour,
  active: boolean,
): Color => {
  const colorScheme = getRoomColorScheme(roomColor);

  return colourised ?
      replacementColour(
        colorScheme.hud[active ? "brightHue" : "dimmedHue"],
        false,
        roomColor.shade === "dimmed",
      )
    : zxSpectrumColor(colorScheme.hud[active ? "brightHue" : "dimmedHue"]);
};

export const tintForIcon = (
  colourised: boolean,
  roomColor: ZxSpectrumRoomColour,
): Color => {
  const colorScheme = getRoomColorScheme(roomColor);

  return colourised ?
      replacementColour(
        colorScheme.hud.icons,
        false,
        roomColor.shade === "dimmed",
      )
    : zxSpectrumColor(colorScheme.hud.icons);
};
