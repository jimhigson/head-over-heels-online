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
import { setRoomItem, type RoomState } from "../../../model/RoomState";
import { emptyObject } from "../../../utils/empty";

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
      gameState.pickupsCollected[room.id] ?? emptyObject,
    ),
  );
  if (item === undefined) {
    throw new Error("failed to generate any items");
  }
  item.state.position = position;

  addItemToRoom({ room, item });
  return item;
};

// TODO: this could be removed now, it is just a pass-through
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
  setRoomItem(item, room.items);
  return item;
};
