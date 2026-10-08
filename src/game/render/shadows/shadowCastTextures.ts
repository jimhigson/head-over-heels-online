import { octantIndexOfDirection } from "../../../utils/vectors/octantIndexOfDirection" with { type: "macro" };
import { type ShadowCastSpriteOptions } from "../ShadowCastSpriteOptions";

export const shadowLift: ShadowCastSpriteOptions = Object.freeze({
  animationId: "shadow.lift",
});

export const shadowSmallBlock: ShadowCastSpriteOptions = Object.freeze({
  textureId: "shadow.smallBlock",
});

export const shadowSmallRound: ShadowCastSpriteOptions = Object.freeze({
  textureId: "shadow.smallRound",
});

export const shadowFullBlock: ShadowCastSpriteOptions = Object.freeze({
  textureId: "shadow.fullBlock",
});

export const shadowFullBlockFlipX: ShadowCastSpriteOptions = Object.freeze({
  textureId: "shadow.fullBlock",
  flipX: true,
});

// the barrier shadow art is drawn for a y-axis barrier; the x-axis variant is
// the same art flipped. Which axis the barrier renders along swaps on odd
// quarter camera turns, so the flip must swap with it:
export const shadowBarrier: ShadowCastSpriteOptions = Object.freeze({
  textureId: `shadow.barrier.d${octantIndexOfDirection("away")}`,
  flipsOnOddQuarterCameraTurns: true,
});

export const shadowBarrierFlipX: ShadowCastSpriteOptions = Object.freeze({
  textureId: `shadow.barrier.d${octantIndexOfDirection("away")}`,
  flipX: true,
  flipsOnOddQuarterCameraTurns: true,
});

export const shadowScroll: ShadowCastSpriteOptions = Object.freeze({
  textureId: "shadow.scroll",
});

export const shadowPlayable: ShadowCastSpriteOptions = Object.freeze({
  textureId: "shadow.playable",
});

export const shadowWallCorner: ShadowCastSpriteOptions = Object.freeze({
  textureId: "shadow.wallCorner",
});

/**
 * shadow textures baked for the wall's physical axis at the base angle; the
 * shadow renderer flips them when the camera rotates onto an odd quarter turn
 */
export const shadowWallY: ShadowCastSpriteOptions = Object.freeze({
  textureId: `shadow.wall.d${octantIndexOfDirection("away")}`,
  flipsOnOddQuarterCameraTurns: true,
});

export const shadowWallX: ShadowCastSpriteOptions = Object.freeze({
  textureId: `shadow.wall.d${octantIndexOfDirection("away")}`,
  flipX: true,
  flipsOnOddQuarterCameraTurns: true,
});

/**
 * shadow textures baked for the door's physical axis at the base angle; the
 * shadow renderer flips them when the camera rotates onto an odd quarter turn
 */
export const shadowDoorFloatingThresholdY: ShadowCastSpriteOptions =
  Object.freeze({
    textureId: `shadow.door.floatingThreshold.double.d${octantIndexOfDirection(
      "away",
    )}`,
    flipsOnOddQuarterCameraTurns: true,
  });

export const shadowDoorFloatingThresholdX: ShadowCastSpriteOptions =
  Object.freeze({
    textureId: `shadow.door.floatingThreshold.double.d${octantIndexOfDirection(
      "away",
    )}`,
    flipX: true,
    flipsOnOddQuarterCameraTurns: true,
  });

export const shadowDoorFrameTopY: ShadowCastSpriteOptions = Object.freeze({
  textureId: `shadow.doorFrame.top.d${octantIndexOfDirection("away")}`,
  flipsOnOddQuarterCameraTurns: true,
});

export const shadowDoorFrameTopX: ShadowCastSpriteOptions = Object.freeze({
  textureId: `shadow.doorFrame.top.d${octantIndexOfDirection("away")}`,
  flipX: true,
  flipsOnOddQuarterCameraTurns: true,
});
