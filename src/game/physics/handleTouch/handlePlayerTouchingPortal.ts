import type { PlayableItem, ItemInPlay } from "@/model/ItemInPlay";
import type { PlanetName } from "@/sprites/planets";
import type { Xyz } from "@/utils/vectors";
import { dotProductXyz, subXyz, unitVectors } from "@/utils/vectors";
import { type GameState } from "../../gameState/GameState";
import { changeCharacterRoom } from "@/game/gameState/gameStateTransitions/changeCharacterRoom";

/**
 *
 * @returns true if the player went through the portal
 */
export const handlePlayerTouchingPortal = <RoomId extends string>(
  gameState: GameState<RoomId>,
  player: PlayableItem,
  {
    config: { relativePoint, toRoom, direction: portalDirection },
  }: ItemInPlay<"portal", PlanetName, RoomId>,
  /** the movement that caused the player to touch the portal */
  movementDelta: Xyz,
): boolean => {
  const doorDirectionVector = unitVectors[portalDirection];
  const movementComponentInDoorDirection = dotProductXyz(
    doorDirectionVector,
    movementDelta,
  );

  if (movementComponentInDoorDirection <= 0) {
    // player is not walking in the right direction of the portal. ie, they might
    // be auto-walking into the room
    return false;
  }

  changeCharacterRoom({
    gameState,
    toRoom,
    portalRelative: subXyz(player.state.position, relativePoint),
  });

  return true;
};
