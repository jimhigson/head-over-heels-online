import {
  isItemType,
  isPlayableItem,
  type FreeItemTypes,
  type ItemInPlay,
} from "@/model/ItemInPlay";
import { type MechanicResult } from "../MechanicResult";
import {
  conveyorSpeedPixPerMs,
  playerWalkTerminalSpeedPixPerMs,
} from "../mechanicsConstants";
import type { GameState } from "@/game/gameState/GameState";
import type { PlanetName } from "@/sprites/planets";
import {
  oppositeDirection,
  originXyz,
  scaleXyz,
  unitVectors,
} from "@/utils/vectors/vectors";

const resetConveyorStateForItem = {
  vels: {
    movingFloor: originXyz,
  },
  stateDelta: {
    activeConveyor: null,
  },
};
/**
 * handle *only* the vertical speed downwards, and recognising
 * when the fall is done
 *
 * The item can be anything - a player, a pickup etc
 */
export const onConveyor = <RoomId extends string>(
  item: ItemInPlay<FreeItemTypes, PlanetName, RoomId>,
  _gameState: GameState<RoomId>,
  _deltaMS: number,
): MechanicResult<FreeItemTypes> => {
  if (isPlayableItem(item) && item.state.teleporting !== null) {
    return resetConveyorStateForItem;
  }

  const {
    state: { standingOn },
  } = item;

  const standingOnConveyors = standingOn.filter(isItemType("conveyor"));
  const activeConveyorItem = standingOnConveyors.at(0);

  if (activeConveyorItem === undefined) {
    return resetConveyorStateForItem;
  }

  const {
    config: { direction },
  } = activeConveyorItem;

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
    heelsWalkingAgainst ?
      playerWalkTerminalSpeedPixPerMs.heels
    : conveyorSpeedPixPerMs;

  const conveyorVelocity = scaleXyz(unitVectors[direction], conveyorSpeed);

  return {
    vels: {
      movingFloor: conveyorVelocity,
    },
    stateDelta: {
      activeConveyor: activeConveyorItem,
    },
  };
};
