import type { SpritesheetData } from "pixi.js";
import {
  seriesOfAnimationFrameTextureIds,
  seriesOfNumberedTextures,
} from "./spriteGenerators";
import {
  largeItemGridLocation,
  largeItemTextureSize,
  smallItemGridLocation,
  smallItemTextureSize,
} from "./textureSizes";
import type { CharacterName } from "../model/modelTypes";
import { directionsXy8, type DirectionXy8 } from "../utils/vectors/vectors";
import type { AnimationsOfFrames } from "./AnimationsOfFrames";
import { zxSpectrumFrameRate } from "../originalGame";
import type { FramesWithSpeed } from "./spriteSheetData";
import { withSpeed } from "./withSpeed";

export const playableWalkAnimationSpeed = 0.5;

// head blinks every 5s in the original game
const headBlinkPeriod = 5_000;
const heelsBlinkPeriod = headBlinkPeriod * 2;

const headBlinking = (direction: DirectionXy8, neutralWalkFrame: number) => {
  const totalFrames = Math.round(headBlinkPeriod / (zxSpectrumFrameRate * 4));

  const neutralTextureId = `head.walking.${direction}.${neutralWalkFrame}`;
  const blinkingTextureId = `head.blinking.${direction}`;
  const blinkingFrames: Array<keyof typeof frames> = [
    ...new Array(totalFrames - 3).fill(neutralTextureId),
    blinkingTextureId,
    neutralTextureId,
    blinkingTextureId,
  ];
  return withSpeed(blinkingFrames, 0.5);
};

const heelsBlinking = (direction: DirectionXy8, neutralWalkFrame: number) => {
  const totalFrames = Math.round(heelsBlinkPeriod / (zxSpectrumFrameRate * 4));

  const neutralTextureId = `heels.walking.${direction}.${neutralWalkFrame}`;
  const blinkingTextureId = `heels.blinking.${direction}`;

  const blinkingFrames: Array<keyof typeof frames> = [
    ...new Array(Math.floor(totalFrames * 0.8)).fill(neutralTextureId),
    ...new Array(Math.ceil(totalFrames * 0.2)).fill(blinkingTextureId),
  ];
  return withSpeed(blinkingFrames, 0.5);
};

