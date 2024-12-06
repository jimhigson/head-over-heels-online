import type { CharacterName } from "@/model/modelTypes";
import type { ItemTouchEvent } from "./ItemTouchEvent";

/**
 *
 * @returns true if the player lost a life
 */
export function handlePlayerTouchingStopAutowalk<RoomId extends string>({
  movingItem,
}: ItemTouchEvent<RoomId, CharacterName, "stopAutowalk">): boolean {
  movingItem.state.autoWalk = false;

  return false;
}
