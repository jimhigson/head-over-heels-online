import type { ItemInPlayType, ItemInPlay } from "@/model/ItemInPlay";
import { isPlayableItem, itemFalls } from "@/model/ItemInPlay";
import type { PlanetName } from "@/sprites/planets";
import type { GameState } from "../gameState/GameState";
import { currentRoom } from "../gameState/GameState";
import type { MechanicResult } from "../physics/MechanicResult";
import { gravity } from "../physics/mechanics/gravity";

import { addXyz, originXyz, xyzEqual } from "@/utils/vectors/vectors";
import { moveItem } from "../physics/moveItem";
import { jumping } from "../physics/mechanics/jumping";
import { walking } from "../physics/mechanics/walking";

/**
 * ticks all items THAT CAN DO THINGS in the world
 * - this may also cause movements in other items (eg pushing)
 */
export const tickItem = <RoomId extends string, T extends ItemInPlayType>(
  item: ItemInPlay<T, PlanetName, RoomId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
) => {
  const room = currentRoom(gameState);

  let accumulatedMovement = originXyz;
  let accumulatedAccel = originXyz;

  const isMovable = itemFalls(item);

  /*
   * each mechanic sees the item in the state given it it by the previous ones
   * ie, the overall mechanic is the result of functional composition of the
   * individual mechanics
   */
  const accumulateResult = ({
    positionDelta,
    accel,
    stateDelta,
  }: MechanicResult<T>) => {
    if (positionDelta !== undefined) {
      accumulatedMovement = addXyz(accumulatedMovement, positionDelta);
    }
    if (accel !== undefined) {
      accumulatedAccel = addXyz(accumulatedAccel, accel);
    }
    if (stateDelta !== undefined) {
      item.state = { ...item.state, ...stateDelta };
    }
  };

  if (isPlayableItem(item) && item.type === gameState.currentCharacterName) {
    /*accumulateResult(
      teleporting(item, gameState, deltaMS) as MechanicResult<T>,
    );*/
    accumulateResult(walking(item, gameState, deltaMS) as MechanicResult<T>);
    accumulateResult(jumping(item, gameState, deltaMS) as MechanicResult<T>);
  }
  if (isMovable) {
    accumulateResult(gravity(item, gameState, deltaMS) as MechanicResult<T>);
  }

  /*
  if (isItemType("teleporter")(item)) {
    accumulateResult(
      teleporterStandingOn(item, gameState, room) as MechanicResult<T>,
    );
  }
  if (isItemType("spring")(item)) {
    accumulateResult(
      springStandingOn(item, gameState, room) as MechanicResult<T>,
    );
  }
  if (isItemType("lift")(item)) {
    accumulateResult(moveLift(item, gameState, deltaMS) as MechanicResult<T>);
  }
  */

  if (
    //!xyzEqual(accumulatedMovement, originXyz) ||
    isPlayableItem(item) &&
    !(
      // skip if both the velocity and accel are zero - no movement!
      (
        xyzEqual(accumulatedAccel, originXyz) &&
        xyzEqual(accumulatedAccel, item.state.vel)
      )
    )
  ) {
    if (itemFalls(item)) {
      /*
      const vel = (item.state.vel = addXyz(
        item.state.vel,
        scaleXyz(accumulatedAccel, deltaMS),
      ));
      */

      moveItem({
        subjectItem: item,
        force: accumulatedAccel,
        gameState,
        deltaMS,
      });
    }
  }
};
