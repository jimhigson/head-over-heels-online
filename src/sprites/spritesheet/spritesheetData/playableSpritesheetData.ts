import type { SpritesheetData, SpritesheetFrameData } from "pixi.js";

import type { CharacterName } from "../../../model/modelTypes";
import type { DirectionXy8, Xy } from "../../../utils/vectors/vectors";
import type { AnimationsOfFrames } from "./AnimationsOfFrames";
import type { FramesWithSpeed } from "./makeSpritesheetData";
import type {
  PlayableDirectionFrames,
  PlayableSpritesheetFrames,
  PlayableSpritesheetMetaData,
} from "./spritesheetMetaData";

import { zxSpectrumFrameRate } from "../../../originalGame";
import { fromEntries } from "../../../utils/entries";
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
  | `${P}.looking1.${DirectionXy8}`
  | `${P}.looking2.${DirectionXy8}`
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

const standingTextureId = <P extends CharacterName>(
  p: P,
  direction: DirectionXy8,
  directionFrames: PlayableDirectionFrames,
):
  | `${P}.standing.${DirectionXy8}`
  | `${P}.walking.${DirectionXy8}.${1 | 2 | 3}` => {
  const { standing } = directionFrames;
  if (!standing) {
    throw new Error(`no standing defined for ${p}.${direction}`);
  }

  return standing === true ?
      `${p}.standing.${direction}`
    : `${p}.walking.${direction}.${standing}`;
};

const headBlinkingFrames = (
  direction: DirectionXy8,
  directionFrames: PlayableDirectionFrames,
) => {
  const totalFrames = Math.round(headBlinkPeriod / (zxSpectrumFrameRate * 4));

  const neutralTextureId: PlayableFrame = standingTextureId(
    "head",
    direction,
    directionFrames,
  );

  const look1TextureId: PlayableFrame | undefined =
    directionFrames.looking1 ? `head.looking1.${direction}` : undefined;
  const look2TextureId: PlayableFrame | undefined =
    directionFrames.looking2 ? `head.looking2.${direction}` : undefined;
  const blinkingTextureId: PlayableFrame | undefined =
    directionFrames.blinking ? `head.blinking.${direction}` : undefined;

  const frameIndex = (u: number) => {
    return Math.floor(totalFrames * u);
  };

  const blinkingFrames: Array<PlayableFrame> = new Array(totalFrames).fill(
    neutralTextureId,
  );
  if (look1TextureId) {
    blinkingFrames.fill(look1TextureId, frameIndex(0.15), frameIndex(0.35));
  }
  if (look2TextureId) {
    blinkingFrames.fill(look2TextureId, frameIndex(0.35), frameIndex(0.55));
  }
  if (look1TextureId && look2TextureId && blinkingTextureId) {
    // blinking frame in-between looking left/right:
    blinkingFrames[frameIndex(0.35)] = blinkingTextureId;
  }

  if (blinkingTextureId) {
    // double-blink at the end: blink, neutral, blink
    blinkingFrames[totalFrames - 3] = blinkingTextureId;
    blinkingFrames[totalFrames - 1] = blinkingTextureId;
  }

  // extra frames at the start if more is happening:
  const extraFrames =
    (look1TextureId ? frameIndex(0.4) : 0) +
    (look2TextureId ? frameIndex(0.4) : 0);
  blinkingFrames.unshift(...new Array(extraFrames).fill(neutralTextureId));

  return withSpeed(blinkingFrames, 0.5);
};

