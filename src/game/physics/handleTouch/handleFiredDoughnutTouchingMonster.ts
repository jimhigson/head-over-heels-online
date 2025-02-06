import type { ItemInPlay } from "../../../model/ItemInPlay";
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

  if (monster.config.which === "emperorsGuardian") {
    // as stated in the manual - the guardian doesn't like doughnuts
    // - they do nothing when fired at this weird bubble guy
    return;
  }

  monster.state.busyLickingDoughnutsOffFace = true;
}
