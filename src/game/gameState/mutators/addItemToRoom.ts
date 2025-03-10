import { first } from "iter-tools";
import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import type {
  JsonItemType,
  JsonItemConfig,
  JsonItem,
  JsonItemUnion,
} from "../../../model/json/JsonItem";
import type { Xyz } from "../../../utils/vectors/vectors";
import { originXyz } from "../../../utils/vectors/vectors";
import type { GameState } from "../GameState";
import { loadItemFromJson } from "../loadRoom/loadItem";
import type { RoomState } from "../../../model/RoomState";

let i = 0;

export const addItemFromJsonToRoom = <
  T extends JsonItemType,
  RoomId extends string,
  RoomItemId extends string,
>({
  gameState,
  room,
  itemType,
  config,
  position,
}: {
  gameState: GameState<RoomId>;
  room: RoomState<RoomId, RoomItemId>;
  itemType: T;
  config: JsonItemConfig<T, RoomId, RoomItemId>;
  /* the position for the new object to occupy */
  position: Xyz;
}) => {
  const itemJson: JsonItem<T, RoomId, RoomItemId> = {
    type: itemType,
    config,
    position: originXyz,
  };
  const itemId = `${itemType}/${i++}`;
  const item = first(
    loadItemFromJson(
      itemId,
      itemJson as JsonItemUnion<RoomId>,
      room.roomJson,
      gameState.pickupsCollected[room.id],
    ),
  );
  if (item === undefined) {
    throw new Error("failed to generate any items");
  }
  item.state.position = position;

  addItemToRoom({ room, item });
  return item;
};

export const addItemToRoom = <
  RoomId extends string,
  RoomItemId extends string,
>({
  room,
  item,
}: {
  room: RoomState<RoomId, RoomItemId>;
  item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>;
}) => {
  room.items[item.id] = item;
  return item;
};
