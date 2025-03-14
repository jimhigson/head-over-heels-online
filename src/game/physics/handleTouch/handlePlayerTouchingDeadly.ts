import type { ItemTouchEvent } from "./ItemTouchEvent";
import type { DeadlyItemType, PlayableItem } from "../itemPredicates";
import type { CharacterName } from "../../../model/modelTypes";
import { shieldRemaining } from "../../gameState/gameStateSelectors/selectPickupAbilities";
import { fadeInOrOutDuration } from "../../render/animationTimings";
import { playerDiedRecently } from "../../gameState/gameStateSelectors/playerDiedRecently";
import type { ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";

/**
 *
 * @returns true if the player lost a life
 */
export function handlePlayerTouchingDeadly<
  RoomId extends string,
  RoomItemId extends string,
>({
  room: { roomTime },
  movingItem: playableItem,
}: ItemTouchEvent<
  RoomId,
  RoomItemId,
  PlayableItem<CharacterName, RoomId, RoomItemId>,
  ItemTypeUnion<DeadlyItemType | "floor", RoomId, RoomItemId>
>) {
  if (playableItem.state.action === "death") {
    // player is already showing death animation - do nothing
    return;
  }

  const abilities =
    playableItem.type === "headOverHeels" ?
      // in this case, both playables in symbiosis should have the same shield
      // left, so arbitrarily choose head:
      playableItem.state.head
    : playableItem.state;

  if (shieldRemaining(abilities) > 0) {
    // has shield - ignore touching the deadly item
    return;
  }

  if (playerDiedRecently(playableItem)) {
    // player is invulnerable after death
    return;
  }

  playableItem.state.action = "death";
  playableItem.state.expires = roomTime + fadeInOrOutDuration;
}
