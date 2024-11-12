import type { PointData, Texture } from "pixi.js";
import { AnimatedSprite, Sprite } from "pixi.js";
import type { TextureId } from "../../sprites/spriteSheet";
import { spriteSheet } from "../../sprites/spriteSheet";
import { originalGameFrameDuration } from "@/originalGame";
import { defaultAnimationSpeed } from "./animationTimings";

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
  /**
   * If true, will play once and vanish. Otherwise, (by default) will loop
   * indefinitely
   */
  playOnce?: boolean;
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
      sprite = createAnimatedSprite(options);
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
function createAnimatedSprite(options: AnimatedCreateSpriteOptions) {
  const animatedSprite = new AnimatedSprite(
    options.frames.map((frame) => ({
      texture: frame,
      time: originalGameFrameDuration,
    })),
  );

  animatedSprite.animationSpeed =
    options.animationSpeed || defaultAnimationSpeed;
  animatedSprite.play();
  if (options.playOnce) {
    animatedSprite.loop = false;
    animatedSprite.onComplete = () => {
      animatedSprite.stop();
      animatedSprite.visible = false;
    };
  }
  return animatedSprite;
}
