import { isPlayableItem, type UnknownItemInPlay } from "@/model/ItemInPlay";
import { type Xyz } from "@/utils/vectors/vectors";
import type { GameState } from "@/game/gameState/GameState";
import { handlePlayerTouchingItem } from "./handlePlayerTouchingItem";

/**
 * some old - Morties touching Morties
 */
export const handleItemsTouchingItems = <RoomId extends string>({
  movingItem,
  movementVector,
  touchee,
  gameState,
  deltaMS: _deltaMS,
}: {
  movingItem: UnknownItemInPlay<RoomId>;
  movementVector: Xyz;
  touchee: UnknownItemInPlay<RoomId>;
  gameState: GameState<RoomId>;
  deltaMS: number;
}): boolean => {
  if (
    isPlayableItem(movingItem) &&
    handlePlayerTouchingItem(movingItem, touchee, movementVector, gameState)
  )
    return true;

  if (
    isPlayableItem(touchee) &&
    handlePlayerTouchingItem(touchee, movingItem, movementVector, gameState)
  )
    return true;

  return false;
};
