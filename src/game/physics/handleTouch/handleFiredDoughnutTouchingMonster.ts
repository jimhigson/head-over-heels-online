import type { ItemInPlay } from "../../../model/ItemInPlay";
import type { ItemTouchEventByItemType } from "./ItemTouchEvent";

export function handleFiredDoughnutTouchingMonster<
  RoomId extends string,
  RoomItemId extends string,
>(
  e:
    | ItemTouchEventByItemType<RoomId, RoomItemId, "firedDoughnut", "monster">
    | ItemTouchEventByItemType<RoomId, RoomItemId, "monster", "firedDoughnut">,
) {
  type Monster = ItemInPlay<"monster", RoomId, RoomItemId>;

  const monster: Monster =
    e.movingItem.type === "monster" ? e.movingItem : (e.touchedItem as Monster);

  if (monster.config.which === "emperorsGuardian") {
    // as stated in the manual - the guardian doesn't like doughnuts
    // - they do nothing when fired at this weird bubble guy
    return;
  }

  monster.state.busyLickingDoughnutsOffFace = true;
}