const heelsBlinkingFrames = (
  direction: DirectionXy8,
  directionFrames: PlayableDirectionFrames,
) => {
  const totalFrames = Math.round(heelsBlinkPeriod / (zxSpectrumFrameRate * 4));

  const neutralTextureId: PlayableFrame = standingTextureId(
    "heels",
    direction,
    directionFrames,
  );
  const look1TextureId: PlayableFrame | undefined =
    directionFrames.looking1 ? `heels.looking1.${direction}` : undefined;
  const look2TextureId: PlayableFrame | undefined =
    directionFrames.looking2 ? `heels.looking2.${direction}` : undefined;
  const blinkingTextureId: PlayableFrame | undefined =
    directionFrames.blinking ? `heels.blinking.${direction}` : undefined;

  const frameIndex = (u: number) => {
    return Math.floor(totalFrames * u);
  };

  const blinkingFrames: Array<PlayableFrame> = new Array(totalFrames).fill(
    neutralTextureId,
  );

  if (look1TextureId) {
    blinkingFrames.fill(look1TextureId, frameIndex(0.4), frameIndex(0.55));
  }
  if (look2TextureId) {
    blinkingFrames.fill(look2TextureId, frameIndex(0.55), frameIndex(0.7));
  }
  if (look1TextureId && look2TextureId && blinkingTextureId) {
    // blinking frame in-between looking left/right:
    blinkingFrames[frameIndex(0.55)] = blinkingTextureId;
  }
  if (blinkingTextureId) {
    blinkingFrames.fill(blinkingTextureId, frameIndex(0.8), frameIndex(1));
  }

  return withSpeed(blinkingFrames, 0.5);
};

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

