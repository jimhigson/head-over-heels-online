import { SpritesheetData, SpritesheetFrameData } from "pixi.js";
import { seriesOfAnimationFrameTextures } from "./spriteGenerators";
import { smallItemTextureSize } from "./textureSizes";
import { PlayableCharacter } from "@/model/modelTypes";
import { Direction, directions } from "@/utils/vectors";

export type AnimationsOfFrames<TextureId extends string> = {
  frames: Record<TextureId, SpritesheetFrameData>;
  animations: Record<string, TextureId[]>;
};

function* walkingFramesGen<P extends PlayableCharacter, D extends Direction>(
  p: P,
  d: D,
): Generator<`${P}.walking.${D}.${"1" | "2" | "3"}`> {
  yield `${p}.walking.${d}.1`;
  yield `${p}.walking.${d}.2`;
  yield `${p}.walking.${d}.3`;
  yield `${p}.walking.${d}.2`;
}
function walkingFrames<P extends PlayableCharacter>(p: P) {
  return directions.reduce(
    (ac, d) => ({
      ...ac,
      [`${p}.walking.${d}`]: [...walkingFramesGen(p, d)],
    }),
    {},
  ) as Record<
    `${P}.walking.${Direction}`,
    Array<`${P}.walking.${Direction}.${"1" | "2" | "3"}`>
  >;
}

const frames = {
  ...seriesOfAnimationFrameTextures(
    "head.walking.towards",
    3,
    { x: 4, y: 266 },
    smallItemTextureSize,
  ),
  ...seriesOfAnimationFrameTextures(
    "head.walking.right",
    3,
    { x: 80, y: 266 },
    smallItemTextureSize,
  ),
  ...seriesOfAnimationFrameTextures(
    "head.walking.left",
    3,
    { x: 4, y: 240 },
    smallItemTextureSize,
  ),
  ...seriesOfAnimationFrameTextures(
    "head.walking.away",
    3,
    { x: 80, y: 240 },
    smallItemTextureSize,
  ),
  ...seriesOfAnimationFrameTextures(
    "head.idle.towards",
    2,
    { x: 4, y: 304 },
    smallItemTextureSize,
  ),
  ...seriesOfAnimationFrameTextures(
    "head.idle.right",
    2,
    { x: 4, y: 329 },
    smallItemTextureSize,
  ),
  "head.falling.towards": {
    frame: { x: 107, y: 304, ...smallItemTextureSize },
  },
  "head.falling.right": {
    frame: { x: 132, y: 304, ...smallItemTextureSize },
  },

  // Heels
  // ------------
  ...seriesOfAnimationFrameTextures(
    "heels.walking.towards",
    3,
    { x: 159, y: 266 },
    smallItemTextureSize,
  ),
  ...seriesOfAnimationFrameTextures(
    "heels.walking.right",
    3,
    { x: 235, y: 266 },
    smallItemTextureSize,
  ),
  ...seriesOfAnimationFrameTextures(
    "heels.walking.left",
    3,
    { x: 159, y: 240 },
    smallItemTextureSize,
  ),
  ...seriesOfAnimationFrameTextures(
    "heels.walking.away",
    3,
    { x: 235, y: 240 },
    smallItemTextureSize,
  ),
} as const;

export const playableSpritesheetData = {
  frames,
  animations: {
    ...walkingFrames("head"),
    ...walkingFrames("heels"),
    "head.idle.right": [
      // 50 frames of non-blinking confirmed against original to be about the same rate
      ...new Array(50).fill("head.idle.right.1"),
      "head.idle.right.2",
      "head.idle.right.1",
      "head.idle.right.2",
    ],
    "head.idle.towards": [
      ...new Array(50).fill("head.idle.towards.1"),
      "head.idle.towards.2",
      "head.idle.towards.1",
      "head.idle.towards.2",
    ],
  },
} as const satisfies Pick<
  SpritesheetData,
  "frames" | "animations"
> satisfies AnimationsOfFrames<keyof typeof frames>;
