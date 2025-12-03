import type { ContainerChild, Filter, Renderer as PixiRenderer } from "pixi.js";

import { Color } from "pixi.js";
import {
  Container,
  Graphics,
  RenderTexture,
  Sprite,
  type Texture,
} from "pixi.js";

import type { PaletteSwaps } from "../../game/render/filters/lutTexture/sparseLut";
import type { PaletteSwopSpec } from "../../game/render/filters/PaletteSwapFilter";
import type { TextureId } from "./spritesheetData/spriteSheetData";

import { spritesheetPalette } from "../../../gfx/spritesheetPalette";
import { PaletteSwapFilter } from "../../game/render/filters/PaletteSwapFilter";
import { emptyArray } from "../../utils/empty";
import { transformObject } from "../../utils/entries";
import { iterate } from "../../utils/iterate";
import { baseSpritesheetTexture, loadedSpriteSheet } from "./loadedSpriteSheet";
import {
  spritesheetData,
  spritesheetSize,
  textureIds,
} from "./spritesheetData/spriteSheetData";

export type TextureSpecificPaletteSwops = {
  textureIds: TextureId[];
  paletteSwaps: PaletteSwaps;
};

export type SpritesheetTextureSwops = {
  ambient: Array<PaletteSwopSpec>;
  textureSpecific?: Array<TextureSpecificPaletteSwops>;
  noReplacePlaceholderTextures?: TextureId[];
};

export const noopSpritesheetTextureSwops = {
  ambient: [],
};

const black = new Color(0x000000);
const white = new Color(0xffffff);

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

type RenderMaskTextureOptions = {
  rects?: {
    textureIds: TextureId[];
    color: Color;
  };
  /**
   * where to mask out only the placeholder colours - this is useful if the game engine needs to replace the
   * placeholders multiple different ways in a single room, ie for doors taking on the colour of the room
   * that they lead to
   */
  placeholderMasks?: {
    textureIds: TextureId[];
    placeholder: Color;
    /** colour to write over all non-placeholder colours */
    others: Color;
  };
  clearColour?: Color;
};

const renderMaskTexture = (
  pixiRenderer: PixiRenderer,
  { rects, placeholderMasks, clearColour }: RenderMaskTextureOptions,
): RenderTexture => {
  const graphics = new Graphics();
  const scene: Container<ContainerChild> = new Container({
    children: [graphics],
  });

  if (clearColour !== undefined) {
    graphics.rect(0, 0, spritesheetSize.w, spritesheetSize.h).fill(clearColour);
  }

  if (rects !== undefined) {
    const { textureIds, color } = rects;

    for (const tid of textureIds) {
      const {
        frame: { x, y, w, h },
      } = spritesheetData.frames[tid];
      graphics.rect(x, y, w, h).fill(color);
    }
  }

  if (placeholderMasks !== undefined) {
    const { textureIds, placeholder, others } = placeholderMasks;

    const filter = new PaletteSwapFilter({
      paletteSwaps: transformObject(spritesheetPalette, ([name]) => {
        if (name === "replaceDark" || name === "replaceLight") {
          return [name, placeholder];
        } else {
          return [name, others];
        }
      }),
      lutType: "sparse",
    });

    for (const tid of textureIds) {
      const original = loadedSpriteSheet();
      const maskSprite = new Sprite({
        texture: original.textures[tid],
        x: original.data.frames[tid].frame.x,
        y: original.data.frames[tid].frame.y,
        filters: filter,
      });
      scene.addChild(maskSprite);
    }
  }

  const texture = RenderTexture.create({
    width: spritesheetSize.w,
    height: spritesheetSize.h,
  });
  pixiRenderer.render({ container: scene, target: texture });

  return texture;
};

export const spritesheetPaletteSwop = (
  pixiRenderer: PixiRenderer,
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
): Texture => {
  const baseTexture = baseSpritesheetTexture();

  const filters: Filter[] = [];

  // Create texture-specific filters with masks that only apply to their frame rectangles
  for (const { textureIds, paletteSwaps } of textureSpecific) {
    // Create mask to apply swops only to this texture:
    const specificMaskTexture = renderMaskTexture(pixiRenderer, {
      rects: { textureIds, color: white },
      clearColour: black,
    });

    const textureFilter = new PaletteSwapFilter(
      { paletteSwaps, lutType: "sparse" },
      specificMaskTexture,
    );

    filters.push(textureFilter);
  }

  // Draw black rectangles over shadow/shadowMask/hud frames (filter does not apply)
  const doNotFilterTexture = renderMaskTexture(pixiRenderer, {
    clearColour: white,
    rects: { textureIds: neverSwoppedTextureIds, color: black },
    placeholderMasks: {
      textureIds: noReplacePlaceholderTextures,
      placeholder: black,
      others: white,
    },
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

  /*
  Promise.all([
    textureToConsoleArgs(pixiRenderer, doNotFilterTexture, 1024),
    textureToConsoleArgs(pixiRenderer, swoppedTexture, 1024),
  ]).then(([args1, args2]) => {
    console.group("setSpritesheetPaletteSwops: created swoppedTexture:");
    console.log(...args1);
    console.log(...args2);
    console.groupEnd();
  });
  */

  /////////////
  // CLEANUP //
  /////////////

  // false = do not destroy the unswopped base texture
  sprite.destroy(false);
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
