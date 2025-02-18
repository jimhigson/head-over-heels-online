import type { ItemTouchEvent } from "./ItemTouchEvent";
import type { PlayableItem } from "../itemPredicates";
import type { ItemInPlay } from "../../../model/ItemInPlay";
import type { CharacterName } from "../../../model/modelTypes";
import type { SceneryName } from "../../../sprites/planets";
import { dotProductXyz } from "../../../utils/vectors/vectors";
import { changeCharacterRoom } from "../../gameState/mutators/changeCharacterRoom";

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
  ItemInPlay<"portal", SceneryName, RoomId>
>) => {
  const {
    config: { toRoom, direction: portalDirection },
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

  if (playableItem.state.action === "death") {
    // a dying player should not be able to be pushed through a portal; there is no
    // sensible entrystate that can be applied to their entrance in the new room
    return;
  }

  changeCharacterRoom({
    playableItem,
    gameState,
    toRoomId: toRoom,
    sourceItem: portalItem,
    changeType: "portal",
  });
};
