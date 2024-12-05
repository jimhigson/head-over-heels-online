import type { ItemInPlay, ItemInPlayType } from "@/model/ItemInPlay";
import { type AnyItemInPlay } from "@/model/ItemInPlay";
import type { CharacterName } from "@/model/modelTypes";
import type { PlanetName } from "@/sprites/planets";

export const isItemType =
  <T extends ItemInPlayType>(...types: Array<T>) =>
  <RoomId extends string>(
    item: AnyItemInPlay<RoomId>,
  ): item is ItemInPlay<T, PlanetName, RoomId> => {
    return (types as Array<string>).includes(item.type);
  };

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

export const slidingItemTypes = [
  "ball",
  "slidingBlock",
  "slidingDeadly",
] as const satisfies ItemInPlayType[];

export type SlidingItemTypes = (typeof slidingItemTypes)[number];

export const isSlidingItem = isItemType(...slidingItemTypes);

export const isPlayableItem = <RoomId extends string = string>(
  item: AnyItemInPlay<RoomId>,
): item is PlayableItem<CharacterName, RoomId> => {
  return item.type === "head" || item.type === "heels";
};
export function isFreeItem<
  P extends PlanetName = PlanetName,
  RoomId extends string = string,
>(item: AnyItemInPlay<RoomId>): item is FreeItem<P, RoomId> {
  return (fallingItemTypes as ItemInPlayType[]).includes(item.type);
}
export type PlayableItem<
  C extends CharacterName = CharacterName,
  RoomId extends string = string,
> =
  C extends "head" ? ItemInPlay<"head", PlanetName, RoomId, "head">
  : never | C extends "heels" ? ItemInPlay<"heels", PlanetName, RoomId, "heels">
  : never;

export const fallingItemTypes = [
  "baddie",
  "ball",
  "charles",
  "head",
  "heels",
  "movableBlock",
  "moveableDeadly",
  "pickup",
  "portableBlock",
  "slidingBlock",
  "slidingDeadly",
  "spring",
] as const satisfies ItemInPlayType[];

export type FreeItemTypes = (typeof fallingItemTypes)[number];

export type FreeItem<P extends PlanetName, RoomId extends string> = ItemInPlay<
  "spring",
  P,
  RoomId
>;
