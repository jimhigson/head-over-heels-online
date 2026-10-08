import { type ItemTypeUnion } from "../_generated/types/ItemInPlayUnion";
import { type SceneryName } from "../sprites/planets";
import { type ItemInPlay, type ItemInPlayType } from "./ItemInPlay";
import { type CharacterName } from "./modelTypes";

/**
 * this file has some specialised narrowed-down unions for items in play
 * that are needed in some places where references to items with specific
 * abilities are needed
 */

/**
 * the same items, but with union configs distributed up to a union at the
 * top level
 */
type ByConfig<Item extends { config: unknown }> =
  Item extends unknown ?
    Item["config"] extends infer Config ?
      Config extends unknown ?
        Omit<Item, "config"> & { config: Config }
      : never
    : never
  : never;

/**
 * All Item types as a union
 */
export type UnionOfAllItemInPlayTypes<
  RoomId extends string = string,
  RoomItemId extends string = string,
  ScN extends SceneryName = SceneryName,
> = ItemTypeUnion<ItemInPlayType, RoomId, RoomItemId, ScN>;

/**
 * an item whose position is irrelevant, so is not spatially indexed
 */
export type PositionlessItem<
  RoomId extends string,
  RoomItemId extends string,
> = ItemTypeUnion<"timer", RoomId, RoomItemId>;

/**
 * an item that can modify other items in its room
 */
export type InRoomModifierItem<
  RoomId extends string,
  RoomItemId extends string,
> = Extract<
  ByConfig<UnionOfAllItemInPlayTypes<RoomId, RoomItemId>>,
  { config: { modifies: unknown } }
>;

/**
 * whether this item can modify other items in its room
 * Same duck-typing as the InRoomModifierItem type applies on the type level to ensure consistency
 *
 */
export const isInRoomModifierItem = <
  RoomId extends string,
  RoomItemId extends string,
>(
  item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
): item is InRoomModifierItem<RoomId, RoomItemId> => "modifies" in item.config;

/**
 * items that slide when pushed - their state has a sliding velocity
 */
export type SlidingItem<
  RoomId extends string = string,
  RoomItemId extends string = string,
> = Extract<
  UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  { state: { vels: { sliding: unknown } } }
>;

/**
 * sliding items keep their momentum when pushed
 * Same duck-typing as the SlidingItem type applies on the type level to ensure consistency
 */
export const isSlidingItem = <RoomId extends string, RoomItemId extends string>(
  item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
): item is SlidingItem<RoomId, RoomItemId> =>
  "vels" in item.state && "sliding" in item.state.vels;

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
export type PlayableItem<
  C extends CharacterName = CharacterName,
  RoomId extends string = string,
  RoomItemId extends string = string,
> =
  | (C extends "head" ? ItemInPlay<"head", RoomId, RoomItemId> : never)
  | (C extends "headOverHeels" ? ItemInPlay<"headOverHeels", RoomId, RoomItemId>
    : never)
  | (C extends "heels" ? ItemInPlay<"heels", RoomId, RoomItemId> : never);

/**
 * items that are free to move - by falling, being pushed, or being carried
 * along by whatever they stand on - their state has free-item fields
 */
export type FreeItem<
  RoomId extends string = string,
  RoomItemId extends string = string,
  ScN extends SceneryName = SceneryName,
> = Extract<
  UnionOfAllItemInPlayTypes<RoomId, RoomItemId, ScN>,
  { state: { latentMovement: unknown } }
>;
export type FreeItemTypes = FreeItem["type"];

/**
 * free items are moved by gravity, by pushes, and by other items they ride on
 */
export const isFreeItem = <RoomId extends string, RoomItemId extends string>(
  item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
): item is FreeItem<RoomId, RoomItemId> => {
  // narrowing by shape: duck-typed, so always in step with the types above
  return "latentMovement" in item.state;
};
