import { ItemInPlayType, ItemInPlay, UnknownItemInPlay, isPlayableItem, itemFalls, isItemType } from "@/model/ItemInPlay";
import { PlanetName } from "@/sprites/planets";
import { GameState, currentRoom } from "../gameState/GameState";
import { MechanicResult } from "../physics/MechanicResult";
import { fallingAndLanding } from "../physics/mechanics/falling";
import { jumping } from "../physics/mechanics/jumping";
import { steppedOff } from "../physics/mechanics/steppedOff";
import { teleporter } from "../physics/mechanics/teleporter";
import { teleporting } from "../physics/mechanics/teleporting";
import { walking } from "../physics/mechanics/walking";
import { moveItem } from "../physics/moveItem";
import { stateChangeNeedsRerender } from "../render/stateChangeNeedsRerender";

export const tickItem = <RoomId extends string, T extends ItemInPlayType>(
  item: ItemInPlay<T, PlanetName, RoomId>,
  gameState: GameState<RoomId>,
  deltaMS: number
) => {
  const originalState = item.state;
  const room = currentRoom(gameState);
  const { inputState } = gameState;

  /*
   * each mechanic sees the item in the state given it it by the previous ones
   * ie, the overall mechanic is the result of functional composition of the
   * individual mechanics
   */
  const applyResult = ({ positionDelta, stateDelta }: MechanicResult<T>) => {
    if (positionDelta !== undefined) {
      moveItem(item as UnknownItemInPlay, positionDelta, gameState);
    }
    if (stateDelta !== undefined) {
      item.state = { ...item.state, ...stateDelta };
    }
  };

  if (isPlayableItem(item) && item.type === gameState.currentCharacterName) {
    applyResult(teleporting(item, gameState, deltaMS) as MechanicResult<T>);
    applyResult(walking(item, inputState, deltaMS) as MechanicResult<T>);
    applyResult(jumping(item, inputState, deltaMS) as MechanicResult<T>);
  }
  if (itemFalls(item)) {
    applyResult(steppedOff(item) as MechanicResult<T>);
    applyResult(fallingAndLanding(item, room, deltaMS) as MechanicResult<T>);
  }

  if (isItemType("teleporter")(item)) {
    applyResult(teleporter(item, gameState, room) as MechanicResult<T>);
  }

  if (stateChangeNeedsRerender(item as UnknownItemInPlay, originalState)) {
    item.renderingDirty = true;
  }
};
