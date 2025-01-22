import type {
  AnimatedSpriteFrames,
  Filter,
  PointData,
  SpritesheetFrameData,
} from "pixi.js";
import { AnimatedSprite, Sprite } from "pixi.js";
import {
  spritesheetData,
  type AnimationId,
  type TextureId,
} from "../../sprites/spriteSheetData";
import { spriteSheet } from "../../sprites/spriteSheet";
import { originalGameFrameDuration } from "../../originalGame";
import type { Xy } from "../../utils/vectors/vectors";

type AnimatedCreateSpriteOptions = {
  // animated
  anchor?: PointData;
  pivot?: PointData;
  flipX?: boolean;
  animationId: AnimationId;
  /*
   * if true, animation will run backwards
   */
  reverse?: boolean;
  x?: number;
  y?: number;

  filter?: Filter;

  /**
   * If true, will play once and vanish. Otherwise, (by default) will loop
   * indefinitely
   */
  playOnce?: "and-destroy" | "and-stop";
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
      filter?: Filter;
    }
  | AnimatedCreateSpriteOptions;

const bottomMiddleDefaultAnchor = { x: 0.5, y: 1 };

const isAnimatedOptions = (
  options: CreateSpriteOptions,
): options is AnimatedCreateSpriteOptions =>
  typeof options !== "string" &&
  Object.hasOwn(
    options,
    "animationId" satisfies keyof AnimatedCreateSpriteOptions,
  );

/** utility for creating a sprite while setting several properties on it */
export const createSprite = (options: CreateSpriteOptions): Sprite => {
  if (typeof options === "string") {
    // shortcutted convenience for creating with the texture name and no other options
    return createSprite({ texture: options });
  } else {
    const { anchor, flipX, pivot, x, y, filter } = options;

    let sprite: Sprite;

    if (isAnimatedOptions(options)) {
      sprite = createAnimatedSprite(options);
    } else {
      sprite = new Sprite(spriteSheet.textures[options.texture]);
    }

    if (anchor === undefined && pivot === undefined) {
      if (!isAnimatedOptions(options)) {
        // I allow a non-standard pivot property on my sprites:
        const spriteDataFrame = spriteSheet.data.frames[options.texture]
          .frame as SpritesheetFrameData["frame"] & { pivot: Xy };
        // what the spritesheet calls a anchor, I actually use as
        // a pivot - not sure if pixi means it to be used that way
        if (spriteDataFrame.pivot !== undefined) {
          sprite.pivot = spriteDataFrame.pivot;
        } else {
          sprite.anchor = bottomMiddleDefaultAnchor;
        }
      } else {
        sprite.anchor = bottomMiddleDefaultAnchor;
      }
    } else {
      if (anchor !== undefined) sprite.anchor = anchor;
      if (pivot !== undefined) sprite.pivot = pivot;
    }

    if (x !== undefined) {
      sprite.x = x;
    }

    if (y !== undefined) {
      sprite.y = y;
    }

    if (filter !== undefined) {
      sprite.filters = filter;
    }

    sprite.eventMode = "static";
    if (flipX === true) {
      sprite.scale.x = -1;
    }

    return sprite;
  }
};
function createAnimatedSprite({
  animationId,
  reverse,
  playOnce,
}: AnimatedCreateSpriteOptions) {
  const frames = spriteSheet.animations[animationId];

  const animatedSpriteFrames: AnimatedSpriteFrames = frames.map((frame) => ({
    texture: frame,
    time: originalGameFrameDuration,
  }));

  if (reverse) {
    animatedSpriteFrames.reverse();
  }

  const animatedSprite = new AnimatedSprite(animatedSpriteFrames);

  animatedSprite.animationSpeed =
    spritesheetData.animations[animationId].animationSpeed;
  animatedSprite.play();
  if (playOnce !== undefined) {
    animatedSprite.loop = false;
    animatedSprite.onComplete = () => {
      animatedSprite.stop();
      if (playOnce === "and-destroy") {
        // we don't actually destroy, or the item appearance will notice the container
        // is empty and re-render it:
        animatedSprite.visible = false;
      }
    };
  }
  return animatedSprite;
}
