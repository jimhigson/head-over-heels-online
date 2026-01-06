import type { ContainerChild, Renderer } from "pixi.js";

import { Color, Container, Graphics, RenderTexture, Sprite } from "pixi.js";

import type { PaletteSwapFilter } from "../../game/render/filters/PaletteSwapFilter";
import type { AppSpritesheet } from "./loadedSpriteSheet";
import type { TextureId } from "./spritesheetData/spriteSheetData";

import { iterate } from "../../utils/iterate";
import {
  spritesheetData,
  spritesheetSize,
  textureIds,
} from "./spritesheetData/spriteSheetData";

export const black = new Color(0x000000);
export const white = new Color(0xffffff);

type TextureIdsListOrPredicate =
  | ((candidate: TextureId) => boolean)
  | Iterable<TextureId>;

export type RenderMaskTextureOptions = {
  rects?: {
    /** either a list of texture ids, or the criteria for a texture id being selected to filter */
    textureIds: TextureIdsListOrPredicate;
    color: Color;
  };
  /**
   * where to mask out only the placeholder colours - this is useful if the game engine needs to replace the
   * placeholders multiple different ways in a single room, ie for doors taking on the colour of the room
   * that they lead to
   */
  placeholderColoursMasks?: {
    textureIds: TextureId[];
    /** the colours write over the placeholder colours */
    placeholder: Color;
    /** colour to write over all non-placeholder colours */
    others: Color;
    /** filter to apply for placeholder masking */
    filter: PaletteSwapFilter;
    /** the original spritesheet to get textures from */
    originalSpritesheet: AppSpritesheet;
  };
  /** colour for the background of the texture */
  clearColour?: Color;
};

const reifyTextureIds = (
  textureIdsOrPredicate: TextureIdsListOrPredicate,
): Iterable<TextureId> => {
  return typeof textureIdsOrPredicate === "function" ?
      iterate(textureIds).filter(textureIdsOrPredicate)
    : textureIdsOrPredicate;
};

export const renderMaskTexture = (
  pixiRenderer: Renderer,
  { rects, placeholderColoursMasks, clearColour }: RenderMaskTextureOptions,
): RenderTexture => {
  const graphics = new Graphics();
  const scene: Container<ContainerChild> = new Container({
    children: [graphics],
  });

  if (clearColour !== undefined) {
    graphics.rect(0, 0, spritesheetSize.w, spritesheetSize.h).fill(clearColour);
  }

  if (rects !== undefined) {
    const { textureIds: textureIdsOrPredicate, color } = rects;

    const maskedTextureIds = reifyTextureIds(textureIdsOrPredicate);

    for (const tid of maskedTextureIds) {
      const {
        frame: { x, y, w, h },
      } = spritesheetData.frames[tid];
      graphics.rect(x, y, w, h).fill(color);
    }
  }

  if (
    placeholderColoursMasks !== undefined &&
    placeholderColoursMasks.textureIds.length > 0
  ) {
    const { textureIds, filter, originalSpritesheet } = placeholderColoursMasks;

    for (const tid of textureIds) {
      const maskSprite = new Sprite({
        texture: originalSpritesheet.textures[tid],
        x: originalSpritesheet.data.frames[tid].frame.x,
        y: originalSpritesheet.data.frames[tid].frame.y,
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
