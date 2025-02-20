import type { HeadAbilities } from "../../../model/ItemStateMap";
import { blockSizePx } from "../../../sprites/spritePivots";
import { shieldDuration } from "../../physics/mechanicsConstants";

export const shieldRemaining = (abilities?: {
  shieldCollectedAt: number;
  gameTime: number;
}) => {
  if (abilities === undefined) {
    return 0;
  }

  const { shieldCollectedAt, gameTime } = abilities;

  const hasShield =
    shieldCollectedAt !== null && shieldCollectedAt + shieldDuration > gameTime;

  return hasShield ?
      100 - Math.ceil((gameTime - shieldCollectedAt) / (shieldDuration / 100))
    : 0;
};

export const fastStepsRemaining = (abilities: HeadAbilities) => {
  // how far a quick steps rabbit lets us walk fast:
  const quickStepsDistance = 100 * blockSizePx.w;

  const hasFastSteps =
    abilities.gameWalkDistance <=
    abilities.fastStepsStartedAtDistance + quickStepsDistance;

  if (!hasFastSteps) {
    return 0;
  }

  const fastStepsRemaining =
    100 -
    Math.ceil(
      (abilities.gameWalkDistance - abilities.fastStepsStartedAtDistance) /
        blockSizePx.w,
    );

  return fastStepsRemaining;
};
