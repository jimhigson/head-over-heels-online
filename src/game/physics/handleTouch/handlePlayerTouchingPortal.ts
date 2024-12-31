import { addXyz, dotProductXyz, subXyz } from "@/utils/vectors/vectors";
import { changeCharacterRoom } from "@/game/gameState/mutators/changeCharacterRoom";
import type { CharacterName } from "@/model/modelTypes";
import type { ItemTouchEvent } from "./ItemTouchEvent";
import type { PlayableItem } from "../itemPredicates";
import type { ItemInPlay } from "@/model/ItemInPlay";
import type { PlanetName } from "@/sprites/planets";

/**
 *
 * @returns true if the player went through the portal
 */
export const handlePlayerTouchingPortal = <RoomId extends string>({
  gameState,
  movingItem: playableItem,
  touchedItem: portalItem,
  /** the movement that caused the player to touch the portal */
  movementVector,
}: ItemTouchEvent<
  RoomId,
  PlayableItem<CharacterName, RoomId>,
  ItemInPlay<"portal", PlanetName, RoomId>
>) => {
  const {
    config: { relativePoint, toRoom, direction: portalDirection },
    state: { position: portalPosition },
  } = portalItem;
  const movementComponentInDoorDirection = dotProductXyz(
    portalDirection,
    movementVector,
  );

  if (movementComponentInDoorDirection <= 0) {
    // player is not walking in the right direction of the portal. ie, they might
    // be auto-walking into the room
    return;
  }

  changeCharacterRoom({
    playableItem,
    gameState,
    toRoomId: toRoom,
    positionRelativeToSourcePortal: subXyz(
      playableItem.state.position,
      addXyz(portalPosition, relativePoint),
    ),
    sourcePortal: portalItem,
    changeType: "portal",
  });
};
