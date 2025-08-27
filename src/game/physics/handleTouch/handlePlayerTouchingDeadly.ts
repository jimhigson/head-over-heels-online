import type { ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import type { CharacterName } from "../../../model/modelTypes";
import type { DeadlyItemType, PlayableItem } from "../itemPredicates";
import type { ItemTouchEvent } from "./ItemTouchEvent";

import { playerDiedRecently } from "../../gameState/gameStateSelectors/playerDiedRecently";
import { playableHasShield } from "../../gameState/gameStateSelectors/selectPickupAbilities";
import { fadeInOrOutDuration } from "../../render/animationTimings";

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
  ItemTypeUnion<"floor" | "spikes" | DeadlyItemType, RoomId, RoomItemId>
>) {
  if (playableItem.state.action === "death") {
    // player is already showing death animation - do nothing
    return;
  }

  if (playableHasShield(playableItem)) {
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
