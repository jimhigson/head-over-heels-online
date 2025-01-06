import type { SpritesheetData } from "pixi.js";
import { seriesOfAnimationFrameTextures } from "./spriteGenerators";
import { smallItemTextureSize } from "./textureSizes";
import type { CharacterName } from "@/model/modelTypes";
import type { DirectionXy4 } from "@/utils/vectors/vectors";
import { directionsXy4 } from "@/utils/vectors/vectors";
import type { AnimationsOfFrames } from "./AnimationsOfFrames";
import { zxSpectrumFrameRate } from "@/originalGame";

function walkingFrames<P extends CharacterName>(p: P) {
  function* walkingFramesGen<P extends CharacterName, D extends DirectionXy4>(
    p: P,
    d: D,
  ): Generator<`${P}.walking.${D}.${"1" | "2" | "3"}`> {
    // if are starting walking from standing, am coming from walking frame 2 already (which doubles up as the idle frame)
    // except head has his frame 3 as the idle frame (it matches his blinking frame). Need to start on 1 so it is different
    // whichever we are coming from
    yield `${p}.walking.${d}.1`;
    yield `${p}.walking.${d}.2`;
    yield `${p}.walking.${d}.3`;
    yield `${p}.walking.${d}.2`;
  }

  return directionsXy4.reduce(
    (ac, d) => ({
      ...ac,
      [`${p}.walking.${d}`]: [...walkingFramesGen(p, d)],
    }),
    {},
  ) as Record<
    `${P}.walking.${DirectionXy4}`,
    Array<`${P}.walking.${DirectionXy4}.${"1" | "2" | "3"}`>
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
  "head.blinking.towards": {
    frame: { x: 54, y: 291, ...smallItemTextureSize },
  },
  "head.blinking.right": {
    frame: { x: 130, y: 291, ...smallItemTextureSize },
  },
  "head.falling.towards": {
    frame: { x: 29, y: 291, ...smallItemTextureSize },
  },
  "head.falling.right": {
    frame: { x: 105, y: 291, ...smallItemTextureSize },
  },
  ...seriesOfAnimationFrameTextures(
    "bubbles.head",
    6,
    { x: 4, y: 215 },
    smallItemTextureSize,
  ),

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
  ...seriesOfAnimationFrameTextures(
    "bubbles.heels",
    6,
    { x: 159, y: 215 },
    smallItemTextureSize,
  ),
} as const;

// head blinks every 5s in the original game
const headBlinkPeriod = 5_000;
const nonBlinkingFrames =
  Math.round(headBlinkPeriod / (zxSpectrumFrameRate * 4)) - 3;
export const playableSpritesheetData = {
  frames,
  animations: {
    ...walkingFrames("head"),
    ...walkingFrames("heels"),
    "head.idle.right": [
      // 50 frames of non-blinking confirmed against original to be about the same rate
      ...new Array(nonBlinkingFrames).fill("head.walking.right.3"),
      "head.blinking.right",
      "head.walking.right.3",
      "head.blinking.right",
    ],
    "head.idle.towards": [
      ...new Array(nonBlinkingFrames).fill("head.walking.towards.3"),
      "head.blinking.towards",
      "head.walking.towards.3",
      "head.blinking.towards",
    ],
    // teleport or death animations
    // frames in the original are: 1, 1-r, 2-r, 2, 2-r, 3-r, 3, 3-r, 3
    // as converted: 1, 2, 4, 3, 4, 6, 5, 6, 5
    "head.fadeOut": [
      "bubbles.head.1",
      "bubbles.head.2",
      "bubbles.head.4",
      "bubbles.head.3",
      "bubbles.head.4",
      "bubbles.head.6",
      "bubbles.head.5",
      "bubbles.head.6",
      "bubbles.head.5",
    ],
    "heels.fadeOut": [
      "bubbles.heels.1",
      "bubbles.heels.2",
      "bubbles.heels.4",
      "bubbles.heels.3",
      "bubbles.heels.4",
      "bubbles.heels.6",
      "bubbles.heels.5",
      "bubbles.heels.6",
      "bubbles.heels.5",
    ],
  },
} as const satisfies Pick<
  SpritesheetData,
  "frames" | "animations"
> satisfies AnimationsOfFrames<keyof typeof frames>;
