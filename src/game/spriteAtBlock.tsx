import { Sprite } from "pixi.js";
import {
  type TextureId,
  pixiSpriteSheet,
  blockSizePx,
} from "../sprites/pixiSpriteSheet";
import { SpriteAtBlockOptions, projectToScreen } from "./renderWorld";

export const spriteAtBlock = (
  { x, y, z = 0 }: { x: number; y: number; z?: number },
  textureId: TextureId,
  { anchor, flipX, pivot, giveZIndex }: SpriteAtBlockOptions,
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