const playableFrames = <P extends CharacterName>(
  p: P,
  gridLocation: Xy,
  availableFrames: PlayableSpritesheetFrames,
  overrides: {
    [t in PlayableTextureId<P>]?: {
      w?: number;
      h?: number;
      pivot?: { x: number; y: number };
    };
  } = {},
) => {
  function* generate(): Generator<
    [PlayableTextureId<P>, SpritesheetFrameData & { pivot?: Xy }]
  > {
    for (let iD = 0; iD < directionsOrderOnSpritesheet.length; iD++) {
      const d = directionsOrderOnSpritesheet[iD];

      const directionFrames = availableFrames[d];

      if (!directionFrames || directionFrames.shadowMaskFalling) {
        const textureId = `shadowMask.${p}.falling.${d}` as const;
        yield [
          textureId,
          {
            frame: {
              ...smallItemGridLocation({
                x: gridLocation.x,
                y: gridLocation.y + iD,
              }),
              ...smallItemTextureSize,
              ...overrides[textureId],
            },
          },
        ] as const;
      }

      if (!directionFrames || directionFrames.shadowMask) {
        const textureId = `shadowMask.${p}.${d}` as const;
        yield [
          textureId,
          {
            frame: {
              ...smallItemGridLocation({
                x: gridLocation.x + 1,
                y: gridLocation.y + iD,
              }),
              ...smallItemTextureSize,
              ...overrides[textureId],
            },
          },
        ] as const;
      }

      for (let iN: 1 | 2 | 3 = 1; iN <= 3; iN++) {
        const textureId = `${p}.walking.${d}.${iN as 1 | 2 | 3}` as const;
        yield [
          textureId,
          {
            frame: {
              ...smallItemGridLocation({
                x: gridLocation.x + iN + 1,
                y: gridLocation.y + iD,
              }),
              ...smallItemTextureSize,
              ...overrides[textureId],
            },
          },
        ] as const;
      }
      const textureId = `${p}.falling.${d}` as const;
      yield [
        textureId,
        {
          frame: {
            ...smallItemGridLocation({
              x: gridLocation.x + 5,
              y: gridLocation.y + iD,
            }),
            ...smallItemTextureSize,
            ...overrides[textureId],
          },
        },
      ] as const;

      if (!directionFrames || directionFrames.blinking) {
        const textureId = `${p}.blinking.${d}` as const;
        yield [
          textureId,
          {
            frame: {
              ...smallItemGridLocation({
                x: gridLocation.x + 6,
                y: gridLocation.y + iD,
              }),
              ...smallItemTextureSize,
              ...overrides[textureId],
            },
          },
        ] as const;
      }

      if (!directionFrames || directionFrames.looking1) {
        const textureId = `${p}.looking1.${d}` as const;
        yield [
          textureId,
          {
            frame: {
              ...smallItemGridLocation({
                x: gridLocation.x + 7,
                y: gridLocation.y + iD,
              }),
              ...smallItemTextureSize,
              ...overrides[textureId],
            },
          },
        ] as const;
      }

      if (!directionFrames || directionFrames.looking2) {
        const textureId = `${p}.looking2.${d}` as const;
        yield [
          textureId,
          {
            frame: {
              ...smallItemGridLocation({
                x: gridLocation.x + 8,
                y: gridLocation.y + iD,
              }),
              ...smallItemTextureSize,
              ...overrides[textureId],
            },
          },
        ] as const;
      }

      if (!directionFrames || directionFrames.standing === true) {
        const textureId = `${p}.standing.${d}` as const;
        yield [
          textureId,
          {
            frame: {
              ...smallItemGridLocation({
                x: gridLocation.x + 9,
                y: gridLocation.y + iD,
              }),
              ...smallItemTextureSize,
              ...overrides[textureId],
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

const makeFrames = (playableSpritesheetMetaData: PlayableSpritesheetMetaData) =>
  ({
    ...seriesOfNumberedTextures(
      "bubbles.head",
      6,
      smallItemGridLocation({ x: 1, y: 10 }),
      smallItemTextureSize,
    ),
    ...playableFrames(
      "head",
      { x: 0, y: 11 },
      playableSpritesheetMetaData.head,
    ),

    // Heels
    // ------------
    ...seriesOfNumberedTextures(
      "bubbles.heels",
      6,
      smallItemGridLocation({ x: 10, y: 10 }),
      smallItemTextureSize,
    ),
    ...playableFrames(
      "heels",
      { x: 9, y: 11 },
      playableSpritesheetMetaData.heels,
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
        ...largeItemGridLocation({ x: 0, y: 8 }),
        ...largeItemTextureSize,
      },
    },

    "shadow.playable": {
      frame: {
        ...smallItemGridLocation({ x: 7, y: 10 }),
        ...smallItemTextureSize,
      },
    },
  }) as const satisfies SpritesheetData["frames"];

type PlayableFrame = keyof ReturnType<typeof makeFrames>;

export const playableSpritesheetData = (
  playableSpritesheetMetaData: PlayableSpritesheetMetaData,
) => {
  const frames = makeFrames(playableSpritesheetMetaData);

  type IdleAnimationId = `${CharacterName}.idle.${DirectionXy8}`;

  function* idleAnimationsFor(
    character: CharacterName,
    characterFrames: PlayableSpritesheetFrames,
    blinkFn: (
      d: DirectionXy8,
      directionFrames: PlayableDirectionFrames,
    ) => FramesWithSpeed<PlayableFrame[]>,
  ): Generator<[IdleAnimationId, FramesWithSpeed<PlayableFrame[]>]> {
    for (const d of directionsXy8) {
      if (characterFrames[d]?.blinking && characterFrames[d]?.standing) {
        yield [`${character}.idle.${d}`, blinkFn(d, characterFrames[d])];
      }
    }
  }

  const idleAnimations = {
    ...fromEntries(
      idleAnimationsFor(
        "head",
        playableSpritesheetMetaData.head,
        headBlinkingFrames,
      ),
    ),
    ...fromEntries(
      idleAnimationsFor(
        "heels",
        playableSpritesheetMetaData.heels,
        heelsBlinkingFrames,
      ),
    ),
  };

  return {
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
          // ignore standing frames or that frame 3 might be the standing frame from the walking animation sometimes,
          // these aren't that important so just hardcode to 2, which will always exist
          "heels.walking.towards.2",
          "heels.walking.left.2",
          "heels.walking.away.2",
          "heels.walking.right.2",
        ] as const,
        1 / 16,
      ),
      "heels.mixedDirections": withSpeed(
        [
          "heels.walking.towardsRight.2",
          "heels.walking.towards.2",
          "heels.walking.towardsLeft.2",
          "heels.walking.left.2",
          "heels.walking.awayLeft.2",
          "heels.walking.away.2",
          "heels.walking.awayRight.2",
          "heels.walking.right.2",
        ] as const,
        1 / 8,
      ),
      ...idleAnimations,
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
  > satisfies AnimationsOfFrames<PlayableFrame>;
};
