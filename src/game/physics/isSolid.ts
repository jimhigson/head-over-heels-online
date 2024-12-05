import {
  type AnyItemInPlay,
  isItemType,
  isPlayableItem,
} from "@/model/ItemInPlay";

export const isUnsolid = (
  { state: { unsolidAfterProgression } }: AnyItemInPlay,
  // number of the frame we are on
  progression: number,
) => {
  return (
    unsolidAfterProgression !== null && progression > unsolidAfterProgression
  );
};

/**
 * Returns true iff the given @param mover should consider a collision with the
 * given @param item as being solid */

export const isSolid = (
  item: AnyItemInPlay,
  // number of the frame we are on
  progression: number,
) => {
  return !isUnsolid(item, progression);
};

export const isPushable = (collisionItem: AnyItemInPlay) => {
  return (
    collisionItem.type === "portableBlock" ||
    collisionItem.type === "spring" ||
    isPlayableItem(collisionItem)
  );
};

export const isSlidingItem = isItemType("ball");