function walkingFrames<P extends CharacterName>(p: P) {
  function* walkingFramesGen<P extends CharacterName, D extends DirectionXy8>(
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

  return directionsXy8.reduce(
    (ac, d) => ({
      ...ac,
      [`${p}.walking.${d}`]: withSpeed(
        [...walkingFramesGen(p, d)] as const,
        playableWalkAnimationSpeed,
      ),
    }),
    {},
  ) as Record<
    `${P}.walking.${DirectionXy8}`,
    FramesWithSpeed<Array<`${P}.walking.${DirectionXy8}.${"1" | "2" | "3"}`>>
  >;
}

const frames = {
  ...seriesOfNumberedTextures(
    "bubbles.head",
    6,
    smallItemGridLocation({ x: 0, y: 6 }),
    smallItemTextureSize,
  ),
  ...seriesOfNumberedTextures(
    "head.walking.towards",
    3,
    smallItemGridLocation({ x: 1, y: 11 }),
    smallItemTextureSize,
  ),
  ...seriesOfNumberedTextures(
    "head.walking.right",
    3,
    smallItemGridLocation({ x: 4, y: 11 }),
    smallItemTextureSize,
  ),
  ...seriesOfNumberedTextures(
    "head.walking.left",
    3,
    smallItemGridLocation({ x: 1, y: 9 }),
    smallItemTextureSize,
  ),
  ...seriesOfNumberedTextures(
    "head.walking.away",
    3,
    smallItemGridLocation({ x: 4, y: 9 }),
    smallItemTextureSize,
  ),
  ...seriesOfNumberedTextures(
    "head.walking.towardsRight",
    3,
    smallItemGridLocation({ x: 2, y: 12 }),
    smallItemTextureSize,
  ),
  ...seriesOfNumberedTextures(
    "head.walking.towardsLeft",
    3,
    smallItemGridLocation({ x: 1, y: 10 }),
    smallItemTextureSize,
  ),
  ...seriesOfNumberedTextures(
    "head.walking.awayRight",
    3,
    smallItemGridLocation({ x: 4, y: 10 }),
    smallItemTextureSize,
  ),
  ...seriesOfNumberedTextures(
    "head.walking.awayLeft",
    3,
    smallItemGridLocation({ x: 2, y: 8 }),
    smallItemTextureSize,
  ),
  "head.blinking.towards": {
    frame: {
      ...smallItemGridLocation({ x: 0, y: 12 }),
      ...smallItemTextureSize,
    },
  },
  "head.blinking.right": {
    frame: {
      ...smallItemGridLocation({ x: 7, y: 12 }),
      ...smallItemTextureSize,
    },
  },
  "head.blinking.towardsRight": {
    frame: {
      ...smallItemGridLocation({ x: 5, y: 12 }),
      ...smallItemTextureSize,
    },
  },
  "head.blinking.awayRight": {
    frame: {
      ...smallItemGridLocation({ x: 7, y: 9 }),
      ...smallItemTextureSize,
    },
  },
  "head.blinking.towardsLeft": {
    frame: {
      ...smallItemGridLocation({ x: 0, y: 9 }),
      ...smallItemTextureSize,
    },
  },
  "head.falling.left": {
    frame: {
      ...smallItemGridLocation({ x: 1, y: 8 }),
      ...smallItemTextureSize,
    },
  },
  "head.falling.away": {
    frame: {
      ...smallItemGridLocation({ x: 6, y: 8 }),
      ...smallItemTextureSize,
    },
  },
  "head.falling.awayLeft": {
    frame: {
      ...smallItemGridLocation({ x: 3, y: 7 }),
      ...smallItemTextureSize,
    },
  },
  "head.falling.towards": {
    frame: {
      ...smallItemGridLocation({ x: 0, y: 11 }),
      ...smallItemTextureSize,
    },
  },
  "head.falling.right": {
    frame: {
      ...smallItemGridLocation({ x: 7, y: 11 }),
      ...smallItemTextureSize,
    },
  },
  "head.falling.towardsRight": {
    frame: {
      ...smallItemGridLocation({ x: 6, y: 12 }),
      ...smallItemTextureSize,
    },
  },
  "head.falling.awayRight": {
    frame: {
      ...smallItemGridLocation({ x: 7, y: 10 }),
      ...smallItemTextureSize,
    },
  },
  "head.falling.towardsLeft": {
    frame: {
      ...smallItemGridLocation({ x: 0, y: 10 }),
      ...smallItemTextureSize,
    },
  },

  // Heels
  // ------------
  ...seriesOfNumberedTextures(
    "bubbles.heels",
    6,
    smallItemGridLocation({ x: 7, y: 6 }),
    smallItemTextureSize,
  ),
  ...seriesOfNumberedTextures(
    "heels.walking.towards",
    3,
    smallItemGridLocation({ x: 9, y: 11 }),
    smallItemTextureSize,
  ),
  ...seriesOfNumberedTextures(
    "heels.walking.right",
    3,
    smallItemGridLocation({ x: 12, y: 11 }),
    smallItemTextureSize,
  ),
  ...seriesOfNumberedTextures(
    "heels.walking.left",
    3,
    smallItemGridLocation({ x: 9, y: 9 }),
    smallItemTextureSize,
  ),
  ...seriesOfNumberedTextures(
    "heels.walking.away",
    3,
    smallItemGridLocation({ x: 12, y: 9 }),
    smallItemTextureSize,
  ),
  "heels.falling.left": {
    frame: {
      ...smallItemGridLocation({ x: 9, y: 8 }),
      ...smallItemTextureSize,
    },
  },
  "heels.falling.right": {
    frame: {
      ...smallItemGridLocation({ x: 14, y: 13 }),
      ...smallItemTextureSize,
    },
  },
  "heels.falling.towards": {
    frame: {
      ...smallItemGridLocation({ x: 8, y: 11 }),
      ...smallItemTextureSize,
    },
  },
  "heels.falling.away": {
    frame: {
      ...smallItemGridLocation({ x: 14, y: 8 }),
      ...smallItemTextureSize,
    },
  },
  "heels.falling.awayLeft": {
    frame: {
      ...smallItemGridLocation({ x: 10, y: 8 }),
      ...smallItemTextureSize,
    },
  },
  "heels.falling.awayRight": {
    frame: {
      ...smallItemGridLocation({ x: 8, y: 9 }),
      ...smallItemTextureSize,
    },
  },
  "heels.falling.towardsRight": {
    frame: {
      ...smallItemGridLocation({ x: 10, y: 12 }),
      ...smallItemTextureSize,
    },
  },
  "heels.falling.towardsLeft": {
    frame: {
      ...smallItemGridLocation({ x: 8, y: 10 }),
      ...smallItemTextureSize,
    },
  },
  ...seriesOfNumberedTextures(
    "heels.walking.towardsRight",
    3,
    smallItemGridLocation({ x: 11, y: 12 }),
    smallItemTextureSize,
  ),
  ...seriesOfNumberedTextures(
    "heels.walking.towardsLeft",
    3,
    smallItemGridLocation({ x: 9, y: 10 }),
    smallItemTextureSize,
  ),
  ...seriesOfNumberedTextures(
    "heels.walking.awayRight",
    3,
    smallItemGridLocation({ x: 12, y: 10 }),
    smallItemTextureSize,
  ),
  ...seriesOfNumberedTextures(
    "heels.walking.awayLeft",
    3,
    smallItemGridLocation({ x: 11, y: 8 }),
    smallItemTextureSize,
  ),
  "heels.blinking.towards": {
    frame: {
      ...smallItemGridLocation({ x: 8, y: 12 }),
      ...smallItemTextureSize,
    },
  },
  "heels.blinking.right": {
    frame: {
      ...smallItemGridLocation({ x: 14, y: 12 }),
      ...smallItemTextureSize,
    },
  },
  "heels.blinking.towardsRight": {
    frame: {
      ...smallItemGridLocation({ x: 12, y: 13 }),
      ...smallItemTextureSize,
    },
  },

  ...seriesOfNumberedTextures(
    "shine",
    6,
    largeItemGridLocation({ x: 4, y: -1 }),
    largeItemTextureSize,
  ),
  // deliberately blank sprite to use as a noop
  blank: {
    frame: {
      ...smallItemGridLocation({ x: 14, y: 6 }),
      ...smallItemTextureSize,
    },
  },
} as const satisfies SpritesheetData["frames"];

export const playableSpritesheetData = {
  frames,
  animations: {
    ...walkingFrames("head"),
    ...walkingFrames("heels"),
    "heels.screenDirections": withSpeed(
      [
        "heels.walking.towardsRight.2",
        "heels.walking.towardsLeft.2",
        "heels.walking.awayLeft.2",
        "heels.walking.awayRight.2",
      ] as const,
      1 / 16,
    ),
    "heels.worldDirections": withSpeed(
      [
        "heels.walking.towards.2",
        "heels.walking.left.2",
        "heels.walking.away.2",
        "heels.walking.right.2",
      ] as const,
      1 / 16,
    ),
    "head.idle.right": headBlinking("right", 3),
    "head.idle.towards": headBlinking("towards", 3),
    "head.idle.towardsRight": headBlinking("towardsRight", 2),
    "head.idle.towardsLeft": headBlinking("towardsLeft", 2),
    "head.idle.awayRight": headBlinking("awayRight", 2),
    "heels.idle.right": heelsBlinking("right", 2),
    "heels.idle.towards": heelsBlinking("towards", 2),
    "heels.idle.towardsRight": heelsBlinking("towardsRight", 2),
    // teleport or death animations
    // frames in the original are: 1, 1-r, 2-r, 2, 2-r, 3-r, 3, 3-r, 3
    // as converted: 1, 2, 4, 3, 4, 6, 5, 6, 5
    "head.fadeOut": withSpeed(
      [
        "bubbles.head.1",
        "bubbles.head.2",
        "bubbles.head.4",
        "bubbles.head.3",
        "bubbles.head.4",
        "bubbles.head.6",
        "bubbles.head.5",
        "bubbles.head.6",
        "bubbles.head.5",
      ] as const,
      0.5,
    ),
    "heels.fadeOut": withSpeed(
      [
        "bubbles.heels.1",
        "bubbles.heels.2",
        "bubbles.heels.4",
        "bubbles.heels.3",
        "bubbles.heels.4",
        "bubbles.heels.6",
        "bubbles.heels.5",
        "bubbles.heels.6",
        "bubbles.heels.5",
      ] as const,
      0.5,
    ),
    shine: withSpeed(seriesOfAnimationFrameTextureIds("shine", 6), 0.5),
    "shine.headInSymbio": withSpeed(
      [
        "shine.1",
        "shine.2",
        "shine.3",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "shine.4",
        "shine.5",
        "shine.6",
      ] as const,
      0.5,
    ),
    "shine.heelsInSymbio": withSpeed(
      [
        "blank",
        "blank",
        "blank",
        "shine.1",
        "shine.2",
        "shine.3",
        "shine.4",
        "shine.5",
        "shine.6",
        "blank",
        "blank",
        "blank",
      ] as const,
      0.5,
    ),
  },
} as const satisfies Pick<
  SpritesheetData,
  "frames" | "animations"
> satisfies AnimationsOfFrames<keyof typeof frames>;
