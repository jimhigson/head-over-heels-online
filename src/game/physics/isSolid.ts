import {
  type AnyItemInPlay,
  type UnknownItemInPlay,
  isPlayableItem,
} from "@/model/ItemInPlay";
import type { RoomPickupsCollected } from "../gameState/GameState";

export const isNonSolid = <RoomId extends string>(
  mover: AnyItemInPlay<RoomId>,
  collidedWith: UnknownItemInPlay<RoomId>,
  roomPickupsCollected: RoomPickupsCollected,
) => {
  return (
    (collidedWith.type === "block" && collidedWith.state.expires !== null) ||
    (collidedWith.type === "fish" &&
      roomPickupsCollected[collidedWith.id] === true) ||
    collidedWith.type === "portal" ||
    collidedWith.type === "stopAutowalk" ||
    (collidedWith.type === "barrier" &&
      collidedWith.config.disappearing === true) ||
    // a collected pickup is just an animation out that should not be interacted with
    (collidedWith.type === "pickup" &&
      roomPickupsCollected[collidedWith.id] === true) ||
    (collidedWith.type === "pickup" && isPlayableItem(mover)) ||
    (mover.type === "pickup" && isPlayableItem(collidedWith))
  );
};

/**
 * Returns true iff the given @param mover should consider a collision with the
 * given @param collidedWith as being solid */

export const isSolid = <RoomId extends string>(
  mover: AnyItemInPlay<RoomId>,
  collidedWith: UnknownItemInPlay<RoomId>,
  roomPickupsCollected: RoomPickupsCollected,
) => {
  return !isNonSolid(mover, collidedWith, roomPickupsCollected);
};

export const isPushable = (collisionItem: AnyItemInPlay) => {
  return (
    collisionItem.type === "portable-block" ||
    collisionItem.type === "spring" ||
    isPlayableItem(collisionItem)
  );
};
