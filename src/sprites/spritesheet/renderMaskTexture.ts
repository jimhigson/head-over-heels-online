import type { ContainerChild, Renderer } from "pixi.js";

import { Color, Container, Graphics, RenderTexture, Sprite } from "pixi.js";

import type { PaletteSwapFilter } from "../../game/render/filters/PaletteSwapFilter";
import type { AppSpritesheet, AppSpritesheetData } from "./loadedSpriteSheet";
import type { TextureId } from "./spritesheetData/spriteSheetData";

import { reifyTextureIds } from "./reifyTextureIds";
import { spritesheetSize } from "./spritesheetData/spriteSheetData";

export const black = new Color(0x000000);
export const white = new Color(0xffffff);

type TextureIdsListOrPredicate =
  | ((candidate: TextureId) => boolean)
  | Iterable<TextureId>;

export type RenderMaskTextureOptions = {
  /**
   * if given, masks out the rectangles of the given textures
   */
  rects?: {
    /** either a list of texture ids, or the criteria for a texture id being selected to filter */
    textureIds: TextureIdsListOrPredicate;
    color: Color;
    /** the frames that define the rects for the given textureIds */
    spritesheetDataFrames: AppSpritesheetData["frames"];
  };
  /**
   * where to mask out only the placeholder colours - this is useful if the game engine needs to replace the
   * placeholders multiple different ways in a single room, ie for doors taking on the colour of the room
   * that they lead to
   */
  placeholderColoursMasks?: {
    textureIds: TextureIdsListOrPredicate;
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
    const { spritesheetDataFrames } = rects;
    const { textureIds: textureIdsOrPredicate, color } = rects;

    const maskedTextureIds = reifyTextureIds(
      textureIdsOrPredicate,
      spritesheetDataFrames,
    );

    for (const tid of maskedTextureIds) {
      const {
        frame: { x, y, w, h },
      } = spritesheetDataFrames[tid];
      graphics.rect(x, y, w, h).fill(color);
    }
  }

  if (placeholderColoursMasks !== undefined) {
    const { textureIds, filter, originalSpritesheet } = placeholderColoursMasks;

    for (const tid of reifyTextureIds(
      textureIds,
      originalSpritesheet.data.frames,
    )) {
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
