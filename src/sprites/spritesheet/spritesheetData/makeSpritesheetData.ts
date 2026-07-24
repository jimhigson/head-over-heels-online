import { type SpritesheetData } from "pixi.js";

import { type AnimationsOfFrames } from "./AnimationsOfFrames";
import { type AppSpriteFrame } from "./AppSpriteFrame";
import { type doorSpritesheetData } from "./doorSpritesheetData";
import { type editorSpritesheetData } from "./editorSpritesheetData";
import { type itemsSpritesheetData } from "./itemsSpritesheetData";
import { makeBaseSpritesheetData } from "./makeBaseSpritesheetData";
import { type playableSpritesheetData } from "./playableSpritesheetData";
import { type scenerySpritesheetData } from "./scenerySpritesheetData";
import { type SpritesheetMetadata } from "./spritesheetMetaData";
import {
  type VariantAnimationId,
  variantSpritesheetData,
  type VariantTextureId,
} from "./variantSpritesheetData";

/** the texture ids drawn as pixels in the source spritesheet image */
export type BaseTextureId =
  | keyof ReturnType<typeof playableSpritesheetData>["frames"]
  | keyof typeof doorSpritesheetData.frames
  | keyof typeof editorSpritesheetData.frames
  | keyof typeof itemsSpritesheetData.frames
  | keyof typeof scenerySpritesheetData.frames;

/**
 * every texture id in the sheet data: the base ids plus the suffixed variant
 * ids (`turtle.towards.doughnutted` etc) that sample variant-palette re-bakes
 * of their base frame
 */
export type TextureId = BaseTextureId | VariantTextureId;

export type TextureIdWithPrefix<Prefix extends string> = Extract<
  TextureId,
  `${Prefix}.${string}` | `${Prefix}`
>;
export type BaseTextureIdWithPrefix<Prefix extends string> = Extract<
  BaseTextureId,
  `${Prefix}.${string}` | `${Prefix}`
>;

export type BaseAnimationId =
  | keyof ReturnType<typeof playableSpritesheetData>["animations"]
  | keyof typeof itemsSpritesheetData.animations
  | keyof typeof scenerySpritesheetData.animations;

export type AnimationId = BaseAnimationId | VariantAnimationId;

export type BaseAnimationIdWithPrefix<Prefix extends string> = Extract<
  BaseAnimationId,
  `${Prefix}.${string}` | `${Prefix}`
>;

export type FramesWithSpeed<TFrames extends string[] = TextureId[]> =
  TFrames & {
    animationSpeed: number;
  };

/**
 * the sheet's frames viewed as plain rects rather than the per-key literal
 * coordinates makeSpritesheetData infers - the shape runtime consumers (and
 * the atlas bake, which re-points variant entries at packed strip rects) work
 * against
 */
export type SpritesheetDataFrames = Record<
  TextureId,
  { frame: AppSpriteFrame }
>;

/**
 * the base sheet data plus every suffixed variant id
 * (`turtle.towards.doughnutted`, `door.frame.generic.x.near.hue=cyan`, …), whose
 * entries alias their base frame's rect until a bake re-points them at the
 * packed strip
 */
export const makeSpritesheetData = (
  spritesheetMetaData: Pick<
    SpritesheetMetadata,
    "missedTextures" | "overrides" | "playable"
  >,
) => {
  const { frames, animations } = makeBaseSpritesheetData(spritesheetMetaData);

  // derived from the post-override, post-missedTextures base data, so the
  // alias entries share the final base rects:
  const variant = variantSpritesheetData(frames, animations);

  const mergedFrames = { ...frames, ...variant.frames };
  const mergedAnimations = { ...animations, ...variant.animations };

  return {
    frames: mergedFrames,
    animations: mergedAnimations,
    meta: { scale: 1 },
  } as const satisfies SpritesheetData satisfies AnimationsOfFrames<
    keyof typeof mergedFrames
  >;
};
