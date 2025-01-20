import type { CharacterName } from "../../../model/modelTypes";
import type { ItemTouchEventByItemType } from "./ItemTouchEvent";

export function handlePlayerTouchingStopAutowalk<RoomId extends string>({
  movingItem,
}: ItemTouchEventByItemType<RoomId, CharacterName, "stopAutowalk">) {
  movingItem.state.autoWalk = false;
}
