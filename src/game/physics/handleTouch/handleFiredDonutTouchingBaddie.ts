import type { ItemInPlay } from "@/model/ItemInPlay";
import type { ItemTouchEventByItemType } from "./ItemTouchEvent";

/**
 *
 * @returns true if the player lost a life
 */
export function handleFiredDonutTouchingBaddie<RoomId extends string>(
  e:
    | ItemTouchEventByItemType<RoomId, "firedDonut", "baddie">
    | ItemTouchEventByItemType<RoomId, "baddie", "firedDonut">,
) {
  const baddie: ItemInPlay<"baddie"> =
    e.movingItem.type === "baddie" ?
      e.movingItem
    : (e.touchedItem as ItemInPlay<"baddie">);

  baddie.state.busyLickingDoughnutsOffFace = true;
}
