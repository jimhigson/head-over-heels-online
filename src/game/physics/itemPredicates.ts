import type {
  ItemInPlay,
  ItemInPlayType,
  UnknownItemInPlay,
} from "@/model/ItemInPlay";
import { type AnyItemInPlay } from "@/model/ItemInPlay";
import type { CharacterName } from "@/model/modelTypes";
import type { PlanetName } from "@/sprites/planets";

type ItemTypeUnion<T extends ItemInPlayType, RoomId extends string> = {
  [TI in T]: ItemInPlay<TI, PlanetName, RoomId>;
}[T];

export const isItemType =
  <T extends ItemInPlayType>(...types: Array<T>) =>
  <RoomId extends string>(
    item: AnyItemInPlay<RoomId>,
  ): item is ItemTypeUnion<T, RoomId> => {
    return (types as Array<string>).includes(item.type);
  };

const isUnsolid = isItemType("bubbles", "portal", "stopAutowalk");

/**
 * Returns true iff the given @param mover should consider a collision with the
 * given @param item as being solid */

export const isSolid = (item: AnyItemInPlay) => {
  return !isUnsolid(item);
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

export const portableItemTypes = [
  "portableBlock",
  "spring",
] as const satisfies ItemInPlayType[];
export type PortableItemType = (typeof portableItemTypes)[number];

export const isPortable = isItemType(...portableItemTypes);

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
  FreeItemTypes,
  P,
  RoomId
>;

export const deadlyItemTypes = [
  "baddie",
  "deadlyBlock",
  "moveableDeadly",
  "slidingDeadly",
] as const satisfies ItemInPlayType[];
export type DeadlyItemType = (typeof deadlyItemTypes)[number];

export const isDeadlyItem = <RoomId extends string>(
  item: UnknownItemInPlay<RoomId>,
): item is ItemTypeUnion<"floor" | DeadlyItemType, RoomId> =>
  isItemType(...deadlyItemTypes)(item) ||
  (item.type === "floor" && item.config.deadly);