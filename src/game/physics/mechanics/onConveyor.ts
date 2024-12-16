import { type ItemInPlay } from "@/model/ItemInPlay";
import { type FreeItemTypes } from "../itemPredicates";
import { isItemType } from "../itemPredicates";
import { isPlayableItem } from "../itemPredicates";
import { type MechanicResult } from "../MechanicResult";
import {
  conveyorSpeedPixPerMs,
  moveSpeedPixPerMs,
} from "../mechanicsConstants";
import type { GameState } from "@/game/gameState/GameState";
import type { PlanetName } from "@/sprites/planets";
import {
  oppositeDirection,
  originXyz,
  scaleXyz,
} from "@/utils/vectors/vectors";
import { unitVectors } from "@/utils/vectors/unitVectors";

const resetConveyorStateForItem = {
  movementType: "vel",
  vels: {
    movingFloor: originXyz,
  },
  stateDelta: {
    activeConveyor: null,
  },
} satisfies MechanicResult<FreeItemTypes, string>;

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
): MechanicResult<FreeItemTypes, RoomId> => {
  if (isPlayableItem(item) && item.state.teleporting !== null) {
    return resetConveyorStateForItem;
  }

  const {
    state: { standingOn },
  } = item;

  if (standingOn === null || !isItemType("conveyor")(standingOn)) {
    return resetConveyorStateForItem;
  }

  const {
    config: { direction },
  } = standingOn;

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
    heelsWalkingAgainst ? moveSpeedPixPerMs.heels : conveyorSpeedPixPerMs;

  const conveyorVelocity = scaleXyz(unitVectors[direction], conveyorSpeed);

  return {
    movementType: "vel",
    vels: {
      movingFloor: conveyorVelocity,
    },
    stateDelta: {
      activeConveyor: standingOn,
    },
  };
};
