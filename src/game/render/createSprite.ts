import type { Filter, PointData, SpritesheetFrameData } from "pixi.js";

import { Container, Texture, Ticker } from "pixi.js";
import { AnimatedSprite, Sprite } from "pixi.js";

import type {
  AnimationId,
  TextureId,
} from "../../sprites/spritesheet/spritesheetData/spriteSheetData";
import type { SpritesheetVariant } from "../../sprites/spritesheet/variants/SpritesheetVariant";

import { completeTimesXyz } from "../../model/times";
import { originalGameFrameDuration } from "../../originalGame";
import { spritesheetData } from "../../sprites/spritesheet/spritesheetData/spriteSheetData";
import { getSpriteSheetVariant } from "../../sprites/spritesheet/variants/getSpriteSheetVariant";
import { hashStringToNumber0to1 } from "../../utils/maths/hashStringToNumber0to1";
import { lengthXyz, type Xy, type Xyz } from "../../utils/vectors/vectors";
import { projectBlockXyzToScreenXy } from "./projections";

export type AnimatedCreateSpriteOptions = {
  // animated
  anchor?: PointData;
  pivot?: PointData;
  flipX?: boolean;
  textureId?: undefined;
  subSpriteVariations?: undefined;
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

  /**
   * If true, will play once and vanish. Otherwise, (by default) will loop
   * indefinitely
   */
  playOnce?: "and-destroy" | "and-stop";
  times?: Partial<Xyz>;
  label?: string;

  spritesheetVariant: SpritesheetVariant;

  /** if the game is paused, nothing should animate - this will automatically create just
      a sprite with the first frame of the animation */
  paused?: boolean;
};

type BaseCreateSpriteOptions = {
  // not animated
  anchor?: PointData;
  pivot?: PointData;
  flipX?: boolean;
  x?: number;
  y?: number;
  filter?: Filter | Filter[];
  label?: string;
  spritesheetVariant?: SpritesheetVariant;
};

/**
 * subset of CreateSpriteOptions where the texture is specified, ie will not return
 * a sprite with the default Texture.EMPTY texture
 */
export type SpecifiedTextureCreateSpriteOptions =
  | AnimatedCreateSpriteOptions
  | (BaseCreateSpriteOptions &
      (
        | {
            times?: Partial<Xyz>;
            textureId: TextureId;
            subSpriteVariations?: undefined;
          }
        | {
            times?: Partial<Xyz>;
            textureId?: undefined;
            /**
             * variations (texture id, sprite id etc)
             * callback allows an item with repetition to have
             * different textures at different locations
             */
            subSpriteVariations: (
              x: number,
              y: number,
              z: number,
            ) => { textureId?: TextureId; animationId?: AnimationId };
          }
      ));

