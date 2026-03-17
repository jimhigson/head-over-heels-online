import type { Color, Filter, Renderer } from "pixi.js";

import { concat } from "iter-tools-es";
import { RenderTexture, Sprite, Spritesheet, Texture } from "pixi.js";

import type { PaletteSwaps } from "../../game/render/filters/lutTexture/sparseLut";
import type { PaletteSwopSpec } from "../../game/render/filters/PaletteSwapFilter";
import type { AppSpritesheet, AppSpritesheetData } from "./loadedSpriteSheet";
import type { LoadableSpriteOption } from "./loadedSpriteSheet";
import type { TextureId } from "./spritesheetData/spriteSheetData";

import { PaletteSwapFilter } from "../../game/render/filters/PaletteSwapFilter";
import { emptyArray } from "../../utils/empty";
import { iterate } from "../../utils/iterate";
import { transformObject } from "../../utils/transformObject";
import {
  spritesheetPalette,
  spritesheetPaletteDim,
} from "../palette/spritesheetPalette";
import {
  baseSpritesheetTexture,
  originalSpriteSheet,
} from "./loadedSpriteSheet";
import { reifyTextureIds } from "./reifyTextureIds";
import { black, renderMaskTexture, white } from "./renderMaskTexture";
import { makeSpritesheetData } from "./spritesheetData/spriteSheetData";
import { spritesheetMetas } from "./spritesheetData/spritesheetMetas";

export type TextureSpecificPaletteSwops = {
  textureIds: TextureIdsListOrPredicate;
  paletteSwaps: PaletteSwaps;
  /** if true, the ambient swops won't apply on top of the swops given for this texture */
  dodgeAmbient?: boolean;
};

export type SpritesheetTextureSwops = {
  ambient: Array<PaletteSwopSpec>;
  textureSpecific?: Array<TextureSpecificPaletteSwops>;
  noReplacePlaceholderTextures?: TextureIdsListOrPredicate;
};

export const noopSpritesheetTextureSwops = {
  ambient: [],
};

type TextureIdsListOrPredicate =
  | ((candidate: TextureId) => boolean)
  | Iterable<TextureId>;

const isNeverSwoppedTextureId = (
  name: TextureId,
): name is TextureId & `${"hud" | "shadow" | "shadowMask"}.${string}` =>
  name.startsWith("shadow.") ||
  name.startsWith("shadowMask.") ||
  name.startsWith("hud.");

const createPlaceholderMaskFilter = (placeholder: Color, others: Color) =>
  new PaletteSwapFilter({
    paletteSwaps: transformObject(spritesheetPalette, ([name]) => {
      if (name === "replaceDark" || name === "replaceLight") {
        return [name, placeholder];
      } else {
        return [name, others];
      }
    }),
    lutType: "sparse",
  });

