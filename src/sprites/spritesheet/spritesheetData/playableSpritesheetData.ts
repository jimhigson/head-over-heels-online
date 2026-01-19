import type { SpritesheetData, SpritesheetFrameData } from "pixi.js";

import type { CharacterName } from "../../../model/modelTypes";
import type { DirectionXy8, Xy } from "../../../utils/vectors/vectors";
import type { AnimationsOfFrames } from "./AnimationsOfFrames";
import type { FramesWithSpeed } from "./spriteSheetData";

import { zxSpectrumFrameRate } from "../../../originalGame";
import { directionsXy8 } from "../../../utils/vectors/vectors";
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
import { withSpeed } from "./withSpeed";

type WalkingTextureId<
  P extends CharacterName = CharacterName,
  D extends DirectionXy8 = DirectionXy8,
> = `${P}.walking.${D}.${"1" | "2" | "3"}`;

type PlayableTextureId<P extends CharacterName = CharacterName> =
  | `${P}.blinking.${DirectionXy8}`
  | `${P}.falling.${DirectionXy8}`
  | `${P}.standing.${DirectionXy8}`
  | `shadowMask.${P}.${DirectionXy8}`
  | `shadowMask.${P}.falling.${DirectionXy8}`
  | WalkingTextureId<P>;

type WalkingAnimationId<
  P extends CharacterName,
  D extends DirectionXy8 = DirectionXy8,
> = `${P}.walking.${D}`;

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

const heelsBlinking = (
  direction: DirectionXy8,
  neutralWalkFrame: number = 2,
) => {
  const totalFrames = Math.round(heelsBlinkPeriod / (zxSpectrumFrameRate * 4));

  const neutralTextureId =
    direction === "towards" || direction === "right" ?
      `heels.standing.${direction}`
    : `heels.walking.${direction}.${neutralWalkFrame}`;
  const blinkingTextureId = `heels.blinking.${direction}`;

  const blinkingFrames: Array<keyof typeof frames> = [
    ...new Array(Math.floor(totalFrames * 0.8)).fill(neutralTextureId),
    ...new Array(Math.ceil(totalFrames * 0.2)).fill(blinkingTextureId),
  ];
  return withSpeed(blinkingFrames, 0.5);
};

const playableFrames = <P extends CharacterName>(
  p: P,
  gridLocation: Xy,
  missingFrames: {
    [D in DirectionXy8]?: {
      noBlinking?: boolean;
      noShadowMask?: boolean;
      noShadowMaskFalling?: boolean;
      noStanding?: boolean;
    };
  },
) => {
  const directionsOrderOnSpritesheet: DirectionXy8[] = [
    "awayLeft",
    "away",
    "awayRight",
    "right",
    "towardsRight",
    "towards",
    "towardsLeft",
    "left",
  ];

  function* generate(): Generator<
    [PlayableTextureId<P>, SpritesheetFrameData]
  > {
    for (let iD = 0; iD < directionsXy8.length; iD++) {
      const d = directionsOrderOnSpritesheet[iD];

      if (!missingFrames[d]?.noShadowMaskFalling) {
        yield [
          `shadowMask.${p}.falling.${d}`,
          {
            frame: {
              ...smallItemGridLocation({
                x: gridLocation.x,
                y: gridLocation.y + iD,
              }),
              ...smallItemTextureSize,
            },
          },
        ] as const;
      }

      if (!missingFrames[d]?.noShadowMask) {
        yield [
          `shadowMask.${p}.${d}`,
          {
            frame: {
              ...smallItemGridLocation({
                x: gridLocation.x + 1,
                y: gridLocation.y + iD,
              }),
              ...smallItemTextureSize,
            },
          },
        ] as const;
      }

      for (let iN: 1 | 2 | 3 = 1; iN <= 3; iN++) {
        yield [
          `${p}.walking.${d}.${iN as 1 | 2 | 3}`,
          {
            frame: {
              ...smallItemGridLocation({
                x: gridLocation.x + iN + 1,
                y: gridLocation.y + iD,
              }),
              ...smallItemTextureSize,
            },
          },
        ] as const;
      }
      yield [
        `${p}.falling.${d}`,
        {
          frame: {
            ...smallItemGridLocation({
              x: gridLocation.x + 5,
              y: gridLocation.y + iD,
            }),
            ...smallItemTextureSize,
          },
        },
      ] as const;

      if (!missingFrames[d]?.noBlinking) {
        yield [
          `${p}.blinking.${d}`,
          {
            frame: {
              ...smallItemGridLocation({
                x: gridLocation.x + 6,
                y: gridLocation.y + iD,
              }),
              ...smallItemTextureSize,
            },
          },
        ] as const;
      }

      if (!missingFrames[d]?.noStanding) {
        yield [
          `${p}.standing.${d}`,
          {
            frame: {
              ...smallItemGridLocation({
                x: gridLocation.x + 7,
                y: gridLocation.y + iD,
              }),
              ...smallItemTextureSize,
            },
          },
        ] as const;
      }
    }
  }

  return Object.fromEntries(generate()) as Record<
    PlayableTextureId<P>,
    SpritesheetFrameData
  >;
};

