import { fadeInOrOutDuration } from "@/game/render/animationTimings";
import { shieldDuration } from "../mechanicsConstants";
import type { ItemTouchEvent } from "./ItemTouchEvent";
import type { DeadlyItemType, PlayableItem } from "../itemPredicates";
import type { CharacterName } from "@/model/modelTypes";
import type { PlanetName } from "@/sprites/planets";
import type { ItemInPlay } from "@/model/ItemInPlay";

const hasShield = (playableItem: PlayableItem) => {
  const { shieldCollectedAt, gameTime } =
    playableItem.type === "headOverHeels" ?
      // in this case, both playables in symbiosis should have the same shield
      // left, so arbitrarily choose one to use:
      playableItem.state.head
    : playableItem.state;

  return (
    shieldCollectedAt !== null && shieldCollectedAt + shieldDuration > gameTime
  );
};

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
  ItemInPlay<DeadlyItemType | "floor", PlanetName, RoomId>
>) {
  if (playableItem.state.action === "death") {
    // player is already showing death animation - do nothing
    return;
  }

  if (hasShield(playableItem)) {
    // shield - ignore touching the deadly item
    return;
  }

  playableItem.state.action = "death";
  playableItem.state.expires = roomTime + fadeInOrOutDuration;
}
