import {
  isItemType,
  type FallingItemTypes,
  type ItemInPlay,
} from "@/model/ItemInPlay";
import type { MechanicResult } from "../MechanicResult";
import { unitMechanicalResult } from "../MechanicResult";
import type { GameState } from "@/game/gameState/GameState";
import type { PlanetName } from "@/sprites/planets";
import { oppositeDirection, scaleXyz, unitVectors } from "@/utils/vectors";
import {
  conveyorSpeedPixPerMs,
  playerWalkSpeedPixPerMs,
} from "../mechanicsConstants";

/**
 * handle *only* the vertical speed downwards, and recognising
 * when the fall is done
 *
 * The item can be anything - a player, a pickup etc
 */
export const standingOnConveyor = <RoomId extends string>(
  item: ItemInPlay<FallingItemTypes, PlanetName, RoomId>,
  _gameState: GameState<RoomId>,
  deltaMS: number,
): MechanicResult<FallingItemTypes> => {
  if (
    item.state.standingOn === null ||
    item.state.standingOn.type !== "conveyor"
  ) {
    return unitMechanicalResult;
  }

  const {
    config: { direction },
  } = item.state.standingOn;

  /**
   * conveyors magically move quicker when heels is fighting against them, so that all
   * characters can only just stay still when walking against them, regardless of how
   * fast the character walks
   */
  const heelsWalkingAgainst =
    isItemType("heels")(item) &&
    item.state.action === "moving" &&
    item.state.facing === oppositeDirection(direction);

  const conveyorSpeed =
    heelsWalkingAgainst ? playerWalkSpeedPixPerMs.heels : conveyorSpeedPixPerMs;

  const walkDistance = conveyorSpeed * deltaMS;

  return {
    positionDelta: scaleXyz(unitVectors[direction], walkDistance),
  };
};
