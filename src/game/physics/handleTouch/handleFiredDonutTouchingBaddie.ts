import type { ItemInPlay } from "@/model/ItemInPlay";
import type { ItemTouchEvent } from "./ItemTouchEvent";

/**
 *
 * @returns true if the player lost a life
 */
export function handleFiredDonutTouchingBaddie<RoomId extends string>(
  e:
    | ItemTouchEvent<RoomId, "firedDonut", "baddie">
    | ItemTouchEvent<RoomId, "baddie", "firedDonut">,
) {
  const baddie: ItemInPlay<"baddie"> =
    e.movingItem.type === "baddie" ?
      e.movingItem
    : (e.touchedItem as ItemInPlay<"baddie">);

  baddie.state.busyLickingDoughnutsOffFace = true;
}