function walkingAnimation<P extends CharacterName>(p: P) {
  function* walkingFramesGen<P extends CharacterName, D extends DirectionXy8>(
    p: P,
    d: D,
  ): Generator<WalkingTextureId<P, D>> {
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
    WalkingAnimationId<P>,
    FramesWithSpeed<Array<WalkingTextureId<P>>>
  >;
}

const frames = {
  ...seriesOfNumberedTextures(
    "bubbles.head",
    6,
    smallItemGridLocation({ x: 1, y: 10 }),
    smallItemTextureSize,
  ),
  ...playableFrames(
    "head",
    { x: 0, y: 11 },
    {
      awayLeft: {
        noBlinking: true,
        noStanding: true,
        noShadowMaskFalling: true,
      },
      away: { noBlinking: true, noStanding: true },
      awayRight: { noStanding: true, noShadowMaskFalling: true },
      right: { noStanding: true },
      towardsRight: { noStanding: true },
      towards: {
        noShadowMask: true,
        noStanding: true,
        noShadowMaskFalling: true,
      },
      towardsLeft: {
        noShadowMask: true,
        noStanding: true,
        noShadowMaskFalling: true,
      },
      left: {
        noBlinking: true,
        noShadowMask: true,
        noStanding: true,
        noShadowMaskFalling: true,
      },
    },
  ),

  // Heels
  // ------------
  ...seriesOfNumberedTextures(
    "bubbles.heels",
    6,
    smallItemGridLocation({ x: 9, y: 10 }),
    smallItemTextureSize,
  ),
  ...playableFrames(
    "heels",
    { x: 8, y: 11 },
    {
      awayLeft: {
        noBlinking: true,
        noStanding: true,
        noShadowMaskFalling: true,
      },
      away: { noBlinking: true, noStanding: true, noShadowMaskFalling: true },
      awayRight: {
        noStanding: true,
        noShadowMaskFalling: true,
      },
      right: { noShadowMaskFalling: true },
      towardsRight: { noStanding: true, noShadowMaskFalling: true },
      towards: { noShadowMask: true, noShadowMaskFalling: true },
      towardsLeft: {
        noShadowMask: true,
        noStanding: true,
        noShadowMaskFalling: true,
      },
      left: {
        noBlinking: true,
        noShadowMask: true,
        noStanding: true,
        noShadowMaskFalling: true,
      },
    },
  ),

  ...seriesOfNumberedTextures(
    "shine.head",
    6,
    largeItemGridLocation({ x: 0, y: 4 }),
    largeItemTextureSize,
    3,
  ),
  ...seriesOfNumberedTextures(
    "shine.heels",
    6,
    largeItemGridLocation({ x: 0, y: 6 }),
    largeItemTextureSize,
    3,
  ),

  // deliberately blank sprite to use as a noop
  blank: {
    frame: {
      ...smallItemGridLocation({ x: 0, y: 2 }),
      ...smallItemTextureSize,
    },
  },

  "shadow.playable": {
    frame: {
      ...smallItemGridLocation({ x: 7, y: 10 }),
      ...smallItemTextureSize,
    },
  },
} as const satisfies SpritesheetData["frames"];

export const playableSpritesheetData = {
  frames,
  animations: {
    ...walkingAnimation("head"),
    ...walkingAnimation("heels"),
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
        "heels.standing.towards",
        "heels.walking.left.2",
        "heels.walking.away.2",
        "heels.standing.right",
      ] as const,
      1 / 16,
    ),
    "heels.mixedDirections": withSpeed(
      [
        "heels.walking.towardsRight.2",
        "heels.standing.towards",
        "heels.walking.towardsLeft.2",
        "heels.walking.left.2",
        "heels.walking.awayLeft.2",
        "heels.walking.away.2",
        "heels.walking.awayRight.2",
        "heels.standing.right",
      ] as const,
      1 / 8,
    ),
    "head.idle.right": headBlinking("right", 3),
    "head.idle.towards": headBlinking("towards", 3),
    "head.idle.towardsRight": headBlinking("towardsRight", 2),
    "head.idle.towardsLeft": headBlinking("towardsLeft", 2),
    "head.idle.awayRight": headBlinking("awayRight", 2),
    "heels.idle.right": heelsBlinking("right"),
    "heels.idle.towards": heelsBlinking("towards"),
    "heels.idle.towardsRight": heelsBlinking("towardsRight", 2),
    "heels.idle.towardsLeft": heelsBlinking("towardsLeft", 2),
    "heels.idle.awayRight": heelsBlinking("awayRight", 2),
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
    "shine.head": withSpeed(
      seriesOfAnimationFrameTextureIds("shine.head", 6),
      0.5,
    ),
    "shine.heels": withSpeed(
      seriesOfAnimationFrameTextureIds("shine.heels", 6),
      0.5,
    ),
    "shine.headInSymbio": withSpeed(
      [
        "shine.head.1",
        "shine.head.2",
        "shine.head.3",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "shine.head.4",
        "shine.head.5",
        "shine.head.6",
      ] as const,
      0.5,
    ),
    "shine.heelsInSymbio": withSpeed(
      [
        "blank",
        "blank",
        "blank",
        "shine.heels.1",
        "shine.heels.2",
        "shine.heels.3",
        "shine.heels.4",
        "shine.heels.5",
        "shine.heels.6",
        "blank",
        "blank",
        "blank",
      ] as const,
      0.5,
    ),
  },
} as const satisfies Pick<
  SpritesheetData,
  "animations" | "frames"
> satisfies AnimationsOfFrames<keyof typeof frames>;
