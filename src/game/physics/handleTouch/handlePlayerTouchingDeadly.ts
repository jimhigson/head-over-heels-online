import { fadeInOrOutDuration } from "@/game/render/animationTimings";
import type { ItemTouchEvent } from "./ItemTouchEvent";
import type { DeadlyItemType, PlayableItem } from "../itemPredicates";
import type { CharacterName } from "@/model/modelTypes";
import type { SceneryName } from "@/sprites/planets";
import type { ItemInPlay } from "@/model/ItemInPlay";
import { shieldRemaining } from "@/game/gameState/gameStateSelectors/selectPickupAbilities";

/**
 *
 * @returns true if the player lost a life
 */
export function handlePlayerTouchingDeadly<RoomId extends string>({
  room: { roomTime },
  movingItem: playableItem,
}: ItemTouchEvent<
  RoomId,
  PlayableItem<CharacterName, RoomId>,
  ItemInPlay<DeadlyItemType | "floor", SceneryName, RoomId>
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

  playableItem.state.action = "death";
  playableItem.state.expires = roomTime + fadeInOrOutDuration;
}
