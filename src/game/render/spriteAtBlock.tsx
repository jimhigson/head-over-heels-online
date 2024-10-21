import { Sprite } from "pixi.js";
import {
  blockSizePx,
  pixiSpriteSheet,
  TextureId,
} from "../../sprites/pixiSpriteSheet";
import { projectToScreen } from "./projectToScreen";
import { ItemAppearance } from "../../ItemAppearances";
import { ItemType } from "../../Item";

export type RenderItemOptions = {
  /**
   * if set, will give the sprite a z-index. this isn't needed for sprites that
   * can render themselves in a known-good order - ie, back-to-front
   */
  giveZIndex?: boolean;
};

type SpriteAppearance = Omit<ItemAppearance<ItemType>, "textureId"> & {
  textureId: TextureId;
};

export const spriteAtBlock = (
  { x, y, z = 0 }: { x: number; y: number; z?: number },
  { textureId, anchor, flipX, pivot }: SpriteAppearance,
  { giveZIndex }: RenderItemOptions = { giveZIndex: false },
): Sprite => {
  const sprite = new Sprite(pixiSpriteSheet.textures[textureId]);
  if (anchor !== undefined) sprite.anchor = anchor;
  if (pivot !== undefined) sprite.pivot = pivot;

  const projection = projectToScreen(
    x * blockSizePx.w,
    y * blockSizePx.d,
    z * blockSizePx.h,
  );

  sprite.x = projection.x;
  sprite.y = projection.y;
  if (giveZIndex) sprite.zIndex = projection.z;

  sprite.eventMode = "static";
  sprite.on("click", () => {
    console.log(
      `tile (xB=${x}) (yB=${y}) xpx=${projection.x} ypx=${projection.y} tex=${textureId}`,
    );
  });

  //sprite.zIndex = pos.z * 1024 +
  if (flipX === true) {
    sprite.scale.x = -1;
  }

  return sprite;
};
