import type { GameState } from "@/game/gameState/GameState";
import type {
  AnyItemInPlay,
  ItemInPlay,
  ItemInPlayType,
} from "@/model/ItemInPlay";
import type { Xyz } from "@/utils/vectors/vectors";
import type { PlayableItem } from "../itemPredicates";
import { isItemType, isPlayableItem } from "../itemPredicates";
import type { PlanetName } from "@/sprites/planets";
import type { CharacterName, RoomState } from "@/model/modelTypes";

export type ItemTouchEvent<
  RoomId extends string,
  MovingItem extends AnyItemInPlay<RoomId> = AnyItemInPlay<RoomId>,
  TouchedItem extends AnyItemInPlay<RoomId> = AnyItemInPlay<RoomId>,
> = {
  movingItem: MovingItem;
  movementVector: Xyz;
  touchedItem: TouchedItem;
  gameState: GameState<RoomId>;
  deltaMS: number;
  room: RoomState<PlanetName, RoomId>;
};

/** simplified version of ItemTouchEvent where generics can be completed with just strings: */
export type ItemTouchEventByItemType<
  RoomId extends string,
  MovingItemType extends ItemInPlayType,
  TouchedItemType extends ItemInPlayType = ItemInPlayType,
> = ItemTouchEvent<
  RoomId,
  ItemInPlay<MovingItemType, PlanetName, RoomId>,
  ItemInPlay<TouchedItemType, PlanetName, RoomId>
>;

export const touchedItemIsType = <
  RoomId extends string,
  MovingItem extends AnyItemInPlay<RoomId>,
  TouchedItemType extends ItemInPlayType,
>(
  e: ItemTouchEvent<RoomId, MovingItem>,
  ...touchedItemType: Array<TouchedItemType>
): e is {
  [T in TouchedItemType]: ItemTouchEvent<
    RoomId,
    MovingItem,
    ItemInPlay<T, PlanetName, RoomId>
  >;
}[TouchedItemType] => {
  return isItemType(...touchedItemType)(e.touchedItem);
};

export const movingItemIsType = <
  RoomId extends string,
  MovingItemType extends ItemInPlayType,
  TouchedItem extends AnyItemInPlay<RoomId>,
>(
  e: ItemTouchEvent<RoomId, AnyItemInPlay<RoomId>, TouchedItem>,
  ...movingItemType: Array<MovingItemType>
): e is ItemTouchEvent<
  RoomId,
  ItemInPlay<MovingItemType, PlanetName, RoomId>,
  TouchedItem
> => {
  return isItemType(...movingItemType)(e.movingItem);
};

export const movingItemIsPlayable = <
  RoomId extends string,
  TouchedItem extends AnyItemInPlay<RoomId>,
>(
  e: ItemTouchEvent<RoomId, AnyItemInPlay<RoomId>, TouchedItem>,
): e is ItemTouchEvent<
  RoomId,
  PlayableItem<CharacterName, RoomId>,
  TouchedItem
> => {
  return isPlayableItem(e.movingItem);
};

export const touchedItemIsPlayable = <
  RoomId extends string,
  MovingItem extends AnyItemInPlay<RoomId>,
>(
  e: ItemTouchEvent<RoomId, MovingItem>,
): e is ItemTouchEvent<
  RoomId,
  MovingItem,
  PlayableItem<CharacterName, RoomId>
> => {
  return isPlayableItem(e.touchedItem);
};
