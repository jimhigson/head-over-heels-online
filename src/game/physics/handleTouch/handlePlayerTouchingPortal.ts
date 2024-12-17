import { addXyz, dotProductXyz, subXyz } from "@/utils/vectors/vectors";
import { unitVectors } from "@/utils/vectors/unitVectors";
import { changeCharacterRoom } from "@/game/gameState/mutators/changeCharacterRoom";
import type { CharacterName } from "@/model/modelTypes";
import type { ItemTouchEventByItemType } from "./ItemTouchEvent";

/**
 *
 * @returns true if the player went through the portal
 */
export const handlePlayerTouchingPortal = <RoomId extends string>({
  gameState,
  movingItem: player,
  touchedItem: portalItem,
  /** the movement that caused the player to touch the portal */
  movementVector,
}: ItemTouchEventByItemType<RoomId, CharacterName, "portal">) => {
  const {
    config: { relativePoint, toRoom, direction: portalDirection },
    state: { position: portalPosition },
  } = portalItem;
  const doorDirectionVector = unitVectors[portalDirection];
  const movementComponentInDoorDirection = dotProductXyz(
    doorDirectionVector,
    movementVector,
  );

  if (movementComponentInDoorDirection <= 0) {
    // player is not walking in the right direction of the portal. ie, they might
    // be auto-walking into the room
    return;
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
};
