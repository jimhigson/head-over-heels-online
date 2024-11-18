import type {
  ItemInPlayType,
  ItemInPlay,
  UnknownItemInPlay,
} from "@/model/ItemInPlay";
import { isPlayableItem, itemFalls, isItemType } from "@/model/ItemInPlay";
import type { PlanetName } from "@/sprites/planets";
import type { GameState } from "../gameState/GameState";
import { currentRoom } from "../gameState/GameState";
import type { MechanicResult } from "../physics/MechanicResult";
import { fallingAndLanding } from "../physics/mechanics/falling";
import { jumping } from "../physics/mechanics/jumping";
import { steppedOff } from "../physics/mechanics/steppedOff";
import { teleporter } from "../physics/mechanics/teleporter";
import { teleporting } from "../physics/mechanics/teleporting";
import { walking } from "../physics/mechanics/walking";
import { stateChangeNeedsRerender } from "../render/stateChangeNeedsRerender";
import { addXyz, originXyz } from "@/utils/vectors";
import { moveItem } from "../physics/moveItem";
import { standingOnConveyor } from "../physics/mechanics/standingOnConveyor";

/** ticks all items THAT CAN DO THINGS in the world - this may also cause movements in other items */
export const tickItem = <RoomId extends string, T extends ItemInPlayType>(
  item: ItemInPlay<T, PlanetName, RoomId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
) => {
  const originalState = item.state;
  const room = currentRoom(gameState);
  const { inputState } = gameState;

  let accumulatedMovement = originXyz;

  const isMovable = itemFalls(item);

  /*
   * each mechanic sees the item in the state given it it by the previous ones
   * ie, the overall mechanic is the result of functional composition of the
   * individual mechanics
   */
  const accumulateResult = ({
    positionDelta,
    stateDelta,
  }: MechanicResult<T>) => {
    if (positionDelta !== undefined) {
      accumulatedMovement = addXyz(accumulatedMovement, positionDelta);
    }
    if (stateDelta !== undefined) {
      item.state = { ...item.state, ...stateDelta };
    }
  };

  if (isPlayableItem(item) && item.type === gameState.currentCharacterName) {
    accumulateResult(
      teleporting(item, gameState, deltaMS) as MechanicResult<T>,
    );
    accumulateResult(walking(item, inputState, deltaMS) as MechanicResult<T>);
    accumulateResult(jumping(item, gameState, deltaMS) as MechanicResult<T>);
  }
  if (isMovable) {
    accumulateResult(steppedOff(item) as MechanicResult<T>);
    accumulateResult(
      fallingAndLanding(item, gameState, deltaMS) as MechanicResult<T>,
    );
    accumulateResult(
      standingOnConveyor(item, gameState, deltaMS) as MechanicResult<T>,
    );
  }

  if (isItemType("teleporter")(item)) {
    accumulateResult(teleporter(item, gameState, room) as MechanicResult<T>);
  }

  if (isMovable) {
    moveItem(item as UnknownItemInPlay<RoomId>, accumulatedMovement, gameState);
  }

  if (stateChangeNeedsRerender(item as UnknownItemInPlay, originalState)) {
    item.renderingDirty = true;
  }
};
