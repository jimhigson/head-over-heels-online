import type { CharacterName } from "@/model/modelTypes";
import type { ItemTouchEventByItemType } from "./ItemTouchEvent";

/**
 *
 * @returns true if the player lost a life
 */
export function handlePlayerTouchingStopAutowalk<RoomId extends string>({
  movingItem,
}: ItemTouchEventByItemType<RoomId, CharacterName, "stopAutowalk">) {
  movingItem.state.autoWalk = false;
}
