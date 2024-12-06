import type { GameState } from "@/game/gameState/GameState";
import type { ItemInPlay, ItemInPlayType } from "@/model/ItemInPlay";
import type { Xyz } from "@/utils/vectors/vectors";
import { isItemType } from "../itemPredicates";
import type { PlanetName } from "@/sprites/planets";

export type ItemTouchEvent<
  RoomId extends string,
  MovingItemType extends ItemInPlayType = ItemInPlayType,
  TouchedItemType extends ItemInPlayType = ItemInPlayType,
> = {
  movingItem: ItemInPlay<MovingItemType, PlanetName, RoomId>;
  movementVector: Xyz;
  touchedItem: ItemInPlay<TouchedItemType, PlanetName, RoomId>;
  gameState: GameState<RoomId>;
  deltaMS: number;
};

export const touchedItemIsType = <
  RoomId extends string,
  MovingItemType extends ItemInPlayType,
  TouchedItemType extends ItemInPlayType,
>(
  e: ItemTouchEvent<RoomId, MovingItemType>,
  ...touchedItemType: Array<TouchedItemType>
): e is {
  [T in TouchedItemType]: ItemTouchEvent<RoomId, MovingItemType, T>;
}[TouchedItemType] => {
  return isItemType(...touchedItemType)(e.touchedItem);
};

export const movingItemIsType = <
  RoomId extends string,
  MovingItemType extends ItemInPlayType,
  TouchedItemType extends ItemInPlayType,
>(
  e: ItemTouchEvent<RoomId, ItemInPlayType, ItemInPlayType>,
  ...movingItemType: Array<MovingItemType>
): e is ItemTouchEvent<RoomId, MovingItemType, TouchedItemType> => {
  return isItemType(...movingItemType)(e.movingItem);
};
