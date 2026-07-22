import { type SpritesheetData } from "pixi.js";

import { objectEntriesIter } from "../../../utils/entries";
import { type AnimationsOfFrames } from "./AnimationsOfFrames";
import { type AppSpriteFrame } from "./AppSpriteFrame";
import { doorSpritesheetData } from "./doorSpritesheetData";
import { editorSpritesheetData } from "./editorSpritesheetData";
import { itemsSpritesheetData } from "./itemsSpritesheetData";
import { playableSpritesheetData } from "./playableSpritesheetData";
import { scenerySpritesheetData } from "./scenerySpritesheetData";
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
 * the sheet data over only the ids drawn as pixels in the source image - what
 * the html/css sprites (tailwind's `.texture-*` utilities, the sprites page)
 * are built from, since a variant id has no region of its own in the image
 */
export const makeBaseSpritesheetData = (
  spritesheetMetaData: Pick<
    SpritesheetMetadata,
    "missedTextures" | "overrides" | "playable"
  >,
) => {
  const playable = playableSpritesheetData(spritesheetMetaData.playable);

  const frames = {
    ...itemsSpritesheetData.frames,
    ...playable.frames,
    ...scenerySpritesheetData.frames,
    ...doorSpritesheetData.frames,
    ...editorSpritesheetData.frames,
  };

  const missedTextures =
    spritesheetMetaData.missedTextures !== undefined ?
      new Set<string>(spritesheetMetaData.missedTextures)
    : undefined;

  if (missedTextures !== undefined) {
    for (const tid of missedTextures) {
      delete frames[tid as keyof typeof frames];
    }
  }

  if (spritesheetMetaData.overrides !== undefined) {
    // the frame entries are shared (by reference) with the per-type *Data
    // modules and the layout is identical across sprite options, so each
    // override replaces its entry with a fresh clone rather than mutating in
    // place - otherwise one sheet's copyFrom would corrupt another's coords
    const overridableFrames = frames as unknown as Record<
      TextureId,
      { frame: AppSpriteFrame }
    >;

    for (const [tid, override] of objectEntriesIter(
      spritesheetMetaData.overrides,
    )) {
      if (override === undefined || !(tid in frames)) {
        continue;
      }

      const { pivot, copyFrom } = override;

      if (copyFrom !== undefined) {
        // sample the source's region of the sheet instead of having pixels of
        // its own. A flipped copy mirrors the pivot x; the horizontal mirror of
        // the pixels themselves is applied to the texture uvs after parsing, in
        // applySpritesheetFlips
        const sourceFrame = overridableFrames[copyFrom.textureId].frame;
        const copiedPivot =
          copyFrom.flipX === true && sourceFrame.pivot !== undefined ?
            { x: sourceFrame.w - sourceFrame.pivot.x, y: sourceFrame.pivot.y }
          : sourceFrame.pivot;

        overridableFrames[tid] = {
          ...overridableFrames[tid],
          frame: {
            ...overridableFrames[tid].frame,
            x: sourceFrame.x,
            y: sourceFrame.y,
            w: sourceFrame.w,
            h: sourceFrame.h,
            pivot: copiedPivot,
            ...(copyFrom.flipX === true && { flipX: true }),
          },
        };
      }

      if (pivot !== undefined) {
        overridableFrames[tid] = {
          ...overridableFrames[tid],
          frame: { ...overridableFrames[tid].frame, pivot },
        };
      }
    }
  }

  const animations = {
    ...playable.animations,
    ...itemsSpritesheetData.animations,
    ...scenerySpritesheetData.animations,
  };

  if (missedTextures !== undefined) {
    for (const [animId, animFrames] of objectEntriesIter(animations)) {
      if (animFrames.some((f: string) => missedTextures.has(f))) {
        delete animations[animId];
      }
    }
  }

  return {
    frames,
    animations,
    meta: { scale: 1 },
  } as const satisfies SpritesheetData satisfies AnimationsOfFrames<
    keyof typeof frames
  >;
};

/**
 * the base sheet data plus every suffixed variant id
 * (`turtle.towards.doughnutted`, `door.frame.generic.x.near.toCyan`, …), whose
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

export const spritesheetSize = { w: 1_024, h: 1_024 };
