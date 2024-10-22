import { AnimatedSprite, Container, PointData, Sprite, Texture } from "pixi.js";
import {
  blockSizePx,
  pixiSpriteSheet,
  TextureId,
} from "../../sprites/pixiSpriteSheet";
import { projectToScreen } from "./projectToScreen";
import { XyMaybeZ } from "../../modelTypes";
import { create } from "domain";

export type MoveSpriteOptions = {
  /**
   * if set, will give the sprite a z-index. this isn't needed for sprites that
   * can render themselves in a known-good order - ie, back-to-front
   */
  giveZIndex?: boolean;
};

export const moveToBlock = (
  { x, y, z = 0 }: XyMaybeZ,
  sprite: Container,
  { giveZIndex }: MoveSpriteOptions = { giveZIndex: false },
) => {
  const projection = projectToScreen(
    x * blockSizePx.w,
    y * blockSizePx.d,
    z * blockSizePx.h,
  );

  sprite.x = projection.x;
  sprite.y = projection.y;

  if (giveZIndex) sprite.zIndex = projection.z;

  return sprite;
};

type AnimatedCreateSpriteOptions = {
  // animated
  anchor?: PointData;
  pivot?: PointData;
  flipX?: boolean;
  animationSpeed: number;
  frames: Texture[];
};

type CreateSpriteOptions =
  | TextureId
  | {
      // not animated
      anchor?: PointData;
      pivot?: PointData;
      flipX?: boolean;
      texture: TextureId;
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
    const { anchor, flipX, pivot } = options;

    let sprite: Sprite;

    if (isAnimatedOptions(options)) {
      sprite = new AnimatedSprite(options.frames);
      (sprite as AnimatedSprite).animationSpeed = options.animationSpeed || 0.1;
      (sprite as AnimatedSprite).play();
    } else {
      sprite = new Sprite(pixiSpriteSheet.textures[options.texture]);
    }

    if (anchor === undefined && pivot === undefined)
      sprite.anchor = bottomMiddleDefaultAnchor;
    else {
      if (anchor !== undefined) sprite.anchor = anchor;
      if (pivot !== undefined) sprite.pivot = pivot;
    }

    sprite.eventMode = "static";
    sprite.on("click", () => {
      console.log(`tex=${JSON.stringify(options)}`);
    });

    //sprite.zIndex = pos.z * 1024 +
    if (flipX === true) {
      sprite.scale.x = -1;
    }

    return sprite;
  }
};
