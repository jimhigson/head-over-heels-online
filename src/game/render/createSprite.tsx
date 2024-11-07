import { AnimatedSprite, PointData, Sprite, Texture } from "pixi.js";
import { spriteSheet, TextureId } from "../../sprites/spriteSheet";
import { originalGameFrameDuration } from "@/originalGame";

type AnimatedCreateSpriteOptions = {
  // animated
  anchor?: PointData;
  pivot?: PointData;
  flipX?: boolean;
  /**
   * if not given, defaults to 12.5 fps, or one frame every other (deinterlaced)
   * zx-spectrum original game frame
   */
  animationSpeed?: number;
  frames: Texture[];
  x?: number;
  y?: number;
};

export type CreateSpriteOptions =
  | TextureId
  | {
      // not animated
      anchor?: PointData;
      pivot?: PointData;
      flipX?: boolean;
      texture: TextureId;
      x?: number;
      y?: number;
    }
  | AnimatedCreateSpriteOptions;

const bottomMiddleDefaultAnchor = { x: 0.5, y: 1 };

const isAnimatedOptions = (
  options: CreateSpriteOptions,
): options is AnimatedCreateSpriteOptions =>
  typeof options !== "string" && Object.hasOwn(options, "frames");

/** utility for creating a sprite while setting several properties on it */
export const createSprite = (options: CreateSpriteOptions): Sprite => {
  if (typeof options === "string") {
    // shortcutted convenience for creating with the texture name and no other options
    return createSprite({ texture: options });
  } else {
    const { anchor, flipX, pivot, x, y } = options;

    let sprite: Sprite;

    if (isAnimatedOptions(options)) {
      sprite = new AnimatedSprite(
        options.frames.map((frame) => ({
          texture: frame,
          time: originalGameFrameDuration,
        })),
      );
      // default animation speed is one frame of animation per twp
      // original game frames (ie, 12.5 fps)
      (sprite as AnimatedSprite).animationSpeed = options.animationSpeed || 0.5;
      (sprite as AnimatedSprite).play();
    } else {
      sprite = new Sprite(spriteSheet.textures[options.texture]);
    }

    if (anchor === undefined && pivot === undefined)
      sprite.anchor = bottomMiddleDefaultAnchor;
    else {
      if (anchor !== undefined) sprite.anchor = anchor;
      if (pivot !== undefined) sprite.pivot = pivot;
    }

    if (x !== undefined) {
      sprite.x = x;
    }

    if (y !== undefined) {
      sprite.y = y;
    }

    sprite.eventMode = "static";
    if (flipX === true) {
      sprite.scale.x = -1;
    }

    return sprite;
  }
};
