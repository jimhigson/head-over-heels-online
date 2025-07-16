import type { SpritesheetData } from "pixi.js";
import { playableSpritesheetData } from "./playableSpritesheetData";
import type { AnimationsOfFrames } from "./AnimationsOfFrames";
import { scenerySpritesheetData } from "./scenerySpritesheetData";
import { hudSpritesheetData } from "./hudSritesheetData";
import { doorSpritesheetData } from "./doorSpritesheetData";
import { itemsSpritesheetData } from "./itemsSpritesheetData";
import { editorSpritesheetData } from "./editorSpritesheetData";

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
