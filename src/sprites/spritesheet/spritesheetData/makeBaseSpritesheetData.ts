import { type SpritesheetData } from "pixi.js";

import { objectEntriesIter } from "../../../utils/entries";
import { type AnimationsOfFrames } from "./AnimationsOfFrames";
import { type AppSpriteFrame } from "./AppSpriteFrame";
import { doorSpritesheetData } from "./doorSpritesheetData";
import { editorSpritesheetData } from "./editorSpritesheetData";
import { itemsSpritesheetData } from "./itemsSpritesheetData";
import { type TextureId } from "./makeSpritesheetData";
import { playableSpritesheetData } from "./playableSpritesheetData";
import { scenerySpritesheetData } from "./scenerySpritesheetData";
import { type SpritesheetMetadata } from "./spritesheetMetaData";

export const spritesheetSize = { w: 1_024, h: 1_024 };

/**
 * the sheet data over only the ids drawn as pixels in the source image - what
 * the html/css sprites (tailwind's `.texture-*` utilities, the sprites page)
 * are built from, since a variant id has no region of its own in the image.
 *
 * In its own module (not makeSpritesheetData's) so the menu path can build
 * base data without pulling the variant-id machinery into its bundle chunk -
 * only the game's atlas bake needs the variant merge.
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
