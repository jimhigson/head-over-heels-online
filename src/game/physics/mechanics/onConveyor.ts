import { type ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import { type RoomState } from "../../../model/RoomState";
import { stoodOnItem } from "../../../model/stoodOnItemsLookup";
import {
  originXyz,
  roundsToCardinalXy4,
  scaleXyz,
} from "../../../utils/vectors/vectors";
import { type GameState } from "../../gameState/GameState";
import {
  type FreeItemTypes,
  isConveyor,
  isHeels,
  isPlayableItem,
} from "../itemPredicates";
import { type Mechanic, type MechanicResult } from "../MechanicResult";
import {
  conveyorSpeedPixPerMs,
  moveSpeedPixPerMs,
} from "../mechanicsConstants";
import { recordActedOnBy } from "../recordActedOnBy";

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

  if (
    standingOn === null ||
    !isConveyor(standingOn) ||
    standingOn.state.disabled
  ) {
    return resetConveyorStateForItem;
  }

  const {
    config: { speed: configSpeed },
    state: { direction },
  } = standingOn;

  const speedMultiplier = configSpeed ?? 1;

  /**
   * conveyors magically move quicker when heels is fighting against them, so that all
   * characters can only just stay still when walking against them, regardless of how
   * fast the character walks. Only applies at the standard (1×) conveyor speed.
   */

  const heelsWalkingAgainst =
    speedMultiplier === 1 &&
    isHeels(item) &&
    item.state.action === "moving" &&
    // heels' facing rounds to the exact opposite of the belt's direction:
    roundsToCardinalXy4(
      item.state.facing.x,
      item.state.facing.y,
      -direction.x,
      -direction.y,
    );

  const conveyorSpeed =
    heelsWalkingAgainst ?
      moveSpeedPixPerMs.heels
    : conveyorSpeedPixPerMs * speedMultiplier;

  const conveyorVelocity = scaleXyz(direction, conveyorSpeed);

  recordActedOnBy(standingOn.id, item, room, true, false);

  return {
    movementType: "vel",
    vels: {
      movingFloor: conveyorVelocity,
    },
  };
};