export const spritesheetPaletteSwop = (
  pixiRenderer: Renderer,
  {
    ambient,
    textureSpecific = emptyArray,
    /**
     * a list of textures where we should prevent placeholder colours from being replaced.
     * This is useful if the game engine needs to replace the placeholders multiple different ways
     * in a single room, ie for doors taking on the colour of the room that they lead to
     */
    noReplacePlaceholderTextures,
  }: SpritesheetTextureSwops,
  baseTexture: Texture = baseSpritesheetTexture(),
  spritesheetData: AppSpritesheetData,
): Texture => {
  const filters: Filter[] = [];

  // Create texture-specific filters with masks that only apply to their frame rectangles
  for (const { textureIds, paletteSwaps } of textureSpecific) {
    // Create mask to apply swops only to this texture:
    const specificMaskTexture = renderMaskTexture(pixiRenderer, {
      rects: {
        textureIds,
        color: white,
        spritesheetDataFrames: spritesheetData.frames,
      },
      clearColour: black,
    });

    const textureFilter = new PaletteSwapFilter(
      { paletteSwaps, lutType: "sparse" },
      specificMaskTexture,
    );

    filters.push(textureFilter);
  }

  // Draw black rectangles over shadow/shadowMask/hud frames (filter does not apply)
  const placeholderMaskFilter =
    noReplacePlaceholderTextures !== undefined ?
      createPlaceholderMaskFilter(black, white)
    : undefined;

  const doNotFilterTexture = renderMaskTexture(pixiRenderer, {
    clearColour: white,
    rects: {
      textureIds: concat(
        reifyTextureIds(isNeverSwoppedTextureId, spritesheetData.frames),
        iterate(textureSpecific)
          .filter(({ dodgeAmbient }) => dodgeAmbient)
          .flatMap(({ textureIds }) =>
            reifyTextureIds(textureIds, spritesheetData.frames),
          ),
      ),
      color: black,
      spritesheetDataFrames: spritesheetData.frames,
    },
    placeholderColoursMasks:
      placeholderMaskFilter && noReplacePlaceholderTextures ?
        {
          textureIds: noReplacePlaceholderTextures,
          placeholder: black,
          others: white,
          filter: placeholderMaskFilter,
          originalSpritesheet: originalSpriteSheet(),
        }
      : undefined,
  });

  placeholderMaskFilter?.destroy({
    destroyLutTexture: true,
    destroyMask: true,
  });

  for (const globalSpec of ambient) {
    const paletteSwopFilter = new PaletteSwapFilter(
      globalSpec,
      doNotFilterTexture,
    );
    filters.push(paletteSwopFilter);
  }

  // construct a scene of the original with the filters applied
  const sprite = new Sprite(baseTexture);
  sprite.filters = filters;

  const swoppedTexture = RenderTexture.create({
    width: baseTexture.width,
    height: baseTexture.height,
  });

  pixiRenderer.render({
    container: sprite,
    target: swoppedTexture,
  });

  // Promise.all([
  //   textureToConsoleArgs(doNotFilterTexture.source, pixiRenderer, 1024),
  //   textureToConsoleArgs(swoppedTexture.source, pixiRenderer, 1024),
  // ]).then(([args1, args2]) => {
  //   console.group("setSpritesheetPaletteSwops: created swoppedTexture:");
  //   console.log(...args1);
  //   console.log(...args2);
  //   console.groupEnd();
  // });

  /////////////
  // CLEANUP //
  /////////////

  // false = do not destroy the unswopped base texture
  sprite.destroy(false);
  doNotFilterTexture.destroy();
  for (const filter of filters) {
    // true = do destroy the filter's LUT texture and mask
    if (filter instanceof PaletteSwapFilter) {
      filter.destroy({
        destroyLutTexture: true,
        destroyMask: true,
        destroyPrograms: false,
      });
    } else {
      // false = do not destroy the programs - the filter will need to be used again!
      filter.destroy(false);
    }
  }

  return swoppedTexture;
};

export const createSpritesheetVariant = (
  pixiRenderer: Renderer,
  spritesheetTextureSwops: SpritesheetTextureSwops,
  spriteOption: LoadableSpriteOption,
  baseTexture?: Texture,
) => {
  const spritesheetData = makeSpritesheetData(spritesheetMetas[spriteOption]);
  const swoppedTexture = spritesheetPaletteSwop(
    pixiRenderer,
    spritesheetTextureSwops,
    baseTexture,
    spritesheetData,
  );
  const swoppedSpritesheet = new Spritesheet(
    swoppedTexture.source,
    spritesheetData,
  );
  swoppedSpritesheet.parseSync();
  swoppedSpritesheet.textureSource.scaleMode = "nearest";
  return swoppedSpritesheet;
};

export const dimSwops: SpritesheetTextureSwops = {
  ambient: [{ paletteSwaps: spritesheetPaletteDim, lutType: "sparse" }],
};

/**
 * Applies dim palette swaps to an existing spritesheet variant, creating a new
 * dimmed version. The base spritesheet is destroyed after the dimmed version is created.
 */
export const replaceSpritesheetWithSwopped = (
  pixiRenderer: Renderer,
  baseSpritesheet: AppSpritesheet,
  swops: SpritesheetTextureSwops,
  spriteOption: LoadableSpriteOption,
): AppSpritesheet => {
  const baseTexture = Texture.from(baseSpritesheet.textureSource);
  const dimmedSpritesheet = createSpritesheetVariant(
    pixiRenderer,
    swops,
    spriteOption,
    baseTexture,
  );
  baseTexture.destroy();
  baseSpritesheet.textureSource.destroy();
  baseSpritesheet.destroy(true);
  return dimmedSpritesheet;
};
