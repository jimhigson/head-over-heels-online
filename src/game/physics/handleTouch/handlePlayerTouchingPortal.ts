import type { ItemInPlay } from "@/model/ItemInPlay";
import type { PlayableItem } from "../itemPredicates";
import type { PlanetName } from "@/sprites/planets";
import type { Xyz } from "@/utils/vectors/vectors";
import { addXyz, dotProductXyz, subXyz } from "@/utils/vectors/vectors";
import { unitVectors } from "@/utils/vectors/unitVectors";
import { type GameState } from "../../gameState/GameState";
import { changeCharacterRoom } from "@/game/gameState/mutators/changeCharacterRoom";

/**
 *
 * @returns true if the player went through the portal
 */
export const handlePlayerTouchingPortal = <RoomId extends string>(
  gameState: GameState<RoomId>,
  player: PlayableItem,
  portalItem: ItemInPlay<"portal", PlanetName, RoomId>,
  /** the movement that caused the player to touch the portal */
  movementDelta: Xyz,
): boolean => {
  const {
    config: { relativePoint, toRoom, direction: portalDirection },
    state: { position: portalPosition },
  } = portalItem;
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
    toRoomId: toRoom,
    positionRelativeToSourcePortal: subXyz(
      player.state.position,
      addXyz(portalPosition, relativePoint),
    ),
    sourcePortal: portalItem,
    changeType: "portal",
  });

  return true;
};
