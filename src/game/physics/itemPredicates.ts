import type {
  ItemInPlayType,
  ItemInPlay,
  AnyItemInPlay,
  UnknownItemInPlay,
} from "../../model/ItemInPlay";
import type { CharacterName } from "../../model/modelTypes";
import { characterNames } from "../../model/modelTypes";
import type { SceneryName } from "../../sprites/planets";

export type ItemTypeUnion<T extends ItemInPlayType, RoomId extends string> = {
  [TI in T]: ItemInPlay<TI, SceneryName, RoomId>;
}[T];

export const isItemType =
  <T extends ItemInPlayType>(...types: Array<T>) =>
  <RoomId extends string>(
    item: AnyItemInPlay<RoomId>,
  ): item is ItemTypeUnion<T, RoomId> => {
    return (types as Array<string>).includes(item.type);
  };

/** @internal don't use this directly, use isSolid */
const isNeverSolidItemType = isItemType(
  "bubbles",
  "stopAutowalk",
  "floorEdge", // not even really a thing in the room
  "firedDoughnut",
);
const isUnsolid = (item: AnyItemInPlay, toucher?: AnyItemInPlay) => {
  return (
    isNeverSolidItemType(item) ||
    /*
     * portals are usually solid, so baddies and other items don't fall out of the
     * world via room doorways, but
     */
    (isPortal(item) &&
      // players by design collide with portals while they enter rooms, so it is
      // unsolid for them
      ((toucher !== undefined && isPlayableItem(toucher)) ||
        // the floor portal needs to be unsolid since baddies can fall down there
        // and out of the world. Test in #penitentiary2 and #penitentiary21.
        // ceiling portals need to be non-solid to let lifts through
        item.config.direction.z !== 0)) ||
    // 'none' floors are not solid - items can fall out of the world this way!
    (isFloor(item) && item.config.type === "none")
  );
};

/**
 * Returns true iff the given @param toucher should consider a collision with the
 * given @param item as being solid. If no mover is given, a general answer is returned,
 * not specific to any mover.
 */
export const isSolid = (item: AnyItemInPlay, toucher?: AnyItemInPlay) => {
  return !isUnsolid(item, toucher);
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
  // just for fun/an easter egg - let pick up the characters in the final room :-)
  "sceneryPlayer",
] as const satisfies ItemInPlayType[];
export type PortableItemType = (typeof portableItemTypes)[number];

export const isPortable = isItemType(...portableItemTypes);

export const isPlayableItem = <RoomId extends string = string>(
  item: AnyItemInPlay<RoomId>,
): item is PlayableItem<CharacterName, RoomId> => {
  return (
    item.type === "head" ||
    item.type === "heels" ||
    item.type === "headOverHeels"
  );
};
export function isFreeItem<
  P extends SceneryName = SceneryName,
  RoomId extends string = string,
>(item: AnyItemInPlay<RoomId>): item is FreeItem<P, RoomId> {
  return (freeItemTypes as ItemInPlayType[]).includes(item.type);
}
export type PlayableItem<
  C extends CharacterName = CharacterName,
  RoomId extends string = string,
> =
  | (C extends "headOverHeels" ?
      ItemInPlay<"headOverHeels", SceneryName, RoomId, "headOverHeels">
    : never)
  | (C extends "head" ? ItemInPlay<"head", SceneryName, RoomId, "head"> : never)
  | (C extends "heels" ? ItemInPlay<"heels", SceneryName, RoomId, "heels">
    : never);

export const freeItemTypes = [
  ...characterNames,
  "monster",
  "ball",
  "charles",
  "movableBlock",
  "moveableDeadly",
  "pickup",
  "portableBlock",
  "slidingBlock",
  "slidingDeadly",
  "spring",
  "sceneryPlayer", // just for fun
] as const satisfies ItemInPlayType[];

export type FreeItemTypes = (typeof freeItemTypes)[number];

export type FreeItem<P extends SceneryName, RoomId extends string> = ItemInPlay<
  FreeItemTypes,
  P,
  RoomId
>;

export const deadlyItemTypes = [
  "monster",
  "deadlyBlock",
  "moveableDeadly",
  "slidingDeadly",
] as const satisfies ItemInPlayType[];
export type DeadlyItemType = (typeof deadlyItemTypes)[number];

export const isDeadly = <RoomId extends string>(
  item: UnknownItemInPlay<RoomId>,
): item is ItemTypeUnion<"floor" | DeadlyItemType, RoomId> =>
  isItemType(...deadlyItemTypes)(item) ||
  (item.type === "floor" && item.config.type === "deadly");

export const isPortal = isItemType("portal");
export const isTeleporter = isItemType("teleporter");
export const isHeels = isItemType("heels");
export const isHead = isItemType("head");
export const isCarrier = isItemType("heels", "headOverHeels");
export const isFirer = isItemType("head", "headOverHeels");
export const isLift = isItemType("lift");
export const isMonster = isItemType("monster");
export const isFloor = isItemType("floor");
export const isMovableBlock = isItemType("movableBlock");
export const isPickup = isItemType("pickup");
export const isSpring = isItemType("spring");
// items that can move clockwise/back-forth or in any other pattern:
export const isMoving = isItemType("monster", "movableBlock");
