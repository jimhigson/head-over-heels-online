import type { SpritesheetData } from "pixi.js";

import type { AnimationsOfFrames } from "./AnimationsOfFrames";

import { doorSpritesheetData } from "./doorSpritesheetData";
import { editorSpritesheetData } from "./editorSpritesheetData";
import { hudSpritesheetData } from "./hudSritesheetData";
import { itemsSpritesheetData } from "./itemsSpritesheetData";
import { playableSpritesheetData } from "./playableSpritesheetData";
import { scenerySpritesheetData } from "./scenerySpritesheetData";

const frames = {
  ...itemsSpritesheetData.frames,
  ...playableSpritesheetData.frames,
  ...scenerySpritesheetData.frames,
  ...hudSpritesheetData.frames,
  ...doorSpritesheetData.frames,
  ...editorSpritesheetData.frames,
};

export type TextureId = keyof typeof frames;

export type FramesWithSpeed<TFrames extends string[] = TextureId[]> =
  TFrames & {
    animationSpeed: number;
  };

export const spritesheetData = {
  frames,
  animations: {
    ...playableSpritesheetData.animations,
    ...itemsSpritesheetData.animations,
    ...scenerySpritesheetData.animations,
  },
  meta: { scale: 1 },
} as const satisfies SpritesheetData satisfies AnimationsOfFrames<
  keyof typeof frames
>;

export type AnimationId = keyof (typeof spritesheetData)["animations"];
