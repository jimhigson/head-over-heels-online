import {
  type Color,
  type Filter,
  RenderTexture,
  Sprite,
  Spritesheet,
  Texture,
} from "pixi.js";

import {
  PaletteSwapFilter,
  type PaletteSwopSpec,
} from "../../game/render/filters/PaletteSwapFilter";
import { ShadowPreprocessFilter } from "../../game/render/filters/shadows/ShadowPreprocessFilter";
import { emptyArray } from "../../utils/empty";
import { entries } from "../../utils/entries";
import { concat } from "../../utils/iterators/concat";
import { type NamedColours } from "../../utils/palette/palette";
import { applySpritesheetFlips } from "./applySpritesheetFlips";
import {
  type AppSpritesheet,
  type AppSpritesheetDataWithVariants,
} from "./AppSpritesheet";
import { reifyTextureIds, type TexturesSpecifier } from "./reifyTextureIds";
import { black, renderMaskTexture, white } from "./renderMaskTexture";
import {
  type BaseTextureId,
  makeSpritesheetData,
  type TextureId,
} from "./spritesheetData/makeSpritesheetData";
import { spritesheetMetas } from "./spritesheetData/spritesheetMetaData";
import { type VariantBuildContext } from "./VariantBuildContext";

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
  noReplacePlaceholderTextures?: TexturesSpecifier<BaseTextureId>;
  /** textures whose alpha/red channels should be snapped to binary 0 or 1 */
  hardenAlphaTextureIds?: TextureIdsListOrPredicate;
  /**
   * textures whose alpha-encoded shadow strength should snap to fully opaque
   * wherever it is non-zero - the binary (ZX-style) shadow rendering
   */
  binariseAlphaTextureIds?: TextureIdsListOrPredicate;
};

type TextureIdsListOrPredicate =
  ((candidate: TextureId) => boolean) | Iterable<TextureId>;

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
  return new PaletteSwapFilter(
    { swops, lutType: "sparse" },
    Texture.WHITE,
    false,
  );
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
    hardenAlphaTextureIds,
    binariseAlphaTextureIds,
  }: SpritesheetTextureSwops,
  baseTexture: Texture,
  spritesheetData: AppSpritesheetDataWithVariants,
  originalSpritesheet: AppSpritesheet,
  /** render into this texture instead of creating one (eg an atlas) */
  target?: RenderTexture,
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
      false,
    );

    filters.push(textureFilter);
  }

  if (hardenAlphaTextureIds !== undefined) {
    const hardenMask = renderMaskTexture(pixiRenderer, {
      rects: {
        textureIds: hardenAlphaTextureIds,
        color: white,
        spritesheetDataFrames: spritesheetData.frames,
      },
      clearColour: black,
    });
    filters.push(new ShadowPreprocessFilter("hardenChannels", hardenMask));
  }

  if (binariseAlphaTextureIds !== undefined) {
    const binariseMask = renderMaskTexture(pixiRenderer, {
      rects: {
        textureIds: binariseAlphaTextureIds,
        color: white,
        spritesheetDataFrames: spritesheetData.frames,
      },
      clearColour: black,
    });
    filters.push(new ShadowPreprocessFilter("binariseAlpha", binariseMask));
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
          originalSpritesheet,
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
      false,
    );
    filters.push(paletteSwopFilter);
  }

  // construct a scene of the original with the filters applied
  const sprite = new Sprite(baseTexture);
  sprite.filters = filters;

  // an atlas target can be taller than the base texture (a variant strip
  // below the base layout); the filters only affect the sprite's own bounds
  const swoppedTexture =
    target ??
    RenderTexture.create({
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
    } else if (filter instanceof ShadowPreprocessFilter) {
      filter.destroy({ destroyMask: true });
    } else {
      // false = do not destroy the programs - the filter will need to be used again!
      filter.destroy(false);
    }
  }

  return swoppedTexture;
};

export const createSwoppedSpritesheet = (
  context: Pick<
    VariantBuildContext,
    "pixiRenderer" | "spriteOption" | "spritesheetMetaData"
  >,
  spritesheetTextureSwops: SpritesheetTextureSwops,
  baseTexture: Texture,
  originalSpritesheet: AppSpritesheet,
  /**
   * bake into an atlas instead of a base-sized sheet: `data` has the variant
   * frame entries re-pointed at their packed strip rects, and `target` is
   * tall enough to hold the strip below the base layout
   */
  atlas?: { data: AppSpritesheetDataWithVariants; target: RenderTexture },
) => {
  const { spriteOption } = context;
  const spritesheetData =
    atlas?.data ?? makeSpritesheetData(spritesheetMetas[spriteOption]);
  const swoppedTexture = spritesheetPaletteSwop(
    context,
    spritesheetTextureSwops,
    baseTexture,
    spritesheetData,
    originalSpritesheet,
    atlas?.target,
  );
  const swoppedSpritesheet = new Spritesheet(
    swoppedTexture.source,
    spritesheetData,
  ) as AppSpritesheet;
  swoppedSpritesheet.parseSync();
  swoppedSpritesheet.textureSource.scaleMode = "nearest";
  swoppedSpritesheet.spriteOption = spriteOption;
  swoppedSpritesheet.ambient = spritesheetTextureSwops.ambient;
  swoppedSpritesheet.spritesheetMeta = spritesheetMetas[spriteOption];
  applySpritesheetFlips(swoppedSpritesheet);
  return swoppedSpritesheet;
};
