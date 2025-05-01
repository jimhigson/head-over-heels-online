import type { SpritesheetData, SpritesheetFrameData } from "pixi.js";
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
import type { Xy } from "../utils/vectors/vectors";
import { directionsXy8, type DirectionXy8 } from "../utils/vectors/vectors";
import type { AnimationsOfFrames } from "./AnimationsOfFrames";
import { zxSpectrumFrameRate } from "../originalGame";
import type { FramesWithSpeed } from "./spriteSheetData";
import { withSpeed } from "./withSpeed";

type WalkingTextureId<
  P extends CharacterName = CharacterName,
  D extends DirectionXy8 = DirectionXy8,
> = `${P}.walking.${D}.${"1" | "2" | "3"}`;
type PlayableTextureId<P extends CharacterName = CharacterName> =
  | WalkingTextureId<P>
  | `${P}.blinking.${DirectionXy8}`
  | `${P}.falling.${DirectionXy8}`;
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

const playableFrames = <P extends CharacterName>(
  p: P,
  gridLocation: Xy,
  missingFrames: {
    [D in DirectionXy8]?: { noBlinking?: boolean };
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
      for (let iN = 0; iN <= 2; iN++) {
        yield [
          `${p}.walking.${d}.${(iN + 1) as 1 | 2 | 3}`,
          {
            frame: {
              ...smallItemGridLocation({
                x: gridLocation.x + iN,
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
              x: gridLocation.x + 3,
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
                x: gridLocation.x + 4,
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
    smallItemGridLocation({ x: 0, y: 6 }),
    smallItemTextureSize,
  ),
  ...playableFrames(
    "head",
    { x: 0, y: 7 },
    {
      awayLeft: { noBlinking: true },
      away: { noBlinking: true },
      left: { noBlinking: true },
    },
  ),

  // Heels
  // ------------
  ...seriesOfNumberedTextures(
    "bubbles.heels",
    6,
    smallItemGridLocation({ x: 6, y: 6 }),
    smallItemTextureSize,
  ),
  ...playableFrames(
    "heels",
    { x: 5, y: 7 },
    {
      awayLeft: { noBlinking: true },
      away: { noBlinking: true },
      awayRight: { noBlinking: true },
      towardsLeft: { noBlinking: true },
      left: { noBlinking: true },
    },
  ),

  ...seriesOfNumberedTextures(
    "shine",
    6,
    largeItemGridLocation({ x: 8, y: -2 }),
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
