import type { HeadAbilities } from "../../../model/ItemStateMap";
import type { PlayableItem } from "../../physics/itemPredicates";

import { blockSizePx } from "../../physics/mechanicsConstants";
import { shieldDuration } from "../../physics/mechanicsConstants";

export const shieldRemainingForAbilities = (abilities?: {
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

export const playableHasShield = (playableItem: PlayableItem): boolean => {
  return playableItem.type === "headOverHeels" ?
      // in this case, both playables in symbiosis should have the same shield
      // left, so arbitrarily choose head:
      shieldRemainingForAbilities(playableItem.state.head) > 0 ||
        shieldRemainingForAbilities(playableItem.state.heels) > 0
    : shieldRemainingForAbilities(playableItem.state) > 0;
};

export const fastStepsRemaining = (abilities: HeadAbilities) => {
  // how far a quick steps rabbit lets us walk fast:
  const quickStepsDistance = 100 * blockSizePx.x;

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
        blockSizePx.x,
    );

  return fastStepsRemaining;
};
