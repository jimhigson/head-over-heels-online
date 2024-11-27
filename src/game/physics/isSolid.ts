import {
  type AnyItemInPlay,
  type UnknownItemInPlay,
  isPlayableItem,
} from "@/model/ItemInPlay";

export const isUnsolid = <RoomId extends string>(
  {
    state: { unsolidAfterProgression: unsolidAfterFrame },
  }: UnknownItemInPlay<RoomId>,
  // number of the frame we are on
  progression: number,
) => {
  return unsolidAfterFrame !== null && progression > unsolidAfterFrame;
};

/**
 * Returns true iff the given @param mover should consider a collision with the
 * given @param item as being solid */

export const isSolid = <RoomId extends string>(
  item: UnknownItemInPlay<RoomId>,
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