export type CreateSpriteOptions =
  | (BaseCreateSpriteOptions & {
      /** create a blank sprite with Texture.EMPTY */
      times?: undefined;
      textureId?: undefined;
      subSpriteVariations?: undefined;
    })
  | SpecifiedTextureCreateSpriteOptions;

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
const createSpriteImpl = (options: CreateSpriteOptions): Container => {
  const { anchor, flipX, pivot, x, y, times, label } = options;

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
            const subSpriteOptions = {
              ...options,
              label: `(${x},${y},${z})`,
              ...options.subSpriteVariations?.(x - 1, y - 1, z - 1),
              subSpriteVariations: undefined,
            };

            if ("randomiseStartFrame" in subSpriteOptions) {
              // if randomising the start frame, we don't want all the sub-sprites to get the same randomisation
              // so the sub-position of the child sprite onto the randomiseStartFrame string:
              subSpriteOptions.randomiseStartFrame = `${subSpriteOptions.randomiseStartFrame}${x},${y},${z}`;
            }
            delete subSpriteOptions.times;
            const component = createSpriteImpl(
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

  if (options.subSpriteVariations !== undefined) {
    return createSpriteImpl({
      ...options,
      ...options.subSpriteVariations(0, 0, 0),
      subSpriteVariations: undefined,
    } as CreateSpriteOptions);
  }

  let sprite: Sprite;
  if (isAnimatedOptions(options)) {
    sprite = createAnimatedSprite(options);
  } else {
    const { textureId } = options;
    const spritesheet = getSpriteSheetVariant(
      options.spritesheetVariant ?? "original",
    );
    sprite = new Sprite(
      textureId !== undefined ? spritesheet.textures[textureId] : Texture.EMPTY,
    );
  }

  if (anchor === undefined && pivot === undefined) {
    if (!isAnimatedOptions(options)) {
      const { textureId } = options;
      const spritesheetFrameData: SpritesheetFrameData | undefined =
        textureId !== undefined ?
          getSpriteSheetVariant(options.spritesheetVariant ?? "original").data
            .frames[textureId]
        : undefined;

      if (
        import.meta.env.DEV &&
        textureId !== undefined &&
        spritesheetFrameData === undefined
      ) {
        throw new Error(`no spritesheet entry for textureId "${textureId}"`);
      }
      if (spritesheetFrameData !== undefined) {
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

  if (label !== undefined) {
    sprite.label = label;
  }

  sprite.eventMode = "static";
  if (flipX === true) {
    sprite.scale.x = -1;
  }

  return sprite;
};

/** the animation speed, as should be passed to AnimatedSprite.animationSPeed */
export const animationSpeed = (
  animationId: AnimationId,
  paused: boolean = false,
) => {
  const tickerSpeed = Ticker.shared.speed;

  const animationSpeedModifier =
    paused || tickerSpeed === 0 ?
      0
      // the original animations don't hold up too well sped up a lot, so while
      // they get faster the faster the game goes, it increases slower than linear and
      // sqrt is about right:
      //   2x gameSpeed gets ~1.4x faster animations
      //   1.2x (remake default) gets ~1.1x animation speed
      //   1x original gameSpeed stays at the original animation speed
      //
      //    tickerSpeed = 1: Math.sqrt(1) / 1 = 1 → animations at 1x speed ✓
      //    tickerSpeed = 2: Math.sqrt(2) / 2 = 1.414 / 2 = 0.707 → but ticker speeds it up by 2x, so effective speed = 0.707 × 2 = 1.414x ✓
      //    tickerSpeed = 1.2: Math.sqrt(1.2) / 1.2 = 1.095 / 1.2 = 0.913 → effective speed = 0.913 × 1.2 = 1.096x ✓
    : Math.sqrt(tickerSpeed) / tickerSpeed;

  return (
    spritesheetData.animations[animationId].animationSpeed *
    animationSpeedModifier
  );
};

export const framesWithOriginalGameTimings = (animationTextures: Texture[]) => {
  return animationTextures.map((frame) => ({
    texture: frame,
    time: originalGameFrameDuration,
  }));
};

function createAnimatedSprite({
  animationId,
  reverse,
  playOnce,
  paused,
  randomiseStartFrame,
  spritesheetVariant,
}: AnimatedCreateSpriteOptions): AnimatedSprite {
  const animationTextures =
    getSpriteSheetVariant(spritesheetVariant).animations[animationId];

  const animatedSpriteFrames = framesWithOriginalGameTimings(animationTextures);

  if (reverse) {
    animatedSpriteFrames.reverse();
  }

  const animatedSprite = new AnimatedSprite(animatedSpriteFrames);

  animatedSprite.animationSpeed = animationSpeed(animationId, paused);

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

const createSpriteImplAndCatch = (options: CreateSpriteOptions): Container => {
  try {
    return createSpriteImpl(options);
  } catch (error) {
    throw new Error(
      `error in createSprite with options ${JSON.stringify(options, null, 2)}`,
      { cause: error },
    );
  }
};

export const createSprite = (
  import.meta.env.DEV ?
    createSpriteImplAndCatch
  : createSpriteImpl) as <O extends CreateSpriteOptions>(
  options: O,
) => O extends AnimatedCreateSpriteOptions ?
  O extends { times?: Partial<Xyz> } ?
    // giving times doesn't guarantee a container, because the times could be 1x1x1 or equivalent
    AnimatedSprite | Container<AnimatedSprite>
  : AnimatedSprite
: O extends { times?: Partial<Xyz> } ?
  // giving times doesn't guarantee a container, because the times could be 1x1x1 or equivalent
  Container<Sprite> | Sprite
: Sprite;
