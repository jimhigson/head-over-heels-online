import type {
  AnimatedSpriteFrames,
  Filter,
  PointData,
  SpritesheetFrameData,
} from "pixi.js";

import { Container } from "pixi.js";
import { AnimatedSprite, Sprite } from "pixi.js";

import { completeTimesXyz } from "../../model/times";
import { originalGameFrameDuration } from "../../originalGame";
import { loadedSpriteSheet } from "../../sprites/spriteSheet";
import {
  type AnimationId,
  spritesheetData,
  type TextureId,
} from "../../sprites/spriteSheetData";
import { hashStringToNumber0to1 } from "../../utils/maths/hashStringToNumber0to1";
import { lengthXyz, type Xy, type Xyz } from "../../utils/vectors/vectors";
import { projectBlockXyzToScreenXy } from "./projections";

export type AnimatedCreateSpriteOptions = {
  // animated
  anchor?: PointData;
  pivot?: PointData;
  flipX?: boolean;
  textureId?: undefined;
  textureIdCallback?: undefined;
  animationId: AnimationId;
  /**
   * if given, the animation will start at a psuedo-random frame
   * based off of hashing this string
   */
  randomiseStartFrame?: string;
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

  /** if the game is paused, nothing should animate - this will automatically create just
      a sprite with the first frame of the animation */
  paused?: boolean;

  /**
   * the gameSpeed changes how fast animated sprites play, so they play in proportion to
   * how fast the game is running. If not given, 1 will be used (normal speed)
   */
  gameSpeed?: number;
};

export type CreateSpriteOptions =
  | ({
      // not animated
      anchor?: PointData;
      pivot?: PointData;
      flipX?: boolean;
      x?: number;
      y?: number;
      filter?: Filter | Filter[];
      times?: Partial<Xyz>;
      label?: string;
    } & (
      | {
          times?: Partial<Xyz>;
          textureId: TextureId;
          textureIdCallback?: undefined;
        }
      | {
          times?: Partial<Xyz>;
          textureId?: undefined;
          /** the texture id callback allows an item with repetition to have different textures at different locations */
          textureIdCallback: (x: number, y: number, z: number) => TextureId;
        }
    ))
  | AnimatedCreateSpriteOptions
  | TextureId;

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
const _createSprite = (options: CreateSpriteOptions): Container => {
  if (typeof options === "string") {
    // shortcutted convenience for creating with the texture name and no other options
    return _createSprite({ textureId: options });
  } else {
    const { anchor, flipX, pivot, x, y, filter, times, label } = options;

    // `times: undefined` or `times: {x:1}` should NOT cause the sprite to be wrapped in a container
    // even if this means the the types change between two otherwise identical calls
    if (options.times) {
      const completeTimes = completeTimesXyz(times);
      // only actually do multiplied rendering if we have a times vector
      // with actual multiple instances in it (not 1x1x1) - this is important
      // because other code looks at the output from createSprite and creates
      // new sprites based off the container returned if it isn't a simple sprite
      const needsMultipliedRendering = lengthXyz(completeTimes) >= 2;

      if (needsMultipliedRendering) {
        const container = new Container({ label: label ?? "timesXyz" });
        for (let { x } = completeTimes; x >= 1; x--) {
          for (let { y } = completeTimes; y >= 1; y--) {
            for (let z = 1; z <= completeTimes.z; z++) {
              const textureId =
                options.textureId ??
                options.textureIdCallback?.(x - 1, y - 1, z - 1);
              const subSpriteOptions = {
                ...options,
                textureId,
                label: `(${x},${y},${z})`,
              };
              if ("randomiseStartFrame" in subSpriteOptions) {
                // if randomising the start frame, we don't want all the sub-sprites to get the same randomisation
                // so the sub-position of the child sprite onto the randomiseStartFrame string:
                subSpriteOptions.randomiseStartFrame = `${subSpriteOptions.randomiseStartFrame}${x},${y},${z}`;
              }
              delete subSpriteOptions.times;
              const component = _createSprite(
                subSpriteOptions as CreateSpriteOptions,
              );
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
    }

    let sprite: Sprite;
    if (isAnimatedOptions(options)) {
      sprite = createAnimatedSprite(options);
    } else {
      const textureId =
        options.textureId ?? options.textureIdCallback?.(0, 0, 0);
      sprite = new Sprite(loadedSpriteSheet().textures[textureId]);
    }

    if (anchor === undefined && pivot === undefined) {
      if (!isAnimatedOptions(options)) {
        const textureId =
          options.textureId ?? options.textureIdCallback?.(0, 0, 0);
        const spritesheetFrameData: SpritesheetFrameData | undefined =
          loadedSpriteSheet().data.frames[textureId];

        if (spritesheetFrameData === undefined) {
          throw new Error(`no spritesheet entry for textureId "${textureId}"`);
        }
        // There is a non-standard (unknown to Pixi.js) pivot property on the sprites:
        const spriteDataFrame =
          spritesheetFrameData.frame as SpritesheetFrameData["frame"] & {
            pivot: Xy;
          };
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

export const createSprite = _createSprite as <O extends CreateSpriteOptions>(
  options: O,
) => O extends TextureId ? Sprite
: O extends AnimatedCreateSpriteOptions ?
  O extends { times?: Partial<Xyz> } ?
    // giving times doesn't guarantee a container, because the times could be 1x1x1 or equivalent
    AnimatedSprite | Container<AnimatedSprite>
  : AnimatedSprite
: O extends { times?: Partial<Xyz> } ?
  // giving times doesn't guarantee a container, because the times could be 1x1x1 or equivalent
  Container<Sprite> | Sprite
: Sprite;

function createAnimatedSprite({
  animationId,
  reverse,
  playOnce,
  paused,
  randomiseStartFrame,
  gameSpeed = 1,
}: AnimatedCreateSpriteOptions): AnimatedSprite {
  const animationFrames = loadedSpriteSheet().animations[animationId];
  //const frames = paused ? [animationFrames[0]] : animationFrames;

  const animatedSpriteFrames: AnimatedSpriteFrames = animationFrames.map(
    (frame) => ({
      texture: frame,
      time: originalGameFrameDuration,
    }),
  );

  if (reverse) {
    animatedSpriteFrames.reverse();
  }

  const animatedSprite = new AnimatedSprite(animatedSpriteFrames);

  const animationSpeedModifier =
    paused ? 0
      // the original animations don't hold up too well sped up a lot, so while
      // they get faster the faster the game goes, it increases slower than linear and
      // sqrt is about right:
      //   2x gameSpeed gets ~1.4x faster animations
      //   1.2x (remake default) gets ~1.1x animation speed
      //   1x original gameSpeed stays at the original animation speed
    : Math.sqrt(gameSpeed);

  animatedSprite.animationSpeed =
    spritesheetData.animations[animationId].animationSpeed *
    animationSpeedModifier;

  animatedSprite.gotoAndPlay(
    randomiseStartFrame !== undefined ?
      Math.floor(
        hashStringToNumber0to1(randomiseStartFrame) *
          animatedSpriteFrames.length,
      )
    : 0,
  );

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
