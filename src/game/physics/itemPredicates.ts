import type { ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import type { ConsolidatableJsonItemType } from "../../campaignXml2Json/consolidateItems/consolidateItems";
import type {
  ItemInPlayType,
  ItemInPlay,
  UnionOfAllItemInPlayTypes,
} from "../../model/ItemInPlay";
import type { CharacterName } from "../../model/modelTypes";
import { characterNames } from "../../model/modelTypes";
import type { SceneryName } from "../../sprites/planets";
import type { Xyz } from "../../utils/vectors/vectors";

export const isItemType =
  <T extends ItemInPlayType>(...types: Array<T>) =>
  <RoomId extends string, RoomItemId extends string>(
    item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  ): item is ItemTypeUnion<T, RoomId, RoomItemId> => {
    return (types as Array<string>).includes(item.type);
  };

/** @internal don't use this directly, use isSolid */
const isNeverSolidItemType = isItemType(
  "bubbles",
  "stopAutowalk",
  "floorEdge", // not even really a thing in the room
  "firedDoughnut",
  "floatingText",
  "emitter",
);
const isUnsolid = (
  item: UnionOfAllItemInPlayTypes,
  toucher?: UnionOfAllItemInPlayTypes,
) => {
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
export const isSolid = (
  item: UnionOfAllItemInPlayTypes,
  toucher?: UnionOfAllItemInPlayTypes,
) => {
  return !isUnsolid(item, toucher);
};

/**
 * 'heavy' items stop lifts from rising (see blacktooth 78) - only
 * the metal stepstools are heavy
 */
export const isHeavyItem = (item: UnionOfAllItemInPlayTypes): boolean => {
  return (
    (item.type === "movingPlatform" || item.type === "pushableBlock") &&
    item.config.style === "stepStool"
  );
};

// a good example of where OOP would make sense, it a polymorphic isPushable method
export const isPushable = <
  RoomId extends string,
  RoomItemId extends string,
  ScN extends SceneryName = SceneryName,
>(
  // the item doing the pushing
  pusher: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  pushedItem: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  /**
   * if true, some pushes are allowed. Ie, a player can push another player through
   * a door while backing-off-and re-entering the room to clear their area
   */
  forceful: boolean = false,
): pushedItem is FreeItem<RoomId, RoomItemId, ScN> => {
  return (
    isFreeItem(pushedItem) &&
    // can't push a player while they're autowalking - lets players walk into a room while invincible if
    // an enemy is near the door.
    !(!forceful && isPlayableItem(pushedItem) && pushedItem.state.autoWalk) &&
    !(isLift(pusher) && isHeavyItem(pushedItem))
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

export const isPlayableItem = <
  RoomId extends string,
  RoomItemId extends string,
>(
  item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
): item is PlayableItem<CharacterName, RoomId, RoomItemId> => {
  return (
    item.type === "head" ||
    item.type === "heels" ||
    item.type === "headOverHeels"
  );
};
export function isFreeItem<
  RoomId extends string,
  RoomItemId extends string,
  ScN extends SceneryName = SceneryName,
>(
  item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
): item is FreeItem<RoomId, RoomItemId, ScN> {
  return (freeItemTypes as ItemInPlayType[]).includes(item.type);
}
export type PlayableItem<
  C extends CharacterName = CharacterName,
  RoomId extends string = string,
  RoomItemId extends string = string,
> =
  | (C extends "headOverHeels" ? ItemInPlay<"headOverHeels", RoomId, RoomItemId>
    : never)
  | (C extends "head" ? ItemInPlay<"head", RoomId, RoomItemId> : never)
  | (C extends "heels" ? ItemInPlay<"heels", RoomId, RoomItemId> : never);

export const freeItemTypes = [
  ...characterNames,
  "monster",
  "ball",
  "charles",
  "pushableBlock",
  // moving platforms can fall down - see #safari35
  "movingPlatform",
  "moveableDeadly",
  "pickup",
  "portableBlock",
  "slidingBlock",
  "slidingDeadly",
  "spring",
  "sceneryPlayer", // just for fun
  "sceneryCrown",
] as const satisfies ItemInPlayType[];

export type FreeItemTypes = (typeof freeItemTypes)[number];

export type FreeItem<
  RoomId extends string,
  RoomItemId extends string,
  ScN extends SceneryName = SceneryName,
> = ItemTypeUnion<FreeItemTypes, RoomId, RoomItemId, ScN>;

const deadlyItemTypes = [
  "monster", // unless deactivated
  "deadlyBlock",
  "moveableDeadly",
  "slidingDeadly",
] as const satisfies ItemInPlayType[];
export type DeadlyItemType = (typeof deadlyItemTypes)[number];

export const isDeadlyType = isItemType(...deadlyItemTypes);

export const isDeadly = <RoomId extends string, RoomItemId extends string>(
  item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
): item is ItemTypeUnion<"floor" | DeadlyItemType, RoomId, RoomItemId> => {
  if (isMonster(item) && !item.state.activated) {
    return false;
  }

  return (
    isDeadlyType(item) ||
    (item.type === "floor" && item.config.type === "deadly")
  );
};

export const isMultipliedItem = <
  RoomId extends string,
  RoomItemId extends string,
>(
  item: UnionOfAllItemInPlayTypes<RoomId>,
): item is ItemTypeUnion<ConsolidatableJsonItemType, RoomId, RoomItemId> => {
  type ItemConfigMaybeWithMultiplication = {
    times?: undefined | Partial<Xyz>;
  };

  return (item.config as ItemConfigMaybeWithMultiplication).times !== undefined;
};

export const isPortal = isItemType("portal");
export const isTeleporter = isItemType("teleporter");
export const isHeels = isItemType("heels");
export const isHead = isItemType("head");
export const isCarrier = isItemType("heels", "headOverHeels");
export const isFirer = isItemType("head", "headOverHeels");
export const isLift = isItemType("lift");
export const isEmitter = isItemType("emitter");
export const isMonster = isItemType("monster");
export const isFloor = isItemType("floor");
export const isPickup = isItemType("pickup");
export const isSpring = isItemType("spring");
export const isJoystick = isItemType("joystick");
// items that can move clockwise/back-forth or in any other pattern:
export const isMoving = isItemType("monster", "movingPlatform");
