import { type ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import { type ItemInPlay } from "../../model/ItemInPlay";
import {
  isPlayableItem,
  type UnionOfAllItemInPlayTypes,
} from "../../model/ItemInPlayNarrowedUnions";
import { exitGameRoomId } from "../../model/json/ItemConfigMap";
import { otherIndividualCharacterName } from "../../model/modelTypes";
import {
  characterReachesFreedom,
  gameOver,
} from "../../store/slices/gameInPlay/gameInPlaySlice";
import { store } from "../../store/store";
import { dotProductXyz } from "../../utils/vectors/vectors";
import { changeCharacterRoom } from "../gameState/mutators/changeCharacterRoom";
import { deleteItemFromRoom } from "../gameState/mutators/deleteItemFromRoom";
import {
  type ItemTouchEvent,
  movingItemIsPlayable,
} from "../physics/handleTouch/ItemTouchEvent";
import { nonRenderingItemFixedZIndex } from "../render/sortZ/fixedZIndexes";
import { ItemBehaviour } from "./ItemBehaviour";

/**
 * the way through a door (or up and down) to another room
 */
export class PortalBehaviour extends ItemBehaviour {
  constructor() {
    super({
      collisionDoesNotStopAutowalk: true,
      fixedZIndex: nonRenderingItemFixedZIndex,
    });
  }

  /**
   * portals are usually solid, so baddies and other items don't fall out of the
   * world via room doorways
   */
  override isNonSolid<RoomId extends string, RoomItemId extends string>(
    portal: ItemTypeUnion<"portal", RoomId, RoomItemId>,
    toucher?: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  ): boolean {
    return (
      // players by design collide with portals while they enter rooms, so it is
      // unsolid for them
      (toucher !== undefined && isPlayableItem(toucher)) ||
      // the floor portal needs to be unsolid since baddies can fall down there
      // and out of the world. Test in #penitentiary2 and #penitentiary21.
      // ceiling portals need to be non-solid to let lifts through
      portal.config.direction.z !== 0
    );
  }

  /**
   * where it is solid, a portal still can't be stood on
   */
  override isStandable(): boolean {
    return false;
  }

  /**
   * a playable walking through the portal goes to its room, or leaves the game
   */
  override onTouch<RoomId extends string, RoomItemId extends string>(
    portalItem: ItemInPlay<"portal", RoomId, RoomItemId>,
    e: ItemTouchEvent<RoomId, RoomItemId>,
    isMover: boolean,
  ): void {
    if (isMover) {
      super.onTouch(portalItem, e, isMover);
      return;
    }
    if (!movingItemIsPlayable(e)) {
      return;
    }
    const {
      gameState,
      room,
      movingItem: playableItem,
      // the movement that caused the player to touch the portal:
      movementVector,
    } = e;

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
        store.dispatch(gameOver({ reincarnationDeclined: false }));
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
          store.dispatch(gameOver({ reincarnationDeclined: false }));
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
  }
}
