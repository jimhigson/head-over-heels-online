import type { ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import type { RoomState } from "../../../model/RoomState";
import type { GameState } from "../../gameState/GameState";
import type { Mechanic } from "../MechanicResult";

import { stoodOnItem } from "../../../model/stoodOnItemsLookup";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import {
  oppositeDirection,
  originXyz,
  scaleXyz,
  vectorClosestDirectionXy4,
} from "../../../utils/vectors/vectors";
import { type FreeItemTypes } from "../itemPredicates";
import { isItemType } from "../itemPredicates";
import { isPlayableItem } from "../itemPredicates";
import { type MechanicResult } from "../MechanicResult";
import {
  conveyorSpeedPixPerMs,
  moveSpeedPixPerMs,
} from "../mechanicsConstants";

const resetConveyorStateForItem = {
  movementType: "vel",
  vels: {
    movingFloor: originXyz,
  },
} satisfies MechanicResult<FreeItemTypes, string, string>;

/**
 * handle *only* the vertical speed downwards, and recognising
 * when the fall is done
 *
 * The item can be anything - a player, a pickup etc
 */
export const onConveyor: Mechanic<FreeItemTypes> = <
  RoomId extends string,
  RoomItemId extends string,
>(
  item: ItemTypeUnion<FreeItemTypes, RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  _gameState: GameState<RoomId>,
  _deltaMS: number,
) => {
  if (isPlayableItem(item) && item.state.teleporting !== null) {
    return resetConveyorStateForItem;
  }

  const {
    state: { standingOnItemId },
  } = item;

  const standingOn = stoodOnItem(standingOnItemId, room);

  if (standingOn === null || !isItemType("conveyor")(standingOn)) {
    return resetConveyorStateForItem;
  }

  const {
    state: { direction },
  } = standingOn;

  /**
   * conveyors magically move quicker when heels is fighting against them, so that all
   * characters can only just stay still when walking against them, regardless of how
   * fast the character walks
   */

  const heelsWalkingAgainst =
    isItemType("heels")(item) &&
    item.state.action === "moving" &&
    vectorClosestDirectionXy4(item.state.facing) ===
      oppositeDirection(direction);

  const conveyorSpeed =
    heelsWalkingAgainst ? moveSpeedPixPerMs.heels : conveyorSpeedPixPerMs;

  const conveyorVelocity = scaleXyz(unitVectors[direction], conveyorSpeed);

  return {
    movementType: "vel",
    vels: {
      movingFloor: conveyorVelocity,
    },
  };
};
