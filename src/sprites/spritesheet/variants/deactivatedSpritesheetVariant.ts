import type { Renderer } from "pixi.js";

import type { PaletteSwaps } from "../../../game/render/filters/lutTexture/sparseLut";
import type { ZxSpectrumRoomColour } from "../../../originalGame";
import type { SceneryName } from "../../planets";
import type { AppSpritesheet } from "../loadedSpriteSheet";
import type { SpritesheetTextureSwops } from "../spritesheetPaletteSwop";

import { omit } from "../../../utils/pick";
import { spritesheetPalette } from "../../palette/spritesheetPalette";
import { ambienceSwops } from "../colourisedRoomSwops";
import { textureIds } from "../spritesheetData/spriteSheetData";
import {
  createSpritesheetVariant,
  dimSwops,
  replaceSpritesheetWithSwopped,
} from "../spritesheetPaletteSwop";

let swopped: AppSpritesheet | undefined = undefined;

export const greySwaps: PaletteSwaps = {
  lightBeige: spritesheetPalette.lightGrey,
  redShadow: spritesheetPalette.shadow,
  pink: spritesheetPalette.lightGrey,
  moss: spritesheetPalette.lightGrey,
  midRed: spritesheetPalette.midGrey,
  highlightBeige: spritesheetPalette.lightGrey,
  pastelBlue: spritesheetPalette.lightGrey,
  metallicBlue: spritesheetPalette.midGrey,
  replaceLight: spritesheetPalette.lightGrey,
  replaceDark: spritesheetPalette.midGrey,
};

export const greyFilterExceptBlue = omit(
  greySwaps,
  "metallicBlue",
  "pastelBlue",
);

export const greyFilterExceptPink = omit(greySwaps, "pink");

export const deactivatedSpritesheetTextureSwops: SpritesheetTextureSwops = {
  ambient: [{ paletteSwaps: greySwaps, lutType: "sparse" }],
  //texture specific swops let head/heels keep blue/pink while deactivated (ie, in hud)
  textureSpecific: [
    {
      textureIds: textureIds.filter((tid) => tid.startsWith("head.")),
      paletteSwaps: greyFilterExceptBlue,
      // don't let the ambient swop blue out first:
      dodgeAmbient: true,
    },
    {
      textureIds: textureIds.filter((tid) => tid.startsWith("heels.")),
      paletteSwaps: greyFilterExceptPink,
      // don't let the ambient swop pink out first:
      dodgeAmbient: true,
    },
  ],
};

export const destroyDeactivatedSpritesheetVariant = () => {
  if (swopped !== undefined) {
    swopped.textureSource.destroy();
    swopped.destroy(true);
    swopped = undefined;
  }
};

export const createDeactivatedSpritesheetVariant = (
  pixiRenderer: Renderer,
  roomScenery: SceneryName,
  roomColor: ZxSpectrumRoomColour,
): void => {
  destroyDeactivatedSpritesheetVariant();

  let result = createSpritesheetVariant(
    pixiRenderer,
    deactivatedSpritesheetTextureSwops,
  );

  if (roomColor.shade === "dimmed") {
    result = replaceSpritesheetWithSwopped(pixiRenderer, result, dimSwops);
  } else {
    result = replaceSpritesheetWithSwopped(pixiRenderer, result, {
      ambient: [ambienceSwops(roomScenery, roomColor)],
    });
  }

  swopped = result;
};

/**
 * NOTE: this is only safe to call after the spritesheet has had load() called
 * and it resolved! - this is a sync export since we need to get the spritesheet
 * inside the update/render loop synchronously many times
 */
export const deactivatedSpritesheetVariant = (): AppSpritesheet => {
  if (swopped === undefined) {
    throw new Error(
      `swopped spritesheet undefined - should only be called when we know for sure it is available`,
    );
  }

  return swopped;
};
