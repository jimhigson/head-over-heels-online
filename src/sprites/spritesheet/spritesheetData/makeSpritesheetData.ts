import type { SpritesheetData } from "pixi.js";

import type { AnimationsOfFrames } from "./AnimationsOfFrames";
import type { SpritesheetMetadata } from "./spritesheetMetaData";

import { objectEntriesIter } from "../../../utils/entries";
import { doorSpritesheetData } from "./doorSpritesheetData";
import { editorSpritesheetData } from "./editorSpritesheetData";
import { hudSpritesheetData } from "./hudSritesheetData";
import { itemsSpritesheetData } from "./itemsSpritesheetData";
import { playableSpritesheetData } from "./playableSpritesheetData";
import { scenerySpritesheetData } from "./scenerySpritesheetData";

export type TextureId =
  | keyof ReturnType<typeof playableSpritesheetData>["frames"]
  | keyof typeof doorSpritesheetData.frames
  | keyof typeof editorSpritesheetData.frames
  | keyof typeof hudSpritesheetData.frames
  | keyof typeof itemsSpritesheetData.frames
  | keyof typeof scenerySpritesheetData.frames;

export type AnimationId =
  | keyof ReturnType<typeof playableSpritesheetData>["animations"]
  | keyof typeof itemsSpritesheetData.animations
  | keyof typeof scenerySpritesheetData.animations;

export type FramesWithSpeed<TFrames extends string[] = TextureId[]> =
  TFrames & {
    animationSpeed: number;
  };

export const makeSpritesheetData = (
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
    ...hudSpritesheetData.frames,
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
    for (const [tid, override] of objectEntriesIter(
      spritesheetMetaData.overrides,
    )) {
      if (tid in frames) {
        Object.assign(frames[tid].frame, override);
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

export const spritesheetSize = { w: 1024, h: 1024 };
