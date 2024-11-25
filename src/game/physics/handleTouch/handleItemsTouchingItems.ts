import type { FreeItemTypes, ItemInPlay } from "@/model/ItemInPlay";
import {
  isItemType,
  isPlayableItem,
  isFreeItem,
  type UnknownItemInPlay,
} from "@/model/ItemInPlay";
import {
  oppositeDirection,
  scaleXyz,
  unitVectors,
  type Xyz,
} from "@/utils/vectors/vectors";
import type { GameState } from "@/game/gameState/GameState";
import { handlePlayerTouchingItems } from "./handlePlayerTouchingItems";
import type { PlanetName } from "@/sprites/planets";
import {
  playerWalkTerminalSpeedPixPerMs,
  conveyorSpeedPixPerMs,
} from "../mechanicsConstants";
import { moveItem } from "../moveItem";

const handleItemOnConveyor = <RoomId extends string>(
  item: ItemInPlay<FreeItemTypes, PlanetName, RoomId>,
  conveyor: ItemInPlay<"conveyor", PlanetName, RoomId>,
  _movementVector: Xyz,
  gameState: GameState<RoomId>,
  deltaMS: number,
): boolean => {
  //if (item.state.standingOn !== conveyor) return false;

  const {
    config: { direction },
  } = conveyor;

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

  const conveyorMoveDistance = conveyorSpeed * deltaMS;
  const conveyorPosDelta = scaleXyz(
    unitVectors[direction],
    conveyorMoveDistance,
  );

  moveItem({
    deltaMS,
    gameState,
    posDelta: conveyorPosDelta,
    subjectItem: item as UnknownItemInPlay<RoomId>,
    pusher: conveyor,
  });

  return false;
};

/**
 * some old - Morties touching Morties
 */
export const handleItemsTouchingItems = <RoomId extends string>({
  movingItem,
  movementVector,
  touchee,
  gameState,
  deltaMS,
}: {
  movingItem: UnknownItemInPlay<RoomId>;
  movementVector: Xyz;
  touchee: UnknownItemInPlay<RoomId>;
  gameState: GameState<RoomId>;
  deltaMS: number;
}): boolean => {
  if (
    isPlayableItem(movingItem) &&
    handlePlayerTouchingItems(movingItem, touchee, movementVector, gameState)
  )
    return true;

  if (
    isPlayableItem(touchee) &&
    handlePlayerTouchingItems(touchee, movingItem, movementVector, gameState)
  )
    return true;

  if (touchee.type === "conveyor" && isFreeItem(movingItem)) {
    handleItemOnConveyor(
      movingItem,
      touchee,
      movementVector,
      gameState,
      deltaMS,
    );
  }

  return false;
};
