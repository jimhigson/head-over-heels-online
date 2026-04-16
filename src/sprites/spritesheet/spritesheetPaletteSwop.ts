import type { Color, Filter } from "pixi.js";

import { RenderTexture, Sprite, Spritesheet, Texture } from "pixi.js";

import type { PaletteSwopSpec } from "../../game/render/filters/PaletteSwapFilter";
import type { NamedColours } from "../../utils/palette/palette";
import type { AppSpritesheet, AppSpritesheetData } from "./loadedSpriteSheet";
import type { TextureId } from "./spritesheetData/makeSpritesheetData";
import type { SpritesheetMetadata } from "./spritesheetData/spritesheetMetaData";
import type { VariantBuildContext } from "./VariantBuildContext";

import { PaletteSwapFilter } from "../../game/render/filters/PaletteSwapFilter";
import { emptyArray } from "../../utils/empty";
import { entries } from "../../utils/entries";
import { concat } from "../../utils/iterators/concat";
import { resolveSwops } from "../../utils/palette/palette";
import {
  baseSpritesheetTexture,
  originalSpriteSheet,
} from "./loadedSpriteSheet";
import { reifyTextureIds } from "./reifyTextureIds";
import { black, renderMaskTexture, white } from "./renderMaskTexture";
import { makeSpritesheetData } from "./spritesheetData/makeSpritesheetData";
import { spritesheetMetas } from "./spritesheetData/spritesheetMetaData";

export type TextureSpecificPaletteSwops = {
  textureIds: TextureIdsListOrPredicate;
  swops: Map<Color, Color>;
  /** if true, the ambient swops won't apply on top of the swops given for this texture */
  dodgeAmbient?: boolean;
};

/**
 * top-level spec for the swops to be done to a spritesheet to create a variant
 */
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

const createPlaceholderMaskFilter = (
  placeholderColoursReplacedWith: Color,
  otherColoursReplacedWith: Color,
  palette: NamedColours<string>,
) => {
  const swops = new Map<Color, Color>();
  for (const [name, colour] of entries(palette)) {
    swops.set(
      colour,
      name === "replaceDark" || name === "replaceLight" ?
        placeholderColoursReplacedWith
      : otherColoursReplacedWith,
    );
  }
  return new PaletteSwapFilter({ swops, lutType: "sparse" });
};

const spritesheetPaletteSwop = (
  context: Pick<VariantBuildContext, "pixiRenderer" | "spritesheetMetaData">,
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
  const { pixiRenderer, spritesheetMetaData } = context;
  const filters: Filter[] = [];

  // Create texture-specific filters with masks that only apply to their frame rectangles
  for (const { textureIds, swops } of textureSpecific) {
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
      { swops, lutType: "sparse" },
      specificMaskTexture,
    );

    filters.push(textureFilter);
  }

  // Draw black rectangles over shadow/shadowMask/hud frames (filter does not apply)
  const placeholderMaskFilter =
    noReplacePlaceholderTextures !== undefined ?
      createPlaceholderMaskFilter(black, white, spritesheetMetaData.palette)
    : undefined;

  const doNotFilterTexture = renderMaskTexture(pixiRenderer, {
    clearColour: white,
    rects: {
      textureIds: concat(
        reifyTextureIds(isNeverSwoppedTextureId, spritesheetData.frames),
        Iterator.from(textureSpecific)
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
  context: Pick<
    VariantBuildContext,
    "pixiRenderer" | "spriteOption" | "spritesheetMetaData"
  >,
  spritesheetTextureSwops: SpritesheetTextureSwops,
  baseTexture?: Texture,
) => {
  const { spriteOption } = context;
  const spritesheetData = makeSpritesheetData(spritesheetMetas[spriteOption]);
  const swoppedTexture = spritesheetPaletteSwop(
    context,
    spritesheetTextureSwops,
    baseTexture,
    spritesheetData,
  );
  const swoppedSpritesheet = new Spritesheet(
    swoppedTexture.source,
    spritesheetData,
  ) as AppSpritesheet;
  swoppedSpritesheet.parseSync();
  swoppedSpritesheet.textureSource.scaleMode = "nearest";
  swoppedSpritesheet.spriteOption = spriteOption;
  swoppedSpritesheet.ambient = spritesheetTextureSwops.ambient;
  return swoppedSpritesheet;
};

/** dim swops for any spritesheet meta with a palette and paletteDim
 * - creates a SpritesheetTextureSwops that replaces the palette colours
 * with their dimmed variation
 */
export const ambientDimSwops = <PaletteColourName extends string>(
  spritesheetMeta: SpritesheetMetadata<PaletteColourName>,
): SpritesheetTextureSwops | undefined => {
  if (spritesheetMeta.paletteDim === undefined) {
    // this skin does not support dim swops:
    return undefined;
  }

  return {
    ambient: [
      {
        swops: resolveSwops(
          spritesheetMeta.palette,
          spritesheetMeta.paletteDim,
        ),
        lutType: "sparse",
      },
    ],
  };
};

/**
 * Applies palette swaps to an existing spritesheet variant, creating a new
 * swopped version. The base spritesheet is destroyed after the new version is created.
 */
export const replaceSpritesheetWithSwopped = (
  context: Pick<
    VariantBuildContext,
    "pixiRenderer" | "spriteOption" | "spritesheetMetaData"
  >,
  baseSpritesheet: AppSpritesheet,
  swops: SpritesheetTextureSwops,
): AppSpritesheet => {
  const baseTexture = Texture.from(baseSpritesheet.textureSource);
  const swoppedSpritesheet = createSpritesheetVariant(
    context,
    swops,
    baseTexture,
  );
  baseTexture.destroy();
  baseSpritesheet.textureSource.destroy();
  baseSpritesheet.destroy(true);
  return swoppedSpritesheet;
};
