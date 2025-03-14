import type { CharacterName } from "../../../model/modelTypes";
import type { ItemTouchEventByItemType } from "./ItemTouchEvent";

export function handlePlayerTouchingStopAutowalk<
  RoomId extends string,
  RoomItemId extends string,
>({
  movingItem,
}: ItemTouchEventByItemType<
  RoomId,
  RoomItemId,
  CharacterName,
  "stopAutowalk"
>) {
  movingItem.state.autoWalk = false;
}
