import type {
  AnyItemInPlay,
  ItemInPlayType,
  ItemInPlay,
  UnionOfAllItemInPlayTypes,
  ItemTypeUnion,
} from "../../../model/ItemInPlay";
import type { CharacterName } from "../../../model/modelTypes";
import type { RoomState } from "../../../model/RoomState";
import type { SceneryName } from "../../../sprites/planets";
import type { Xyz } from "../../../utils/vectors/vectors";
import type { GameState } from "../../gameState/GameState";
import type { DeadlyItemType, PlayableItem } from "../itemPredicates";
import { isDeadly, isItemType, isPlayableItem } from "../itemPredicates";

export type ItemTouchEvent<
  RoomId extends string,
  RoomItemId extends string,
  MovingItem extends AnyItemInPlay<RoomId, RoomItemId> = AnyItemInPlay<
    RoomId,
    RoomItemId
  >,
  TouchedItem extends AnyItemInPlay<RoomId, RoomItemId> = AnyItemInPlay<
    RoomId,
    RoomItemId
  >,
> = {
  movingItem: MovingItem;
  movementVector: Xyz;
  touchedItem: TouchedItem;
  gameState: GameState<RoomId>;
  deltaMS: number;
  room: RoomState<SceneryName, RoomId>;
};

/** simplified version of ItemTouchEvent where generics can be completed with just strings: */
export type ItemTouchEventByItemType<
  RoomId extends string,
  RoomItemId extends string,
  MovingItemType extends ItemInPlayType,
  TouchedItemType extends ItemInPlayType = ItemInPlayType,
> = ItemTouchEvent<
  RoomId,
  RoomItemId,
  ItemInPlay<MovingItemType, RoomId, RoomItemId>,
  ItemInPlay<TouchedItemType, RoomId, RoomItemId>
>;

export const touchedItemIsType = <
  RoomId extends string,
  RoomItemId extends string,
  MovingItem extends AnyItemInPlay<RoomId, RoomItemId>,
  TouchedItemType extends ItemInPlayType,
>(
  e: ItemTouchEvent<RoomId, RoomItemId, MovingItem>,
  ...touchedItemType: Array<TouchedItemType>
): e is {
  [T in TouchedItemType]: ItemTouchEvent<
    RoomId,
    RoomItemId,
    MovingItem,
    ItemInPlay<T, RoomId, RoomItemId>
  >;
}[TouchedItemType] => {
  return isItemType(...touchedItemType)(e.touchedItem);
};

export const movingItemIsType = <
  RoomId extends string,
  RoomItemId extends string,
  MovingItemType extends ItemInPlayType,
  TouchedItem extends AnyItemInPlay<RoomId, RoomItemId>,
>(
  e: ItemTouchEvent<
    RoomId,
    RoomItemId,
    AnyItemInPlay<RoomId, RoomItemId>,
    TouchedItem
  >,
  ...movingItemType: Array<MovingItemType>
): e is ItemTouchEvent<
  RoomId,
  RoomItemId,
  ItemInPlay<MovingItemType, RoomId, RoomItemId>,
  TouchedItem
> => {
  return isItemType(...movingItemType)(e.movingItem);
};

export const movingItemIsPlayable = <
  RoomId extends string,
  RoomItemId extends string,
  TouchedItem extends AnyItemInPlay<RoomId, RoomItemId>,
>(
  e: ItemTouchEvent<
    RoomId,
    RoomItemId,
    AnyItemInPlay<RoomId, RoomItemId>,
    TouchedItem
  >,
): e is ItemTouchEvent<
  RoomId,
  RoomItemId,
  PlayableItem<CharacterName, RoomId, RoomItemId>,
  TouchedItem
> => {
  return isPlayableItem(e.movingItem);
};

export const touchedItemIsPlayable = <
  RoomId extends string,
  RoomItemId extends string,
  MovingItem extends AnyItemInPlay<RoomId, RoomItemId>,
>(
  e: ItemTouchEvent<RoomId, RoomItemId, MovingItem>,
): e is ItemTouchEvent<
  RoomId,
  RoomItemId,
  MovingItem,
  PlayableItem<CharacterName, RoomId, RoomItemId>
> => {
  return isPlayableItem(e.touchedItem);
};

export const touchedItemIsDeadly = <
  RoomId extends string,
  RoomItemId extends string,
  MovingItem extends AnyItemInPlay<RoomId, RoomItemId>,
>(
  e: ItemTouchEvent<
    RoomId,
    RoomItemId,
    MovingItem,
    AnyItemInPlay<RoomId, RoomItemId>
  >,
): e is ItemTouchEvent<
  RoomId,
  RoomItemId,
  MovingItem,
  ItemTypeUnion<"floor" | DeadlyItemType, RoomId, RoomItemId>
> => {
  return isDeadly(e.touchedItem as UnionOfAllItemInPlayTypes<RoomId>);
};
