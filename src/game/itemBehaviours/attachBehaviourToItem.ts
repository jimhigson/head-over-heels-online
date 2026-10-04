import { type DistributedOmit } from "type-fest";

import { type ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import {
  itemBehaviourKey,
  type ItemBehaviourKey,
  type ItemInPlayConfig,
  type ItemInPlayType,
} from "../../model/ItemInPlay";
import { type ItemBehaviour } from "./ItemBehaviour";

/**
 * an item type and its config, as a parameter list - so checking the type
 * narrows the config
 */
export type ItemTypeAndConfigArgs = {
  [T in ItemInPlayType]: [type: T, config: ItemInPlayConfig<T>];
}[ItemInPlayType];

/**
 * gives the behaviour for any item type and config
 */
export type ItemBehaviourCache = (
  ...typeAndConfig: ItemTypeAndConfigArgs
) => ItemBehaviour;

/*
 * this module imports no behaviours: the cache registers itself when an
 * entry point imports it, so code that creates items depends only on this
 */
let maybeItemBehaviourCache: ItemBehaviourCache | undefined;

export const registerItemBehaviourCache = (
  itemBehaviourCache: ItemBehaviourCache,
): void => {
  maybeItemBehaviourCache = itemBehaviourCache;
};

/**
 * the behaviour for items of this type and config - for writing into a new
 * item's literal, so the item has its final shape from the start
 */
export const getBehaviourForItemTypeAndConfig = <T extends ItemInPlayType>(
  type: T,
  config: ItemInPlayConfig<T>,
): ItemBehaviour => {
  if (import.meta.env.DEV && maybeItemBehaviourCache === undefined) {
    throw new Error(
      "no behaviours registered - the entry point must import itemBehaviourCache",
    );
  }
  // a generic T can't narrow its config, so it is handed over as the union:
  return maybeItemBehaviourCache!(...([type, config] as ItemTypeAndConfigArgs));
};

/**
 * an existing item (eg from a saved game), with its behaviour attached
 */
export const attachBehaviourToItem = <
  T extends ItemInPlayType,
  RoomId extends string,
  RoomItemId extends string,
>(
  item: DistributedOmit<ItemTypeUnion<T, RoomId, RoomItemId>, ItemBehaviourKey>,
): ItemTypeUnion<T, RoomId, RoomItemId> =>
  // shallow clone to avoid an object type change - the original object will be short-lived
  // per-object that we create and handled by GC as young generation cleanup
  ({
    ...item,
    [itemBehaviourKey]: getBehaviourForItemTypeAndConfig(
      item.type,
      item.config,
    ),
  }) as ItemTypeUnion<T, RoomId, RoomItemId>;
