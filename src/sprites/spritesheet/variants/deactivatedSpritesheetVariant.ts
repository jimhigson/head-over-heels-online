import { type Renderer, RenderTexture, Spritesheet } from "pixi.js";

import type { PaletteSwaps } from "../../../game/render/filters/lutTexture/sparseLut";
import type { ZxSpectrumRoomColour } from "../../../originalGame";
import type { SceneryName } from "../../planets";
import type { AppSpritesheet } from "../loadedSpriteSheet";
import type { SpritesheetTextureSwops } from "../spritesheetPaletteSwop";

import { omit } from "../../../utils/pick";
import { spritesheetPalette } from "../../palette/spritesheetPalette";
import { ambienceSwops } from "../colourisedRoomSwops";
import {
  spritesheetData,
  spritesheetSize,
  textureIds,
} from "../spritesheetData/spriteSheetData";
import { dimSwops, spritesheetPaletteSwop } from "../spritesheetPaletteSwop";

let intermediateTexture: RenderTexture | undefined = undefined;
let destinationTexture: RenderTexture | undefined = undefined;
let spritesheet: AppSpritesheet | undefined = undefined;

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
  ambient: { paletteSwaps: greySwaps, lutType: "sparse" },
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

const lazyInitRenderTexture = (
  texture: RenderTexture | undefined,
): RenderTexture =>
  texture ??
  RenderTexture.create({
    width: spritesheetSize.w,
    height: spritesheetSize.h,
  });

export const destroyDeactivatedSpritesheetVariant = () => {
  if (spritesheet !== undefined) {
    spritesheet.destroy(true);
    spritesheet = undefined;
  }
  if (destinationTexture !== undefined) {
    destinationTexture.destroy(true);
    destinationTexture = undefined;
  }
  if (intermediateTexture !== undefined) {
    intermediateTexture.destroy(true);
    intermediateTexture = undefined;
  }
};

export const createDeactivatedSpritesheetVariant = (
  pixiRenderer: Renderer,
  roomScenery: SceneryName,
  roomColor: ZxSpectrumRoomColour,
): void => {
  intermediateTexture = lazyInitRenderTexture(intermediateTexture);
  destinationTexture = lazyInitRenderTexture(destinationTexture);

  spritesheetPaletteSwop(
    pixiRenderer,
    deactivatedSpritesheetTextureSwops,
    undefined,
    intermediateTexture,
  );

  if (roomColor.shade === "dimmed") {
    spritesheetPaletteSwop(
      pixiRenderer,
      dimSwops,
      intermediateTexture,
      destinationTexture,
    );
  } else {
    spritesheetPaletteSwop(
      pixiRenderer,
      { ambient: ambienceSwops(roomScenery, roomColor) },
      intermediateTexture,
      destinationTexture,
    );
  }

  if (spritesheet === undefined) {
    spritesheet = new Spritesheet(
      destinationTexture.source,
      structuredClone(spritesheetData),
    );
    spritesheet.parseSync();
    spritesheet.textureSource.scaleMode = "nearest";
  }
};

/**
 * NOTE: this is only safe to call after the spritesheet has had load() called
 * and it resolved! - this is a sync export since we need to get the spritesheet
 * inside the update/render loop synchronously many times
 */
export const deactivatedSpritesheetVariant = (): AppSpritesheet => {
  if (spritesheet === undefined) {
    throw new Error(
      `swopped spritesheet undefined - should only be called when we know for sure it is available`,
    );
  }

  return spritesheet;
};
