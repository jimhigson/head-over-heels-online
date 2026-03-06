import type { Color, Filter, Renderer } from "pixi.js";

import { concat } from "iter-tools-es";
import { RenderTexture, Sprite, Spritesheet, Texture } from "pixi.js";

import type { PaletteSwaps } from "../../game/render/filters/lutTexture/sparseLut";
import type { PaletteSwopSpec } from "../../game/render/filters/PaletteSwapFilter";
import type { AppSpritesheet } from "./loadedSpriteSheet";
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
import { black, renderMaskTexture, white } from "./renderMaskTexture";
import {
  spritesheetData,
  spritesheetSize,
  textureIds,
} from "./spritesheetData/spriteSheetData";

export type TextureSpecificPaletteSwops = {
  textureIds: TextureIdsListOrPredicate;
  paletteSwaps: PaletteSwaps;
  /** if true, the ambient swops won't apply on top of the swops given for this texture */
  dodgeAmbient?: boolean;
};

export type SpritesheetTextureSwops = {
  ambient: PaletteSwopSpec;
  textureSpecific?: Array<TextureSpecificPaletteSwops>;
  noReplacePlaceholderTextures?: TextureId[];
};

export const noopSpritesheetTextureSwops: SpritesheetTextureSwops = {
  ambient: { paletteSwaps: {}, lutType: "sparse" },
};

type TextureIdsListOrPredicate =
  | ((candidate: TextureId) => boolean)
  | Iterable<TextureId>;

const neverSwoppedTextureIds = iterate(textureIds)
  .filter(
    (
      name,
    ): name is TextureId & `${"hud" | "shadow" | "shadowMask"}.${string}` => {
      return (
        name.startsWith("shadow.") ||
        name.startsWith("shadowMask.") ||
        name.startsWith("hud.")
      );
    },
  )
  .toArray();

const reifyTextureIds = (
  textureIdsOrPredicate: TextureIdsListOrPredicate,
): Iterable<TextureId> =>
  typeof textureIdsOrPredicate === "function" ?
    iterate(textureIds).filter(textureIdsOrPredicate)
  : textureIdsOrPredicate;

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

/** Lazy-growing array of reusable mask textures for texture-specific filters */
const reusableTextureSpecificMasks: RenderTexture[] = [];
let ambientMasksBuffer: RenderTexture | undefined = undefined;

/** Reusable ambient filter — lazily created, updated via updateLut on subsequent calls */
let reusableAmbientFilter: PaletteSwapFilter | undefined = undefined;
/** Lazy-growing array of reusable texture-specific filters */
const reusableTextureSpecificFilters: PaletteSwapFilter[] = [];

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
    noReplacePlaceholderTextures = emptyArray,
  }: SpritesheetTextureSwops,
  baseTexture: Texture = baseSpritesheetTexture(),
  destinationTexture: RenderTexture = RenderTexture.create({
    width: baseTexture.width,
    height: baseTexture.height,
  }),
): Texture => {
  if (ambientMasksBuffer === undefined) {
    ambientMasksBuffer = RenderTexture.create({
      width: spritesheetSize.w,
      height: spritesheetSize.h,
      format: "r8unorm",
    });
  }

  const filters: Filter[] = [];

  // Create or reuse texture-specific filters with masks that only apply to their frame rectangles
  for (let i = 0; i < textureSpecific.length; i++) {
    const { textureIds, paletteSwaps } = textureSpecific[i];
    const spec: PaletteSwopSpec = { paletteSwaps, lutType: "sparse" };

    if (i >= reusableTextureSpecificMasks.length) {
      reusableTextureSpecificMasks.push(
        RenderTexture.create({
          width: spritesheetSize.w,
          height: spritesheetSize.h,
          format: "r8unorm",
        }),
      );
    }

    const specificMaskTexture = renderMaskTexture(
      pixiRenderer,
      {
        rects: { textureIds, color: white },
        clearColour: black,
      },
      reusableTextureSpecificMasks[i],
    );

    if (i < reusableTextureSpecificFilters.length) {
      const existing = reusableTextureSpecificFilters[i];
      existing.updateLut(spec);
      existing.maskTexture = specificMaskTexture;
      filters.push(existing);
    } else {
      const textureFilter = new PaletteSwapFilter(spec, specificMaskTexture);
      reusableTextureSpecificFilters.push(textureFilter);
      filters.push(textureFilter);
    }
  }

  // Draw black rectangles over shadow/shadowMask/hud frames (filter does not apply)
  const placeholderMaskFilter =
    noReplacePlaceholderTextures.length > 0 ?
      createPlaceholderMaskFilter(black, white)
    : undefined;

  renderMaskTexture(
    pixiRenderer,
    {
      clearColour: white,
      rects: {
        textureIds: concat(
          neverSwoppedTextureIds,
          iterate(textureSpecific)
            .filter(({ dodgeAmbient }) => dodgeAmbient)
            .flatMap(({ textureIds }) => reifyTextureIds(textureIds)),
        ),
        color: black,
      },
      placeholderColoursMasks:
        placeholderMaskFilter ?
          {
            textureIds: noReplacePlaceholderTextures,
            placeholder: black,
            others: white,
            filter: placeholderMaskFilter,
            originalSpritesheet: originalSpriteSheet(),
          }
        : undefined,
    },
    ambientMasksBuffer,
  );

  placeholderMaskFilter?.destroy({
    destroyLutTexture: true,
  });

  if (reusableAmbientFilter === undefined) {
    reusableAmbientFilter = new PaletteSwapFilter(ambient, ambientMasksBuffer);
  } else {
    reusableAmbientFilter.updateLut(ambient);
    reusableAmbientFilter.maskTexture = ambientMasksBuffer;
  }
  filters.push(reusableAmbientFilter);

  // construct a scene of the original with the filters applied
  const sprite = new Sprite(baseTexture);
  sprite.filters = filters;

  pixiRenderer.render({
    container: sprite,
    target: destinationTexture,
    clear: true,
  });

  // false = do not destroy the unswopped base texture or the reusable filters
  sprite.destroy(false);

  return destinationTexture;
};

export const createSpritesheetVariant = (
  pixiRenderer: Renderer,
  spritesheetTextureSwops: SpritesheetTextureSwops,
  baseTexture?: Texture,
) => {
  const swoppedTexture = spritesheetPaletteSwop(
    pixiRenderer,
    spritesheetTextureSwops,
    baseTexture,
  );
  const swoppedSpritesheet = new Spritesheet(
    swoppedTexture.source,
    structuredClone(spritesheetData),
  );
  swoppedSpritesheet.parseSync();
  swoppedSpritesheet.textureSource.scaleMode = "nearest";
  return swoppedSpritesheet;
};

export const dimSwops: SpritesheetTextureSwops = {
  ambient: { paletteSwaps: spritesheetPaletteDim, lutType: "sparse" },
};

/**
 * Applies dim palette swaps to an existing spritesheet variant, creating a new
 * dimmed version. The base spritesheet is destroyed after the dimmed version is created.
 */
export const replaceSpritesheetWithSwopped = (
  pixiRenderer: Renderer,
  baseSpritesheet: AppSpritesheet,
  swops: SpritesheetTextureSwops,
): AppSpritesheet => {
  const baseTexture = Texture.from(baseSpritesheet.textureSource);
  const dimmedSpritesheet = createSpritesheetVariant(
    pixiRenderer,
    swops,
    baseTexture,
  );
  baseTexture.destroy();
  baseSpritesheet.textureSource.destroy();
  baseSpritesheet.destroy(true);
  return dimmedSpritesheet;
};
