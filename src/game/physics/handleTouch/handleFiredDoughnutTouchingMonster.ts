import { type ItemInPlay } from "../../../model/ItemInPlay";

export function handleFiredDoughnutTouchingMonster<
  RoomId extends string,
  RoomItemId extends string,
>(monster: ItemInPlay<"monster", RoomId, RoomItemId>) {
  if (monster.config.which === "emperorsGuardian") {
    // as stated in the manual - the guardian doesn't like doughnuts
    // - they do nothing when fired at this weird bubble guy
    return;
  }

  monster.state.busyLickingDoughnutsOffFace = true;
}
