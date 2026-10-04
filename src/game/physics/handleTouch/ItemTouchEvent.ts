import {
  isPlayableItem,
  type PlayableItem,
  type UnionOfAllItemInPlayTypes,
} from "../../../model/ItemInPlayNarrowedUnions";
import { type CharacterName } from "../../../model/modelTypes";
import { type RoomState } from "../../../model/RoomState";
import { type Xyz } from "../../../utils/vectors/vectors";
import { type GameState } from "../../gameState/GameState";

export type ItemTouchEvent<
  RoomId extends string,
  RoomItemId extends string,
  MovingItem extends UnionOfAllItemInPlayTypes<RoomId, RoomItemId> =
    UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  TouchedItem extends UnionOfAllItemInPlayTypes<RoomId, RoomItemId> =
    UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
> = {
  movingItem: MovingItem;
  movementVector: Xyz;
  touchedItem: TouchedItem;
  gameState: GameState<RoomId>;
  deltaMS: number;
  room: RoomState<RoomId, RoomItemId>;
};

export const movingItemIsPlayable = <
  RoomId extends string,
  RoomItemId extends string,
  TouchedItem extends UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
>(
  e: ItemTouchEvent<
    RoomId,
    RoomItemId,
    UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
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
