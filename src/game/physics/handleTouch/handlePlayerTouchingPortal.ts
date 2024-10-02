import type { ItemInPlay } from "../../../model/ItemInPlay";
import type { PlayableItem } from "../itemPredicates";
import type { ItemTouchEvent } from "./ItemTouchEvent";

import { exitGameRoomId } from "../../../model/json/ItemConfigMap";
import {
  type CharacterName,
  otherIndividualCharacterName,
} from "../../../model/modelTypes";
import {
  characterReachesFreedom,
  gameOver,
} from "../../../store/slices/gameMenus/gameMenusSlice";
import { store } from "../../../store/store";
import { dotProductXyz } from "../../../utils/vectors/vectors";
import { changeCharacterRoom } from "../../gameState/mutators/changeCharacterRoom";
import { deleteItemFromRoom } from "../../gameState/mutators/deleteItemFromRoom";

/**
 *
 * @returns true if the player went through the portal
 */
export const handlePlayerTouchingPortal = <
  RoomId extends string,
  RoomItemId extends string,
>({
  gameState,
  room,
  movingItem: playableItem,
  touchedItem: portalItem,
  /** the movement that caused the player to touch the portal */
  movementVector,
}: ItemTouchEvent<
  RoomId,
  RoomItemId,
  PlayableItem<CharacterName, RoomId, RoomItemId>,
  ItemInPlay<"portal", RoomId, RoomItemId>
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

  if (toRoom === exitGameRoomId) {
    delete gameState.characterRooms[playableItem.type];
    deleteItemFromRoom({ room, item: playableItem });

    if (playableItem.type === "headOverHeels") {
      store.dispatch(characterReachesFreedom("head"));
      store.dispatch(characterReachesFreedom("heels"));
      // exited the game
      store.dispatch(gameOver({ offerReincarnation: false }));
    } else {
      store.dispatch(characterReachesFreedom(playableItem.type));

      const otherCharacterPlaying =
        otherIndividualCharacterName(playableItem.type) in
        gameState.characterRooms;
      if (otherCharacterPlaying) {
        gameState.currentCharacterName = otherIndividualCharacterName(
          playableItem.type,
        );
      } else {
        // exited the game
        store.dispatch(gameOver({ offerReincarnation: false }));
      }
    }
  } else {
    changeCharacterRoom({
      playableItem,
      gameState,
      toRoomId: toRoom,
      sourceItem: portalItem,
      changeType: "portal",
    });
  }
};
