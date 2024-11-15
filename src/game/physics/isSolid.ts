import { type AnyItemInPlay, type UnknownItemInPlay, isPlayableItem } from "@/model/ItemInPlay";
import { type GameState, currentRoom, pickupCollected } from "../gameState/GameState";

/**
 * Returns true iff the given @param mover should consider a collision with the
 * given @param collidedWith as being solid */

export const isSolid = <RoomId extends string>(
  mover: AnyItemInPlay<RoomId>,
  collidedWith: UnknownItemInPlay<RoomId>,
  gameState: GameState<RoomId>
) => {
  const room = currentRoom(gameState);

  return (
    collidedWith.type !== "portal" &&
    // a collected pickup is just an animation out that should not be interacted with
    !(
      collidedWith.type === "pickup" &&
      pickupCollected(gameState, room.id, collidedWith.id)
    ) &&
    !(collidedWith.type === "pickup" && isPlayableItem(mover)) &&
    !(mover.type === "pickup" && isPlayableItem(collidedWith))
  );
};
