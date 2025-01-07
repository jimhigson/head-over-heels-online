import type { ItemInPlay } from "@/model/ItemInPlay";
import type { ItemTouchEventByItemType } from "./ItemTouchEvent";

/**
 *
 * @returns true if the player lost a life
 */
export function handleFiredDoughnutTouchingMonster<RoomId extends string>(
  e:
    | ItemTouchEventByItemType<RoomId, "firedDoughnut", "monster">
    | ItemTouchEventByItemType<RoomId, "monster", "firedDoughnut">,
) {
  const monster: ItemInPlay<"monster"> =
    e.movingItem.type === "monster" ?
      e.movingItem
    : (e.touchedItem as ItemInPlay<"monster">);

  monster.state.busyLickingDoughnutsOffFace = true;
}
