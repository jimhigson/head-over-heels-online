import type {
  AnimatedSpriteFrames,
  Filter,
  PointData,
  SpritesheetFrameData,
} from "pixi.js";
import { Container } from "pixi.js";
import { AnimatedSprite, Sprite } from "pixi.js";
import {
  spritesheetData,
  type AnimationId,
  type TextureId,
} from "../../sprites/spriteSheetData";
import { spriteSheet } from "../../sprites/spriteSheet";
import { originalGameFrameDuration } from "../../originalGame";
import { type Xy, type Xyz } from "../../utils/vectors/vectors";
import { projectBlockXyzToScreenXy } from "./projectToScreen";

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

  filter?: Filter | Filter[];

  /**
   * If true, will play once and vanish. Otherwise, (by default) will loop
   * indefinitely
   */
  playOnce?: "and-destroy" | "and-stop";
  times?: Partial<Xyz>;
  label?: string;
};

export type CreateSpriteOptions =
  | TextureId
  | {
      // not animated
      anchor?: PointData;
      pivot?: PointData;
      flipX?: boolean;
      textureId: TextureId;
      x?: number;
      y?: number;
      filter?: Filter | Filter[];
      times?: Partial<Xyz>;
      label?: string;
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
export const createSprite = (options: CreateSpriteOptions): Container => {
  if (typeof options === "string") {
    // shortcutted convenience for creating with the texture name and no other options
    return createSprite({ textureId: options });
  } else {
    const { anchor, flipX, pivot, x, y, filter, times, label } = options;

    let sprite: Sprite;

    if (isAnimatedOptions(options)) {
      sprite = createAnimatedSprite(options);
    } else {
      sprite = new Sprite(spriteSheet.textures[options.textureId]);
    }

    if (times !== undefined) {
      const completeTimes = { x: 1, y: 1, z: 1, ...times };

      const container = new Container({ label: label ?? "timesXyz" });
      for (let { x } = completeTimes; x >= 1; x--) {
        for (let { y } = completeTimes; y >= 1; y--) {
          for (let z = 1; z <= completeTimes.z; z++) {
            const component = createSprite({
              ...options,
              times: undefined,
              label: `(${x},${y},${z})`,
            });
            const displaceXy = projectBlockXyzToScreenXy({
              x: x - 1,
              y: y - 1,
              z: z - 1,
            });
            component.x += displaceXy.x;
            component.y += +displaceXy.y;

            container.addChild(component);
          }
        }
      }
      return container;
    }

    if (anchor === undefined && pivot === undefined) {
      if (!isAnimatedOptions(options)) {
        // I allow a non-standard pivot property on my sprites:
        const spriteDataFrame = spriteSheet.data.frames[options.textureId]
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

    if (label !== undefined) {
      sprite.label = label;
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
